<template>
  <div class="result">
    <div class="life-style">
      <p class="nameP">
        <img src="@/assets/images/healthPlan/lifestyle1.png"/>饮食：
        <span
        :class="formNew.questionLifestyle1.attention
        ? 'addactive':''"
        >{{formNew.questionLifestyle1.paramValue || '暂无数据'}}</span>
      </p>
      <p class="nameP"><img src="@/assets/images/healthPlan/lifestyle2.png"/>吸烟：
        <span
        :class="formNew.questionLifestyle2.attention
        ? 'addactive':''">{{formNew.questionLifestyle2.paramValue || '暂无数据'}}</span>
      </p>
      <p class="nameP"><img src="@/assets/images/healthPlan/lifestyle3.png"/>饮酒：
        <span
        :class="formNew.questionLifestyle3.attention
        ? 'addactive':''"
        v-if="formNew.questionLifestyle3.paramValue">
          {{formNew.questionLifestyle3.paramValue}}</span>
        <span v-else>暂无数据</span>
      </p>
      <p class="nameP"><img src="@/assets/images/healthPlan/lifestyle4.png"/>精神：
        <span
        :class="formNew.questionLifestyle4.attention
        ? 'addactive':''"
         v-if="formNew.questionLifestyle4.paramValue">
          {{formNew.questionLifestyle4.paramValue}}</span>
        <span v-else>暂无数据</span>
      </p>
      <p class="nameP"><img src="@/assets/images/healthPlan/lifestyle5.png"/>睡眠：
        <span
        :class="formNew.questionLifestyle5.attention
        ? 'addactive':''"
        >{{formNew.questionLifestyle5.paramValue || '暂无数据'}}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'disease',
  props: ['questionLifestyle'],
  data() {
    return {
      formNew: {
        questionLifestyle1: { paramValue: '', attention: '' },
        questionLifestyle2: { paramValue: '', attention: '' },
        questionLifestyle3: { paramValue: '', attention: '' },
        questionLifestyle4: { paramValue: '', attention: '' },
        questionLifestyle5: { paramValue: '', attention: '' },
      },
      assessListData: [],
    };
  },
  watch: {
    questionLifestyle: {
      handler(val) {
        this.formNew = val;
      },
      deep: true, // 为true，表示深度监听，这时候就能监测到a值变化
    },
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
  .result {
    .life-state {
      display: flex;
    }
    .life-style {
      display: flex;
      flex-wrap: wrap;
      .nameP{
        width: 50%;
        font-size: 14px;
        color: #333333;
        margin-bottom: 10px;
        align-items: center;
        display: flex;
        img{
          width: 24px;
          height: 24px;
          margin-right: 10px;
        }
        span{
          &.red{
            color: #FE2B2A;
          }
        }
      }
      .con {
        margin-top: 5px;
        /*p {
          line-height: 30px;
        }*/
      }
    }
  }
  .addactive{
    color: #F33D21;
  }
</style>
