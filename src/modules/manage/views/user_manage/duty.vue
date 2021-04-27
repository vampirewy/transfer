<template>
  <div>
    <query-page @reset="reset" @search="search">
      <template v-slot:left>
        <search>
          <div class="searchInputFormItem">
          <el-input placeholder="姓名/手机号/企业单位" v-model="formData.keywords">
          </el-input>
          <span class="searchBtnImgSpan" @click="search">
            <img class="searchBtnImg" src="@/assets/images/common/search.png"/>
          </span>
          </div>
        </search>
        <query-filter>
          <el-select
                  v-model="formData.gender"
                  placeholder="请选择性别"
                  style="width: 180px;"
          >
            <el-option label="男" value="1" key="1"></el-option>
            <el-option label="女" value="2" key="2"></el-option>
          </el-select>
          <el-select
                  v-model="formData.gridId"
                  placeholder="人员类别"
                  style="width: 180px"
          >
            <el-option :label="item.gridName"
                       :value="item.id" v-for="(item, index) in gridList"
                       :key="index"></el-option>
          </el-select>
          <div class="formSearchTitle setTimeText filter-item-title">建档时间</div>
          <el-date-picker
                  v-model="formData.startTime"
                  type="date"
                  :max-date="formData.endTime"
                  placeholder="选择开始日期"
                  style="width: 180px"
          >
          </el-date-picker>
          <el-date-picker
                  v-model="formData.endTime"
                  type="date"
                  :min-date="formData.startTime"
                  placeholder="选择结束日期"
                  style="width: 180px"
          >
          </el-date-picker>
        </query-filter>
      </template>
      <template v-slot:right>
        <div class="divRightTitleDiv">
          <div class="divRightTitle"><span>|</span>我的客户</div>
          <div>
            <el-button
                    class="btn-new btnAdd"
                    style="margin-bottom: 16px"
                    size="small"
                    @click="
          $router.push({
            name: 'user_edit',
            query: {
              owner: $store.state.user.userId,
            },
          })
        "
            ><img src="@/assets/images/common/addBtn.png" />新增</el-button
            >
<!--            <el-button-->
<!--                    size="small"-->
<!--                    class="btn-new btnDel"-->
<!--                    @click="handleSomeRemove"-->
<!--            ><img src="@/assets/images/common/delBtn.png" />删除</el-button-->
<!--            >-->
            <el-button
                    class="btn-new btnDel"
                    @click="assign({})"
                    size="small"
                    v-if="getAccess('customers_batch_transfer')"
            ><img src="@/assets/images/common/deliverBtn.png" />转交</el-button
            >
            <el-button
                    class="btn-new btnTransfer"
                    size="small"
                    @click="move({})"
                    v-if="getAccess('customers_batch_switch_user_pool')"
            ><img src="@/assets/images/common/transferBtn.svg" />转入用户池</el-button
            >
          </div>
        </div>
        <div>
          <el-table
                  style="width: 100%"
                  :data="dataSource"
                  @selection-change="handleSelectionChange"
                  ref="multipleTable"
                  align="center"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <!-- <el-table-column label="编号" parop="clientNo"></el-table-column> -->
            <el-table-column label="姓名" prop="name" width="80" show-overflow-tooltip>
              <template slot-scope="scope">
                <span class="clientName"
                      @click="commonHref.toPersonalHealth(scope.row.id, $router)">
                  {{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="性别" prop="gender" width="60">
              <template slot-scope="scope">
                {{ scope.row.gender === 1 ? '男' : '女' }}
              </template>
            </el-table-column>
            <el-table-column label="年龄" prop="age" width="60"></el-table-column>
            <el-table-column label="企业单位" prop="workUnitName">
              <template slot-scope="scope">
                <span>{{ scope.row.workUnitName || '-'}}</span>
              </template>
            </el-table-column>
            <el-table-column label="人员类别" prop="gridName" width="100" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.gridName || '-'}}</span>
              </template>
            </el-table-column>
            <el-table-column label="管理医生" show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.userList && scope.row.userList.length">
                  <span v-for="(it,idx) in scope.row.userList" :key="idx">{{it.realName}}
                    <i v-if="idx !== scope.row.userList.length - 1">,</i>
                  </span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="建档时间" prop="createTime" show-overflow-tooltip />
            <el-table-column label="附件" prop="attachment" width="55">
              <template slot-scope="scope">
                <div @click="
                $router.push({
                  name: 'user_edit',
                  query: {
                    owner: $store.state.user.userId,
                  },
                  params: {
                    userId: scope.row.id,
                  },
                })
              ">
                  <img class="attachment-btn" src="@/assets/images/common/attachmentBtn.png" />
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" prop="index" width="220">
              <template slot-scope="scope">
                <el-button
                        type="text"
                        size="small"
                        @click="
                $router.push({
                  name: 'user_edit',
                  query: {
                    owner: $store.state.user.userId,
                  },
                  params: {
                    userId: scope.row.id,
                  },
                })
              "
                        v-if="getAccess('customers_edit')"
                >编辑</el-button
                >
                <el-button
                        type="text"
                        size="small"
                        @click="assign(scope)"
                        v-if="getAccess('customers_transfer')"
                >转交</el-button
                >
                <el-button
                        type="text"
                        size="small"
                        @click="commonHref.toPersonalHealth(scope.row.id, $router)"
                        v-if="getAccess('customers_view')"
                >查看</el-button
                >
                <el-button
                        type="text"
                        size="small"
                        @click="move(scope)"
                        v-if="getAccess('customers_switch_user_pool')"
                >转入用户池</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <div style="text-align: right">
            <el-pagination
                    style="margin-top: 15px"
                    @current-change="onChangePage"
                    background
                    layout="prev, pager, next, jumper, total, sizes"
                    :total="total"
                    :page-size="15"
                    :pageSizes="[15]"
            ></el-pagination>
          </div>
        </div>
      </template>
    </query-page>
    <!-- <assign-dialog
      :visible="dialogTableVisible"
      @cancel="dialogTableVisible = false"
      @change="submitAssign"
    ></assign-dialog> -->
    <doctor-Select
            :isRadio="false"
      :visible="dialogTableVisible"
      :clientId="clientId"
      @cancel="dialogTableVisible = false"
      @change="submitAssign"
    ></doctor-Select>
  </div>
