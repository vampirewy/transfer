<template>
    <div>
        <div class="wltitle">
            <div class="quan"></div>
            <span>医生详情</span>
        </div>
        <div class="healthContentDiv">
            <div class="healthContent">
                <div class="healImg">
                    <img :src="propsForm.doctorAvatar"/>
                </div>
                <div class="healRight">
                    <div class="healText">
                        <span>{{propsForm.doctorName}}</span>
                        <span class="level">（{{propsForm.doctorLevelName}}）</span>
                    </div>
                    <div class="rightText">
                        {{propsForm.doctorDesc}}
                    </div>
                </div>
            </div>
        </div>
        <div class="wltitle">
            <div class="quan"></div>
            <span>医生排班</span>
        </div>
        <div class="timeDiv">
            <div class="timeDivOne">
                <div class="timeDivOneDate">
                    <p class="timeDivOneDate1" style="margin-top: 15px;">日期</p>
                </div>
                <div class="timeDivOneDateAMPM">
                    <div class="timeDivOneDateAM">上午</div>
                    <div class="timeDivOneDatePM">下午</div>
                </div>
            </div>
            <div class="timeDivOne" v-for="item in dateList" :key="item.date">
                <div class="timeDivOneDate">
                    <p class="timeDivOneDate1">{{item.date}}</p>
                    <p class="timeDivOneDate2">{{item.day}}</p>
                </div>
                <div class="timeDivOneDateAMPM">
                    <div class="timeDivOneDateAM"
                         @click="chooseDateAmPm(item.date, item.day, 'am', item.amCount)"
                         :class="{'active': item.date === activeDate && activeAmPm === 'am',
                         'haveCount': item.amCount > 0, 'noCount': item.amCount <= 0}">
                        {{ item.amCount > 0 ? '有号' : '无号' }}</div>
                    <div class="timeDivOneDatePM"
                         @click="chooseDateAmPm(item.date, item.day, 'pm', item.pmCount)"
                         :class="{'active': item.date === activeDate && activeAmPm === 'pm',
                         'haveCount': item.pmCount > 0, 'noCount': item.pmCount <= 0}">
                        {{ item.pmCount > 0 ? '有号' : '无号' }}</div>
                </div>
            </div>
        </div>
        <div class="form-buttons">
            <el-button size="small" class="cancelBtn" @click="next(2)">上一步</el-button>
            <el-button size="small" class="sureBtn" type="primary" @click="toChooseTimeNext(4)"
            >下一步
            </el-button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'registerOpenStep4',
  props: ['form'],
  data() {
    return {
      propsForm: this.form,
      dateList: [
        {
          date: '05-06',
          day: '周四',
          amCount: 4,
          pmCount: 0,
        },
        {
          date: '05-07',
          day: '周五',
          amCount: 0,
          pmCount: 4,
        },
        {
          date: '05-08',
          day: '周六',
          amCount: 4,
          pmCount: 1,
        },
        {
          date: '05-09',
          day: '周日',
          amCount: 4,
          pmCount: 4,
        },
        {
          date: '05-10',
          day: '周一',
          amCount: 14,
          pmCount: 0,
        },
        {
          date: '05-11',
          day: '周二',
          amCount: 0,
          pmCount: 0,
        },
        {
          date: '05-12',
          day: '周三',
          amCount: 0,
          pmCount: 2,
        },
      ],
      activeDate: '',
      activeDay: '',
      activeAmPm: '',
    };
  },
  watch: {
    form: {
      handler(val) {
        console.log(val);
        this.propsForm = val;
        this.activeDate = val.activeDate;
        this.activeDay = val.activeDay;
        this.activeAmPm = val.activeAmPm;
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    chooseDateAmPm(date, day, ampm, count) {
      console.log(date, ampm);
      if (count > 0) { // 有号才给选择
        this.activeDate = date;
        this.activeDay = day;
        this.activeAmPm = ampm;
      }
    },
    next(val) {
      this.$emit('prevNext', val);
    },
    toChooseTimeNext(val) {
      if (!this.activeDate || !this.activeAmPm) {
        return this.$message.warning('请选择排班');
      }
      // 传时间 - 上午下午 入父组件
      const obj = {
        activeDate: this.activeDate,
        activeDay: this.activeDay,
        activeAmPm: this.activeAmPm,
      };
      this.$emit('clickInfo', obj);
      this.next(val);
    },
  },
};
</script>

<style lang="scss" scoped>
    .wltitle span {
        font-size: 14px;
    }
    .timeDiv{
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        margin-top: -5px;
        justify-content: space-between;
        .timeDivOne{
            width: 105px;
            .timeDivOneDate{
                height: 48px;
                background: #F6F8FC;
                text-align: center;
                overflow: hidden;
                &.active{
                    background: #3154AC;
                }
                .timeDivOneDate1{
                    font-size: 14px;
                    color: #333333;
                    margin-top: 7px;
                }
                .timeDivOneDate2{
                    font-size: 12px;
                    color: #666666;
                    margin-top: -3px;
                }
            }
            .timeDivOneDateAMPM{
                border: 1px solid #EEF1F5;
                text-align: center;
                .timeDivOneDateAM{
                    height: 40px;
                    line-height: 40px;
                    font-size: 14px;
                    color: #333333;
                    cursor: pointer;
                    border-bottom: 1px solid #EEF1F5;
                    &.active{
                        color: #3154AC;
                        background: url("../../../../../assets/images/sunFollow/chooseIcon.png");
                        background-repeat: no-repeat;
                        background-position: 100% 100%;
                        background-color: #eaedf6;
                    }
                    &.haveCount{
                        color: #36BF2F;
                    }
                    &.noCount{
                        color: #999999;
                    }
                }
                .timeDivOneDatePM{
                    height: 40px;
                    line-height: 40px;
                    font-size: 14px;
                    color: #333333;
                    cursor: pointer;
                    border-top: none;
                    &.active{
                        color: #3154AC;
                        background: url("../../../../../assets/images/sunFollow/chooseIcon.png");
                        background-repeat: no-repeat;
                        background-position: 100% 100%;
                        background-color: #eaedf6;
                    }
                    &.haveCount{
                        color: #36BF2F;

                    }
                    &.noCount{
                        color: #999999;
                    }
                }
            }
        }
    }
    .healthContentDiv {
        display: flex;
        justify-content: space-between;
        height: 48px;
        background: #F6F8FC;
        padding: 20px;
        .healthContent {
            flex: 1;
            align-items: center;
            display: flex;
            .healImg {
                width: 58px;
                img {
                    width: 48px;
                    height: 48px;
                    border-radius: 50px;
                }
            }
            .healRight {
                flex: 1;
                /*display: flex;
                align-items: center;
                justify-content: space-between;*/
                .healText {
                    /*overflow: hidden;
                    white-space: nowrap;*/
                    display: flex;
                    width: 100%;
                    align-items: center;
                    margin: -2px 0 0px 0;
                    span {
                        padding-top: 4px;
                        font-size: 14px;
                        color: #333333;
                    }
                    .level {
                        font-size: 12px;
                    }
                }
                .rightText {
                    color: #999999;
                    font-size: 12px;
                    line-height: 18px;
                }
            }
        }
    }
</style>
