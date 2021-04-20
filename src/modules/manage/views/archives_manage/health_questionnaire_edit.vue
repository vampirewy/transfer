<template>
  <div class="health_questionnaire_edit">
    <div class="tabBars">
      <div v-for="(item,index) in tabbor" :key="index">
      <span :class="active === index?'TabBarsName':'TabBarsNames'" @click="TabbarBtn(index)">
        {{item}}
        <!--<div class="Tabunread">3</div>-->
      </span>
      </div>
      <!-- <div><span>阳性跟踪</span></div>
      <div><span>随访任务</span></div> -->

    </div>
    <div class="intvTmpl_left" id="intvTmpl_left" v-if="$route.params.qusType === 1"
         :class="{ 'isFixed': searchBarFixed === true }"
         style="max-height: 30000px;height: auto;margin-right: 30px;display: none">
      <div class="intvTmpl_left_title">生活方式问卷</div>
      <ul class="intv_menulist">
        <li :class="{'active':active === index}" @click="clickMenu(index, '#questions-' + index)"
            v-for="(item, index) in templateList" :key="item.name">
          {{item.name}}
        </li>
      </ul>
    </div>
    <div class="health_questionnaire_form" :class="{ 'isFixedForm': searchBarFixed === true }">
    <div class="title">{{title}}问卷-基本信息</div>
    <client-info :id="$route.params.id" :propsData="formData"
                 @change="data => formData.clientId = data"></client-info>
      <div class="editWarn" v-if="$route.params.qusType === 1">
        <img src="@/assets/images/common/editIcon.png"/>
        <span>答案选项中频率表示天数，“从不”表示0天，“偶尔”表示每周1-2天，“有时”表示每周3-4天，“经常”表示每周5-6天，“总是”表示每周7天。
        <br/>家族病史部分，“兄”代表兄弟姐妹.</span>
      </div>
    <el-form
      ref="form"
      :model="formData"
      label-position="top"
      label-suffix="："
      label-width="90px"
      class="health_questionnaire_form"
      :rules="rules"
    >
      <div class="title" v-if="$route.params.qusType !== 1">填写{{qusTypeName}}问卷</div>
      <div class="container" :class="{'containerOtherCheckBox': $route.params.qusType !== 1}">
        <div v-for="(item, index) in questions" :key="item.paramSort">
          <div class="title articleTitle" :id="'questions-' + index"
               v-if="$route.params.qusType === 1">{{ item.name }}
          </div>
            <el-row class="health_questionnaire_formQus">
              <el-col :span="$route.params.qusType !== 1 ? 24 :
              item.name === '既往情况' || item.name === '患病情况' ? 24 :
              item.name === '家族病史' ? 8 : 12" :id="'questionitem-' + itemList.code"
              v-for="(itemList, indexList) in item.questionSubjectDTOList" :key="itemList.id">
                <el-form-item
                  :key="itemList.id"
                  :label="`${indexList + 1}. ${itemList.name} (单选)`"
                  v-if="itemList.subectType === 1"
                >
                  <el-radio-group
                    v-if="answerMap[itemList.id]"
                    v-model="answerMap[itemList.id][0].optionId"
                    size="small"
                    @change="row => onAnswerChange(itemList, row)"
                    :disabled="itemList.disabled">
                    <el-radio-button
                      v-for="val in itemList.optionList"
                      :label="val.id"
                      :value="val.id"
                      :key="val.id">
                      {{ val.name }}
                    </el-radio-button>
                  </el-radio-group>
                </el-form-item>
                 <el-form-item :key="itemList.id"
                     :label="`${indexList + 1}. ${itemList.name} (多选)`"
                         v-else>
                  <el-checkbox-group v-model="answerMap[itemList.id]" size="small"
                                     @change="ev => onCheckboxChange(itemList, ev)">
                    <el-checkbox-button
                      v-for="val in itemList.optionList"
                      :label="val.id"
                      :key="val.id"
                      :disabled="val.disabled">
                      {{ val.name }}
                    </el-checkbox-button>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
           </el-row>
        </div>
      </div>
      <div class="footer">
        <el-button @click="$router.go(-1)" class="cancelBtn"
                   v-if="$route.params.type === 'view'" size="small">返回</el-button>
        <el-button @click="$router.go(-1)" class="cancelBtn"
                   v-if="$route.params.type === 'edit'" size="small">取消</el-button>
        <el-button type="primary" @click="submit" size="small"
                   v-if="$route.params.type === 'edit'" class="sureBtn">提交</el-button>
      </div>
    </el-form>
  </div>
  </div>
