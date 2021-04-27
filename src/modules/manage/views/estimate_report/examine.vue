<template>
  <el-dialog
    :modal-append-to-body="false"
    class="match-exception-dialog"
    title="未匹配异常"
    :visible="true"
    width="670px"
    :before-close="() => $emit('close')">
    <div class="title">异常名称：{{exception.abnormalName}}</div>
    <div class="query">
      <el-input v-model="name" placeholder="输入异常名称搜索"></el-input>
      <el-button class="search-button" @click="search">
        <i class="el-icon-search"></i>
      </el-button>
    </div>
    <el-table :data="tableData">
      <el-table-column width="80" align="center">
        <template slot-scope="scope">
          <el-radio v-model="selectRadio" :label="scope.row.id">&nbsp;</el-radio>
        </template>
      </el-table-column>
      <el-table-column prop="abnormalName" label="异常名称" align="center"></el-table-column>
      <el-table-column prop="dangerLevel" label="等级">
        <template slot-scope="scope">
          <span v-if="scope.row.dangerLevel === 1">一级</span>
          <span v-if="scope.row.dangerLevel === 2">二级</span>
          <span v-if="scope.row.dangerLevel === 3">三级</span>
          <span v-if="scope.row.dangerLevel === 4">四级</span>
          <span v-if="scope.row.dangerLevel === 5">五级</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev,pager,next,jumper,total,sizes"
      :page-sizes="[5]"
      :pager-count="5"
      :total="total"
      :page-size="pageSize"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
    <div class="buttons">
      <el-button size="small" plain @click="$emit('close')">取消</el-button>
      <el-button size="small" type="primary" @click="submit">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'MatchException',
  data() {
    return {
      selectRadio: '',
      name: '',
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 5,
    };
  },
  props: {
    exception: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.queryList();
  },
  methods: {
    submit() {
      if (!this.selectRadio) {
        this.$message.error('请先选择要匹配的异常');
        return false;
      }
      // TODO 匹配
      this.$api.accessReport.matchException({
        reportAbnormalTempId: this.exception.id,
        organAbnormalId: this.selectRadio,
      }).then(() => {
        this.$message.success('操作成功');
        this.$emit('close');
      });
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
      const res = await this.$api.unusualListInterface.listPage({
        name: this.name,
        pageNo: this.currentPage,
        pageSize: this.pageSize,
      });
      const { data } = res.data;
      if (data) {
        this.tableData = data.list || [];
        this.total = data.total;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.match-exception-dialog {
  .title {
    position: relative;
    font-size: 16px;
    font-weight: 500;
    color: #333333;
    line-height: 22px;
    padding-left: 10px;
    margin-bottom: 25px;
    &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 5px;
      height: 5px;
      background: #26C165;
    }
  }
  .query {
    display: flex;
    align-items: center;
    height: 40px;
    background: #F4F4F6;
    border-radius: 5px;
    margin-bottom: 20px;
    /deep/ .el-input {
      flex: 1;
      .el-input__inner {
        background: transparent;
        border: none;
      }
    }
    .search-button {
      width: 36px;
      height: 36px;
      background: #4991FD;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      i {
        font-size: 18px;
        color: #fff;
      }
    }
  }
  .el-table::before {
    background: none;
  }
  .el-pagination {
    margin-top: 20px;
    text-align: right;
    /deep/ .el-pagination__sizes {
      margin-right: 0;
    }
    /deep/ .el-input__validateIcon {
      display: none;
    }
  }
  .buttons {
    text-align: right;
    margin-top: 20px;
    button {
      width: 80px;
      border-radius: 8px;
      border: none;
    }
    button + button {
      margin-left: 20px;
    }
    /deep/ .is-plain {
      background: #97A6BD;
      color: #fff;
    }
  }
}
</style>
