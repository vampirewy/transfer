<template>
  <div class="user-edit">
      <el-row>
        <el-col :span="8">
          <div class="divRightTitleDiv">
            <div class="divRightTitle">{{ routeType === 1 ? '新增-随访问卷' :
              routeType === 2 ? '编辑-随访问卷' :
              routeType === 3 ? '查看-随访问卷' : '' }}<div class="titleBiao"></div></div>
          </div>
          <el-form
                  ref="form"
                  class="user-edit-form"
                  :model="formData"
                  label-width="85px"
                  :rules="rules"
          >
            <el-row>
              <el-col :span="24">
                <el-form-item label="问卷名称：" prop="name">
                  <el-input v-model="formData.name" :maxlength="30" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="问卷类型：" prop="questionType">
                  <el-select v-model="formData.questionType" placeholder="请选择" style="width: 100%">
                    <el-option :label="'随访问卷'" :value="4" :key="4"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="问卷分类：" prop="sortType">
                  <el-select
                          v-model="formData.sortType"
                          placeholder="请选择"
                          style="width: 100%"
                  >
                    <el-option :label="item.name" :value="item.paramValue"
                               v-for="item in sortTypeList"
                               :key="item.paramValue"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <!--<el-col :span="12">
                <el-form-item label="问卷标签：">
                  <el-input v-model="formData.code" style="width: 100%;"
                            placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>-->
            </el-row>
            <el-row>
              <el-col :span="24">
              <el-form-item label="问卷说明：">
                <el-input
                        rows="4"
                        type="textarea"
                        placeholder="请输入"
                        :maxlength="400"
                        show-word-limit
                        v-model="formData.intro">
                </el-input>
              </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
               <el-form-item label="是否启用：" prop="state">
                 <!--<el-select v-model="formData.state" placeholder="是否启用">
                   <el-option label="是" :value="1" :key="1"></el-option>
                   <el-option label="否" :value="0" :key="0"></el-option>
                 </el-select>-->
                 <el-switch
                         v-model="formData.state "
                         :active-value="1"
                         :inactive-value="0"
                         active-color="#13ce66"
                 >
                 </el-switch>
               </el-form-item>
             </el-col>
            </el-row>
          </el-form>
          <div v-if="routeType !== 3">
            <div class="divRightTitleDiv">
              <div class="divRightTitle" style="margin-top: 5px">添加问卷题目
                <div class="titleBiao"></div></div>
            </div>
            <div class="tool-button">
              <el-button
                      size="small"
                      class="btn-new btnAdd"
                      @click="handleCreate(1)"
              ><img src="@/assets/images/common/addBtn.png"/>添加单选</el-button
              >
              <el-button
                      size="small"
                      class="btn-new btnReset"
                      @click="handleCreate(2)"
              ><img src="@/assets/images/common/addBtn.png"/>添加多选</el-button
              >
              <!--<el-button
                      size="small"
                      class="btn-new btnDel"
                      @click="handleCreate(3)"
              ><img src="@/assets/images/common/addBtn.png"/>添加填空</el-button
              >-->
            </div>
          </div>
        </el-col>
        <el-col :span="16" style="padding-left: 20px;">
          <div class="divRightTitleDiv">
            <div class="divRightTitle">{{ routeType !== 3 ? '已添加题目' :
              routeType === 3 ? '题目' : '' }}<div class="titleBiao"></div></div>
          </div>
          <el-form
                  class="user-edit-form-questions"
                  :model="formData"
                  label-width="85px"
          >
            <div class="questionDiv" v-for="(item, index) in formData.subjectParamList"
                 :key="index" :id="'questions-' + index">
              <div class="formSearchTitle">
                {{item.subjectType ===1 ? '单选题' :
                item.subjectType === 2 ? '多选题' :
                item.subjectType === 3 ? '填空题' : ''}}
              </div>
              <el-row>
                <el-col :span="17">
                  <el-form-item label="题目标题：">
                    <el-input v-model="item.name" :maxlength="30" placeholder="请输入"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="标题编码：">
                    <el-input v-model="item.code" :maxlength="6"
                              onkeyup="value = value.replace(/[\u4e00-\u9fa5]/ig,'')"
                              placeholder="请输入"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <div class="questionsOneDiv"
                   v-for="(itemOne, indexOne) in item.optionParamList"
                   :key="indexOne">
                <el-row v-if="item.subjectType !== 3" style="display: flex"><!--不是填空题-->
                  <el-col :span="11">
                    <el-form-item :label="`选项标题${indexOne + 1}：`">
                      <el-input v-model="itemOne.name" :maxlength="30" placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label="编码：" label-width="55px">
                      <el-input v-model="itemOne.code" :maxlength="6"
                                onkeyup="value = value.replace(/[\u4e00-\u9fa5]/ig,'')"
                                placeholder="输入"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label="分数：" label-width="55px">
                      <el-input v-model="itemOne.score" placeholder="输入"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5" v-if="routeType !== 3" style="width: 170px">
                    <div class="questionOneImg">
                      <img @click="questionOneDelelte(item.optionParamList, indexOne)"
                           src="@/assets/images/healthPlan/questions/questionDelete.png"/>
                      <img v-if="indexOne === 0"
                           src="@/assets/images/healthPlan/questions/questionPrevFirst.png"/>
                      <img @click="questionOnePrev(item.optionParamList, indexOne)" v-else
                           src="@/assets/images/healthPlan/questions/questionPrev.png"/>
                      <img v-if="indexOne + 1 === item.optionParamList.length"
                            src="@/assets/images/healthPlan/questions/questionNextLast.png"/>
                      <img @click="questionOneNext(item.optionParamList, indexOne)" v-else
                           src="@/assets/images/healthPlan/questions/questionNext.png"/>
                      <!--<el-popover
                              :ref="`popover-${index}-${indexOne}`"
                              placement="bottom-start"
                              width="570"
                              trigger="click"
                              @show="popoverStatus = true; popoverRefIndex = `${index}-${indexOne}`"
                              @hide="popoverStatus = false"
                      >
                        <danger-open v-if="popoverStatus"
                                     @change="handlePopoperClose"></danger-open>
                        &lt;!&ndash;v-if="popoverStatus"&ndash;&gt;
                        <img slot="reference" v-if="!itemOne.warn"
                             src="@/assets/images/healthPlan/questions/questionOneWarn.png"/>
                        <img slot="reference" v-else :title="'不吃早饭'"
                             src="@/assets/images/healthPlan/questions/questionOneWarnData.png"/>
                      </el-popover>-->
                    </div>
                  </el-col>
                </el-row>
                <!--<el-row style="display: flex;" v-else>&lt;!&ndash;填空题&ndash;&gt;
                  <el-col style="flex: 1;">
                    <el-form-item :label="`文本内容${indexOne + 1}：`">
                      <el-input v-model="itemOne.name" placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                  &lt;!&ndash;<el-col style="width: 40px;margin-left: 15px"  v-if="routeType !== 3">
                    <div class="questionOneImg questionOneTextImg">
                      <el-popover
                              :ref="`popover-${index}-${indexOne}`"
                              placement="bottom-start"
                              width="570"
                              trigger="click"
                              @show="popoverStatus = true; popoverRefIndex = `${index}-${indexOne}`"
                              @hide="popoverStatus = false"
                      >
                        <danger-open v-if="popoverStatus"
                                     @change="handlePopoperClose"></danger-open>
                        &lt;!&ndash;v-if="popoverStatus"&ndash;&gt;
                        <img slot="reference" v-if="!itemOne.warn"
                             src="@/assets/images/healthPlan/questions/questionOneWarn.png"/>
                        <img slot="reference" v-else :title="'不吃早饭'"
                             src="@/assets/images/healthPlan/questions/questionOneWarnData.png"/>
                      </el-popover>
                    </div>
                  </el-col>&ndash;&gt;
                </el-row>-->
              </div>
              <div class="questionImg" v-if="routeType !== 3">
                <el-button v-if="item.subjectType !== 3"
                           @click="questionOneCreate(item.optionParamList, item.subjectType)"
                           class="normalBtn" size="small">
                  <img src="@/assets/images/common/addBtnWhite.png"/>
                  添加选项</el-button>
                <div v-else></div>
                <div>
                <img @click="questionOneDelelte(formData.subjectParamList, index)"
                     src="@/assets/images/healthPlan/questions/questionDelete.png"/>
                <img v-if="index === 0"
                     src="@/assets/images/healthPlan/questions/questionPrevFirst.png"/>
                <img @click="questionOnePrev(formData.subjectParamList, index)" v-else
                     src="@/assets/images/healthPlan/questions/questionPrev.png"/>
                <img v-if="index + 1 === formData.subjectParamList.length"
                     src="@/assets/images/healthPlan/questions/questionNextLast.png"/>
                <img @click="questionOneNext(formData.subjectParamList, index)" v-else
                     src="@/assets/images/healthPlan/questions/questionNext.png"/>
                <img v-if="index === 0"
                     src="@/assets/images/healthPlan/questions/questionTopFirst.png"/>
                <img @click="questionTop(index)" v-else
                     src="@/assets/images/healthPlan/questions/questionTop.png"/>
                <img v-if="index + 1 === formData.subjectParamList.length"
                     src="@/assets/images/healthPlan/questions/questionsLowLast.png"/>
                <img @click="questionLow(index)" v-else
                     src="@/assets/images/healthPlan/questions/questionLow.png"/>
                </div>
              </div>
            </div>
          </el-form>
        </el-col>
      </el-row>

      <div style="text-align: center;margin-top: 20px;">
        <el-button class="cancelBtn" size="small" @click="$router.go(-1)">返回</el-button>
        <el-button class="sureBtn" size="small"
                   v-if="routeType === 1" type="primary" @click="onSubmit">保存</el-button>
        <el-button class="sureBtn" size="small"
                   v-if="routeType === 2" type="primary" @click="onSubmit">修改</el-button>
      </div>
  </div>
