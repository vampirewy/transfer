<template>
  <div class="sport-template">
    <div class="searchInputFormItem">
      <el-input v-model="name" placeholder="输入条件搜索"></el-input>
      <span class="searchBtnImgSpan" @click="search">
        <img class="searchBtnImg" src="@/assets/images/common/search.png"/>
      </span>
    </div>
    <el-table :data="tableData">
      <el-table-column width="40">
        <template slot-scope="scope">
          <el-checkbox-group v-model="selected">
            <el-checkbox
              name="selected"
              :label="scope.row.id"
              @change="val => checkedChange(val, scope.row)">&nbsp;
            </el-checkbox>
          </el-checkbox-group>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="异常名称" align="center"></el-table-column>
    </el-table>
    <el-pagination
      layout="prev,pager,next,jumper,total,sizes"
      :pager-count="5"
      :total="total"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
    <div class="buttons">
      <el-button plain @click="$emit('cancel')">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </div>
  </div>
</template>

<script>
import { sportTypeList, sportSortList, strengthDegreeList1 } from '~/src/constant/plan_center';
export default {
  name: 'SportTemplate',
  data() {
    return {
      name: '',
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 5,
      selected: [],
      selectedData: [],
    };
  },
  computed: {
    sportTypeMap() {
      const map = {};
      sportTypeList.forEach((item) => {
        map[item.value] = item.name;
      });
      return map;
    },
    sportSortMap() {
      const map = {};
      sportSortList.forEach((item) => {
        map[item.value] = item.name;
      });
      return map;
    },
    strengthDegreeMap() {
      const map = {};
      strengthDegreeList1.forEach((item) => {
        map[item.value] = item.name;
      });
      return map;
    },
  },
  mounted() {
    this.queryList();
  },
  methods: {
    submit() {
      this.$emit('change', this.selectedData);
    },
    checkedChange(val, data) {
      if (val) {
        this.selectedData.push(data);
      } else {
        this.selectedData.splice(this.selectedData.indexOf(data), 1);
      }
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.queryList();
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.currentPage = 1;
      this.queryList();
    },
    search() {
      this.currentPage = 1;
      this.queryList();
    },
    async queryList() {
      const res = await this.$api.sportListInterface.getSportLibraryListPage({
        keywords: this.name,
        pageNo: this.currentPage,
        pageSize: this.pageSize,
      });
      const { data } = res.data;
      if (data) {
        this.tableData = data.data || [];
        this.total = data.total;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.sport-template {
  padding: 13px 18px 21px 18px;
  /deep/ .el-table {
    td, th {
      padding: 10px 0 !important;
    }
  }
  .searchInputFormItem {
    margin-bottom: 20px;
  }
  .el-table::before {
    background: none;
  }
  .el-pagination {
    margin-top: 10px;
    text-align: right;
    /deep/ .el-pagination__sizes {
      margin-right: 0;
    }
    /deep/ .el-input__validateIcon {
      display: none;
    }
  }
  .buttons {
    text-align: center;
    margin-top: 10px;
    .el-button {
      width: 90px;
      height: 40px;
      background: #3154AC;
      border-radius: 20px;
      border: 1px solid #3154AC;
      + .el-button {
        margin-left: 20px;
      }
      &:not(.el-button--primary){
        background: rgba(49, 84, 172, 0.1);
      }
      &:not(.el-button--primary):hover{
        background: rgba(49, 84, 172, 0.3);
        color: #3154AC;
      }
    }
  }
}
</style>
