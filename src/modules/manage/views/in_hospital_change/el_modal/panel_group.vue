<template>
  <el-row
    :gutter="20"
    class="panel-group"
    style="margin: 0 0 20px 0;display: flex;width: 100%;"
  >
    <el-col class="card-panel-col" style="padding-left: 0">
      <div class="card-panel">
        <div class="card-panel-top">
          <div class="card-panel-description">
            <div class="card-panel-number">
              {{ formData1.count }}
            </div>
          </div>
          <div class="card-panel-icon-wrapper">
            <span class="percent" :class="setClass(formData1.percentageType)">
              {{formData1.percentageNumber}}
            </span>
            <img class="card-panel-icon" :src="setImg(formData1.percentageType)" />
          </div>
        </div>
        <div class="card-panel-text">院内转诊总次数（次）</div>
        <div class="card-panel-line">
          <line-chart :chart-data="yList1"
                      :sectionName="name1"
                      :sectionXList="xList1"
                      :lineColor="'#3154AC'"/>
        </div>
      </div>
    </el-col>
    <el-col class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-top">
          <div class="card-panel-description">
            <div class="card-panel-number">
              {{ formData2.count }}
            </div>
          </div>
          <div class="card-panel-icon-wrapper">
            <span class="percent" :class="setClass(formData2.percentageType)">
              {{formData2.percentageNumber}}
            </span>
            <img class="card-panel-icon" :src="setImg(formData2.percentageType)" />
          </div>
        </div>
        <div class="card-panel-text">院内转诊总人次（人）</div>
        <div class="card-panel-line">
          <line-chart :chart-data="yList2"
                      :sectionName="name2"
                      :sectionXList="xList2"
                      :lineColor="'#36BF2F'"/>
        </div>
      </div>
    </el-col>
    <el-col class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-top">
          <div class="card-panel-description">
            <div class="card-panel-number">
              {{ formData3.count }}
            </div>
          </div>
          <div class="card-panel-icon-wrapper">
            <span class="percent" :class="setClass(formData3.percentageType)">
              {{formData3.percentageNumber}}
            </span>
            <img class="card-panel-icon" :src="setImg(formData3.percentageType)" />
          </div>
        </div>
        <div class="card-panel-text">院内转诊总收入（万元）</div>
        <div class="card-panel-line">
          <line-chart :chart-data="yList3"
                      :sectionName="name3"
                      :sectionXList="xList3"
                      :lineColor="'#3154AC'"/>
        </div>
      </div>
    </el-col>
    <el-col class="card-panel-col" style="padding-right: 0">
      <div class="card-panel">
        <div class="card-panel-top">
          <div class="card-panel-description">
            <div class="card-panel-number">
              {{ formData4.count }}
            </div>
          </div>
          <div class="card-panel-icon-wrapper">
            <span class="percent" :class="setClass(formData4.percentageType)">
              {{formData4.percentageNumber}}
            </span>
            <img class="card-panel-icon" :src="setImg(formData4.percentageType)" />
          </div>
        </div>
        <div class="card-panel-text">检后就医转化率（%）</div>
        <div class="card-panel-line">
          <line-chart :chart-data="yList4"
                      :sectionName="name4"
                      :sectionXList="xList4"
                      :lineColor="'#36BF2F'"/>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import _home1 from '~/src/assets/images/home/home11.png';
