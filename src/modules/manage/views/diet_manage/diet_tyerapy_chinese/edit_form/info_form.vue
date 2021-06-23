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
    <div class="titless">查看-中医食疗</div>
    <!-- <div class="title">数据列表</div> -->
    <div class="lookPressure">
      <div><span>食疗名称：</span><span>{{name}}</span></div>
      <div><span>适宜性别：</span>
        <span v-if="gender === 1">男</span>
        <span v-if="gender === 2">女</span>
        <span v-if="gender === 0">不限</span>
      </div>
    </div>
    <div class="lookPressure">
      <span style="white-space: nowrap;margin-left: 30px;font-size: 14px;">适宜体质：</span>
      <div><el-checkbox
              label="平和质"
              v-model="checked1"
            disabled></el-checkbox></div>
      <div><el-checkbox
              label="气虚质"
              v-model="checked2"
            disabled></el-checkbox></div>
      <div><el-checkbox
              label="阳虚质"
              v-model="checked3"
            disabled></el-checkbox></div>
      <div><el-checkbox
              label="阴虚质"
              v-model="checked4"
            disabled></el-checkbox></div>
      <div><el-checkbox
              label="痰湿质"
              v-model="checked4"
            disabled></el-checkbox></div>
    </div>
    <div class="lookPressure" style="margin-left:100px">
      <div><el-checkbox
              label="湿热质"
              v-model="checked5"
            disabled></el-checkbox></div>
      <div><el-checkbox
              label="血瘀质"
              v-model="checked6"
            disabled></el-checkbox></div>
      <div><el-checkbox
              label="气郁质"
              v-model="checked7"
            disabled></el-checkbox></div>
      <div><el-checkbox
              label="特禀质"
              v-model="checked8"
            disabled></el-checkbox></div>
      <div><el-checkbox
              label="不限"
              v-model="checked8"
            disabled></el-checkbox></div>
    </div>
    <!-- <div class="lookPressure">
      <div><span>适宜季节：</span>
      <span v-if="data.suitCrowd === 0">不限</span>
      <span v-if="data.suitCrowd === 1">春</span>
      <span v-if="data.suitCrowd === 2">夏</span>
      <span v-if="data.suitCrowd === 3">秋</span>
      <span v-if="data.suitCrowd === 4">冬</span>
      </div>
      <div></div>
      <div></div>
    </div> -->
     <div class="lookPressure">
      <div style="width:100%;display: flex;">
        <span class="lookPressureTitle" style="width:80px;white-space: nowrap;">食疗原料：</span>
        <span>{{formula}}</span>
      </div>
    </div>
    <div class="lookPressure">
      <div style="width:100%;display: flex;">
        <span class="lookPressureTitle" style="width:80px;white-space: nowrap;">食疗功效：</span>
        <span>{{effect}}</span>
      </div>
    </div>
    <div class="lookPressure">
      <div style="width:100%;display: flex;">
        <span class="lookPressureTitle" style="width:80px;white-space: nowrap;">食疗制法：</span>
        <span>{{makeMethod}}</span>
      </div>
    </div>
    <div class="lookPressure">
      <div style="width:100%;display: flex;">
        <span class="lookPressureTitle" style="width:80px;white-space: nowrap;">食疗用法：</span>
        <span>{{useMethod}}</span>
      </div>
    </div>
    <!-- <div class="lookPressure">
      <div><span>短信内容：</span><span>{{data.themName}}</span></div>
    </div> -->
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
      name: '',
      gender: '',
      formula: '',
      effect: '',
      makeMethod: '',
      useMethod: '',
      tizhiIds: '1,2,3',
      ids: this.$route.params.id,
      checked1: true,
      checked2: false,
      checked3: true,
      checked4: false,
      checked5: true,
      checked6: false,
      checked7: true,
      checked8: false,

    };
  },
  mounted() {
    // this.queryChartData();
    // this.queryPageList();
    // this.$api.projectList.smsListInfo(this.ids).then((res) => {
    //   console.log('sdfsfsdf');
    //   const { data } = res;
    //   this.data = data.data || {};
    //   console.log(this.data, 'zzzzzzzzz');
    // });
    this.$api.dietProgrammeInterface.getDietTreatment(this.ids)
      .then((res) => {
        const { data } = res.data;
        this.name = data.name;
        this.gender = data.gender;
        this.formula = data.formula;
        this.effect = data.effect;
        this.makeMethod = data.makeMethod;
        this.useMethod = data.useMethod;
        this.tizhiIds = data.tizhiIds;
        this.checked1 = data.tizhiIds.includes(1);
        this.checked2 = data.tizhiIds.includes(2);
        this.checked3 = data.tizhiIds.includes(3);
        this.checked4 = data.tizhiIds.includes(4);
        this.checked5 = data.tizhiIds.includes(5);
        this.checked6 = data.tizhiIds.includes(6);
        this.checked7 = data.tizhiIds.includes(7);
        this.checked8 = data.tizhiIds.includes(8);

        console.log(this.checked1, '是否存在');
      });
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
 /deep/ span.el-checkbox__label{
  color: #333333 !important;
}
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
    color: #666666;
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
