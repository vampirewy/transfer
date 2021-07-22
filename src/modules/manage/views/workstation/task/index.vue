<template>
  <div class="task">
    <header class="task-head">
      <span>
        <img src="@/assets/images/common/titleLeft.png" alt="" />
      </span>
      今日工作任务
    </header>
    <section>
      <StationTabs
        :navList="navList"
        :isShowBadge="true"
        @updateList="updateList"
      ></StationTabs>
      <div class="task-table">
        <SystemTracking
          v-show="active === 0"
          ref="systemTracking"
        ></SystemTracking>
        <ManualTracking
          @updateTaskCount="getTaskCountRequest"
          v-show="active === 1"
          ref="manualTracking"
        ></ManualTracking>
        <FollowUpPlan v-show="active === 2" ref="followupPlan"></FollowUpPlan>
        <TrankingPlan
          v-show="active === 3"
          ref="trankingPlan"
          @updateTaskCount="getTaskCountRequest"
        ></TrankingPlan>
      </div>
    </section>
  </div>
</template>

<script>
import StationTabs from '../components/tabBar.vue';
import SystemTracking from './systemTracking/index.vue';
import ManualTracking from './manualTracking/index.vue';
import FollowUpPlan from './followUpPlan/index.vue';
import TrankingPlan from './trankingPlan/index.vue';
export default {
  name: 'task',
  components: {
    StationTabs,
    SystemTracking,
    ManualTracking,
    FollowUpPlan,
    TrankingPlan,
  },
  data() {
    return {
      navList: [
        { title: '首次采集系统跟踪', count: 1 },
        { title: '首次手动上报跟踪', count: 4 },
        { title: '待跟踪计划', count: 2 },
        { title: '待随访计划', count: 3 },
      ],
      active: 0,
      methodsMap: {
        0: () => {
          this.$refs.systemTracking.getSysTrankingRequest();
        },
        1: () => {
          this.$refs.manualTracking.getManualTrackingRequest();
        },
        2: () => {
          this.$refs.followupPlan.getFollowupPlanRequest();
        },
        3: () => {
          this.$refs.trankingPlan.getTrankingPlanRequest();
        },
      },
    };
  },
  methods: {
    updateList(curIndex) {
      this.active = curIndex;
      this.methodsMap[curIndex]();
    },
    async getTaskCountRequest() {
      const res = await this.$api.personal.getTaskCount();
      const { data } = res.data;
      this.navList = [
        { title: '首次采集系统跟踪', count: data.firestCollectTrackCount },
        { title: '首次手动上报跟踪', count: data.firestInputTrackCount },
        { title: '待跟踪计划', count: data.trackPlanCount },
        { title: '待随访计划', count: data.visitPlanCount },
      ];
    },
  },
  mounted() {
    this.getTaskCountRequest();
  },
};
</script>

<style lang="scss" scoped>
.task {
  &-head {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin-bottom: 15px;
    padding: 20px 20px 0 20px;
    > span {
      font-size: 18px;
      margin-right: 10px;
    }
  }
  &-table {
    margin-top: 10px;
    border-radius: 0px 0px 8px 8px;
    padding: 20px;
    background: #fff;
  }
}
</style>
