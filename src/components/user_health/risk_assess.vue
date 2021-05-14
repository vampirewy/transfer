<template>
  <div class="result">
    <div class="risk-assess">
      <div class="assessTitle">很高风险</div>
      <div class="assessContent">
        <!-- <p class="assessContentOne level1" v-for="item in assessListData.assess5" :key="item">
          {{item}}
        </p> -->
        <p class="assessContentOne level1" v-for="item in 1" :key="item">
             高血压
        </p>
      </div>
    </div>
    <div class="risk-assess">
      <div class="assessTitle">高风险</div>
      <div class="assessContent">
        <p class="assessContentOne level2" v-for="item in 3" :key="item">
          高血压
        </p>
      </div>
    </div>
    <div class="risk-assess">
      <div class="assessTitle">中度风险</div>
      <div class="assessContent">
        <p class="assessContentOne level3" v-for="item in 4"
           :key="item">
          高血压
        </p>
      </div>
    </div>
    <div class="risk-assess">
      <div class="assessTitle">低风险</div>
      <div class="assessContent">
        <p class="assessContentOne level4"  v-for="(item, index) in 2"
           :key="index">
          高血压
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'disease',
  props: ['assessList'],
  data() {
    return {
      assessListData: {},
    };
  },
  watch: {
    assessList: {
      handler(val) {
        console.log(val);
        this.assessListData = val;
        this.$set(this.assessListData, 'assess2', val.assess2);
      },
      immediate: true,
      deep: true, // 为true，表示深度监听，这时候就能监测到a值变化
    },
  },
};
</script>

<style lang="scss" scoped>
  .result {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .risk-assess {
      width: 47%;
      /*display: flex;
      flex-wrap: wrap;*/
      margin-bottom: 20px;
      border-radius: 10px;
      border: 1px solid #f4f4f6;
      min-height: 120px;
      height: auto;
      display: flex;
      .assessTitle{
        align-items: center;
        display: flex;
        width: 22px;
        padding: 0 10px 0 18px;
        height: 100%;
        background-color: #DDE0E6;
        font-size: 14px;
        color: #333333;
        word-wrap: break-word;
        letter-spacing: 10px;
        font-weight: 600;
        border-radius: 10px 0 0 10px;
      }
      .assessContent{
        background-color: white;
        border-radius: 10px;
        margin-left: -5px;
        padding: 15px 5px 5px 15px;
        flex: 1;
        .assessContentOne{
          display: inline-block;
          text-align: center;
          height: 40px;
          font-size: 12px;
          color: #333333;
          line-height: 40px;
          min-width: 60px;
          padding: 0 10px;
          margin-bottom: 10px;
          margin-right: 5px;
          border-radius: 20px;
          &.level1{
            color: #F33D21;
            border: 1px solid #F33D21;
          }
          &.level2{
            color: #FA912B;
            border: 1px solid #FA912B;
          }
          &.level3{
            color: #806CE5;
            border: 1px solid #806CE5;
          }
          &.level4{
            color: #36BF2F;
            border: 1px solid #36BF2F;
          }
        }
      }
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
