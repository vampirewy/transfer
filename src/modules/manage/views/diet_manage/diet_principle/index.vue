<template>
  <div class="diet-manage">
    <div class="divTop">
      <div class="divTitle">
        <div class="diet-search">
          <div class="search-title">
            <img src="@/assets/images/common/titleLeft.png" alt="" />
            膳食原则
          </div>
          <div class="searchCondition">
            <div class="searchLeft">
              <div class="searchInputFormItem">
                <el-input
                  placeholder="姓名/编号/单位"
                  style="width: 210px"
                  v-model="keywords"
                >
                </el-input>
                <span class="searchBtnImgSpan">
                  <img
                    class="searchBtnImg"
                    src="@/assets/images/common/topsearch.png"
                  />
                </span>
              </div>
            </div>
            <div class="searchRight">
              <div class="buttones">
                <div class="searchFor" @click="search">
                  <img src="@/assets/images/common/topsearchblue.png" alt="" />
                </div>
                <div class="resetAll" @click="reset">重置</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="topbottomborder"></div>
    <div class="divRightTitleDiv">
      <div>
        <el-button
          class="btn-new btnAdd"
          size="small"
          style="margin: 16px 0"
          @click="add"
          ><img src="@/assets/images/common/addBtn.png" />新增</el-button
        >
        <el-button class="btn-new btnAdd"
        size="small"
        style="margin: 16px 0"
        @click="handleSomeRemove"
          ><img src="@/assets/images/common/delBtn.png" />删除</el-button
        >
      </div>
    </div>
    <el-table :data="tableData" align="center"  @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column
        prop="name"
        label="原则名称"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="content"
        label="原则内容"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="id" label="操作" width="160px">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="editForm(scope.row)"
            v-if="getAccess('staff_list_edit')"
            >编辑</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="LookForm(scope.row)"
            v-if="getAccess('staff_list_view')"
            >查看</el-button
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
    <el-diet-principle v-if="isShowDietPrinciple" :visible.sync="isShowDietPrinciple"
    @cancel="cancel" :EditList="EditId"></el-diet-principle>
  </div>
</template>

<script>
import elDietPrinciple from './el_modal/el_diet_principle.vue';
import deleteIcon from '~/src/assets/images/deleteicon.png';

export default {
  name: 'diet_tyerapy_chinese',
  components: {
    elDietPrinciple,
  },
  data() {
    return {
      isShowDietPrinciple: false,
      currentPage: 1,
      pageSize: 15,
      tableData: [],
      total: 0,
      roleOptions: '',
      role: '',
      status: '',
      keywords: '',
      multipleSelection: [],
      EditId: {},
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getList();
    });
  },
  methods: {
    async getList() {
      const reqBody = {
        keywords: this.keywords,
        pageNo: this.currentPage,
        pageSize: this.pageSize,
      };
      const res = await this.$api.dietProgrammeInterface.principlegetListPage(
        reqBody,
      );
      const { data } = res.data;
      if (data) {
        this.tableData = data.data || [];
        this.total = data.total;
      }
    },
    handleSelectionChange(val) {
      // table组件选中事件,
      this.multipleSelection = val;
    },
    handleSomeRemove() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: '请选择要删除的记录',
          type: 'warning',
        });
        return;
      }
      this.$confirm(`<div class="delete-text-content"><img
      class="delete-icon" src="${deleteIcon}"/><span>该操作无法撤销，是否确认批量删除！</span></div>`, '删除提示', {
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
          await this.$api.dietProgrammeInterface.principledeletedList(
            reqBody,
          );
          this.$message.success('操作成功');
          return this.getList();
        },
      );
    },
    handleCurrentChange(current = 1) {
      this.pageNo = current;
      this.getList();
    },
    cancel() {
      this.getList();
      this.isShowDietPrinciple = false;
    },
    add() {
      this.EditId = {};
      this.isShowDietPrinciple = true;
    },
    editForm(row) {
      this.EditId = row;
      this.EditId.Look = false;
      this.isShowDietPrinciple = true;
    },
    LookForm(row) {
      this.EditId = row;
      this.EditId.Look = true;
      this.isShowDietPrinciple = true;
    },
    search(current = 1) {
      this.pageNo = current;
      this.getList();
    },
    reset(current = 1) {
      this.keywords = '';
      this.pageNo = current;
      this.getList();
    },
    upMore() {},
  },
};
</script>

<style lang="scss" scoped>
.search-title {
  height: 22px;
  font-size: 16px;
  font-weight: 600;
  color: #333333;
  line-height: 22px;
}
.label {
  font-weight: 400 !important;
}
.divTop .divTitle {
  font-weight: normal;
}
.table-buttons {
  margin-bottom: 16px;
}
/deep/ .el-input__suffix {
  margin-right: 0 !important;
}
/deep/ .el-input__suffix .el-input__suffix-inner {
  margin-right: 0 !important;
}
.el-pagination {
  margin-top: 20px;
}
</style>