</template>
<script>
import ClientInfo from './health_monitor/client_info.vue';

export default {
  name: 'ClientEdit',
  components: {
    ClientInfo,
  },
  data() {
    return {
      active: 0,
      tabbor: ['当日任务', '阳性跟踪', '随访任务'],
      title: '',
      qusTypeName: '',
      formData: {
        answerList: [],
        createTime: new Date(),
        mobile: '',
      },
      templateList: [],
      questions: [],
      answerList: [],
      answerOptionsList: [],
      allQuestion: [],
      answerMap: {},
      answerOptionMap: {},
      chooseNoSubject: [], // 设置选择为无的题目
      searchBarFixed: false,
      rules: {
        /* clientName: [
          {
            required: true,
            message: '请选择客户',
            trigger: 'blur',
          },
        ], */
      },
    };
  },
  watch: {},
  methods: {
    clickMenu(index, selector) {
      this.active = index;
      const anchor = this.$el.querySelector(selector);
      document.documentElement.scrollTop = anchor.offsetTop - 140;
    },
    handleClick() {},
    onAnswerChange(row, answer) {
      console.log(row);
      console.log(answer);
      const SMOKE = 'e01';
      const DRINK = 'f01';
      const QUESTIONWITHSMOKE = ['e02', 'e03', 'e04', 'e05', 'e06'];
      const QUESTIONWITHDRINK = ['f02', 'f03', 'f04', 'f05', 'f06'];
      let questions = [];
      if (row.code === SMOKE) {
        const chooseList = this.questions.find(list => list.name === '吸烟情况');
        questions = chooseList.questionSubjectDTOList.filter(val =>
          QUESTIONWITHSMOKE.find(key => val.code === key),
        );
      } else if (row.code === DRINK) {
        const chooseList = this.questions.find(list => list.name === '饮酒情况');
        questions = chooseList.questionSubjectDTOList.filter(val =>
          QUESTIONWITHDRINK.find(key => val.code === key),
        );
      }
      if (questions.length && (answer === '293' || answer === '322')) {
        questions.forEach((val) => {
          if (val.code !== 'e05') {
            this.$set(val, 'disabled', true);
          }
        });
        // questions.forEach(val => this.$set(val, 'disabled', true));
      } else if (questions.length) {
        questions.forEach(val => this.$set(val, 'disabled', false)); // 重置回可选状态
      }
    },
    onCheckboxChange(row, checkedList = []) {
      console.log(row);
      console.log(checkedList);
      const optionList = row.optionList;
      const no = optionList.find(val => val.code === 'n');
      if (no) {
        const item = checkedList.find(val => val === no.id);
        console.log(item);
        if (item) {
          optionList
            .filter(val => val !== no)
            .forEach(val => this.$set(val, 'disabled', true));
          this.answerMap[row.id] = [item];
        } else {
          optionList.forEach(val => this.$set(val, 'disabled', false));
        }
      }
    },
    onReasonChange(id) {
      const row = this.answerOptionsList.find(val => val.id === id);
      const answerIndex = this.questions.findIndex(
        val => val.id === row.subjectId,
      );
      this.answerList.splice(answerIndex, 1, {
        optionCode: row.code,
        optionId: row.id,
        subjectCode: row.subjectCode,
        subjectId: row.subjectId,
      });
    },
    fetch(id, questionType) {
      this.$api.health.getDetail(id).then(({ data }) => {
        if (data.code === 200) {
          this.formData = data.data;
          if (data.data.gender === 2) {
            this.formData.genderName = '女';
          } else if (data.data.gender === 1) {
            this.formData.genderName = '男';
          } else {
            this.formData.genderName = '未知';
          }
          this.answerList = [...this.formData.answerList];
          this.onTypeChange(questionType);
        }
      });
    },
    groupBy(list) {
      const map = this.answerMap;
      list.forEach((val) => {
        if (val.optionCode === 'n' ||
          (val.subjectCode === 'e01' && val.optionCode === '1') ||
          (val.subjectCode === 'f01' && val.optionCode === '1')) { // 如果是n或者吸烟饮酒选了1，push进一个数组， 回显时diaabled
          this.chooseNoSubject.push(val.subjectCode);
        }
        if (val.subjectId && !map[val.subjectId]) {
          map[val.subjectId] = [];
        }
        const row = this.answerOptionMap[val.optionId];
        if (row.subectType === 1) {
          map[val.subjectId].splice(0, 1, {
            optionId: val.optionId,
          });
        } else {
          map[val.subjectId].push(val.optionId);
        }
      });
      this.$set(this, 'answerMap', map);
      this.setChooseNoSubject();
    },
    setChooseNoSubject() {
      this.questions.forEach((val) => {
        val.questionSubjectDTOList.forEach((valOptions) => {
          if (this.chooseNoSubject.indexOf(valOptions.code) !== -1) { // 如果查到是之前push进选无的数组
            if (valOptions.code === 'e01') {
              this.onAnswerChange(valOptions, '293');
            } if (valOptions.code === 'f01') {
              this.onAnswerChange(valOptions, '322');
            } else {
              valOptions.optionList
                .filter(valItem => valItem.code !== 'n')
                .forEach(valObj => this.$set(valObj, 'disabled', true));
            }
          } // 根据题目id找到题目再设disabled
        });
      });
    },
    onTypeChange(ev) {
      console.log(ev);
      const EV = ev; // ev; 1生活方式 2 中医 3 心理
      this.$set(this, 'answerOptionsList', []);
      this.$api.health.getQuestions(EV).then(({ data }) => {
        if (data.code === 200) {
          this.questions = data.data;
          this.questions.forEach((val, index) => {
            this.templateList.push({ name: val.name, sort: index });
            val.questionSubjectDTOList.forEach((valOptions) => {
              if (!this.answerMap[valOptions.id]) {
                this.$set(this.answerMap, valOptions.id, []);
                if (valOptions.subectType === 1) {
                  // 单选的话默认有一个选项
                  this.answerMap[valOptions.id].push({
                    optionId: '',
                  });
                }
              }
              this.allQuestion.push(valOptions);
              valOptions.optionList.forEach((item) => {
                this.answerOptionMap[item.id] = item;
                // eslint-disable-next-line no-param-reassign
                item.subectType = valOptions.subectType;
              });
            });
          });
          console.log(this.answerOptionMap);
          console.log(this.formData.answerList);
          this.groupBy(this.formData.answerList);
        }
      });
    },
    removeSplice(arr, val) {
      const index = arr.indexOf(val);
      if (index > -1) {
        arr.splice(index, 1);
      }
    },
    submit() {
      this.$set(this.formData, 'answerList', []);
      Object.keys(this.answerMap).forEach((key) => {
        if (this.answerMap[key] && this.answerMap[key].length) {
          this.answerMap[key].forEach((val) => {
            let row;
            if (typeof val === 'string') {
              row = this.answerOptionMap[val] || {};
            } else {
              row = this.answerOptionMap[val.optionId] || {};
            }
            this.formData.answerList.push({
              optionCode: row.code,
              optionId: row.id,
              subjectCode: row.subjectCode,
              subjectId: row.subjectId,
            });
          });
        }
      });
      this.formData.answerList = this.formData.answerList.filter(
        val => val.optionId && val.optionCode,
      );
      console.log(this.formData.answerList); // 将answerList里面的subjectCode 和 题目code 对比
      console.log(this.allQuestion); // 如果没有的话就就push一个新数组
      const noAnswerList = [];
      this.allQuestion.forEach((valQusOne) => {
        let same = false;
        this.formData.answerList.forEach((valAnswer) => {
          if (valQusOne.code === valAnswer.subjectCode) { // 如果有一样 就回答过了
            same = true;
          }
        });
        if (same === false) { // 如果没有相同的则push
          noAnswerList.push(valQusOne.code); // 把未完成的题目push进一个数组
        }
      });
      this.formData.answerList.forEach((valAnswer) => {
        if (valAnswer.subjectCode === 'e01' && valAnswer.optionId === '293') {
          this.removeSplice(noAnswerList, 'e03');
          this.removeSplice(noAnswerList, 'e04');
        } else if (valAnswer.subjectCode === 'f01' && valAnswer.optionId === '322') {
          this.removeSplice(noAnswerList, 'f03');
          this.removeSplice(noAnswerList, 'f04');
          this.removeSplice(noAnswerList, 'f05');
        }
      });
      console.log(noAnswerList);
      if (noAnswerList.length !== 0) { // 运动到没填的题目的地方
        const anchor = this.$el.querySelector(`#questionitem-${noAnswerList[0]}`);
        console.log(anchor);
        if (this.$route.params.qusType === 1) {
          // 父级与body + 与父级 加起来的offsetTop
          document.documentElement.scrollTop =
            (anchor.parentNode.offsetTop + anchor.offsetTop) - 130;
        } else {
          document.documentElement.scrollTop = anchor.offsetTop + 290;
        }
        return;
      }
      const sendData = {};
      sendData.answerList = this.formData.answerList;
      sendData.clientId = this.formData.clientId;
      sendData.questionType = this.$route.params.qusType;
      if (this.$route.params.id) {
        sendData.id = this.$route.params.id;
      }
      this.$api.health.add(sendData).then(({ data }) => {
        if (data.code === 200) {
          this.$message.success('操作成功');
          this.$router.go(-1);
        }
      });
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
      if (to.params.qusType === 1) {
        VM.qusTypeName = '常规';
        window.addEventListener('scroll', vm.handleScroll);
      } else if (to.params.qusType === 2) {
        VM.qusTypeName = '中医';
      } else if (to.params.qusType === 3) {
        VM.qusTypeName = '心理';
      }
      if (to.params.id) { // 如果有id就是编辑 先获取详情
        VM.fetch(to.params.id, to.params.qusType);
        if (to.params.type === 'edit') {
          VM.title = '编辑';
          document.title = '编辑健康问卷';
        } else if (to.params.type === 'view') {
          VM.title = '查看';
          document.title = '查看健康问卷';
        }
      } else {
        VM.onTypeChange(to.params.qusType);
        VM.title = '添加';
        document.title = '新增健康问卷';
      }
    });
  },
};
</script>

