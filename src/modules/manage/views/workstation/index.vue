<template>
  <div class="station">
    <Info class="station-item__layout"></Info>
    <QuickEntry class="station-item__layout"></QuickEntry>
    <Task
      class="station-item"
      @recordsManualTracking="recordsManualTracking"
    ></Task>
    <Records class="station-item" ref="records"></Records>
    <Statistics class="station-item__layout"></Statistics>
  </div>
</template>

<script>
import Info from './info/index.vue';
import QuickEntry from './quick_entry/index.vue';
import Task from './task/index.vue';
import Records from './records/index.vue';
import Statistics from './statistics/index.vue';
export default {
  name: 'workstation',
  components: { Info, QuickEntry, Task, Records, Statistics },
  data() {
    return {};
  },
  methods: {
    recordsManualTracking({ isRefresh }) {
      const pageNo = 1;
      if (isRefresh === 'recordManualTacking') {
        return this.$refs.records.$refs.manualTacking.getManualTrackingRequest(
          pageNo,
        );
      }
      this.$refs.records.$refs.trankingPlan.getTankingRequest(pageNo);
    },
  },
  mounted() {
    document.querySelector('.main-content-con').style = 'top: 97px';
    document.querySelector('.content-wrapper').style =
      'height: calc(100% - 30px);margin: 0;background: #F6F8FC;padding:10px 20px 20px 19px';
  },
  beforeRouteLeave(to, form, next) {
    document.querySelector('.main-content-con').style = 'top: 116px';
    document.querySelector('.content-wrapper').style =
      'height: calc(100% - 80px);margin: 0 20px 20px 20px;background: #ffffff';
    next();
  },
};
</script>

<style lang="scss" scoped>
.bg-fff {
  background: #fff;
}
.station {
  &-item {
    box-sizing: border-box;
    margin-bottom: 20px;
    font-size: 12px;
    position: relative;
    color: #666;
  }
  &-item__layout {
    box-sizing: border-box;
    margin: 10px 0 20px 0;
    font-size: 12px;
    padding: 20px;
    background: #fff;
    box-shadow: 0px 0px 50px 0px rgba(151, 166, 189, 0.2);
    border-color: rgba(0, 0, 0, 0.05);
    border-radius: 15px;
  }
}
</style>
