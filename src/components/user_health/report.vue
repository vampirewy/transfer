<template>
  <div class="follow-plan">
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
            ><img src="@/assets/images/common/delBtn.png" />删除</el-button>
          </div>
        </div>
    <el-table
    :data="tableData"
    @selection-change="handleSelectionChange"
     style="width: 100%"
     align="center">
     <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column prop="clientName" label="随访日期" show-overflow-tooltip>
        <!-- <template slot-scope="scope">
          <span>{{ scope.row.itemName | getResult}}</span>
        </template> -->
      </el-table-column>
      <el-table-column prop="gridName" label="随访形式" show-overflow-tooltip>
        <!-- <template slot-scope="scope">
          <span>{{ scope.row.itemValue | getResult}}</span>
        </template> -->
      </el-table-column>
      <el-table-column
        prop="executePlanWayName"
        label="随访标题"
        show-overflow-tooltip
      >
        <!-- <template slot-scope="scope">
          <span>{{ scope.row.refRange | getResult }}</span>
        </template> -->
      </el-table-column>
      <el-table-column
        prop="executeTime"
        label="随访结果"
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
                    @click="handleEdit(scope.row.id)"
                    v-if="getAccess('physical_examination_report_edit')
                    "
                  >编辑</el-button>
          <el-button type="text" size="small">|</el-button>
          <el-button
                    type="text"
                    size="small"
                    @click="handleDetail(scope.row.id)"
                    v-if="getAccess('physical_examination_report_view')"
                  >查看</el-button>
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
</template>
<script>
import deleteIcon from '~/src/assets/images/deleteicon.png';
export default {
  name: 'InportantIndex',
  props: ['clientId'],
  data() {
    return {
      tableData: [
        {
          clientName: '2020-10-01',
          gridName: '我是名称',
          executeTime: '我是标题',
          executePlanWayName: '我是提',
        },
        {
          clientName: '2020-10-01',
          gridName: '我是名称',
          executeTime: '我是标题',
          executePlanWayName: '我是提示啊我是提示',
        },
        {
          clientName: '2020-10-01',
          gridName: '我是名称',
          executeTime: '我是标题',
          executePlanWayName: '我是提示啊我是提示',
        },
        {
          clientName: '2020-10-01',
          gridName: '我是名称',
          executeTime: '我是标题',
          executePlanWayName: '我是提示啊我是提示',
        },
        {
          clientName: '2020-10-01',
          gridName: '我是名称',
          executeTime: '我是标题',
          executePlanWayName: '我是提示啊我是提示',
        },
      ],
      currentPage: 1,
      total: 0,
      multipleSelection: [],
    };
  },
  mounted() {
    // this.getImportantIndex();
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleAdd() {
      this.$router.push({
        path: '/report_edit',
        query: {
          id: '',
        },
      });
    },
    handleDelete() { // 批量删除
      if (this.multipleSelection.length === 0) {
        this.$message.error('请先选择数据');
        return false;
      }
      this.remove(this.multipleSelection.map(item => item.id), true);
    },
    remove(list, batch = false) {
      this.$confirm(`<div class="delete-text-content"><img class="delete-icon" src="${deleteIcon}"/><span>该操作无法撤销，是否确认${batch ? '' : ''}删除！</span></div>`, '删除提示', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'message-box-customize',
        showClose: true,
      }).then(() => {
        this.$api.reportInterface.batchRemove({
          reportIdList: list,
        }).then(({ data }) => {
          if (data.success) {
            this.$message.success('操作成功');
            this.fetch();
          }
        });
      }).catch(() => {});
    },
    handleEdit(id) {
      const getid = id;
      this.$router.push({
        path: '/report_edit',
        query: {
          id: getid,
        },
      });
    },
    handleDetail(id) {
      const getid = id;
      this.$router.push({
        path: '/report_detail',
        query: {
          id: getid,
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.follow-plan {
  .el-table {
    width: 99.99% !important;
  }
  .el-pagination {
    text-align: right;
    margin-top: 10px;
  }

  /deep/ .is-background {
    margin-top: 10px;
    float: right;
  }
}
</style>