<style lang="scss">
  .tabBars{
    display: flex;
    margin-top: 25px;
    div{
      // width: 100px;
      // height: 40px;
      // line-height: 40px;
      // text-align: center;
      // background: red;
    }
    .TabBarsNames{
      cursor: pointer;
      background: #EEF1F5;
      border-color: transparent;
      color: #666666;
      position: relative;
      margin-right: 15px;
      padding: 10px 10px 10px 10px;
      font-size: 12px;
      border-radius: 8px 5px 0 0;
      margin-left: 13px;
      &:before{
        content: '';
        display: block;
        width: 18px;
        height: 36px;
        position: absolute;
        -webkit-transform: skewX(165deg);
        transform: skewX(163deg);
        background: #EEF1F5;
        border-top-left-radius: 8px;
        top: 0px;
        left: -8px;
      }
      &:after{
        content: '';
        display: block;
        width: 15px;
        height: 36px;
        position: absolute;
        -webkit-transform: skewX(23deg);
        transform: skewX(23deg);
        background: #EEF1F5;
        border-top-right-radius: 8px;
        top: 0px;
        right: -7px;
      }
    }
    .TabBarsName{
      cursor: pointer;
      background: #ffffff;
      border-color: transparent;
      color: #333333;
      font-weight: 500;
      position: relative;
      margin-right: 20px;
      padding: 10px 14px 10px 16px;
      font-size: 14px;
      border-radius: 8px 5px 0 0;
      &:after{
        content: '';
        display: block;
        width: 25px;
        height: 40px;
        position: absolute;
        -webkit-transform: skewX(23deg);
        transform: skewX(23deg);
        background: white;
        border-top-right-radius: 8px;
        top: 0px;
        right: -13px;
      }
    }
    .Tabunread{
      display: inline-block;
      background: red;
      padding: 3px;
      color: #ffffff;
      width: 12px;
      height: 12px;
      line-height: 12px;
      text-align: center;
      border-radius: 10px;
      margin-left: 5px;
      font-size: 12px;
    }
  }
  .health_questionnaire_edit{
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

    .title {
      font-size: 18px;
      font-weight: 600;
      color: #333333;
      line-height: 25px;
      padding-left: 10px;
      position: relative;
      margin-bottom: 20px;
      &:after {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 2px;
        height: 18px;
        background: #4991FD;
        border-radius: 1px;
      }
    }
    .el-radio-button + .el-radio-button {
      margin-right: 20px;
      margin-bottom: 20px;
    }
    .el-radio-button__inner {
      background-color: #F4F4F6;
      color: #333333;
      border: 1px solid #97A6BD;
    }
    /deep/ .el-radio-button__orig-radio:disabled + .el-radio-button__inner{
      border-left: 1px solid #f5f5f5!important;
    }
    .el-radio-button {
      .el-radio-button__inner {
        min-width: 100px;
        height: 48px;
        line-height: 21px;
        border-radius: 8px;
        box-shadow: none;
      }
      &:first-child .el-radio-button__inner{
        border-left: 1px solid #97A6BD;
        margin-right: 20px;
      }
    }
    .containerOtherCheckBox{
      .el-form-item{
        margin-bottom: 0;
      }
      .el-radio-button {
        .el-radio-button__inner {
          min-width: 220px;
        }
        &:first-child .el-radio-button__inner{
          margin-right: 30px;
        }
      }
      .el-radio-button + .el-radio-button {
        margin-right: 30px;
      }
    }
    .el-checkbox-button + .el-checkbox-button {
      margin-right: 20px;
      margin-bottom: 20px;
    }
    .el-checkbox-button__inner{
      background-color: #F4F4F6;
      color: #333333;
      border: 1px solid #97A6BD;
    }
    /deep/ .el-checkbox-button.is-disabled:first-child .el-checkbox-button__inner{
      border-left-color: #f5f5f5!important;
    }
    /deep/ .el-checkbox-button.is-focus .el-checkbox-button__inner{
      border-color: #97A6BD;
    }
    .el-checkbox-button {
      .el-checkbox-button__inner {
        min-width: 100px;
        height: 48px;
        line-height: 21px;
        border-radius: 8px;
      }
      .is-checked .el-checkbox-button__inner{
        background-color: #4991FD;
        color: white;
        border: 1px solid #4991FD!important;
      }
      &:first-child .el-checkbox-button__inner{
        border-left: 1px solid #97A6BD;
        margin-right: 20px;
      }
    }
  }
</style>
