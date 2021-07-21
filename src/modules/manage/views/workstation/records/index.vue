<template>
  <div class="records">
    <header class="records-head">
      <span>
        <img src="@/assets/images/common/titleLeft.png" alt="" />
      </span>
      我的工作记录
    </header>
    <section>
      <StationTabs
        :navList="navList"
        :isShowBadge="false"
        @updateList="updateList"
      ></StationTabs>
      <div class="records-table">
        <SystemTracking
          v-show="activeIndex === 0"
          ref="systemTracking"
        ></SystemTracking>
        <ManualTracking
          v-show="activeIndex === 1"
          ref="manualTacking"
        ></ManualTracking>
        <FollowUpPlan
          v-show="activeIndex === 2"
          ref="followUpPlan"
        ></FollowUpPlan>
        <TrankingPlan
          v-show="activeIndex === 3"
          ref="trankingPlan"
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
  name: 'records',
  components: {
    StationTabs,
    SystemTracking,
    ManualTracking,
    TrankingPlan,
    FollowUpPlan,
  },
  data() {
    return {
      navList: [
        { title: '采集系统跟踪' },
        { title: '手动上报跟踪' },
        { title: '跟踪计划' },
        { title: '随访记录' },
      ],
      activeIndex: 0,
      methodsMap: {
        0: () => {
          this.$refs.systemTracking.getSysTrankingRequest();
        },
        1: () => {
          this.$refs.manualTacking.getManualTrackingRequest();
        },
        2: () => {
          this.$refs.followUpPlan.getFollowupPlanRequest();
        },
        3: () => {
          this.$refs.trankingPlan.getTankingRequest();
        },
      },
    };
  },
  methods: {
    updateList(curIndex) {
      this.activeIndex = curIndex;
      this.methodsMap[curIndex]();
    },
  },
};
</script>

<style lang="scss" scoped>
.records {
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
