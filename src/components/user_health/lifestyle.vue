<template>
  <div class="result">
    <div class="life-style">
      <p class="nameP">
        <img src="@/assets/images/healthPlan/lifestyle1.png"/>饮食：
        <span>{{formNew.questionLifestyle1.paramValue || '-'}}</span>
      </p>
      <p class="nameP"><img src="@/assets/images/healthPlan/lifestyle2.png"/>吸烟：
        <span>{{formNew.questionLifestyle2.paramValue || '-'}}</span>
      </p>
      <p class="nameP"><img src="@/assets/images/healthPlan/lifestyle3.png"/>饮酒：
        <span>{{formNew.questionLifestyle3.paramValue || '-'}}</span>
      </p>
      <p class="nameP"><img src="@/assets/images/healthPlan/lifestyle4.png"/>精神：
        <span>{{formNew.questionLifestyle4.paramValue || '-'}}</span>
      </p>
      <p class="nameP"><img src="@/assets/images/healthPlan/lifestyle5.png"/>睡眠：
        <span>{{formNew.questionLifestyle5.paramValue || '-'}}</span>
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
        questionLifestyle1: { paramValue: '' },
        questionLifestyle2: { paramValue: '' },
        questionLifestyle3: { paramValue: '' },
        questionLifestyle4: { paramValue: '' },
        questionLifestyle5: { paramValue: '' },
      },
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
        width: 33%;
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
</style>
