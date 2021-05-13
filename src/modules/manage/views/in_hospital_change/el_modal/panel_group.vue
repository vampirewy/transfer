<template>
  <el-row
    :gutter="20"
    class="panel-group"
    style="margin: 10px 0 20px 0;display: flex;width: 100%;"
  >
    <el-col class="card-panel-col" style="padding-left: 0">
      <div class="card-panel" @click="toRouterPage(1)">
        <div class="card-panel-top">
          <div class="card-panel-description">
            <div class="card-panel-number">
              {{ formData.clientInfoCount || 1820 }}
            </div>
            <div class="card-panel-text">院内转诊总次数（次）</div>
          </div>
          <div class="card-panel-icon-wrapper">
            <span class="percent high">15.9%</span>
            <img class="card-panel-icon" :src="high" />
          </div>
        </div>
        <div class="card-panel-line">
          <line-chart :chart-data="yList1"
                      :sectionName="name1"
                      :sectionXList="xList1"
                      :lineColor="'#3154AC'"/>
        </div>
      </div>
    </el-col>
    <el-col class="card-panel-col">
      <div class="card-panel" @click="toRouterPage(2)">
        <div class="card-panel-top">
          <div class="card-panel-description">
            <div class="card-panel-number">
              {{ formData.reportInfoCount || 1820 }}
            </div>
            <div class="card-panel-text">院内转诊总人次（人）</div>
          </div>
          <div class="card-panel-icon-wrapper">
            <span class="percent high">13.9%</span>
            <img class="card-panel-icon" :src="high" />
          </div>
        </div>
        <div class="card-panel-line">
          <line-chart :chart-data="yList2"
                      :sectionName="name2"
                      :sectionXList="xList2"
                      :lineColor="'#36BF2F'"/>
        </div>
      </div>
    </el-col>
    <el-col class="card-panel-col">
      <div class="card-panel" @click="toRouterPage(3)">
        <div class="card-panel-top">
          <div class="card-panel-description">
            <div class="card-panel-number">
              {{ formData.questionInfoCount || 1820 }}
            </div>
            <div class="card-panel-text">院内转诊总收入（万元）</div>
          </div>
          <div class="card-panel-icon-wrapper">
            <span class="percent low">8.9%</span>
            <img class="card-panel-icon" :src="low" />
          </div>
        </div>
        <div class="card-panel-line">
          <line-chart :chart-data="yList3"
                      :sectionName="name3"
                      :sectionXList="xList3"
                      :lineColor="'#3154AC'"/>
        </div>
      </div>
    </el-col>
    <el-col class="card-panel-col" style="padding-right: 0">
      <div class="card-panel" @click="toRouterPage(4)">
        <div class="card-panel-top">
          <div class="card-panel-description">
            <div class="card-panel-number">
              {{ formData.assessReportCount || 1820 }}
            </div>
            <div class="card-panel-text">检后就医转化率（%）</div>
          </div>
          <div class="card-panel-icon-wrapper">
            <span class="percent high">80.3%</span>
            <img class="card-panel-icon" :src="high" />
          </div>
        </div>
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
import LineChart from './line_chart_group.vue';
export default {
  props: ['formData'],
  components: {
    LineChart,
  },
  data() {
    return {
      home1: _home1,
      home2: _home2,
      home3: _home3,
      home4: _home4,
      home5: _home5,
      low: _low,
      high: _high,
      yList1: [['20', '19', '16', '20', '23', '30', '28', '25', '20', '15', '23', '30', '35', '40', '20']],
      name1: ['次数'],
      xList1: ['04/07', '04/08', '04/09', '04/10', '04/11', '04/12', '04/13', '04/14', '04/15', '04/16', '04/17', '04/18', '04/19', '04/20', '04/21'],
      yList2: [['20', '19', '16', '20', '23', '30', '28', '25', '20', '15', '23', '30', '35', '40', '20']],
      name2: ['人次'],
      xList2: ['04/07', '04/08', '04/09', '04/10', '04/11', '04/12', '04/13', '04/14', '04/15', '04/16', '04/17', '04/18', '04/19', '04/20', '04/21'],
      yList3: [['20', '19', '16', '20', '23', '30', '28', '25', '20', '15', '23', '30', '35', '40', '20']],
      name3: ['收入'],
      xList3: ['04/07', '04/08', '04/09', '04/10', '04/11', '04/12', '04/13', '04/14', '04/15', '04/16', '04/17', '04/18', '04/19', '04/20', '04/21'],
      yList4: [['20', '19', '16', '20', '23', '30', '28', '25', '20', '15', '23', '30', '35', '40', '20']],
      name4: ['转化'],
      xList4: ['04/07', '04/08', '04/09', '04/10', '04/11', '04/12', '04/13', '04/14', '04/15', '04/16', '04/17', '04/18', '04/19', '04/20', '04/21'],
    };
  },
  methods: {
    toRouterPage(type) {
      console.log(type);
      // this.$emit('toRouterPage', type);
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
    box-shadow: 0px 0px 50px 0px rgba(151, 166, 189, 0.2);
    border-color: rgba(0, 0, 0, 0.05);
    text-align: center;
    /*align-items: center;*/
    border-radius: 15px;
    padding: 20px 0 0 0;
    &:hover{
      // box-shadow: 0px 7px 18px 0px rgba(49, 84, 172, 0.35);
      // transform: scale(1.1,1.1);
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
      .card-panel-text {
        line-height: 18px;
        color: #B4BBC9;
        font-size: 12px;
        white-space: nowrap;
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
        }
        img{
          width: 16px;
        }
      }
    }
    .card-panel-line{
      width: 100%;
      margin-top: 3px;
    }
  }
}
</style>
