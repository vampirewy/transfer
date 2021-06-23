<template>
    <div>
        <div class="wltitle">
            <div class="quan"></div>
            <span>医生详情</span>
        </div>
        <div class="timeDiv">
            <div class="timeDivOne" v-for="item in dateList" :key="item.date">
                <div class="timeDivOneDate" :class="{'active': item.date === activeDate}">
                    <p class="timeDivOneDate1" :class="{'active': item.date === activeDate}">
                        {{item.date}}</p>
                    <p class="timeDivOneDate2" :class="{'active': item.date === activeDate}">
                        {{item.day}}</p>
                </div>
                <div class="timeDivOneDateAMPM">
                    <div class="timeDivOneDateAM" @click="chooseDateAmPm(item.date, 'am')"
                         :class="{'active': item.date === activeDate && activeAmPm === 'am'}">
                        上午</div>
                    <div class="timeDivOneDatePM" @click="chooseDateAmPm(item.date, 'pm')"
                         :class="{'active': item.date === activeDate && activeAmPm === 'pm'}">
                        下午</div>
                </div>
            </div>
        </div>
        <div class="healthContentDiv" v-for="item in doctorList" :key="item.id">
            <div class="healthContent">
                <div class="healImg">
                    <img :src="item.avatar"/>
                </div>
                <div class="healRight">
                    <div class="healText">
                        <span>{{item.name}}</span>
                        <span class="level">（{{item.levelName}}）</span>
                    </div>
                    <div class="rightText">
                        {{item.desc}}
                    </div>
                </div>
            </div>
            <div class="healthContentRight">
                <div class="reservationNoBtn" v-if="item.count <= 0">约满</div>
                <div class="reservationBtn" v-if="item.count > 0">预约</div>
                <div class="reservationDetailBtn">详情</div>
            </div>
        </div>
        <div class="form-buttons">
            <el-button size="small" class="cancelBtn" @click="next(2)">上一步</el-button>
            <el-button size="small" class="sureBtn" type="primary" @click="next(4)"
            >下一步
            </el-button>
        </div>
    </div>
</template>

<script>
import avatarImg from '@/assets/images/body/avatar.png';
export default {
  name: 'registerOpenStep4',
  props: ['doctorForm'],
  data() {
    return {
      dateList: [
        {
          date: '05-06',
          day: '周四',
        },
        {
          date: '05-07',
          day: '周五',
        },
        {
          date: '05-08',
          day: '周六',
        },
        {
          date: '05-09',
          day: '周日',
        },
        {
          date: '05-10',
          day: '周一',
        },
        {
          date: '05-11',
          day: '周二',
        },
        {
          date: '05-12',
          day: '周三',
        },
      ],
      doctorList: [
        { id: 1,
          name: '吴林',
          avatar: avatarImg,
          levelName: '主任医师',
          desc: '毕业于浙江大学医学院，曾赴美国加州大学洛杉矶分校（UCLA）医学中心实习，现任海现任海现任毕业于浙江大学医学院习，现任海现任海现任',
          count: 5,
        },
        { id: 2,
          name: '谢小任',
          avatar: avatarImg,
          levelName: '副主任医师',
          desc: '毕业于温州医科大学，现任浙江大学附属医院客座讲师',
          count: 0,
        },
      ],
      activeDate: '',
      activeAmPm: '',
    };
  },
  methods: {
    chooseDateAmPm(date, ampm) {
      console.log(date, ampm);
      this.activeDate = date;
      this.activeAmPm = ampm;
    },
    next(val) {
      this.$emit('prevNext', val);
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
            width: 90px;
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
                    &.active{
                        color: white;
                    }
                }
                .timeDivOneDate2{
                    font-size: 12px;
                    color: #666666;
                    margin-top: -3px;
                    &.active{
                        color: white;
                    }
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
                }
            }
        }
    }
    .healthContentDiv {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
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
                    width: 550px;
                    color: #999999;
                    font-size: 12px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }
        .healthContentRight {
            width: 200px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            .reservationBtn {
                width: 70px;
                height: 40px;
                line-height: 40px;
                background: #36BF2F;
                border-radius: 5px;
                color: white;
                text-align: center;
                cursor: pointer;
            }
            .reservationNoBtn {
                width: 70px;
                height: 40px;
                line-height: 40px;
                background: #DDE0E6;
                border-radius: 5px;
                color: #B4BBC9;
                text-align: center;
                cursor: pointer;
            }
            .reservationDetailBtn {
                width: 70px;
                height: 40px;
                line-height: 40px;
                background: #B4BBC9;
                border-radius: 5px;
                color: #333333;
                text-align: center;
                margin-left: 20px;
                cursor: pointer;
            }
        }
    }
</style>
