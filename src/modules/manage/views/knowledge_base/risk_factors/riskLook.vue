<template>
  <div class="health-monitor-trend">
    <div class="lines"></div>
    <!-- <div class="titless">查看-就医用户信息</div>
    <div class="lookPressure">
      <div><span>姓名：</span><span>{{data.doctorName}}</span></div>
      <div><span>性别：</span><span>{{data.gender}}</span></div>
      <div><span>年龄：</span><span>{{data.age}}</span></div>
      <div><span>客户编号：</span><span>{{data.orgCode}}</span></div>
    </div> -->
    <div class="lines"></div>
    <div class="titless">查看危险因素</div>
    <!-- <div class="title">数据列表</div> -->
    <div class="lookPressure">
      <div>
        <span>危险分类：</span>
        <span v-if="data.riskType === 1">饮食</span>
        <span v-if="data.riskType === 2">运动</span>
        <span v-if="data.riskType === 3">吸烟情况</span>
        <span v-if="data.riskType === 4">饮酒情况</span>
        <span v-if="data.riskType === 5">心理及睡眠</span>
        <span v-if="data.riskType === 6">既往接触史</span>
        <span v-if="data.riskType === 7">家族史</span>
      </div>
      <div><span>危险因素：</span><span>{{data.riskFactor}}</span></div>
      <div><span>排序编号：</span><span>{{data.sortIndex}}</span></div>
      <!-- <div><span>来源：</span><span>{{data.riskFactor}}</span></div>
      <div><span>标题：</span><span>{{data.riskTypeName}}</span></div>
      <div><span>选项：</span><span>{{data.sortIndex}}</span></div> -->
    </div>
    <!-- <div class="lookPressure">
      <div><span>就医科室：</span><span>{{data.department}}</span></div>
      <div><span>主管医生：</span><span>{{data.doctorName}}</span></div>
      <div><span>就医时间：</span><span>{{data.inDate}}</span></div>
      <div><span>出院时间：</span><span>{{data.outDate}}</span></div>
    </div> -->
    <!-- <div class="lookPressure">
      <div><span>危险因素：</span><span>{{data.riskFactor}}</span></div>
      <div><span>排序编号：</span><span>{{data.sortIndex}}</span></div>
      <div></div>
      <div></div>
    </div> -->
    <div class="lookPressure">
      <div><span>建议：</span><span>{{data.advice}}</span></div>
    </div>
    <!-- <div class="lookPressure">
      <div><span>主诉：</span><span>{{data.complaint}}</span></div>
    </div>
    <div class="lookPressure">
      <div><span>检查：</span><span>{{data.examination}}</span></div>
    </div>
    <div class="lookPressure">
      <div><span>诊断：</span><span>{{data.diagnosis}}</span></div>
    </div>
    <div class="lookPressure">
      <div><span>方案：</span><span>{{data.therapy}}</span></div>
    </div> -->
    <div class="buttons">
        <div class="buttonsemit" @click="blacks('close')">返回</div>
      <!-- <el-button plain size="small" @click="$emit('close')">返回</el-button> -->
    </div>
  </div>
</template>

<script>
import * as dayjs from 'dayjs';
export default {
  name: 'BGTrend',
  props: ['id'],
  components: {
  },
  data() {
    return {
      table: {
        list: [],
        total: 0,
        pageNo: 1,
        pageSize: 15,
      },
      xData: [],
      yData: [],
      data: {},
      ids: this.$route.params.id,
    };
  },
  mounted() {
    if (this.ids) {
      this.$api.projectList.riskListInfo(this.ids).then((res) => {
        const { data } = res;
        this.data = data.data;
        console.log(this.data, '撒打算大的');
        // this.form = Object.assign(this.form, data.data || {});
      });
    }
  },
  methods: {
    queryChartData() {
      this.$api.healthMonitorInterface.getBGChart(this.id).then(({ data }) => {
        const xData = [];
        const FPG = []; // 空腹血糖
        const PBG = []; // 餐后血糖
        (data.data['空腹血糖'] || []).forEach((item) => {
          let dateStr;
          if (new Date(item.testDate).getFullYear() === new Date().getFullYear()) {
            dateStr = dayjs(item.testDate).format('MM/DD');
          } else {
            dateStr = dayjs(item.testDate).format('YY/MM/DD');
          }
          xData.push(dateStr);
          FPG.push(item.sugar);
        });
        (data.data['餐后血糖'] || []).forEach((item) => {
          PBG.push(item.sugar);
        });
        this.xData = xData;
        this.yData = [FPG, PBG];
      });
    },
    blacks() {
      this.$router.go(-1);
    },
    queryPageList() {
    //   this.$api.healthMonitorInterface.getBGList({
    //     clientId: this.id,
    //     pageNo: this.table.pageNo,
    //     pageSize: this.table.pageSize,
    //   }).then(({ data }) => {
    //     this.table.total = data.data.total;
    //     this.table.list = data.data.list;
    //   });
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
.buttons{
    text-align: center;
    width: 100%;
    .buttonsemit{
        width: 90px;
        height: 40px;
        line-height: 40px;
        background: rgba(49, 84, 172, 0.1);
        border-radius: 20px;
        border: 1px solid #3154AC;
        background: #3154AC20;
        font-size: 14px;
        color: #3154AC;
        display: inline-block;
    }
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
</style>
