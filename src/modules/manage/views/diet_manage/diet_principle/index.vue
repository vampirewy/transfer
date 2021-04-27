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
                  v-model="query"
                >
                </el-input>
                <span class="searchBtnImgSpan" @click="search">
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
        <el-button class="btn-new btnAdd" size="small" style="margin: 16px 0"
          ><img src="@/assets/images/common/delBtn.png" />删除</el-button
        >
      </div>
    </div>
    <el-table :data="tableData" align="center">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column
        prop="realName"
        label="原则名称"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="mobileNo"
        label="原则内容"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="id" label="操作" width="160px">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            v-if="getAccess('staff_list_edit')"
            >编辑</el-button
          >
          <el-button
            type="text"
            size="small"
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
    <el-diet-principle :visible.sync="isShowDietPrinciple"></el-diet-principle>
  </div>
</template>

<script>
import elDietPrinciple from './el_modal/el_diet_principle.vue';
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
      query: '',
    };
  },
  methods: {
    handleCurrentChange() {},
    add() {
      this.isShowDietPrinciple = true;
    },
    search() {},
    reset() {},
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
