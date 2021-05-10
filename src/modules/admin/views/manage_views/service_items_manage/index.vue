<template>
  <div class="service-items-manage">
    <query-page @reset="onReset" @search="onSearch">
      <template slot="left">
        <search>
          <div class="searchInputFormItem">
            <el-input placeholder="输入服务名称搜索" v-model="form.name">
            </el-input>
            <span class="searchBtnImgSpan" @click="onSearch">
              <img
                class="searchBtnImg"
                src="@/assets/images/common/search.png"
              />
            </span>
          </div>
        </search>
        <query-filter>
          <el-select v-model="form.type" placeholder="服务模式" class="mb10">
            <el-option
              v-for="item in typeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>

          <el-select v-model="form.state" placeholder="状态" class="mb10">
            <el-option
              v-for="item in stateList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </query-filter>
      </template>
      <template slot="right">
        <div class="table-operate-buttons" style="margin-top: -8px;">
          <span class="page-name">服务项目管理</span>
          <div>
            <operate-button
              type="add"
              @click="$router.push('service_items_manage/add')"
            >
            </operate-button>
            <operate-button type="delete" @click="handleRemove">
            </operate-button>
          </div>
        </div>
        <div>
          <el-table
            style="width: 100%"
            :data="table.list"
            ref="table"
            align="center"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column label="服务名称" prop="name" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.name | getResult }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="服务模式"
              prop="typeDesc"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{ scope.row.typeDesc | getResult }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="服务单价"
              prop="price"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{ scope.row.price | getResult }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="会员价"
              prop="vipPrice"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{ scope.row.vipPrice | getResult }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="服务介绍"
              prop="intro"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{ scope.row.introduce | getResult }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="状态"
              prop="stateDesc"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{ scope.row.stateDesc | getResult }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" prop="index" width="150px">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="
                    $router.push(
                      'service_items_manage/edit/' + scope.row.id + '',
                    )
                  "
                  >编辑
                </el-button>
                <el-button
                  type="text"
                  size="small"
                  @click="
                    $router.push(
                      'service_items_manage/detail/' + scope.row.id + '',
                    )
                  "
                  >查看</el-button
                >
                <el-button
                  type="text"
                  size="small"
                  v-if="scope.row.state === 0"
                  style="color: #31C529;"
                  @click="handleEnable(scope.row, true)"
                  >启用
                </el-button>
                <el-button
                  type="text"
                  size="small"
                  v-if="scope.row.state === 1"
                  style="color: #FE2B2A;"
                  @click="handleEnable(scope.row, false)"
                  >禁用
                </el-button>
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
import { typeList, stateList } from '@/constant/service_manage';

export default {
  name: 'service_items_manage',
  components: {
    QueryPage,
    Search,
    QueryFilter,
    OperateButton,
  },
  data() {
    return {
      form: {
        name: '',
        type: '', // 服务模式
        state: '', // 状态
      },
      typeList,
      stateList,
      table: {
        list: [],
        totalCount: 0,
        currentPage: 1,
        pageSize: 15,
      },
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
      Object.assign(this.$data, this.$options.data());
      this.table.currentPage = 1;
      this.queryList();
    },
    /* remove({ row }) {
      this.$confirm(
        `<div class="delete-text-content">
          <img class="delete-icon" src="${deleteIcon}"/>
          <span>该操作无法撤销，是否确认删除！</span>
        </div>`,
        '删除提示',
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          customClass: 'message-box-customize',
          showClose: true,
        },
      ).then(() => {
        this.$api.serviceItemsInterface.remove(row.id).then(({ data }) => {
          if (data.code === 200) {
            this.$message.success('操作成功');
            this.queryList();
          }
        });
      });
    },*/
    async queryList() {
      const res = await this.$api.serviceItemsInterface.getServiceItemList({
        ...this.form,
        pageNo: this.table.currentPage,
        pageSize: this.table.pageSize,
      });
      const { data } = res;
      const result = data.data || {};
      this.table.list = result.list || [];
      this.table.totalCount = result.total || 0;
    },
    handleRemove() {
      const selection = this.$refs.table.selection;
      if (!selection.length) {
        return this.$message.warning('请选择记录');
      }

      const stateVal = selection.filter(t => t.state === 1);
      if (stateVal.length) {
        return this.$message.warning('当前选择记录中有已启用服务，不能删除');
      }

      this.$confirm(
        `<div class="delete-text-content"><img class="delete-icon" src="${deleteIcon}"/><span>该操作无法撤销，是否确认删除！</span></div>`,
        '删除提示',
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          customClass: 'message-box-customize',
          showClose: true,
        },
      ).then(() => {
        const ids = selection.map(t => t.id);
        this.$api.serviceItemsInterface.deleteServiceItem(ids).then(() => {
          this.$message.success('操作成功');
          this.queryList();
        });
      });
    },
    handleEnable(scope, state) {
      if (state) {
        this.$api.serviceItemsInterface
          .enableServiceItem({ id: scope.id })
          .then(() => {
            this.$message.success('操作成功');
            this.queryList();
          });
      } else {
        this.$api.serviceItemsInterface
          .disableServiceItem({ id: scope.id })
          .then(() => {
            this.$message.success('操作成功');
            this.queryList();
          });
      }
    },
    handlePageChange(target) {
      this.table.currentPage = target;
      this.queryList();
    },
  },
};
</script>

<style lang="scss" scoped>
.service-items-manage /deep/ {
  background: #fff;
  .search-button {
    &:hover {
      background: #55aaff;
    }
    img {
      width: 16px;
    }
  }
  .el-button + .el-button {
    margin-left: 3px;
  }
  .el-pagination {
    text-align: right;
    padding: 0;
  }
}
</style>
