<template>
  <div class="health-monitor-trend">
    <div class="divRightTitleDiv">
      <div class="divRightTitle">查看-血糖
        <div class="titleBiao"></div></div>
    </div>
    <div class="lookPressure">
      <div><span class="lookPressureTitle">姓名：</span><span>{{queryInfo.clientName}}</span></div>
      <div><span class="lookPressureTitle">性别：</span>
      <span v-if="queryInfo.gender === 1">男</span>
      <span v-if="queryInfo.gender === 2">女</span>
      </div>
      <div><span class="lookPressureTitle">年龄：</span><span>{{queryInfo.age}} 岁</span></div>
      <div><span class="lookPressureTitle">客户编号：</span><span>{{queryInfo.clientNo}}</span></div>
    </div>
    <div class="lookPressure">
      <div><span class="lookPressureTitle">血糖类型：</span>
      <span v-if="queryInfo.sugarType === 1">空腹血糖</span>
      <span v-if="queryInfo.sugarType === 2">餐后血糖</span>
      </div>
      <div><span class="lookPressureTitle">血糖值：</span><span>{{queryInfo.sugar}} mmol/L</span></div>
      <div><span class="lookPressureTitle">检测时间：</span><span>{{queryInfo.testDate}}</span></div>
      <div></div>
    </div>
    <div class="lookPressure">
      <div style="width:100%;display: flex;">
        <span class="lookPressureTitle" style="width:50px;white-space: nowrap;">备注：</span>
        <span>{{queryInfo.result}}</span>
      </div>
    </div>
    <!-- <div class="lookPressure">
      <div><span class="lookPressureTitle">备注：</span><span>{{queryInfo.result}}</span></div>
    </div> -->
    <div class="divRightTitleDiv">
      <div class="divRightTitle">趋势
        <div class="titleBiao"></div></div>
    </div>
    <div class="trendTitle">
      <div @click="Fasting()"
      :class="trendIndex === 0?'Fasting':'Fastings'">空腹血糖</div>
      <div @click.stop="afterDinner()"
      :class="trendIndex === 1?'afterDinner':'afterDinners'">餐后血糖</div>
    </div>
    <!-- <div class="chart-legend">
      <span>空腹血糖</span>
      <span>餐后血糖</span>
    </div> -->
    <div class="noDataLine" v-if="xData.length === 0 && yData.length === 0">
      <img src="@/assets/images/noDataLine.png"/>
      <span>暂无数据</span>
    </div>
    <line-chart
      v-else
      :chart-data="yData"
      :sectionName="['空腹血糖', '餐后血糖']"
      :sectionXList="xData"
      :key="timer">
    </line-chart>
    <!-- <div class="title">数据列表</div> -->
    <div class="divRightTitleDiv">
      <div class="divRightTitle">数据列表
        <div class="titleBiao"></div></div>
    </div>
    <el-table :data="table.list"  class="openTable">
      <el-table-column
        v-for="(item, index) in table.columns"
        :key="index"
        :label="item.label"
        :prop="item.prop"
        align="center">
        <template slot-scope="scope">
          <span v-if="item.prop === 'sugar'"
          :class="table.list[scope.$index].sugarTypeHighOrLow === 3 ? 'OrLowClassA' :
          (table.list[scope.$index].sugarTypeHighOrLow === 1 ? 'OrLowClassB' :
          'OrLowClassC')">
            {{scope.row[item.prop]}}
          </span>
          <span v-else>
            {{scope.row[item.prop]}}
          </span>
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
    <!-- <div class="buttons">
      <el-button plain size="small" @click="blackReturn()">返回</el-button>
    </div> -->
    <div class="handle-btn mt30 mb30">
      <el-button class="reset-btn" size="small" @click="blackReturn"
        >返回</el-button>
    </div>
  </div>
</template>

