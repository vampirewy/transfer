<template>
  <div class="filter-container">
      <div class="dateChooseDiv">
          <label :class="{'active': listQuery.type === '1'}"
                 @click="runningTabChecked('1')">日
            <!-- <span v-if="listQuery.type === '1'">一</span> -->
          </label>
          <label :class="{'active': listQuery.type === '2'}"
                 @click="runningTabChecked('2')">月
             <!-- <span v-if="listQuery.type === '2'">一</span> -->
          </label>
          <label :class="{'active': listQuery.type === '3'}"
                 @click="runningTabChecked('3')">年
              <!-- <span v-if="listQuery.type === '3'">一</span> -->
          </label>
      </div>
      <div style="display: flex;align-items:center;">
        <p>选择日期范围：</p>
            <el-date-picker
              v-model="chooseDateDay"
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              value-format="yyyy-MM-dd"
              @change="chooseDateChange"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
              <!-- <el-radio-group
                      v-model="listQuery.searchRange"
                      @change="chooseDearchRange"
                      style="vertical-align: top;"
              >
              </el-radio-group> -->
      </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    const elThis = this;
    return {
      chooseDateDay: [
        this.formatDate(new Date(new Date().getTime() - (86400000 * 6)), 'yyyy-MM-dd'),
        this.formatDate(new Date(), 'yyyy-MM-dd'),
      ],
      listQuery: {
        type: '1',
        searchRange: '6',
      },
      pickerOptions: {
        disabledDate(time) {
          if (elThis.chooseDateDay !== null) {
            const chooseDateDayStart = new Date(elThis.chooseDateDay[0]);
            const startyear = chooseDateDayStart.getFullYear() - 1;
            const endYear = chooseDateDayStart.getFullYear() + 1;
            const endDate = `${endYear}-${chooseDateDayStart.getMonth() +
              1}-${chooseDateDayStart.getDate()}`;
            const startDate = `${startyear}-${chooseDateDayStart.getMonth() +
              1}-${chooseDateDayStart.getDate()}`;
            const endDateReturn = new Date(endDate);
            const startDateReturn = new Date(startDate);
            // 即大于开始时间小于结束时间
            return (
              time.getTime() > endDateReturn.getTime() ||
              time.getTime() < startDateReturn.getTime()
            );
          }
        },
        onPick({ minDate }) {
          // 重新设置开始时间
          if (elThis.chooseDateDay !== null) {
            elThis.chooseDateDay[0] = minDate;
          }
        },
      },
    };
  },
  mounted() {
    this.handleSearchData();
  },
  methods: {
    runningTabChecked(tab) {
      this.listQuery.type = tab;
      if (tab === '1') {
        this.chooseDateDay = [
          this.formatDate(
            new Date(new Date().getTime() - (86400000 * 7)),
            'yyyy-MM-dd',
          ),
          this.formatDate(new Date(), 'yyyy-MM-dd'),
        ];
      } else if (tab === '2') {
        this.chooseDateDay = [
          this.formatDate(
            new Date(new Date().getTime() - (86400000 * 29)),
            'yyyy-MM-dd',
          ),
          this.formatDate(new Date(), 'yyyy-MM-dd'),
        ];
      } else if (tab === '3') {
        this.chooseDateDay = [
          this.formatDate(
            new Date(new Date().getTime() - (86400000 * 366)),
            'yyyy-MM-dd',
          ),
          this.formatDate(new Date(), 'yyyy-MM-dd'),
        ];
      }
      this.handleSearchData();
    },
    handleSearchData() {
      if (this.chooseDateDay !== null) {
        const data = {};
        data.dateType = Number(this.listQuery.type);
        data.startTime = `${this.chooseDateDay[0].replace(/-/g, '-')} 00:00:00`;
        data.endTime = `${this.chooseDateDay[1].replace(/-/g, '-')} 23:59:59`;
        // data.searchRange = this.listQuery.searchRange;
        this.$emit('searchData', data);
      }
    },
    chooseDateChange() {
      // this.listQuery.type = '';
      this.handleSearchData();
    },
    chooseDearchRange(tab) {
      this.listQuery.searchRange = tab;
      this.handleSearchData();
    },
    formatDate(date, fmt) {
      let fmtType = fmt;
      if (typeof date === 'string') {
        return date;
      }
      if (!fmtType) {
        fmtType = 'yyyy-MM-dd hh:mm:ss';
      }
      if (!date || date == null) return null;
      const o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        S: date.getMilliseconds(), // 毫秒
      };
      if (/(y+)/.test(fmtType)) {
        fmtType = fmtType.replace(
          RegExp.$1,
          `${date.getFullYear()}`.substr(4 - RegExp.$1.length),
        );
      }
      Object.getOwnPropertyNames(o).forEach((k) => {
        if (new RegExp(`(${k})`).test(fmtType)) {
          fmtType = fmtType.replace(
            RegExp.$1,
            RegExp.$1.length === 1
              ? o[k]
              : `00${o[k]}`.substr(`${o[k]}`.length),
          );
        }
      });
      return fmtType;
    },
  },
};
</script>

<style lang="scss" scoped>
.filter-container {
    background-color: white;
    padding: 0;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .dateChooseDiv{
      width: 150px;
      height: 32px;
        margin-left: 3px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        label{
          width: 33.33333%;
            color: #97A6BD;
            font-size: 12px;
            cursor: pointer;
            text-align: center;
            &.active{
                color: #fff;
                background: #4991FD;
                // border-bottom: 2px solid #4991FD;
            }
            // span{
            //     display: block;
            //     font-weight: bold;
            //     color: #4991FD;
            //     height: 10px;
            //     font-size: 18px;
            //     line-height: 10px;
            // }
        }
        :nth-child(1){
          border-radius: 8px 0px 0px 8px;
          border: 1px solid #4991FD;
        }
        :nth-child(2){
          border-top: 1px solid #4991FD;
          border-bottom: 1px solid #4991FD;
        }
        :nth-child(3){
          border-radius: 0px 8px 8px 0px;
          border: 1px solid #4991FD;
        }
    }
 /* border-bottom: 1px solid #efefef;*/
  .filter-item{
    float: right;
  }
  /deep/ .el-radio-button__inner{
      border: none;
      background-color: #EEF1F5;
      font-size: 14px;
      padding: 11px 31px;
  }
    /deep/ .el-radio-button__orig-radio:checked + .el-radio-button__inner{
        background-color: #4991FD;
        z-index: 1;
        padding: 11px 26px;
    }
    /deep/ .el-radio-button:last-child .el-radio-button__inner{
        border-radius: 8px;
    }
    /deep/ .el-radio-button:first-child .el-radio-button__inner{
        border-radius: 8px;
        margin-right: -12px;
    }
/deep/ .el-input__icon{
  display: none;
}
/deep/ .el-date-editor .el-range-separator{
  font-size: 30px;
}
    /deep/ .el-range-editor{
        &.el-input__inner{
            height: 36px;
            border: none;
        }
        .el-range-input{
            background: #EEF1F5;
            border-radius: 8px;
            height: 36px;
            color: #97A6BD;
            font-size: 14px;
        }
        .el-range-separator{
            line-height: 27px;
            color: #97A6BD;
            padding: 0 10px;
        }
        .el-range__icon{
            font-size: 16px;
            color: #97A6BD;
            margin-right: 3px;
            display: none;
        }
    }
}
</style>
