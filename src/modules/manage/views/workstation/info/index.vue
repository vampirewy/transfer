<template>
  <div class="info">
    <section class="info-block">
      <p class="info-block__title">
        {{ this.timeDescribe.describe }}好，张医生，祝您开心每一天！
      </p>
      <p class="info-block__content">武汉协和江南医院-医生-张三</p>
    </section>
    <section class="info-block flex align-center">
      <div class="info-block__item">
        <p class="info-block__title">负责客户数</p>
        <p class="info-block__content">{{ userData.clientCount }}</p>
      </div>
      <div class="info-block__item">
        <p class="info-block__title">团队内排名</p>
        <p class="info-block__content">
          {{ userData.teamCount }}/{{ userData.teamOrder }}
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
      this.userData = data;
    },
  },
  mounted() {
    this.getCustomerNumberAndRankRequest();
  },
};
</script>

<style lang="scss" scoped>
.info {
  margin: 10px 0 20px 0;
  padding-left: 20px;
  padding-right: 20px;
  height: 120px;
  font-size: 12px;
  position: relative;
  overflow: hidden;
  color: #666;
  background: #fff;
  box-shadow: 0px 0px 50px 0px rgba(151, 166, 189, 0.2);
  border-color: rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 15px;
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
      font-size: 18px;
    }
  }
}
</style>
