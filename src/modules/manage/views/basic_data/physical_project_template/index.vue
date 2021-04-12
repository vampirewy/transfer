<template>
  <div class="physical-project-template">
    <query-page @reset="onReset" @search="onSearch">
      <template slot="left">
        <search>

          <div class="searchInputFormItem">
            <el-input
                    v-model="form.keywords"
                    placeholder="请输入模板名称"
                    style="width: 180px"
            >
            <!--<el-button slot="append" icon="el-icon-search" @click="onSearch"></el-button>-->
            </el-input>
            <span class="searchBtnImgSpan" @click="onSearch">
              <img class="searchBtnImg" src="@/assets/images/common/search.png"/>
            </span>
        </div>
          <!-- <el-input placeholder="请输入模板名称" v-model="form.keywords">
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="onSearch"
            ></el-button>
          </el-input> -->
        </search>
      </template>
      <template slot="right">
        <div class="divRightTitleDiv" style="margin-top: -8px;">
          <div class="divRightTitle"><span>|</span>体检项目模板</div>
          <div>
            <el-button
              size="small"
              class="btn-new btnAdd"
              @click="handleCreate"
              v-if="getAccess('physical_project_template_add')"
            >
              <img src="@/assets/images/common/addBtn.png" />
              新增</el-button
            >

            <el-button
              size="small"
              class="btn-new btnDel"
              @click="handleRemove"
              v-if="getAccess('physical_project_template_batch_delete')"
              ><img src="@/assets/images/common/delBtn.png" />删除</el-button
            >
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
            <el-table-column type="selection" width="55"></el-table-column>

            <el-table-column prop="name" label="模板名称">
              <template slot-scope="scope">
                <span>{{ scope.row.name | getResult }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="libraryId" label="体检库">
              <template slot-scope="scope">
                <span v-if="scope.row.libraryId">{{
                  enums[scope.row.libraryId]
                }}</span>
                <!-- <span v-if="!scope.row.libraryId">-</span> -->
              </template>
            </el-table-column>
            <el-table-column prop="remark" label="描述" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.remark | getResult }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200">
              <template slot-scope="scope">
                 <el-button
                  type="text"
                  size="small"
                  @click="handleEdit(scope.row)"
                  v-if="getAccess('physical_project_template_edit')"
                  >编辑</el-button
                >
                <el-button
                  type="text"
                  size="small"
                  @click="handleDetail(scope.row)"
                  v-if="getAccess('physical_project_template_view')"
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
import Search from '~/src/components/query_page/search.vue';
import QueryFilter from '~/src/components/query_page/query_filter.vue';
import deleteIcon from '~/src/assets/images/message-box-delete@2x.png';
export default {
  name: 'physical_project_template',
  components: {
    Search,
    QueryPage,
    QueryFilter,
  },
  data() {
    return {
      form: {
        keywords: '',
      },
      table: {
        list: [],
        totalCount: 0,
        currentPage: 1,
        pageSize: 15,
      },
      enums: {},
      multipleSelection: [],
    };
  },
  mounted() {
    this.onLoad();
  },
  methods: {
    async onLoad() {
      await this.getOrganLibraryList();
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
        keywords: this.form.keywords,
        pageNo: this.table.currentPage,
        pageSize: this.table.pageSize,
      };
      const res = await this.$api.physicalProjectTemplateInterface.listPage(
        reqBody,
      );
      const { data } = res.data;
      if (data) {
        this.table.list = data.list || [];
        this.table.totalCount = data.total;
      }
    },

    async getOrganLibraryList() {
      const res = await this.$api.physicalProjectListInterface.listOrganItemLibrary();
      const { data } = res.data;
      data.forEach((val) => {
        this.enums[val.id] = val.name;
      });
    },
    /**
     * 新增
     */
    handleCreate() {
      this.$router.push({
        path: '/basic_data/physical_project_template/create',
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
      this.$router.push({
        path: `/basic_data/physical_project_template/edit/${row.id}`,
      });
    },
    /**
     * 查看明细
     * @param scope
     */
    handleDetail(scope) {
      this.$router.push({
        path: `/basic_data/physical_project_template/detail/${scope.id}`,
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
            reportTemplateIdList: this.multipleSelection.map(val => val.id),
          };
          await this.$api.physicalProjectTemplateInterface.deleteReportTemplate(
            reqBody,
          );
          this.$message.success('操作成功');
          return this.getList();
        },
      );
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
.physical-project-template {
  .divRightTitleDiv {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 10px;
    .divRightTitle {
      font-size: 18px;
      color: #333333;
      font-weight: bold;
      span {
        color: #4991fd;
        font-size: 18px;
        margin-right: 9px;
      }
    }
  }
}
</style>
