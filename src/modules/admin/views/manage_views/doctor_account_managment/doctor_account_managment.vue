<template>
  <div class="medical-history">
    <!-- <template v-if="viewIndex === 2 || viewIndex === 3">
      <medical-history-form
        :id="currentId"
        @cancel="viewIndex = 1"
        @afterSubmit="handleAfterSubmit"
      ></medical-history-form>
    </template> -->
    <template>
      <query-page @reset="reset" @search="search">
        <template v-slot:left>
          <search>
            <div class="searchInputFormItem">
              <el-input
                placeholder="输入账户名搜索"
                v-model="formData.search"
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
            <el-input
              placeholder="医生姓名"
              v-model="formData.realName"
            ></el-input>
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
            <!-- <el-input placeholder="就诊科室" v-model="formData.department"></el-input>
            <el-input placeholder="医疗机构" v-model="formData.hospital"></el-input> -->
            <!-- <div class="filter-item-title">就医日期</div> -->
            <!-- <el-date-picker
              v-model="formData.startTime"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择开始时间">
              </el-date-picker>
            <el-date-picker
              v-model="formData.endTime"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择结束时间">
            </el-date-picker> -->
          </query-filter>
        </template>
        <template v-slot:right>
          <div class="table-operate-buttons" style="margin-top: -8px">
            <span class="page-name">医生账户管理</span>
            <!--  <div>
              <operate-button
                type="add"
                @click="add"
                v-if="getAccess('medical_history_add')">
              </operate-button>
              <operate-button
                type="delete"
                @click="handleDelete"
                v-if="getAccess('medical_history_delete')">
              </operate-button>
            </div>-->
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
                type="expand"
                width="1"
                class-name="hide-expand-column"
              >
                <el-table :data="expandData.list" class="expand-table">
                  <el-table-column
                    label="登录时间"
                    prop="loginTime"
                    show-overflow-tooltip
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    label="登录IP"
                    prop="ip"
                    show-overflow-tooltip
                    align="center"
                  >
                  </el-table-column>
                  <!-- <el-table-column label="登录IP" prop="result" align="center">
                    <template slot-scope="scope">{{ statusMap[scope.row.result] }}</template>
                  </el-table-column> -->
                  <!-- <el-table-column label="操作" prop="index" width="160" align="center">
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        @click="detail(scope.row)"
                        v-if="getAccess('medical_history_view')">查看</el-button>
                    </template>
                  </el-table-column> -->
                </el-table>
                <div style="text-align: right">
                  <el-pagination
                    style="margin-top: 15px"
                    @current-change="handleExpandPageChange"
                    background
                    :total="expandData.total"
                    :page-size="expandData.pageSize"
                    :current-page="expandData.pageNo"
                    :hide-on-single-page="true"
                    :page-sizes="[15]"
                    layout="prev, pager, next, jumper, total, sizes"
                  ></el-pagination>
                </div>
              </el-table-column>

              <el-table-column
                type="selection"
                align="center"
              ></el-table-column>
              <el-table-column
                label="账户名"
                prop="mobileNo"
                align="center"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                label="姓名"
                prop="realName"
                align="center"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column label="性别" prop="gender" align="center">
                <template slot-scope="scope">
                  {{
                    scope.row.sex === 1 ? '男' : scope.row.sex === 2 ? '女' : ''
                  }}
                </template>
              </el-table-column>
              <el-table-column
                label="角色"
                prop="roleName"
                align="center"
              ></el-table-column>
              <el-table-column
                label="登录次数"
                align="center"
                prop="loginCount"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <el-button type="text" @click="expandsHandle(scope.row)">
                    {{ scope.row.loginCount }}
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column
                label="最后一次登录时间"
                align="center"
                prop="lastLoginTime"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                label="最后一次登录IP"
                align="center"
                prop="lastLoginIp"
                show-overflow-tooltip
              >
              </el-table-column>
              <!-- <el-table-column
                label="当前状态"
                align="center"
                prop="result"
                show-overflow-tooltip>
                <template slot-scope="scope">{{ statusMap[scope.row.result] }}</template>
              </el-table-column> -->

              <el-table-column
                label="操作"
                prop="id"
                width="140"
                align="center"
              >
                <template slot-scope="scope">
                  <!-- <el-button
                    type="text"
                    size="small"
                    @click="detail(scope.row)"
                    v-if="getAccess('medical_history_view')"
                  >查看</el-button>
                  <el-button type="text" size="small" @click="edit(scope.row)" v-if="
                  getAccess('medical_history_edit')
                  ">编辑</el-button>
                  <el-button type="text" size="small" @click="remove(scope.row.id)" v-if="
                  getAccess('medical_history_delete')
                  ">删除</el-button> -->
                  <!-- <el-button
                        class="font-enable"
                        type="text"
                        size="small"
                        @click="changeStatus(scope, '1')"
                        v-if="
                  scope.row.state === '0'
                "
                >启用</el-button> -->
                  <!-- @click="anabled(scope, '1')" -->
                  <el-button
                    class="wlfont-enable"
                    type="text"
                    size="small"
                    @click="changeState(scope.row, '1')"
                    v-if="scope.row.state === 0"
                    >启用</el-button
                  >
                  <el-button
                    class="wlfont-disable"
                    type="text"
                    size="small"
                    @click="changeState(scope.row, '0')"
                    v-if="scope.row.state === 1"
                    >禁用</el-button
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
import deleteIcon from '~/src/assets/images/doctor/tips.png';
import { MAX_PAGESIZE } from '~/src/libs/util/index';

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
        mobileNo: '',
        pageNo: 1,
        pageSize: 15,
        roleId: '',
        state: '',
        realName: '',
        search: '',
        // keyWord: '',
        // workUnitName: '',
        // clientGrid: '',
        // department: '',
        // hospital: '',
        // startTime: '',
        // endTime: '',
      },
      rolelists: [],
      viewIndex: 1, // 1:列表页，2:新增，3:编辑，4:详情
      currentId: '',
      multipleSelection: [],
      clientTypeList: [],
      expands: [],
      getRowKeys: row => row.id,
      expandData: {
        userId: '',
        pageNo: 1,
        pageSize: 15,
        total: '',
      },
      loading: false,
    };
  },
  mounted() {
    this.getClientTypeList();
    this.queryList();
    this.getroleid();
  },
  methods: {
    // 获取所有角色列表
    getroleid() {
      this.$api.doctorAuditInterface.getroleList({}).then((response) => {
        const result = response.data;
        const { data, code, message } = result;
        if (code === 200) {
          console.log(data);
          this.rolelists = data;
        } else {
          this.$message.error(message || '网络异常！');
        }
      });
    },
    //  启用/禁用
    changeState(data) {
      let batch;
      if (data.state === 1) {
        batch = false;
      } else {
        batch = true;
      }
      this.$confirm(
        `<div class="delete-text-content"><img class="delete-icon" src="${deleteIcon}"/><span>确认 <span style='${
          batch ? 'color:#31c529' : 'color:#fe2b2a'
        }'>${batch ? '“启用”' : '“禁用”'}</span>该条医生信息？</span></div>`,
        '提示',
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          customClass: 'message-box-customize',
          showClose: true,
        },
      ).then(() => {
        const state = data.state ? 0 : 1;
        this.$api.doctormoney.changeUserState(data.id, state).then(() => {
          this.$message.success('操作成功');
          this.queryList();
        });
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
        this.expandData.userId = row.id;
        this.expandData.pageNo = 1;
        this.getOtherPageList().then(() => {
          this.$refs.table.toggleRowExpansion(row);
        });
      }
    },
    // 展开行
    getOtherPageList() {
      this.expandData.list = [];
      this.loading = true;
      return this.$api.doctormoney
        .getusertimer({
          // pageNo: this.expandData.pageNo,
          // pageSize: this.expandData.pageSize,
          ...this.expandData,
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
      this.$api.doctormoney.getDoctorList({ ...this.formData }).then((res) => {
        const { data } = res;
        if (data.code === 200) {
          this.tableData = data.data.list;
          this.total = data.data.total;
        }
      });
    },
    reset() {
      this.formData.mobileNo = '';
      this.formData.roleId = '';
      this.formData.state = '';
      this.formData.realName = '';
      this.formData.search = '';
      this.formData.pageNo = 1;
      this.queryList();
    },
    search() {
      // if (!this.checkRangeDate()) {
      //   return false;
      // }
      this.formData.pageNo = 1;
      this.queryList();
    },
    handleEnter() {
      this.$refs.search.blur();
    },
    handleCurrentChange(page) {
      this.formData.pageNo = page;
      this.queryList();
    },
    handleSizeChange(size) {
      this.formData.pageSize = size;
      this.queryList();
    },
    add() {
      this.viewIndex = 2;
      this.currentId = '';
    },
    detail(data) {
      this.viewIndex = 4;
      this.currentId = data.id;
    },
    handleEdit() {
      if (this.multipleSelection.length === 0) {
        this.$message.error('请先选择数据');
        return false;
      }
      if (this.multipleSelection.length > 1) {
        this.$message.error('请选择单条记录编辑');
        return false;
      }
      this.edit(this.multipleSelection[0]);
    },
    edit(data) {
      this.viewIndex = 3;
      this.currentId = data.id;
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
