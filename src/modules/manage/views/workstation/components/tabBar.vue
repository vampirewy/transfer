<template>
  <div class="tab flex">
    <nav
      class="tab-list"
      v-for="(item, index) in navList"
      :key="index"
      style="margin-top:9px"
    >
      <span
        :class="tabActive === index ? 'active' : 'unactive'"
        @click="tabBarBtn(index)"
        >{{ item.title }}
        <div class="badge" v-if="isShowBadge">{{ item.count }}</div>
      </span>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'stationTabs',
  props: {
    navList: Array,
    isShowBadge: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tabActive: 0,
    };
  },
  methods: {
    tabBarBtn(curIdx) {
      this.tabActive = curIdx;
      this.$emit('updateList', curIdx);
    },
  },
};
</script>

<style lang="scss" scoped>
.unactive {
  cursor: pointer;
  background: #eef1f5;
  border-color: transparent;
  color: #666666;
  position: relative;
  margin-right: 30px;
  padding: 10px 14px 10px 16px;
  font-size: 14px;
  border-radius: 8px 5px 0 0;
  &::before {
    content: '';
    display: block;
    width: 10px;
    height: 39px;
    position: absolute;
    -webkit-transform: skewX(165deg);
    transform: skewX(163deg);
    background: #eef1f5;
    border-top-left-radius: 8px;
    top: 0px;
    left: -4px;
    border-bottom: solid 1px #eef1f5;
  }
  &::after {
    content: '';
    display: block;
    width: 25px;
    height: 40px;
    position: absolute;
    -webkit-transform: skewX(23deg);
    transform: skewX(23deg);
    background: #eef1f5;
    border-top-right-radius: 8px;
    top: 0px;
    right: -13px;
  }
}
.active {
  cursor: pointer;
  background: #ffffff;
  border-color: transparent;
  color: #333333;
  font-weight: 500;
  position: relative;
  margin-right: 30px;
  padding: 10px 14px 10px 16px;
  font-size: 14px;
  border-radius: 8px 5px 0 0;
  box-shadow: -10px -10px 25px rgba(14, 37, 87, 0.06);
  &::before {
    content: '';
    display: block;
    width: 10px;
    height: 39px;
    position: absolute;
    -webkit-transform: skewX(165deg);
    transform: skewX(163deg);
    background: #ffffff;
    border-top-left-radius: 8px;
    top: 0px;
    left: -4px;
    border-bottom: solid 1px #ffffff;
  }
  &::after {
    content: '';
    display: block;
    width: 25px;
    height: 40px;
    position: absolute;
    -webkit-transform: skewX(23deg);
    transform: skewX(23deg);
    background: white;
    border-top-right-radius: 8px;
    top: 0px;
    right: -13px;
  }
}
.badge {
  display: inline-block;
  background: #fa912b;
  padding: 3px;
  color: #ffffff;
  width: 14px;
  height: 14px;
  line-height: 14px;
  text-align: center;
  border-radius: 50%;
  margin-left: 5px;
  font-size: 12px;
}
.tab {
  &-list:first-child {
    > span.active {
      &::before {
        -webkit-transform: skewX(0);
        transform: skewX(0);
        top: 0;
        left: 0;
      }
    }
    > span.unactive {
      &::before {
        content: '';
        -webkit-transform: skewX(0);
        transform: skewX(0);
        top: 0;
        left: 0;
      }
    }
  }
}
</style>
