<template>
  <el-dialog
    class="el-import-tpl-mdl"
    :title="modalTitle"
    :visible.sync="show"
    width="750px"
    alignFooter="right"
    :close-on-click-modal="false"
    @close="onVisible"
  >
    <div class="body">
      <div class="header">
        <el-form :inline="false" :model="form" class="form-inline">
          <el-form-item label="" class="searchInputFormItem">
            <el-input
              v-model="form.name"
              placeholder="输入运动名称"
            >
            </el-input>
          <span class="searchBtnImgSpan">
              <img class="searchBtnImg" @click="onSearch" src="@/assets/images/common/search.png"/>
          </span>
          </el-form-item>

        </el-form>
      </div>
      <el-table
        ref="table"
        :data="table.list"
        align="center"
        max-height="450"
        style="width: 100%"
        @selection-change="changeCheckBox"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="name" label="方案名称" show-overflow-tooltip width="130px">
        </el-table-column>
        <el-table-column prop="guideType" label="指导类型" show-overflow-tooltip width="90px">
          <template slot-scope="scope">
            <span v-if="scope.row.guideType === 1">生活</span>
            <span v-if="scope.row.guideType === 2">互动</span>
          </template>
        </el-table-column>
        <el-table-column prop="guideContent" label="指导内容" show-overflow-tooltip>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        @current-change="handleChange"
        :current-page="table.pageNo"
        :page-size="table.pageSize"
        layout="prev, pager, next, jumper, total, sizes"
        :total="table.totalCount"
        :pageSizes="[5]"
        :pagerCount="5"
      >
      </el-pagination>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" class="cancelBtn" @click="cancel">取消</el-button>
      <el-button type="primary" class="sureBtn" size="small" @click="save">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'elImportLife',
  data() {
    return {
      show: true,
      modalTitle: '导入模板',
      checkSelection: [],
      form: {
        guideType: 0,
        name: '',
      },
      table: {
        list: [],
        totalCount: 0,
        pageNo: 1,
        pageSize: 5,
      },
    };
  },
  mounted() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      this.$nextTick(() => {
        this.getList();
      });
    },
    /**
     * 查询干预模板
     * @return {Promise<void>}
     */
    async getList() {
      const reqBody = {
        guideType: this.form.guideType,
        name: this.form.name,
        pageNo: this.table.pageNo,
        pageSize: this.table.pageSize,
      };
      const res = await this.$api.lifeStyleInterface.getLifeStyleListPage(
        reqBody,
      );
      const { code, data } = res.data;
      if (code === 200) {
        this.table.list = data.list || [];
        this.table.totalCount = data.total;
      }
      if (code === 40001) {
        this.table.list = [];
        this.table.totalCount = 0;
      }
    },
    /**
     * 搜索
     */
    onSearch() {
      this.table.pageNo = 1;
      this.getList();
    },
    /**
     * 分页
     * @param target
     */
    handleChange(target) {
      this.table.pageNo = target;
      this.getList();
    },
    onVisible(value) {
      if (!value) {
        this.$jDynamic.hide({ component: 'elImportLife' });
      }
    },
    /**
     * 保存
     */
    save() {
      // const item = this.table.list.find(it => it.id === this.form.selectRadio);
      if (this.checkSelection && this.confirmfunc) {
        this.confirmfunc.call(this, {
          selection: this.checkSelection,
        });
      }

      this.cancel();
    },
    cancel() {
      this.show = false;
    },
    changeCheckBox(val) {
      console.log(val);
      this.checkSelection = val;
      console.log(this.checkSelection);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-import-tpl-mdl {
  .body {
    /deep/ .cell{
      font-size: 14px;
    }
    .header {
      margin-bottom: 10px;
    }
    .el-pagination {
      padding: 10px 0;
      text-align: right;
    }
  }
}
</style>
