<template>
  <div class="dashboard-editor-container" style="background-color: #F6F8FC;padding: 20px">
    <search-group @searchData="getSearchData" />
    <panel-group/>
    <el-row :gutter="40" style="margin-left: 0;margin-bottom: 20px;width: 100%;">
      <el-col :span="24" class="echartBody" style="height:380px">

            <div class="divTop">
              <div class="divTitle" style="margin-top: 15px">
                <span><img src="@/assets/images/common/titleLeft.png" alt=""></span>
                检后就诊趋势
              </div>
            </div>
            <div class="divRightTitleDiv">
      <div class="rowTitleParent" style="padding-top: 8px;padding-bottom: 12px">
           <div class="rowTitleParentRight">
            <span style="background: linear-gradient(180deg, #3154AC 0%, #4B86FF 100%);
            margin-left: 0;"></span>
            <label>已就诊</label>
            <span style="background: linear-gradient(180deg, #FA912B 0%, #EAAF75 100%);"></span>
            <label>未就诊</label>
            <span style="background-color: #36BF2F"></span>
            <label>就诊费用</label>
          </div>
        <div>
          <el-radio-group
                  style="margin-top: 0;margin-right: 15px"
                  v-model="checkAfterForm.type"
                  @change="chooseCheckAfterFormRadio"
          >
            <el-radio-button :label="1">本周</el-radio-button>
            <el-radio-button :label="2">本月</el-radio-button>
            <el-radio-button :label="3">今年</el-radio-button>
          </el-radio-group>
          <!--<el-date-picker
                  v-model="checkAfterForm.startTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  :max-date="checkAfterForm.endTime"
                  placeholder="选择日期范围"
                  style="width: 160px"
          >
          </el-date-picker>-->
          <el-date-picker
                  v-model="checkAfterFormTime"
                  @change="getCheckAfterFormTime"
                  style="width: 280px;"
                  value-format="yyyy-MM-dd"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </div>
    </div>

        <div class="noDataLine" v-if="intervenePlanXList.length === 0">
          <img style="margin-top: 70px" src="@/assets/images/noDataLine.png"/>
          <!--<span>暂无数据</span>-->
        </div>
        <!-- <bar-chart-line
        :xList="intervenePlanName" :yList="intervenePlanYList" :height="'300px'"
                   :colorListProp="['#4991FD', '#31C529']" key="1"
                   v-else-if="intervenePlanXList.length === 1"/> -->
        <line-pie-chart :chart-data1="intervenePlanYList1"
                        :chart-data2="intervenePlanYList2"
                        :chart-data3="intervenePlanYList3"
                    :sectionName="intervenePlanName"
                    :sectionXList="intervenePlanXList" v-else/>
      </el-col>
    </el-row>
     <el-row :gutter="40" style="margin-left: 0;margin-bottom: 20px;margin-right: 0">
      <el-col :span="16" class="echartBody" style="height: 470px">
        <sun></sun>
      </el-col>
    <el-col :span="8" style="padding-right: 0">
      <el-col class="echartBody" style="height: 470px">
        <div class="rowTitleParent">
          <div class="divTitle" style="margin-left:15px;margin-top: -5px">
            <span><img src="@/assets/images/common/titleLeft.png" alt=""></span>
            检后就医转化率分析
          </div>
        </div>
        <div style="text-align: center;margin-top: 10px">
          <el-radio-group
                  v-model="checkAfterPercent.type"
                  @change="chooseCheckAfterPercenType"
          >
            <el-radio-button :label="1">总体</el-radio-button>
            <el-radio-button :label="2">红色预警</el-radio-button>
            <el-radio-button :label="3">橙色预警</el-radio-button>
          </el-radio-group>
        </div>
        <div class="noDataLine" v-if="checkAfterPercentYList.length === 0" style="height: 215px">
          <img src="@/assets/images/noDataLine.png" style="width: 200px;margin-top: 100px"/>
          <!--<span>暂无数据</span>-->
        </div>
        <div class="chart-wrapper" v-else>
          <div class="pieDiv" style="margin:0 5% 10px 5%;">
            <funnel-chart :xList="checkAfterPercentXList" :yList="checkAfterPercentYList" />
          </div>
          <div class="pieDiv" style="height:80px;margin-top: 40px">
            <div class="pieDivTips"
                 v-for="(item, index) in dianPieCheckAfterPercentList" :key="item">
              <div class="pieDivTipsLeft">
                <p class="dian"
                   :style="{'background-color': dianCheckAfterPercentColorList[index]}"></p>
              </div>
              <p class="dianNum">{{item}}</p>
            </div>
          </div>
        </div>
      </el-col>
    </el-col>
  </el-row>
    <el-row :gutter="40" style="margin-left: 0;margin-right: 0">
      <el-col :span="16" class="echartBody" style="height: 470px">
        <subject></subject>
      </el-col>
    <el-col :span="8" style="padding-right: 0">
      <el-col class="echartBody" style="height: 470px">
        <div class="rowTitleParent">
          <div class="divTitle" style="margin-left:15px;margin-top: -5px">
            <span><img src="@/assets/images/common/titleLeft.png" alt=""></span>
            检后就医费用构成分析
          </div>
        </div>
        <div style="text-align: center;margin-top: 10px">
          <el-radio-group
                  v-model="checkAfterFee.type"
                  @change="choosePlanType"
          >
            <el-radio-button :label="1">科室</el-radio-button>
            <el-radio-button :label="2">阳性</el-radio-button>
          </el-radio-group>
        </div>
        <div class="noDataLine" v-if="checkAfterFeePieYList.length === 0" style="height: 215px">
          <img src="@/assets/images/noDataLine.png" style="width: 200px;margin-top: 100px"/>
          <!--<span>暂无数据</span>-->
        </div>
        <div class="chart-wrapper" v-else>
          <div class="pieDiv" style="margin:18px 5% 0 5%;">
            <pie-chart :xList="checkAfterFeePieXList"
                       :yList="checkAfterFeePieYList" :centerText="checkAfterFeeTotal"/>
          </div>
          <div class="pieDiv" style="height:80px">
            <div class="pieDivTips" v-for="(item, index) in dianPieList" :key="item">
              <div class="pieDivTipsLeft">
                <p class="dian" :style="{'background-color': dianPieColorList[index]}"></p>
              </div>
              <p class="dianNum">{{item || '-'}}</p>
            </div>
          </div>
        </div>
      </el-col>
    </el-col>
  </el-row>

    <!--<el-row :gutter="8">-->
    <!--<el-col style="padding-right:8px;margin-bottom:30px;">-->
    <!--<transaction-table />-->
    <!--</el-col>-->
    <!--</el-row>-->
  </div>
