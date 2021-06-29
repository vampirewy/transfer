<template>
<div style="margin:-20px -15px;background: #F5F8FC46;">
<div style="display: flex;">
  <div class="dashboard-editor-container">
    <search-group @searchData="getSearchData" />
    <panel-group :formData="homeFindCountData" @toRouterPage="toRouterPage" />
    <el-row :gutter="40" style="margin-left: 0">
      <el-col :span="15" class="echartBody" style="width:96%;height:300px">
        <div class="rowTitleParent">
          <!-- <p class="rowTitle" style="margin-left: 0">近15天新增客户趋势（人）</p> -->
          <div class="divTitle">
              <span><img src="@/assets/images/common/titleLeft.png" alt=""></span>
            近15天新增客户趋势（人）
          </div>
          <!-- <div class="rowTitleParentRight">
            <span style="background-color: #4991FD"></span>
            <label>随访计划</label>
            <span style="background-color: #31C529"></span>
            <label>随访记录</label>
          </div> -->
        </div>
        <div class="noDataLine" v-if="intervenePlanXList.length === 0">
          <img src="@/assets/images/noDataLine.png"/>
          <span>暂无数据</span>
        </div>
        <!-- <bar-chart-line
        :xList="intervenePlanName" :yList="intervenePlanYList" :height="'300px'"
                   :colorListProp="['#4991FD', '#31C529']" key="1"
                   v-else-if="intervenePlanXList.length === 1"/> -->
        <line-chart :chart-data="intervenePlanYList"
                    :sectionName="intervenePlanName"
                    :sectionXList="intervenePlanXList" v-else/>
      </el-col>
      <!-- <el-col :span="9">
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
      </el-col> -->
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
  <div style="width:24%;margin-top:10px">
      <!-- <el-col :span="9"> -->
        <el-row>
          <el-col class="echartBody">
            <div class="rowTitleParent">
              <!-- <p class="rowTitle">{{listQuery.planType === '4' ? '随访计划' : '随访记录'}}
                <span class="top5">TOP5</span></p> -->
                <!-- <p class="rowTitle">客户类别分布</p> -->
                <div class="divTitle" style="margin-left:20px">
                  <span><img src="@/assets/images/common/titleLeft.png" alt=""></span>
                客户类别分布（%）
              </div>
              <!-- <el-radio-group
                      v-model="listQuery.planType"
                      @change="choosePlanType"
                      style="margin-right: 20px"
              >
                <el-radio-button label="4">随访计划</el-radio-button>
                <el-radio-button label="5">随访记录</el-radio-button>
              </el-radio-group> -->
            </div>
            <div class="noDataLine" v-if="intervenePlanPieXList.length === 0" style="height: 215px">
              <img src="@/assets/images/noDataLine.png" style="width: 200px;margin-top: 100px"/>
              <span>暂无数据</span>
            </div>
            <div class="chart-wrapper" v-else>
              <div class="pieDiv" style="margin:0 3% 0 5%;">
                <pie-chart :xList="intervenePlanPieXList"
                :yList="intervenePlanPieYList"
                :centerText="checkAfterFeeTotal"/>
              </div>
              <!-- <div style="position: relative;">
                <div class="totals">
                  <div class="num">1280</div>
                  <div class="name">客户总数</div>
                </div>
              </div> -->
              <div class="pieDiv" >
                <div class="pieDivTips" v-for="(item, index) in intervenePlanPieYList"
                :key="item.name">
                  <div class="pieDivTipsLeft">
                    <p class="dian" :style="{'background-color': dianColorList[index]}"></p>
                    <!-- <p class="dianSize">{{item.name}}</p> -->
                  </div>
                  <p  class="dianNum">{{item.name}}</p>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
  </div>
