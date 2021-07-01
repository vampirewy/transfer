<template>
  <el-dialog
    class="el-plan-setting-mdl"
    :title="modalTitle"
    :visible.sync="show"
    width="900px"
    alignFooter="right"
    :close-on-click-modal="false"
    @close="onVisible"
  >
    <div class="body">
      <div class="activeDiv">
        <div v-for="item in stepList" :key="item.active"
             class="activeOne" :class="{'active': item.active <= active}">
          {{item.name}}</div>
      </div>
      <div class="header">
        <register-open-step1 :form="form" @prevNext="goToActive"
                             v-if="active === 0">
        </register-open-step1>
        <register-open-step2 :form="form" @prevNext="goToActive"
                             @clickInfo="getClickInfo2" v-if="active === 1">
        </register-open-step2>
        <register-open-step3 :form="form" @prevNext="goToActive"
                             @clickInfo="getClickInfo3" v-if="active === 2">
        </register-open-step3>
        <register-open-step4 :form="form" @prevNext="goToActive"
                             @clickInfo="getClickInfo4" v-if="active === 3">
        </register-open-step4>
        <register-open-step5 :form="form" @prevNext="goToActive"
                             @clickInfo="getClickInfo5" v-if="active === 4">
        </register-open-step5>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import registerOpenStep1 from './registerOpenStep1.vue';
import registerOpenStep2 from './registerOpenStep2.vue';
import registerOpenStep3 from './registerOpenStep3.vue';
import registerOpenStep4 from './registerOpenStep4.vue';
import registerOpenStep5 from './registerOpenStep5.vue';
// import avatarImg from '@/assets/images/body/avatar.png';
export default {
  name: 'registerOpen',
  components: {
    registerOpenStep1,
    registerOpenStep2,
    registerOpenStep3,
    registerOpenStep4,
    registerOpenStep5,
  },
  data() {
    return {
      show: true,
      modalTitle: '',
      active: 0,
      propsData: {}, // 父组件传过来的
      form: {
        clientName: '',
        // departmentId: 2, // 选择后的科室
        departmentId: '',
        departmentName: '',
        doctorId: '',
        doctorName: '',
        // avatar: avatarImg,
        // levelName: '主任医师',
        // desc: '毕业于浙江大学医学院，曾赴美国加州大学洛杉矶分校（UCLA）医学中心实习，1995年在浙江大学医学院实习，随后进入上海第六人民医院进修三年，被聘为客座教授',
        // count: 5,
        activeDate: '',
        activeDay: '',
        activeAmPm: '',
      },
      stepList: [
        { name: '基本信息', active: 0 },
        { name: '选择科室', active: 1 },
        { name: '选择医生', active: 2 },
        { name: '医生详情', active: 3 },
        { name: '信息确认', active: 4 },
      ],
    };
  },
  mounted() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      this.$nextTick(async () => {
        this.form = Object.assign(this.form, this.propsData);
        console.log(this.form);
      });
    },
    goToActive(val) {
      this.active = val;
    },
    getClickInfo2(val) { // 得到科室id 科室name
      this.form = Object.assign(this.form, val);
    },
    getClickInfo3(val) {
      this.form = Object.assign(this.form, val);
      if (!val.activeDateDoctor) { // 如果不是点预约的， 是点详情进去的
        this.form.activeDate = '';
        this.form.activeDay = '';
        this.form.activeAmPm = '';
      }
      console.log(this.form);
    },
    getClickInfo4(val) {
      this.form = Object.assign(this.form, val);
      this.form.activeTime = '';
      this.form.activeNum = '';
      console.log(this.form);
    },
    getClickInfo5(val) {
      this.form = Object.assign(this.form, val);
      console.log(this.form);
      // TODO 对接预约接口
      const sendData = {
        clientId: this.form.clientId,
        primaFacie: this.form.primaFacie,
        referralIntro: this.form.referralIntro,
        departmentName: this.form.departmentName,
        departmentId: this.form.departmentId,
        doctorName: this.form.doctorName,
        doctorId: this.form.doctorId,
        appointmentDate: this.form.activeDate,
        appointmentHourStart: this.form.activeTime.split('~')[0],
        appointmentHourEnd: this.form.activeTime.split('~')[1],
      };
      this.$api.InhospitalChange.saveRegistration(sendData).then(() => {
        this.$message.success('操作成功');
        if (this.confirmfunc) {
          this.confirmfunc.call(this, this.form);
        }
        this.cancel();
      });
    },
    onVisible(value) {
      if (!value) {
        this.$jDynamic.hide({ component: 'registerOpen' });
      }
    },
    cancel() {
      this.show = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-plan-setting-mdl {
  /deep/ .el-dialog__body{
    padding: 20px 30px 10px 30px !important;
  }
  .activeDiv{
    display: flex;
    justify-content: center;
    margin: 10px 0;
    .activeOne{
      width: 152px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: #666666;
      font-size: 14px;
      margin-left: -8px;
      background: url("../../../../../assets/images/sunFollow/step.png") no-repeat;
      &.active{
        color: #3154AC;
        background: url("../../../../../assets/images/sunFollow/stepActive.png") no-repeat;
      }
    }
  }
}
</style>
