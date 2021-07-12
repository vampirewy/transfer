<template>
  <div>
    <div class="divTop">
      <div class="divTitle">
        <span><img src="@/assets/images/common/titleLeft.png" alt=""></span>
        短信平台
      </div>
      <div class="searchCondition">
        <div class="searchLeft">
          <div class="searchInputFormItem">
            <el-input placeholder="姓名/编号/单位" v-model="form.keywords">
            </el-input>
            <span class="searchBtnImgSpan" @click="onSearch">
                  <img class="searchBtnImg" src="@/assets/images/common/topsearch.png"/>
              </span>
          </div>
          <div>
            <span>客户性别：</span>
            <el-select
                    v-model="form.gender"
                    placeholder="请选择"
                    style="width: 140px"
                    clearable
            >
              <el-option label="男" value="1" key="1"></el-option>
              <el-option label="女" value="2" key="2"></el-option>
            </el-select>
          </div>
          <div>
            <span>人员类别：</span>
            <el-select
                    v-model="form.gridId"
                    placeholder="请选择"
                    style="width: 140px"
                    clearable
            >
              <el-option :label="item.gridName" :value="item.id" v-for="(item, index) in gridList"
                         :key="index"></el-option>
            </el-select>
          </div>
          <div>
            <span>基础问卷：</span>
            <el-select
                    v-model="form.hasLifeQuestion"
                    placeholder="请选择"
                    style="width: 140px"
                    clearable
            >
              <el-option label="有" value="1" key="1"></el-option>
              <el-option label="无" value="2" key="2"></el-option>
            </el-select>
          </div>
        </div>
        <div class="searchRight">
          <div class="buttones">
            <div class="searchFor" @click="onSearch(1)">
              <img src="@/assets/images/common/topsearchblue.png" alt="">
            </div>
            <div class="resetAll" @click="onReset">重置</div>
            <div class="more" v-if="isTrue"  @click="upMore">
              <span>></span>
              展开更多</div>
            <div class="more noMore" v-else @click="upMore">
              <span>></span>收起筛选</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!isTrue" class="searchCondition">
      <div class="searchLeft" style="padding-left:5px;">
        <div>
          <span>体检异常：</span>
          <el-popover
                  ref="abnormalPopover"
                  placement="top-start"
                  width="590"
                  trigger="click"
                  @show="abnormalModalVisible = true"
                  @hide="handleAbnormalClose">
            <abnormal v-if="abnormalModalVisible"
                      @change="handleAbnormalSelectChange"
                      @cancel="handleAbnormalClose"></abnormal>
            <el-input class="select-user-trigger" slot="reference" style="width: 140px"
                      :disabled="abnormalName !== '' ? false : true"
                      v-model="abnormalName" placeholder="请选择">
              <i :class="`el-icon-arrow-${abnormalModalVisible ? 'up' : 'down'}`"
                 slot="suffix"></i>
            </el-input>
          </el-popover>
        </div>
        <div>
          <span>出生日期：</span>
          <el-date-picker
                  v-model="form.birthdayMD"
                  type="date"
                  class="bornDate"
                  value-format="MM-dd"
                  format="MM-dd"
                  placeholder="请选择"
                  style="width: 140px"
          >
          </el-date-picker>
        </div>
        <div>
          <span>客户标签：</span>
          <el-input placeholder="请输入" style="width: 140px" v-model="form.tag"></el-input>
        </div>
        <div>
          <span>年龄范围：</span>
          <el-input placeholder="请输入" style="width: 120px" v-model="form.minAge"></el-input>
          <span class="timing">-</span>
          <el-input placeholder="请输入" style="width: 120px" v-model="form.maxAge"></el-input>
        </div>
        <div>
          <span>体检日期：</span>
          <el-date-picker
                  v-model="form.startReportDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  :max-date="form.endReportDate || new Date()"
                  placeholder="开始时间"
                  style="width: 140px"
          >
          </el-date-picker>
          <span class="timing">-</span>
          <el-date-picker
                  v-model="form.endReportDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  :min-date="form.startReportDate"
                  :max-date="new Date()"
                  placeholder="结束时间"
                  style="width: 140px"
          >
          </el-date-picker>
        </div>
      </div>
    </div>
    <div class="topbottomborder"></div>
    <div class="divRightTitleDiv">
      <!-- <div class="divRightTitle"><span>|</span>客户池</div> -->
      <div>
        <el-button
                class="btn-new btnAdd"
                size="small"
                style="margin: 16px 0;width: 110px"
                v-if="getAccess('smsPlatform_create')"
                @click="handleEditPlan"
        ><img src="@/assets/images/common/addBtn.png" />创建短信</el-button>
      </div>
    </div>
        <div class="user-follow">
          <el-table :data="table.list" style="width: 100%" align="center" ref="table"
                    @selection-change="handleSelectionChange" class="openTable">
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column prop="clientNo" label="客户编号" min-width="90" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.clientNo | getResult }}</span>
              </template>
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    min-width="90"
                    show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span class="clientName"
                      @click="commonHref.toPersonalHealth(scope.row.id, $router)">
                  {{ scope.row.name | getResult}}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="gender" label="性别" min-width="80px">
              <template slot-scope="scope">
                <span>{{scope.row.gender | getResultGender}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="age" label="年龄" min-width="80px">
              <template slot-scope="scope">
                <span>{{ scope.row.age | getResult }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="birthday" label="出生日期" min-width="130px">
              <template slot-scope="scope">
                <span>{{ scope.row.birthday | getResult }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="workUnitName" label="单位" min-width="110px" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.workUnitName | getResult}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="gridName" label="人员类别" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.gridName | getResult}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="tags" label="标签" min-width="130px" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.tags | getResult}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="newstReportDate"
                             label="最新体检日期" min-width="120px" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.newstReportDate | getResultDate}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="createdTime" label="建档日期"
                             min-width="120px" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.createdTime | getResultDate}}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
                  background
                  @current-change="handleChange"
                  :current-page="table.currentPage"
                  :page-size="table.pageSize"
                  layout="prev, pager, next, jumper, total, sizes"
                  :total="table.totalCount"
                  :pageSizes="[15]"
                  :pager-count="5"
          >
          </el-pagination>
        </div>
  </div>