</div>
<div style="margin-left:-5px">
  <div class="TabBars">
    <div  :class="Tabactive === 3?'TabBarsNameone':'TabBarsNamesone'"
    @click="TabbarBtn(3)">阳性跟踪</div>
    <div v-for="(item,index) in tabbor" :key="index" style="margin-top:9px">
      <span :class="Tabactive === index?'TabBarsName':'TabBarsNames'" @click="TabbarBtn(index)">
        {{item}}
        <div class="Tabunread">{{dataSource.length}}</div>
      </span>
    </div>
  </div>
  <div class="TabListcss">
    <!-- <tab-list></tab-list> -->
      <el-table style="width: 100%;text-align: center" align="center"
      class="openTable"
               :data="dataSourceList" v-if="Tabactive === 3">
        <el-table-column label="姓名" prop="clientName" max-width="200" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="客户编号" prop="clientNo" max-width="180" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="gender" label="性别" max-width="180px">
          <template slot-scope="scope">
                  {{scope.row.gender === 1 ? '男' : (scope.row.gender === 2 ? '女' : '')}}
                </template>
        </el-table-column>
        <el-table-column label="年龄" prop="age" max-width="180">
        </el-table-column>
        <!-- <el-table-column label="任务名称" prop="itemName" max-width="180" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="任务提示" prop="sectionName" max-width="200">
        </el-table-column> -->
        <template>
          <div slot="empty">
            <p>
              <img src="@/assets/images/noDataLine.png"/>
            </p>
          </div>
        </template>
      </el-table>
      <el-table style="width: 100%;text-align: center" align="center"
      class="openTable"
               :data="dataSource" v-if="Tabactive === 0">
        <el-table-column label="姓名" prop="clientName" max-width="200" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="客户编号" prop="clientNo" max-width="180" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="gender" label="性别" max-width="180px">
          <template slot-scope="scope">
                  {{scope.row.gender === 1 ? '男' : (scope.row.gender === 2 ? '女' : '')}}
                </template>
        </el-table-column>
        <el-table-column label="年龄" prop="age" max-width="180">
        </el-table-column>
        <el-table-column label="任务名称" prop="planTitle" max-width="180" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="任务提示" prop="planContent" max-width="200"
        show-overflow-tooltip>
        </el-table-column>
        <template>
          <div slot="empty">
            <p>
              <img src="@/assets/images/noDataLine.png"/>
            </p>
          </div>
        </template>
      </el-table>
      <div style="text-align: right">
        <el-pagination
          style="margin-top: 15px"
          @current-change="search"
          background
          :total="total"
          :page-size="params.pageSize"
          :current-page="params.pageNo"
          :page-sizes="[15]"
          layout="prev, pager, next, jumper, total, sizes"
        ></el-pagination>
      </div>
  </div>
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
// import TabList from './el_modal/tab-list.vue';
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
    // TabList,
  },

  data() {
    return {
      dataSourceList: [],
      dataSource: [],
      searchData: {},
      listQuery: {
        planType: '4',
      },
      homeFindCountData: {},
      serviceOrderXList: [],
      serviceOrderYList: [],
      intervenePlanPieXList: ['10', '20', '30', '10', '40'],
      checkAfterFeeTotal: '',
      intervenePlanPieYList: [],
      clientTypeXList: [],
      clientTypeYList: [],
      clientTotal: 0,
      intervenePlanYList: [],
      intervenePlanName: ['客户趋势'], // 随访任务折线图
      intervenePlanXList: ['04/07', '04/08', '04/09', '04/10', '04/11', '04/12', '04/13', '04/14', '04/15', '04/16', '04/17', '04/18', '04/19', '04/20', '04/21'],
      dianPieList: [],
      dianColorList: ['#FA912B', '#333333', '#806CE5', '#3154AC', '#36BF2F', '#6DC8EC', '#31C529', '#54c9b6', '#F53626', '#f5c8be'],
      tabbor: ['随访任务'],
      Tabactive: 3,
      total: 0,
      params: {
        pageSize: 10,
        pageNo: 1,
      },
    };
  },
  mounted() {
    this.PositiveClient();
    this.InterveneClient();
  },
  methods: {
    PositiveClient() {
      this.$api.personal.homePositiveClient({
        pageNo: this.params.pageNo,
        pageSize: this.params.pageSize,
      }).then((res) => {
        const { data } = res.data;
        this.dataSourceList = data.data;
        this.total = data.total;
      });
    },
    InterveneClient() {
      this.$api.personal.homeInterveneClient({
        pageNo: this.params.pageNo,
        pageSize: this.params.pageSize,
      }).then((res) => {
        const { data } = res.data;
        this.dataSource = data.data;
        this.total = data.total;
      });
    },
    TabbarBtn(index) {
      this.Tabactive = index;
      this.params.pageNo = 1;
      // if (index === 3) {
      //   this.PositiveClient();
      // }
      // if (index === 0) {
      //   this.InterveneClient();
      // }
      // console.log(index);
    },
    search() {
      this.params.pageNo = 1;
      if (this.Tabactive === 3) {
        this.PositiveClient();
      }
      if (this.Tabactive === 0) {
        this.InterveneClient();
      }
    },
    getSearchData(data) {
      console.log(data, '首页数据');
      this.searchData = data;
      this.getHomeFindCount(data); // 查询五数据
      this.getEchartIntervenePlan(data);// 随访任务折线图
      // this.getServiceOrderInfo(data); // 服务订单
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
        this.$router.push('life_style_questionnaire');
      } else if (type === 4) {
        this.$router.push('estimate_report');
      } else if (type === 5) {
        this.$router.push('service_order');
      }
    },
    // 查询五数据
    getHomeFindCount() {
      // this.$api.personal.homeFindcount(sendData).then((res) => {
      //   this.homeFindCountData = res.data.data;
      // });
      this.$api.personal.homeClientClientCount().then((res) => {
        this.homeFindCountData = res.data.data;
      });
    },
    // 随访任务 折线图
    getEchartIntervenePlan(sendData) {
      const sendDataGet = Object.assign({}, sendData);
      sendDataGet.planType = 4;
      this.intervenePlanXList = [];
      this.intervenePlanYList = [];
      // this.$api.personal.echartIntervenePlan(sendDataGet).then((res) => {
      this.$api.personal.neardayClientCount(sendDataGet).then((res) => {
        const lineIntervenePlanListMap = res.data.data;
        const arr = [];
        lineIntervenePlanListMap.forEach((val) => {
          this.intervenePlanXList.push(val.date.replace('-', '/').split('/')[1].replace('-', '/'));
          arr.push(val.newClientCount);
        });
        this.intervenePlanYList.push(arr);
        // const xListInit = [];
        // const yListInit = [];
        // if (
        //   lineIntervenePlanListMap != null &&
        //   JSON.stringify(lineIntervenePlanListMap) !== '{}'
        // ) {
        //   Object.keys(lineIntervenePlanListMap).forEach((key) => {
        //     xListInit.push(key);
        //     yListInit.push(lineIntervenePlanListMap[key]);
        //   });
        //   this.intervenePlanXList = xListInit;
        //   this.intervenePlanYList.push(yListInit);
        // } else {
        //   this.intervenePlanXList = [];
        //   this.intervenePlanYList = [];
        // }
        // this.getEchartIntervenePlanAll(sendData);
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
      this.$api.personal.homeGridClientCount(sendDataGet).then((res) => {
      // this.$api.personal.echartIntervenePlanPie(sendDataGet).then((res) => {
        const intervenePlanListMap = res.data.data.gridClientCount;
        this.checkAfterFeeTotal = res.data.data.allClientCount;
        intervenePlanListMap.forEach((val) => {
          const json = {
            value: val.clientCount,
            name: val.gridName,
          };
          this.intervenePlanPieYList.push(json);
        });
        // console.log(this.intervenePlanPieYList, '121212');
        // const xListInit = [];
        // const yListInit = [];
        // const dianObjList = [];
        // if (
        //   intervenePlanListMap != null &&
        //   JSON.stringify(intervenePlanListMap) !== '{}'
        // ) {
        //   Object.keys(intervenePlanListMap).forEach((key) => {
        //     xListInit.push(key);
        //     yListInit.push({ name: key, value: intervenePlanListMap[key] });
        //     dianObjList.push({ name: key, value: intervenePlanListMap[key] });
        //   });
        //   this.intervenePlanPieXList = xListInit;
        //   this.intervenePlanPieYList = yListInit;
        //   this.dianPieList = dianObjList;
        // } else {
        //   this.intervenePlanPieXList = [];
        //   this.intervenePlanPieYList = [];
        //   this.dianPieList = [];
        // }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.totals{
  position: absolute;
  margin-top: -95px;
  margin-left: 87px;
  text-align: center;
  .num{
    font-weight: 600;
    color: #333333;
    font-size: 20px;
  }
  .name{
    font-size: 12px;
    color: #999999;
  }
}
.divTitle{
  // margin: 26px 0 0 0px;
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
    /deep/ .el-table .el-table__header-wrapper th .cell{
    text-align: center !important;
    }
  }
  .chart-wrapper {
    background: #fff;
    padding: 5px 20px 20px 20px;
    border-radius: 15px;
    margin-top: 20px;
    /*margin-bottom: 32px;*/
    /*  p{
      font-size: 15px;
      margin-bottom: 20px;
      border-bottom: 1px solid #EFEFEF;
    }*/
    .pieDiv{
      width: 90%;
      margin-left: 15%;
      // height: 170px;
      margin-top: 20px;
      overflow-y: auto;
      overflow: hidden;
      flex-wrap: wrap;
      display: flex;
      .pieDivTips{
        // display: flex;
        height: 24px;
        justify-content: space-between;
        align-items: center;
        width: 50%;
        .pieDivTipsLeft{
          // display: flex;
          align-items: center;
          display: inline-block;
          .dian{
            width: 12px;
            height: 12px;
            // border-radius: 50px;
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
          display: inline-block;
        }
      }
    }
  }
// }
.TabBars{
  display: flex;
  margin-top: 30px;
  // margin-left: 10px;
  .TabBarsNameone{
    cursor: pointer;
    background: #ffffff;
    border-color: transparent;
    color: #333333;
    font-weight: 500;
    position: relative;
    margin-right: 30px;
    padding:11px 18px 9px 24px;
    font-size: 14px;
    border-radius: 8px 5px 0 0;
    // box-shadow: 0px 6px 24px 0px rgba(14, 37, 87, 0.06);
    box-shadow:-10px -10px 25px rgba(14, 37, 87, 0.06);
  }
  .TabBarsNameone:after{
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
  .TabBarsNamesone{
    cursor: pointer;
    background: #EEF1F5;
    border-color: transparent;
    color: #666666;
    position: relative;
    margin-right: 30px;
    padding:11px 18px 9px 24px;
    font-size: 14px;
    border-radius: 8px 5px 0 0;
  }
  .TabBarsNamesone:after{
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
    // box-shadow: 0px 6px 24px 0px rgba(14, 37, 87, 0.06);
    box-shadow:-10px -10px 25px rgba(14, 37, 87, 0.06);
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
  width: 96.5%;
  background: #ffffff;
  box-shadow: 0px 6px 24px 0px rgba(14, 37, 87, 0.06);
  border-radius: 0px 0px 8px 8px;
  padding: 20px;
  // margin-top: 10px;
}
/*@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}*/
</style>
