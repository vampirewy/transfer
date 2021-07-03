<template>
  <div class="create-edit">
    <el-row v-if="viewIndex === 1">
      <el-col :span="14" style="margin-top: -35px;"
              v-if="$route.params.type === '1'"> <!--单个创建-->
        <el-tabs v-model="activeName" class="two-tab">
          <el-tab-pane label="干预随访模板" name="first">
            <intervention-tab-mdl ref="InterventionTabMdl"></intervention-tab-mdl>
          </el-tab-pane>
          <el-tab-pane label="客户的主要健康状况" name="second">
            <intervention-tab-userdetail-mdl @read="viewiInterventionDetail">
            </intervention-tab-userdetail-mdl>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="11" v-if="$route.params.type === '2'">
        <intervention-somecreate-mdl></intervention-somecreate-mdl> <!--批量创建-->
      </el-col>
      <el-col :span="$route.params.type === '1' ? 10 : 13"  style="padding-left: 20px;"> <!--9-->
        <div class="tableTopDoDiv" style="display: block">
          <div class="divRightTitleDiv">
            <div class="divRightTitle" style="margin-top: 14px">
              {{$route.params.type === '2' ? '批量创建' : '计划列表'}}<div class="titleBiao"></div></div>
          </div>
          <div class="table-operate-buttons">
            <operate-button
                    type="add"
                    @click="handleCreatePlan"
                ></operate-button>
            <!--<operate-button
                    type="edit"
                    @click="handleEditPlan"
            ></operate-button>-->
            <operate-button
                    type="delete"
                    @click="handleDeletePlan"
                ></operate-button>
            <operate-button
                    type="together"
                    @click="handleTogetherPlan"
            ></operate-button>
          </div>
        </div>
        <el-form
                :inline="false"
                :label-position="labelPosition"
                :model="form"
                class="form-inline"
        >

          <el-table
                  :data="filterTableList"
                  align="center"
                  style="width: 100%"
                  :row-class-name="rowSameTime"
                  @selection-change="chooseCheckBox"
          >
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column prop="planTime" label="随访日期" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.planTime }}</span>
              </template>
            </el-table-column>

            <el-table-column prop="planWay" label="随访形式" show-overflow-tooltip>
              <template slot-scope="scope">
            <span v-if="!scope.row.edit">{{
              form.planWayList.find(t => t.id === scope.row.planWay)
                ? form.planWayList.find(t => t.id === scope.row.planWay).name
                : ''
            }}</span>
                <el-select
                        v-model="scope.row.planWay"
                        v-if="scope.row.edit"
                        placeholder="请选择随访方式"
                        style="width: 120px"
                >
                  <el-option
                          :label="it.name"
                          :value="it.id"
                          :key="it.id"
                          v-for="it in form.planWayList"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="planDoctorName" label="随访人" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.planDoctorName }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="planTitle" label="随访标题" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.planTitle }}</span>
              </template>
            </el-table-column>

            <el-table-column prop="planContent" label="随访提示" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.planContent }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="action" label="操作" width="70">
              <template slot-scope="scope">
                <el-button
                        type="text"
                        size="small"
                        @click="handleEditOnePlan(scope.row)"
                >编辑
                </el-button>
              </template>
            </el-table-column>
          </el-table>

          <div class="footer">
            <el-button size="small" class="cancelBtn" @click="cancel">返回</el-button>
            <el-button class="sureBtn" type="primary" size="small" @click="save">保存</el-button>
          </div>
        </el-form>
      </el-col>
    </el-row>
    <template v-else-if="viewIndex === 2">
      <intervention-detail :propsData="InterventionDetailRow"
                           @cancel="viewIndex = 1"></intervention-detail>
    </template>
  </div>
</template>

<script>
import OperateButton from '~/src/components/query_page/operate_button.vue';
import InterventionTabMdl from './el_modal/intervention_tab_mdl.vue';
import InterventionTabUserdetailMdl from './el_modal/intervention_tab_userdetail_mdl.vue';
import InterventionAddMdl from './el_modal/intervention_add_mdl.vue';
import InterventionSomecreateMdl from './el_modal/intervention_somecreate_mdl.vue';
import deleteIcon from '~/src/assets/images/deleteicon.png';
import InterventionDetail from './el_modal/intervention_detail.vue';

