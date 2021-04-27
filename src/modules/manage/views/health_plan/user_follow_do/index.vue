<template>
    <query-page @reset="onReset" @search="onSearch">
      <template v-slot:left>
        <search>
          <div class="searchInputFormItem">
            <el-input placeholder="姓名/手机号/企业单位" v-model="form.keywords">
              <!-- <el-button slot="append" icon="el-icon-search" @click="onSearch"></el-button>-->
            </el-input>
            <span class="searchBtnImgSpan" @click="onSearch">
            <img class="searchBtnImg" src="@/assets/images/common/search.png"/>
          </span>
          </div>
        </search>
        <query-filter>
          <el-select placeholder="性别" v-model="form.gender" clearable>
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="2"></el-option>
          </el-select>
          <!--<el-input placeholder="企业单位" v-model="form.workUnitName"></el-input>-->
          <el-select placeholder="人员类别" v-model="form.gridId" clearable>
            <el-option :label="item.gridName" :value="item.id" v-for="item in gridList"
                       :key="item.id"></el-option>
          </el-select>
          <el-date-picker
                  v-model="form.startTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerStartTime"
                  placeholder="选择开始日期"
                  style="width: 180px"
          >
          </el-date-picker>
          <el-date-picker
                  v-model="form.endTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerEndTime"
                  placeholder="选择结束日期"
                  style="width: 180px"
          >
          </el-date-picker>
          <el-select placeholder="随访形式" v-model="form.planWay" clearable>
            <el-option :label="item.name" :value="item.id" v-for="item in planWayList"
                       :key="item.id"></el-option>
          </el-select>
          <el-popover
                  ref="userPopover"
                  placement="top-start"
                  width="545"
                  trigger="click"
                  @show="planuserModalVisible = true"
                  @hide="planuserModalVisible = false"
          >
            <manager-list v-if="planuserModalVisible"
                          @change="handlePlanuserClose"></manager-list>
            <el-input class="select-user-trigger" slot="reference"
                      :disabled="form.planUserId !== '' ? false : true"
                      v-model="form.planUserName" placeholder="干预人">
              <i :class="`el-icon-arrow-${planuserModalVisible ? 'up' : 'down'}`"
                 slot="suffix"></i>
            </el-input>
          </el-popover>
        </query-filter>
      </template>
      <template v-slot:right>
        <div class="user-follow">
          <div class="tableTopDoDiv">
            <div class="divRightTitleDiv">
              <div class="divRightTitle"><span>|</span>待随访计划</div>
            </div>
            <div class="table-operate-buttons">
              <!--<operate-button
                      type="edit"
                      @click="handleEditPlan"
              ></operate-button>-->
              <operate-button
                      type="delete"
                      @click="handleSomeRemove"
                      v-if="getAccess('wait_visit_plan_batch_delete')
              "></operate-button>
            </div>
          </div>
          <el-table :data="table.list" style="width: 100%" align="center" ref="table"
                    @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column prop="clientNo" label="客户编号" min-width="90" show-overflow-tooltip>
              <template slot-scope="scope">
          <span :class="{'redToday': scope.row.todayPlanDate === 1,
                          'overToday': scope.row.executeState === 3}">
            {{ scope.row.clientNo | getResult }}</span>
              </template>
            </el-table-column>
            <el-table-column
                    prop="clientName"
                    label="姓名"
                    width="70"
                    show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span class="clientName"
                      @click="commonHref.toPersonalHealth(scope.row.clientId, $router)">
                  {{ scope.row.clientName | getResult}}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="gender" label="性别" width="55px">
              <template slot-scope="scope">
                <span :class="{'redToday': scope.row.todayPlanDate === 1,
                          'overToday': scope.row.executeState === 3}"
                      >{{scope.row.gender | getResultGender}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="age" label="年龄" width="60px">
              <template slot-scope="scope">
                <span :class="{'redToday': scope.row.todayPlanDate === 1,
                          'overToday': scope.row.executeState === 3}">
              {{ scope.row.age | getResult }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="gridName" label="人员类别" show-overflow-tooltip>
              <template slot-scope="scope">
          <span :class="{'redToday': scope.row.todayPlanDate === 1,
                          'overToday': scope.row.executeState === 3}">
            {{ scope.row.gridName | getResult}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="workUnitName" label="单位">
              <template slot-scope="scope">
                <span :class="{'redToday': scope.row.todayPlanDate === 1,
                          'overToday': scope.row.executeState === 3}">
            {{ scope.row.workUnitName | getResult}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="mobile" label="手机号码" width="90px" show-overflow-tooltip>
              <template slot-scope="scope">
                <span :class="{'redToday': scope.row.todayPlanDate === 1,
                          'overToday': scope.row.executeState === 3}">
            {{ scope.row.mobile | getResult}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="planUserName" label="干预人" show-overflow-tooltip>
              <template slot-scope="scope">
          <span :class="{'redToday': scope.row.todayPlanDate === 1,
                          'overToday': scope.row.executeState === 3}">
            {{ scope.row.planUserName | getResult}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="planUserName" label="随访形式" show-overflow-tooltip>
              <template slot-scope="scope">
          <span :class="{'redToday': scope.row.todayPlanDate === 1,
                          'overToday': scope.row.executeState === 3}">
            {{ scope.row.planWayName | getResult}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="planUserName" label="随访标题" show-overflow-tooltip>
              <template slot-scope="scope">
          <span :class="{'redToday': scope.row.todayPlanDate === 1,
                          'overToday': scope.row.executeState === 3}">
            {{ scope.row.planTitle | getResult}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="planUserName" label="随访内容" show-overflow-tooltip>
              <template slot-scope="scope">
          <span :class="{'redToday': scope.row.todayPlanDate === 1,
                          'overToday': scope.row.executeState === 3}">
            {{ scope.row.planContent | getResult}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="templateQuestionName" label="随访问卷" show-overflow-tooltip>
              <template slot-scope="scope">
          <span :class="{'redToday': scope.row.todayPlanDate === 1,
                          'overToday': scope.row.executeState === 3}">
            {{ scope.row.templateQuestionName | getResult}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="executeTime" label="计划日期" width="120px" show-overflow-tooltip>
              <template slot-scope="scope">
          <span :class="{'redToday': scope.row.todayPlanDate === 1,
                          'overToday': scope.row.executeState === 3}"
          >{{ scope.row.planDate | getResultDate}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="executeTime" label="*创建人" show-overflow-tooltip>
              <template slot-scope="scope">
          <span :class="{'redToday': scope.row.todayPlanDate === 1,
                          'overToday': scope.row.executeState === 3}"
          >{{ scope.row.planUserName | getResultDate}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="110">
              <template slot-scope="scope">
                <el-button
                        type="text"
                        size="small"
                        @click="handleEditPlan(scope.row)"
                        v-if="getAccess('wait_visit_plan_edit')"
                >编辑</el-button
                >
                <el-button type="text" size="small"
                           v-if="getAccess('wait_visit_plan_exec')"
                           @click="viewiFollowPlanDetail(scope.row)">执行</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="warn">
            注：表格内红色文字代表当天计划
          </div>
          <div class="over">
            注：表格内橙色文字代表已逾期计划
          </div>
          <el-pagination
                  background
                  @current-change="handleChange"
                  :current-page="table.currentPage"
                  :page-size="table.pageSize"
                  layout="prev, pager, next, jumper, total, sizes"
                  :total="table.totalCount"
                  :pageSizes="[15]"
                  :pager-count="4"
          >
          </el-pagination>
        </div>
      </template>
    </query-page>
</template>

<script>
import { genderList, executeStateList } from '~/src/constant/health_plan';
import QueryPage from '~/src/components/query_page/index.vue';
import Search from '~/src/components/query_page/search.vue';
import QueryFilter from '~/src/components/query_page/query_filter.vue';
import OperateButton from '~/src/components/query_page/operate_button.vue';
import ManagerList from '@/components/user_health/manager_list.vue';
import deleteIcon from '~/src/assets/images/message-box-delete@2x.png';
import InterventionAddMdl from '../user_follow_create/el_modal/intervention_add_mdl.vue';
export default {
  name: 'user_follow_do',
  components: {
    QueryPage,
    Search,
    QueryFilter,
    OperateButton,
    ManagerList,
    InterventionAddMdl,
  },
  data() {
    return {
      form: {
        keywords: '', // 关键字
        gender: '', // 性别
        workUnitName: '', // 企业单位
        planUserId: '',
        planUserName: '',
        planDate: '',
        planWay: '', // 随访方式
        startTime: '',
        endTime: '',
        executeState: '2', // 状态
        gridId: '', // 客户类型
        genderList,
        executeStateList,
      },
      selectPlanuser: [],
      planuserModalVisible: false, // 干预人人列表弹窗
      gridList: [], // 人员类别下拉框
      planWayList: [], // 随访形式下拉框
      table: {
        list: [],
        totalCount: 0,
        currentPage: 1,
        pageSize: 15,
      },
      multipleSelection: [], // 当前页选中的数据
      pickerStartTime: {
        disabledDate: (time) => {
          if (this.form.endTime) {
            const endTime = new Date(this.form.endTime);
            return time.getTime() > new Date(endTime).getTime() - (3600 * 1000 * 23 * 1);
          }
        },
      },
      pickerEndTime: {
        disabledDate: (time) => {
          if (this.form.startTime) {
            const startTime = new Date(this.form.startTime);
            return time.getTime() < new Date(startTime).getTime() - (3600 * 1000 * 23 * 1);
          }
        },
      },
    };
  },
  activated() {
    this.onLoad();
  },
  methods: {
    handleSelectionChange(val) {
      // table组件选中事件,
      this.multipleSelection = val;
    },
    onLoad() {
      this.getList();
      this.getPlanWayList();
      this.getGridList(); // 获取人员列类别
    },
    // 关闭干预人列表
    handlePlanuserClose(data) {
      this.$refs.userPopover.doClose();
      this.planuserModalVisible = false;
      this.form.planUserId = data.id;
      this.form.planUserName = data.realName;
    },
    /**
     * 获取随访列表
     * @return {Promise<void>}
     */
    async getList() {
      const reqBody = {
        planWay: this.form.planWay,
        executeState: this.form.executeState,
        overdueExecuteState: 3,
        workbenchSort: 'workbenchSort',
        gender: this.form.gender,
        startTime: this.form.startTime,
        endTime: this.form.endTime,
        gridId: this.form.gridId,
        planUserId: this.form.planUserId,
        keywords: this.form.keywords,
        workUnitName: this.form.workUnitName,
        pageNo: this.table.currentPage,
        pageSize: this.table.pageSize,
      };
      const res = await this.$api.userFollowInterface.getIntervenePlanListPage(
        reqBody,
      );
      const { data } = res.data;
      if (data) {
        this.table.list = data.data || [];
        this.table.totalCount = data.total;
      }
    },
    /**
     * 获取随访方式
     * @return {Promise<void>}
     */
    async getPlanWayList() {
      const res = await this.$api.userFollowInterface.getIntervenePlanWayList();
      const { data } = res.data;
      const list = data.map((it) => {
        const { id, name } = it;
        return { id, name };
      });
      // list.unshift({ name: '全部', value: '' });
      this.planWayList = list;
    },
    /**
     * 获取人员类别
     * @return {Promise<void>}
     */
    async getGridList() {
      const res = await this.$api.userManagerInterface.getGridList({ pageNo: 1, pageSize: 10000 });
      const { data } = res.data;
      /* const list = data.map((it) => {
         const { id, name } = it;
         return { id, name };
       }); */
      // list.unshift({ name: '全部', value: '' });
      this.gridList = data.list;
    },
    /**
     * 新增随访
     * @return {Promise<ElMessageComponent>}
     */
    async editUserFollow(value) {
      const clientIds = [value.clientId];
      const intervenePlans = [Object.assign({}, value)];
      intervenePlans.forEach((it) => {
        const setIt = it;
        setIt.ignore = false;
        setIt.planUserId = it.planDoctor;
        if (it.planTime.split(' ').length === 1) {
          setIt.planDate = `${it.planTime} 00:00:00`; // 编辑重选时间要重新设
        } else if (it.planTime.split(' ').length === 2) {
          setIt.planDate = it.planTime;
        }
      });
      const result = intervenePlans.filter(it => !it.ignore);
      const reqBody = {
        // id: value.id,
        organId: '', // 区域id
        clientIds, // 客户id
        intervenePlans: result,
        // executeState: '2', // 执行状态-值为1已执行，2待执行
      };
      await this.$api.userFollowInterface.saveIntervenePlan(reqBody);
      this.$message.success('操作成功');
      return this.getList();
    },
    /**
     * 编辑计划
     */
    handleEditPlan(row) {
      /* if (this.multipleSelection.length !== 1) {
        this.$message({
          message: '请选择一条记录编辑',
          type: 'warning',
        });
        return;
      }*/
      // console.log(this.multipleSelection[0]);
      const Row = row;
      Row.planTime = Row.planDate;
      this.$jDynamic.show({// 有planId的都是自己编辑的
        component: 'InterventionAddMdl',
        data: {
          modalType: 2,
          addType: '2', // 个人创建 / 批量创建
          editType: 2, // 计划重新编辑
          modalTitle: '编辑',
          // planId: this.multipleSelection[0].planId,
          // id: this.checkPlanList[0].id,
          propsData: Row,
          confirmfunc: async (value) => {
            const Value = value;
            Value.id = Row.id;
            Value.clientId = Row.clientId;
            this.editUserFollow(Value);
          },
        },
        render: h => h(InterventionAddMdl),
      });
    },
    /**
     * 批量删除
     */
    handleSomeRemove() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: '请选择要删除的记录',
          type: 'warning',
        });
        return;
      }
      this.$confirm(`<div class="delete-text-content"><img class="delete-icon" src="${deleteIcon}"/><span>该操作无法撤销，是否确认删除！</span></div>`, '删除提示', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'message-box-customize',
        showClose: true,
      }).then(
        async () => {
          const idsList = [];
          this.multipleSelection.forEach((value) => {
            idsList.push(value.id);
          });
          const reqBody = idsList;
          await this.$api.userFollowInterface.deleteSomeFollowplanDel(
            reqBody,
          );
          this.$message.success('操作成功');
          return this.getList();
        },
      );
    },
    viewiFollowPlanDetail(row) {
      this.$router.push({
        path: `/health_plan/user_follow_do/do/${row.id}`,
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
      // Object.assign(this.$data, this.$options.data());
      this.table.currentPage = 1;
      this.form.keywords = '';
      this.form.gender = '';
      this.form.workUnitName = '';
      this.form.gridId = '';
      this.form.startTime = '';
      this.form.endTime = '';
      this.form.planWay = '';
      this.form.planUserId = '';
      this.form.planUserName = '';
      this.onLoad();
    },
    /**
     * 关闭
     * @param scope
     */
    handleClose(scope) {
      this.$confirm('确定要关闭吗?', '提示', { type: 'warning' }).then(
        async () => {
          const reqBody = {
            id: scope.id,
            organId: '', // 区域id
            clientId: '', // 客户id
            planWay: scope.planWay, // 计划干预方式
            planTitle: scope.planTitle, // 随访标题
            planContent: scope.planContent, // 随访内容
            planDate: scope.planDate, // 计划日期
            planRemark: scope.planRemarrk, // 计划备注
            executeState: '4', // 执行状态关闭-值为4
            executePlanWay: '', // 执行干预方式
            executePlanContent: '', // 执行内容
            assortLevel: scope.assortLevel, // 配合度 系统参数
            collectionQuestionType: scope.collectionQuestionType, // 需要收集的问卷类型
          };
          await this.$api.userFollowInterface.intervenePlanUpdate(reqBody);
          this.$message.success('操作成功');
          return this.getList();
        },
      );
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
  /deep/ .select-user-trigger {
    line-height: 37px;
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
    }
  }
  /deep/ .el-input.is-disabled .el-input__inner{
    background-color: white;
    border-color: white;
    cursor: pointer;
  }
  .user-follow {
    /*padding: 20px 32px 15px 32px;*/
    .warn{
      padding: 0 10px;
      height: 32px;
      line-height: 32px;
      background-color: #fee9e9;
      border-radius: 5px;
      text-align: center;
      font-size: 12px;
      color: #FE2B2A;
      margin-top: 10px;
      float: left;
    }
    .over{
      padding: 0 10px;
      height: 32px;
      line-height: 32px;
      background-color: #FCF7EE;
      border-radius: 5px;
      text-align: center;
      font-size: 12px;
      color: #fd9d00;
      margin-top: 10px;
      margin-left: 15px;
      float: left;
    }
    .tool-button {
      margin-bottom: 16px;
    }
    .search-btn {
      float: right;
      margin-right: 0;
    }
    /*.el-button + .el-button {
      margin-left: 8px;
    }*/
    .el-pagination {
      padding: 10px 0;
      text-align: right;
    }
  }
</style>
