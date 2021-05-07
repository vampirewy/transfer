<template>
  <div class="abnormal-popoper">
    <div class="un-match">
      <div class="enter-wrapper">
        <el-input v-model="unMatchValue" :maxlength="30" placeholder="直接输入想要添加的异常信息"></el-input>
        <el-button type="primary" @click="addUnMatch">添加</el-button>
      </div>
      <div class="un-match-list" v-if="unMatchList.length > 0">
        <el-tag
          v-for="(tag,i) in unMatchList"
          @close="unMatchClose(i)"
          :key="tag" closable>
          {{tag}}
        </el-tag>
      </div>
    </div>
    <div class="searchInputFormItem">
      <el-input v-model="formData.name" placeholder="输入异常名称"></el-input>
      <span class="searchBtnImgSpan" @click="search()">
        <img class="searchBtnImg" src="@/assets/images/common/search.png"/>
      </span>
    </div>
    <el-table
            class="openTable"
      @selection-change="handleSelectionChange"
      :data="dataSource"
      ref="multipleTable"
      @row-click="handleRowClick"
    >
      <el-table-column type="selection" width="80" align="center"></el-table-column>
      <el-table-column label="异常名称" prop="abnormalName" align="center"></el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev,pager,next,jumper,total,sizes"
      :page-sizes="[5]"
      :pager-count="5"
      :total="params.total"
      :page-size="params.pageSize"
      :current-page="params.pageNo"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
    <div class="buttons">
      <el-button class="cancelBtn" @click="cancel">取消</el-button>
      <el-button type="primary" class="sureBtn" @click="submit">确定</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'abnormal',
  props: {
    visible: Boolean,
    value: {
      default: () => [],
    },
  },
  data() {
    return {
      formData: {},
      params: {
        pageNo: 1,
        pageSize: 5,
        total: 0,
      },
      dataSource: [],
      multipleSelection: [],
      map: {},
      unMatchValue: '',
      unMatchList: [],
    };
  },
  methods: {
    handleRowClick() {

    },
    addUnMatch() {
      if (this.unMatchValue) {
        if (!this.unMatchList.includes(this.unMatchValue)) {
          this.unMatchList.push(this.unMatchValue);
        }
        this.unMatchValue = '';
      }
    },
    unMatchClose(i) {
      this.unMatchList.splice(i, 1);
    },
    handleCurrentChange(page) {
      this.search(page);
    },
    handleSizeChange(size) {
      this.params.pageSize = size;
      this.search();
    },
    cancel() {
      this.$emit('cancel');
    },
    submit() {
      this.$emit('change', [...this.multipleSelection], [...this.unMatchList]);
    },
    fetch() {
      this.params.pageNo = this.params.pageNo;
      this.params.pageSize = this.params.pageSize;
      this.$api.reportInterface
        .getAbnormalAliasList(Object.assign(this.params, this.formData))
        .then(({ data }) => {
          if (data) {
            this.params.total = data.data.total;
            this.dataSource = data.data.data;
            console.log(this.dataSource, 'sfsdfsdfsd');
            this.dataSource.forEach((val) => {
              this.$set(this.map, val.id, val);
            });
          }
        });
    },
    search(current = 1) {
      this.params.pageNo = current;
      this.fetch();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
  mounted() {
    this.fetch();
  },
};
</script>

<style lang="scss" scoped>
  /deep/ .el-table__header-wrapper th{
    padding: 3px 0;
  }
.abnormal-popoper {
  padding: 13px 18px 21px 18px;
  .un-match {
    margin-bottom: 20px;
    .enter-wrapper {
      display: flex;
      .el-input {
        flex: 1;
      }
      .el-button {
        margin-left: 20px;
        width: 80px;
      }
    }
    .un-match-list {
      .el-tag {
        margin: 10px 10px 0 0;
      }
    }
  }
  .searchInputFormItem {
    margin-bottom: 20px;
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
    .el-button {
      width: 80px;
      height: 40px;
      border-radius: 8px;
      border: none;
      + .el-button {
        margin-left: 20px;
      }
      &:not(.el-button--primary) {
        background: rgba(49, 84, 172, 0.1);
          border-radius: 20px;
          border: 1px solid #3154AC;
          &:hover {
            color: #3154AC;
            border-color: #3154AC;
            background: rgba(49, 84, 172, 0.3);
          }
      }
    }
  }
}
</style>
