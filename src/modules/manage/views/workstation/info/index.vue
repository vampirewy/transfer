<template>
  <div class="info">
    <section class="info-block">
      <p class="info-block__title">
        {{ this.timeDescribe.describe }}好，{{
          this.userData.realName
        }}，祝您开心每一天！
      </p>
      <p class="info-block__content">
        {{ this.userData.orgName }} - {{ this.userData.role }} - {{
          this.userData.realName
        }}
      </p>
    </section>
    <section class="info-block flex align-center">
      <div class="info-block__item">
        <p class="info-block__title">负责客户数</p>
        <p class="info-block__content">{{ userData.clientCount }}</p>
      </div>
      <div class="info-block__item">
        <p class="info-block__title">团队内排名</p>
        <p class="info-block__content">
          {{ userData.teamOrder }}/{{ userData.teamCount }}
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import moment from 'moment';
import timeText from '~/src/constant/time_text';
export default {
  name: 'info',
  data() {
    return {
      nowTime: moment().format('HH:mm'),
      userData: {
        teamOrder: 0,
        teamCount: 0,
        clientCount: 0,
        orgName: '',
        realName: '',
        role: '',
      },
    };
  },
  computed: {
    timeDescribe() {
      return timeText.find(
        ({ min, max }) => min <= this.nowTime && this.nowTime <= max,
      );
    },
  },
  methods: {
    async getCustomerNumberAndRankRequest() {
      const res = await this.$api.personal.getCustomerNumberAndRank();
      const { data } = res.data;
      this.userData.teamOrder = data.teamOrder;
      this.userData.teamCount = data.teamCount;
      this.userData.clientCount = data.clientCount;
    },
    async getUserInfo() {
      const res = await this.$api.userManagerInterface.getUserInfo();
      const { data } = res.data;
      this.userData.realName = data.realName;
      this.userData.role = data.role;
      this.userData.orgName = data.orgName;
    },
  },
  mounted() {
    this.getCustomerNumberAndRankRequest();
    this.getUserInfo();
  },
};
</script>

<style lang="scss" scoped>
.info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 160px;
  &-block {
    &__item {
      padding: 0 10px;
      text-align: center;
      &:not(:last-child) {
        border-right: 1px solid #dde0e6;
      }
    }
    &__title {
      color: #333;
      font-size: 20px;
      &:first-child {
        margin-bottom: 10px;
      }
    }
    &__content {
      font-size: 16px;
    }
  }
}
</style>