</template>

<script>
import detail from './el_modal/detail.vue';
import userOpen from '~/src/components/date_select/user_open.vue';
import abnormal from '../user_follow_create/el_modal/abnormal.vue';
export default {
  name: 'smsPlatform',
  components: {
    detail,
    userOpen,
    abnormal,
  },
  data() {
    return {
      isTrue: true,
      form: {
        keywords: '', // 关键字
        gender: '', // 性别
        gridId: '', // 客户类型
        hasLifeQuestion: '', // 基础问卷
        reportAbnormalCodeList: [], // 体检异常编码集合
        birthdayMD: '', // 出生日期
        tag: '', // 客户标签
        minAge: '',
        maxAge: '',
        startReportDate: '',
        endReportDate: '',
      },
      abnormalModalVisible: false, // 异常列表弹窗
      abnormalName: '',
      gridList: [], // 人员类别下拉框
      table: {
        list: [],
        totalCount: 0,
        currentPage: 1,
        pageSize: 15,
      },
      multipleSelection: [], // 当前页选中的数据
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.onLoad();
    });
  },
  methods: {
    handleSelectionChange(val) {
      // table组件选中事件,
      this.multipleSelection = val;
    },
    onLoad() {
      this.getList();
      this.getGridList(); // 获取人员列类别
    },
    /**
     * 获取短信
     * @return {Promise<void>}
     */
    async getList() {
      const reqBody = Object.assign({ pageNo: this.table.currentPage,
        pageSize: this.table.pageSize }, this.form);
      const res = await this.$api.userManagerInterface.getclientMsgList(reqBody);
      const { data } = res.data;
      if (data) {
        this.table.list = data.data || [];
        this.table.totalCount = data.total;
      }
    },
    // 关闭异常列表
    handleAbnormalSelectChange(dataList) {
      this.$refs.abnormalPopover.doClose();
      this.abnormalModalVisible = false;
      const list = [];
      const listId = [];
      dataList.forEach((value) => {
        list.push(value.abnormalName);
        listId.push(value.abnormalCode);
      });
      this.form.reportAbnormalCodeList = listId;
      this.abnormalName = list.join(',');
      /* if (this.selectAbnormal.length > 0) {
        this.onAbnormalChange(this.selectAbnormal);
        this.selectAbnormal = [];
      } */
    },
    handleAbnormalClose() {
      this.abnormalModalVisible = false;
      this.$refs.abnormalPopover.doClose();
    },
    upMore() {
      this.isTrue = !this.isTrue;
    },
    /**
     * 获取人员类别
     * @return {Promise<void>}
     */
    async getGridList() {
      const res = await this.$api.userManagerInterface.getGridList({ pageNo: 1, pageSize: 10000 });
      const { data } = res.data;
      this.gridList = data.data;
    },
    /**
     * 创建短信
     */
    handleEditPlan() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: '请选择要创建短信的用户',
          type: 'warning',
        });
        return;
      }
      console.log(this.multipleSelection);
      this.$jDynamic.show({
        component: 'detail',
        data: {
          selectCheck: this.multipleSelection,
          confirmfunc: async (value) => {
            console.log(value);
            this.getList();
          },
        },
        render: h => h(detail),
      });
    },
    /**
     * 搜索
     */
    onSearch() {
      this.table.currentPage = 1;
      this.getList();
    },
    /**
     * 重置
     */
    onReset() {
      Object.assign(this.$data, this.$options.data());
      this.table.currentPage = 1;
      /* this.form.keywords = '';
      this.form.gender = '';
      this.form.workUnitName = '';
      this.form.gridId = '';
      this.form.startTime = '';
      this.form.endTime = '';
      this.form.planWay = '';
      this.form.planUserId = '';
      this.form.planUserName = '';*/
      this.onLoad();
    },
    /**
     * 分页
     * @param target
     */
    handleChange(target) {
      // 改变页的时候调用一次，改变每页显示条数的时候也要调用一次
      this.table.currentPage = target;
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped>
  /deep/ .el-table__header-wrapper th{
    padding: 3.5px 0!important;
  }
  /deep/ .select-user-trigger {
    line-height: 37px;
    input{
      border: 1px solid #DDE0E6!important;
      background-color: white!important;
    }
    input, i {
      cursor: pointer;
    }
    &.disabled {
      input, i {
        cursor: not-allowed;
      }
    }
    .el-input__suffix{
      width: 25px;
      right: 5px;
    }
  }
  /deep/ .el-input.is-disabled .el-input__inner{
    cursor: pointer;
    background-color: white!important;
    border: 1px solid #DDE0E6 !important;
  }
</style>
