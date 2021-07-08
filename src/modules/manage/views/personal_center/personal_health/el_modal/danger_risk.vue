<template>
  <div>
    <div class="content">
      <div class="content-left">
        <div class="formSearchTitle" style="display:flex;align-items:center;">
          <span class="dianLves"
            ><img src="@/assets/images/common/titleLeft.png" alt="" /></span
          >危险因素
          <div class="content-right"
          style="margin-left:20px;"
          >问卷时间：
                        <el-select
                          v-model="questionId"
                          placeholder="请选择"
                          style="width: 60%"
                        >
                          <el-option
                            :label="item.questionDate"
                            :value="item.id"
                            v-for="(item, index) in timelList"
                            :key="index"
                          ></el-option>
                        </el-select>
        </div>
        </div>
        <dangerous :clientId="questionId"></dangerous>
      </div>
    </div>
  </div>
</template>
<script>
import dangerous from '@/components/user_health/dangerous.vue';
export default {
  name: 'Intervention_tab_userdetail_mdl',
  components: {
    dangerous,
  },
  data() {
    return {
      questionId: '',
      timelList: [],
    };
  },
  mounted() {
    this.getUserHealthDetail(); // 获取危险因素时间
  },
  methods: {
    getUserHealthDetail() {
      this.$api.medicalHistoryInterface.getTimeDetail(this.$route.params.id)
        .then(({ data }) => {
          if (data) {
            this.timelList = data.data;
            this.questionId = this.timelList[0].id;
          }
        });
    },
  },
};
</script>