export default {
  name: 'create_edit',
  components: {
    InterventionTabMdl,
    InterventionTabUserdetailMdl,
    InterventionAddMdl,
    InterventionSomecreateMdl,
    InterventionDetail,
    OperateButton,
  },
  data() {
    return {
      viewIndex: 1,
      InterventionDetailRow: {}, // 随访子组建的数据
      activeName: 'first',
      routeType: 1, // 1新增 2编辑
      labelPosition: 'top',
      form: {
        userList: [],
        planWayList: [],
      },
      table: {
        list: [],
      },
      checkPlanList: [],
      sportAdvice: [],
    };
  },
  computed: {
    filterTableList() {
      // return this.table.list.filter(it => it.deleted === 0);
      // return this.table.list;
      const Table = [...this.$store.state.intervention.tplList];
      return Table;
    },
  },
  mounted() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      this.getPlanWayList();
      const route = this.$route;
      if (route.meta.type === 'user_follow_create_create') {
        this.routeType = 1;
      } else if (route.meta.type === 'user_follow_create_edit') {
        this.routeType = 2;
        this.getDetail();
      }
    },
    // 相同时间的设置背景色
    rowSameTime({ row }) {
      const TplList = [...this.$store.state.intervention.tplList];
      let same = 0;
      TplList.forEach((valueChild) => {
        if (row.planTime === valueChild.planTime) {
          same += 1;
        }
      });
      if (same >= 2) {
        return 'warning-row';
      }
    },
    /**
     * 获取随访计划方式列表
     */
    async getPlanWayList() {
      const res = await this.$api.userFollowInterface.getIntervenePlanWayList();
      const { data } = res.data;
      const list = data.map((it) => {
        const { id, name } = it;
        return { id, name };
      });
      this.form.planWayList = list;
    },
    /**
     * 查看随访明细
     */
    async getDetail() {
      const reqBody = { id: this.$route.params.id };
      const res = await this.$api.userFollowInterface.getIntervenePlan(
        reqBody,
      );
      const { data } = res.data;
      if (data) {
        this.form.userList = [
          {
            name: data.clientName || '',
            id: data.clientId,
          },
        ];

        this.table.list = [data];
        this.table.list.forEach((it) => {
          const t = it;
          t.deleted = 0;
          t.edit = false;
          t.executeState = '2'; // 待执行
        });
      }
    },
    viewiInterventionDetail(row) {
      this.viewIndex = 2;
      this.InterventionDetailRow = {
        ...row,
      };
    },
    chooseCheckBox(val) {
      this.checkPlanList = val;
    },
    /**
     * 新增计划
     */
    handleCreatePlan() {
      this.$jDynamic.show({
        component: 'InterventionAddMdl',
        data: {
          modalType: 1,
          addType: this.$route.params.type, // 个人创建 / 批量创建
          modalTitle: '新增',
          confirmfunc: async (value) => {
            const getStateTplList = this.$store.state.intervention.tplList;
            getStateTplList.push(value);
            this.$store.dispatch('intervention/setTplList', getStateTplList);
            // this.table.list.push(value);
          },
        },
        render: h => h(InterventionAddMdl),
      });
    },
    /**
     * 单个编辑计划
     */
    handleEditOnePlan(row) {
      /* if (this.checkPlanList.length !== 1) {
        this.$message({
          message: '请选择一条记录编辑',
          type: 'warning',
        });
        return;
      } */
      this.$jDynamic.show({// 有planId的都是自己新增/编辑的
        component: 'InterventionAddMdl',
        data: {
          modalType: 2,
          addType: this.$route.params.type, // 个人创建 / 批量创建
          modalTitle: '编辑',
          planId: row.planId,
          id: row.id,
          propsData: row,
          confirmfunc: async (value) => {
            const getStateTplList = [...this.$store.state.intervention.tplList];
            const resetStateTplList = [];
            const doID = [];
            getStateTplList.forEach((valueOld) => {
              const ValueOld = Object.assign({}, valueOld);
              if (ValueOld.id === value.id && !ValueOld.planId) {
                doID.push(value.id);
              }
              if (ValueOld.planId === value.planId ||
                (ValueOld.id === value.id && value.id !== undefined)) { // 勾选数据等于以前数据 且不是空
                ValueOld.planId = value.planId;
                ValueOld.planTime = value.planTime;
                ValueOld.planWay = value.planWay;
                ValueOld.planDoctor = value.planDoctor;
                ValueOld.planDoctorName = value.planDoctorName;
                ValueOld.planTitle = value.planTitle;
                ValueOld.planContent = value.planContent;
                ValueOld.templateQuestionId = value.templateQuestionId;
                ValueOld.templateQuestionName = value.templateQuestionName;
                delete ValueOld.id; // 防止重新勾选不push
              }
              resetStateTplList.push(ValueOld);
            });
            this.$store.dispatch('intervention/setTplList', resetStateTplList);
            if (this.$route.params.type === '1') {
              this.$refs.InterventionTabMdl.resetMultipleSelectionAll(doID);
            }
          },
        },
        render: h => h(InterventionAddMdl),
      });
    },
    /**
     * 批量编辑计划
     */
    handleEditPlan() {
      if (this.checkPlanList.length !== 1) {
        this.$message({
          message: '请选择一条记录编辑',
          type: 'warning',
        });
        return;
      }
      this.$jDynamic.show({// 有planId的都是自己新增/编辑的
        component: 'InterventionAddMdl',
        data: {
          modalType: 2,
          addType: this.$route.params.type, // 个人创建 / 批量创建
          modalTitle: '编辑',
          planId: this.checkPlanList[0].planId,
          id: this.checkPlanList[0].id,
          propsData: this.checkPlanList[0],
          confirmfunc: async (value) => {
            const getStateTplList = [...this.$store.state.intervention.tplList];
            const resetStateTplList = [];
            const doID = [];
            getStateTplList.forEach((valueOld) => {
              const ValueOld = Object.assign({}, valueOld);
              if (ValueOld.id === value.id && !ValueOld.planId) {
                doID.push(value.id);
              }
              if (ValueOld.planId === value.planId ||
                (ValueOld.id === value.id && value.id !== undefined)) { // 勾选数据等于以前数据 且不是空
                ValueOld.planId = value.planId;
                ValueOld.planTime = value.planTime;
                ValueOld.planWay = value.planWay;
                ValueOld.planDoctor = value.planDoctor;
                ValueOld.planDoctorName = value.planDoctorName;
                ValueOld.planTitle = value.planTitle;
                ValueOld.planContent = value.planContent;
                ValueOld.templateQuestionId = value.templateQuestionId;
                ValueOld.templateQuestionName = value.templateQuestionName;
                delete ValueOld.id; // 防止重新勾选不push
              }
              resetStateTplList.push(ValueOld);
            });
            this.$store.dispatch('intervention/setTplList', resetStateTplList);
            if (this.$route.params.type === '1') {
              this.$refs.InterventionTabMdl.resetMultipleSelectionAll(doID);
            }
          },
        },
        render: h => h(InterventionAddMdl),
      });
    },
    /**
     * 删除计划
     */
    handleDeletePlan() {
      if (this.checkPlanList.length === 0) {
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
          const doID = [];
          const getStateTplList = [...this.$store.state.intervention.tplList];
          this.checkPlanList.forEach((value) => {
            const idx = getStateTplList.findIndex((it) => {
              if (it.id) {
                return it.id === value.id;
              }
              return it.planId === value.planId;
            });
            getStateTplList.splice(idx, 1);
            if (value.id) { // id存在则是勾选的， 此处可能还应判断有无编辑过，编辑过就不去调refs方法了
              doID.push(value.id);
            }
          });
          if (this.$route.params.type === '1') {
            this.$refs.InterventionTabMdl.resetMultipleSelectionAll(doID);
          }
          this.$store.dispatch('intervention/setTplList', getStateTplList);
        },
      );
    },
    /**
     * 合并计划
     */
    handleTogetherPlan() {
      if (this.checkPlanList.length < 2) {
        this.$message({
          message: '请选择至少两条记录进行合并',
          type: 'warning',
        });
        return;
      }
      this.$jDynamic.show({// 有planId的都是自己编辑的
        component: 'InterventionAddMdl',
        data: {
          modalType: 3,
          addType: this.$route.params.type, // 个人创建 / 批量创建
          modalTitle: '合并计划',
          // planId: this.checkPlanList[0].planId,
          // id: this.checkPlanList[0].id,
          propsData: this.checkPlanList,
          confirmfunc: async (value) => {
            const doID = [];
            const getStateTplList = [...this.$store.state.intervention.tplList];
            getStateTplList.push(value);
            this.checkPlanList.forEach((valueCheck) => {
              const idx = getStateTplList.findIndex((it) => {
                if (it.id) {
                  return it.id === valueCheck.id;
                }
                return it.planId === valueCheck.planId;
              });
              if (valueCheck.id) { // id存在则是勾选的， 此处可能还应判断有无编辑过，编辑过就不去调refs方法了
                doID.push(valueCheck.id);
              }
              getStateTplList.splice(idx, 1);
            });
            if (this.$route.params.type === '1') {
              this.$refs.InterventionTabMdl.resetMultipleSelectionAll(doID);
            }
            this.$store.dispatch('intervention/setTplList', getStateTplList);
          },
        },
        render: h => h(InterventionAddMdl),
      });
    },
    cancel() {
      this.$store.dispatch('intervention/setTplList', []);
      this.$router.push({
        path: '/health_plan/create_plan',
      });
    },
    /**
     * 新增随访
     * @return {Promise<ElMessageComponent>}
     */
    async save() {
      if (this.$store.state.intervention.tplList.length === 0) {
        return this.$message.warning('请新增至少一条计划');
      }
      const clientIds = this.$store.state.intervention.checkUserList.map(it => it.clientId);
      const intervenePlans = this.$store.state.intervention.tplList;
      intervenePlans.forEach((it) => {
        const setIt = it;
        setIt.ignore = false;
        setIt.planUserId = it.planDoctor;
        setIt.planDate = `${it.planTime} 00:00:00`;
        delete setIt.id;
      });
      const result = intervenePlans.filter(it => !it.ignore);
      // const planDateList = result.filter(it => !!it.planTime);
      // const planWayList = result.filter(it => !!it.planWay);

      /* if (!clientIds.length) {
        return this.$message.warning('请选择客户');
      } */

      /* if (planDateList.length !== result.length) {
        return this.$message.warning('随访时间不能为空');
      }

      if (planWayList.length !== result.length) {
        return this.$message.warning('随访方式不能为空');
      } */

      const reqBody = {
        organId: '', // 区域id
        clientIds, // 客户id
        intervenePlans: result,
        executeState: '2', // 执行状态-值为1已执行，2待执行
      };

      /* if (this.routeType === 2) {
        reqBody.id = this.$route.params.id; // 随访id
      } */

      await this.$api.userFollowInterface.saveIntervenePlan(reqBody);
      if (this.routeType === 1) {
        Object.assign(this.$data, this.$options.data());
      }
      // this.$store.dispatch('intervention/setTplList', []);
      this.$message.success('操作成功');
      this.cancel();
    },
  },
};
</script>

<style lang="scss" scoped>
.create-edit {
  .table-operate-buttons{
    z-index: 9;
    position: relative;
    margin: -48px 0 15px 0;
    float: right;
    justify-content: flex-start;
  }
  // padding: 10px;
  /deep/ .el-textarea__inner {
    min-height: 40px !important;
  }
  /deep/ .el-table .warning-row {
    background: #fdf5e6;
  }
  .footer {
    width: 100%;
    margin-top: 40px;
    text-align: center;
    padding: 10px 0;
  }
  .two-tab {
    margin-top: 30px;
    background: #ffffff;
    padding-bottom: 0;
    /deep/ .el-tabs__nav-wrap{
      .el-tabs__active-bar{
        width: 35px!important;
        background-color: #3154AC;
      }
      &:after{
        width: calc(100% - 20px);
      }
    }
    /deep/ .el-tabs__content {
      padding: 12px 20px 0 0 ;
      margin-top: -10px;
      border-right: 1px dashed #DDE0E6;
    }
    /deep/ .el-tabs__item{
      color: #97A6BD;
      &.is-active{
        color: #333333;
        font-weight: bold;
        font-size: 16px;
      }
    }
  }
}
</style>
