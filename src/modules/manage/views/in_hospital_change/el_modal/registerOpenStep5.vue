<template>
    <div>
        <div class="wltitle" style="margin-bottom: -10px;">
            <div class="quan"></div>
            <span>信息确认</span>
        </div>
        <el-form :inline="false" :model="form"
                 label-width="85px"
                 ref="form"
                 class="form-inline">
            <el-row>
                <el-col :span="8">
                    <el-form-item label="医生信息：">
                        {{propsForm.doctorName | getResult}}
                        ({{propsForm.doctorLevelName | getResult}})
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="就诊时间：">
                        {{propsForm.activeDate | getResult}}
                         {{propsForm.activeDay}}
                         {{propsForm.activeAmPm === 'am' ? '上午' : '下午'}}
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div class="wltitle">
            <div class="quan"></div>
            <span>就诊人信息</span>
        </div>
        <div class="healthContentDiv">
            <div class="healthContent">
                <div class="healText">
                    {{propsForm.clientName}}
                </div>
                <div class="rightText">身份证号：{{propsForm.mobile}}</div>
                <div class="rightText">手机号码：{{propsForm.cardNo}}</div>
            </div>
        </div>
        <div class="wltitle">
            <div class="quan"></div>
            <span>就诊时间</span>
        </div>
        <div class="timeDiv">
            <div class="timeDivOne" v-for="item in timeNumList" :key="item.num">
                <div class="timeDivOneDateAMPM">
                    <div class="timeDivOneDateAM"
                         @click="chooseDateAmPm(item.time, item.num)"
                         :class="{'active': item.time === activeTime && item.num === activeNum}">
                        {{ item.time }} &nbsp;{{ item.num }}号</div>
                </div>
            </div>
        </div>
        <div class="form-buttons">
            <el-button size="small" class="cancelBtn" @click="next(3)">上一步</el-button>
            <el-button size="small" class="sureBtn" type="primary" @click="toPostNext()"
            >提交
            </el-button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'registerOpenStep5',
  props: ['form'],
  data() {
    return {
      propsForm: this.form,
      timeNumList: [
        {
          time: '13:00~13:30',
          num: '1',
        },
        {
          time: '13:30~14:00',
          num: '2',
        },
        {
          time: '14:00~14:30',
          num: '3',
        },
        {
          time: '14:30~15:00',
          num: '4',
        },
        {
          time: '15:00~15:30',
          num: '5',
        },
        {
          time: '15:30~16:00',
          num: '6',
        },
        {
          time: '16:00~16:30',
          num: '7',
        },
        {
          time: '16:30~17:00',
          num: '8',
        },
        {
          time: '17:00~17:30',
          num: '9',
        },
      ],
      activeTime: '',
      activeNum: '',
    };
  },
  watch: {
    form: {
      handler(val) {
        console.log(val);
        this.propsForm = val;
        this.activeTime = val.activeTime;
        this.activeNum = val.activeNum;
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    chooseDateAmPm(time, num) {
      this.activeTime = time;
      this.activeNum = num;
    },
    next(val) {
      this.$emit('prevNext', val);
    },
    toPostNext() {
      if (!this.activeTime) {
        return this.$message.warning('请选择就诊时间');
      }
      const obj = {
        activeTime: this.activeTime,
        activeNum: this.activeNum,
      };
      // 提交给后端
      this.$emit('clickInfo', obj);
    },
  },
};
</script>

<style lang="scss" scoped>
    /deep/ .el-form-item{
        margin-bottom: 0;
    }
    .wltitle span {
        font-size: 14px;
    }
    .timeDiv{
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        flex-wrap: wrap;
        .timeDivOne{
            width: 150px;
            margin-right: 20px;
            margin-bottom: 10px;
            &:nth-child(5){
                margin-right: 0;
            }
            .timeDivOneDateAMPM{
                text-align: center;
                .timeDivOneDateAM{
                    height: 40px;
                    line-height: 40px;
                    font-size: 14px;
                    color: #333333;
                    cursor: pointer;
                    border: 1px solid #EEF1F5;
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
        padding: 18px 20px;
        background: #F6F8FC;
        border-radius: 8px;
        border: 1px solid #EEF1F5;
        display: inline-block;
        margin-left: 17px;
        .healthContent {
            .healText {
                width: 100%;
                margin: 0 0 18px 0;
                color: #333333;
                font-weight: bold;
                font-size: 16px;
            }
            .rightText {
                color: #333333;
                font-size: 12px;
                line-height: 18px;
            }
        }
    }
</style>
