<template>
  <div class="follow-plan">
    <el-table :data="tableData" style="width: 100%" align="center">
      <el-table-column prop="clientName" label="姓名" width="100px" show-overflow-tooltip>
        <template slot-scope="scope">
             <span class="clientName"
                   @click="commonHref.toPersonalHealth(scope.row.clientId, $router)">
               {{ scope.row.clientName | getResult}}
             </span>
        </template>
      </el-table-column>
      <el-table-column prop="clientNo" label="客户编号" width="215px" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.clientNo | getResult}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="gender" label="性别" width="70px" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.gender | getResultGender}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="gridName" label="人员类别" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.gridName | getResult}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="planDate" label="随访时间" width="110px" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.planDate | getResultDate }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="planWayName" label="随访形式" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.planWayName | getResult}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="planWayName" label="干预人" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.planUserName | getResult}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="planTitle" label="随访标题" width="200px" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.planTitle | getResult}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="planContent" label="随访内容" width="260px" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.planContent | getResult}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="address" label="体检报告" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="getLook(scope.row)">查看</el-button>
        </template>
      </el-table-column>-->
      <el-table-column prop="address" label="操作" width="100px">
        <template slot-scope="scope">
          <div class="btnDiv">
            <img class="doImg" src="@/assets/images/space/do.png"/>
            <el-button
              type="text"
              @click="handleShow(scope.row)"
            >执行</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next, jumper, total, sizes"
      :total="total"
      :page-size="15"
      :current-page.sync="currentPage"
      @current-change="pageClick"
      :pageSizes="[15]"
    ></el-pagination>
  </div>
</template>
<script>
// import elHandleExecuteMdl from '../el_modal/el_handle_execute_mdl.vue';
export default {
  name: 'FollowPlanOverDue',
  props: ['type'],
  data() {
    return {
      tableData: [],
      total: 0,
      currentPage: 1,
    };
  },
  mounted() {
    this.getFollowList();
  },
  methods: {
    getLook(row) {
      this.$router.push({
        name: 'report_edit',
        params: {
          id: `${row.id}`,
        },
      });
    },
    pageClick(page) {
      this.currentPage = page;
      this.getFollowList();
    },
    getFollowList() {
      this.$api.workspace
        .followPlanList({
          pageSize: 15,
          pageNo: this.currentPage,
          executeState: 3,
        })
        .then((res) => {
          const { data } = res;
          if (data.code === 200) {
            const result = data.data;
            this.tableData = result.list || {};
            this.total = result.total || 0;
            console.log(result.total);
          }
        });
    },
    // 显示执行状态弹窗
    handleShow(row) {
      /* this.$jDynamic.show({
        component: 'elHandleExecuteMdl',
        data: {
          id: scope.id,
          confirmfunc: () => {
            this.$jDynamic.hide({ component: 'elHandleExecuteMdl' });
            this.getFollowList();
          },
        },
        render: h => h(elHandleExecuteMdl),
      });*/
      localStorage.setItem('serviceOrderActiveWorkspace', 'second');
      this.$router.push({
        path: `/health_plan/user_follow_do/do/${row.id}`,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.follow-plan {
  .el-table{
    width: 99.99%!important;
  }
  .btnDiv{
    display: flex;
    align-items: center;
    /*justify-content: center;*/
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
</style>
