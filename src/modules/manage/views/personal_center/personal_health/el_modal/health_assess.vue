<template>
  <div>
    <div class="content">
      <div class="content-left">
        <div class="formSearchTitle">
          <span class="dianLves"
            ><img src="@/assets/images/common/titleLeft.png" alt="" /></span
          >体检报告
        </div>
        <report :clientId="$route.params.id"></report>
      </div>
    </div>
  </div>
</template>
<script>
import report from '@/components/user_health/report.vue';
export default {
  name: 'Intervention_tab_userdetail_mdl',
  components: {
    report,
  },
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
  },
};
</script>
