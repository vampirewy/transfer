<template>
  <el-dialog
    class="el-select-sport-style-mdl"
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
          <el-form-item label="">
            <el-select
              v-model="form.strengthDegree"
              placeholder="请选择运动强度"
              style="width: 150px"
            >
              <el-option
                :label="it.name"
                :value="it.value"
                :key="it.name"
                v-for="it in form.strengthDegreeList"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="">
            <el-input
              v-model="form.name"
              placeholder="请输入运动名称"
            ></el-input>
          </el-form-item>

          <el-form-item label="">
            <el-button size="small" type="primary" @click="onSearch">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>

      <el-table
        ref="table"
        :data="table.list"
        border
        max-height="450"
        style="width: 100%"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="运动名称"></el-table-column>
        <el-table-column prop="strengthDegree" label="运动强度">
          <template slot-scope="scope">
            <span v-if="scope.row.strengthDegree === 1">低</span>
            <span v-if="scope.row.strengthDegree === 2">中</span>
            <span v-if="scope.row.strengthDegree === 3">高</span>
          </template>
        </el-table-column>
        <el-table-column prop="met" label="代谢当量MET"></el-table-column>
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
      <el-button size="small" type="primary" @click="save">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { strengthDegreeList } from '~/src/constant/plan_center';

export default {
  name: 'el_select_sport_style_mdl',
  data() {
    return {
      show: true,
      modalTitle: '选择运动方式',
      form: {
        name: '',
        state: -1,
        strengthDegree: -1,
        strengthDegreeList,
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
     * 获取运动方式列表
     * @return {Promise<void>}
     */
    async getList() {
      const reqBody = {
        name: this.form.name,
        state: this.form.state,
        strengthDegree: this.form.strengthDegree,
        pageNo: this.table.currentPage,
        pageSize: this.table.pageSize,
      };
      const res = await this.$api.sportListInterface.getSportLibraryListPage(
        reqBody,
      );
      const { data } = res.data;
      if (data) {
        this.table.list = data.list || [];
        this.table.totalCount = data.total;
      }
    },
    /**
     * 搜索
     */
    onSearch() {
      this.table.currentPage = 1;
      this.getList();
    },
    onVisible(value) {
      if (!value) {
        this.$jDynamic.hide({ component: 'elSelectSportStyleMdl' });
      }
    },
    /**
     * 保存
     */
    save() {
      const selection = this.$refs.table.selection;
      if (this.confirmfunc) {
        this.confirmfunc.call(this, {
          selection,
        });
      }

      this.cancel();
    },
    /**
     * 取消
     */
    cancel() {
      this.show = false;
    },
    /**
     * 分页
     * @param target
     */
    handleChange(target) {
      this.table.currentPage = target;
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped>
.el-select-sport-style-mdl {
  .body {
    .header {
      margin-bottom: 10px;
    }
    .el-pagination {
      padding: 10px 0;
      text-align: right;
    }
  }
  /deep/ .el-dialog__footer{
    border-top: 1px solid #EFEFEF;
  }
}
</style>
