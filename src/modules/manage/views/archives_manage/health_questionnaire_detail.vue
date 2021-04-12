<template>
  <div class="health_questionnaire_view">
    <el-tabs v-model="activeName" class="two-tab" style="margin-top: -10px">
      <el-tab-pane label="问卷结果" name="first">
        <div class="tableTopDoDiv" style="margin-top: 0">
          <div class="divRightTitleDiv">
            <div class="divRightTitle"><span>|</span>基本信息</div>
          </div>
        </div>
        <div class="clientInfoDiv">
          <div><p>姓名：</p><span>{{formData.clientName}}</span></div>
          <div><p>性别：</p><span>{{formData.genderName}}</span></div>
          <div><p>出生日期：</p><span>{{formData.birthday}}</span></div>
        </div>
        <div class="questionAnswerDiv" v-for="item in answerList" :key="item.paramSort">
          <div class="tableTopDoDiv" style="margin-top: 0">
            <div class="divRightTitleDiv">
              <div class="divRightTitle"><span>|</span>
                {{$route.params.qusType === 2 ? '中医问卷' :
                $route.params.qusType === 3 ? '心理问卷' :
                item.name}}
              </div>
            </div>
          </div>
          <div class="questionAnswer" v-for="(itemQus, indexQus) in item.questionAnswerDTOList"
               :key="itemQus.subjectName">
            <p class="answerText">{{indexQus + 1}}.{{itemQus.subjectName}}</p>
            <p class="questionsText">
              {{itemQus.optionsName}}
            </p>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
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
      activeName: 'first',
      options: [],
      questions: [],
      formData: {
        birthday: '',
        clientName: '',
        genderName: '',
      },
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
    getQuestionType() {
      this.$api.health.getQuestionType().then((options) => {
        this.options = options;
      });
    },
    fetch(id) {
      this.$api.health.getDetailView(id).then(({ data }) => {
        if (data.code === 200) {
          const Data = data.data;
          this.formData.birthday = Data.birthday ? Data.birthday.split(' ')[0] : '';
          this.formData.clientName = Data.clientName;
          if (Data.gender === 2) {
            this.formData.genderName = '女';
          } else if (Data.gender === 1) {
            this.formData.genderName = '男';
          } else {
            this.formData.genderName = '未知';
          }
          this.answerList = Data.groupDTOList;
        }
      });
    },
    onTypeChange(ev) {
      this.$set(this, 'answerOptionsList', []);
      this.$api.health.getQuestions(ev).then(({ data }) => {
        if (data.code === 200) {
          this.questions = data.data;
          this.questions.forEach((val) => {
            if (!this.answerMap[val.id]) {
              this.$set(this.answerMap, val.id, []);
              if (val.subectType === 1) {
                // 单选的话默认有一个选项
                this.answerMap[val.id].push({
                  optionId: '',
                });
              }
            }
            val.optionList.forEach((item) => {
              this.answerOptionMap[item.id] = item;
              // eslint-disable-next-line no-param-reassign
              item.subectType = val.subectType;
            });
          });
          this.groupBy(this.formData.answerList);
        }
      });
    },
    groupBy(list) {
      const map = this.answerMap;
      list.forEach((val) => {
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
    },
    getAnswer(row) {
      const answerList = this.answerMap[row.id];
      return answerList.reduce((pre, cur) => {
        if (typeof cur === 'object') {
          return `${pre + this.answerOptionMap[cur.optionId].name},`;
        }
        return `${pre + this.answerOptionMap[cur].name},`;
      }, '');
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getQuestionType();
      // if (to.params.id) {
      vm.fetch(to.params.id);
      // }
    });
  },
};
</script>

<style lang="scss" scoped>
.health_questionnaire_view{
  margin-top: 0;
  display: block;
  .clientInfoDiv{
    padding: 0 105px 0 27px;
    margin: 20px 0 20px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /*width: 100%;*/
    height: 60px;
    background: #F4F4F6;
    border-radius: 10px;
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
        font-size: 16px;
        color: #333333;
        margin-top: 18px;
        margin-bottom: 16px;
      }
      .questionsText{
        padding: 0 0 0 10px;
        margin: 0 0 30px 0;
        font-size: 14px;
        color: #333333;
        height: 48px;
        line-height: 48px;
        background: #F4F4F6;
        border-radius: 8px;
      }
    }
  }
  .footer {
    margin-top: 10px;
    text-align: center;
  }
}
.title {
  padding-right: 8px;
  margin-bottom: 8px;
  font-size: 20px;
  /* color: #409eff; */
  margin-top: 8px;
}

li {
  font-size: 14px;
  font-weight: normal;
  margin-bottom: 16px;
}

ul {
  padding-left: 40px;
}
</style>
