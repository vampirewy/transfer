<template>
  <div class="userManage">
    <div>
    <!-- <query-page @reset="reset" @search="search"> -->
      <!-- <template slot="left">
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
                  style="width: 180px"
          >
            <el-option label="男" value="1" key="1"></el-option>
            <el-option label="女" value="2" key="2"></el-option>
          </el-select>
          <el-select
                  v-model="formData.gridId"
                  placeholder="人员类别"
                  style="width: 180px"
          >
            <el-option :label="item.gridName" :value="item.id" v-for="(item, index) in gridList"
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
      </template> -->
      <!-- <template slot="right"> -->
        </div>
        <div class="divTop">
          <div class="divTitle">
            <span><img src="@/assets/images/common/titleLeft.png" alt=""></span>
            我的客户</div>

          <div class="searchCondition">
          <div class="searchLeft">
          <div class="searchInputFormItem">
            <el-input placeholder="姓名/手机号/企业单位" v-model="formData.keywords">
            </el-input>
            <span class="searchBtnImgSpan" @click="search">
                <img class="searchBtnImg" src="@/assets/images/common/topsearch.png"/>
            </span>
          </div>
          <div>
            <span>客户性别：</span>
           <el-select
                  v-model="formData.gender"
                  placeholder="请选择"
                  style="width: 140px"
          >
            <el-option label="男" value="1" key="1"></el-option>
            <el-option label="女" value="2" key="2"></el-option>
          </el-select>
          </div>
          <div>
            <span>人员类别：</span>
            <el-select
                  v-model="formData.gridId"
                  placeholder="请选择"
                  style="width: 140px"
          >
            <el-option :label="item.gridName" :value="item.id" v-for="(item, index) in gridList"
                       :key="index"></el-option>
          </el-select>
          </div>
            <div>
            <span>管理医生：</span>
            <el-select
                  v-model="formData.doctorId"
                  placeholder="请选择"
                  style="width: 140px"
          >
            <el-option :label="item.realName" :value="item.id" v-for="(item, index) in doctorList"
                       :key="index"></el-option>
          </el-select>
          </div>
            </div>
            <div class="searchRight">
            <div class="buttones">
            <div class="searchFor" @click="search">
            <img src="@/assets/images/common/topsearchblue.png" alt="">
          </div>
          <div class="resetAll">重置</div>
          <div class="more" v-if="isTrue"  @click="upMore">
            <span>></span>
            展开更多</div>
          <div class="more noMore" v-else @click="upMore">
            <span>></span>收起筛选</div>
          </div>
            </div>
          </div>
        </div>
        <div v-if="!isTrue" class="searchCondition" style="width:80%;">
          <div class="searchLeft" style="padding-left:5px;">
          <div>
            <span>体检报告：</span>
            <el-select
                  v-model="formData.gridId"
                  placeholder="请选择"
                  style="width: 140px"
          >
            <el-option :label="item.gridName" :value="item.id" v-for="(item, index) in gridList"
                       :key="index"></el-option>
          </el-select>
          </div>
          <div>
            <span>基础问卷：</span>
            <el-select
                  v-model="formData.gridId"
                  placeholder="请选择"
                  style="width: 140px"
          >
            <el-option :label="item.gridName" :value="item.id" v-for="(item, index) in gridList"
                       :key="index"></el-option>
          </el-select>
          </div>
          <div>
            <span>个人报告：</span>
            <el-select
                  v-model="formData.gridId"
                  placeholder="请选择"
                  style="width: 140px"
          >
            <el-option :label="item.gridName" :value="item.id" v-for="(item, index) in gridList"
                       :key="index"></el-option>
          </el-select>
          </div>
          <div>
            <span style="margin-left:28px;">附件：</span>
            <el-select
                  v-model="formData.gridId"
                  placeholder="请选择"
                  style="width: 140px"
          >
            <el-option :label="item.gridName" :value="item.id" v-for="(item, index) in gridList"
                       :key="index"></el-option>
          </el-select>
          </div>
          <div>
            <span>证件类型：</span>
            <el-select
                  v-model="formData.gridId"
                  placeholder="请选择"
                  style="width: 140px"
          >
            <el-option :label="item.gridName" :value="item.id" v-for="(item, index) in gridList"
                       :key="index"></el-option>
          </el-select>
          </div>
          <div>
            <span>证件类型：</span>
            <el-input
                  v-model="formData.gridId"
                  placeholder="请输入"
                  style="width: 140px"
          >
            </el-input>
          </div>
           <div>
            <span>建档日期：</span>
            <el-date-picker
                  v-model="formData.startTime"
                  type="date"
                  :max-date="formData.endTime"
                  placeholder="选择开始日期"
                  style="width: 140px"
          >
          </el-date-picker>
          <span class="timing">-</span>
          <el-date-picker
                  v-model="formData.endTime"
                  type="date"
                  :min-date="formData.startTime"
                  placeholder="选择结束日期"
                  style="width: 140px"
          >
          </el-date-picker>
          </div>
          </div>
        </div>
        <div class="topbottomborder"></div>
        <div class="divRightTitleDiv">
          <div>
            <el-button
                    class="btn-new btnAdd"
                    size="small"
                    style="margin: 16px 0"
                    @click="$router.push('user_edit')"
                    v-if="getAccess('customer_pool_add')"
            ><img src="@/assets/images/common/addBtn.png" />新增</el-button>
            <el-button
                    size="small"
                    class="btn-new btnDel"
                    @click="handleSomeRemove"
                    v-if="getAccess('customer_pool_batch_delete')"
            ><img src="@/assets/images/common/delBtn.png" />删除</el-button>
            <!-- <el-button
                    @click="assign({})"
                    size="small"
                    class="btn-new btnDel"
                    v-if="getAccess('customer_pool_distribute')"
            ><img src="@/assets/images/common/deliverBtn.png" />分配</el-button> -->
            <el-button
            style="width:120px;"
                    size="small"
                    class="btn-new btnDel"
                    v-if="getAccess('customer_pool_distribute')"
            ><img src="@/assets/images/common/createReport.png" />生成报告</el-button>
          </div>
        </div>
        <div>
          <el-table
                  :data="dataSource"
                  @selection-change="handleSelectionChange"
                  ref="multipleTable"
                  align="center"
                  show-overflow-tooltip
          >
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column label="客户编号" prop="clientNo" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>
                  {{ scope.row.clientNo }}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="姓名" prop="name" show-overflow-tooltip>
              <template slot-scope="scope">
                <span style="color:#3154AC;">
                  {{ scope.row.name }}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="性别" prop="gender" width="60">
              <template slot-scope="scope">
                {{ scope.row.gender === 1 ? '男' :scope.row.gender === 1?'不限': '女' }}
              </template>
            </el-table-column>
            <el-table-column label="年龄" prop="age" width="60"></el-table-column>
            <el-table-column label="企业单位" prop="workUnitName" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.workUnitName || '-'}}</span>
              </template>
            </el-table-column>
            <el-table-column label="人员类别" prop="gridName" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.gridName || '-'}}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column label="是否认领" prop="state">
              <template slot-scope="scope">
                {{ scope.row.healthManageId === '1' ? '已认领' : '未认领' }}
              </template>
            </el-table-column> -->
            <el-table-column label="体检报告" prop="reportTotal" width="80" show-overflow-tooltip>
              <template slot-scope="scope">
                <span style="color:#36BF2F;">{{ scope.row.reportTotal || '-'}}</span>
              </template>
            </el-table-column>
            <el-table-column label="基础问卷"
            prop="lifeStyleQuestionTotal" width="80" show-overflow-tooltip>
              <template slot-scope="scope">
                <span style="color:#36BF2F;">{{ scope.row.lifeStyleQuestionTotal || '0'}}</span>
              </template>
            </el-table-column>
            <el-table-column label="个人报告" prop="assessReportTotal" width="80" show-overflow-tooltip>
              <template slot-scope="scope">
                <span style="color:#36BF2F;">{{ scope.row.assessReportTotal || '-'}}</span>
              </template>
            </el-table-column>
            <el-table-column label="管理医生" prop="doctorNames" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.doctorNames || '0'}}</span>
              </template>
            </el-table-column>
            <el-table-column label="干预计划" prop="unExecutePlanTotal" width="80">
              <template slot-scope="scope">
                <span style="color:#36BF2F;">
                  {{ scope.row.unExecutePlanTotal || '0'}}</span>
              </template>
            </el-table-column>
            <el-table-column label="建档时间" prop="createTime" show-overflow-tooltip />
            <el-table-column label="附件" prop="annexTotal"  width="60" show-overflow-tooltip>
              <template slot-scope="scope">
                <span style="color:#36BF2F;">{{ scope.row.annexTotal || '0'}}</span>
              </template>
            </el-table-column>
            <el-table-column label="是否启用" prop="state">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.state "
                  active-value="1"
                  inactive-value="0"
                  active-color="#13ce66"
                  @change=changeStatus(scope,scope.row.state)
                  >
                </el-switch>
              </template>
            </el-table-column>
            <!-- <el-table-column label="附件" prop="attachment">
              <template slot-scope="scope">
                <div
                class="elbutton"
                @click="
                  $router.push({
                    name: 'user_edit',
                    params: {
                      userId: scope.row.id,
                    },
                  })
                ">
                  查看
                </div>
              </template>
            </el-table-column> -->
            <el-table-column label="操作" prop="index"  width="100">
              <template slot-scope="scope">
                <el-button
                        type="text"
                        size="small"
                        @click="
                  $router.push(
                     `/user_edit/${scope.row.id}`
                  )
                "
                        v-if="getAccess('customer_pool_edit')"
                >编辑</el-button>
                <el-button type="text"
                        size="small"
                        style="color:#DDE0E6"
                        >|</el-button>
                <el-button
                        type="text"
                        size="small"
                        @click="claim(scope)"
                >删除</el-button
                >
                <!-- <el-button
                        class="font-enable"
                        type="text"
                        size="small"
                        @click="changeStatus(scope, '1')"
                        v-if="
                  scope.row.state === '0' &&
                    getAccess('customer_pool_on_off')
                "
                >启用</el-button
                >
                <el-button
                        class="font-disable"
                        type="text"
                        size="small"
                        @click="changeStatus(scope, '0')"
                        v-if="
                  scope.row.state === '1' && scope.row.healthManageId !== '1' &&
                    getAccess('customer_pool_on_off')
                "
                >禁用</el-button
                > -->
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
                    :pageSizes="[15]"
                    :page-size="15"
            ></el-pagination>
          </div>
        </div>
      <!-- </template> -->
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
import doctorSelect from '~/src/components/doctor_select/index.vue';
import QueryPage from '~/src/components/query_page/index.vue';
import Search from '~/src/components/query_page/search.vue';
import QueryFilter from '~/src/components/query_page/query_filter.vue';
import deleteIcon from '~/src/assets/images/deleteicon.png';
import * as dayjs from 'dayjs';