</template>

<script>
import assignDialog from './components/assign_dialog.vue';
import doctorSelect from '@/components/doctor_select/index.vue';
import QueryPage from '~/src/components/query_page/index.vue';
import Search from '~/src/components/query_page/search.vue';
import QueryFilter from '~/src/components/query_page/query_filter.vue';
import deleteIcon from '~/src/assets/images/message-box-delete@2x.png';
import * as dayjs from 'dayjs';

export default {
  name: 'Duty',
  components: {
    'assign-dialog': assignDialog,
    'doctor-Select': doctorSelect,
    Search,
    QueryPage,
    QueryFilter,
  },
  data() {
    return {
      total: 0,
      dataSource: [],
      dialogTableVisible: false,
      chooseUserList: [],
      gridList: [],
      clientId: '',
      formData: {
        keywords: '',
        gridId: '',
        genderType: '',
      },
      params: {
        pageNo: 1,
        pageSize: 15,
        type: 1,
      },
    };
  },
  mounted() {
    if (localStorage.getItem('homeSearchData')) {
      const HomeSearchData = JSON.parse(localStorage.getItem('homeSearchData'));
      this.formData.startTime = HomeSearchData.startDate;
      this.formData.endTime = HomeSearchData.lastDate;
      this.formData.searchRange = HomeSearchData.searchRange;
    }
    this.getGridList();
  },
  destroyed() {
    // 清除时间 和 我的/平台
    localStorage.removeItem('homeSearchData');
  },
  methods: {
    async getGridList() {
      const res = await this.$api.userManagerInterface.getGridList({ pageNo: 1, pageSize: 10000 });
      const { data } = res.data;
      this.gridList = data.list;
    },
    reset() {
      Object.assign(this.$data, this.$options.data());
      this.getUserList();
      this.getGridList(); // 获取人员列类别
    },
    onChangePage(current = 1) {
      this.params.pageNo = current;
      this.getUserList();
    },
    search() {
      const hasOnlyStartTime = this.formData.startTime
              && (!this.formData.startTime || !this.formData.endTime);
      const hasOnlyEndTime = this.formData.endTime
              && (!this.formData.startTime || !this.formData.endTime);
      if (hasOnlyStartTime || hasOnlyEndTime) {
        this.$message.error('查询必须包括开始时间和结束时间');
        return;
      }
      if (this.formData.startTime > this.formData.endTime) {
        this.$message.error('查询的开始时间不可大于结束时间');
        return;
      }
      if (this.formData.startTime && this.formData.endTime) {
        this.formData.startTime = dayjs(this.formData.startTime).format('YYYY-MM-DD');
        this.formData.endTime = dayjs(this.formData.endTime).format('YYYY-MM-DD');
      }
      this.params.pageNo = 1;
      this.getUserList();
    },
    assign({ row = {} }) {
      if (row.id) {
        this.chooseUserList = [row];
      }
      if (this.chooseUserList.length) {
        this.clientId = this.chooseUserList[0].id;
        this.dialogTableVisible = true;
      } else {
        this.$message.warning('请选择客户');
      }
    },
    submitAssign(userList) {
      if (!userList.length) {
        this.$message.warning('请选择医生');
        return;
      }
      this.dialogTableVisible = false;
      const userIdList = userList.filter(t => t.selectType === 1).map(t => t.id);
      const workIdList = userList.filter(t => t.selectType === 2).map(t => t.id);

      this.submit({
        clientIdList: this.chooseUserList.map(val => val.id),
        userIdList,
        workIdList,
        type: 3,
      });
    },

    submit(params) {
      this.$api.userManagerInterface.claim(params).then(({ data }) => {
        if (data.code === 200) {
          this.$message.success('操作成功');
          this.search();
          this.chooseUserList = [];
          this.$refs.multipleTable.clearSelection();
        }
      });
    },
    handleSelectionChange(rows) {
      this.chooseUserList = rows;
    },
    getUserList() {
      const sendData = Object.assign({}, this.formData);
      if (sendData.startTime) {
        sendData.startTime = `${sendData.startTime} 00:00:00`;
      }
      if (sendData.endTime) {
        sendData.endTime = `${sendData.endTime} 23:59:59`;
      }
      this.formData.healthManageId = this.$store.state.user.userId;
      this.$api.userManagerInterface
        .fetchUserList(Object.assign(this.params, sendData))
        .then(({ data }) => {
          if (data.success) {
            this.total = data.data.total;
            this.dataSource = data.data.list;
          }
        });
    },
    move({ row = {} }) {
      let clientIdList = [];
      if (row.id) {
        clientIdList = [row.id];
      } else {
        clientIdList = this.chooseUserList.map(val => val.id);
      }
      const deleteDom = `<div class="delete-text-content">
        <img class="delete-icon" src="${deleteIcon}"/><span>共有${clientIdList.length}个用户转入用户池, 转入客户池后，相关信息将会被删除，是否最终确认操作？</span></div>
        `;
      this.$confirm(
        deleteDom,
        '转入客户池',
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          customClass: 'message-box-customize',
          showClose: true,
        },
      ).then(() => {
        this.submit({
          clientIdList,
          healthManageId: 0,
          type: 4,
        });
      });
    },
  },
  beforeRouteEnter(to, from, next) {
    // ...
    next(vm => vm.getUserList());
  },
};
</script>

