<template>
  <div>
    <div class="content">
      <div class="content-left">
        <div class="formSearchTitle">
          <span class="dianLves"
            ><img src="@/assets/images/common/titleLeft.png" alt="" /></span
          >膳食方案
        </div>
        <div class="divRightTitleDiv">
          <div>
            <el-button
                    class="btn-new btnAdd"
                    size="small"
                    style="margin: 16px 0"
                    @click="handleAdd"
                    v-if="getAccess('physical_examination_report_add')"
            ><img src="@/assets/images/common/addBtn.png" />新增</el-button>
            <el-button
              size="small"
              class="btn-new btnDel"
              @click="handleDelete"
              v-if="getAccess('physical_examination_report_batch_delete')"
              ><img src="@/assets/images/common/delBtn.png" />删除</el-button
            >
          </div>
        </div>
        <div>
            <el-table
              ref="table"
              class="has-expand-table"
              :data="dataSource"
            >
              <el-table-column label="饮食相关异常" prop="state" align="center"></el-table-column>
              <el-table-column label="不良饮食习惯" prop="state" align="center"></el-table-column>
              <el-table-column label="周期" prop="day" align="center">
              </el-table-column>
              <el-table-column label="创建日期" prop="createdTime" align="center"></el-table-column>
              <el-table-column label="创建人" prop="examinationOrgan" align="center">
              </el-table-column>
              <el-table-column label="操作" prop="index" width="160" align="center">
                <template slot-scope="scope">
                  <el-button
                          type="text"
                          @click="handleDetail(scope.row.id)"
                          v-if="getAccess('physical_examination_report_view')"
                  >查看</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div style="text-align: right">
              <el-pagination
                style="margin-top: 15px"
                @current-change="search"
                background
                :total="params.total"
                :page-size="params.pageSize"
                :current-page="params.pageNo"
                :page-sizes="[15]"
                layout="prev, pager, next, jumper, total, sizes"
              ></el-pagination>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import report from '@/components/user_health/report.vue';
export default {
  name: 'Intervention_tab_userdetail_mdl',
  components: {
    report,
  },
  data() {
    return {
      dataSource: [],
      tableData: [],
      params: {
        pageNo: 1,
        pageSize: 15,
        total: 0,
      },
      formData: {
        pageNo: 1,
        pageSize: 15,
        keywords: '',
        gender: '',
        clientGrid: '',
        day: '',
        startCreatedTime: '',
        endCreatedTime: '',
        clientId: this.$route.params.id,
      },
      total: 0,
    };
  },
  // beforeRouteEnter(to, from, next) {
  //   next((vm) => {
  //     vm.loadData();
  //   });
  // },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.$api.dietRawMaterial
        .clientDietPlanPageList({
          ...this.formData,
        })
        .then((res) => {
          if (!res.data.success) return;
          const { data, total } = res.data.data;
          this.tableData = data;
          this.total = total;
        });
    },
    handleAdd() {
      this.$router.push({
        path: '/diet_manage/',
        query: {
          type: 'add',
          clientId: this.$route.params.id,
        },
      });
    },
  },
};
</script>