</template>

<script>
import SearchGroup from './el_modal/search.vue';
import PanelGroup from './el_modal/panel_group.vue';
import PieChart from './el_modal/pie_chart.vue';
import PieChartKong from './el_modal/pie_chart_kong.vue';
import BarChart from './el_modal/bar_chart.vue';
import LineChart from './el_modal/line_chart.vue';
import LinePieChart from './el_modal/line_pie_chart.vue';
import FunnelChart from './el_modal/funnel_chart.vue';
// import TabList from './el_modal/tab-list.vue';
const BarChartLine = () => import('./el_modal/bar_chart.vue'); // 为了解决eslint报错，和组件相互干扰的问题
import Subject from './el_modal/subject.vue';
import Sun from './el_modal/sun.vue';
export default {
  name: 'in_hospital_change_total',
  components: {
    SearchGroup,
    PanelGroup,
    PieChart,
    PieChartKong,
    BarChart,
    BarChartLine, // 折线图的柱形显示
    LineChart,
    LinePieChart,
    FunnelChart, // 漏斗图 检后转化率
    // TabList,
    Sun, // 阳性就诊排名
    Subject, // 就诊科室排名
  },

  data() {
    return {
      searchData: {},
      checkAfterFormTime: '',
      checkAfterForm: { // 检后就诊趋势 查询
        type: 2,
        queryStartTime: '',
        queryEndTime: '',
      },
      checkAfterPercent: { // 检后就医转化率漏斗图 查询
        type: 2,
      },
      checkAfterFee: { // 检后就医费用 查询
        type: 1,
      },
      // 检后就诊趋势折线图
      intervenePlanYList1: [], // 已就诊
      intervenePlanYList2: [], // 未就诊
      intervenePlanYList3: [], // 就诊费用
      intervenePlanName: ['检后就诊趋势'],
      intervenePlanXList: [],
      // 检后就医转化率分析漏斗图
      dianPieCheckAfterPercentList: [],
      checkAfterPercentXList: ['检后就医转化率分析'],
      checkAfterPercentYList: [],
      dianCheckAfterPercentColorList: ['#FA912B', '#806CE5', '#36BF2F', '#24499D', '#36BF2F',
        '#6DC8EC', '#31C529', '#54c9b6', '#F53626', '#f5c8be'],
      // 检后就医费用饼图
      checkAfterFeePieXList: [],
      checkAfterFeePieYList: [],
      checkAfterFeeTotal: '', // 总费用
      dianPieList: [],
      dianPieColorList: ['#3154AC', '#806CE5', '#333333', '#FA912B', '#36BF2F',
        '#6DC8EC', '#31C529', '#54c9b6', '#F53626', '#f5c8be'],
    };
  },
  mounted() { // 写两个因为缓存原因
    document.querySelector('.main-content-con').style = 'top: 97px';
    document.querySelector('.content-wrapper').style = 'height: calc(100%);margin: 0;padding: 0';
  },
  activated() {
    document.querySelector('.main-content-con').style = 'top: 97px';
    document.querySelector('.content-wrapper').style = 'height: calc(100%);margin: 0;padding: 0';
  },
  deactivated() { // 为了此页面有更好的展示效果，并保证其他页面样式不变
    document.querySelector('.main-content-con').style = 'top: 116px';
    document.querySelector('.content-wrapper').style = 'height: calc(100% - 80px);margin: 0 20px 20px 20px;padding: 20px';
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getEchartIntervenePlan();// 检后就诊趋势
      vm.getCheckAfterPercent(); // 检后就医转化率
      vm.getCheckAfterFee(); // 检后就医费用
    });
  },
  methods: {
    getSearchData(data) {
      this.searchData = data;
      // this.getEchartcheckAfterFeePie(data); // 随访任务饼图
    },
    chooseCheckAfterFormRadio(val) {
      console.log(val);
      this.checkAfterFormTime = '';
      this.checkAfterForm.queryStartTime = '';
      this.checkAfterForm.queryEndTime = '';
      this.getEchartIntervenePlan();
    },
    chooseCheckAfterPercenType() {
      this.getCheckAfterPercent();
    },
    choosePlanType() { // 检后就医费用切换
      this.getCheckAfterFee();
    },
    getCheckAfterFormTime(value) {
      console.log(value);
      this.checkAfterForm.type = '';
      this.checkAfterForm.queryStartTime = value[0];
      this.checkAfterForm.queryEndTime = value[1];
      this.getEchartIntervenePlan();
    },
    // 检后就诊趋势 折线图
    getEchartIntervenePlan() {
      const sendDataGet = Object.assign({}, this.checkAfterForm);
      this.intervenePlanXList = [];
      this.intervenePlanYList1 = [];
      this.intervenePlanYList2 = [];
      this.intervenePlanYList3 = [];
      this.$api.InhospitalChange.getCheckAfterStatistics(sendDataGet).then((res) => {
        res.data.data.haveCheckedCount.forEach((val) => {
          this.intervenePlanYList1.push(val.count);
        });
        res.data.data.notCheckCount.forEach((val) => {
          this.intervenePlanYList2.push(val.count);
        });
        res.data.data.sumMoney.forEach((val) => {
          this.intervenePlanXList.push(val.date);
          this.intervenePlanYList3.push(val.money);
        });
      });
      /* this.intervenePlanXList = ['1月', '2月', '3月', '4月',
        '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
      this.intervenePlanYList1 =
        [17.0, 9.9, 17.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 26.5, 33.3];
      this.intervenePlanYList2 =
        [12.6, 3.9, 19.0, 26.4, 28.7, 70.7, 175.6, 192.2, 48.7, 18.8, 16.0, 22.3];
      this.intervenePlanYList3 =
        [20.6, 12.2, 13.3, 14.5, 16.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 16.2];*/
    },
    // 检后就诊转化率 漏斗图
    getCheckAfterPercent() {
      const sendDataGet = Object.assign({}, this.checkAfterPercent);
      this.dianPieCheckAfterPercentList = [];
      this.checkAfterPercentYList = [];
      this.$api.InhospitalChange.getSeeDoctorRateStatistics(sendDataGet).then((res) => {
        console.log(res.data.data);
        res.data.data.forEach((val) => {
          this.dianPieCheckAfterPercentList.push(val.rateType);
          this.checkAfterPercentYList.push({ value: val.rate.split('%')[0], name: val.rateType });
        });
      });
      /* this.dianPieCheckAfterPercentList = ['阳性上报', '首次跟踪', '预约挂号', '完成就诊'];
      this.checkAfterPercentYList = [
        { value: 80, name: '阳性上报' },
        { value: 60, name: '首次跟踪' },
        { value: 40, name: '完成就诊' },
        { value: 20, name: '预约挂号' },
      ];*/
    },
    // 随访任务饼图
    async getCheckAfterFee() {
      const sendDataGet = {};
      this.dianPieList = [];
      this.checkAfterFeePieYList = [];
      let res;
      let total;
      if (this.checkAfterFee.type === 1) {
        total = 0;
        res = await this.$api.InhospitalChange.getSeeDoctorFeeStructureDepartment(sendDataGet);
        res.data.data.forEach((val) => {
          this.dianPieList.push(val.departmentName);
          this.checkAfterFeePieYList.push({ value: val.fee, name: val.departmentName });
          total += val.fee;
        });
      } else if (this.checkAfterFee.type === 2) {
        total = 0;
        res = await this.$api.InhospitalChange.getSeeDoctorFeeStructurePositive(sendDataGet);
        res.data.data.forEach((val) => {
          if (val.reportLv === 1) {
            val.name = '红色';
          } else if (val.reportLv === 2) {
            val.name = '橙色';
          }
          this.dianPieList.push(val.name);
          this.checkAfterFeePieYList.push({ value: val.fee, name: val.name });
          total += val.fee;
        });
      }
      console.log(res);
      /* this.dianPieList = ['外科', '急诊科', '肿瘤科', '消化内科', '中医内科'];
      this.checkAfterFeePieYList = [
        { value: 700, name: ' 外科' },
        { value: 248, name: '急诊科' },
        { value: 200, name: '肿瘤科' },
        { value: 400, name: '消化内科' },
        { value: 200, name: '中医内科' },
      ];*/
      this.checkAfterFeeTotal = total.toFixed(2);
    },

  },
};
</script>
<style lang="scss" scoped>
.divTitle{
  margin: 26px 0 0 0px;
  font-size: 16px;
  font-weight: 600;
  color: #333333;
}
.dashboard-editor-container {
  position: relative;
  // width: 70%;
  flex: 1;
}
  .rowTitleParent{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 35px;
    padding-top: 10px;
    .rowTitleParentRight{
      display: flex;
      align-items: center;
      margin-right: 14px;
      span{
        width: 12px;
        height: 12px;
        border-radius: 50px;
        display: inline-block;
        margin: 0 8px 0 25px;
      }
      label{
        font-size: 12px;
        font-weight: 400;
        color: #333333;
      }
    }
  }
  .noDataLine{
    // height: 490px;
    height: 300px;
    text-align: center;
    img{
      // margin-top: 135px;
      width: 200px;
    }
    span{
      font-size: 14px;
      color: #97A6BD;
      display: block;
      margin-top: 15px;
    };
  }
  .rowTitle {
    font-size: 18px;
    background-color: white;
    height: 50px;
    line-height: 50px;
    margin-left: 30px;
    color: #333333;
    font-weight: bold;
    .top5{
      font-size: 12px;
      color: #999999;
      margin-left: 12px;
      font-weight: 400;
    }
  }
  .echartBody{
    height: 410px;
    box-shadow: 0px 6px 24px 0px rgba(14, 37, 87, 0.06);
    border-radius: 8px;
    background-color: white;
    /deep/ .el-radio-button__inner {
      padding: 12.2px 11px;
      min-width: 80px;
    }
    /deep/ .el-radio-button__inner{
      border: 1px solid #E5E7EF;
      background-color: white;
      font-size: 14px;
      color: #333333;
    }
    /deep/ .el-radio-button__orig-radio:checked + .el-radio-button__inner{
      border: 1px solid #7CA7FF;
      background-color: #7CA7FF;
      color: white;
    }
    /deep/ .el-radio-button:last-child .el-radio-button__inner{
      border-radius: 0 8px 8px 0;
    }
    /deep/ .el-radio-button:first-child .el-radio-button__inner{
      border-radius: 8px 0 0 8px;
    }
    /deep/ .el-table .el-table__header-wrapper th .cell{
    text-align: center !important;
    }
  }
  .chart-wrapper {
    background: #fff;
    padding: 5px 20px 20px 20px;
    border-radius: 15px;
    /*margin-top: 20px;*/
    /*margin-bottom: 32px;*/
    /*  p{
      font-size: 15px;
      margin-bottom: 20px;
      border-bottom: 1px solid #EFEFEF;
    }*/
    .pieDiv{
      width: 90%;
      margin-left: 20%;
      /*height: 170px;*/
      margin-top: 35px;
      overflow-y: auto;
      overflow: hidden;
      flex-wrap: wrap;
      display: flex;
      .pieDivTips{
        // display: flex;
        /*height: 24px;*/
        justify-content: space-between;
        align-items: center;
        width: 44%;
        .pieDivTipsLeft{
          // display: flex;
          align-items: center;
          display: inline-block;
          .dian{
            width: 12px;
            height: 12px;
            // border-radius: 50px;
            margin-right: 6px;
          }
          .dianSize{
            color: #97A6BD;
            font-size: 12px;
          }
        }
        .dianNum{
          color: #333333;
          font-size: 12px;
          display: inline-block;
          margin-top: 2.5px;
          vertical-align: top;
        }
      }
    }
  }
// }
/deep/ .el-range-input{
  &::placeholder {
    color: #999999!important;
  }
}
/*@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}*/
</style>