</template>
<script>
import DangerOpen from '~/src/components/date_select/danger_open.vue';

export default {
  name: 'questionsEdit',
  components: {
    DangerOpen,
  },
  data() {
    return {
      formData: {
        name: '',
        questionType: 4,
        state: 1,
        sortType: '',
        code: '',
        intro: '',
        subjectParamList: [],
      },
      popoverStatus: false,
      popoverRefIndex: '',
      sortTypeList: [],
      params: {
        pageNo: 1,
        pageSize: 15,
        total: 0,
      },
      routeType: 1,
      rules: {
        name: [{ required: true, message: '请输入问卷名称' }],
        questionType: [{ required: true, message: '请选择问卷类型' }],
        state: [{ required: true, message: '请选择是否启用' }],
        sortType: [{ required: true, message: '请选择问卷分类' }],
      },
    };
  },
  methods: {
    async getDetail() { // 详情数据
      const reqBody = this.$route.params.id;
      const res = await this.$api.userFollowInterface.getTemplateQuestionDetail(reqBody);
      const { data } = res.data;
      this.formData.name = data.name;
      this.formData.questionType = data.questionType;
      this.formData.state = data.state;
      this.formData.sortType = data.sortType;
      this.formData.code = data.code;
      this.formData.intro = data.intro;
      const getQuestionsList = [];
      data.subjectDTOList.forEach((value) => {
        const Value = value;
        Value.optionParamList = Value.optionDTOList;
        delete Value.optionDTOList;
        getQuestionsList.push(Value);
      });
      this.formData.subjectParamList = getQuestionsList;
      /* this.formData.subjectParamList.push(
        { subjectType: 1,
          name: '您感到手脚心发热吗？',
          code: '1',
          optionParamList: [
            { name: '有', code: '1', score: '10' },
            { name: '没有', code: '2', score: '20' },
          ],
        },
        { subjectType: 2,
          name: '患病情况？',
          code: '2',
          optionParamList: [
            { name: '高血压', code: '1', score: '5' },
            { name: '糖尿病', code: '2', score: '7' },
            { name: '肥胖症', code: '3', score: '8' },
            { name: '骨质疏松', code: '4', score: '10' },
          ],
        },
        { subjectType: 2,
          name: '您的饮食口味？',
          code: '3',
          optionParamList: [
            { name: '清淡', code: '1', score: '1' },
            { name: '咸', code: '2', score: '2' },
            { name: '甜', code: '3', score: '3' },
            { name: '冷', code: '4', score: '4' },
            { name: '油炸', code: '5', score: '5' },
          ],
        },
        { subjectType: 3,
          name: '您的其他运动爱好？',
          code: '4',
          optionParamList: [
            { name: '跑步' },
            { name: '篮球' },
            { name: '骑自行车' },
          ],
        },
      );*/
    },
    handleCreate(subjectType) { // 添加大题目
      const SubjectType = subjectType;
      if (SubjectType === 1 || SubjectType === 2) {
        this.formData.subjectParamList.push({ subjectType: SubjectType, name: '', code: '', optionParamList: [{ name: '', code: '', score: '' }] });
      } else if (SubjectType === 3) {
        this.formData.subjectParamList.push({ subjectType: SubjectType, name: '', code: '', optionParamList: [] });
      }
    },
    questionTop(index) { // 放到大题目首位
      const item = this.formData.subjectParamList[index];
      this.formData.subjectParamList.unshift(item);
      this.formData.subjectParamList.splice(index + 1, 1);
    },
    questionLow(index) { // 放到大题目末位
      const item = this.formData.subjectParamList[index];
      this.formData.subjectParamList.push(item);
      this.formData.subjectParamList.splice(index, 1);
    },
    questionOneCreate(optionParamList, type) { // 增加题目选项
      const Type = type;
      if (Type === 1 || Type === 2) {
        optionParamList.push({ name: '', code: '', score: '' });
      } else if (Type === 3) {
        optionParamList.push({ name: '' });
      }
    },
    questionOneDelelte(optionParamList, indexOne) { // 删除题目选项/题目，根据传入list删除
      optionParamList.splice(indexOne, 1);
    },
    questionOnePrev(optionParamList, indexOne) { // 下换到上，根据传入list更换
      const item = optionParamList[indexOne - 1];
      this.$set(optionParamList, indexOne - 1, optionParamList[indexOne]);
      this.$set(optionParamList, indexOne, item);
    },
    questionOneNext(optionParamList, indexOne) { // 上换到下，根据传入list更换
      const item = optionParamList[indexOne + 1];
      this.$set(optionParamList, indexOne + 1, optionParamList[indexOne]);
      this.$set(optionParamList, indexOne, item);
    },
    handlePopoperClose(data) {
      this.popoverStatus = false;
      const Index = `popover-${this.popoverRefIndex}`;
      this.$refs[Index][0].doClose();
      const Item = this.popoverRefIndex.split('-')[0];
      const ItemOne = this.popoverRefIndex.split('-')[1];
      this.formData.subjectParamList[Item].optionParamList[ItemOne].warn = data.name;
    },
    async getSystemParamByCode(code) {
      const res = await this.$api.userManagerInterface.getSystemParamByCode(code);
      const { data } = res.data;
      this.sortTypeList = data;
    },
    async onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (this.formData.subjectParamList.length === 0) {
            return this.$message.warning('请添加问卷题目');
          }
          const noParamInputList = []; // 问卷题目没填完整的集合
          this.formData.subjectParamList.forEach((paramValue, paramIndex) => {
            if (paramValue.name === '') {
              noParamInputList.push(paramIndex);
            }
            paramValue.optionParamList.forEach((paramValueChild) => {
              if (paramValueChild.name === '') {
                noParamInputList.push(paramIndex);
              }
            });
          });
          if (noParamInputList.length > 0) {
            // 开始滑动
            const anchor = this.$el.querySelector(`#questions-${noParamInputList[0]}`);
            document.documentElement.scrollTop = anchor.offsetTop;
            return this.$message.warning('请填写完整问卷题目/编码');
          }
          const reqBody = Object.assign({}, this.formData);
          reqBody.subjectParamList.forEach((value, index) => {
            const Value = value;
            Value.sortIndex = index + 1;
            Value.optionParamList.forEach((valueChild, indexChild) => {
              const ValueChild = valueChild;
              ValueChild.sortIndex = indexChild + 1;
            });
          });
          if (this.routeType === 1) {
            await this.$api.userFollowInterface.saveTemplateQuestion(reqBody);
          } else if (this.routeType === 2) { // 编辑传id
            reqBody.id = this.$route.params.id;
            await this.$api.userFollowInterface.updateTemplateQuestion(reqBody);
          }
          this.$message.success('操作成功');
          this.cancel();
        }
      });
    },
    cancel() {
      this.$router.go(-1);
    },
  },
  mounted() {
    this.getSystemParamByCode('ZY007'); // 获取问卷分类
    const route = this.$route;
    if (route.meta.type === 1) {
      this.routeType = 1;
    } else if (route.meta.type === 2) {
      this.routeType = 2;
      this.getDetail();
    } else if (route.meta.type === 3) {
      this.routeType = 3;
      this.getDetail();
    }
  },
};
</script>
<style lang="scss" scoped>
  .user-edit {
    margin-top: -15px;
    /*/deep/.el-input__inner, /deep/.el-textarea__inner {
      background-color: #F4F4F6 !important;
    }*/
    .user-edit-form {
      margin-top: 10px;
      padding-right: 20px;
      border-right: 1px solid #F4F4F6;
    }
    .user-edit-form-questions {
      margin-top: 5px;
    }
    .divRight{
      flex: 1;
      .divRightTitleDiv{
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        .divRightTitle{
          font-size: 18px;
          color: #333333;
          font-weight: bold;
          span{
            color: #4991FD;
            font-size: 18px;
            margin-right: 9px;
          }
        }
      }
    }
    .tool-button{
      margin-top: 20px;
      .el-button{
        width: 110px;
        margin-left: 10px;
        margin-bottom: 10px;
      }
    }
    .questionDiv{
      padding: 15px 15px 15px 10px;
      margin-top: 20px;
      background: #F6F8FC;
      border-radius: 10px;
      .formSearchTitle{
        font-size: 14px;
        margin:0 0 20px 18px;
        position: relative;
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
      .questionsOneDiv{
        .questionOneImg{
          margin-left: 10px;
          img{
            width: 40px;
            margin-left: 7px;
            cursor: pointer;
          }
          &.questionOneTextImg{
            justify-content: flex-end;
            width: 40px;
            margin-left: 0;
            img{
              margin-left: 0;
            }
          }
        }
      }
      .questionImg{
        display: flex;
        margin: 0 0 0 5px;
        justify-content: space-between;
        border-top: 1px dashed #DDE0E6;
        padding-top: 20px;
        .normalBtn{
          margin-right: 10px;
          width: 110px;
          height: 40px;
          background: #36BF2F;
          border-radius: 20px;
          color: white;
          border: none;
          text-align: center;
          padding-left: 0;
          img{
            width: 16px;
            height: 16px;
            margin: 0 4px -3px 15px;
          }
        }
        img{
          width: 40px;
          margin-left: 10px;
          cursor: pointer;
        }
      }
    }
  }
</style>
