<template>
  <div>
  <!-- <client-info v-if="showTopLeft"></client-info> -->
  <div class="health_questionnaire_edit">
    <div class="intvTmpl_left" id="intvTmpl_left"
         :class="{ 'isFixed': searchBarFixed === true }"
         v-if="showTopLeft"
         style="max-height: 30000px;height: auto;">
         <div class="headimage">
           <div class="userimg">
             <img src="@/assets/images/common/user.png" alt="">
             <div class="userImg"><img src="@/assets/images/common/usernews.png" alt=""></div>
           </div>
           <div class="username">轻那个风</div>
           <div class="usertype">高级会员</div>
         </div>
      <!-- <div class="intvTmpl_left_title">个人管理中心</div> -->
      <ul class="intv_menulist">
        <li :class="{'active':active === index}" @click="clickMenu(index, '#questions-' + index)"
            v-for="(item, index) in templateList" :key="index">
          {{item.name}}
        </li>
      </ul>
    </div>
    <div class="health_questionnaire_form" :class="{ 'isFixedForm': searchBarFixed === true }">
      <template v-if="active === 0">
        <health-userdetail></health-userdetail>
      </template>
      <template v-if="active === 1">
        <!--<div class="noneText">
          <div class="con">
            <img src="@/assets/images/noData.png"/>
            <p>暂时为空</p>
          </div>
        </div>-->
        <danger-risk></danger-risk>
      </template>
      <template v-if="active === 2">
        <!--<div class="noneText">
          <div class="con">
            <img src="@/assets/images/noData.png"/>
            <p>暂时为空</p>
          </div>
        </div>-->
        <health-assess></health-assess>
      </template>
      <template v-if="active === 3">
        <div class="formSearchTitle" style="margin-top: 0;font-size: 14px">
          <span class="dianLv"></span>随访方案
        </div>
        <userdetai-intervene :personal="true" :clientId="clientId">
        </userdetai-intervene>
        <div class="formSearchTitle" style="margin-top: 60px;font-size: 14px">
          <span class="dianLv"></span>随访计划列表
        </div>
        <userdetail-followplan :personal="true" :clientId="clientId">
        </userdetail-followplan>
      </template>
      <template v-if="active === 4">
        <div class="formSearchTitle" style="margin-top: 0;font-size: 14px">
          <span class="dianLv"></span>随访记录
        </div>
        <userdetail-followrecord :personal="true" :clientId="clientId" :propsPageSize="15">
        </userdetail-followrecord>
      </template>
      <template v-if="active === 5">
        <report @change="changeShow"></report>
      </template>
      <template v-if="active === 6">
        <health-questionnaire></health-questionnaire>
      </template>
      <template v-if="active === 7">
        <medication-history></medication-history>
      </template>
      <template v-if="active === 8">
        <medical-history></medical-history>
      </template>
  </div>
  </div>
  </div>
</template>
<script>
import ClientInfo from './el_modal/client_info.vue';
import HealthUserdetail from './el_modal/health_userdetail.vue';
import DangerRisk from './el_modal/danger_risk.vue';
import HealthAssess from './el_modal/health_assess.vue';
import UserdetaiIntervene from '../../health_plan/user_follow_create/el_modal/userdetail_intervene.vue';
import UserdetailFollowplan from '../../health_plan/user_follow_create/el_modal/userdetail_followplan.vue';
import UserdetailFollowrecord from '../../health_plan/user_follow_create/el_modal/userdetail_followrecord.vue';
import Report from './el_modal/report.vue';
import HealthQuestionnaire from './el_modal/health_questionnaire.vue';
import MedicationHistory from './el_modal/medication_history.vue';
import MedicalHistory from './el_modal/medical_history.vue';

