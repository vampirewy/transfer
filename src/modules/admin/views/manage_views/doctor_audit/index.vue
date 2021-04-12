<template>
  <div class="medical-history">
    <template>
      <query-page @reset="reset" @search="search">
        <template v-slot:left>
          <search>
            <div class="searchInputFormItem">
              <el-input
                placeholder="输入姓名搜索"
                v-model="formData.realName"
              ></el-input>
              <span class="searchBtnImgSpan" @click="search">
                <img
                  class="searchBtnImg"
                  src="@/assets/images/common/search.png"
                />
              </span>
            </div>
          </search>
          <query-filter>
            <el-input placeholder="特长" v-model="formData.skill"></el-input>
            <el-select
              placeholder="选择角色"
              v-model="formData.roleId"
              clearable
            >
              <el-option
                v-for="item in rolelists"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </query-filter>
        </template>
        <template v-slot:right>
          <div class="table-operate-buttons" style="margin-top: -8px">
            <span class="page-name">审核记录</span>
          </div>
          <div>
            <el-table
              ref="table"
              class="has-expand-table"
              :data="tableData"
              @selection-change="handleSelectionChange"
              :row-key="getRowKeys"
              @expand-change="handleExpandChange"
            >
              <el-table-column
                label="姓名"
                prop="realName"
                align="center"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                label="性别"
                prop="sex"
                align="center"
                show-overflow-tooltip
              >
              </el-table-column>

              <!-- <el-table-column label="性别" prop="gender" align="center">
                <template slot-scope="scope">
                  {{scope.row.gender === 0 ? '男' : (scope.row.gender === 1 ? '女' : '')}}
                </template>
              </el-table-column> -->

              <el-table-column
                label="角色"
                prop="roleName"
                align="center"
              ></el-table-column>
              <el-table-column
                label="擅长"
                align="center"
                prop="skill"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                label="简介"
                align="center"
                prop="introduction"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                label="审核状态"
                align="center"
                prop="auditStateDesc"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                label="操作"
                prop="id"
                width="140"
                align="center"
              >
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="small"
                    @click="handleDetail(scope.row)"
                    >查看</el-button
                  >
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
      </query-page>
    </template>
    <detail-dialog
      v-if="viewIndex === 4"
      :id="currentId"
      @close="viewIndex = 1"
    ></detail-dialog>
  </div>
</template>

<script>
// import MedicalHistoryForm from './medical_history_form.vue';
// import DetailDialog from './medical_history_detail.vue';
import QueryPage from '~/src/components/query_page/index.vue';
import Search from '~/src/components/query_page/search.vue';
import QueryFilter from '~/src/components/query_page/query_filter.vue';
import OperateButton from '~/src/components/query_page/operate_button.vue';
import { MAX_PAGESIZE } from '~/src/libs/util/index';
// import deleteIcon from '~/src/assets/images/doctor/tips.png';

