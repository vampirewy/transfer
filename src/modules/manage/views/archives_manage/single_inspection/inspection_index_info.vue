<template>
  <div class="health-monitor-trend">
    <div class="lines"></div>
    <div class="titless">查看就医用户信息</div>
    <div class="lookPressure">
      <div><span>姓名：</span><span>{{data.clientName}}</span></div>
      <div><span>性别：</span><span>{{data.gender}}</span></div>
      <div><span>年龄：</span><span>{{data.age}}</span></div>
      <div><span>客户编号：</span><span>{{data.clientId}}</span></div>
    </div>
    <!-- <div class="lines"></div>
    <div class="titless">就医信息</div> -->
    <!-- <div class="title">数据列表</div> -->
    <div class="lookPressure">
      <div><span>检查编号：</span><span>{{data.inspectionNo}}</span></div>
      <div><span>检查机构：</span><span>{{data.inspectionOrg}}</span></div>
      <div><span>检查时间：</span><span>{{data.inspectionDate}}</span></div>
    </div>
     <div class="lookPressure">
      <div style="width:100%;display: flex;">
        <span class="lookPressureTitle" style="width:80px;white-space: nowrap;">检查描述：</span>
        <span>{{data.intro}}</span>
      </div>
    </div>
    <div class="lines"></div>
    <div class="titless">检查项目</div>
     <el-table class="medicate-list mt20 openTable"
     :data="data.inspectionRecordConfigDtos"
     align="center">
        <el-table-column label="科室" prop="sectionItem" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="项目"
          prop="itemName"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="结果"
          prop="itemValue"
        >
        </el-table-column>
        <el-table-column label="正常参考" prop="itemRef" >
        </el-table-column>
        <el-table-column label="单位" prop="unit" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="建议" prop="advice" >
        </el-table-column>
      </el-table>
    <div class="buttons">
        <div class="buttonsemit" @click="blacks('close')">返回</div>
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
      ids: this.$route.query.id,
    };
  },
  mounted() {
    // this.queryChartData();
    // this.queryPageList();
    // this.$api.medicalHistoryInterface.medicalInfoDetail(this.ids).then((res) => {
    //   console.log('sdfsfsdf');
    //   const { data } = res;
    //   this.data = data.data || {};
    //   console.log(this.data, 'zzzzzzzzz');
    // });
    this.$api.healthMonitorInterface.SinglegetDetail(this.ids).then((res) => {
      const { data } = res;
      this.data = data.data || {};
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
.buttons{
    text-align: center;
    margin-top: 30px;
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
