<template>
  <div class="myservice">
    <query-page @reset="onReset" @search="onSearch">
      <template slot="left">
        <search>
          <div class="searchInputFormItem">
            <el-input
                    v-model="form.name"
                    placeholder="输入服务名称搜索"
                    style="width: 180px"
            >
            </el-input>
            <span class="searchBtnImgSpan" @click="onSearch">
              <img class="searchBtnImg" src="@/assets/images/common/search.png"/>
            </span>
        </div>
        </search>
        <query-filter>
          <el-select placeholder="服务模式" v-model="form.type" clearable>
            <el-option label="线上服务" :value="2"></el-option>
            <el-option label="线下服务" :value="1"></el-option>
          </el-select>
          <el-select placeholder="状态" v-model="form.state" clearable>
            <el-option label="已启用" :value="1"></el-option>
            <el-option label="已禁用" :value="0"></el-option>
          </el-select>
        </query-filter>
      </template>
      <template slot="right">
        <div class="tableTopDoDiv">
          <div class="divRightTitleDiv">
            <div class="divRightTitle"><span>|</span>我的服务</div>
          </div>
          <div class="table-operate-buttons">
              <operate-button
                      type="add"
                      @click="handleCreate"
                      v-if="getAccess('my_service_add')"
              ></operate-button>
            <operate-button
                    style="margin-left: 12px"
                    type="delete"
                    @click="handleRemove"
                    v-if="getAccess('my_service_batch_delete')"
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
            <el-table-column type="selection" width="55"></el-table-column>

            <el-table-column prop="serviceName" label="服务名称">
              <template slot-scope="scope">
                <span>{{ scope.row.serviceName | getResult}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="serviceTypeDesc" label="服务模式">
              <template slot-scope="scope">
                <span>{{ scope.row.serviceTypeDesc | getResult}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="servicePrice" label="服务单价">
              <template slot-scope="scope">
                <span>{{ scope.row.servicePrice | getResult}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="serviceVipPrice" label="会员价">
              <template slot-scope="scope">
                <span>{{ scope.row.serviceVipPrice | getResult}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="serviceIntroduce" label="服务介绍" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.serviceIntroduce | getResult}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="stateDesc" label="状态">
              <template slot-scope="scope">
                <span v-if="scope.row.stateDesc && scope.row.state === 1"
                      style="color: #31C529">
                  已启用
                </span>
                <span v-else-if="scope.row.stateDesc && scope.row.state === 0"
                      style="color: #FE2B2A">
                  已禁用
                </span>
                <span v-if="!scope.row.stateDesc">-</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200">
              <template slot-scope="scope">
                 <el-button
                  type="text"
                  size="small"
                  @click="handleEdit(scope.row)"
                  v-if="getAccess('my_service_edit')"
                  >编辑</el-button>
                <el-button
                  type="text"
                  size="small"
                  @click="handleDetail(scope.row)"
                  v-if="getAccess('my_service_view')"
                  >查看</el-button>
                <el-button
                        type="text"
                        size="small"
                        @click="scope.row.state === 1 ?
                        startEndDo(scope.row, 0) : startEndDo(scope.row, 1)"
                        :style="{'color': scope.row.state === 1 ? '#FE2B2A' : '#31C529'}"
                        v-if="getAccess('my_service_on_off')"
                >{{scope.row.state === 1 ? '禁用' : '启用'}}</el-button>
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
        name: '',
        type: '',
        state: '',
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
    onLoad() {
      this.getOrganLibraryList();
      this.getList();
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /**
     * 获取列表我的服务
     * @return {Promise<void>}
     */
    async getList() {
      const reqBody = {
        name: this.form.name,
        type: this.form.type,
        state: this.form.state,
        pageNo: this.table.currentPage,
        pageSize: this.table.pageSize,
      };
      const res = await this.$api.ServiceManagerInterface.getMyServiceList(
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
      console.log(this.enums);
      // this.form.dataSource = data;
    },
    /**
     * 新增
     */
    handleCreate() {
      this.$router.push({
        path: '/my_service/create',
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
      this.onLoad();
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
        path: `/my_service/edit/${row.id}`,
      });
    },
    /**
     * 查看明细
     * @param scope
     */
    handleDetail(scope) {
      this.$router.push({
        path: `/my_service/view/${scope.id}`,
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
          const reqBody = this.multipleSelection.map(val => val.id);
          await this.$api.ServiceManagerInterface.userServiceDelete(
            reqBody,
          );
          this.$message.success('操作成功');
          return this.getList();
        },
      );
    },
    /**
     * 启用禁用
     * @param row
     */
    async startEndDo(row, state) {
      const reqBody = row.id;
      if (state === 1) {
        await this.$api.ServiceManagerInterface.userServiceEnable(reqBody);
      } else if (state === 0) {
        await this.$api.ServiceManagerInterface.userServiceDisable(reqBody);
      }
      this.$message.success('操作成功');
      return this.getList();
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
