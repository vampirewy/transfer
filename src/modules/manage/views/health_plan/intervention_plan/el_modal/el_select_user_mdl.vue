<template>
  <el-dialog
    class="el-select-user-mdl"
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
          <el-form-item label="性别：">
            <el-select
              v-model="form.gender"
              placeholder="请选择性别"
              style="width: 120px"
              @change="onSearch"
            >
              <el-option
                :label="it.name"
                :value="it.value"
                :key="it.name"
                v-for="it in form.genderList"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="" class="searchInputFormItem">
            <el-input
              v-model="form.keywords"
              placeholder="请输入编号/用户/手机号"
            >
            </el-input>
            <span class="searchBtnImgSpan">
              <img class="searchBtnImg" @click="onSearch" src="@/assets/images/common/search.png"/>
          </span>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        ref="userTable"
        :data="table.list"
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
        <el-table-column prop="clientNo" label="客户编号">
          <template slot-scope="scope">
            <span v-if="!scope.row.clientNo">-</span>
            <span v-if="scope.row.clientNo">{{ scope.row.clientNo }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="用户"></el-table-column>
        <el-table-column prop="mobile" label="手机号"></el-table-column>
        <el-table-column prop="gender" label="性别">
          <template slot-scope="scope">
            <span v-if="scope.row.gender === 1">男</span>
            <span v-if="scope.row.gender === 2">女</span>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄">
          <template slot-scope="scope">
            <span v-if="!scope.row.age">-</span>
            <span v-if="scope.row.age">{{ scope.row.age }}</span>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        @current-change="handleChange"
        :current-page="table.currentPage"
        :page-size="table.pageSize"
        layout="prev, pager, next, jumper, total, sizes"
        :total="table.totalCount"
        :pageSizes="[15]"
        :pagerCount="5"
      >
      </el-pagination>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" class="cancelBtn" @click="cancel">取消</el-button>
      <el-button class="sureBtn" size="small" @click="save">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { genderList1 } from '~/src/constant/health_plan';

export default {
  name: 'el_select_user_mdl',
  data() {
    return {
      show: true,
      modalTitle: '选择客户',
      form: {
        selectRadio: '',
        gender: '',
        keywords: '',
        gridName: '',
        gridNameList: [],
        genderList: genderList1,
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
    getClick(val) {
      console.log(val);
    },
    onLoad() {
      this.$nextTick(() => {
        if (this.selectRadio) {
          this.form.selectRadio = JSON.parse(JSON.stringify(this.selectRadio));
        }
        this.getList();
      });
    },
    onSearch() {
      this.table.currentPage = 1;
      this.getList();
    },
    /**
     * 获取客户列表
     * @return {Promise<void>}
     */
    async getList() {
      const res = await this.$api.userFollowInterface.getClientInfoListPage({
        keywords: this.form.keywords,
        gender: this.form.gender,
        pageNo: this.table.currentPage,
        pageSize: this.table.pageSize,
      });
      const { data } = res.data;
      if (data) {
        this.table.list = data.list || [];
        this.table.totalCount = data.total;
      }
    },
    /**
     * 销毁模态框
     * @param value
     */
    onVisible(value) {
      if (!value) {
        this.$jDynamic.hide({ component: 'elSelectUserMdl' });
      }
    },
    /**
     * 保存选择集
     */
    save() {
      console.log('form.selectRadio', this.form.selectRadio);

      const item = this.table.list.find(it => it.id === this.form.selectRadio);
      if (item && this.confirmfunc) {
        this.confirmfunc.call(this, {
          selection: [
            {
              name: item.name,
              id: this.form.selectRadio,
              clientNo: this.form.clientNo,
            },
          ],
        });
      }

      this.cancel();
    },
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
.el-select-user-mdl {
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
