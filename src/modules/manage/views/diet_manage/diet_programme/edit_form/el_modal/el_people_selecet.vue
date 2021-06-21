<template>
  <div v-show="actives" class="el-people-select_content">
    <div class="divTop">
      <div class="divTitle">
        <div class="searchCondition">
          <div class="searchLeft">
            <div>
              <span>客户性别：</span>
              <el-select
                v-model="gender"
                placeholder="选择"
                clearable
                style="width: 139px"
              >
                <el-option label="男" :value="1"></el-option>
                <el-option label="女" :value="0"></el-option>
              </el-select>
            </div>
            <div class="searchInputFormItem" style="width:108px">
              <el-input placeholder="输入条件搜索"
              v-model="keyword"> </el-input>
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
    <el-table row-class-name="table-row" :data="tableData"
    @selection-change="handleSelectionChange">
      <el-table-column type="selection" align="center" width="55">
      </el-table-column>
      <el-table-column align="center" prop="clientNo" label="编号">
      </el-table-column>
      <el-table-column align="center" prop="name" label="姓名">
      </el-table-column>
      <el-table-column align="center" prop="age" label="年龄">
      </el-table-column>
      <el-table-column align="center" prop="gender" label="性别">
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
        @click="addBtn">确定添加</el-button
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
        { title: 345347357, title2: '谢小妞', title3: '29', title4: '女' },
      ],
      currentPage: 1,
      total: 0,
      pageSize: 15,
      gender: '',
      keyword: '',
      multipleSelection: [],
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
  mounted() {
    this.queryList();
  },
  methods: {
    async queryList() {
      const res = await this.$api.userFollowInterface.getClientInfoListPage({
        keywords: this.keyword,
        pageNo: this.currentPage,
        pageSize: this.pageSize,
      });
      console.log(res.data);
      const { data } = res.data;
      if (data) {
        this.tableData = data.data || [];
        this.total = data.total;
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    search() {},
    reset() {},
    handleCurrentChange() {},
    addBtn() {
      this.$emit('change', this.multipleSelection);
      console.log(this.multipleSelection);
      this.actives = false;
    },
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
/deep/ .table-row {
  height: 44px;
}
.el-pagination {
  text-align: center;
}
.el-table {
  margin: 20px 0;
}
.form-buttons {
  margin-top: 23px;
  text-align: center;
}
</style>
