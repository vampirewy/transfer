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
              <el-table-column label="体检编号" prop="reportNo" align="center"></el-table-column>
              <el-table-column label="体检日期" prop="reportDate" align="center"></el-table-column>
              <el-table-column label="体检机构" prop="examinationOrgan" align="center">
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
      params: {
        pageNo: 1,
        pageSize: 15,
        total: 0,
      },
    };
  },
  mounted() {
  },
  methods: {
  },
};
</script>
