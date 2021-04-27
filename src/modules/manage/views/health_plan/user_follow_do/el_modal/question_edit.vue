<template>
  <div class="health_questionnaire_edit">
    <div class="health_questionnaire_form" :class="{ 'isFixedForm': searchBarFixed === true }">
      <el-form
              ref="form"
              :model="formData"
              label-position="top"
              label-suffix="："
              label-width="90px"
              class="health_questionnaire_form"
              :rules="rules"
      >
        <div class="container" :class="{'containerOtherCheckBox': $route.params.qusType !== 1}">
          <div>
            <el-row class="health_questionnaire_formQus">
              <el-col :span="24" :id="'questionitem-' + item.id"
                v-for="(item, index) in questionSubjectist" :key="item.id">
                <el-form-item
                        :key="item.id"
                        :label="`${index + 1}. ${item.name} (单选)`"
                        v-if="item.subjectType === 1"
                >
                  <el-radio-group
                          v-if="answerMap[item.id]"
                          v-model="answerMap[item.id][0].optionId"
                          size="small"
                          @change="row => onAnswerChange(item, row)"
                          :disabled="item.disabled">
                    <el-radio-button
                            v-for="val in item.questionSubjectOptionList"
                            :label="val.id"
                            :value="val.id"
                            :key="val.id">
                      {{ val.name }}
                    </el-radio-button>
                  </el-radio-group>
                </el-form-item>
                <el-form-item :key="item.id"
                              :label="`${index + 1}. ${item.name} (多选)`"
                              v-else-if="item.subjectType === 2">
                  <el-checkbox-group v-model="answerMap[item.id]" size="small"
                                     @change="ev => onCheckboxChange(item, ev)">
                    <el-checkbox-button
                            v-for="val in item.questionSubjectOptionList"
                            :label="val.id"
                            :key="val.id"
                            :disabled="val.disabled">
                      {{ val.name }}
                    </el-checkbox-button>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item :key="item.id" class="questionTextarea"
                              :label="`${index + 1}. ${item.name} (填空)`"
                              v-else-if="item.subjectType === 3">
                  <div v-for="val in item.questionSubjectOptionList" :key="val.id"
                       style="width: 100%;display: flex;margin-bottom: 20px;">
                    <span style="display: inline-block;width: 85px;">填写答案：</span>
                    <el-input v-model.trim="answerMap[item.id][0].optionCode"
                              type="textarea"
                              :rows="5"
                              :maxlength="100"
                              :disabled='propsType === 3'
                              show-word-limit
                              :placeholder="propsType !== 3 ? '请输入' : ''"></el-input>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
        <!--<div class="footer">
          <el-button @click="$router.go(-1)" class="cancelBtn"
                     v-if="$route.params.type === 'view'" size="small">返回</el-button>
          <el-button @click="$router.go(-1)" class="cancelBtn"
                     v-if="$route.params.type === 'edit'" size="small">取消</el-button>
          <el-button type="primary" @click="submit" size="small"
                     class="sureBtn">提交</el-button>
        </div>-->
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ClientEdit',
  props: ['propsType', 'propsQuestionSubjectist', 'propsQuestionAnswerList'],
  data() {
    return {
      active: 0,
      title: '',
      qusTypeName: '',
      questionSubjectist: [], // 所有题目
      formData: {
        answerList: [],
        createTime: new Date(),
        mobile: '',
      },
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
  watch: {
    propsQuestionSubjectist(val) {
      this.questionSubjectist = val; // 所有题目
      if (this.propsType === 3) { // 如果是查看 先获取详情
        this.formData.answerList = [...this.propsQuestionAnswerList];
        // this.fetch(this.$route.params.id, this.$route.params.qusType);
      }
      this.onTypeChange(); // 先设置题目
    },
  },
  methods: {
    clickMenu(index, selector) {
      this.active = index;
      const anchor = this.$el.querySelector(selector);
      document.documentElement.scrollTop = anchor.offsetTop - 140;
    },
    handleClick() {},
    onAnswerChange(row, answer) {
      const SMOKE = 'eeeee000001';
      const DRINK = 'fffff000001';
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
      const optionList = row.questionSubjectOptionList;
      const no = optionList.find(val => val.code === 'n');
      if (no) {
        const item = checkedList.find(val => val === no.id);
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
    /* fetch(id, questionType) {
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
    },*/
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
        if (row.subjectType === 1) {
          map[val.subjectId].splice(0, 1, {
            optionId: val.optionId,
          });
        } else if (row.subjectType === 3) {
          map[val.subjectId][0].optionCode = val.optionCode;
        } else {
          map[val.subjectId].push(val.optionId);
        }
      });
      this.$set(this, 'answerMap', map);
      // this.setChooseNoSubject();
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
              valOptions.questionSubjectOptionList
                .filter(valItem => valItem.code !== 'n')
                .forEach(valObj => this.$set(valObj, 'disabled', true));
            }
          } // 根据题目id找到题目再设disabled
        });
      });
    },
    onTypeChange() {
      this.$set(this, 'answerOptionsList', []);
      if (this.questionSubjectist) {
        this.questionSubjectist.forEach((valOptions) => {
          if (!this.answerMap[valOptions.id]) {
            this.$set(this.answerMap, valOptions.id, []);
            if (valOptions.subjectType === 1) { // 1单选 2 多选 3 填空
              // 单选的话默认有一个选项
              this.answerMap[valOptions.id].push({
                optionId: '',
              });
            } else if (valOptions.subjectType === 3) { // 1单选 2 多选 3 填空
              // 单选的话默认有一个选项
              /* this.answerMap[valOptions.id].push({
                optionId: '',
              });*/
              this.answerMap[valOptions.id].push({
                optionCode: '',
                subjectType: 3,
                subjectId: valOptions.id,
              });
              valOptions.questionSubjectOptionList.push({ code: '', id: '' });
            }
          }
          this.allQuestion.push(valOptions); // 所有题目push进一个数组，为了判断后面哪个没选过
          valOptions.questionSubjectOptionList.forEach((item) => {
            if (valOptions.subjectType === 3) {
              this.answerOptionMap[valOptions.id] = item; // 填空没有答案id 输入题目id
            } else {
              this.answerOptionMap[item.id] = item; // 存入所有的答案选项，最后根据选项id取内容
            }
            // eslint-disable-next-line no-param-reassign
            item.subjectType = valOptions.subjectType;
            item.subjectId = valOptions.id;
            item.subjectCode = valOptions.code;
          });
        });
      }
      console.log(this.answerOptionMap);
      console.log(this.formData.answerList);
      this.groupBy(this.formData.answerList); // 填写的答案内容 回显
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
            } else if (val.subjectType === 3) { // 填空题，另外处理
              row = this.answerOptionMap[val.subjectId] || {};
              row.code = val.optionCode;
            } else {
              row = this.answerOptionMap[val.optionId] || {};
            }
            this.formData.answerList.push({
              optionCode: row.code,
              optionId: row.id || row.subjectId,
              subjectCode: row.subjectCode,
              subjectId: row.subjectId,
            });
          });
        }
      });
      this.formData.answerList = this.formData.answerList.filter(
        val => val.optionId,
      ); //  && val.optionCode
      console.log(this.formData.answerList); // 将answerList里面的subjectCode 和 题目code 对比
      console.log(this.allQuestion); // 如果没有的话就就push一个新数组
      const noAnswerList = [];
      this.allQuestion.forEach((valQusOne) => {
        let same = false;
        this.formData.answerList.forEach((valAnswer) => {
          if (valQusOne.id === valAnswer.subjectId) { // 如果有一样 就回答过了
            same = true;
          }
        });
        if (same === false) { // 如果没有相同的则push
          noAnswerList.push(valQusOne.id); // 把未完成的题目push进一个数组
        }
      });
      /* this.formData.answerList.forEach((valAnswer) => { // 选无
        if (valAnswer.subjectCode === 'e01' && valAnswer.optionId === '293') {
          this.removeSplice(noAnswerList, 'e03');
          this.removeSplice(noAnswerList, 'e04');
        } else if (valAnswer.subjectCode === 'f01' && valAnswer.optionId === '322') {
          this.removeSplice(noAnswerList, 'f03');
          this.removeSplice(noAnswerList, 'f04');
          this.removeSplice(noAnswerList, 'f05');
        }
      });*/
      if (noAnswerList.length !== 0) { // 运动到没填的题目的地方
        const anchor = this.$el.querySelector(`#questionitem-${noAnswerList[0]}`);
        /* if (this.$route.params.qusType === 1) {
          // 父级与body + 与父级 加起来的offsetTop
          document.documentElement.scrollTop =
            (anchor.parentNode.offsetTop + anchor.offsetTop) - 130;
        } else {*/
        /* document.documentElement.scrollTop = anchor.offsetTop + 60; */
        if (document.querySelectorAll('.content-wrapper').length > 0) {
          document.querySelectorAll('.content-wrapper')[0].scrollTop = anchor.offsetTop + 60;
        }
        this.$message.warning('请填写完整随访问卷');
        // }
        return false;
      }
      return this.formData.answerList;
      /* const sendData = {};
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
      });*/
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
  mounted() {

  },
};
</script>

<style lang="scss" scoped>
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
    /*/deep/.el-form-item__content .el-textarea__inner{
      background-color: #F4F4F6 !important;
    }*/
    /deep/ .el-form--label-top .el-form-item__label{
      font-size: 14px;
      color: #333333!important;
      position: relative;
      font-weight: bold;
      &:before {
        content: '';
        width: 5px;
        height: 5px;
        border: 1px solid #B4BBC9;
        background: white;
        border-radius: 3px;
        position: absolute;
        left: -14px;
        top: 41%;
        transform: translateY(-50%);
      }
    }
    display: flex;
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
        margin-left: 15px;
        display: flex;
        flex-wrap: wrap;
      }
    }

   /* .title {
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
          min-width: 100px;
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
    }*/
  }
</style>