<script>
import LineChart from '../components/line_chart.vue';
import * as dayjs from 'dayjs';
export default {
  name: 'BGTrend',
  props: ['id', 'ids'],
  components: {
    LineChart,
  },
  data() {
    return {
      table: {
        columns: [
          { label: '姓名', prop: 'clientName' },
          { label: '数据时间', prop: 'testDate' },
          { label: '血糖类型', prop: 'sugarTypeName' },
          { label: '血糖值', prop: 'sugar' },
          { label: '备注', prop: 'result' },
        ],
        list: [],
        total: 0,
        pageNo: 1,
        pageSize: 15,
      },
      xData: [],
      xDatas: [], // 空腹血糖日期
      yData: [],
      queryInfo: {},
      FPG: [], // 空腹血糖
      PBG: [], // 餐后血糖
      xDataDinner: [], // 餐后血糖日期
      timer: '',
      trendIndex: 0,
    };
  },
  mounted() {
    console.log(this.id, '血糖新增');
    this.queryChartData();
    this.queryPageList();
    this.queryChartInfo();
  },
  methods: {
    queryChartData() {
      this.$api.healthMonitorInterface.getBGChart(this.id).then(({ data }) => {
        // const xData = [];
        // const FPG = []; // 空腹血糖
        // const PBG = []; // 餐后血糖
        console.log(data.data['空腹血糖'], '空腹血糖');
        (data.data['空腹血糖'] || []).forEach((item) => {
          let dateStr;
          if (new Date(item.testDate).getFullYear() === new Date().getFullYear()) {
            dateStr = dayjs(item.testDate).format('MM/DD');
          } else {
            dateStr = dayjs(item.testDate).format('YY/MM/DD');
          }
          this.xDatas.push(dateStr);
          this.FPG.push(item.sugar);
        });
        console.log(data.data['餐后血糖'], '餐后血糖');
        (data.data['餐后血糖'] || []).forEach((item) => {
          let dateStr;
          if (new Date(item.testDate).getFullYear() === new Date().getFullYear()) {
            dateStr = dayjs(item.testDate).format('MM/DD');
          } else {
            dateStr = dayjs(item.testDate).format('YY/MM/DD');
          }
          // if (xData.length === 0) {
          this.xDataDinner.push(dateStr);
          // }
          this.PBG.push(item.sugar);
        });
        this.xData = this.xDatas;
        // this.yData = [FPG, PBG];
        this.yData = [this.FPG, []];
      });
    },
    Fasting() {
      this.trendIndex = 0;
      this.xData = this.xDatas;
      this.yData[1] = [];
      this.yData[0] = this.FPG;
      this.timer = new Date().getTime();
    },
    afterDinner() {
      this.trendIndex = 1;
      this.xData = this.xDataDinner;
      this.yData[0] = [];
      this.yData[1] = this.PBG;
      this.timer = new Date().getTime();
    },
    queryPageList() {
      this.$api.healthMonitorInterface.getBGList({
        clientId: this.id,
        pageNo: this.table.pageNo,
        pageSize: this.table.pageSize,
      }).then(({ data }) => {
        this.table.total = data.data.total;
        this.table.list = data.data.data;
      });
    },
    queryChartInfo() {
      this.$api.healthMonitorInterface.getDetailHealthBloodSugar(this.ids).then(({ data }) => {
        this.queryInfo = data.data;
      });
    },
    handlePageChange(page) {
      this.table.pageNo = page;
      this.queryPageList();
    },
    handleSizeChange(size) {
      this.table.pageSize = size;
      this.queryPageList();
    },
    blackReturn() {
      this.$emit('messageData', true, true);
    },
  },
};
</script>

<style lang="scss" scoped>
  .trendTitle{
    display: flex;
    // float: right;
    margin-right: 20px;
    div{
      width: 90px;
      height: 38px;
      line-height: 38px;
      text-align: center;
      font-size: 14px;
      color: #ffffff;
      cursor: pointer;
    }
    .Fasting{
      background: #3154AC;
      border-radius: 20px 0 0 20px;
      margin-left:auto;
    }
    .Fastings{
      background: #f6f8fc;
      border-radius: 20px 0 0 20px;
      color: #333333;
      margin-left:auto;
    }
    .afterDinner{
      background: #3154AC;
      border-radius:0 20px 20px 0;
    }
    .afterDinners{
      background: #f6f8fc;
      border-radius:0 20px 20px 0;
      color: #333333;
    }
  }
  .OrLowClassA{
    color: #333333;
  }
  .OrLowClassB{
    color: red;
  }
  .OrLowClassC{
    color: blue;
  }
.health-monitor-trend{
  position: relative;
  margin-top: 20px;
}
.lookPressure{
  display: flex;
  margin:20px 0 20px 0;
  div{
    width: 25%;
    padding-left: 20px;
    font-size: 14px;
    color: #333333;
  }
}
.titless {
    position: relative;
    padding-left: 10px;
    font-size: 18px;
    font-weight: 600;
    color: #333333;
    line-height: 25px;
    margin-bottom: 20px;
}
 .lines {
    width: 36px;
    height: 4px;
    background: #3154AC;
    margin-left: 10px;
    border-radius: 1px;
    position: absolute;
    margin-top: 17px;
    opacity: 0.5;
  }
  .handle-btn {
    text-align: center;
  .reset-btn {
      width: 90px;
      height: 40px;
      background: rgba(49, 84, 172, 0.1);
      border-radius: 20px;
      border: 1px solid #3154AC;
      text-align:center;
      color: #3154AC;
    }
    .add-btn {
      width: 90px;
      height: 40px;
      background: rgba(49, 84, 172, 0.1);
      border-radius: 20px;
      background: #3154AC;
      border: 1px solid #3154AC;
      text-align:center;
    }
  }
</style>
