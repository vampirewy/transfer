<template>
  <div>
    <div class="content-left">
      <div class="formSearchTitle">
        <span class="dianLves"
          ><img src="@/assets/images/common/titleLeft.png" alt="" /></span
        >单项检查
      </div>
      <div class="follow-plan">
        <div class="divRightTitleDiv">
          <div>
            <el-button
                    class="btn-new btnAdd"
                    size="small"
                    style="margin: 16px 0"
                    @click="handleAdd"
                    v-if="getAccess('inspection_index_add')"
            ><img src="@/assets/images/common/addBtn.png" />新增</el-button>
            <el-button
              size="small"
              class="btn-new btnDel"
              @click="handleDelete"
              v-if="getAccess('inspection_index_deleted')"
              ><img src="@/assets/images/common/delBtn.png" />删除</el-button
            >
          </div>
        </div>
        <el-table
          :data="tableData"
          @selection-change="handleSelectionChange"
          style="width: 100%"
          align="center"
        >
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column
            prop="inspectionNo"
            label="检查单号"
            show-overflow-tooltip
          >
            <!-- <template slot-scope="scope">
          <span>{{ scope.row.itemName | getResult}}</span>
        </template> -->
          </el-table-column>
          <el-table-column
            prop="inspectionOrg"
            label="检查机构"
            show-overflow-tooltip
          >
            <!-- <template slot-scope="scope">
          <span>{{ scope.row.itemValue | getResult}}</span>
        </template> -->
          </el-table-column>
          <el-table-column
            prop="inspectionDate"
            label="检查日期"
            show-overflow-tooltip
          >
            <!-- <template slot-scope="scope">
          <span>{{ scope.row.refRange | getResult }}</span>
        </template> -->
          </el-table-column>
          <el-table-column
            prop="itemNames"
            label="检查项目"
            show-overflow-tooltip
          >
            <!-- <template slot-scope="scope">
          <span>{{ scope.row.itemUnit | getResult }}</span>
        </template> -->
          </el-table-column>
          <el-table-column
            prop="executePlanWayName"
            label="操作"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="handleEdit(scope.row)"
                v-if="getAccess('inspection_index_edit')"
                >编辑</el-button
              >
              <el-button type="text" size="small">|</el-button>
              <el-button
                type="text"
                size="small"
                @click="handleDetail(scope.row)"
                v-if="getAccess('physical_examination_report_view')"
                >查看</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next, jumper, total, sizes"
          :total="total"
          :page-size="15"
          @current-change="pageClick"
          :pageSizes="[15]"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import deleteIcon from '~/src/assets/images/deleteicon.png';
export default {
  name: 'InportantIndex',
  props: ['clientId'],
  data() {
    return {
      tableData: [
      ],
      formData: {
        keywords: '',
        startTime: '',
        endTime: '',
        clientGrid: '',
        gender: '',
        pageNo: 1,
        pageSize: 15,
        clientId: this.$route.params.id,
      },
      currentPage: 1,
      total: 0,
      multipleSelection: [],
    };
  },
  mounted() {
    this.queryList();
  },
  methods: {
    queryList() {
      // if (!this.checkRangeDate()) {
      //   return false;
      // }
      this.$api.medicalHistoryInterface
        .singleinspectionPageList({ ...this.formData })
        .then((res) => {
          const { data } = res;
          if (data) {
            const result = data.data || {};
            this.tableData = result.data || [];
            this.total = result.total || 0;
          }
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleAdd() {
      this.$router.push({
        path: '/inspection_index_add',
        query: {
          clientId: this.$route.params.id,
        },
      });
    },
    handleDelete() {
      // 批量删除
      if (this.multipleSelection.length === 0) {
        this.$message.error('请先选择数据');
        return false;
      }
      this.remove(
        this.multipleSelection.map(item => item.id),
        true,
      );
    },
    remove(list, batch = false) {
      this.$confirm(
        `<div class="delete-text-content"><img class="delete-icon" src="${deleteIcon}"/><span>该操作无法撤销，是否确认${
          batch ? '' : ''
        }删除！</span></div>`,
        '删除提示',
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          customClass: 'message-box-customize',
          showClose: true,
        },
      )
        .then(() => {
          this.$api.medicalHistoryInterface
            .singleinspectionDelete(list)
            .then(({ data }) => {
              if (data.success) {
                this.$message.success('操作成功');
                this.queryList();
              }
            });
        })
        .catch(() => {});
    },
    handleEdit(row) {
      this.currentId = '';
      this.$router.push({
        path: '/inspection_index_add',
        query: {
          id: row.id,
        },
      });
    },
    handleDetail(data) {
      this.currentId = data.id;
      this.$router.push({
        path: '/inspection_index_info',
        query: {
          id: data.id,
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.divRightTitleDiv{
  margin-bottom: 15px;
}
</style>
