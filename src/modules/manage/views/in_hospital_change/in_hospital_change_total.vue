<template>
<div style="margin:-20px -15px -40px -15px;background-color: #F6F8FC;">
  <div class="dashboard-editor-container">
    <search-group @searchData="getSearchData" />
    <panel-group :formData="homeFindCountData" @toRouterPage="toRouterPage" />
    <el-row :gutter="40" style="margin-left: 0;margin-bottom: 20px;width: 100%;">
      <el-col :span="24" class="echartBody" style="height:380px">

            <div class="divTop">
              <div class="divTitle" style="margin-top: 15px">
                <span><img src="@/assets/images/common/titleLeft.png" alt=""></span>
                阳性就诊TOP排名
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
                  v-model="checkAfterForm.planType"
                  @change="chooseRadio"
          >
            <el-radio-button label="1">本周</el-radio-button>
            <el-radio-button label="2">本月</el-radio-button>
            <el-radio-button label="3">今年</el-radio-button>
          </el-radio-group>
          <el-date-picker
                  v-model="checkAfterForm.startTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  :max-date="checkAfterForm.endTime"
                  placeholder="选择日期范围"
                  style="width: 160px"
          >
          </el-date-picker>
        </div>
      </div>
    </div>

        <div class="noDataLine" v-if="intervenePlanXList.length === 0">
          <img src="@/assets/images/noDataLine.png"/>
          <span>暂无数据</span>
        </div>
        <!-- <bar-chart-line
        :xList="intervenePlanName" :yList="intervenePlanYList" :height="'300px'"
                   :colorListProp="['#4991FD', '#31C529']" key="1"
                   v-else-if="intervenePlanXList.length === 1"/> -->
        <line-pie-chart :chart-data="intervenePlanYList"
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
                  v-model="checkAfterPercent.planType"
                  @change="choosePlanType"
          >
            <el-radio-button label="1">总体</el-radio-button>
            <el-radio-button label="2">红色预警</el-radio-button>
            <el-radio-button label="3">橙色预警</el-radio-button>
          </el-radio-group>
        </div>
        <div class="noDataLine" v-if="intervenePlanPieXList.length === 0" style="height: 215px">
          <img src="@/assets/images/noDataLine.png" style="width: 200px;margin-top: 100px"/>
          <span>暂无数据</span>
        </div>
        <div class="chart-wrapper" v-else>
          <div class="pieDiv" style="margin:0 5% 10px 5%;">
            <funnel-chart :xList="intervenePlanPieXList" :yList="intervenePlanPieYList" />
          </div>
          <div class="pieDiv" style="height:80px;margin-top: 40px">
            <div class="pieDivTips"
                 v-for="(item, index) in dianPieCheckAfterPercentList" :key="item.name">
              <div class="pieDivTipsLeft">
                <p class="dian" :style="{'background-color': dianColorList[index]}"></p>
                <p class="dianSize">{{item.name}}</p>
              </div>
              <p class="dianNum">{{item.value}}</p>
            </div>
          </div>
        </div>
      </el-col>
    </el-col>
  </el-row>
    <el-row :gutter="40" style="margin-left: 0;margin-bottom: 20px;margin-right: 0">
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
                  v-model="listQuery.planType"
                  @change="choosePlanType"
          >
            <el-radio-button label="4">科室</el-radio-button>
            <el-radio-button label="5">阳性</el-radio-button>
          </el-radio-group>
        </div>
        <div class="noDataLine" v-if="intervenePlanPieXList.length === 0" style="height: 215px">
          <img src="@/assets/images/noDataLine.png" style="width: 200px;margin-top: 100px"/>
          <span>暂无数据</span>
        </div>
        <div class="chart-wrapper" v-else>
          <div class="pieDiv" style="margin:18px 5% 0 5%;">
            <pie-chart :xList="intervenePlanPieXList" :yList="intervenePlanPieYList" />
          </div>
          <div class="pieDiv" style="height:80px">
            <div class="pieDivTips" v-for="(item, index) in dianPieList" :key="item.name">
              <div class="pieDivTipsLeft">
                <p class="dian" :style="{'background-color': dianColorList[index]}"></p>
                <p class="dianSize">{{item.name}}</p>
              </div>
              <p class="dianNum">{{item.value}}</p>
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
      listQuery: {
        planType: '4',
      },
      checkAfterForm: {
        planType: '2',
        startTime: '',
        endTime: '',
      },
      checkAfterPercent: {
        planType: '2',
      },
      homeFindCountData: {},
      serviceOrderXList: [],
      serviceOrderYList: [],
      dianPieCheckAfterPercentList: [
        { namne: '阳性上报',
          value: '阳性上报',
        },
        { namne: '首次跟踪',
          value: '首次跟踪',
        },
        { namne: '预约挂号',
          value: '预约挂号',
        },
        { namne: '完成就诊',
          value: '完成就诊',
        },
      ],
      intervenePlanPieXList: ['10', '20', '30', '10', '40'],
      intervenePlanPieYList: [
        { value: 700, name: ' 外科' },
        { value: 248, name: '急诊科' },
        { value: 200, name: '肿瘤科' },
        { value: 400, name: '消化内科' },
        { value: 200, name: '中医内科' },
      ],
      clientTypeXList: [],
      clientTypeYList: [],
      clientTotal: 0,
      intervenePlanYList: [['20', '19', '16', '20', '23', '30', '28', '25', '20', '15', '23', '30', '35', '40', '20']],
      intervenePlanName: ['客户趋势'], // 随访任务折线图
      intervenePlanXList: ['04/07', '04/08', '04/09', '04/10', '04/11', '04/12', '04/13', '04/14', '04/15', '04/16', '04/17', '04/18', '04/19', '04/20', '04/21'],
      dianPieList: [
        {
          namne: '外科',
          value: '外科',
        },
        {
          namne: '急诊科',
          value: '急诊科',
        },
        {
          namne: '肿瘤科',
          value: '肿瘤科',
        },
        {
          namne: '消化内科',
          value: '消化内科',
        },
        {
          namne: '中医内科',
          value: '中医内科',
        },
      ],
      dianColorList: ['#3154AC', '#806CE5', '#333333', '#FA912B', '#36BF2F',
        '#6DC8EC', '#31C529', '#54c9b6', '#F53626', '#f5c8be'],
    };
  },
  methods: {
    getSearchData(data) {
      this.searchData = data;
      // this.getHomeFindCount(data); // 查询五数据
      // this.getEchartIntervenePlan(data);// 随访任务折线图
      // this.getServiceOrderInfo(data); // 服务订单
      // this.getEchartIntervenePlanPie(data); // 随访任务饼图
    },
    checkRadio(val) {
      console.log(val);
    },
    choosePlanType() { // 随访计划，随访记录切换
      const sendData = Object.assign(this.searchData, this.listQuery);
      this.getEchartIntervenePlanPie(sendData);
    },
    toRouterPage(type) { // 点击客户总数 跳转我的客户
      localStorage.setItem('homeSearchData', JSON.stringify({
        startDate: this.searchData.startDate.split(' ')[0].replace(/\//g, '-'),
        lastDate: this.searchData.lastDate.split(' ')[0].replace(/\//g, '-'),
        searchRange: this.searchData.searchRange,
      }));
      if (type === 1) {
        this.$router.push('user_duty');
      } else if (type === 2) {
        this.$router.push('report');
      } else if (type === 3) {
        this.$router.push('life_style_questionnaire');
      } else if (type === 4) {
        this.$router.push('estimate_report');
      } else if (type === 5) {
        this.$router.push('service_order');
      }
    },
    // 查询五数据
    getHomeFindCount(sendData) {
      this.$api.personal.homeFindcount(sendData).then((res) => {
        this.homeFindCountData = res.data.data;
      });
    },
    // 随访任务 折线图
    getEchartIntervenePlan(sendData) {
      const sendDataGet = Object.assign({}, sendData);
      sendDataGet.planType = 4;
      this.intervenePlanXList = [];
      this.intervenePlanYList = [];
      this.$api.personal.echartIntervenePlan(sendDataGet).then((res) => {
        const lineIntervenePlanListMap = res.data.data.lineIntervenePlanListMap;
        const xListInit = [];
        const yListInit = [];
        if (
          lineIntervenePlanListMap != null &&
          JSON.stringify(lineIntervenePlanListMap) !== '{}'
        ) {
          Object.keys(lineIntervenePlanListMap).forEach((key) => {
            xListInit.push(key);
            yListInit.push(lineIntervenePlanListMap[key]);
          });
          this.intervenePlanXList = xListInit;
          this.intervenePlanYList.push(yListInit);
        } else {
          this.intervenePlanXList = [];
          this.intervenePlanYList = [];
        }
        this.getEchartIntervenePlanAll(sendData);
      });
    },
    // 随访任务 折线图全部任务
    getEchartIntervenePlanAll(sendData) {
      const sendDataGetAll = Object.assign({}, sendData);
      sendDataGetAll.planType = 5;
      this.$api.personal.echartIntervenePlan(sendDataGetAll).then((res) => {
        const lineIntervenePlanListMap = res.data.data.lineIntervenePlanListMap;
        const xListInit = [];
        const yListInit = [];
        if (
          lineIntervenePlanListMap != null &&
          JSON.stringify(lineIntervenePlanListMap) !== '{}'
        ) {
          Object.keys(lineIntervenePlanListMap).forEach((key) => {
            xListInit.push(key);
            yListInit.push(lineIntervenePlanListMap[key]);
          });
          this.intervenePlanXList = xListInit;
          if (this.intervenePlanXList.length === 1) {
            this.intervenePlanYList.push(yListInit);
            this.intervenePlanYList = [Number(this.intervenePlanYList[0][0]),
              Number(this.intervenePlanYList[1][0])];
          } else {
            this.intervenePlanYList.push(yListInit);
          }
        } else {
          this.intervenePlanXList = [];
          this.intervenePlanYList = [];
        }
      });
    },
    // 服务订单  先写死 二期需求
    getServiceOrderInfo(sendData) {
      // this.serviceOrderXList = ['心里咨询', '报告解读', '私人医生', '其他'];
      // this.serviceOrderYList = [79, 42, 100, 130];
      const sendDataGet = Object.assign({}, sendData);
      this.serviceOrderXList = [];
      this.serviceOrderYList = [];
      this.$api.personal.echartServiceOrder(sendDataGet).then((res) => {
        const ServiceOrderListMap = res.data.data.serviceOrderListMap;
        const xListInit = [];
        const yListInit = [];
        if (
          ServiceOrderListMap != null &&
          JSON.stringify(ServiceOrderListMap) !== '{}'
        ) {
          Object.keys(ServiceOrderListMap).forEach((key) => {
            xListInit.push(key);
            yListInit.push(Number(ServiceOrderListMap[key]));
          });
          this.serviceOrderXList = xListInit;
          this.serviceOrderYList = yListInit;
        } else {
          this.serviceOrderXList = [];
          this.serviceOrderYList = [];
        }
      });
    },
    // 随访任务饼图
    getEchartIntervenePlanPie(sendData) {
      const sendDataGet = Object.assign(sendData, this.listQuery);
      this.$api.personal.echartIntervenePlanPie(sendDataGet).then((res) => {
        const intervenePlanListMap = res.data.data.intervenePlanListMap;
        const xListInit = [];
        const yListInit = [];
        const dianObjList = [];
        if (
          intervenePlanListMap != null &&
          JSON.stringify(intervenePlanListMap) !== '{}'
        ) {
          Object.keys(intervenePlanListMap).forEach((key) => {
            xListInit.push(key);
            yListInit.push({ name: key, value: intervenePlanListMap[key] });
            dianObjList.push({ name: key, value: intervenePlanListMap[key] });
          });
          this.intervenePlanPieXList = xListInit;
          this.intervenePlanPieYList = yListInit;
          this.dianPieList = dianObjList;
        } else {
          this.intervenePlanPieXList = [];
          this.intervenePlanPieYList = [];
          this.dianPieList = [];
        }
      });
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
    box-shadow: 0px 0px 50px 0px rgba(151, 166, 189, 0.2);
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
.TabBars{
  display: flex;
  margin-top: 30px;
  // margin-left: 10px;
  .TabBarsNames{
    cursor: pointer;
    background: #EEF1F5;
    border-color: transparent;
    color: #666666;
    position: relative;
    margin-right: 30px;
    padding: 10px 14px 10px 16px;
    font-size: 14px;
    border-radius: 8px 5px 0 0;
  }
  .TabBarsNames:after{
    content: '';
    display: block;
    width: 25px;
    height: 40px;
    position: absolute;
    -webkit-transform: skewX(23deg);
    transform: skewX(23deg);
    background: #EEF1F5;
    border-top-right-radius: 8px;
    top: 0px;
    right: -13px;
  }
  .TabBarsNames:before {
    content: '';
    display: block;
    width: 10px;
    height: 39px;
    position: absolute;
    -webkit-transform: skewX(165deg);
    transform: skewX(163deg);
    background: #EEF1F5;
    border-top-left-radius: 8px;
    top: 0px;
    left: -4px;
    border-bottom: solid 1px #EEF1F5;
  }
  .TabBarsName{
    cursor: pointer;
    background: #ffffff;
    border-color: transparent;
    color: #333333;
    font-weight: 500;
    position: relative;
    margin-right: 30px;
    padding: 10px 14px 10px 16px;
    font-size: 14px;
    border-radius: 8px 5px 0 0;
  }
  .TabBarsName:before {
    content: '';
    display: block;
    width: 10px;
    height: 39px;
    position: absolute;
    -webkit-transform: skewX(165deg);
    transform: skewX(163deg);
    background: #ffffff;
    border-top-left-radius: 8px;
    top: 0px;
    left: -4px;
    border-bottom: solid 1px #ffffff;
  }
  .TabBarsName:after{
    content: '';
    display: block;
    width: 25px;
    height: 40px;
    position: absolute;
    -webkit-transform: skewX(23deg);
    transform: skewX(23deg);
    background: white;
    border-top-right-radius: 8px;
    top: 0px;
    right: -13px;
  }
  .Tabunread{
    display: inline-block;
    background: #fa912b;
    padding: 3px;
    color: #ffffff;
    width: 12px;
    height: 12px;
    line-height: 12px;
    text-align: center;
    border-radius: 10px;
    margin-left: 5px;
    font-size: 12px;
  }
}
.TabListcss{
  height: 380px;
  width: 97%;
  background: #ffffff;
  box-shadow: 0px 6px 24px 0px rgba(14, 37, 87, 0.06);
  border-radius: 0px 0px 8px 8px;
  padding: 20px;
  margin-top: 10px;
}
/*@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}*/
</style>
