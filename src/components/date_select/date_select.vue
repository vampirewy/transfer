<template>
  <div id="myDate">
    <el-select
      v-model="yearsModel"
      @change="dateChange(1)"
      placeholder="请选择"
      style="width:100px;"
      v-if="showYear"
    >
      <el-option
        v-for="item in years"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-select
      v-model="monthsModel"
      @change="dateChange(2)"
      placeholder="请选择"
      style="width:166px;"
    >
      <el-option
        v-for="item in months"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-select
      v-model="daysModel"
      @change="dateChange(3)"
      placeholder="请选择"
      style="width:166px;margin-left: 11px;"
    >
      <el-option
        v-for="item in days"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'date-select',
  props: {
    showYear: {
      type: Boolean,
      default: true,
    },
    date: null,
  },
  data() {
    return {
      yearsModel: null,
      years: [],
      monthsModel: null,
      months: [],
      daysModel: null,
      days: [],
    };
  },
  watch: {
    date(val) {
      const { year, month, day } = val;
      this.init({ year, month, day });
    },
  },
  created() {
    const date = new Date();
    const year = date.getFullYear(); // 获取当前年
    const month = date.getMonth() + 1; // 获取当前月

    this.yearsModel = year;
    this.initSelectYear(year);
    this.initSelectMonth();
    this.initSelectDay(year, month);
  },
  methods: {
    init({ year, month, day }) {
      this.yearsModel = year;
      this.monthsModel = month;
      this.daysModel = day;
      this.initSelectYear(year);
      this.initSelectMonth();
      this.initSelectDay(year, month);
    },
    initSelectYear(year) {
      this.years = [];
      for (let i = 0; i < 30; i++) {
        this.years.push({ value: year - i, label: `${year - i}年` });
      }
    },
    initSelectMonth() {
      this.months = [];
      this.months.push({ value: '', label: '请选择' });
      for (let i = 1; i <= 12; i++) {
        this.months.push({ value: i, label: `${i}月` });
      }
    },
    initSelectDay(year, month) {
      const maxDay = this.getMaxDay(year, month);
      this.days = [];
      this.days.push({ value: '', label: '请选择' });
      for (let i = 1; i <= maxDay; i++) {
        this.days.push({ value: i, label: `${i}日` });
      }
    },
    dateChange(type) {
      // 1年 2月 3日 4 左 5右
      if (type === 1) {
        this.monthsModel = null;
        this.daysModel = null;
      } else if (type === 2) {
        this.daysModel = null;
      }
      if (type === 1 || type === 2) {
        if (this.monthsModel === 0) {
          this.daysModel = 0;
          this.initSelectDay(this.yearsModel, 1);
        } else {
          this.initSelectDay(this.yearsModel, this.monthsModel);
        }
      }
      if (type === 4) {
        this.dayLeft();
      }
      if (type === 5) {
        this.dayRight();
      }

      // 操作父组件方法
      const obj = {
        year: this.yearsModel,
        month: this.monthsModel,
        day: this.daysModel,
      };
      this.$emit('date-change', obj);
    },
    dayLeft() {
      const tmpYear = this.yearsModel;
      let tmpMonth = this.monthsModel;
      let tmpDay = this.daysModel;
      if (tmpYear == null) {
        const myDate = new Date();
        const year = myDate.getFullYear(); // 获取当前年
        const month = myDate.getMonth() + 1; // 获取当前月
        const day = myDate.getDate(); // 获取当前日
        this.yearsModel = year;
        this.monthsModel = month;
        this.daysModel = day;
        return;
      }
      if (tmpMonth == null) {
        tmpMonth = 0;
      }
      if (tmpDay == null) {
        tmpDay = 0;
      }

      let yearV = tmpYear;
      let monthV = tmpMonth;
      let dayV = tmpDay;

      if (
        (tmpMonth === 0 || tmpMonth === 1) &&
        (tmpDay === 0 || tmpDay === 1)
      ) {
        yearV = tmpYear - 1;
        monthV = 12;
        dayV = this.getMaxDay(tmpYear, tmpMonth);
      }
      if (
        !(tmpMonth === 0 || tmpMonth === 1) &&
        (tmpDay === 0 || tmpDay === 1)
      ) {
        monthV = tmpMonth - 1;
        dayV = this.getMaxDay(tmpYear, tmpMonth);
      }
      if (
        (tmpMonth === 0 || tmpMonth === 1) &&
        !(tmpDay === 0 || tmpDay === 1)
      ) {
        dayV = tmpDay - 1;
      }
      if (
        !(tmpMonth === 0 || tmpMonth === 1) &&
        !(tmpDay === 0 || tmpDay === 1)
      ) {
        dayV = tmpDay - 1;
      }
      this.yearsModel = yearV;
      this.monthsModel = monthV;
      this.daysModel = dayV;
    },
    dayRight() {
      const date = new Date();
      const year = date.getFullYear(); // 获取当前年
      const month = date.getMonth() + 1; // 获取当前月
      const day = date.getDate(); // 获取当前日

      const tmpYear = this.yearsModel;
      let tmpMonth = this.monthsModel;
      let tmpDay = this.daysModel;

      if (tmpYear == null) {
        const myDate = new Date();
        const myYear = myDate.getFullYear(); // 获取当前年
        const myMonth = myDate.getMonth() + 1; // 获取当前月
        const myDay = myDate.getDate(); // 获取当前日
        this.yearsModel = myYear;
        this.monthsModel = myMonth;
        this.daysModel = myDay;
        return;
      }

      if (tmpMonth == null) {
        tmpMonth = 0;
      }
      if (tmpDay == null) {
        tmpDay = 0;
      }
      if (tmpYear > year) {
        this.yearsModel = year;
        this.monthsModel = month;
        this.daysModel = day;
        return;
      }
      if (tmpYear === year) {
        if (
          tmpMonth > month ||
          tmpMonth === 0 ||
          (tmpMonth === month && (tmpDay >= day || tmpDay === 0))
        ) {
          this.yearsModel = year;
          this.monthsModel = month;
          this.daysModel = day;
          return;
        }
      }

      const maxDay = this.getMaxDay(tmpYear, tmpMonth);
      let yearV = tmpYear;
      let monthV = tmpMonth;
      let dayV = tmpDay;

      if (
        (tmpMonth === 0 || tmpMonth === 12) &&
        (tmpDay === 0 || tmpDay === maxDay)
      ) {
        yearV = tmpYear + 1;
        monthV = 1;
        dayV = 1;
      }
      if (
        !(tmpMonth === 0 || tmpMonth === 12) &&
        (tmpDay === 0 || tmpDay === maxDay)
      ) {
        monthV = tmpMonth + 1;
        dayV = 1;
      }
      if (
        !(tmpMonth === 0 || tmpMonth === 12) &&
        !(tmpDay === 0 || tmpDay === maxDay)
      ) {
        dayV = tmpDay + 1;
      }

      this.yearsModel = yearV;
      this.monthsModel = monthV;
      this.daysModel = dayV;
    },
    getMaxDay(year, month) {
      let newYear = year; // 取当前的年份
      let m = month;
      let newMonth = m++; // 取下一个月的第一天，方便计算（最后一天不固定）
      if (month > 12) {
        // 如果当前大于12月，则年份转到下一年
        newMonth -= 12; // 月份减
        newYear++; // 年份增
      }
      const newDate = new Date(newYear, newMonth, 1); // 取当年当月中的第一天
      return new Date(newDate.getTime() - (1000 * 60 * 60 * 24)).getDate(); // 获取当月最后一天日期
    },
  },
};
</script>

<style lang="scss" scoped>
  #myDate{
    display: flex;
  }
  .red {
    color: #f00;
  }
  .colClass{
    width: 82px;
  }
  .form-title {
    color: #262626;
    display: inline-block;
    width: 82px;
    text-align: right;
    margin-left: 11px;
  }
</style>
