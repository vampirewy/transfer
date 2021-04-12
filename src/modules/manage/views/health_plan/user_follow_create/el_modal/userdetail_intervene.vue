<template>
  <div class="intervention_tab_div">
  <div class="follow-plan">
    <el-table :data="tableData" style="width: 100%" align="center">
      <el-table-column prop="planTitle" label="方案名称" width="130px" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.name | getResult}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="planTime" label="适用时间" width="190px" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>
            {{ scope.row.startTime | getResultDate }} - {{ scope.row.endTime | getResultDate }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="planWayName" label="指导内容" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.lifeAdvice | getResult}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="planContent" label="运动方案" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.sportAdvice | getResult}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="planTitle" label="创建人" width="150px" show-overflow-tooltip
                       v-if="personal">
        <template slot-scope="scope">
          <span>{{scope.row.createUserName | getResult }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="read(scope.row.id)">查看</el-button>
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
import { formatDate } from '~/src/libs/util';

export default {
  name: 'UserdetaiIntervene',
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
    this.getPlanList();// 获取随访方案
  },
  methods: {
    /**
     * 获取随访方案
     * @return {Promise<void>}
     */
    async getPlanList() {
      const reqBody = {
        clientId: this.personal === true ? this.clientId :
          this.$store.state.intervention.checkUserList[0].clientId,
        pageNo: this.pageNo, // '1309465464077815809',
        pageSize: 5,
      };
      const res = await this.$api.interventionPlanInterface.listPage(
        reqBody,
      );
      const { data } = res.data;
      this.tableData = data.list || [];
      this.tableData.forEach((it) => {
        const t = it;
        /* t.planTime = `${new Date().getFullYear()}-${it.month}-${it.day} ${
          it.hours || '00'
        }:${it.minute || '00'}:00`; */
        t.planTitle = t.title;
        t.planDoctor = this.$store.state.user.userName;
        t.planTime = formatDate(new Date(`${new Date().getFullYear()}-${it.month}-${it.day}`), 'YY-MM-DD');
      });
      this.total = data.total;
    },
    pageClick(page) {
      this.pageNo = page;
      this.getPlanList();
    },
    read(id) {
      if (this.personal === true) {
        localStorage.setItem('personalHealthActive', 3);
        this.$router.push({
          path: `/health_plan/intervention_plan/detail/${id}`,
        });
      } else { // 和个人健康跳去不同页面
        this.$emit('read', { interventionId: id });
      }
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