export default {
  name: 'index',
  components: {
    ClientInfo,
    HealthUserdetail, // 个人信息
    DangerRisk, // 危险因素
    HealthAssess, // 健康风险评估
    UserdetaiIntervene, // 随访干预
    UserdetailFollowplan, // 随访计划
    UserdetailFollowrecord, // 随访记录
    Report, // 体检报告
    HealthQuestionnaire, // 健康问卷
    MedicationHistory, // 用药
    MedicalHistory, // 就医
  },
  data() {
    return {
      active: 0,
      title: '',
      showTopLeft: true,
      clientId: this.$route.params.id,
      templateList: [
        { name: '健康问题', active: 0 },
        { name: '危险因素', active: 1 },
        { name: '健康风险评估', active: 2 },
        { name: '随访方案及计划', active: 3 },
        { name: '随访记录', active: 4 },
        { name: '体检报告', active: 5 },
        { name: '健康问卷', active: 6 },
        { name: '用药记录', active: 7 },
        { name: '就医记录', active: 8 },
      ],
      searchBarFixed: false,
    };
  },
  watch: {},
  methods: {
    clickMenu(index, selector) {
      this.active = index;
      console.log(selector);
      /* const anchor = this.$el.querySelector(selector);
      console.log(anchor.offsetTop);
      document.documentElement.scrollTop = anchor.offsetTop;*/
    },
    changeShow(status) {
      this.showTopLeft = status;
    },
    handleScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        || document.body.scrollTop;
      const offsetTop = document.querySelector('#intvTmpl_left').offsetTop;
      if (scrollTop > offsetTop - 140 && scrollTop > 140) {
        this.searchBarFixed = true;
      } else {
        this.searchBarFixed = false;
      }
      const article = document.querySelectorAll('.articleTitle');
      article.forEach((item, index) => {
        if (scrollTop >= item.offsetTop - 200) {
          this.active = index;
        }
      });
    },
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      const VM = vm;
      if (localStorage.getItem('personalHealthActive')) { // 返回的定位
        VM.active = Number(localStorage.getItem('personalHealthActive'));
        localStorage.removeItem('personalHealthActive');
      }
    });
  },
};
</script>

<style lang="scss" scoped>
  .health_questionnaire_edit{
    margin-top: 30px;
    display: flex;
    border-radius: 20px 20px 0 0;
    background-color: white;
    #intvTmpl_left{
      &.isFixed{
        position:fixed;
        top: 0;
        z-index: 1;
      }
    }
    .isFixedForm{
      margin-left: 190px;
    }
    /deep/ .el-form--label-top .el-form-item__label{
      font-size: 16px;
      color: #333333!important;
      position: relative;
      font-weight: bold;
      &:before {
        content: '';
        width: 5px;
        height: 5px;
        background: #31C529;
        border-radius: 3px;
        position: absolute;
        left: -14px;
        top: 41%;
        transform: translateY(-50%);
      }
    }
    .editWarn{
      display: flex;
      height: 80px;
      background: #FFFFFF;
      font-size: 14px;
      color: #E6B058;
      border-radius: 5px;
      border: 1px dashed #E6B058;
      align-items: center;
      margin: 10px 0 30px 0;
      img{
        width: 40px;
        height: 40px;
        margin: 0 20px 0 20px;
      }
    }
    .health_questionnaire_form{
      flex: 1;
      .footer {
        margin-top: 10px;
        text-align: center;
      }
      .health_questionnaire_formQus{
        margin-left: 25px;
        display: flex;
        flex-wrap: wrap;
      }
    }
    .noneText{
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .con {
        text-align: center;
      }
      img {
        width: 60px;
        height: 60px;
      }
      p {
        color: #97A6BD;
        font-size: 14px;
      }
    }
  }
  .headimage{
    .userimg{
      position: relative;
      width: 80px;
      height: 80px;
      margin: auto;
      margin-top: 40px;
      img{
        width: 100%;
      }
      .userImg{
        width: 30px;
        height: 30px;
        position: absolute;
        border-radius: 50%;
        right: 0;
        bottom: 0;
        img{
          width: 100%;
        }
      }
    }
    .username{
        text-align: center;
        font-weight: 600;
        color: #333333;
        font-size: 18px;
        line-height: 25px;
        margin-top: 10px;
      }
      .usertype{
        width: 70px;
        height: 24px;
        background: rgba(49, 84, 172, 0.1);
        border-radius: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto;
        color: #24499D;
        font-size: 12px;
        line-height: 25px;
        margin-top: 6px;
      }
  }
</style>
