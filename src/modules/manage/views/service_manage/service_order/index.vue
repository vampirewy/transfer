<template>
  <div class="health-monitor">
    <query-page @reset="reset" @search="search">
      <template slot="left">
        <search>
          <div class="searchInputFormItem">
            <el-input placeholder="姓名/手机号/企业单位" v-model="form.keywords"></el-input>
            <span class="searchBtnImgSpan" @click="search">
              <img class="searchBtnImg" src="@/assets/images/common/search.png"/>
            </span>
          </div>
        </search>
        <query-filter>
          <!--<el-input placeholder="企业单位" v-model="form.workUnitName"></el-input>-->
          <el-input placeholder="服务名称" v-model="form.serviceItemName"></el-input>
          <el-select v-model="form.gender" clearable placeholder="性别">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="2"></el-option>
          </el-select>
          <el-select placeholder="人员类别" v-model="form.gridId" clearable>
            <el-option :label="item.gridName" :value="item.id" v-for="item in gridList"
                       :key="item.id"></el-option>
          </el-select>
          <el-select v-model="form.serviceOpenState" clearable placeholder="服务状态">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
          <div class="filter-item-title">预约时间</div>
          <el-date-picker
                  v-model="form.startTime"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerStartTime"
                  placeholder="选择开始时间">
          </el-date-picker>
          <el-date-picker
                  v-model="form.endTime"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerEndTime"
                  placeholder="选择结束时间">
          </el-date-picker>
        </query-filter>
      </template>
      <template slot="right">
        <div class="Tab">
          <el-tabs v-model="tabIndex" @tab-click="handleTabIndexChange"
                   class="two-tab" style="margin-top: -11px;padding-bottom: 0">
            <el-tab-pane label="服务预约" name="0"></el-tab-pane>
            <el-tab-pane label="待协调" name="1"></el-tab-pane>
            <el-tab-pane label="协调中" name="2"></el-tab-pane>
            <el-tab-pane label="协调成功" name="3"></el-tab-pane>
            <el-tab-pane label="订单完成" name="4"></el-tab-pane>
            <el-tab-pane label="订单取消" name="5"></el-tab-pane>
          </el-tabs>
          <div class="table-operate-buttons">
            <operate-button
                    type="add"
                    @click="handleCreate"
                    v-if="getAccess('service_order_add')"
            ></operate-button>
            <operate-button
                    style="margin-left: 12px"
                    type="delete"
                    @click="handleRemove"
                    v-if="getAccess('service_order_batch_delete')"
            ></operate-button>
          </div>
        </div>
        <el-table :data="table.list" style="width: 100%" align="center"
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="clientName" label="姓名" width="80px" show-overflow-tooltip>
            <template slot-scope="scope">
             <span class="clientName"
                   @click="commonHref.toPersonalHealth(scope.row.clientId, $router)">
               {{ scope.row.clientName | getResult}}
             </span>
            </template>
          </el-table-column>
          <el-table-column prop="gender" label="性别" width="60px" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.gender | getResultGender}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="age" label="年龄" width="60px" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.age | getResult}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="workUnitName" label="单位" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.workUnitName | getResult}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="gridName" label="人员类别" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.gridName | getResult}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="serviceName" label="服务名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.serviceName | getResult}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="reservationTime" label="预约时间" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.reservationTime | getResult}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="state" label="订单状态" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.state" class="statespan" :class="{
              'state1': scope.row.state === 1,
              'state2': scope.row.state === 2,
              'state3': scope.row.state === 3,
              'state4': scope.row.state === 4,
              'state5': scope.row.state === 5,
              }">
                {{scope.row.state | stateFilter}}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="createUserName" label="预约创建人" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.createUserName | getResult}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                      type="text"
                      size="small"
                      v-if="scope.row.state !== 4 && scope.row.state !== 5 &&
                      getAccess('service_order_edit')"
                      @click="handleEdit(scope.row)"
              >操作</el-button>
              <el-button
                      type="text"
                      size="small"
                      @click="handleDetail(scope.row)"
                      v-if="getAccess('service_order_view')"
              >查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align: right">
          <el-pagination
            style="margin-top: 15px"
            background
            @current-change="handlePageChange"
            @size-change="handleSizeChange"
            :page-sizes="[15]"
            :current-page="table.pageNo"
            :page-size="table.pageSize"
            layout="prev, pager, next, jumper, total, sizes"
            :total="table.total"
          ></el-pagination>
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
import deleteIcon from '~/src/assets/images/message-box-delete@2x.png';
import { MAX_PAGESIZE } from '~/src/libs/util/index';

