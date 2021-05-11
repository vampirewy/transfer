<template>
  <el-row
    :gutter="20"
    class="panel-group"
    style="margin: 10px 0 20px 0;display: flex;width: 99%;"
  >
    <el-col class="card-panel-col" style="padding-left: 0">
      <div class="card-panel" @click="toRouterPage(1)">
        <div class="card-panel-icon-wrapper">
          <img class="card-panel-icon" :src="home1" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">客户总数（人）</div>
          <div class="card-panel-number">
            {{ formData.clientInfoCount || 1820 }}
          </div>
        </div>
        <!-- <div class="cardDian"><p></p><p></p></div> -->
      </div>
    </el-col>
    <el-col class="card-panel-col">
      <div class="card-panel" @click="toRouterPage(2)">
        <div class="card-panel-icon-wrapper">
          <img class="card-panel-icon" :src="home2" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">体检总数（人）</div>
          <div class="card-panel-number">
            {{ formData.reportInfoCount || 920 }}
          </div>
        </div>
        <!-- <div class="cardDian"><p></p><p></p></div> -->
      </div>
    </el-col>
    <el-col class="card-panel-col">
      <div class="card-panel" @click="toRouterPage(3)">
        <div class="card-panel-icon-wrapper">
          <img class="card-panel-icon" :src="home3" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">问卷总数（人）</div>
          <div class="card-panel-number">
            {{ formData.questionInfoCount || 450 }}
          </div>
        </div>
        <!-- <div class="cardDian"><p></p><p></p></div> -->
      </div>
    </el-col>
    <el-col class="card-panel-col">
      <div class="card-panel" @click="toRouterPage(4)">
        <div class="card-panel-icon-wrapper">
          <img class="card-panel-icon" :src="home4" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">评估报告总数（人）</div>
          <div class="card-panel-number">
            {{ formData.assessReportCount || 560 }}
          </div>
        </div>
        <!-- <div class="cardDian"><p></p><p></p></div> -->
      </div>
    </el-col>
    <!-- <el-col class="card-panel-col"  style="padding-right: 0">
      <div class="card-panel" @click="toRouterPage(5)">
        <div class="card-panel-icon-wrapper">
          <img class="card-panel-icon" :src="home5" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-number">
            {{ formData.serviceOrderCount || 0 }}<span>个</span>
          </div>
          <div class="card-panel-text">服务订单总数</div>
        </div>
        <div class="cardDian"><p></p><p></p></div>
      </div>
    </el-col> -->
  </el-row>
</template>

<script>
import _home1 from '~/src/assets/images/home/home11.png';
import _home2 from '~/src/assets/images/home/home22.png';
import _home3 from '~/src/assets/images/home/home33.png';
import _home4 from '~/src/assets/images/home/home44.png';
import _home5 from '~/src/assets/images/home/home5.png';

export default {
  props: ['formData'],
  components: {},
  data() {
    return {
      home1: _home1,
      home2: _home2,
      home3: _home3,
      home4: _home4,
      home5: _home5,
    };
  },
  methods: {
    toRouterPage(type) {
      this.$emit('toRouterPage', type);
    },
  },
};
</script>

<style lang="scss" scoped>
.panel-group {
  // background-color: white;
  // padding-top: 20px;

  .card-panel {
    height: 90px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 0px 0px 50px 0px rgba(151, 166, 189, 0.2);
    border-color: rgba(0, 0, 0, 0.05);
    text-align: center;
    display: flex;
    align-items: center;
    border-radius: 15px;
    &:hover{
      box-shadow: 0px 7px 18px 0px rgba(49, 84, 172, 0.35);
      transform: scale(1.1,1.1);
      background: url(../../../../../assets/images/homeHover.png);
      background-repeat: no-repeat;
      background-position: right center;
      // background-size: 25px;
    }
    .card-panel-icon-wrapper {
      // width: 60px;
      margin-left: 20px;
      margin-right: 18px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      width: 40px;
    }
    .card-panel-number {
      font-size: 32px;
      font-weight: bold;
      text-align: left;
      margin: -5px 0 -2px 0;
      span{
        font-size: 16px;
        font-weight: bold;
        display: inline-block;
        margin-left: 8px;
      }
    }
    .card-panel-text {
      line-height: 18px;
      color: #B4BBC9;
      font-size: 12px;
      white-space: nowrap;
    }
    .cardDian{
      position: absolute;
      top: 20px;
      right: 20px;
      line-height: 0;
      p{
        display:inline-block;
        margin-left: 10px;
        width: 6px;
        height: 6px;
        border-radius: 50px;
        background: #EEF1F5;
      }
    }
  }
}
</style>
