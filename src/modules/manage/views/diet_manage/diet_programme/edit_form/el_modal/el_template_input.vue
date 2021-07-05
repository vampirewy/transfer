<template>
  <div v-show="actives" class="el-people-select_content">
    <div class="divTop">
      <div class="divTitle">
        <div class="searchCondition">
          <div class="searchLeft">
            <div >
              <span>膳食模板</span>
              <el-select
                v-model="status"
                placeholder="选择"
                clearable
                style="width: 110px"
              >
                <el-option label="男" :value="1"></el-option>
                <el-option label="女" :value="0"></el-option>
              </el-select>
            </div>
            <div class="searchInputFormItem" style="width:100px">
              <el-input placeholder="输入条件搜索" v-model="query"> </el-input>
              <span class="searchBtnImgSpan" @click="search" style="right:-3px">
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
    <el-table row-class-name="table-row" :data="tableData">
      <el-table-column type="selection" align="center" width="55">
      </el-table-column>
      <el-table-column align="center" prop="title" label="模板名称">
      </el-table-column>
      <el-table-column align="center" prop="title2" label="介绍">
      </el-table-column>
      <el-table-column align="center" prop="title3" label="模板周期">
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next, jumper, total"
      :total="total"
      :current-page="currentPage"
      :page-size="pageSize"
      @current-change="handleCurrentChange"
    ></el-pagination>
    <div class="form-buttons">
      <el-button size="small" class="cancelBtn" @click="actives = false">
        取消
      </el-button>
      <el-button size="small" class="sureBtn" type="primary"
        >确定添加</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tableData: [
        {
          title: 345347357,
          title2: '一般食谱100kcal',
          title3: '疾病风险',
          title4: '3',
        },
      ],
      currentPage: 1,
      total: 0,
      pageSize: 15,
      status: '',
      query: '',
    };
  },
  computed: {
    actives: {
      get() {
        return this.active;
      },
      set() {
        this.$emit('update:active', false);
      },
    },
  },
  methods: {
    search() {},
    reset() {},
    handleCurrentChange() {},
  },
};
</script>

<style lang="scss" scoped>
.el-people-select_content {
  background-color: #ffffff;
  padding: 25px 19px;
  box-shadow: 0px 0px 30px 0px rgba(151, 166, 189, 0.3);
  border-radius: 5px;
}

.el-pagination {
  text-align: center;
}
.form-buttons {
  margin-top: 23px;
  text-align: center;
}
/deep/ .el-table {
  margin: 20px 0;
  .table-row {
    height: 44px;
  }
  .el-checkbox__inner {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    &::after {
      top: 2px;
      left: 5px;
    }
  }
}
</style>
