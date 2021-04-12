<template>
  <div class="role-page">
    <template v-if="viewIndex === 1">
      <query-page @reset="reset" @search="search">
        <template v-slot:left>
          <search>
            <div class="searchInputFormItem">
              <el-input placeholder="输入角色名称搜索" v-model="name"></el-input>
              <span class="searchBtnImgSpan" @click="search">
                <img class="searchBtnImg" src="@/assets/images/common/search.png"/>
              </span>
            </div>
          </search>
        </template>
        <template v-slot:right>
          <div class="table-operate-buttons" style="margin-top: -8px">
            <span class="page-name">角色列表</span>
            <div>
              <operate-button
                type="add"
                @click="add"
                v-if="getAccess('role_list_add')">
              </operate-button>
            </div>
          </div>
          <el-table :data="tableData" align="center">
            <el-table-column
              prop="name"
              label="角色名称"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="remark"
              label="角色描述"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="memberNum"
              label="成员数量"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="id"
              label="操作"
              width="160px"
              v-if="getAccess('role_list_view') || getAccess('role_list_edit') ||
                  getAccess('role_list_delete')
              "
            >
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="detail(scope.row)"
                  v-if="getAccess('role_list_view')"
                  >查看</el-button
                >
                <el-button
                  type="text"
                  size="small"
                  @click="edit(scope.row)"
                  v-if="getAccess('role_list_edit')"
                  >编辑</el-button
                >
                <el-button
                  type="text"
                  size="small"
                  @click="deleteRole(scope.row)"
                  v-if="getAccess('role_list_delete')"
                  >删除</el-button
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
      <role-form
        :id="currentId"
        :detail="viewIndex === 4"
        @cancel="viewIndex = 1"
        @afterSubmit="handleAfterSubmit"
      ></role-form>
    </template>
  </div>
</template>

<script>
import RoleForm from './form.vue';
import QueryPage from '~/src/components/query_page/index.vue';
import Search from '~/src/components/query_page/search.vue';
import OperateButton from '~/src/components/query_page/operate_button.vue';
import deleteIcon from '~/src/assets/images/message-box-delete@2x.png';

export default {
  name: 'Role',
  components: {
    RoleForm,
    QueryPage,
    Search,
    OperateButton,
  },
  data() {
    return {
      viewIndex: 1, // 1:列表页，2:新增，3:编辑，4:详情
      name: '',
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 15,
      currentId: '',
    };
  },
  mounted() {
    this.queryList();
  },
  methods: {
    search() {
      this.currentPage = 1;
      this.queryList();
    },
    reset() {
      this.currentPage = 1;
      this.name = '';
      this.queryList();
    },
    queryList() {
      // 角色列表
      this.$api.systemManageInterface
        .rolePageList({
          pageNo: this.currentPage,
          pageSize: 15,
          name: this.name,
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
    deleteRole(data) {
      // 删除角色
      this.$confirm(`<div class="delete-text-content"><img class="delete-icon" src="${deleteIcon}"/><span>该操作无法撤销，是否确认删除?</span></div>`, '提示', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'message-box-customize',
        showClose: true,
      }).then(() => {
        this.$api.systemManageInterface.deleteRole(data.id).then(() => {
          this.$message.success('操作成功');
          this.queryList();
        });
      }).catch(() => {});
    },
    handleCurrentChange(page) {
      // 切换到指定页面
      this.currentPage = page;
      this.queryList();
    },
    handleAfterSubmit() {
      // 新增和编辑页面保存后刷新列表
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
.role-page {
  .query-container {
    margin-bottom: 40px;
    display: flex;
    justify-content: space-between;
    > .el-input {
      display: inline-block;
      width: 266px;
    }
    .right {
      display: flex;
      .el-button + .el-button {
        margin-left: 8px;
      }
    }
  }
}
/deep/ .query-content .buttons {
  display: none !important;
}
</style>