export default {
  name: 'index',
  components: {
    'assign-dialog': assignDialog,
    'doctor-Select': doctorSelect,
    Search,
    QueryPage,
    QueryFilter,
  },
  data() {
    return {
      isTrue: true,
      value: true,
      total: 0,
      gridList: [],
      doctorList: [],
      dataSource: [],
      chooseUserList: [],
      dialogTableVisible: false,
      clientId: '',
      formData: {
        gridId: '',
        doctorId: '',
        keywords: '',
        gender: '',
        genderType: '',
        startTime: '',
        endTime: '',
      },
      params: {
        pageNo: 1,
        pageSize: 15,
        type: 0,
      },
      isCollapse: true,
    };
  },
  methods: {
    // 展开更多
    upMore() {
      this.isTrue = !this.isTrue;
    },
    // 获取人员列表
    async getGridList() {
      const res = await
      this.$api.userManagerInterface.getGridList({ pageNo: 1, pageSize: 10000 });
      const { data } = res.data;
      this.gridList = data.data;
    },
    // 获取医生列表
    async getDoctor() {
      const res = await
      this.$api.doctorInterface.getDoctorList({ pageNo: 1, pageSize: 10000 });
      const { data } = res.data;
      this.doctorList = data.data;
    },
    handleEditCheck() {},
    // 批量删除
    handleSomeRemove() {
      if (!this.chooseUserList.length) {
        this.$message.error('请选择需要删除客户');
        return;
      }
      const deleteDom = `<div class="delete-text-content">
        <img class="delete-icon" src="${deleteIcon}"/><span>该操作无法撤销，是否确认删除！</span></div>
        `;
      this.$confirm(deleteDom, '删除提示', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'message-box-customize',
        showClose: true,
      }).then(() => {
        const params = {
          clientIdList: this.chooseUserList.map(user => user.id),
        };
        this.$api.userManagerInterface.deleteClientInfo(params).then(({ data }) => {
          if (data.code === 200) {
            this.$message.success('操作成功');
            this.search();
            this.chooseUserList = [];
            this.$refs.multipleTable.clearSelection();
          }
        });
      });
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
    handleSelectionChange(rows) {
      this.chooseUserList = rows;
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
        type: 2, // 2-分配
      });
    },
    claim({ row = {} }) {
      if (!row.id) {
        if (!this.chooseUserList.length) {
          this.$message.warning('请选择客户');
          return;
        }
      } else {
        this.chooseUserList = [row];
      }
      this.$confirm(
        `<div class="delete-text-content"><img class="delete-icon" src="${deleteIcon}"/><span>您确定要删除该病人吗？</span></div>`,
        '提示',
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          customClass: 'message-box-customize',
          showClose: true,
        },
      ).then(() => {
        const params = {
          clientIdList: this.chooseUserList.map(user => user.id),
        };
        this.$api.userManagerInterface.deleteClientInfo(params).then(({ data }) => {
          if (data.code === 200) {
            this.$message.success('操作成功');
            this.getUserList();
            this.chooseUserList = [];
            this.$refs.multipleTable.clearSelection();
          }
        });
        // this.submit({
        //   clientIdList: this.chooseUserList.map(val => val.id),
        //   userIdList: [this.$store.state.user.userId],
        //   type: 1,
        // });
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

    changeStatus({ row = {} }, status) {
      const setRow = row;
      this.$api.userManagerInterface.editUserStatus({
        id: setRow.id,
        state: status,
      }).then(({ data }) => {
        if (data.code === 200) {
          this.$message.success('操作成功');
          setRow.state = status;
        }
      });
      // this.$confirm(
      // `<div class="delete-text-content"><img class="delete-icon"
      // src="${deleteIcon}"/><span>您确定要改变该病人状态吗？</span></div>`,
      //   '提示',
      //   {
      //     dangerouslyUseHTMLString: true,
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     customClass: 'message-box-customize',
      //     showClose: true,
      //   },
      // ).then(() => {
      //   this.$api.userManagerInterface
      //     .editUserStatus({
      //       id: setRow.id,
      //       state: status,
      //     })
      //     .then(({ data }) => {
      //       if (data.code === 200) {
      //         this.$message.success('操作成功');
      //         setRow.state = status;
      //       }
      //     });
      // });
    },
    getUserList() {
      this.$api.userManagerInterface
        .fetchUserList(Object.assign(this.params, this.formData))
        .then(({ data }) => {
          if (data.success) {
            this.total = data.data.total;
            this.dataSource = data.data.data;
          }
        });
    },
  },
  mounted() {
    this.getUserList();
    this.getGridList(); // 获取人员列类别
    this.getDoctor(); // 获取医生列表
  },
};
</script>

<style lang="scss" scoped>
.font-enable {
  color: #31c529;
}
.font-disable {
  color: #fe2b2a;
}
.el-button + .el-button {
  margin-left: 3px;
}
.userManage {
  .attachment-btn {
    cursor: pointer;
    width: 24px;
    height: 24px;
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
  .divRightTop {
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
}

</style>
