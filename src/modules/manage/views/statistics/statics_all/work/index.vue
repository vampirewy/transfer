<template>
  <div class="dashboard-editor-container">
    <search-group @searchData="getSearchData" />
    <el-row :gutter="40" style="margin-left: 0">
      <el-col :span="24" class="echartBody">
        <div class="rowTitleParent" style="padding-bottom: 5px">
          <p class="rowTitle" style="margin-left: 0"></p>
          <div class="rowTitleParentRight">
            <span style="background-color: #4991FD"></span>
            <label>建档量</label>
            <span style="background-color: #31C529"></span>
            <label>干预量</label>
          </div>
        </div>
        <div class="noDataLine" v-if="intervenePlanXList.length === 0">
          <img src="@/assets/images/noDataLine.png" />
          <span>暂无数据</span>
        </div>
        <line-chart
          :chart-data="intervenePlanYList"
          :sectionName="intervenePlanName"
          :sectionXList="intervenePlanXList"
          v-else
        />
      </el-col>
    </el-row>
    <div class="wltable">
      <div class="smalltitle">详细信息</div>
      <el-table
        ref="table"
        class="has-expand-table"
        :data="datalist"
        @selection-change="handleSelectionChange"
        :row-key="getRowKeys"
        @expand-change="handleExpandChange"
      >
        <el-table-column
          label="年/月/日"
          prop="formatDate"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="我的客户"
          prop="clientCount"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          label="执行计划"
          prop="totalPlanCount"
          align="center"
        ></el-table-column>
        <el-table-column
          label="随访记录"
          align="center"
          prop="executedPlanCount"
          show-overflow-tooltip
        >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import SearchGroup from './components/Search.vue';
import LineChart from './components/LineChart.vue';

export default {
  name: 'index',
  components: {
    SearchGroup,
    LineChart,
  },

  data() {
    return {
      total: 0,
      tableData: [],
      searchData: {},
      datalist: [],
      // listQuery: {
      //   planType: '4',
      // },
      homeFindCountData: {},
      serviceOrderXList: [],
      serviceOrderYList: [],
      intervenePlanPieXList: [],
      intervenePlanPieYList: [],
      clientTypeXList: [],
      clientTypeYList: [],
      clientTotal: 0,
      intervenePlanYList: [],
      intervenePlanName: ['建档量', '干预量'], // 随访任务折线图
      intervenePlanXList: [],
      dianPieList: [],
      dianColorList: [
        '#5B8FF9',
        '#5AD8A6',
        '#6C6CE5',
        '#F6BD16',
        '#E8684A',
        '#6DC8EC',
        '#31C529',
        '#54c9b6',
        '#F53626',
        '#f5c8be',
      ],
    };
  },
  methods: {
    // 获取信息详情
    getSearchData(data) {
      this.searchData = data;
      this.getEchartIntervenePlan(data); // 随访任务折线图
    },
    // 随访任务 折线图  statics.workPlan
    getEchartIntervenePlan(sendData) {
      const sendDataGet = Object.assign({}, sendData);
      // sendDataGet.planType = 4;
      this.intervenePlanXList = [];
      this.intervenePlanYList = [];

      this.$api.statics.workPlan(sendDataGet).then((res) => {
        const lineIntervenePlanListMap = res.data.data;
        this.datalist = res.data.data;
        const xListInit = [];
        const yListInit = [];
        const yarr1 = [];
        const yarr2 = [];
        const yarr3 = [];
        if (
          lineIntervenePlanListMap != null &&
          // JSON.stringify(lineIntervenePlanListMap) !== '{}'
          lineIntervenePlanListMap.length !== 0
        ) {
          lineIntervenePlanListMap.forEach((key) => {
            xListInit.push(key.formatDate);
            yarr3.push(key.totalPlanCount);
            yarr2.push(key.executedPlanCount);
            yarr1.push(key.clientCount);
          });
          yListInit.push(yarr1, yarr2);
          this.intervenePlanXList = xListInit;
          this.intervenePlanYList = yListInit;
        } else {
          this.intervenePlanXList = [];
          this.intervenePlanYList = [];
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.dashboard-editor-container {
  position: relative;
  .rowTitleParent {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 35px;
    padding-top: 10px;
    .rowTitleParentRight {
      display: flex;
      align-items: center;
      margin-right: 14px;
      span {
        width: 10px;
        height: 3px;
        display: inline-block;
        margin: 0 8px 0 25px;
      }
      label {
        font-size: 12px;
        font-weight: 400;
        color: #97a6bd;
      }
    }
  }
  .noDataLine {
    height: 490px;
    text-align: center;
    img {
      margin-top: 135px;
      width: 200px;
    }
    span {
      font-size: 14px;
      color: #97a6bd;
      display: block;
      margin-top: 15px;
    }
  }
  .rowTitle {
    font-size: 18px;
    background-color: white;
    height: 50px;
    line-height: 50px;
    margin-left: 30px;
    color: #333333;
    font-weight: bold;
    .top5 {
      font-size: 12px;
      color: #999999;
      margin-left: 12px;
      font-weight: 400;
    }
  }
  .echartBody {
    // box-shadow: 0px 0px 50px 0px rgba(151, 166, 189, 0.2);
    border-radius: 15px;
    background-color: white;
    /deep/ .el-radio-button__inner {
      padding: 9px 10px;
    }
    /deep/ .el-radio-button__inner {
      border: 1px solid #4991fd;
      background-color: white;
      font-size: 12px;
    }
    /deep/ .el-radio-button__orig-radio:checked + .el-radio-button__inner {
      background-color: #4991fd;
    }
    /deep/ .el-radio-button:last-child .el-radio-button__inner {
      border-radius: 0 8px 8px 0;
    }
    /deep/ .el-radio-button:first-child .el-radio-button__inner {
      border-radius: 8px 0 0 8px;
    }
  }
  .chart-wrapper {
    background: #fff;
    padding: 5px 20px 20px 20px;
    border-radius: 15px;
    .pieDiv {
      width: 45%;
      margin-left: 5%;
      height: 170px;
      margin-top: 20px;
      overflow-y: auto;
      .pieDivTips {
        display: flex;
        height: 24px;
        justify-content: space-between;
        align-items: center;
        .pieDivTipsLeft {
          display: flex;
          align-items: center;
          .dian {
            width: 9px;
            height: 9px;
            border-radius: 50px;
            margin-right: 8px;
          }
          .dianSize {
            color: #97a6bd;
            font-size: 12px;
          }
        }
        .dianNum {
          color: #333333;
          font-size: 12px;
        }
      }
    }
  }
  .wltable {
    background: #fff;
  }
  .smalltitle {
    font-size: 14px;
    font-weight: 600;
    color: #333333;
    line-height: 25px;
    position: relative;
    padding-left: 10px;
    margin-bottom: 20px;
    &:after {
      width: 5px;
      height: 5px;
      background: #26c165;
      border-radius: 2.5px;
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
