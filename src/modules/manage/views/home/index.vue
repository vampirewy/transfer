<template>
  <div class="dashboard-editor-container">
    <search-group @searchData="getSearchData" />
    <panel-group :formData="homeFindCountData" @toRouterPage="toRouterPage" />
    <el-row :gutter="40" style="margin-left: 0">
      <el-col :span="15" class="echartBody">
        <div class="rowTitleParent" style="padding-bottom: 5px">
          <p class="rowTitle" style="margin-left: 0">随访任务</p>
          <div class="rowTitleParentRight">
            <span style="background-color: #4991FD"></span>
            <label>随访计划</label>
            <span style="background-color: #31C529"></span>
            <label>随访记录</label>
          </div>
        </div>
        <div class="noDataLine" v-if="intervenePlanXList.length === 0">
          <img src="@/assets/images/noDataLine.png"/>
          <span>暂无数据</span>
        </div>
        <bar-chart-line :xList="intervenePlanName" :yList="intervenePlanYList" :height="'490px'"
                   :colorListProp="['#4991FD', '#31C529']" key="1"
                   v-else-if="intervenePlanXList.length === 1"/>
        <line-chart :chart-data="intervenePlanYList"
                    :sectionName="intervenePlanName"
                    :sectionXList="intervenePlanXList" v-else/>
      </el-col>
      <el-col :span="9">
        <el-row>
          <el-col class="echartBody">
            <div class="rowTitleParent">
              <p class="rowTitle">{{listQuery.planType === '4' ? '随访计划' : '随访记录'}}
                <span class="top5">TOP5</span></p>
              <el-radio-group
                      v-model="listQuery.planType"
                      @change="choosePlanType"
                      style="margin-right: 20px"
              >
                <el-radio-button label="4">随访计划</el-radio-button>
                <el-radio-button label="5">随访记录</el-radio-button>
              </el-radio-group>
            </div>
            <div class="noDataLine" v-if="intervenePlanPieXList.length === 0" style="height: 215px">
              <img src="@/assets/images/noDataLine.png" style="width: 100px;margin-top: 50px"/>
              <span>暂无数据</span>
            </div>
            <div class="chart-wrapper" style="display: flex" v-else>
              <div class="pieDiv" style="margin:0 3% 0 2%;overflow: hidden">
                <pie-chart :xList="intervenePlanPieXList" :yList="intervenePlanPieYList" />
              </div>
              <div class="pieDiv">
                <div class="pieDivTips" v-for="(item, index) in dianPieList" :key="item.name">
                  <div class="pieDivTipsLeft">
                    <p class="dian" :style="{'background-color': dianColorList[index]}"></p>
                    <p class="dianSize">{{item.name}}</p>
                  </div>
                  <p class="dianNum">{{item.value}}个</p>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row style="margin-top: 20px">
          <el-col class="echartBody">
            <div class="rowTitleParent">
              <p class="rowTitle">服务订单</p>
            </div>
            <div class="noDataLine" v-if="serviceOrderXList.length === 0" style="height: 215px">
              <img src="@/assets/images/noDataLine.png" style="width: 100px;margin-top: 50px"/>
              <span>暂无数据</span>
            </div>
            <div class="chart-wrapper" v-else style="padding-top: 10px; padding-bottom: 30px">
              <bar-chart :xList="serviceOrderXList" :yList="serviceOrderYList" key="2"/>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <!--<el-col :xs="24" :sm="24" :lg="8">
        <p class="rowTitle">服务订单</p>
        <div class="chart-wrapper">
          <bar-chart :xList="serviceOrderXList" :yList="serviceOrderYList" />
        </div>
      </el-col>-->
  <!--    <el-col :xs="24" :sm="24" :lg="8">
        <p class="rowTitle">问卷类型</p>
        <div class="chart-wrapper">
          <pie-chart :xList="intervenePlanPieXList" :yList="intervenePlanPieYList" />
        </div>
      </el-col>-->
      <!--<el-col :xs="24" :sm="24" :lg="8">
        <p class="rowTitle">人员类别</p>
        <div class="chart-wrapper">
          <pie-chart-kong
            :xList="clientTypeXList"
            :yList="clientTypeYList"
            :total="clientTotal"
          />
        </div>
      </el-col>-->
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
const BarChartLine = () => import('./el_modal/bar_chart.vue'); // 为了解决eslint报错，和组件相互干扰的问题

export default {
  name: 'index',
  components: {
    SearchGroup,
    PanelGroup,
    PieChart,
    PieChartKong,
    BarChart,
    BarChartLine, // 折线图的柱形显示
    LineChart,
  },

  data() {
    return {
      searchData: {},
      listQuery: {
        planType: '4',
      },
      homeFindCountData: {},
      serviceOrderXList: [],
      serviceOrderYList: [],
      intervenePlanPieXList: [],
      intervenePlanPieYList: [],
      clientTypeXList: [],
      clientTypeYList: [],
      clientTotal: 0,
      intervenePlanYList: [],
      intervenePlanName: ['随访计划', '随访记录'], // 随访任务折线图
      intervenePlanXList: [],
      dianPieList: [],
      dianColorList: ['#5B8FF9', '#5AD8A6', '#6C6CE5', '#F6BD16', '#E8684A', '#6DC8EC', '#31C529', '#54c9b6', '#F53626', '#f5c8be'],
    };
  },
  methods: {
    getSearchData(data) {
      this.searchData = data;
      this.getHomeFindCount(data); // 查询五数据
      this.getEchartIntervenePlan(data);// 随访任务折线图
      this.getServiceOrderInfo(data); // 服务订单
      this.getEchartIntervenePlanPie(data); // 随访任务饼图
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
        this.$router.push('health_questionnaire');
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
.dashboard-editor-container {
  position: relative;
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
        width: 10px;
        height: 3px;
        display: inline-block;
        margin: 0 8px 0 25px;
      }
      label{
        font-size: 12px;
        font-weight: 400;
        color: #97A6BD;
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
    box-shadow: 0px 0px 50px 0px rgba(151, 166, 189, 0.2);
    border-radius: 15px;
    background-color: white;
    /deep/ .el-radio-button__inner {
      padding: 9px 10px;
    }
    /deep/ .el-radio-button__inner{
      border: 1px solid #4991FD;
      background-color: white;
      font-size: 12px;
    }
    /deep/ .el-radio-button__orig-radio:checked + .el-radio-button__inner{
      background-color: #4991FD;
    }
    /deep/ .el-radio-button:last-child .el-radio-button__inner{
      border-radius: 0 8px 8px 0;
    }
    /deep/ .el-radio-button:first-child .el-radio-button__inner{
      border-radius: 8px 0 0 8px;
    }
  }
  .chart-wrapper {
    background: #fff;
    padding: 5px 20px 20px 20px;
    border-radius: 15px;
    /*margin-bottom: 32px;*/
    /*  p{
      font-size: 15px;
      margin-bottom: 20px;
      border-bottom: 1px solid #EFEFEF;
    }*/
    .pieDiv{
      width: 45%;
      margin-left: 5%;
      height: 170px;
      margin-top: 20px;
      overflow-y: auto;
      .pieDivTips{
        display: flex;
        height: 24px;
        justify-content: space-between;
        align-items: center;
        .pieDivTipsLeft{
          display: flex;
          align-items: center;
          .dian{
            width: 9px;
            height: 9px;
            border-radius: 50px;
            margin-right: 8px;
          }
          .dianSize{
            color: #97A6BD;
            font-size: 12px;
          }
        }
        .dianNum{
          color: #333333;
          font-size: 12px;
        }
      }
    }
  }
}

/*@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}*/
</style>
