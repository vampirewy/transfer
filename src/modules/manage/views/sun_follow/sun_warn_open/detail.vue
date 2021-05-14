<template>
  <el-dialog
    class="sunWarnOpen"
    :title="modalTitle"
    :visible.sync="show"
    width="685px"
    alignFooter="right"
    :close-on-click-modal="false"
    @close="onVisible"
    style="margin-top: 45px"
  >
    <div class="sunWarnTop">
      <img src="@/assets/images/body/sunWarn.png"/>
      <p>· 危急值提醒 ·</p>
    </div>
    <div class="body">
      <div class="header">
        <p class="search-title">客户信息</p>
        <el-form :inline="false" :model="form"
                 label-width="70px"
                 ref="form"
                 class="form-inline">
          <el-row>
            <el-col :span="8">
            <el-form-item label="客户姓名：">
              {{form.name | getResult}}
            </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-form-item label="手机号码：">
              {{form.mobile | getResult}}
            </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户性别：">
                {{form.gender | getResultGender}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="客户年龄：">
                {{form.age | getResult}}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="上报医生：">
                {{form.doctor | getResult}}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="上报科室：">
                {{form.subject | getResult}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="上报备注：" class="desc">
                {{form.desc | getResult}}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <p class="search-title" style="margin-top: 10px;margin-bottom: 15px">危急值</p>
        <div class="warnNameDiv">
          <div class="name" :key="index"
               v-for="(item, index) in form.warnName">
            {{item}}
          </div>
        </div>
      </div>
    </div>
    <div class="bottomiReceive">
      <div class="bottomiReceiveText">窗口已弹出 <span>{{seconds}}</span> 秒</div>
      <div class="iReceive" @click="cancel">我已收到</div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'sunWarnOpen',
  data() {
    return {
      show: true,
      modalTitle: '',
      form: {},
      seconds: 1,
    };
  },
  mounted() {
    this.onLoad();
    setInterval(() => {
      this.seconds++;
    }, 1000);
  },
  methods: {
    onLoad() {
      this.$nextTick(async () => {
        console.log(this.propsData);
        this.form = this.propsData;
      });
    },
    onVisible(value) {
      if (!value) {
        this.$jDynamic.hide({ component: 'sunWarnOpen' });
      }
    },
    cancel() {
      this.show = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.sunWarnOpen {
  .body{
    width: 605px;
    background: #FFFFFF;
    box-shadow: 0px 6px 24px 0px rgba(243, 61, 33, 0.15);
    border-radius: 16px;
    padding: 25px 15px 30px 25px;
    z-index: 1;
    position: relative;
  }
  /deep/ .el-form-item{
    margin-bottom: 2px;
  }
  /deep/ .el-dialog__body{
    padding: 20px 20px 10px 20px !important;
  }
  .desc{
    /deep/ .el-form-item__content{
      line-height: 22px;
      margin-top: 10px;
    }
  }
  .sunWarnTop{
    position: absolute;
    top: -99px;
    left: 0;
    z-index: 0;
    img{
      width: 685px
    }
    p{
      position: absolute;
      top: 41%;
      width: 100%;
      color: white;
      font-size: 24px;
      text-align: center;
    }
  }
  .search-title {
    font-size: 14px;
    font-weight: 600;
    color: #333333;
    line-height: 25px;
    padding-left: 15px;
    margin-bottom: 10px;
    position: relative;
    &:before {
      content: '';
      width: 5px;
      height: 5px;
      border: 1px solid #B4BBC9;
      border-radius: 50px;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .warnNameDiv{
    display: flex;
    flex-wrap: wrap;
    .name{
      font-size: 12px;
      color: #F33D21;
      padding: 5px 20px;
      border-radius: 50px;
      border: 1px solid #F33D21;
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
  .bottomiReceive{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    margin-bottom: -10px;
    padding: 0 0 0 7px;
    .bottomiReceiveText{
      color: #333333;
      font-size: 16px;
      span{
        color: #F33D21;
        font-size: 20px;
      }
    }
    .iReceive{
      width: 160px;
      height: 48px;
      background: linear-gradient(46deg, #FA7045 0%, #F33D21 100%);
      border-radius: 50px;
      font-size: 16px;
      color: white;
      line-height: 47px;
      text-align: center;
      cursor: pointer;
    }
  }
}
</style>
