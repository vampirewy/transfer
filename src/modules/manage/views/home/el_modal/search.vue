<template>
  <div class="filter-container">
    <!--<el-radio-group
      v-model="listQuery.type"
      @change="runningTabChecked"
      style="margin-right: 13px;vertical-align: top;"
    >
      <el-radio-button label="1">今天</el-radio-button>
      <el-radio-button label="2">近7天</el-radio-button>
      <el-radio-button label="3">近30天</el-radio-button>
    </el-radio-group>-->
      <div class="dateChooseDiv">
          <label :class="{'active': listQuery.type === '1'}"
                 @click="runningTabChecked('1')">今天
            <span v-if="listQuery.type === '1'">一</span>
          </label>
          <label :class="{'active': listQuery.type === '2'}"
                 @click="runningTabChecked('2')">近7天
             <span v-if="listQuery.type === '2'">一</span>
          </label>
          <label :class="{'active': listQuery.type === '3'}"
                 @click="runningTabChecked('3')">近30天
              <span v-if="listQuery.type === '3'">一</span>
          </label>
      </div>
      <div style="display: flex">
            <el-date-picker
              v-model="chooseDateDay"
              type="daterange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              value-format="yyyy-MM-dd"
              @change="chooseDateChange"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
              <el-radio-group v-show="dataRange"
                      v-model="listQuery.searchRange"
                      @change="chooseDearchRange"
                      style="vertical-align: top;"
              >
                  <el-radio-button label="6">我的</el-radio-button>
                  <el-radio-button label="7">平台</el-radio-button>
              </el-radio-group>
      </div>
    <!--<el-button
      class="filter-item"
      type="primary"
      size="small"
      @click="handleSearchData"
    >
      查 询
    </el-button>-->
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    const elThis = this;
    return {
      dataRange: false,
      chooseDateDay: [
        this.formatDate(new Date(new Date().getTime() - (86400000 * 6)), 'yyyy-MM-dd'),
        this.formatDate(new Date(), 'yyyy-MM-dd'),
      ],
      listQuery: {
        type: '2',
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
    if (localStorage.getItem('USER_INFO')) {
      if (JSON.parse(localStorage.getItem('USER_INFO')).dataRange === 0) {
        this.dataRange = true;
      } else {
        this.dataRange = false;
      }
    }
    this.handleSearchData();
  },
  methods: {
    runningTabChecked(tab) {
      this.listQuery.type = tab;
      if (tab === '1') {
        this.chooseDateDay = [
          this.formatDate(new Date(), 'yyyy-MM-dd'),
          this.formatDate(new Date(), 'yyyy-MM-dd'),
        ];
      } else if (tab === '2') {
        this.chooseDateDay = [
          this.formatDate(
            new Date(new Date().getTime() - (86400000 * 6)),
            'yyyy-MM-dd',
          ),
          this.formatDate(new Date(), 'yyyy-MM-dd'),
        ];
      } else if (tab === '3') {
        this.chooseDateDay = [
          this.formatDate(
            new Date(new Date().getTime() - (86400000 * 29)),
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
        data.searchType = this.listQuery.type;
        data.startDate = `${this.chooseDateDay[0].replace(/-/g, '/')} 00:00:00`;
        data.lastDate = `${this.chooseDateDay[1].replace(/-/g, '/')} 23:59:59`;
        data.searchRange = this.listQuery.searchRange;
        this.$emit('searchData', data);
      }
    },
    chooseDateChange() {
      this.listQuery.type = '';
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
        margin-left: 3px;
        display: flex;
        label{
            color: #97A6BD;
            font-size: 14px;
            margin-right: 35px;
            padding-bottom: 4px;
            cursor: pointer;

            &.active{
                color: #333333;
                font-size: 16px;
                font-weight: bold;
                // border-bottom: 2px solid #4991FD;
            }
            span{
                display: block;
                font-weight: bold;
                color: #4991FD;
                height: 10px;
                font-size: 18px;
                line-height: 10px;
            }
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
        .el-input__icon{
            display: none;
        }
    }
}
</style>
