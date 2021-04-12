<template>
  <div class="staff-page">
    <template v-if="viewIndex === 1">
      <query-page @reset="reset" @search="search">
        <template v-slot:left>
          <search>
            <div class="searchInputFormItem">
              <el-input placeholder="输入手机号/姓名搜索" v-model="query"></el-input>
              <span class="searchBtnImgSpan" @click="search">
                <img class="searchBtnImg" src="@/assets/images/common/search.png"/>
              </span>
            </div>
          </search>
          <query-filter>
            <el-select v-model="status" placeholder="选择状态" clearable>
              <el-option label="启用" :value="1"></el-option>
              <el-option label="未启用" :value="0"></el-option>
            </el-select>
            <el-select v-model="role" placeholder="选择角色" clearable>
              <el-option
                v-for="item in roleOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </query-filter>
        </template>
        <template v-slot:right>
          <div class="table-operate-buttons" style="margin-top: -8px">
            <span class="page-name">员工列表</span>
            <div>
              <operate-button
                type="add"
                @click="add"
                v-if="getAccess('staff_list_add')">
              </operate-button>
            </div>
          </div>
          <el-table :data="tableData" align="center">
            <el-table-column
              prop="realName"
              label="姓名"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="mobileNo"
              label="手机号"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="roleName"
              label="角色"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="activated"
              label="激活状态"
              show-overflow-tooltip>
              <template slot-scope="scope">{{
                scope.row.activated ? '激活' : '未激活'
              }}</template>
            </el-table-column>
            <el-table-column
              prop="state"
              label="启用状态"
              show-overflow-tooltip>
              <template slot-scope="scope">{{
                scope.row.state ? '启用' : '未启用'
              }}</template>
            </el-table-column>
            <el-table-column
              prop="lastLoginTime"
              label="最后登录时间"
              width="200px"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="id"
              label="操作"
              width="160px"
              v-if="getAccess('staff_list_view') || getAccess('staff_list_edit') ||
                  getAccess('staff_list_on_off')"
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
                <el-button
                  type="text"
                  size="small"
                  @click="changeState(scope.row)"
                  v-if="getAccess('staff_list_on_off')"
                  :style="`color: ${scope.row.state ? '#FE2B2A' : '#31C529'}`"
                  >{{ scope.row.state ? '禁用' : '启用' }}</el-button
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
        </template>
      </query-page>
    </template>
    <template v-else-if="viewIndex !== 1">
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
import QueryPage from '~/src/components/query_page/index.vue';
import Search from '~/src/components/query_page/search.vue';
import QueryFilter from '~/src/components/query_page/query_filter.vue';
import OperateButton from '~/src/components/query_page/operate_button.vue';
import deleteIcon from '~/src/assets/images/message-box-delete@2x.png';

export default {
  name: 'Staff',
  components: {
    StaffForm,
    QueryPage,
    Search,
    QueryFilter,
    OperateButton,
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
    };
  },
  mounted() {
    // 查询条件： 角色
    this.queryRoleList();
    // 员工列表
    this.queryList();
  },
  methods: {
    queryRoleList() {
      this.$api.systemManageInterface.roleList().then((res) => {
        const { data } = res;
        this.roleOptions = data.data || [];
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
          this.tableData = result.list || [];
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
    changeState(data) {
      // 启用 / 禁用
      this.$confirm(`<div class="delete-text-content"><img class="delete-icon" src="${deleteIcon}"/><span>是否确认${data.state ? '禁用' : '启用'}?</span></div>`, '提示', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'message-box-customize',
        showClose: true,
      }).then(() => {
        const state = data.state ? 0 : 1;
        this.$api.systemManageInterface
          .changeUserState(data.id, state)
          .then(() => {
            this.$message.success('操作成功');
            this.queryList();
          });
      }).catch(() => {});
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
