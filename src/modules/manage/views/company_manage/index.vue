<template>
  <div class="company-manage">
    <!-- <query-page @reset="onReset" @search="onSearch"> -->
      <!-- <template slot="left">
        <search>
          <div class="searchInputFormItem">
          <el-input placeholder="输入企业名称" v-model="form.keywords">
          </el-input>
          <span class="searchBtnImgSpan" @click="onSearch">
            <img class="searchBtnImg" src="@/assets/images/common/search.png"/>
          </span>
          </div>
        </search>
      </template> -->
      <!-- <template slot="right"> -->
        <div class="divTop">
          <div class="divTitle">
            <span><img src="@/assets/images/common/titleLeft.png" alt=""></span>
            问卷统计</div>

          <div class="searchCondition">
          <div class="searchLeft">
          <div class="searchInputFormItem">
            <el-input placeholder="姓名/手机号/企业单位" v-model="form.keywords">
            </el-input>
            <span class="searchBtnImgSpan" @click="onSearch">
                <img class="searchBtnImg" src="@/assets/images/common/topsearch.png"/>
            </span>
          </div>
          <div>
            <span>建档日期：</span>
            <el-date-picker
                  v-model="form.startTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  :max-date="form.endTime"
                  placeholder="选择开始日期"
                  style="width: 140px"
          >
          </el-date-picker>
          <span class="timing">-</span>
          <el-date-picker
                  v-model="form.endTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  :min-date="form.startTime"
                  placeholder="选择结束日期"
                  style="width: 140px"
          >
          </el-date-picker>
          </div>
            </div>
            <div class="searchRight">
            <div class="buttones">
            <div class="searchFor searchmarTop" @click="onSearch">
            <img src="@/assets/images/common/topsearchblue.png" alt="">
          </div>
          <div class="resetAll searchmarTop" @click="onReset">重置</div>
          </div>
            </div>
          </div>
        </div>
        <div class="topbottomborder"></div>
        <!-- <div class="divRightTitleDiv">
          <div>
            <el-button
                    class="btn-new btnAdd"
                    size="small"
                    style="margin: 16px 0"
                    @click="$router.push('user_edit')"
                    v-if="getAccess('customer_pool_add')"
            ><img src="@/assets/images/common/editBtn.png" />编辑</el-button>
          </div>
        </div> -->
        <div>
          <el-table
            style="width: 100%"
            :data="table.list"
            ref="table"
            align="center"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column
              label="企业名称"
              prop="workUnitName"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{ scope.row.workUnitName | getResult }}</span>
              </template>
            </el-table-column>
            <el-table-column label="总人数" prop="clientCount" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.clientCount | getResult }}</span>
              </template>
            </el-table-column>
            <el-table-column label="体检一次" prop="reportOneCount" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.reportOneCount | getResult }}</span>
              </template>
            </el-table-column>
            <el-table-column label="体检两次" prop="reportTwoCount" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.reportTwoCount | getResult }}</span>
              </template>
            </el-table-column>
            <el-table-column label="体检次数 > 2" prop="reportMoreTwoCount" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.reportMoreTwoCount | getResult }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="联系人"
              prop="contact"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{ scope.row.contact | getResult }}</span>
              </template>
            </el-table-column>
            <el-table-column label="联系电话" prop="mobile" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.mobile | getResult }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" prop="index" width="150px">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="handleEditRow(scope.row)"
                  v-if="getAccess('company_manage_edit')"
                  >编辑
                </el-button>
                <el-button
                  type="text"
                  size="small"
                  @click="handleDetailRow(scope.row)"
                  v-if="getAccess('company_manage_view')"
                  >查看</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <div style="text-align: right">
            <el-pagination
              style="margin-top: 15px"
              :current-page="table.currentPage"
              :page-size="table.pageSize"
              :total="table.totalCount"
              :page-sizes="[15]"
              background
              layout="prev, pager, next, jumper, total, sizes"
              @current-change="handlePageChange"
              @size-change="handleSizeChange"
            ></el-pagination>
          </div>
        </div>
      <!-- </template> -->
    <!-- </query-page> -->
    <edit-detail
      :visible="modalVisible"
      :value="currentValue"
      @cancel="cancel"
    ></edit-detail>
  </div>
</template>

<script>
import QueryPage from '~/src/components/query_page/index.vue';
import Search from '~/src/components/query_page/search.vue';
import QueryFilter from '~/src/components/query_page/query_filter.vue';
import OperateButton from '~/src/components/query_page/operate_button.vue';
import editDetail from './components/edit_detail.vue';

export default {
  name: 'company_manage',
  components: {
    QueryPage,
    Search,
    QueryFilter,
    OperateButton,
    editDetail,
  },
  data() {
    return {
      form: {
        keywords: '',
        workUnitName: '', // 单位
        startTime: '', // 开始时间
        endTime: '', // 结束时间
      },
      table: {
        list: [],
        totalCount: 0,
        currentPage: 1,
        pageSize: 15,
      },
      currentValue: {},
      modalVisible: false,
    };
  },
  mounted() {
    this.queryList();
  },
  methods: {
    onSearch() {
      this.table.currentPage = 1;
      this.queryList();
    },
    onReset() {
      this.form = [];
      // Object.assign(this.$data, this.$options.data());
      this.table.currentPage = 1;
      this.queryList();
    },
    async queryList() {
      const res = await this.$api.companyManageInterface.getWorkUnitPage({
        ...this.form,
        pageNo: this.table.currentPage,
        pageSize: this.table.pageSize,
      });
      this.table.list = res.data.data.data;
      this.table.totalCount = res.data.data.data.total || 0;
      console.log(this.table, 111);
      // const { data } = res;
      // const result = data || {};
      // this.table.list = result.list || [];
      // this.table.totalCount = result.total || 0;
    },
    handleEdit() {
      const selection = this.$refs.table.selection;
      if (selection.length !== 1) {
        return this.$message.warning('请选择一条记录');
      }
      this.handleEditRow(selection[0]);
    },
    async handleEditRow(scope) {
      const res = await this.$api.companyManageInterface.getWorkUnitDetail({
        id: scope.id,
      });
      const { data } = res;
      const result = data.data || {};
      this.currentValue = result;
      this.currentValue.type = 1; // type 1 编辑
      this.currentValue.id = scope.id; // type 1 编辑
      this.modalVisible = true;
    },
    async handleDetailRow(scope) {
      const res = await this.$api.companyManageInterface.getWorkUnitDetail({
        id: scope.id,
      });
      const { data } = res;
      const result = data.data || {};
      this.currentValue = result;
      this.currentValue.type = 2; // type 2 查看
      this.modalVisible = true;
    },
    handlePageChange(target) {
      this.table.currentPage = target;
      this.queryList();
    },
    handleSizeChange(size) {
      this.table.pageSize = size;
      this.queryList();
    },
    cancel() {
      this.modalVisible = false;
      this.queryList();
    },
  },
};
</script>

<style lang="scss" scoped>
.company-manage /deep/ {
  background: #fff;
  .search-button {
    &:hover {
      background: #55aaff;
    }
    img {
      width: 16px;
    }
  }
  .query-page {
    min-height: 600px;
  }
}
</style>
