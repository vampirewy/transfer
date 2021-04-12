<template>
  <div>
    <query-page @reset="onReset" @search="onSearch"  v-if="viewIndex === 1">
      <template v-slot:left>
        <search>
          <div class="searchInputFormItem">
            <el-input placeholder="输入项目名称搜索" v-model="form.itemName"></el-input>
            <span class="searchBtnImgSpan" @click="onSearch">
              <img class="searchBtnImg" src="@/assets/images/common/search.png"/>
            </span>
          </div>
        </search>
        <query-filter>
          <el-select placeholder="评估相关" v-model="form.isAssess" clearable>
            <el-option label="是" :value="1"></el-option>
            <el-option label="否" :value="2"></el-option>
          </el-select>
        </query-filter>
      </template>
      <template v-slot:right>
        <div class="user-follow">
          <div class="tableTopDoDiv" style="margin-top: 0;height: 56px">
            <div class="divRightTitleDiv">
              <div class="divRightTitle"><span>|</span>项目匹配</div>
            </div>
          </div>
          <el-table :data="table.list" style="width: 100%" align="center" ref="table">
            <el-table-column prop="sectionName" label="科室名称" min-width="15%" show-overflow-tooltip>
              <template slot-scope="scope">
                  <span>{{ scope.row.sectionName | getResult }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="itemName" label="项目名称" min-width="15%" show-overflow-tooltip>
              <template slot-scope="scope">
                 <span>{{ scope.row.itemName | getResult }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="total" label="已匹配数" min-width="15%" show-overflow-tooltip>
              <template slot-scope="scope">
                  <span>{{ scope.row.total | getResult}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button type="text" size="small" v-if="getAccess('project_list_match')"
                        @click="toMatchDo(scope.row)">匹配
                </el-button>
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
          >
          </el-pagination>
        </div>
      </template>
    </query-page>
    <template v-else-if="viewIndex === 2">
      <match-do :propsData="matchDoRow"
                         @cancel="cancel"></match-do>
    </template>
  </div>
</template>

<script>
import QueryPage from '~/src/components/query_page/index.vue';
import Search from '~/src/components/query_page/search.vue';
import QueryFilter from '~/src/components/query_page/query_filter.vue';
import OperateButton from '~/src/components/query_page/operate_button.vue';
import ManagerList from '@/components/user_health/manager_list.vue';
import MatchDo from './el_modal/match_do.vue';
export default {
  name: 'project_list',
  components: {
    QueryPage,
    Search,
    QueryFilter,
    OperateButton,
    ManagerList,
    MatchDo,
  },
  data() {
    return {
      viewIndex: 1,
      matchDoRow: {}, // 随访子组建的数据
      form: {
        gender: '', // 性别
        itemName: '', // 项目名称
        isAssess: '', // 评估相关
      },
      table: {
        list: [],
        totalCount: 0,
        currentPage: 1,
        pageSize: 15,
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
     * 获取随访列表
     * @return {Promise<void>}
     */
    async getList() {
      const reqBody = {
        itemName: this.form.itemName,
        isAssess: this.form.isAssess,
        pageNo: this.table.currentPage,
        pageSize: this.table.pageSize,
      };
      const res = await this.$api.projectList.systemItemList(
        reqBody,
      );
      const { data } = res.data;
      if (data) {
        this.table.list = data.list || [];
        this.table.totalCount = data.total;
      }
    },
    toMatchDo(row) {
      console.log(row);
      this.viewIndex = 2;
      this.matchDoRow = {
        ...row,
      };
    },
    cancel(type) {
      this.viewIndex = 1;
      if (type === 'refreash') {
        this.getList();
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
     * 重置
     */
    onReset() {
      // Object.assign(this.$data, this.$options.data());
      this.table.currentPage = 1;
      this.form.itemName = '';
      this.form.isAssess = '';
      this.getList();
    },
    /**
     * 分页
     * @param target
     */
    handleChange(target) {
      // 改变页的时候调用一次，改变每页显示条数的时候也要调用一次
      this.table.currentPage = target;
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped>
  .user-follow {
    .el-pagination {
      padding: 10px 0;
      text-align: right;
    }
  }
</style>
