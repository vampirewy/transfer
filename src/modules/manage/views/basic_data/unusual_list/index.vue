<template>
  <div class="unusual-list">
    <query-page @reset="onReset" @search="onSearch">
      <template v-slot:left>
        <search>
          <div label="" class="searchInputFormItem">
            <el-input
                    v-model="form.name"
                    placeholder="请输入异常名称"
                    style="width: 180px"
            >
            <!--<el-button slot="append" icon="el-icon-search" @click="onSearch"></el-button>-->
            </el-input>
            <span class="searchBtnImgSpan" @click="onSearch" style="top: 3px;line-height: 40px">
              <img class="searchBtnImg" src="@/assets/images/common/search.png"/>
            </span>
          </div>
        </search>
        <query-filter>
          <el-select
            v-model="form.abnormalType"
            placeholder="异常类型"
            style="width: 180px"
          >
            <el-option
              :label="item.name"
              :value="item.paramValue"
              v-for="item in form.organTypeList"
              :key="item.paramValue"
            ></el-option>
          </el-select>
          <el-select
            v-model="form.dangerLevel"
            placeholder="请选择重要性"
            style="width: 180px"
          >
            <el-option
              :label="it.name"
              :value="it.paramValue"
              :key="i"
              v-for="(it, i) in form.dangerLevelList"
            ></el-option>
          </el-select>
        </query-filter>
      </template>
      <template v-slot:right>
        <div class="divRight">
          <div class="divRightTitleDiv" style="margin-top: -8px">
            <div class="divRightTitle"><span>|</span>异常库</div>

            <div>
              <el-button
                size="small"
                class="btn-new btnAdd"
                @click="handleCreate"
                v-if="getAccess('unusual_list_add')"
                ><img src="@/assets/images/common/addBtn.png" />新增</el-button
              >
            <el-button
              size="small"
              class="btn-new btnDel"
              @click="handleRemove"
              v-if="getAccess('unusual_list_batch_delete')"
              ><img src="@/assets/images/common/delBtn.png" />删除</el-button
            >
            </div>
          </div>
          <div>
            <el-table
            :data="table.list"
            dark-header
            style="width: 100%"
            align="center"
            @selection-change="handleSelectionChange"
             >
              <!--<el-table-column prop="id" label="异常编号"></el-table-column>-->
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column
                prop="abnormalName"
                label="异常名称"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column prop="abnormalTypeName" label="异常类型" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="dangerLevelName" label="重要性" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="medicalExplain" label="医学解释" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="commonCause" label="常见原因" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="advice" label="建议" show-overflow-tooltip>
              </el-table-column>
              <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                   <el-button
                    type="text"
                    size="small"
                    @click="handleEdit(scope.row)"
                    v-if="getAccess('unusual_list_edit')"
                    >编辑</el-button
                  >
                  <el-button
                    type="text"
                    size="small"
                    @click="handleDetail(scope.row)"
                    v-if="getAccess('unusual_list_view')"
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
        </div>
      </template>
    </query-page>
  </div>
</template>

<script>
import { stateList } from '~/src/constant/base_data';
import QueryPage from '~/src/components/query_page/index.vue';
import Search from '~/src/components/query_page/search.vue';
import QueryFilter from '~/src/components/query_page/query_filter.vue';
import deleteIcon from '~/src/assets/images/message-box-delete@2x.png';

export default {
  name: 'unusual_list',
  data() {
    return {
      form: {
        dangerLevel: '',
        state: '',
        name: '',
        dangerLevelList: [],
        stateList,
        organTypeList: [],
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
  components: {
    QueryPage,
    Search,
    QueryFilter,
  },
  mounted() {
    this.onLoad();
    this.getImportList();
  },
  methods: {
    onLoad() {
      this.getList();
      this.getOrganTypeList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /**
     * 获取异常列表
     * @return {Promise<void>}
     */
    async getList() {
      const reqBody = {
        name: this.form.name,
        level: this.form.dangerLevel,
        state: this.form.state,
        type: this.form.abnormalType,
        pageNo: this.table.currentPage,
        pageSize: this.table.pageSize,
      };
      const res = await this.$api.unusualListInterface.listPage(reqBody);
      const { data } = res.data;
      if (data) {
        this.table.list = data.list || [];
        this.table.totalCount = data.total;
      }
    },
    async getOrganTypeList() {
      const { data } = await this.$api.unusualListInterface.getOrganTypeList();
      this.$set(this.form, 'organTypeList', data.data);
      // this.form.organTypeList
    },
    async getImportList() {
      const { data } = await this.$api.unusualListInterface.getImportList();
      this.$set(this.form, 'dangerLevelList', data.data);
      // this.form.organTypeList
    },
    /**
     * 新增
     */
    handleCreate() {
      this.$router.push({
        path: '/basic_data/unusual_list/create',
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
      // Object.assign(this.$data, this.$options.data());
      this.form.name = '';
      this.form.abnormalType = '';
      this.form.dangerLevel = '';
      this.table.currentPage = 1;
      this.getList();
    },
    /**
     * 编辑
     * @param row
     */
    handleEdit(row) {
      /* if (this.multipleSelection.length !== 1) {
        return this.$message({
          message: '请选择一条记录编辑',
          type: 'warning',
        });
      }*/
      this.$router.push({
        path: `/basic_data/unusual_list/edit/${row.id}`,
      });
    },
    /**
     * 查看明细
     * @param scope
     */
    handleDetail(scope) {
      this.$router.push({
        path: `/basic_data/unusual_list/detail/${scope.id}`,
      });
    },
    /**
     * 删除
     * @param scope
     */
    handleRemove() {
      if (this.multipleSelection.length !== 1) {
        return this.$message({
          message: '请选择一条记录编辑',
          type: 'warning',
        });
      }
      this.$confirm(`<div class="delete-text-content"><img class="delete-icon" src="${deleteIcon}"/><span>该操作无法撤销，是否确认批量删除！</span></div>`, '删除提示', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'message-box-customize',
        showClose: true,
      }).then(
        async () => {
          const reqBody = { id: this.multipleSelection[0].id };
          await this.$api.unusualListInterface.deleteOrganAbnormal(reqBody);
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
.unusual-list {
  // padding: 20px 32px 15px 32px;
  // margin-top: 10px;
  // display: flex;
  .desc {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

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
    .divRightTitleDiv {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      margin-bottom: 12px;
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
</style>
