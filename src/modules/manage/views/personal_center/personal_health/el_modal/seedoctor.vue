<template>
  <div>
    <div class="content-left">
      <div class="formSearchTitle">
        <span class="dianLves"
          ><img src="@/assets/images/common/titleLeft.png" alt="" /></span
        >就医记录
      </div>
      <div class="follow-plan">
        <div class="divRightTitleDiv">
          <div>
            <el-button
              class="btn-new btnAdd"
              size="small"
              @click="handleAdd"
              v-if="getAccess('physical_examination_report_add')"
              ><img src="@/assets/images/common/addBtn.png" />新增</el-button
            >
            <el-button
              size="small"
              class="btn-new btnDel"
              @click="handleDelete"
              v-if="getAccess('physical_examination_report_batch_delete')"
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
            prop="medicalType"
            label="就医类型"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
          <span>{{ scope.row.medicalType === 1? '门诊' : '住院'}}</span>
        </template>
          </el-table-column>
          <el-table-column
            prop="hospital"
            label="医疗机构"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
          <span>{{ scope.row.hospital}}</span>
        </template>
          </el-table-column>
          <el-table-column
                label="科室"
                align="center"
                prop="department"
                show-overflow-tooltip>
              </el-table-column>
               <el-table-column
                label="诊断"
                align="center"
                prop="diagnosis"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                label="就医日期"
                align="center"
                prop="inDate"
                show-overflow-tooltip>
              </el-table-column>
            <el-table-column
                label="出院日期"
                align="center"
                prop="outDate"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                label="当前状态"
                align="center"
                prop="result"
                show-overflow-tooltip>
                <template slot-scope="scope">
          <span>{{ scope.row.result === 1? '未指定'
            : scope.row.result === 2? '治疗中'
            : scope.row.result === 3? '转诊'
            :scope.row.result === 4? '转为慢病'
            :scope.row.result === 5? '痊愈'
            :'其他' }}</span>
        </template>
              </el-table-column>
          <el-table-column
            prop="executePlanWayName"
            label="操作"
            width="120"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="handleEdit(scope.row)"
                v-if="getAccess('physical_examination_report_edit')"
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
    this.queryList();
    // this.getImportantIndex();
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleAdd() {
      this.$router.push({
        path: '/medical_history_form',
        query: {
          clientId: this.$route.params.id,
        },
      });
    },
    handleDelete() {
      if (this.multipleSelection.length === 0) {
        this.$message.error('请先选择数据');
        return false;
      }
      // TODO 批量删除
      this.remove(this.multipleSelection.map(item => item.id), true);
    },
    remove(params, batch = false) {
      this.$confirm(`<div class="delete-text-content"><img class="delete-icon" src="${deleteIcon}"/><span>该操作无法撤销，是否确认${batch ? '' : ''}删除！</span></div>`, '删除提示', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'message-box-customize',
        showClose: true,
      }).then(() => {
        let p;
        if (batch) {
          p = this.$api.medicalHistoryInterface.batchDeleteMedicalInfo(params);
        } else {
          p = this.$api.medicalHistoryInterface.deleteMedicalInfo(params);
        }
        p.then((res) => {
          const { data } = res;
          if (data.success) {
            this.$message.success('操作成功');
            this.queryList();
          }
        });
      });
    },
    handleEdit(data) {
      this.$router.push({
        path: '/medical_history_form',
        query: {
          id: data.id,
        },
      });
    },
    handleDetail(data) {
      this.$router.push({
        path: '/medication_history_info',
        query: {
          id: data.id,
        },
      });
    },
    queryList() {
      // if (!this.checkRangeDate()) {
      //   return false;
      // }
      this.$api.medicalHistoryInterface
        .medicalHistoryPageList({ ...this.formData, clientId: this.$route.params.id })
        .then((res) => {
          // const { data } = res;
          // if (data.code === 200) {
          const result = res.data || {};
          this.tableData = result.data.data || [];
          this.total = result.data.total || 0;
          // }
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.divRightTitleDiv {
  margin-bottom: 15px;
}
</style>
