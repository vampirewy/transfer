<template>
  <div>
    <section class="flex align-center" :class="changeStyle === 'radio' ? '' : 'f-r'">
      <div v-if="changeStyle === 'radio'" style="margin-right:30px;">
        <el-radio
          v-model="selectType"
          v-for="(item, index) in dateList"
          :key="index"
          :label="item.value"
          @change="switchType(item.value)"
        >
          {{ item.label }}
        </el-radio>
      </div>
      <div v-if="changeStyle === 'tabs'" style="margin-right:30px;">
        <ul class="flex align-center">
          <li
            class="search-item"
            style="margin-right:20px;font-size:14px;cursor: pointer;"
            v-for="(item, index) in dateList"
            :key="index"
            @click="switchType(item.value)"
            :class="item.value === selectType ? 'active' : 'unactive'"
          >
            {{ item.label }}
          </li>
        </ul>
      </div>
      <div>
        <el-date-picker
          v-model="selectType"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="switchType"
          :clearable="false"
        >
        </el-date-picker>
      </div>
    </section>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  name: 'stationSearch',
  props: {
    changeStyle: {
      type: 'string',
      default: 'radio',
    },
  },
  data() {
    return {
      dateList: [
        { value: 0, label: '全部', startTime: '', endTime: '' },
        {
          value: 1,
          label: '今日',
          startTime: moment(new Date()).format('yyyy-MM-DD'),
          endTime: moment(new Date()).format('yyyy-MM-DD'),
        },
        {
          value: 2,
          label: '本周',
          startTime: moment()
            .locale('zh-cn')
            .startOf('week')
            .format('yyyy-MM-DD'),
          endTime: moment()
            .locale('zh-cn')
            .endOf('week')
            .format('yyyy-MM-DD'),
        },
        {
          value: 3,
          label: '本月',
          startTime: moment()
            .startOf('month')
            .format('yyyy-MM-DD'),
          endTime: moment()
            .endOf('month')
            .format('yyyy-MM-DD'),
        },
      ],
      selectType: 0,
      date: {
        startTime: '',
        endTime: '',
      },
    };
  },
  methods: {
    switchType(curValue) {
      this.selectType = curValue;
      if (curValue instanceof Array) {
        this.date.startTime = moment(curValue[0]).format('yyyy-MM-DD');
        this.date.endTime = moment(curValue[1]).format('yyyy-MM-DD');
      } else {
        const date = this.dateList.find(({ value }) => curValue === value);
        this.date.startTime = date.startTime;
        this.date.endTime = date.endTime;
      }
      this.$emit('fromChildDate', this.date);
    },
  },
  mounted() {
    this.switchType(this.selectType);
  },
};
</script>

<style lang="scss" scoped>
.f-r {
  float: right;
}
.search {
  &-item {
    line-height: 50px;
  }
}
.unactive {
  color: #333;
}
.active {
  font-weight: bold;
  color: #3154ac;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    width: 22px;
    height: 4px;
    background: #3154ac;
    border-radius: 2px;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
