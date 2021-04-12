<template>
  <div class="dashboard-editor-container">
    <div class="archives-top">
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
      </div>
      <div style="display: flex;align-items:center;">
        <el-form
          :inline="false"
          :model="form"
          :label-position="right"
          class="form-inline"
        >
          <el-form-item label="单位：" label-width="83px" style="width:25%">
            <template slot="label">&nbsp;单位： </template>
            <el-select
              v-model="sendData.workUnitName"
              placeholder="请选择"
              style="width: 166px"
            >
              <el-option
                :label="it.workUnitName"
                :value="it.workUnitName"
                :key="it.id"
                v-for="it in msg"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-form
          :inline="false"
          :model="form"
          :label-position="right"
          class="form-inline"
        >
          <el-form-item label="性别：" label-width="83px" style="width:25%">
            <template slot="label">&nbsp;性别： </template>
            <el-select
              v-model="sendData.gender"
              placeholder="请选择"
              style="width: 166px"
            >
              <el-option
                :label="it.name"
                :value="it.value"
                :key="it.id"
                v-for="it in genderList"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="btn" @click="chaxun">统计</div>
        <div class="btn again" @click="server">重置</div>
      </div>
    </div>
    <div class="wltable">
      <div class="tabletop">
        <ul>
          <li>建档人</li>
          <li v-for="u in formdata" :key="u.id">{{u.formatDate}}</li>
        </ul>
      </div>
      <div class="table-content">
        <ul v-for="item in datalist" :key="item.id">
          <li>{{item.userName}}</li>
          <li v-for="it in item.clientCountChartDTOList" :key="it.id">{{it.clientCount}}</li>
        </ul>
        <ul class="total">
          <li>合计</li>
          <li v-for="ite in numall" :key="ite.id">{{ite}}</li>
          <li>-</li>
        </ul>
        <ul class="percentage">
          <li>百分比</li>
          <li v-for="ites in pagenumber" :key="ites.id">{{ites}}</li>
          <li>-</li>
          <li>-</li>
        </ul>
      </div>
      <div class="desc">百分比：当前列总数（当前行总数） / 所有数据总和</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  components: {},
  props: {
    msg: [],
  },
  data() {
    const elThis = this;
    return {
      datalist: [],
      namelist: [],
      formdata: [],
      liname: [],
      pagenumber: [],
      numall: [],
      liTotalCount: [], // 动态加入
      chooseDateDay: [
        this.formatDate(new Date(new Date().getTime() - (86400000 * 30)), 'yyyy-MM-dd'),
        this.formatDate(new Date(), 'yyyy-MM-dd'),
      ],
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
              time.getTime() < startDateReturn.getTime() ||
              new Date().getTime() < time.getTime()
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
      sendData: {
        startTime: '',
        endTime: '',
        workUnitName: '',
        gender: '',
      },
      genderList: [
        {
          name: '不限',
          value: 0,
        },
        {
          name: '男',
          value: 1,
        },
        {
          name: '女',
          value: 2,
        },
      ],
      form: {
        gender: '',
      },
    };
  },
  mounted() {
    this.getarchives();
  },
  methods: {
    formatDate(date, fmt) {
      let fmtType = fmt;
      if (typeof date === 'string') {
        return date;
      }
      if (!fmtType) {
        fmtType = 'yyyy-MM hh:mm:ss';
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
    chaxun() {
      this.pagenumber = [];
      this.numall = [];
      if (this.chooseDateDay.length > 0) {
        this.getarchives();
      } else {
        this.$message.warning('请选择时间');
      }
    },
    server() {
      this.sendData.workUnitName = '';
      this.sendData.gender = '';
      this.sendData.startTime = '';
      this.sendData.endTime = '';
      this.chooseDateDay = [];
      // this.getarchives();
    },
    // 查询建档量
    getarchives() {
      if (this.chooseDateDay.length > 0) {
        this.sendData.startTime = this.chooseDateDay[0].substring(0, 7);
        this.sendData.endTime = this.chooseDateDay[1].substring(0, 7);
        const sendDataGet = Object.assign({}, this.sendData);
        this.$api.statics.archivesplan(sendDataGet).then((res) => {
          this.datalist = res.data.data;
          this.formdata = this.datalist[0].clientCountChartDTOList;
          let Countes = 0;
          const fourCount = [];
          for (let i = 0; i < this.datalist[0].clientCountChartDTOList.length; i++) {
            fourCount.push(0);
          }
          this.datalist.forEach((value) => {
            // const count = [];
            value.clientCountChartDTOList.forEach((valList, valIndex) => {
              if (valIndex <= value.clientCountChartDTOList.length - 2) {
                Countes += valList.clientCount;
                fourCount[valIndex] += valList.clientCount;
                this.liTotalCount[valIndex] = Countes;
              }
            });
            this.liname.push(value);
            // this.formdata.push(value);
          });
          fourCount.forEach((val, index) => {
            let numbere = 0;
            if (index < fourCount.length - 2) {
              if (Countes === 0) {
                numbere = 0;
                this.pagenumber.push(numbere.toFixed(2));
              } else {
                numbere = (val / Countes) * 100;
                this.pagenumber.push(numbere.toFixed(2));
              }
            }
            if (index < fourCount.length - 1) {
              this.numall.push(val);
            }
          });
          // this.numall = fourCount;
        });
      }
    },
    chooseDateChange() {
      this.sendData.startTime = this.chooseDateDay[0];
      this.sendData.endTime = this.chooseDateDay[1];
    },
  },
};
</script>
<style lang="scss" scoped>
.dashboard-editor-container {
  .archives-top {
    display: flex;
    align-items: center;
    /deep/ .el-input__icon {
      display: none;
    }
    .el-form-item {
      margin-bottom: 0;
    }
    /deep/ .el-date-editor .el-range-separator {
      font-size: 30px;
    }
    /deep/.form-inline .el-input__inner,
    .el-textarea__inner {
      background-color: #f4f4f6;
      border: 0;
      color: #333333;
    }
    /deep/.form-inline .el-input__icon {
      display: block;
    }
    /deep/ .el-range-editor {
      &.el-input__inner {
        height: 36px;
        border: none;
      }
      .el-range-input {
        background: #eef1f5;
        border-radius: 8px;
        height: 36px;
        color: #97a6bd;
        font-size: 14px;
      }
      .el-range-separator {
        line-height: 27px;
        color: #97a6bd;
        padding: 0 10px;
      }
      .el-range__icon {
        font-size: 16px;
        color: #97a6bd;
        margin-right: 3px;
        display: none;
      }
    }
  }
  .handle-btn {
    text-align: center;
    .reset-btn {
      -webkit-border-radius: 8px;
      -moz-border-radius: 8px;
      border-radius: 8px;
      background: #97a6bd;
      color: #ffffff;
      font-weight: 400;
      padding: 12px 26px;
    }
    .add-btn {
      -webkit-border-radius: 8px;
      -moz-border-radius: 8px;
      border-radius: 8px;
      padding: 12px 25px;
    }
  }
  .form-inline {
    .form-title {
      display: flex;
      align-items: center;
      .line {
        width: 2px;
        height: 18px;
        background: #4991fd;
        margin-right: 8px;
        -webkit-border-radius: 1px;
        -moz-border-radius: 1px;
        border-radius: 1px;
      }
      .name {
        font-size: 18px;
        font-weight: 600;
        color: #333333;
      }
    }
    .compose {
      .el-form-item__content {
        width: 94%;
      }
    }
    .situation {
      .el-form-item__content {
        width: 94%;
      }
    }
  }

  .el-input-group__append {
    padding: 0;
    border: 0;
    cursor: pointer;
    border-radius: 0;
    border-bottom-left-radius: 3px;
    border-top-left-radius: 3px;
    .el-icon-arrow-down {
      margin-left: 0;
    }
    .el-icon-arrow-down::before {
      content: url('../../../../../../assets/images/common/down.png');
    }
    .el-dropdown-link {
      width: 40px;
      height: 40px;
      display: block;
      line-height: 36px;
      text-align: center;
    }
  }
  .btn {
    width: 80px;
    height: 40px;
    background: #4991fd;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    margin-left: 20px;
  }
  .btn:hover{
    cursor:pointer;
  }
  .again{
    background: #97a6bd;
    color: #fff;
  }
  .wltable {
    margin-top: 20px;
    ul{
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 15px;
      border-bottom: 1px solid #f4f4f6;
      li {
          flex: 1;
          min-width: 30px;
          display: flex;
          align-items: center;
          /*justify-content: center;*/
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
        }
    }
    .desc{
      margin: 20px 0;
    }
    .tabletop {
      background: #f4f4f6;
      border-radius: 5px;
    }
    .total{
      background: #ECF4FE;
    }
    .percentage{
      background: #F4F4F6;
    }
  }
}
</style>