export default {
  name: 'index',
  components: {
    // MedicalHistoryForm,
    // DetailDialog,
    QueryPage,
    Search,
    QueryFilter,
    OperateButton,
  },
  data() {
    return {
      total: 0,
      tableData: [],
      formData: {
        realName: '',
        type: '',
        roleId: '',
        skill: '',
        pageNo: 1,
        pageSize: 15,
      },
      rolelists: [],

      typeMap: {
        1: '门诊',
        2: '住院',
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
      multipleSelection: [],
      clientTypeList: [],
      expands: [],
      getRowKeys: row => row.id,
      expandData: {
        id: '',
        pageNo: 1,
        pageSize: 15,
        total: 0,
        list: [],
      },
      loading: false,
    };
  },
  mounted() {
    this.getClientTypeList();
    // this.queryList();

    this.getroleid();
    this.queryAuditList();
  },
  methods: {
    /**
     * 审核
     * @param scope
     */
    handleDetail(scope) {
      console.log(scope);
      this.$router.push({
        path: `/doctor_audites_detail/${scope.id}`,
      });
    },
    // 所有审核列表
    queryAuditList() {
      this.$api.doctorAuditInterface
        .getAuditList({
          ...this.formData,
          // type: this.form.type === 'all' ? undefined : this.form.type,
          // pageNo: this.currentPage,
          // pageSize: PAGE_SIZE,
        })
        .then((response) => {
          const result = response.data;
          const { data, code, message } = result;
          if (code === 200) {
            this.tableData = data.list;
            this.total = data.total;
          } else {
            this.$message.error(message || '网络异常！');
          }
        });
    },
    // 获取所有角色列表
    getroleid() {
      this.$api.doctorAuditInterface.getroleList({}).then((response) => {
        const result = response.data;
        const { data, code, message } = result;
        if (code === 200) {
          console.log(data);
          this.rolelists = data;
          // this.tableData = data.list;
          // this.total = data.total;
        } else {
          this.$message.error(message || '网络异常！');
        }
      });
    },

    handleExpandPageChange(page) {
      this.expandData.pageNo = page;
      this.getOtherPageList();
    },
    handleExpandChange(row, expandRows) {
      this.expands = expandRows;
    },
    expandsHandle(row) {
      if (this.loading) {
        return false;
      }
      this.expands.forEach((data) => {
        // 其他展开的行收起
        if (data.id !== row.id) {
          this.$refs.table.toggleRowExpansion(data);
        }
      });
      if (this.expands.includes(row)) {
        this.$refs.table.toggleRowExpansion(row);
      } else {
        this.expandData.id = row.clientId;
        this.expandData.pageNo = 1;
        this.getOtherPageList().then(() => {
          this.$refs.table.toggleRowExpansion(row);
        });
      }
    },
    getOtherPageList() {
      this.expandData.list = [];
      this.loading = true;
      return this.$api.medicalHistoryInterface
        .otherMedicalHistoryPageList(this.expandData.id, {
          pageNo: this.expandData.pageNo,
          pageSize: this.expandData.pageSize,
        })
        .then(({ data }) => {
          this.expandData.list = data.data.list;
          this.expandData.total = data.data.total;
          this.loading = false;
          // 展开的table的渲染更新依赖外层table数据，如果外层数据没变，展开的内容不会更新渲染，所以这里更新一下tableData
          this.tableData = [...this.tableData];
          this.$forceUpdate();
        })
        .catch(() => {
          this.loading = false;
        });
    },
    getClientTypeList() {
      this.$api.medicalHistoryInterface
        .clientTypeList({
          pageNo: 1,
          pageSize: MAX_PAGESIZE,
        })
        .then((res) => {
          this.clientTypeList = res.data.data.list;
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    queryList() {
      if (!this.checkRangeDate()) {
        return false;
      }
      this.$api.medicalHistoryInterface
        .medicalHistoryPageList({ ...this.formData })
        .then((res) => {
          const { data } = res;
          if (data.code === 200) {
            const result = data.data || {};
            this.tableData = result.list || [];
            this.total = result.total || 0;
          }
        });
    },
    reset() {
      this.formData.realName = '';
      this.formData.type = '';
      this.formData.roleId = '';
      this.formData.skill = '';
      this.formData.pageNo = 1;
      // this.queryList();
      this.queryAuditList();
    },
    search() {
      if (!this.checkRangeDate()) {
        return false;
      }
      this.formData.pageNo = 1;
      // this.queryList();
      this.queryAuditList();
    },
    handleEnter() {
      this.$refs.search.blur();
    },
    handleCurrentChange(page) {
      this.formData.pageNo = page;
      // this.queryList();
      this.queryAuditList();
    },
    handleSizeChange(size) {
      this.formData.pageSize = size;
      // this.queryList();
      this.queryAuditList();
    },
    add() {
      this.viewIndex = 2;
      this.currentId = '';
    },
    detail(data) {
      this.viewIndex = 4;
      this.currentId = data.id;
    },
    // handleEdit() {
    //   if (this.multipleSelection.length === 0) {
    //     this.$message.error('请先选择数据');
    //     return false;
    //   }
    //   if (this.multipleSelection.length > 1) {
    //     this.$message.error('请选择单条记录编辑');
    //     return false;
    //   }
    //   this.edit(this.multipleSelection[0]);
    // },
    // edit(data) {
    //   this.viewIndex = 3;
    //   this.currentId = data.id;
    // },
    // handleDelete() {
    //   if (this.multipleSelection.length === 0) {
    //     this.$message.error('请先选择数据');
    //     return false;
    //   }
    //   TODO 批量删除
    //   this.remove(
    //     this.multipleSelection.map(item => item.id),
    //     true,
    //   );
    // },
    // remove(params, batch = false) {
    //   this.$confirm(
    //     `<div class="delete-text-content">
    // <img class="delete-icon" src="${deleteIcon}"/><span>该操作无法撤销，是否确认${
    //       batch ? '批量' : ''
    //     }删除！</span></div>`,
    //     '提示',
    //     {
    //       dangerouslyUseHTMLString: true,
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       customClass: 'message-box-customize',
    //       showClose: true,
    //     },
    //   ).then(() => {
    //     let p;
    //     if (batch) {
    //       p = this.$api.medicalHistoryInterface.batchDeleteMedicalInfo(params);
    //     } else {
    //       p = this.$api.medicalHistoryInterface.deleteMedicalInfo(params);
    //     }
    //     p.then((res) => {
    //       const { data } = res;
    //       if (data.code === 200) {
    //         this.$message.success('操作成功');
    //         this.queryList();
    //       }
    //     });
    //   });
    // },
    handleAfterSubmit() {
      this.viewIndex = 1;
      this.queryList();
    },
    checkRangeDate() {
      if (
        this.formData.startTime &&
        this.formData.endTime &&
        new Date(this.formData.startTime) > new Date(this.formData.endTime)
      ) {
        this.$message.error('开始时间不可大于结束时间');
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .wlfont-enable {
  color: #31c529 !important;
}
/deep/ .wlfont-disable {
  color: #fe2b2a !important;
}
.medical-history {
  background: #fff;
  /deep/ .search-button {
    &:hover {
      background: #55aaff;
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
