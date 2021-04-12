<template>
  <div class="physical-project-list">
    <div class="container">
      <div class="left">
        <div class="divRight" style="margin-bottom: 17px;">
          <div class="divRightTitleDiv">
            <div class="divRightTitle"><span>|</span>体检库名称</div>
          </div>
        </div>
        <el-classify-mdl @on-search="onSearch" @on-click="onClick"></el-classify-mdl>
      </div>
      <div class="right">
        <div class="divRight">
          <div class="divRightTitleDiv">
            <div class="divRightTitle"><span>|</span>体检项目</div>

            <div>
              <el-button
                size="small"
                class="btn-new btnAdd"
                @click="handleCreate"
                v-if="getAccess('physical_project_list_add')"
                ><img src="@/assets/images/common/addBtn.png" />新增</el-button
              >
              <el-button
                size="small"
                class="btn-new btnDel"
                @click="handleRemove"
                v-if="getAccess('physical_project_list_batch_delete')"
              ><img src="@/assets/images/common/delBtn.png" />删除</el-button
              >
            </div>
          </div>
        </div>
        <div>
          <el-table ref="table" :data="table.list" align="center" style="width: 100%">
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column
              prop="sectionName"
              label="科室"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column prop="itemName" label="名称" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.itemName | getResult }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="gender" label="性别" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.gender | getResultGender }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="refRange" label="正常参考" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.refRange | getResult }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="unit" label="单位" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.unit | getResult }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="isCompare" label="是否对比" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.isCompareText | getResultCompare }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="isMain" label="重要指标" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.isMainText | getResultMain }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="handleEditRow(scope.row)"
                  v-if="getAccess('physical_project_list_edit')"
                  >编辑</el-button
                >
                <el-button
                  type="text"
                  size="small"
                  @click="handleDetail(scope.row)"
                  v-if="getAccess('physical_project_list_view')"
                  >查看</el-button
                >
                <el-button
                  type="text"
                  size="small"
                  @click="handleRemoveRow(scope.row)"
                  v-if="getAccess('physical_project_list_delete')"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            style="margin-top: 15px"
            :current-page="table.currentPage"
            :page-size="table.pageSize"
            :total="table.totalCount"
            :page-sizes="[15]"
            background
            layout="prev, pager, next, jumper, total, sizes"
            @current-change="handleChange"
          ></el-pagination>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import elClassifyMdl from './el_modal/el_classify_mdl.vue';
import QueryPage from '~/src/components/query_page/index.vue';
import Search from '~/src/components/query_page/search.vue';
import QueryFilter from '~/src/components/query_page/query_filter.vue';
import {
  genderListByPhysicalProjectList,
  stateList,
  isMainList,
} from '~/src/constant/base_data';
import deleteIcon from '~/src/assets/images/message-box-delete@2x.png';