<style lang="scss" scoped>
  .attachment-btn {
    cursor: pointer;
    width: 24px;
    height: 24px;
  }
  .el-button + .el-button {
    margin-left: 3px;
  }
  .form {
    width: 220px;
    background: #f4f4f6;
    border-radius: 10px;
    margin-right: 30px;
    .putAway {
      width: 20px;
      height: 80px;
      display: flex;
      align-items: center;
      text-align: center;
      background: #97a6bd;
      border-radius: 0px 5px 5px 0px;
      color: white;
      font-size: 12px;
      position: fixed;
      left: 250px;
      top: 350px;
      cursor: pointer;
    }
    .formLeft {
      padding: 0 20px 0 20px;
      text-align: center;
      .formSearchTitle {
        font-size: 18px;
        color: #333333;
        display: flex;
        align-items: center;
        font-weight: bold;
        margin: 20px 0 15px 0;
        &.setTimeText {
          font-size: 14px;
          font-weight: 400;
          margin-top: 0;
        }
        .dianBlue {
          width: 5px;
          height: 5px;
          background: #4991fd;
          border-radius: 50px;
          display: inline-block;
          margin-right: 6px;
        }
        .dianLv {
          width: 5px;
          height: 5px;
          background: #31c529;
          border-radius: 50%;
          display: inline-block;
          margin-right: 6px;
        }
      }
      .ge {
        width: 220px;
        height: 1px;
        background: #ffffff;
        margin-left: -20px;
      }
    }
  }
  .divRightTitleDiv {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    .divRightTitle {
      align-self: start;
      font-size: 18px;
      color: #333333;
      font-weight: bold;
      span {
        color: #4991fd;
        font-size: 18px;
        margin-right: 9px;
      }
    }
  }
</style>
