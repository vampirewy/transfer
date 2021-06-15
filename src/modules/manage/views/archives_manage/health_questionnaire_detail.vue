<template>
  <div class="health_questionnaire_view" ref="health_questionnaire_view">
      <div class="tabBars" ref="tabBars">
          <div class="firstTitleTabBar">
        <span :class="active === -1 ? 'TabBarsNameFirstActive' : 'TabBarsFirstNames'"
              @click="clickToTop">
          {{qusTypeName}}问卷
        </span>
          </div>
          <div v-for="(item,index) in templateList" :key="item.name">
              <span :class="active === index ? 'TabBarsNameActive' : 'TabBarsNames'"
                    @click="clickMenu(index, '#questions-' + index)">
                {{item.name}}
              </span>
          </div>
      </div>
        <div class="divRightTitleDiv" :style="{'padding-top': contentPaddingTop + 'px'}">
          <div class="divRightTitle">查看-基本信息<div class="titleBiao"></div></div>
        </div>
        <div class="clientInfoDiv">
            <el-form ref="form" :model="formData" label-width="90px" label-suffix="：">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="姓名" prop="clientId">
                           {{formData.name | getResult}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="性别" prop="gender">
                            {{formData.gender | getResultGender}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="出生日期" prop="birthday">
                            {{formData.birthday | getResultDate}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="身份证号" prop="cardNo">
                            {{formData.cardNo | getResult}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="民族" prop="ethnicGroupName">
                            {{formData.ethnicGroupName | getResult}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="手机号码" prop="mobile">
                            {{formData.mobile | getResult}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="学历" prop="educationLevelName">
                            {{formData.educationLevelName | getResult}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="职业类型" prop="professionName">
                            {{formData.professionName | getResult}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="婚姻" prop="marriageName">
                            {{formData.marriageName | getResult}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="工作单位" prop="workUnitName">
                            {{formData.workUnitName | getResult}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="现居地址" prop="address">
                            {{formData.address | getResult}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="问卷日期" prop="questionDate">
                            {{questionDate | getResult}}
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="questionAnswerDiv" v-for="(item, index) in answerList" :key="item.paramSort">
          <div class="divRightTitleDiv articleTitle" :id="'questions-' + index">
            <div class="divRightTitle">{{$route.params.qusType === 2 ? '中医问卷' :
              $route.params.qusType === 3 ? '心理问卷' : $route.params.qusType === 4 ? '自定义问卷' :
              item.name}}</div>
          </div>
          <div class="questionAnswer" v-for="(itemQus) in item.questionAnswerDTOList"
               :key="itemQus.subjectName">
            <p class="answerText">{{itemQus.subjectName}}</p>
            <p class="questionsText">
              {{itemQus.optionsName}}
            </p>
          </div>
        </div>
    <div class="footer">
      <el-button @click="$router.go(-1)" class="cancelBtn" size="small">返回</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'health_questionnaire_detail',
  data() {
    return {
      options: [],
      questions: [],
      active: -1,
      qusTypeName: '',
      contentPaddingTop: 20,
      templateList: [{ name: '基本信息' }, { name: '问卷内容' }],
      formData: {
        birthday: '',
        clientName: '',
        genderName: '',
      },
      questionDate: '',
      answerOptionsList: [],
      answerList: [],
      answerMap: {},
      answerOptionMap: {},
    };
  },
  computed: {
    name() {
      // return
      const item = this.options.find(
        val => val.paramValue === this.formData.questionType,
      );
      return item ? item.name : '';
    },
  },
  methods: {
    clickMenu(index, selector) {
      const Index = index;
      this.active = index;
      if (this.$route.params.qusType === 1) {
        const anchor = this.$el.querySelector(selector);
        this.$refs.health_questionnaire_view.parentNode.scrollTop = anchor.offsetTop - 50;
      } else if (Index === 0) { // 不是生活方式问卷，但是点了标题
        this.$refs.health_questionnaire_view.parentNode.scrollTop = 51;
      } else {
        this.$refs.health_questionnaire_view.parentNode.scrollTop = 350;
      }
    },
    clickToTop() {
      this.active = -1;
      this.$refs.health_questionnaire_view.parentNode.scrollTop = 0;
    },
    getQuestionType() {
      this.$api.health.getQuestionType().then((options) => {
        this.options = options;
      });
    },
    getClientUserInfo(id) {
      this.$api.userManagerInterface.getDetail(id).then(({ data }) => {
        const Data = data.data;
        this.formData = Data;
      });
    },
    fetch(id) {
      this.$api.health.getDetailView(id).then(({ data }) => {
        const Data = data.data;
        this.getClientUserInfo(Data.clientId);
        this.answerList = Data.groupDTOList;
        this.questionDate = Data.questionDate;
        if (this.$route.params.qusType === 1) {
          this.templateList = [];
          Data.groupDTOList.forEach((val) => {
            this.templateList.push({ name: val.name });
          });
        }
        setTimeout(() => {
          this.setContentPaddingTop(); // 请求成功后设置PaddingTop
        }, 100);
      });
    },
    setContentPaddingTop() { // 设置距离顶部高度， 防止头部标签换行
      let headerHeight = 0;
      if (this.$refs.tabBars) {
        headerHeight = this.$refs.tabBars.offsetHeight;
      }
      if (headerHeight <= 40) { // 一层
        this.contentPaddingTop = 20;
      } else if (headerHeight > 40) { // 两层
        this.contentPaddingTop = 60;
      }
    },
    handleScroll() {
      const scrollTop = document.querySelectorAll('.content-wrapper')[0].scrollTop;
      const article = document.querySelectorAll('.articleTitle');
      article.forEach((item, index) => {
        if (scrollTop >= item.offsetTop - 150) {
          this.active = index;
        }
      });
      if (scrollTop < 50) { // 小于50就设置标题栏选中
        this.active = -1;
      }
      if (this.$route.params.qusType !== 1) {
        if (scrollTop > 50 && scrollTop < 300) { // 小于50就设置标题栏选中
          this.active = 0;
        } else if (scrollTop >= 300) {
          this.active = 1;
        }
      }
    },
  },
  destroyed() {
    document.querySelectorAll('.content-wrapper')[0].removeEventListener('scroll', this.handleScroll);
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (to.params.qusType === 1) {
        vm.qusTypeName = '生活方式';
      } else if (to.params.qusType === 2) {
        vm.qusTypeName = '中医体质';
      } else if (to.params.qusType === 3) {
        vm.qusTypeName = 'SCL90心理';
      }
      vm.getQuestionType();
      // if (to.params.id) {
      vm.fetch(to.params.id);
      if (document.querySelectorAll('.content-wrapper').length > 0) {
        document.querySelectorAll('.content-wrapper')[0].addEventListener('scroll', vm.handleScroll);
      }
      window.onresize = () => { // 60 120  180  240 头部导航栏固定高度
        vm.setContentPaddingTop();
      };
      // }
    });
  },
};
</script>

<style lang="scss" scoped>
    /deep/ .el-form-item{
        margin-bottom: 5px;
    }
.health_questionnaire_view{
  margin-top: 0;
  display: block;
  .clientInfoDiv{
    padding: 0;
    margin: 20px 10px 20px -10px;
    font-size: 14px;
    p{
      display: inline-block;
      color: #333333;
    }
    span{
      color: #666666;
    }
  }
  .questionAnswerDiv{
    .questionAnswer{
      margin-left: 15px;
      .answerText{
        font-weight: bold;
        font-size: 14px;
        color: #333333;
        margin-top: 18px;
        margin-bottom: 16px;
          position: relative;
          margin-left: 15px;
          &:before{
              content: '';
              width: 5px;
              height: 5px;
              border: 1px solid #B4BBC9;
              border-radius: 50px;
              position: absolute;
              left: -15px;
              top: 50%;
              transform: translateY(-50%);
          }
      }
      .questionsText{
        padding: 0 0 0 10px;
        margin: 0 0 30px 0;
        font-size: 14px;
        color: #333333;
        height: 48px;
        line-height: 48px;
        background: #F6F8FC;
        border-radius: 8px;
      }
    }
  }
  .footer {
    margin-top: 40px;
    text-align: center;
  }
}
</style>