export default {
  name: 'physical_project_list',
  components: {
    QueryPage,
    Search,
    QueryFilter,
    elClassifyMdl,
  },
  data() {
    return {
      form: {
        gender: '', // 性别
        state: '', // 状态
        isMain: '', // 重要指标
        itemName: '', // 项目名称
        organItemLibraryId: '', // 项目分类
        genderList: genderListByPhysicalProjectList,
        // 状态数据
        stateList,
        isMainList,
        libraryList: [],
      },
      table: {
        list: [],
        totalCount: 0, // 总条数
        currentPage: 1, // 当前页
        pageSize: 15, // 一页数量
      },
    };
  },
  mounted() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      this.getList();
    },
    /**
     * 获取体检库项目列表
     * @return {Promise<void>}
     */
    async getList() {
      const reqBody = {
        organItemLibraryId: this.form.organItemLibraryId,
        gender: this.form.gender,
        isMain: this.form.isMain,
        state: this.form.state,
        itemName: this.form.itemName,
        pageNo: this.table.currentPage,
        pageSize: this.table.pageSize,
      };
      const res = await this.$api.physicalProjectListInterface.listPage(
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
        path: '/basic_data/physical_project_list/create',
      });
    },
    onClick(id) {
      this.form.organItemLibraryId = id;
      this.getList();
    },
    /**
     * 搜索
     */
    onSearch(val) {
      if (val === '') {
        this.form.organItemLibraryId = '';
      }
      this.table.currentPage = 1;
      this.form.itemName = val;
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
       * @param scope
       */
    handleEdit() {
      const selection = this.$refs.table.selection;
      if (selection.length !== 1) {
        return this.$message.warning('请选择一条记录');
      }
      this.handleEditRow(selection[0]);
    },
    /**
     * 编辑
     * @param scope
     */
    handleEditRow(scope) {
      this.$router.push({
        path: `/basic_data/physical_project_list/edit/${scope.id}`,
      });
    },
    /**
     * 查看明细
     * @param scope
     */
    handleDetail(scope) {
      this.$router.push({
        path: `/basic_data/physical_project_list/detail/${scope.id}`,
      });
    },
    /**
     * 删除
     * @param scope
     */
    handleRemove() {
      const selection = this.$refs.table.selection;
      if (!selection.length) {
        return this.$message.warning('请选择记录');
      }

      this.$confirm(`<div class="delete-text-content"><img class="delete-icon" src="${deleteIcon}"/><span>该操作无法撤销，是否确认删除！</span></div>`, '删除提示', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'message-box-customize',
        showClose: true,
      }).then(() => {
        selection.forEach((t) => {
          this.$api.physicalProjectListInterface.deleteOrganItem({ id: t.id }).then(() => {
            selection.pop();
            if (!selection.length) {
              this.$message.success('操作成功');
              this.getList();
            }
          });
        });
      });
    },
    handleRemoveRow(scope) {
      this.$confirm(`<div class="delete-text-content"><img class="delete-icon" src="${deleteIcon}"/><span>该操作无法撤销，是否确认删除！</span></div>`, '删除提示', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'message-box-customize',
        showClose: true,
      }).then(() => {
        this.$api.physicalProjectListInterface.deleteOrganItem({ id: scope.id }).then(() => {
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
  },
};
</script>

<style lang="scss" scoped>
.physical-project-list {
  margin-top: -8px;
  .tool-button {
    margin-bottom: 16px;
  }
  .search-btn {
    float: right;
    margin-right: 0;
  }
  .el-button + .el-button {
    margin-left: 8px;
  }
  .el-pagination {
    padding: 10px 0;
    text-align: right;
  }

  .form {
    width: 220px;
    background: #f4f4f6;
    border-radius: 10px;
    margin-right: 30px;
    .putAway {
      width: 20px;
      height: 80px;
      display: flex;
      align-items: center;
      text-align: center;
      background: #97a6bd;
      border-radius: 0px 5px 5px 0px;
      color: white;
      font-size: 12px;
      position: fixed;
      left: 250px;
      top: 350px;
      cursor: pointer;
    }
    .formLeft {
      padding: 0 20px 0 20px;
      text-align: center;
      .formSearchTitle {
        font-size: 18px;
        color: #333333;
        display: flex;
        align-items: center;
        font-weight: bold;
        margin: 20px 0 15px 0;
        &.setTimeText {
          font-size: 14px;
          font-weight: 400;
          margin-top: 0;
        }
        .dianBlue {
          width: 5px;
          height: 5px;
          background: #4991fd;
          border-radius: 50px;
          display: inline-block;
          margin-right: 6px;
        }
        .dianLv {
          width: 5px;
          height: 5px;
          background: #31c529;
          border-radius: 50%;
          display: inline-block;
          margin-right: 6px;
        }
      }
      .ge {
        width: 220px;
        height: 1px;
        background: #ffffff;
        margin-left: -20px;
      }
    }
  }
  .divRight {
    flex: 1;
    margin-bottom: 10px;
    .divRightTitleDiv {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
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
}

.container {
  display: flex;
}

.left {
  width: 300px;
  border-radius: 10px;
  margin-right: 30px;
  margin-top: 8px;
}

.right {
  flex: 1;
}
</style>
