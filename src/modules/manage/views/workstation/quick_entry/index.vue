<template>
  <div class="entry">
    <header class="entry-head">
      <span>
        <img src="@/assets/images/common/titleLeft.png" alt="" />
      </span>
      快捷入口
    </header>
    <section>
      <ul class="flex align-center space-around">
        <li
          v-for="(item, index) in entryList"
          :key="index"
          class="entry-item"
          @click="$router.push(item.path)"
        >
          <img :src="item.icon" alt="" />
          <p class="f-s-14">{{ item.name }}</p>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import firstFollow from '~/src/assets/images/workstation/first_follow.png';
import inHospitalChange from '~/src/assets/images/workstation/in_hospital_change.png';
import smsPlatForm from '~/src/assets/images/workstation/sms_platform.png';
import createPlan from '~/src/assets/images/workstation/create_plan.png';
import healthMonitor from '~/src/assets/images/workstation/health_monitor.png';
import matchingList from '~/src/assets/images/workstation/matching_list.png';
export default {
  name: 'quickEntry',
  data() {
    return {
      entryList: [
        { icon: firstFollow, name: '阳性追踪', path: 'first_follow' },
        {
          icon: inHospitalChange,
          name: '院内转诊',
          path: 'in_hospital_change',
        },
        {
          icon: smsPlatForm,
          name: '创建短信',
          path: 'health_plan/smsPlatform',
        },
        { icon: createPlan, name: '随访计划', path: 'health_plan/create_plan' },
        { icon: healthMonitor, name: '健康监测', path: 'health_monitor' },
        { icon: matchingList, name: '异常匹配', path: 'matchingList' },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.f-s-14 {
  font-size: 14px;
}
.entry {
  height: 160px;
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
  &-item {
    cursor: pointer;
  }
}
</style>