import _home2 from '~/src/assets/images/home/home22.png';
import _home3 from '~/src/assets/images/home/home33.png';
import _home4 from '~/src/assets/images/home/home44.png';
import _home5 from '~/src/assets/images/home/home5.png';
import _low from '~/src/assets/images/home/low.png';
import _high from '~/src/assets/images/home/high.png';
import _center from '~/src/assets/images/home/center.png';
import LineChart from './line_chart_group.vue';
export default {
  components: {
    LineChart,
  },
  data() {
    return {
      formData1: {},
      formData2: {},
      formData3: {},
      formData4: {},
      home1: _home1,
      home2: _home2,
      home3: _home3,
      home4: _home4,
      home5: _home5,
      low: _low,
      high: _high,
      center: _center,
      name1: ['次数'],
      xList1: [],
      yList1: [],
      name2: ['人次'],
      xList2: [],
      yList2: [],
      name3: ['收入'],
      xList3: [],
      yList3: [],
      name4: ['转化'],
      xList4: [],
      yList4: [],
    };
  },
  mounted() {
    this.getY1();
    this.getY2();
    this.getY3();
    this.getY4();
  },
  methods: {
    setClass(type) {
      return type === 2 ? 'low' : type === 1 ? 'high' : type === 3 ? 'center' : '';
    },
    setImg(type) {
      return type === 2 ? this.low : type === 1 ? this.high : type === 3 ? this.center : '';
    },
    // 院内转诊总次数
    getY1() {
      const sendDataGet = Object.assign({}, { chartType: 1 });
      this.xList1 = [];
      this.yList1 = [];
      this.$api.InhospitalChange.getRegistrationStatistics(sendDataGet).then((res) => {
        const { data } = res.data;
        this.formData1.count = data.count;
        this.formData1.percentageNumber = data.percentageNumber;
        this.formData1.percentageType = data.percentageType;
        const yList = [];
        data.chartList.forEach((val) => {
          this.xList1.push(val.dayDate);
          yList.push(val.dayCount);
        });
        this.yList1.push(yList);
      });
    },
    //
    getY2() {
      const sendDataGet = Object.assign({}, { chartType: 2 });
      this.xList2 = [];
      this.yList2 = [];
      this.$api.InhospitalChange.getRegistrationStatistics(sendDataGet).then((res) => {
        const { data } = res.data;
        this.formData2.count = data.count;
        this.formData2.percentageNumber = data.percentageNumber;
        this.formData2.percentageType = data.percentageType;
        const yList = [];
        data.chartList.forEach((val) => {
          this.xList2.push(val.dayDate);
          yList.push(val.dayCount);
        });
        this.yList2.push(yList);
      });
    },
    //
    getY3() {
      const sendDataGet = Object.assign({}, { chartType: 3 });
      this.xList3 = [];
      this.yList3 = [];
      this.$api.InhospitalChange.getRegistrationStatistics(sendDataGet).then((res) => {
        const { data } = res.data;
        this.formData3.count = data.count;
        this.formData3.percentageNumber = data.percentageNumber;
        this.formData3.percentageType = data.percentageType;
        const yList = [];
        data.chartList.forEach((val) => {
          this.xList3.push(val.dayDate);
          yList.push(val.dayCount);
        });
        this.yList3.push(yList);
      });
    },
    //
    getY4() {
      const sendDataGet = Object.assign({}, { chartType: 4 });
      this.xList4 = [];
      this.yList4 = [];
      this.$api.InhospitalChange.getRegistrationStatistics(sendDataGet).then((res) => {
        const { data } = res.data;
        this.formData4.count = data.count;
        this.formData4.percentageNumber = data.percentageNumber;
        this.formData4.percentageType = data.percentageType;
        const yList = [];
        data.chartList.forEach((val) => {
          this.xList4.push(val.dayDate);
          yList.push(val.dayCount);
        });
        this.yList4.push(yList);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.panel-group {
  // background-color: white;
  // padding-top: 20px;
  .card-panel {
    height: 130px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 0px 4px 24px 0px rgba(36, 73, 157, 0.06);
    // border-color: rgba(0, 0, 0, 0.05);
    text-align: center;
    /*align-items: center;*/
    border-radius: 12px;
    padding: 20px 0 0 0;
    &:hover{
      // box-shadow: 0px 7px 18px 0px rgba(49, 84, 172, 0.35);
      transform: scale(1.1,1.1);
     /* background: url(../../../../../assets/images/homeHover.png);
      background-repeat: no-repeat;
      background-position: right center;*/
      // background-size: 25px;
    }
    .card-panel-top{
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      .card-panel-icon {
        width: 40px;
      }
      .card-panel-number {
        font-size: 28px;
        font-weight: bold;
        text-align: left;
        margin: -5px 0 -2px 0;
        color: #333333;
        span{
          font-size: 16px;
          font-weight: bold;
          display: inline-block;
          margin-left: 8px;
        }
      }
      .card-panel-icon-wrapper {
        // width: 60px;
        /*margin-left: 20px;
        margin-right: 18px;*/
        transition: all 0.38s ease-out;
        border-radius: 6px;
        .percent{
          font-size: 12px;
          vertical-align: top;
          &.low{
            color: #F33D21;
          }
          &.high{
            color: #36BF2F;
          }
          &.center{
            color: #B4BBC9;
          }
        }
        img{
          width: 16px;
        }
      }
    }
    .card-panel-text {
      line-height: 18px;
      color: #B4BBC9;
      font-size: 12px;
      white-space: nowrap;
      text-align: left;
      padding-left: 20px;
    }
    .card-panel-line{
      width: 100%;
      margin-top: 3px;
    }
  }
}
</style>
