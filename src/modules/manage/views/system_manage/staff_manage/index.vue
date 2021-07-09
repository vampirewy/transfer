<template>
  <div class="staff-page">
    <template v-if="viewIndex === 1">
      <div class="divTop">
        <div class="divTitle">
          <span><img src="@/assets/images/common/titleLeft.png" alt=""></span>
          员工列表</div>

        <div class="searchCondition">
          <div class="searchLeft">
            <div class="searchInputFormItem">
              <el-input placeholder="输入姓名搜索" v-model="query">
              </el-input>
              <span class="searchBtnImgSpan" @click="search">
                <img class="searchBtnImg" src="@/assets/images/common/topsearch.png"/>
            </span>
            </div>
            <!--<div>
              <span>是否启用：</span>
              <el-select v-model="status" placeholder="选择状态" clearable style="width: 150px">
                <el-option label="启用" :value="1"></el-option>
                <el-option label="未启用" :value="0"></el-option>
              </el-select>
            </div>-->
            <div>
              <span>角色：</span>
              <el-select v-model="role" placeholder="选择角色" clearable style="width: 150px">
                <el-option
                        v-for="item in roleOptions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="searchRight">
            <div class="buttones">
              <div class="searchFor" @click="search">
                <img src="@/assets/images/common/topsearchblue.png" alt="">
              </div>
              <div class="resetAll" @click="reset">重置</div>
            </div>
          </div>
        </div>
      </div>
      <div class="topbottomborder"></div>
      <div class="divRightTitleDiv">
        <!-- <div class="divRightTitle"><span>|</span>客户池</div> -->
        <div>
          <el-button
                  class="btn-new btnAdd"
                  size="small"
                  style="margin: 16px 0"
                  @click="add"
                  v-if="getAccess('staff_list_add')"
          ><img src="@/assets/images/common/addBtn.png" />新增</el-button>
          <el-button
                  class="btn-new btnDel"
                  size="small"
                  @click="handleSomeRemove"
                  v-if="getAccess('staff_list_del')"
          ><img src="@/assets/images/common/delBtn.png" />删除</el-button>
          <el-button
                  class="btn-new btnDel"
                  size="small"
                  style="width: 110px"
                  @click="resetPsd"
                  v-if="getAccess('staff_list_update_password')"
          ><img src="@/assets/images/common/resetPsdBtn.png" />密码重置</el-button>
        </div>
      </div>
        <!--<template v-slot:right>-->
          <el-table :data="tableData" align="center" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column
              prop="realName"
              label="姓名"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="mobileNo"
              label="登录名"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="roleName"
              label="角色"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="dataRange"
              label="管理范围"
              show-overflow-tooltip>
              <template slot-scope="scope">{{
                scope.row.dataRange | getResultDataRange
              }}</template>
            </el-table-column>
            <el-table-column
              prop="lastLoginTime"
              label="最后登录时间"
              width="200px"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
                    prop="state"
                    label="是否启用"
                    show-overflow-tooltip>
              <template slot-scope="scope">
                <el-switch
                        v-if="scope.row.state === 0"
                        :disabled="!getAccess('staff_list_on')"
                        v-model="scope.row.state"
                        :active-value="1"
                        :inactive-value="0"
                        active-color="#13ce66"
                        @change=changeStatus(scope.row)
                >
                </el-switch>
                <el-switch
                        v-else-if="scope.row.state === 1"
                        :disabled="!getAccess('staff_list_off')"
                        v-model="scope.row.state"
                        :active-value="1"
                        :inactive-value="0"
                        active-color="#13ce66"
                        @change=changeStatus(scope.row)
                >
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column
              prop="id"
              label="操作"
              width="160px"
              v-if="getAccess('staff_list_view') || getAccess('staff_list_edit')"
            >
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="detail(scope.row)"
                  v-if="getAccess('staff_list_view')
                  "
                  >查看</el-button
                >
                <el-button
                  type="text"
                  size="small"
                  @click="edit(scope.row)"
                  v-if="getAccess('staff_list_edit')"
                  >编辑</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="prev, pager, next, jumper, total, sizes"
            :total="total"
            :page-sizes="[15]"
            :current-page="currentPage"
            :page-size="pageSize"
            @current-change="handleCurrentChange"
          ></el-pagination>
        <!--</template>
      </query-page>-->
    </template>
    <template v-else-if="viewIndex === 4">
      <staff-detail
              :roleOptions="roleOptions"
              :detail="viewIndex === 4"
              :id="currentId"
              @cancel="viewIndex = 1"
              @afterSubmit="handleAfterSubmit"
      ></staff-detail>
    </template>
    <template v-else>
      <staff-form
        :roleOptions="roleOptions"
        :detail="viewIndex === 4"
        :id="currentId"
        @cancel="viewIndex = 1"
        @afterSubmit="handleAfterSubmit"
      ></staff-form>
    </template>
  </div>