export default {
  name: 'service_order',
  components: {
    QueryPage,
    Search,
    QueryFilter,
    OperateButton,
  },
  filters: {
    stateFilter(val) {
      let Value;
      switch (val) {
        case 1:
          Value = '待协调';
          break;
        case 2:
          Value = '协调中';
          break;
        case 3:
          Value = '协调成功';
          break;
        case 4:
          Value = '订单完成';
          break;
        case 5:
          Value = '订单取消';
          break;
        default:
          Value = '-';
          break;
      }
      return Value;
    },
  },
  data() {
    return {
      trendStatus: false,
      form: {
        keywords: '',
        gender: '',
        workUnitName: '',
        serviceItemName: '',
        gridId: '', // 客户类型
        serviceOpenState: '',
        startTime: '',
        endTime: '',
        isMyself: 1,
      },
      gridList: [], // 人员类别下拉框
      tabIndex: '0',
      table: {
        list: [],
        total: 0,
        pageNo: 1,
        pageSize: 15,
      },
      currentId: '',
      multipleSelection: [],
      pickerStartTime: {
        disabledDate: (time) => {
          if (this.form.endTime) {
            const endTime = new Date(this.form.endTime);
            return time.getTime() > new Date(endTime).getTime() - (3600 * 1000 * 23 * 1);
          }
        },
      },
      pickerEndTime: {
        disabledDate: (time) => {
          if (this.form.startTime) {
            const startTime = new Date(this.form.startTime);
            return time.getTime() < new Date(startTime).getTime() - (3600 * 1000 * 23 * 1);
          }
        },
      },
    };
  },
  mounted() {
    if (localStorage.getItem('serviceOrderActive')) { // 记忆tab
      this.tabIndex = localStorage.getItem('serviceOrderActive');
      localStorage.removeItem('serviceOrderActive');
    }
    if (localStorage.getItem('homeSearchData')) { // 首页带参查询
      const HomeSearchData = JSON.parse(localStorage.getItem('homeSearchData'));
      this.form.startTime = HomeSearchData.startDate;
      this.form.endTime = HomeSearchData.lastDate;
      this.form.searchRange = HomeSearchData.searchRange;
    }
    this.queryPageList();
    this.getGridList(); // 获取人员列类别
  },
  destroyed() {
    // 清除时间 和 我的/平台
    localStorage.removeItem('homeSearchData');
  },
  methods: {
    reset() {
      this.form.keywords = '';
      this.form.workUnitName = '';
      this.form.serviceItemName = '';
      this.form.gender = '';
      this.form.gridId = '';
      this.form.serviceOpenState = '';
      this.form.startTime = '';
      this.form.endTime = '';
      this.table.pageNo = 1;
      this.queryPageList();
    },
    resetTable() {
      this.table.list = [];
      this.table.total = 0;
      this.table.pageNo = 1;
      this.table.pageSize = 15;
    },
    search() {
      this.table.pageNo = 1;
      this.queryPageList();
    },
    queryPageList() {
      const sendData = Object.assign({}, this.form);
      if (this.tabIndex === '0') {
        sendData.ServiceOrderState = '';
      } else {
        sendData.ServiceOrderState = this.tabIndex;
      }
      if (sendData.startTime) {
        sendData.startTime = `${sendData.startTime} 00:00:00`;
      }
      if (sendData.endTime) {
        sendData.endTime = `${sendData.endTime} 23:59:59`;
      }
      this.$api.ServiceManagerInterface.getServiceOrderList({
        ...sendData,
        pageNo: this.table.pageNo,
        pageSize: this.table.pageSize,
      }).then(({ data }) => {
        this.table.total = data.data.total;
        this.table.list = data.data.list;
      });
    },
    /**
     * 操作
     * @param row
     */
    handleEdit(row) {
      localStorage.setItem('serviceOrderActive', this.tabIndex);
      this.$router.push({
        path: `/service_order/edit/${row.id}`,
      });
    },
    /**
     * 查看
     * @param scope
     */
    handleDetail(scope) {
      localStorage.setItem('serviceOrderActive', this.tabIndex);
      this.$router.push({
        path: `/service_order/view/${scope.id}`,
      });
    },
    /**
     * 获取人员类别
     * @return {Promise<void>}
     */
    async getGridList() {
      const res = await this.$api.userManagerInterface.getGridList({ pageNo: 1,
        pageSize: MAX_PAGESIZE });
      const { data } = res.data;
      this.gridList = data.list;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleTabIndexChange() {
      this.resetTable();
      this.search();
    },
    handlePageChange(page) {
      this.table.pageNo = page;
      this.queryPageList();
    },
    handleSizeChange(size) {
      this.table.pageSize = size;
      this.queryPageList();
    },
    /**
     * 新增
     */
    handleCreate() {
      this.$router.push({
        path: '/service_order/create',
      });
    },
    /**
     * 删除服务订单
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
          await this.$api.ServiceManagerInterface.serviceOrderDelete(
            reqBody,
          );
          this.$message.success('操作成功');
          return this.queryPageList();
        },
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.health-monitor {
  /*position: relative;*/
  .Tab{
    position: relative;
    .table-operate-buttons{
      position: absolute;
      justify-content: flex-end;
      top: 0;
      right: 0;
    }
  }

  /deep/ .el-tabs__nav-wrap{
    padding-bottom: 2px;
  }
  /*/deep/ .el-tabs__item {
    box-shadow: none !important;
    &:not(.is-active) {
      color: #97A6BD;
    }
  }*/
  /deep/ .search-button {
    &:hover {
      background: #55AAFF;
    }
    img {
      width: 16px;
    }
  }
  .statespan{
    display: inline-block;
    font-size: 12px;
    width: 68px;
    height: 28px;
    line-height: 28px;
    border-radius: 15px;
    text-align: center;
  }
  .state1{
    background: rgba(254,43,42,0.1);
    color: #FE2B2A;
    border: 1px solid #FE2B2A;
  }
  .state2{
    background: rgba(108,108,229,0.1);
    color: #6C6CE5;
    border: 1px solid #6C6CE5;
  }
  .state3{
    background: rgba(49,197,41,0.1);
    color: #31C529;
    border: 1px solid #31C529;
  }
  .state4{
    background: rgba(73,145,253,0.1);
    color: #4991FD;
    border: 1px solid #4991FD;
  }
  .state5{
    background: rgba(230,176,88,0.1);
    color: #E6B058;
    border: 1px solid #E6B058;
  }
  /deep/ .el-pagination__sizes {
    margin-right: 0;
    .el-select .el-input {
      margin: 0;
    }
  }
  /deep/ .health-monitor-trend {
    .title {
      position: relative;
      padding-left: 10px;
      font-size: 18px;
      font-weight: 600;
      color: #333333;
      line-height: 25px;
      margin-bottom: 20px;
      &:after {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 2px;
        height: 18px;
        background: #4991FD;
        border-radius: 1px;
      }
    }
    .chart-legend {
      text-align: right;
      margin-top: -20px;
      > span {
        font-size: 12px;
        font-weight: 400;
        color: #97A6BD;
        line-height: 17px;
        padding-left: 18px;
        position: relative;
        + span {
          margin-left: 40px;
        }
        &:after {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 10px;
          height: 3px;
        }
        &:first-child:after {
          background: #4991FD;
        }
        &:nth-of-type(2):after {
          background: #31C529;
        }
      }
    }
    .noDataLine{
      height: 490px;
      text-align: center;
      img{
        margin-top: 135px;
        width: 200px;
      }
      span{
        font-size: 14px;
        color: #97A6BD;
        display: block;
        margin-top: 15px;
      };
    }
    .buttons {
      text-align: center;
      margin-top: 30px;
      button {
        width: 80px;
        border-radius: 8px;
        border: none;
        background: #97A6BD;
        color: #fff;
      }
    }
  }
}
</style>
