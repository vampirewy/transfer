<template>
  <div class="result">
    <div class="result-top">
      <div v-for="item in topTitle" :key="item.title">
        <div :style="{'background':item.color}"></div>{{item.title}}</div>
    </div>
    <div class="result-content">
      <div v-for="item in topTitle" :key="item.title"
      :style="{'borderColor':item.color, color:item.color}">
        {{item.title}}
      </div>
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
      topTitle: [
        {
          color: '#36BF2F',
          title: '一般',
        },
        {
          color: '#3154AC',
          title: '轻度',
        },
        {
          color: '#806CE5',
          title: '中度',
        },
        {
          color: '#FA912B',
          title: '中重度',
        },
        {
          color: '#F33D21',
          title: '重度',
        },
        {
          color: '#B4BBC9',
          title: '未曾匹配',
        },
      ],
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
    .result-top{
      display: flex;
      height: 32px;
      align-items: center;
      div{
        font-size: 12px;
        color: #333;
        font-weight: 400;
        display: flex;
        align-items: center;
        margin-right: 40px;
        div{
          width: 5px;
          height: 5px;
          border-radius: 3px;
          margin-right: 5px;
        }
      }
    }
    .result-content{
      padding: 25px 20px;
      border-radius: 8px;
      border: 1px solid #DDE0E6;
      display: flex;
      flex-wrap: wrap;
      div{
        padding: 12px;
        border: 1.5px solid;
        border-radius: 25px;
        margin:0 10px 10px 0;
        min-width: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover{
        cursor: pointer;
      }
      }
    }
  }
</style>
