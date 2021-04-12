<template>
  <div class="intervention_tab_div">
    <div class="follow-plan">
      <el-table :data="tableData" style="width: 100%" align="center">
        <el-table-column prop="planTime" label="计划随访日期" width="150px" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.planDate | getResultDate }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="planWayName" label="随访形式" width="110px" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.planWayName | getResult }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="planTitle" label="随访标题" width="170px" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.planTitle | getResult }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="planContent" label="随访提示" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.planContent | getResult }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="planTitle" label="创建人" width="150px" show-overflow-tooltip
                         v-if="personal">
          <template slot-scope="scope">
            <span>{{scope.row.planUserName | getResult }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
                <el-button
                        v-if="personal && getAccess('wait_visit_plan_exec')"
                        type="text"
                        @click="handleShow(scope.row)"
                >执行</el-button>
            <el-button type="text"
                       v-if="getAccess('visited_record_view')"
                       size="small" @click="handleViewPlan(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
              background
              layout="prev, pager, next, jumper, total, sizes"
              :total="total"
              :page-size="5"
              @current-change="pageClick"
              :pageSizes="[5]"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import userdetailFollowRead from './userdetail_follow_read.vue';
// import elHandleExecuteMdl from '../../../workspace/el_modal/el_handle_execute_mdl.vue';
export default {
  name: 'UserdetailFollowplan',
  props: ['personal', 'clientId'],
  components: {

  },
  data() {
    return {
      menuNum: 0,
      active: 0,
      checkTplPlanList: [],
      tableData: [],
      form: {
        templateId: '',
        templateList: [],
      },
      total: 0,
      pageNo: 1,
    };
  },
  mounted() {
    this.getInterveneListExecuteState2();// 获取随访计划
  },
  methods: {
    /**
     * 获取随访计划
     * @return {Promise<void>}
     */
    async getInterveneListExecuteState2() {
      const reqBody = {
        clientId: this.personal === true ? this.clientId :
          this.$store.state.intervention.checkUserList[0].clientId,
        executeState: 2, // '1309428739553103873',
        pageNo: this.pageNo,
        pageSize: 5,
      };
      const res = await this.$api.interventionPlanInterface.getInterveneList(
        reqBody,
      );
      const { data } = res.data;
      this.tableData = data.list || [];
      this.total = data.total;
    },
    // 显示执行状态弹窗
    handleShow(row) {
      /* this.$jDynamic.show({
        component: 'elHandleExecuteMdl',
        data: {
          id: row.id,
          confirmfunc: () => {
            this.$jDynamic.hide({ component: 'elHandleExecuteMdl' });
            this.getInterveneListExecuteState2();
          },
        },
        render: h => h(elHandleExecuteMdl),
      });*/
      localStorage.setItem('personalHealthActive', 3);
      this.$router.push({
        path: `/health_plan/user_follow_do/do/${row.id}`,
      });
    },
    /**
     * 查看计划
     */
    handleViewPlan(row) {
      this.$jDynamic.show({// 有planId的都是自己编辑的
        component: 'userdetailFollowRead',
        data: {
          executeState: 2, // 计划
          modalTitle: '查看',
          /* planId: this.checkPlanList[0].planId,
          id: this.checkPlanList[0].id, */
          propsData: row,
          confirmfunc: async (value) => {
            console.log(value);
          },
        },
        render: h => h(userdetailFollowRead),
      });
    },
    pageClick(page) {
      console.log(page);
      this.pageNo = page;
      this.getInterveneListExecuteState2();
    },
  },
};
</script>
<style lang="scss" scoped>
  .intervention_tab_div{
    .follow-plan {
   /*   flex: 1;
      width: 75%;*/
      .el-table{
        width: 99.99%!important;
      }
      /deep/ td{
        padding: 18.5px 0;
      }
      .red{
        color: red;
      }
      .warn{
        width: 200px;
        height: 32px;
        line-height: 32px;
        background-color: #fee9e9;
        border-radius: 5px;
        text-align: center;
        font-size: 12px;
        color: #FE2B2A;
        margin-top: 10px;
      }
      .btnDiv{
        display: flex;
        align-items: center;
        justify-content: center;
        .doImg{
          width: 24px;
          height: 24px;
          margin-right: 5px;
        }
      }

      /deep/ .is-background {
        margin-top: 10px;
        float: right;
      }
    }
  }

</style>
