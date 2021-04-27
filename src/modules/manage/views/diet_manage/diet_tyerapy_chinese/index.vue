<template>
  <div class="diet-manage">
    <template v-if="viewIndex === 1">
      <div class="divTop">
        <div class="divTitle">
          <div class="diet-search">
            <div class="search-title">
              <img src="@/assets/images/common/titleLeft.png" alt="" />
              中医食疗
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
                <div>
                  <span class="label">适宜性别：</span>
                  <el-select
                    v-model="status"
                    placeholder="选择"
                    clearable
                    style="width: 139px"
                  >
                    <el-option label="男" :value="1"></el-option>
                    <el-option label="女" :value="0"></el-option>
                  </el-select>
                </div>
                <div>
                  <span class="label">适宜体质：</span>
                  <el-select
                    v-model="status"
                    placeholder="选择"
                    clearable
                    style="width: 150px"
                  >
                    <el-option label="男" :value="1"></el-option>
                    <el-option label="女" :value="0"></el-option>
                  </el-select>
                </div>
                <div>
                  <span class="label">菜品原料：</span>
                  <el-input style="width: 139px" placeholder="请输入">
                  </el-input>
                </div>
              </div>
              <div class="searchRight">
                <div class="buttones">
                  <div class="searchFor" @click="search">
                    <img
                      src="@/assets/images/common/topsearchblue.png"
                      alt=""
                    />
                  </div>
                  <div class="resetAll" @click="reset">重置</div>
                  <div class="more" v-if="isTrue" @click="isTrue = !isTrue">
                    <span>></span>
                    展开更多
                  </div>
                  <div class="more noMore" v-else @click="isTrue = !isTrue">
                    <span>></span>收起筛选
                  </div>
                </div>
              </div>
            </div>
            <div class="searchCondition" v-show="!isTrue">
              <div class="searchLeft">
                <div>
                  <span class="label">菜品功效：</span>
                  <el-input placeholder="请输入" style="width: 134px">
                  </el-input>
                </div>
              </div>
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
          label="菜品名称"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="mobileNo"
          label="适宜体质"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="roleName"
          label="适宜性别"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="activated" label="菜品原料"> </el-table-column>
        <el-table-column prop="state" label="菜品功效"> </el-table-column>
        <el-table-column prop="state" label="用法"> </el-table-column>
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
    </template>
    <template v-else>
      <diet-tyerapy-chinese-form></diet-tyerapy-chinese-form>
    </template>
  </div>
</template>

<script>
import dietTyerapyChineseForm from './edit_form/index.vue';
export default {
  name: 'diet_tyerapy_chinese',
  components: {
    dietTyerapyChineseForm,
  },
  data() {
    return {
      viewIndex: 1,
      currentPage: 1,
      pageSize: 15,
      tableData: [],
      total: 0,
      isTrue: false,
      roleOptions: '',
      role: '',
      status: '',
      query: '',
    };
  },
  methods: {
    handleCurrentChange() {},
    add() {
      this.viewIndex = 2;
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
