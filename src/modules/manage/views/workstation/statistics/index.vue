<template>
  <div class="statistics">
    <header class="statistics-head">
      <span>
        <img src="@/assets/images/common/titleLeft.png" alt="" />
      </span>
      我的工作统计
    </header>
    <section>
      <StationSearch
        :changeStyle="'tabs'"
        @fromChildDate="switchType"
      ></StationSearch>
      <div style="height:400px;clear:both;" class="chart" id="chart"></div>
    </section>
  </div>
</template>

<script>
import StationSearch from '../components/search.vue';
import echarts from 'echarts';
import resize from '../../home/el_modal/mixins/resize';
export default {
  name: 'statistics',
  components: { StationSearch },
  mixins: [resize],
  data() {
    return {
      WorkCount: {
        manageCustomerCount: 0,
        firstFollowCount: 0,
        followUpCount: 0,
        phoneCount: 0,
        smsCount: 0,
        inHospitalChangeCount: 0,
      },
    };
  },
  methods: {
    async switchType(query) {
      await this.getWorkStatisticsRequest(query);
    },
    initEchart() {
      const {
        manageCustomerCount,
        firstFollowCount,
        followUpCount,
        phoneCount,
        smsCount,
        inHospitalChangeCount,
      } = this.WorkCount;
      const option = {
        tooltip: {
          show: true,
        },
        xAxis: {
          type: 'category',
          data: [
            '管理客户数',
            '阳性跟踪数',
            '随访执行数',
            '电话工作任务量',
            '短信工作任务量',
            '院内转诊数',
          ],
          axisLine: {
            lineStyle: {
              color: 'rgba(201, 201, 201, .5)',
              type: 'dashed',
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: 'rgba(120, 120, 120, 1)',
            fontSize: 14,
            lineHeight: 30,
          },
        },
        yAxis: {
          type: 'value',
          splitLine: {
            lineStyle: {
              show: true,
              color: 'rgba(201, 201, 201, .5)',
              type: 'dashed',
            },
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
        },
        series: [
          {
            data: [
              manageCustomerCount,
              firstFollowCount,
              followUpCount,
              phoneCount,
              smsCount,
              inHospitalChangeCount,
            ],
            type: 'bar',
            itemStyle: {
              normal: {
                color(params) {
                  const colorlist = [
                    '#5E60EB',
                    '#7FB5FE',
                    '#3DBCE1',
                    '#5E60EB',
                    '#7FB5FE',
                    '#3DBCE1',
                  ];
                  return colorlist[params.dataIndex];
                },
              },
            },
            barWidth: 50,
            label: {
              show: true,
              position: 'top',
            },
          },
        ],
        grid: {
          x: 50,
          y: 50,
          x2: 30,
          y2: 35,
        },
      };
      const dom = document.getElementById('chart');
      this.chart = echarts.init(dom);
      this.chart.setOption(option);
    },
    async getWorkStatisticsRequest(query) {
      const res = await this.$api.personal.getWorkStatistics(query);
      const { data } = res.data;
      this.WorkCount = data;
      this.$nextTick(() => {
        this.initEchart();
      });
    },
  },
  mounted() {
    this.getWorkStatisticsRequest({ startTime: '', endTime: '' });
  },
};
</script>

<style lang="scss" scoped>
.statistics {
  &-head {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin-bottom: 15px;
    > span {
      font-size: 18px;
      margin-right: 10px;
    }
  }
}
/deep/ .el-radio__label {
  color: #333;
}
</style>
