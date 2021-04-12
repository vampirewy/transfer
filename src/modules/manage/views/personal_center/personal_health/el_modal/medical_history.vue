<template>
  <div class="medical-history">
    <template v-if="viewIndex === 1">
          <div class="formSearchTitle" style="margin-top: 0;;font-size: 14px">
            <span class="dianLv"></span>就医记录列表
          </div>
          <div>
            <el-table
              ref="table"
              class="has-expand-table"
              :data="tableData"
              >
              <el-table-column
                label="就医日期"
                prop="inDate"
                align="center"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <span v-if="scope.row.inDate">{{ scope.row.inDate.split(' ')[0] }}</span>
                </template>
              </el-table-column>
              <el-table-column
                      label="医疗机构"
                      prop="hospital"
                      align="center"
                      show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                      label="诊断"
                      prop="diagnosis"
                      show-overflow-tooltip
                      align="center">
              </el-table-column>
              <el-table-column label="当前状态" prop="result" align="center">
                <template slot-scope="scope">{{ statusMap[scope.row.result] }}</template>
              </el-table-column>
              <el-table-column label="操作" prop="index" width="160" align="center">
                <template slot-scope="scope">
                  <el-button
                          type="text"
                          @click="detail(scope.row)"
                          v-if="getAccess('medical_history_view')">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              style="margin-top: 15px"
              background
              :total="total"
              :page-size="15"
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
              :page-sizes="[15]"
              layout="prev, pager, next, jumper, total, sizes"
            ></el-pagination>
          </div>
    </template>
    <detail-dialog v-if="viewIndex === 4" :id="currentId" @close="viewIndex = 1"></detail-dialog>
  </div>
</template>

<script>
import DetailDialog from '../components/medical_history_detail.vue';

export default {
  name: 'index',
  components: {
    DetailDialog,
  },
  data() {
    return {
      total: 0,
      tableData: [],
      formData: {
        pageNo: 1,
        pageSize: 15,
      },
      statusMap: {
        1: '未指定',
        2: '治疗中',
        3: '转诊',
        4: '转为慢病',
        5: '痊愈',
        6: '其他',
      },
      viewIndex: 1, // 1:列表页，2:新增，3:编辑，4:详情
      currentId: '',
    };
  },
  mounted() {
    this.queryList();
  },
  methods: {
    queryList() {
      const clientId = this.$route.params.id; // '1318443930441748481';
      this.$api.medicalHistoryInterface.otherMedicalHistoryPageList(clientId, { ...this.formData })
        .then((res) => {
          const { data } = res;
          if (data.code === 200) {
            const result = data.data || {};
            this.tableData = result.list || [];
            this.total = result.total || 0;
          }
        });
    },
    handleCurrentChange(page) {
      this.formData.pageNo = page;
      this.queryList();
    },
    handleSizeChange(size) {
      this.formData.pageSize = size;
      this.queryList();
    },
    detail(data) {
      this.viewIndex = 4;
      this.currentId = data.id;
    },
    handleAfterSubmit() {
      this.viewIndex = 1;
      this.queryList();
    },
  },
};
</script>

<style lang="scss" scoped>
.medical-history {
  background: #fff;
  /deep/ .search-button {
    &:hover {
      background: #55AAFF;
    }
    img {
      width: 16px;
    }
  }
  .el-button + .el-button {
    margin-left: 8px;
  }
  .el-pagination {
    text-align: right;
    padding: 0;
  }
  /deep/ .el-pagination__sizes {
    margin-right: 0;
    .el-select .el-input {
      margin: 0;
    }
  }
}
</style>
