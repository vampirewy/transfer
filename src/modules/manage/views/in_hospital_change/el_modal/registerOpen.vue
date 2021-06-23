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
        <register-open-step1 :form="form" @prevNext="goToActive" v-show="active === 0">
        </register-open-step1>
        <register-open-step2 @prevNext="goToActive" v-show="active === 1">
        </register-open-step2>
        <register-open-step3 :departmentId="sendform.departmentId"
                             @prevNext="goToActive" v-show="active === 2">
        </register-open-step3>
        <register-open-step4 :doctorForm="doctorForm"
                             @prevNext="goToActive" v-show="active === 3">
        </register-open-step4>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import registerOpenStep1 from './registerOpenStep1.vue';
import registerOpenStep2 from './registerOpenStep2.vue';
import registerOpenStep3 from './registerOpenStep3.vue';
import registerOpenStep4 from './registerOpenStep4.vue';
export default {
  name: 'registerOpen',
  components: {
    registerOpenStep1,
    registerOpenStep2,
    registerOpenStep3,
    registerOpenStep4,
  },
  data() {
    return {
      show: true,
      modalTitle: '',
      active: 0,
      form: {},
      stepList: [
        { name: '基本信息', active: 0 },
        { name: '选择科室', active: 1 },
        { name: '选择医生', active: 2 },
        { name: '医生详情', active: 3 },
        { name: '信息确认', active: 4 },
      ],
      sendform: {
        departmentId: 2, // 选择后的科室
      },
      doctorForm: {}, // 选择后的医生信息
    };
  },
  mounted() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      this.$nextTick(async () => {
        this.form = this.propsData;
      });
    },
    goToActive(val) {
      this.active = val;
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
    padding: 20px 26px 10px 26px !important;
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
