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
      <el-table-column prop="reportNo" label="体检编号" show-overflow-tooltip>
        <!-- <template slot-scope="scope">
          <span>{{ scope.row.itemName | getResult}}</span>
        </template> -->
      </el-table-column>
      <el-table-column prop="reportDate" label="体检日期" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="zjDate"
        label="总检日期"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="workUnitName"
        label="参检团队"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建日期"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="executePlanWayName"
        label="操作"
        show-overflow-tooltip
         width="120"
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
      formData: {
        keywords: '', // 搜索客户姓名/企业名称/体检医院
        gender: '', // 性别0-男1-女
        minReportDate: null, // 体检日期搜索 最小体检日期搜索
        maxReportDate: null, // 体检日期搜索 最大体检日期搜索
        // workUnitName: '', // 所属企业名字
        // reportNo: '', // 体检编号
        // clientId: '', // 客户id
        reportState: '', // 总检状态 0.未知 1.已总检 2.未总检
        clientGrid: '', // 客户类型
        minCreateDate: null, // 搜索条件采集时间最小时间
        maxCreateDate: null, // 搜索条件采集时间最大时间
        // reportAbnormalTempId: '', // 临时异常id搜索
      },
      tableData: [
      ],
      params: {
        pageNo: 1, // 页码
        pageSize: 15, // 页数 默认10
        clientId: this.$route.params.id,
      },
      currentPage: 1,
      total: 0,
      multipleSelection: [],
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    fetch() {
      // if (!this.checkRangeDate()) {
      //   return false;
      // }
      const sendData = Object.assign({}, this.formData);
      this.$api.reportInterface
        .fetchReportList(Object.assign(this.params, sendData))
        .then(({ data }) => {
          if (data.success) {
            this.total = data.data.total;
            this.tableData = data.data.data;
          }
        });
    },
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
