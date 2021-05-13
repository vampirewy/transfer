<template>
  <div class="role-page">
    <template v-if="viewIndex === 1">
      <!--<query-page @reset="reset" @search="search">-->
        <!--<template v-slot:left>
          <search>
            <div class="searchInputFormItem">
              <el-input placeholder="输入角色名称搜索" v-model="name"></el-input>
              <span class="searchBtnImgSpan" @click="search">
                <img class="searchBtnImg" src="@/assets/images/common/search.png"/>
              </span>
            </div>
          </search>
        </template>-->
        <!--<template v-slot:right>-->
      <div class="divTop">
        <div class="divTitle">
          <span><img src="@/assets/images/common/titleLeft.png" alt=""></span>
          角色列表</div>

        <div class="searchCondition">
          <div class="searchLeft">
            <div class="searchInputFormItem">
              <el-input placeholder="输入角色名称搜索" v-model="name">
              </el-input>
              <span class="searchBtnImgSpan" @click="search">
                <img class="searchBtnImg" src="@/assets/images/common/topsearch.png"/>
            </span>
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
                  v-if="getAccess('role_list_add')"
          ><img src="@/assets/images/common/addBtn.png" />新增</el-button>
          <el-button
                  class="btn-new btnDel"
                  size="small"
                  @click="handleSomeRemove"
                  v-if="getAccess('role_list_delete')"
          ><img src="@/assets/images/common/delBtn.png" />删除</el-button>
        </div>
      </div>
          <el-table :data="tableData" align="center" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column
              prop="name"
              label="角色名称"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
                    prop="memberNum"
                    label="角色人数"
                    show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="remark"
              label="角色描述"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
                    prop="state"
                    label="是否启用"
                    show-overflow-tooltip>
              <template slot-scope="scope">
                <el-switch
                        v-model="scope.row.state "
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
              v-if="getAccess('role_list_view') || getAccess('role_list_edit') ||
                  getAccess('role_list_delete')
              "
            >
              <template slot-scope="scope">
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
                  @click="detail(scope.row)"
                  v-if="getAccess('role_list_view')"
                  >查看</el-button
                >
                <!--<el-button
                  type="text"
                  size="small"
                  @click="deleteRole(scope.row)"
                  v-if="getAccess('role_list_delete')"
                  >删除</el-button
                >-->
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
import deleteIcon from '~/src/assets/images/deleteicon.png';

export default {
  name: 'role_list',
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
      multipleSelection: [],
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 15,
      currentId: '',
    };
  },
  activated() {
    this.queryList();
  },
  methods: {
    handleSelectionChange(val) {
      // table组件选中事件,
      this.multipleSelection = val;
    },
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
    changeStatus(row) {
      const setRow = row;
      this.$api.systemManageInterface
        .onoffRole({ id: setRow.id, state: setRow.state }).then(({ data }) => {
          console.log(data);
          if (data.rc === 0) {
            this.$message.success('操作成功');
          } else {
            console.log(row.state);
            row.state = row.state === 0 ? 1 : 0;
            console.log(row.state);
          }
        });
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
          await this.$api.systemManageInterface.deleteSomeRole(
            reqBody,
          );
          this.$message.success('操作成功');
          return this.queryList();
        },
      );
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
