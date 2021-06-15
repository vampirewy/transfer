<template>
  <div class="intervention_tab_div">
    <div class="follow-plan">
      <el-table :data="tableData" style="width: 100%" align="center">
        <el-table-column prop="executeTime" label="执行日期" width="150px" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.executeTime | getResultDate }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="executePlanWayName" label="随访形式" width="110px" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.executePlanWayName | getResult }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="executePlanTitle" label="随访标题" width="170px" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.executePlanTitle | getResult }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="executePlanContent" label="随访结果" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.executePlanContent | getResult }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="executePlanContent" label="干预人" show-overflow-tooltip
                         v-if="personal">
          <template slot-scope="scope">
            <span>{{ scope.row.executeUserName | getResult }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small"
                       v-if="getAccess('visited_record_view')"
                       @click="handleViewPlan(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
              background
              layout="prev, pager, next, jumper, total, sizes"
              :total="total"
              :current-page="pageNo"
              :page-size="pageSize"
              @current-change="pageClick"
              :pageSizes="[pageSize]"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
// import { formatDate } from '~/src/libs/util';
// import userdetailFollowRead from './userdetail_follow_read.vue';

export default {
  name: 'UserdetailFollowrecord',
  props: ['personal', 'clientId', 'propsPageSize'],
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
      pageSize: 5,
    };
  },
  mounted() {
    this.pageSize = this.propsPageSize || this.pageSize;
    this.getInterveneListExecuteState1();// 获取随访记录
  },
  methods: {
    /**
     * 获取随访记录
     * @return {Promise<void>}
     */
    async getInterveneListExecuteState1() {
      const reqBody = { // 判断是否是个人健康中心的
        clientId: this.personal === true ? this.clientId :
          this.$store.state.intervention.checkUserList[0].clientId,
        executeState: 1, // '1303606179821260802',
        pageNo: this.pageNo,
        pageSize: this.pageSize,
      };
      const res = await this.$api.interventionPlanInterface.getInterveneList(
        reqBody,
      );
      const { data } = res.data;
      this.tableData = data.data || [];
      this.total = data.total;
    },
    /**
     * 查看计划
     */
    handleViewPlan(row) {
      /* this.$jDynamic.show({// 有planId的都是自己编辑的
        component: 'userdetailFollowRead',
        data: {
          executeState: 1, // 记录
          modalTitle: '查看',
          /!* planId: this.checkPlanList[0].planId,
          id: this.checkPlanList[0].id, *!/
          propsData: row,
          confirmfunc: async (value) => {
            console.log(value);
          },
        },
        render: h => h(userdetailFollowRead),
      });*/
      localStorage.setItem('personalHealthActive', 4);
      this.$router.push({
        path: `/health_plan/user_follow_do/view/${row.id}`,
      });
    },
    pageClick(page) {
      this.pageNo = page;
      this.getInterveneListExecuteState1();
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
        // padding: 18.5px 0;
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
