<template>
  <div class="health-monitor">
    <query-page @reset="reset" @search="search" v-if="!trendStatus">
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
          <el-select v-model="form.gender" clearable placeholder="性别">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="2"></el-option>
          </el-select>
          <!-- <el-input placeholder="企业单位" v-model="form.workUnitName"></el-input> -->
        </query-filter>
      </template>
      <template slot="right">
        <el-tabs v-model="tabIndex" @tab-click="handleTabIndexChange" style="margin-top: -12px;">
          <el-tab-pane label="血压" name="BP"></el-tab-pane>
          <el-tab-pane label="血糖" name="BG"></el-tab-pane>
          <el-tab-pane label="体重" name="weight"></el-tab-pane>
          <el-tab-pane label="运动" name="sport"></el-tab-pane>
        </el-tabs>
        <el-table :data="table.list">
          <el-table-column
            v-for="(item, index) in table.columns"
            :key="index"
            :label="item.label"
            :prop="item.prop"
            :min-width="item.minWidth"
            align="center">
            <template slot-scope="scope">
              <span class="clientName" v-if="item.prop === 'clientName'"
                    @click="commonHref.toPersonalHealth(scope.row.clientId, $router)">
                {{scope.row[item.prop]}}
              </span>
              <span v-else>{{item.formatter ? item.formatter(scope.row[item.prop]) :
                scope.row[item.prop]}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                v-if="getAccess('health_monitor_trend_view')"
                @click="handleTrendClick(scope.row.clientId)">
                趋势查看
              </el-button>
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
    <template v-else>
      <bp-trend
        v-if="tabIndex === 'BP'"
        :id="currentId"
        @close="handleTrendClose">
      </bp-trend>
      <bg-trend
        v-if="tabIndex === 'BG'"
        :id="currentId"
        @close="handleTrendClose">
      </bg-trend>
      <weight-trend
        v-if="tabIndex === 'weight'"
        :id="currentId"
        @close="handleTrendClose">
      </weight-trend>
      <sport-trend
        v-if="tabIndex === 'sport'"
        :id="currentId"
        @close="handleTrendClose">
      </sport-trend>
    </template>
  </div>
</template>

<script>
import QueryPage from '~/src/components/query_page/index.vue';
import Search from '~/src/components/query_page/search.vue';
import QueryFilter from '~/src/components/query_page/query_filter.vue';
import BpTrend from './bp_trend.vue';
import BgTrend from './bg_trend.vue';
import WeightTrend from './weight_trend.vue';
import SportTrend from './sport_trend.vue';

const SEX = {
  1: '男',
  2: '女',
};
const COLUMNS = {
  BP: [
    { label: '姓名', prop: 'clientName' },
    {
      label: '性别',
      prop: 'gender',
      formatter(val) {
        return SEX[val];
      },
    },
    { label: '年龄', prop: 'age' },
    { label: '企业单位', prop: 'workUnitName' },
    { label: '检测时间', prop: 'testDate', minWidth: '180' },
    { label: '收缩压', prop: 'sbp' },
    { label: '舒张压', prop: 'dbp' },
    { label: '脉搏', prop: 'hd' },
  ],
  BG: [
    { label: '姓名', prop: 'clientName' },
    {
      label: '性别',
      prop: 'gender',
      formatter(val) {
        return SEX[val];
      },
    },
    { label: '年龄', prop: 'age' },
    { label: '企业单位', prop: 'workUnitName' },
    { label: '检测时间', prop: 'testDate', minWidth: '180' },
    { label: '血糖类型', prop: 'sugarTypeName' },
    { label: '血糖值', prop: 'sugar' },
  ],
  weight: [
    { label: '姓名', prop: 'clientName' },
    {
      label: '性别',
      prop: 'gender',
      formatter(val) {
        return SEX[val];
      },
    },
    { label: '年龄', prop: 'age' },
    { label: '企业单位', prop: 'workUnitName' },
    { label: '检测时间', prop: 'testDate', minWidth: '180' },
    { label: '体重', prop: 'weight' },
    { label: '体脂率', prop: 'bdPercent' },
  ],
  sport: [
    { label: '姓名', prop: 'clientName' },
    {
      label: '性别',
      prop: 'gender',
      formatter(val) {
        return SEX[val];
      },
    },
    { label: '年龄', prop: 'age' },
    { label: '企业单位', prop: 'workUnitName' },
    { label: '检测时间', prop: 'testDate', minWidth: '180' },
    { label: '步数', prop: 'steps' },
  ],
};

export default {
  name: 'HealthMonitor',
  components: {
    QueryPage,
    Search,
    QueryFilter,
    BpTrend,
    BgTrend,
    WeightTrend,
    SportTrend,
  },
  data() {
    return {
      trendStatus: false,
      form: {
        keywords: '',
        gender: '',
        workUnitName: '',
      },
      tabIndex: 'BP',
      table: {
        columns: COLUMNS.BP,
        list: [],
        total: 0,
        pageNo: 1,
        pageSize: 15,
      },
      currentId: '',
    };
  },
  mounted() {
    if (localStorage.getItem('healthMonitorActive')) {
      this.tabIndex = localStorage.getItem('healthMonitorActive');
      localStorage.removeItem('healthMonitorActive');
    }
    this.queryPageList();
  },
  methods: {
    reset() {
      this.form.keywords = '';
      this.form.workUnitName = '';
      this.form.gender = '';
      this.table.pageNo = 1;
      this.queryPageList();
    },
    resetTable() {
      this.table.list = [];
      this.table.total = 0;
      this.table.pageNo = 1;
      this.table.pageSize = 15;
      this.table.columns = COLUMNS[this.tabIndex];
    },
    search() {
      this.table.pageNo = 1;
      this.queryPageList();
    },
    queryPageList() {
      const apiNameMap = {
        BP: 'getBPList',
        BG: 'getBGList',
        weight: 'getWeightList',
        sport: 'getSportList',
      };
      const apiName = apiNameMap[this.tabIndex];
      this.$api.healthMonitorInterface[apiName]({
        ...this.form,
        pageNo: this.table.pageNo,
        pageSize: this.table.pageSize,
      }).then(({ data }) => {
        this.table.total = data.data.total;
        this.table.list = data.data.list;
      });
    },
    handleTabIndexChange() {
      this.resetTable();
      this.search();
    },
    handleTrendClick(id) {
      this.currentId = id;
      this.trendStatus = true;
    },
    handleTrendClose() {
      this.currentId = '';
      this.trendStatus = false;
    },
    handlePageChange(page) {
      this.table.pageNo = page;
      this.queryPageList();
    },
    handleSizeChange(size) {
      this.table.pageSize = size;
      this.queryPageList();
    },
  },
};
</script>

<style lang="scss" scoped>
.health-monitor {
  /deep/ .el-tabs__item {
    box-shadow: none !important;
    &:not(.is-active) {
      color: #97A6BD;
    }
  }
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
