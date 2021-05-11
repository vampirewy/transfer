<template>
  <div class="life-style">
    <query-page @reset="reset" @search="onSearch">
      <template v-slot:left>
        <search>
          <div class="searchInputFormItem">
            <el-input placeholder="输入方案名称搜索" v-model="form.name"></el-input>
            <span class="searchBtnImgSpan" @click="onSearch">
              <img class="searchBtnImg" src="@/assets/images/common/search.png"/>
            </span>
          </div>
        </search>
        <query-filter>
          <el-select placeholder="指导类型" v-model="form.guideType" clearable>
            <el-option
              :label="it.name"
              :value="it.paramValue"
              :key="i"
              v-for="(it, i) in guideTypeList"
            ></el-option>
          </el-select>
        </query-filter>
      </template>
      <template v-slot:right>
        <div>
          <div class="table-operate-buttons" style="margin-top: -8px">
            <span class="page-name">生活方式</span>
            <div>
              <operate-button
                type="add"
                @click="handleCreate"
                v-if="getAccess('life_style_add')"></operate-button>
              <operate-button
                type="delete"
                @click="handlePatchDelete"
                v-if="getAccess('life_style_batch_delete')"></operate-button>
            </div>
          </div>
          <div>
            <el-table :data="table.list" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="50" align="center"></el-table-column>
              <el-table-column prop="name" label="方案名称" align="center"></el-table-column>
              <el-table-column prop="guideType" label="指导类型" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.guideType === 1">生活</span>
                  <span v-if="scope.row.guideType === 2">互动</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="guideContent"
                label="指导内容"
                show-overflow-tooltip
                align="center">
              </el-table-column>
              <el-table-column prop="createName" label="创建人" align="center"></el-table-column>
              <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="small"
                    @click="handleEdit(scope.row)"
                    v-if="getAccess('life_style_edit')">编辑</el-button
                  >
                  <el-button
                    type="text"
                    size="small"
                    @click="handleDetail(scope.row)"
                    v-if="getAccess('life_style_view')">查看</el-button
                  >
                  <el-button
                    type="text"
                    size="small"
                    @click="handleRemove(scope.row.id)"
                    v-if="getAccess('life_style_delete')">删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <div style="text-align: right">
              <el-pagination
                style="margin-top: 15px"
                background
                @current-change="handleChange"
                @size-change="handleSizeChange"
                :page-sizes="[15]"
                :current-page="table.currentPage"
                :page-size="table.pageSize"
                layout="prev, pager, next, jumper, total, sizes"
                :total="table.totalCount"
              ></el-pagination>
            </div>
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
import OperateButton from '~/src/components/query_page/operate_button.vue';
import deleteIcon from '~/src/assets/images/deleteicon.png';

export default {
  name: 'life_style',
  components: {
    QueryPage,
    Search,
    QueryFilter,
    OperateButton,
  },
  data() {
    return {
      form: {
        guideType: '',
        name: '',
      },
      guideTypeList: [],
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
    this.getGuideTypeList();
    this.onLoad();
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handlePatchDelete() {
      if (this.multipleSelection.length === 0) {
        this.$message.error('请先选择数据');
        return false;
      }
      this.handleRemove(this.multipleSelection.map(item => item.id).join(), true);
    },
    getGuideTypeList() {
      this.$api.lifeStyleInterface.getGuideTypeList().then(({ data }) => {
        this.guideTypeList = data.data;
      });
    },
    onLoad() {
      this.getList();
    },
    /**
     * 分页获取生活方式
     * @return {Promise<void>}
     */
    async getList() {
      const reqBody = {
        name: this.form.name,
        guideType: this.form.guideType,
        pageNo: this.table.currentPage,
        pageSize: this.table.pageSize,
      };
      const res = await this.$api.lifeStyleInterface.getLifeStyleListPage(
        reqBody,
      );
      const { data } = res.data;
      if (data) {
        this.table.list = data.list || [];
        this.table.totalCount = data.total;
      }
    },
    reset() {
      this.table.currentPage = 1;
      this.form.name = '';
      this.form.guideType = '';
      this.getList();
    },
    /**
     * 新增
     */
    handleCreate() {
      this.$router.push({
        path: '/plan_center/life_style/create',
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
     * 编辑
     * @param scope
     */
    handleEdit(scope) {
      this.$router.push({
        path: `/plan_center/life_style/edit/${scope.id}`,
      });
    },
    /**
     * 查看明细
     * @param scope
     */
    handleDetail(scope) {
      this.$router.push({
        path: `/plan_center/life_style/detail/${scope.id}`,
      });
    },
    /**
     * 删除
     * @param scope
     * @return {Promise<void>}
     */
    async handleRemove(ids, batch = false) {
      this.$confirm(`<div class="delete-text-content"><img class="delete-icon" src="${deleteIcon}"/><span>该操作无法撤销，是否确认${batch ? '批量' : ''}删除！</span></div>`, '删除提示', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'message-box-customize',
        showClose: true,
      }).then(() => {
        this.$api.lifeStyleInterface.removeLifeStyle(ids).then(() => {
          this.$message.success('操作成功');
          this.getList();
        });
      });
    },
    /**
     * 分页
     * @param target
     */
    handleChange(target) {
      this.table.currentPage = target;
      this.getList();
    },
    handleSizeChange(size) {
      this.table.pageSize = size;
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped>
.life-style {
  /deep/ .search-button {
    &:hover {
      background: #55AAFF;
    }
    img {
      width: 16px;
    }
  }
  /deep/ .el-pagination__sizes {
    margin-right: 0;
    .el-select .el-input {
      margin: 0;
    }
  }
}
</style>
