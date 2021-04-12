<template>
  <div class="myservice">
    <query-page @reset="onReset" @search="onSearch">
      <template slot="left">
        <search>
          <div class="searchInputFormItem">
            <el-input
                    v-model="form.name"
                    placeholder="输入团队名称搜索"
                    style="width: 180px"
            >
            </el-input>
            <span class="searchBtnImgSpan" @click="onSearch">
              <img class="searchBtnImg" src="@/assets/images/common/search.png"/>
            </span>
        </div>
        </search>
      </template>
      <template slot="right">
        <div class="tableTopDoDiv">
          <div class="divRightTitleDiv">
            <div class="divRightTitle"><span>|</span>健康团队（工作室）管理</div>
          </div>
          <div class="table-operate-buttons">
              <operate-button
                      type="add"
                      @click="handleCreate"
              ></operate-button>
            <operate-button
                    type="delete"
                    @click="handleRemove"
              ></operate-button>
          </div>
        </div>
        <div>
          <el-table
            :data="table.list"
            dark-header
            style="width: 100%"
            ref="multipleTable"
            align="center"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="name" label="团队名称">
              <template slot-scope="scope">
                <span>{{ scope.row.name | getResult }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="summary" label="团队简介">
              <template slot-scope="scope">
                <span>{{ scope.row.summary | getResult }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="specialty" label="团队特长">
              <template slot-scope="scope">
                <span>{{ scope.row.specialty | getResult }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="doctorCount" label="团队人数">
              <template slot-scope="scope">
                <span>{{ scope.row.doctorCount | getResult }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200">
              <template slot-scope="scope">
                 <el-button
                  type="text"
                  size="small"
                  @click="handleEdit(scope.row)"
                  >编辑</el-button>
                <el-button
                  type="text"
                  size="small"
                  @click="handleDetail(scope.row)"
                  >查看</el-button>
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
              @current-change="handleChange"
            >
            </el-pagination>
          </div>
        </div>
      </template>
    </query-page>
  </div>
</template>

<script>
import QueryPage from '~/src/components/query_page/index.vue';
import OperateButton from '~/src/components/query_page/operate_button.vue';
import Search from '~/src/components/query_page/search.vue';
import QueryFilter from '~/src/components/query_page/query_filter.vue';
import deleteIcon from '~/src/assets/images/message-box-delete@2x.png';
export default {
  name: 'physical_project_template',
  components: {
    Search,
    OperateButton,
    QueryPage,
    QueryFilter,
  },
  data() {
    return {
      form: {
        keywords: '',
        type: '',
        status: '',
      },
      table: {
        list: [],
        totalCount: 0,
        currentPage: 1,
        pageSize: 15,
      },
      multipleSelection: [],
    };
  },
  mounted() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      this.getList();
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /**
     * 获取列表体检项目模板
     * @return {Promise<void>}
     */
    async getList() {
      const reqBody = {
        name: this.form.name,
        pageNo: this.table.currentPage,
        pageSize: this.table.pageSize,
      };
      const res = await this.$api.institutionalInterface.listPage(
        reqBody,
      );
      const { data } = res.data;
      if (data) {
        this.table.list = data.list || [];
        this.table.totalCount = data.total;
      }
    },
    /**
     * 新增
     */
    handleCreate() {
      this.$router.push({
        path: '/team/create',
      });
    },
    /**
     * 搜索
     */
    onSearch() {
      this.table.currentPage = 1;
      this.getList();
    },
    /**
     * 重置
     */
    onReset() {
      Object.assign(this.$data, this.$options.data());
      this.table.currentPage = 1;
      this.getList();
    },
    /**
     * 编辑
     * @param row
     */
    handleEdit(row) {
      /* if (this.multipleSelection.length !== 1) {
        this.$message({
          message: '请选择一条记录编辑',
          type: 'warning',
        });
        return;
      }*/
      this.$router.push({
        path: `/team/edit/${row.id}`,
      });
    },
    /**
     * 查看明细
     * @param scope
     */
    handleDetail(scope) {
      this.$router.push({
        path: `/team/view/${scope.id}`,
      });
    },
    /**
     * 删除体检项目模板
     * @param scope
     */
    handleRemove() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: '请选择一条记录删除',
          type: 'warning',
        });
        return;
      }
      this.$confirm(`<div class="delete-text-content"><img class="delete-icon" src="${deleteIcon}"/><span>该操作无法撤销，是否确认批量删除！</span></div>`, '删除提示', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'message-box-customize',
        showClose: true,
      }).then(
        async () => {
          const reqBody = {
            workHomeIds: this.multipleSelection.map(val => val.id),
          };
          await this.$api.institutionalInterface.deleteWorkhome(
            reqBody,
          );
          this.$message.success('操作成功');
          return this.getList();
        },
      );
    },
    /**
     * 启用禁用
     * @param scope
     */
    startEndDo() {
      /* this.$confirm(`<div class="delete-text-content">
      <img class="delete-icon" src="${deleteIcon}"/><span>确定启用该条服务？</span></div>`, '提示', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'message-box-customize',
        showClose: true,
      }).then(
        async () => {
          /!* const reqBody = {
            reportTemplateIdList: this.multipleSelection.map(val => val.id),
          };
          await this.$api.physicalProjectTemplateInterface.deleteReportTemplate(
            reqBody,
          );
          this.$message.success('操作成功');
          return this.getList();*!/
        },
      );*/
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
.myservice {

}
</style>
