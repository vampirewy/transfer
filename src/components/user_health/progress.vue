<template>
  <div id='app'>
      <vue-circle
        :progress='protant'
        :size='120'
        :reverse='false'
        line-cap='round'
        :fill='fill'
        empty-fill='rgba(0, 0, 0, .1)'
        :animation-start-value='0.0'
        :start-angle='0'
        insert-mode='append'
        :thickness='8'
        :show-percent='false'
        @vue-circle-progress='progress'
        @vue-circle-end='progress_end'>
        <p class="score">{{protant}}</p>
        <p class="scoretitle">{{title}}</p>
      </vue-circle>
  </div>
</template>
<script>
import VueCircle from 'vue2-circle-progress';
export default {
  components: {
    VueCircle,
  },
  props: ['protant', 'color', 'title'],
  data() {
    return {
      fill: { gradient: [this.color] },
    };
  },
  methods: {
    // progress(event, progress, stepValue) {
    //   console.log(stepValue);
    // },
    //   progress_end(event){
    //     console.log('Circle progress end');
    // },
  },
};
</script>
<style lang="less" scoped>
  .score{
    font-size: 22px;
    color: #333;
    font-weight: 600;
  }
  .scoretitle{
    font-size: 12px;
    color: #B4BBC9;
    font-weight: 400;
  }
</style>