</template>

<script>
import StaffForm from './form.vue';
import StaffDetail from './detail.vue';
import deleteIcon from '~/src/assets/images/deleteicon.png';
import resetPsd from './reset_psd.vue';
export default {
  name: 'staff_list',
  components: {
    StaffForm,
    StaffDetail,
    resetPsd,
  },
  data() {
    return {
      viewIndex: 1, // 1:列表页，2:新增，3:编辑，4:详情
      status: '',
      role: '',
      query: '',
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 15,
      currentId: '',
      roleOptions: [],
      multipleSelection: [], // 当前页选中的数据
    };
  },
  /* activated() {
    // 查询条件： 角色
    this.queryRoleList();
    // 员工列表
    this.queryList();
  },*/
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // 查询条件： 角色
      vm.queryRoleList();
      // 员工列表
      vm.queryList();
    });
  },
  methods: {
    handleSelectionChange(val) {
      // table组件选中事件,
      this.multipleSelection = val;
    },
    queryRoleList() {
      this.$api.systemManageInterface.rolePageList({ state: 1,
        pageNo: 1,
        pageSize: 999999 }).then((res) => {
        const { data } = res;
        this.roleOptions = data.data.data || [];
      });
    },
    search() {
      this.currentPage = 1;
      this.queryList();
    },
    reset() {
      this.currentPage = 1;
      this.query = '';
      this.role = '';
      this.status = '';
      this.queryList();
    },
    queryList() {
      // 员工列表
      this.$api.systemManageInterface
        .userList({
          pageNo: this.currentPage,
          pageSize: 15,
          search: this.query,
          roleId: this.role,
          state: this.status,
        })
        .then((res) => {
          const { data } = res;
          const result = data.data || {};
          this.tableData = result.data || [];
          this.total = result.total || 0;
        });
    },
    add() {
      // 新增页面
      this.viewIndex = 2;
      this.currentId = '';
    },
    detail(data) {
      // 详情页面
      this.viewIndex = 4;
      this.currentId = data.id;
    },
    edit(data) {
      // 编辑页面
      this.viewIndex = 3;
      this.currentId = data.id;
    },
    /**
     * 批量删除
     */
    handleSomeRemove() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: '请选择要删除的记录',
          type: 'warning',
        });
        return;
      }
      this.$confirm(`<div class="delete-text-content"><img class="delete-icon" src="${deleteIcon}"/><span>该操作无法撤销，是否确认删除！</span></div>`, '删除提示', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'message-box-customize',
        showClose: true,
      }).then(
        async () => {
          const idsList = [];
          this.multipleSelection.forEach((value) => {
            idsList.push(value.id);
          });
          const reqBody = idsList;
          await this.$api.systemManageInterface.deletedUser(
            reqBody,
          );
          this.$message.success('操作成功');
          return this.queryList();
        },
      );
    },
    /**
     * 重置密码
     */
    resetPsd() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: '请选择要重置的用户',
          type: 'warning',
        });
        return;
      }
      if (this.multipleSelection.length > 1) {
        this.$message({
          message: '请最多选择一条记录',
          type: 'warning',
        });
        return;
      }
      const Row = { id: this.multipleSelection[0].id };
      this.$jDynamic.show({
        component: 'resetPsd',
        data: {
          modalTitle: '密码重置',
          propsData: Row,
          confirmfunc: async (value) => {
            console.log(value);
          },
        },
        render: h => h(resetPsd),
      });
    },
    changeStatus(row) {
      const setRow = row;
      this.$api.systemManageInterface
        .changeUserState(setRow.id, setRow.state).then(({ data }) => {
          console.log(data);
          this.$message.success('操作成功');
          setRow.state = setRow.state;
        });
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.queryList();
    },
    handleAfterSubmit() {
      // 新增编辑页面保存后刷新列表
      this.viewIndex = 1;
      this.queryList();
    },
  },
};
</script>

<style lang="scss" scoped>
.el-pagination {
  margin: 20px 0 0;
  text-align: right;
}
.staff-page {
  .query-container {
    margin-bottom: 40px;
    display: flex;
    justify-content: space-between;
    .left {
      .el-input {
        display: inline-block;
        width: 266px;
      }
    }
    .right {
      display: flex;
      .el-button + .el-button {
        margin-left: 8px;
      }
    }
  }
  .table-buttons {
    margin-bottom: 16px;
  }
}
</style>
