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
        <el-form :inline="true" :model="form" class="form-inline">
          <el-form-item label="状态">
            <el-select
              v-model="form.state"
              placeholder="请选择状态"
              style="width: 120px"
            >
              <el-option
                :label="it.name"
                :value="it.value"
                :key="i"
                v-for="(it, i) in form.stateList"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="">
            <el-input
              v-model="form.keywords"
              placeholder="请输入模板名称"
            >
              <el-button slot="append" icon="el-icon-search" @click="onSearch"></el-button>
            </el-input>
          </el-form-item>

        </el-form>
      </div>
      <el-table
        ref="table"
        :data="table.list"
        border
        align="center"
        max-height="450"
        style="width: 100%"
      >
        <el-table-column width="45">
          <template slot-scope="scope">
            <el-radio v-model="form.selectRadio" :label="scope.row.id"
              >&nbsp;</el-radio
            >
          </template>
        </el-table-column>
        <el-table-column prop="name" label="模板名称"></el-table-column>
        <el-table-column prop="state" label="状态" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.state === 1">启用</span>
            <span v-if="scope.row.state === 0">不启用</span>
          </template>
        </el-table-column>
        <el-table-column prop="lifeName" label="生活方式"></el-table-column>
        <el-table-column prop="sportName" label="运动方式"></el-table-column>
      </el-table>

      <el-pagination
        background
        @current-change="handleChange"
        :current-page="table.currentPage"
        :page-size="table.pageSize"
        layout="prev, pager, next"
        :total="table.totalCount"
      >
      </el-pagination>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="cancel">取消</el-button>
      <el-button type="primary" size="small" @click="save">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { stateList } from '~/src/constant/health_plan';

export default {
  name: 'el_import_tpl_mdl',
  data() {
    return {
      show: true,
      modalTitle: '导入模板',
      form: {
        state: -1,
        keywords: '',
        selectRadio: '',
        stateList,
      },
      table: {
        list: [],
        totalCount: 0,
        currentPage: 1,
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
        state: this.form.state,
        keywords: this.form.keywords,
        pageNo: this.table.currentPage,
        pageSize: this.table.pageSize,
      };
      const res = await this.$api.interventionTemplateInterface.getInterveneTemplateListPage(
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
      this.table.currentPage = 1;
      this.getList();
    },
    /**
     * 分页
     * @param target
     */
    handleChange(target) {
      this.table.currentPage = target;
      this.getList();
    },
    onVisible(value) {
      if (!value) {
        this.$jDynamic.hide({ component: 'elImportTplMdl' });
      }
    },
    /**
     * 保存
     */
    save() {
      const item = this.table.list.find(it => it.id === this.form.selectRadio);
      if (item && this.confirmfunc) {
        this.confirmfunc.call(this, {
          selection: item,
        });
      }

      this.cancel();
    },
    cancel() {
      this.show = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-import-tpl-mdl {
  .body {
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
