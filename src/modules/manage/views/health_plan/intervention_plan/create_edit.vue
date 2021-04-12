<template>
  <div class="create-edit">
    <div class="divRightTitle" v-if="routeType === 1"><span>|</span>新增-健康信息</div>
    <div class="divRightTitle" v-else-if="routeType === 2"><span>|</span>修改-健康信息</div>
    <div class="divRightTitle" v-else-if="routeType === 3"><span>|</span>查看-健康信息</div>
    <el-form ref="form"
      :inline="false"
      :label-position="labelPosition"
      :model="form"
      :rules="rules"
      label-width="85px"
      class="form-inline"
    >
      <el-form-item label="选择客户：" prop="clientName" class="healthPlanInput">
          <!--<el-button type="primary" size="small" @click="selectUser">选择</el-button>-->
          <!--<p class="selectP" style="background: #F4F4F6;"
             @click="routeType === 1 ? selectUser() : ''">
            <span class="selectPlaceHolder" v-if="form.userList.length === 0">请选择客户</span>
            <span class="selectName" v-else>{{form.userList[0].name}}</span>
            <img v-if="routeType === 1" class="selectIcon" src="@/assets/images/selectIcon.png"/>
          </p>-->
          <el-popover
                  ref="userPopover"
                  placement="bottom-start"
                  width="540"
                  trigger="click"
                  :disabled="!!$route.params.id"
                  @show="popoverStatus = true"
                  @hide="popoverStatus = false"
                  >
            <select-user v-if="popoverStatus" @change="handlePopoperClose"></select-user>
            <el-input :class="`select-user-trigger ${$route.params.id ? 'disabled' : ''}`"
                      style="width: 230px"
                      slot="reference" disabled v-model="form.clientName" placeholder="请选择客户">
              <i :class="`el-icon-arrow-${popoverStatus ? 'up' : 'down'}`" slot="suffix"></i>
            </el-input>
          </el-popover>
      </el-form-item>
      <div class="formSearchTitle"><span class="dianLv"></span>主要疾病</div>
      <el-form-item label="异常信息" class="form-item">
        <div class="unusual-list" v-if="form.reportAbnormalList">
          <el-tag
            class="unusual-tag" :class="'unusual-tag' + it.dangerLevel"
            v-for="it in form.reportAbnormalList"
            :key="it.id"
          >
            <img :src="require(`@/assets/images/healthPlan/unusual${it.dangerLevel}.png`)"/>
            <span>{{ it.abnormalName }}</span>
          </el-tag>
        </div>
        <p class="noneText" v-if="!form.reportAbnormalList">选择客户后会自动加载TA的疾病异常信息</p>
      </el-form-item>
      <div class="formSearchTitle"><span class="dianLv"></span>生活方式情况</div>
      <div class="result">
        <!--<div class="life-state">
          <p>健康状况：</p>
          <span v-if="!form.questionLifestyleFamilyHistory">无</span>
          <span v-if="form.questionLifestyleFamilyHistory"
          >家族史：{{
                  form.questionLifestyleFamilyHistory.realtion +
                    '：' +
                    form.questionLifestyleFamilyHistory.diseaseName
                }}</span
          >
        </div>-->
        <div class="life-style">
          <!--<p>生活方式：</p>-->
          <!--<span v-if="!form.questionLifestyleParamValueList">无</span>-->
          <p class="nameP">
            <img src="@/assets/images/healthPlan/lifestyle1.png"/>饮食：
            <span>{{form.questionLifestyle1.paramValue || '-'}}</span>
          </p>
          <p class="nameP"><img src="@/assets/images/healthPlan/lifestyle2.png"/>吸烟：
            <span>{{form.questionLifestyle2.paramValue || '-'}}</span>
          </p>
          <p class="nameP"><img src="@/assets/images/healthPlan/lifestyle3.png"/>饮酒：
            <span>{{form.questionLifestyle3.paramValue || '-'}}</span>
          </p>
          <p class="nameP"><img src="@/assets/images/healthPlan/lifestyle4.png"/>精神：
            <span>{{form.questionLifestyle4.paramValue || '-'}}</span>
          </p>
          <p class="nameP"><img src="@/assets/images/healthPlan/lifestyle5.png"/>睡眠：
            <span>{{form.questionLifestyle5.paramValue || '-'}}</span>
          </p>
        </div>
      </div>
      <div class="formSearchTitle"><span class="dianLv"></span>健康监测</div>
      <el-form-item label="" class="form-item" style="margin-bottom: 0">
        <div class="supervise-con">
          <div class="header">
            <el-radio-group
              v-model="form.superviseSelected"
              @change="tagClickHandler"
            >
              <el-radio-button
                :label="idx"
                v-for="(it, idx) in superviseList"
                :key="it.name"
                >{{ it.name }}</el-radio-button
              >
            </el-radio-group>
            <div class="rowTitleParentRight">
              <div v-if="form.type === 1">
                <span style="background-color: #4991FD"></span>
                <label>收缩压</label>
                <span style="background-color: #31C529"></span>
                <label>舒张压</label>
              </div>
              <div v-else-if="form.type === 2">
                <span style="background-color: #4991FD"></span>
                <label>餐后血糖</label>
                <span style="background-color: #31C529"></span>
                <label>空腹血糖</label>
              </div>
              <div v-else-if="form.type === 3">
                <span style="background-color: #4991FD"></span>
                <label>体重</label>
              </div>
              <div v-else-if="form.type === 4">
                <span style="background-color: #4991FD"></span>
                <label>步数</label>
              </div>
            </div>
          </div>

          <div class="content">
            <div class="noDataLine" v-if="form.healthPlanXList.length === 0">
              <img src="@/assets/images/noDataLine.png"/>
              <span>暂无数据</span>
            </div>
            <line-chart :chart-data="form.healthPlanYList"
                        :sectionName="form.healthPlanName"
                        :sectionXList="form.healthPlanXList" v-else/>
          </div>
        </div>
      </el-form-item>
      <div class="divRightTitle"><span>|</span>健康方案</div>
      <el-form-item label="方案名称：" prop="name" class="healthPlanInput">
        <el-input
                v-model="form.name"
                placeholder="请输入"
                style="width: 230px;"
                :maxlength="30"
                :disabled="routeType === 3"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="开始时间：" prop="startTime" class="healthPlanInput">
        <el-date-picker
                v-model="form.startTime"
                :picker-options="pickerStartTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择开始时间" style="width: 230px"
                :disabled="routeType === 3"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间：" prop="endTime" class="healthPlanInput">
        <el-date-picker
                v-model="form.endTime"
                :picker-options="pickerEndTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择结束时间" style="width: 230px"
                :disabled="routeType === 3"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item style="margin-bottom: 0">
        <div class="top">
          <div class="action">
            <span class="name">生活方式</span>
            <el-popover class="selectP"
                        v-if="routeType !== 3"
                        ref="lifestylePopover"
                        placement="bottom"
                        width="545"
                        trigger="click"
                        @show="openCheckVisible = true"
                        @hide="handleLiftStyleClose">
              <lifestyle-open v-if="openCheckVisible"
                             @change="handleLiftStyleSelectChange"
                             @cancel="handleLiftStyleClose">
              </lifestyle-open>
              <el-input class="select-user-trigger select-user-trigger-white"
                        slot="reference" disabled placeholder="选择生活方式模板">
                <i :class="`el-icon-arrow-${openCheckVisible ? 'up' : 'down'}`"
                   slot="suffix"></i>
              </el-input>
            </el-popover>
          </div>
          <div class="actionInput">
            <span class="life-advice">生活建议：</span>
            <div class="sport-form sportTag" style="height: 120px;">
              <el-input
                      type="textarea"
                      :rows="4"
                      v-model="form.lifeAdvice"
                      placeholder="请输入"
                      :maxlength="4000"
                      show-word-limit
                      :disabled="routeType === 3"
              ></el-input>
            </div>
          </div>
        </div>

        <div class="bottom">
          <div class="action">
            <span class="name">运动方式</span>
            <el-popover class="selectP"
                        v-if="routeType !== 3"
                        ref="sportPopover"
                        placement="bottom"
                        width="545"
                        trigger="click"
                        @show="openCheckSportVisible = true"
                        @hide="handleSportClose">
              <sport-open v-if="openCheckSportVisible"
                              @change="handleSportSelectChange"
                              @cancel="handleSportClose">
              </sport-open>
              <el-input class="select-user-trigger select-user-trigger-white"
                        slot="reference" disabled placeholder="选择运动">
                <i :class="`el-icon-arrow-${openCheckSportVisible ? 'up' : 'down'}`"
                   slot="suffix"></i>
              </el-input>
            </el-popover>
          </div>
          <div class="actionInput">
            <!--<span class="life-advice">运动建议：</span>-->
            <div class="sport-form sportTag">
              <el-tag
                      class="unusual-tag"
                      v-for="(it, index) in form.sportAdvice"
                      :key="it.id"
              >
                <span>{{ it }}</span>
                <span @click="delSportAdviceOne(index)" v-if="routeType !== 3"
                      class="delSpan"></span>
              </el-tag>
              <p class="noneText" v-if="form.sportAdvice.length === 0" style="margin-top: 18px;">
                请选择运动方式
              </p>
            </div>
          </div>
        </div>

      </el-form-item>

      <div class="footer">
        <el-button size="small" class="cancelBtn" @click="cancel">返回</el-button>
        <el-button type="primary" v-if="routeType === 1" class="sureBtn" size="small" @click="save">
          保存
        </el-button>
        <el-button type="primary" v-if="routeType === 2" class="sureBtn" size="small" @click="save">
          修改
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import elImportTplMdl from './el_modal/el_import_tpl_mdl.vue';
import elImportSport from './el_modal/el_import_sport.vue';
import elImportLife from './el_modal/el_import_life.vue';
import SelectUser from '@/components/date_select/medical_history_select_user.vue';
import LineChart from '../../home/el_modal/line_chart.vue';
import LifestyleOpen from '@/components/date_select/lifestyle_open.vue';
import SportOpen from '@/components/date_select/sport_open.vue';
export default {
  name: 'create_edit',
  components: {
    LineChart,
    SelectUser,
    LifestyleOpen,
    SportOpen,
  },
  data() {
    return {
      routeType: 1, // 1新增 2编辑
      labelPosition: 'top',
      openCheckVisible: '', // 生活方式
      openCheckSportVisible: '', // 生活方式
      form: {
        clientId: '',
        sugarType: 1,
        type: 1,
        userList: [],
        lifeAdvice: '',
        sportAdvice: [],
        superviseSelected: 0,
        xAxis: [],
        yList: [],
        reportAbnormalList: null,
        questionLifestyleFamilyHistory: null,
        questionLifestyleParamValueList: null,
        questionLifestyle1: { valueInfo: '饮食', paramValue: '', warn: false },
        questionLifestyle2: { valueInfo: '吸烟', paramValue: '', warn: false },
        questionLifestyle3: { valueInfo: '饮酒', paramValue: '', warn: false },
        questionLifestyle4: { valueInfo: '精神', paramValue: '', warn: false },
        questionLifestyle5: { valueInfo: '睡眠', paramValue: '', warn: false },
        superviseListMap: null,
        afterDinnerListMap: null,
        dropdown: {
          // 下拉数据
          selectValue: 0, // 选中的下拉数据项
          type: 1,
          list: [],
        },
        clientName: '',
        name: '', // 方案名称
        startTime: '', // 开始时间
        endTime: '', // 结束时间
        healthPlanName: [], // 随访任务折线图
        healthPlanXList: [],
        healthPlanYList: [],
      },
      lineCharts: null,
      lineChartsOptions: {
        id: 'health-charts',
        gradientColor: true,
        centerZero: true,
        yAxisName: '值',
        tooltipUnit: null,
        legend: ['血压', '血糖', '体重', '运动'],
      },
      superviseList: [
        {
          name: '血压',
          type: 1,
          selected: true,
          dropdown: {
            type: 1,
            list: [
              {
                name: '收缩压',
                value: 0,
                type: 2,
              },
              {
                name: '舒张压',
                value: 1,
                type: 2,
              },
            ],
          },
        },
        {
          name: '血糖',
          type: 2,
          selected: false,
          dropdown: {
            type: 2,
            list: [
              {
                name: '空腹血糖',
                value: 0,
                type: 1,
              },
              {
                name: '餐后血糖',
                value: 1,
                type: 1,
              },
            ],
          },
        },
        {
          name: '体重',
          type: 3,
          selected: false,
          dropdown: {
            type: 3,
            list: [
              {
                name: '体重',
                value: 0,
                type: 3,
              },
            ],
          },
        },
        {
          name: '运动',
          type: 4,
          selected: false,
          dropdown: {
            type: 4,
            list: [
              {
                name: '步数',
                value: 0,
                type: 4,
              },
            ],
          },
        },
      ],
      pickerStartTime: {
        disabledDate: (time) => {
          if (this.form.endTime) {
            const endTime = new Date(this.form.endTime);
            return time.getTime() > (new Date(endTime).getTime() - 8.64e7)
              || time.getTime() < (Date.now() - 8.64e7);
          }
          return time.getTime() < Date.now() - 8.64e7;
        },
      },
      pickerEndTime: {
        disabledDate: (time) => {
          if (this.form.startTime) {
            const startTime = new Date(this.form.startTime);
            return time.getTime() < new Date(startTime).getTime() - 8.64e7;
          }
          return time.getTime() < Date.now() - 8.64e7;
        },
      },
      // 下拉弹窗
      popoverStatus: false,
      selectUser: null,
      rules: {
        clientName: [{ required: true, message: '请选择客户' }],
        name: [{ required: true, message: '请输入方案名称' }],
        startTime: [{ required: true, message: '请选择开始时间' }],
        endTime: [{ required: true, message: '请选择结束时间' }],
      },
    };
  },
  mounted() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      const route = this.$route;
      if (route.meta.type === 'intervention_plan_create') {
        this.routeType = 1;
        this.getCharts();
      } else if (route.meta.type === 'intervention_plan_edit') {
        this.routeType = 2;
        this.getDetail();
      } else if (route.meta.type === 'intervention_plan_view') {
        this.routeType = 3;
        this.getDetail();
      }
    },
    /**
     * 点击tag标签事件
     */
    tagClickHandler(idx) {
      if (!this.form.clientId) {
        return this.$message.warning('请先选择客户');
      }
      this.superviseList.forEach((it) => {
        const t = it;
        t.selected = false;
      });
      this.form.superviseSelected = idx;
      this.superviseList[idx].selected = true;
      this.form.type = this.superviseList[idx].type;
      this.form.dropdown.selectValue = 0;
      this.form.sugarType = 1;

      this.getCharts();
    },
    /**
     * 重置用户
     */
    resetUser() {
      const idx = 0;
      this.form.clientId = '';
      this.form.superviseSelected = idx;
      this.superviseList[idx].selected = true;
      this.form.type = this.superviseList[idx].type;
      this.form.dropdown.selectValue = 0;
      this.form.sugarType = 1;
      this.form.reportAbnormalList = null;
      this.form.questionLifestyleFamilyHistory = null;
      this.form.questionLifestyleParamValueList = null;
      this.form.superviseListMap = null;
      this.form.afterDinnerListMap = null;
    },
    /**
     * 监管数据下拉框事件
     */
    /* dropdownChange() {
      const selectValue = this.form.dropdown.selectValue;
      const type = this.form.dropdown.type;

      if (type === 2) {
        if (selectValue === 0) {
          this.form.sugarType = 1;
        } else if (selectValue === 1) {
          this.form.sugarType = 2;
        }
        this.getCharts();
      }

      if (
        this.form.superviseListMap &&
        Object.keys(this.form.superviseListMap).length
      ) {
        const xAxis = [];
        const yList = [];
        Object.keys(this.form.superviseListMap).forEach((k) => {
          let value;
          const name = k;
          if (type === 1) {
            if (selectValue === 0) {
              value = this.form.superviseListMap[k].sbp;
            } else if (selectValue === 1) {
              value = this.form.superviseListMap[k].dbp;
            }

            xAxis.push(name);
            yList.push(value);
          } else if (type === 3) {
            const weight = this.form.superviseListMap[k].weight;
            xAxis.push(name);
            yList.push(weight);
          } else if (type === 4) {
            const steps = this.form.superviseListMap[k].steps;
            xAxis.push(name);
            yList.push(steps);
          }
        });

        this.form.xAxis = xAxis;
        this.form.yList = yList;
        this.changeChart(this.form.xAxis, this.form.yList);
      }
    }, */
    /**
     * 获取图表信息
     */
    async getCharts() {
      const reqBody = {
        clientId: this.form.clientId,
        sugarType: this.form.sugarType,
        type: this.form.type, // 监管数据类型：1血压 2血糖 3体重 4运动
      };
      if (!reqBody.clientId) return;
      const res = await this.$api.interventionPlanInterface.getInterveneSchemeCharts(
        reqBody,
      );
      const { data } = res.data;

      this.form.reportAbnormalList = data.reportAbnormalList || [];
      this.form.questionLifestyleFamilyHistory =
        data.questionLifestyleFamilyHistory || null;
      this.form.questionLifestyleParamValueList =
        data.questionLifestyleParamValueList || [];
      if (this.form.questionLifestyleParamValueList.length > 0) {
        this.form.questionLifestyleParamValueList.forEach((value) => {
          if (value.paramNo === 'j01') {
            this.form.questionLifestyle1.paramValue = value.valueInfo;
          } else if (value.paramNo === 'j05') {
            this.form.questionLifestyle2.paramValue = value.valueInfo;
          } else if (value.paramNo === 'f01') {
            this.form.questionLifestyle3.paramValue = value.valueInfo;
          } else if (value.paramNo === 'g04') {
            this.form.questionLifestyle4.paramValue = value.valueInfo;
          } else if (value.paramNo === 'j20') {
            this.form.questionLifestyle5.paramValue = value.valueInfo;
          }
        });
      }
      this.form.superviseListMap = data.superviseListMap || [];
      if (data.afterDinnerListMap) {
        this.form.afterDinnerListMap = data.afterDinnerListMap || [];
      }
      setTimeout(() => {
        this.loadChart();
      }, 100);
      /* } */
    },
    loadChart() {
      if (this.form.superviseListMap.length > 0) {
        const xAxis = [];
        const yList = [];
        const valueHigh = [];
        const valueLow = [];
        this.form.superviseListMap.forEach((k, index) => {
          const nameLineList = [];
          const name = k.key;
          if (this.form.type === 1) {
            valueHigh.push(k.object.sbp);// 收缩压(高)
            valueLow.push(k.object.dbp);// 收缩压(低)
            xAxis.push(name);
            nameLineList.push('收缩压');
            nameLineList.push('舒张压');
          } else if (this.form.type === 2) { // 血糖
            valueHigh.push(this.form.afterDinnerListMap[index].object.sugar); // 餐后(高)
            valueLow.push(k.object.sugar); // 空腹(低)
            xAxis.push(name);
            nameLineList.push('餐后血糖');
            nameLineList.push('空腹血糖');
          } else if (this.form.type === 3) {
            const value = k.object.weight;
            xAxis.push(name);
            valueHigh.push(value);
            nameLineList.push('体重');
          } else if (this.form.type === 4) {
            const value = k.object.steps;
            xAxis.push(name);
            valueHigh.push(value);
            nameLineList.push('步数');
          }
          this.form.healthPlanName = nameLineList;
        });
        if (this.form.type === 1 || this.form.type === 2) {
          yList.push(valueHigh);
          yList.push(valueLow);
        } else {
          yList.push(valueHigh);
        }
        this.form.healthPlanXList = xAxis;
        this.form.healthPlanYList = yList;
        // this.form.xAxis = xAxis;
        // this.form.yList = yList;
        // this.lineCharts = new LineCharts({ $echarts: echarts });
        // this.changeChart(this.form.xAxis, this.form.yList);
      } else {
        this.form.healthPlanName = [];
        this.form.healthPlanXList = [];
        this.form.healthPlanYList = [];
      }
    },
    /**
     * 加载图表
     */
    changeChart(xAxis, yList) {
      const {
        id,
        yAxisName,
        tooltipUnit,
        centerZero,
        legend,
      } = this.lineChartsOptions;
      this.lineCharts.setCharts({
        id,
        legend,
        centerZero,
        yAxisName,
        tooltipUnit,
        xAxis,
        yList,
        oblique: false,
      });
      // this.lineCharts.bind()
    },
    /**
     * 获取干预方案明细
     */
    async getDetail() {
      const reqBody = { id: this.$route.params.id };
      const res = await this.$api.interventionPlanInterface.getInterveneScheme(
        reqBody,
      );
      const { data } = res.data;
      this.form.name = data.name;
      if (data.startTime) { this.form.startTime = data.startTime.split(' ')[0]; }
      if (data.endTime) { this.form.endTime = data.endTime.split(' ')[0]; }
      this.form.lifeAdvice = data.lifeAdvice;
      if (data.sportAdvice) { this.form.sportAdvice = data.sportAdvice.split(','); }
      this.form.clientId = data.clientId;
      this.form.clientName = data.clientName;
      this.form.userList = [
        {
          name: data.clientName,
          id: data.clientId,
        },
      ];
      this.getCharts();
    },
    // 关闭弹窗选择列表 push数组
    handleLiftStyleSelectChange(dataList) {
      this.$refs.lifestylePopover.doClose();
      this.openCheckVisible = false;
      dataList.forEach((value) => {
        this.form.lifeAdvice += value.guideContent;
      });
    },
    handleLiftStyleClose() {
      this.openCheckVisible = false;
      this.$refs.lifestylePopover.doClose();
    },
    // 关闭弹窗选择列表 push数组 运动
    handleSportSelectChange(dataList) {
      this.$refs.sportPopover.doClose();
      this.openCheckSportVisible = false;
      dataList.forEach((value) => {
        // this.form.lifeAdvice += value.guideContent;
        this.form.sportAdvice.push(value.name);
      });
    },
    handleSportClose() {
      this.openCheckSportVisible = false;
      this.$refs.sportPopover.doClose();
    },
    /**
     * 删除运动
     * @param index
     */
    delSportAdviceOne(index) {
      this.form.sportAdvice.splice(index, 1);
    },
    /**
     * 导入
     * @param type 1生活建议 2运动建议
     */
    singleImport(type) {
      this.$jDynamic.show({
        component: 'elImportTplMdl',
        data: {
          modalTitle: '导入',
          confirmfunc: async ({ selection }) => {
            if (type === 1) {
              this.form.lifeAdvice = selection.lifeName;
            } else if (type === 2) {
              this.form.sportAdvice = selection.sportName;
            }
          },
        },
        render: h => h(elImportTplMdl),
      });
    },
    singleImportLife() { // 导入生活方式
      this.$jDynamic.show({
        component: 'elImportLife',
        data: {
          modalTitle: '导入',
          confirmfunc: async ({ selection }) => {
            selection.forEach((value) => {
              this.form.lifeAdvice += value.guideContent;
            });
          },
        },
        render: h => h(elImportLife),
      });
    },
    singleImportSport() { // 导入运动
      this.$jDynamic.show({
        component: 'elImportSport',
        data: {
          modalTitle: '导入',
          confirmfunc: async ({ selection }) => {
            selection.forEach((value) => {
              this.form.sportAdvice.push(value.name);
            });
          },
        },
        render: h => h(elImportSport),
      });
    },
    handlePopoperClose(data) {
      this.$refs.userPopover.doClose();
      this.popoverStatus = false;
      this.form.clientName = data.name;
      this.form.clientId = data.id;
      this.$refs.form.validateField('clientId');
      this.getCharts();
    },
    /**
     * 取消
     */
    cancel() {
      this.$router.go(-1);
    },
    /**
     * 保存干预方案
     * @return {Promise<ElMessageComponent>}
     */
    async save() {
      this.$refs.form.validate(async (valid) => {
        const clientIds = [this.form.clientId];// this.form.userList.map(it => it.id);
        if (clientIds[0] === '') {
          return this.$message.warning('请选择客户');
        }
        if (!this.form.name) {
          return this.$message.warning('请输入方案名称');
        }
        if (!this.form.startTime) {
          return this.$message.warning('请选择开始时间');
        }
        if (!this.form.endTime) {
          return this.$message.warning('请选择结束时间');
        }
        if (valid) {
          const reqBody = {
            clientId: clientIds.length ? clientIds[0] : '',
            lifeAdvice: this.form.lifeAdvice,
            sportAdvice: this.form.sportAdvice.join(','),
            name: this.form.name,
            startTime: `${this.form.startTime} 00:00:00`,
            endTime: `${this.form.endTime} 23:59:59`,
          };

          if (this.routeType === 2) { // 编辑传id
            reqBody.id = this.$route.params.id;
          }
          await this.$api.interventionPlanInterface.saveInterveneScheme(reqBody);
          if (this.routeType === 1) {
            Object.assign(this.$data, this.$options.data());
          }
          this.$message.success('操作成功');
          this.cancel();
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.create-edit /deep/ {
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
  .formSearchTitle{
    font-size: 14px;
    color: #333333;
    display: flex;
    align-items: center;
    font-weight: bold;
    margin: 20px 0 15px 0;
    .dianLv{
      width: 5px;
      height: 5px;
      background: #31C529;
      border-radius: 50%;
      display: inline-block;
      margin-right: 6px;
    }
  }
  .red {
    color: #f00;
    font-style: normal;
  }
  /deep/ .select-user-trigger {
    .el-input__suffix{
      right: 15px;
    }
    input, i {
      cursor: pointer;
      border: none;
      background-color: #F4F4F6!important;
      /*&::placeholder{
        color: #666666;
      }*/
    }
    &.disabled {
      input, i {
        cursor: auto;
      }
    }
  }
  /deep/ .select-user-trigger-white{
    input, i {
      background-color: white!important;
    }
  }
  .form-title {
    color: #262626;
    /deep/ .el-input__inner{
      color: #333333;
    }
  }
  .el-form-item {
    background-color: #fff;
    &:nth-child(1) { // 用到
      .el-form-item__content {
        .form-title {
          padding: 20px 10px 0 0;
          display: flex;
        }
        .user-list {
          padding: 10px 10px 10px 32px;
        }
      }
    }
    &:nth-child(2) {
      .el-form-item__label {
        padding: 10px 10px 10px 32px;
        line-height: initial;
        border-bottom: 1px solid #efefef;
        width: 100%;
      }
      .el-form-item__content {
        padding: 10px 10px 10px 32px;
      }
    }
    &:nth-child(3) {
      .el-form-item__label {
        width: 100%;
        height: 60px;
        line-height: 60px;
        background: #4991FD;
        border-radius: 5px;
        padding-left: 22px;
        font-size: 16px;
        color: white!important;
      }
      .el-form-item__content {
        border-radius: 5px;
        border: 1px solid #F4F4F6;
        padding: 20px 20px 0 20px;
        margin-top: 12px;
        min-height: 134px;
      }
    }
    &:nth-child(4) {
      .el-form-item__label {
        padding: 10px 10px 10px 32px;
        line-height: initial;
        border-bottom: 1px solid #efefef;
        width: 100%;
        display: flex;
        justify-content: space-between;
      }
      .el-form-item__content {
        padding: 10px 32px 10px 32px;
        line-height: initial;
      }
    }
    &:nth-child(5) {
      .el-form-item__label {
        padding: 10px 10px 10px 32px;
        line-height: initial;
        border-bottom: 1px solid #efefef;
        width: 100%;
      }
      .el-form-item__content {
        line-height: initial;
        /*padding: 10px 32px 10px 90px;*/
      }
    }
    &:nth-child(6) {
      .el-form-item__label {
        padding: 10px 10px 10px 32px;
        line-height: initial;
        border-bottom: 1px solid #efefef;
        width: 100%;
      }
      .el-form-item__content {
        padding: 10px 32px 10px 32px;
        line-height: initial;
      }
    }
    &:nth-child(7) {
      .el-form-item__label {
        padding: 10px 10px 10px 32px;
        line-height: initial;
        border-bottom: 1px solid #efefef;
        width: 100%;
      }
      .el-form-item__content {
        /*padding: 10px 32px 10px 32px;*/
        line-height: initial;
      }
    }
    &:nth-child(8) {
      .el-form-item__label {
        padding: 10px 10px 10px 32px;
        line-height: initial;
        border-bottom: 1px solid #efefef;
        width: 100%;
      }
      .el-form-item__content {
        padding: 10px 32px 10px 32px;
        line-height: initial;
      }
    }
  }
  .form-item {
    .el-form-item__label {
      color: #262626;
    }
  }
  .user-list {
    .item {
      .el-tag {
        margin-right: 5px;
      }
    }
  }
  .unusual-list {
    .unusual-tag {
      margin-right: 22px;
      height: 48px;
      line-height: 45px;
      background-color: white;
      border-radius: 8px;
      border-width: 2px;
      padding: 0 40px 0 26px;
      margin-bottom: 20px;
      &.unusual-tag1{
        border-color: #31C529;
        box-shadow: 0px 0px 15px 0px rgba(49, 197, 41, 0.2);
      }
      &.unusual-tag2{
        border-color: #4991FD;
        box-shadow: 0px 0px 15px 0px rgba(73, 145, 253, 0.2);
      }
      &.unusual-tag3{
        border-color: #6C6CE5;
        box-shadow: 0px 0px 15px 0px rgba(108, 108, 229, 0.2);
      }
      &.unusual-tag4{
        border-color: #E6B058;
        box-shadow: 0px 0px 15px 0px rgba(230, 176, 88, 0.2);
      }
      &.unusual-tag5{
        border-color: #FE2B2A;
        box-shadow: 0px 0px 15px 0px rgba(254, 43, 42, 0.2);
      }
      img{
        width: auto;
        height: 16px;
        vertical-align: sub;
      }
      span{
        font-size: 14px;
        color: #333333;
      }
    }
  }
  .noneText{
    color: #97A6BD;
    font-size: 16px;
    margin-top: 35px;
    text-align: center;
  }
  .result {
    .life-state {
      display: flex;
    }
    .life-style {
      display: flex;
      flex-wrap: wrap;
      .nameP{
        width: 33%;
        font-size: 14px;
        color: #333333;
        margin-bottom: 10px;
        align-items: center;
        display: flex;
        img{
          width: 24px;
          height: 24px;
          margin-right: 10px;
        }
        span{
          &.red{
            color: #FE2B2A;
          }
        }
      }
      .con {
        margin-top: 5px;
        /*p {
          line-height: 30px;
        }*/
      }
    }
  }
  .supervise-con {
    .header {
      padding: 5px 0;
      background: none;
      box-shadow: none;
      display: flex;
      justify-content: space-between;
      .el-radio-button__inner{
        border-color: #4991FD;
      }
      .el-radio-button:first-child .el-radio-button__inner{
        border-radius: 8px 0px 0px 8px;
      }
      .el-radio-button:last-child .el-radio-button__inner{
        border-radius: 0 8px 8px 0;
      }
      .tag {
        display: inline-block;
        margin-right: 10px;
        color: #999;
        cursor: pointer;
        &.selected {
          color: #0d69ca;
        }
      }
      .select {
        float: right;
        .el-input__inner {
          background: none;
        }
      }
      .rowTitleParentRight{
        display: flex;
        align-items: center;
        margin-right: 24px;
        span{
          width: 10px;
          height: 3px;
          display: inline-block;
          margin: 0 8px 0 25px;
          vertical-align: middle;
        }
        label{
          font-size: 12px;
          font-weight: 400;
          color: #97A6BD;
        }
      }
    }
    .content {
      position: relative;
      .noDataLine{
        height: 490px;
        text-align: center;
        img{
          margin-top: 135px;
          width: 200px;
        }
        span{
          font-size: 14px;
          color: #97A6BD;
          display: block;
          margin-top: 15px;
        };
      }
      .no-more {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: #999;
      }
    }
  /*  .result {
      .life-state {
        display: flex;
      }
      .life-style {
        display: flex;
        .con {
          margin-top: 5px;
          p {
            line-height: 30px;
          }
        }
      }
    }*/
  }
  .healthPlanInput{
    margin-top: 20px;
    display: inline-block;
    margin-right: 30px;
    input::-webkit-input-placeholder {
      color: #999999;
    }
    input::-moz-placeholder{   /* Mozilla Firefox 19+ */
      color: #999999;
    }
    input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
      color: #999999;
    }
    input:-ms-input-placeholder { /* Internet Explorer 10-11 */
      color: #999999;
    }
    /deep/ .el-input__inner{
      background-color: #F4F4F6;
      }
    /deep/ .el-input.is-disabled .el-input__inner{
      color: #333333;
    }
    .el-form-item__label{
      padding-bottom: 0;
    }
    .el-form-item__content {
      display: inline-block;
      vertical-align: top;
    }
  }
  .top,.bottom{
    border: 1px solid #F4F4F6;
    margin-bottom: 30px;
    .action {
      height: 60px;
      background: #4991FD;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-right: 10px;
      .name{
        font-size: 16px;
        color: white;
        padding-left: 20px;
        font-weight: bold;
      }
      .selectP{
        width: 236px;
        padding: 0;
        /deep/ .el-input.is-disabled .el-input__inner{
          background-color: white;
        }
      }
      a {
        color: #4991fd;
        text-decoration: none;
      }
      .clear {
        margin-left: 5px;
      }
    }
    .actionInput{
      display: flex;
      margin: 20px 10px 10px 20px;
      .life-advice{
        color: #666666;
        width: 78px;
        font-size: 14px;
      }
      .sport-form {
        width: 100%;
        min-height: 90px;
        /*padding: 10px 20px 10px 20px;*/
       /* background: #F4F4F6;*/
        border-radius: 5px;
        /deep/ .el-textarea__inner{
          height: 110px;
          resize: none;
          background-color: #F4F4F6;
        }
        /deep/ .el-textarea.is-disabled .el-textarea__inner{
          color: #333333;
        }
        &.sportTag{
          .unusual-tag {
            margin-right: 22px;
            height: 48px;
            line-height: 45px;
            background-color: white;
            border-radius: 8px;
            border-width: 2px;
            padding: 0 40px 0 40px;
            margin-bottom: 20px;
            border-color: #97A6BD;
            position: relative;
          }
          .delSpan{
            background: url("../../../../../assets/images/healthPlan/closeTag.png") no-repeat;
            background-size: 100% 100%;
            width: 16px;
            height: 16px;
            right: 10px;
            top: 14px;
            position: absolute;
            display: inline-block;
            cursor: pointer;
            &:hover {
            background: url("../../../../../assets/images/body/closeChooseTabHover.png") no-repeat;
            background-size: 100% 100%;
            }
          }
          img{
            width: auto;
            height: 16px;
            position: absolute;
            right: 10px;
            top: 14px;
            cursor: pointer;
          }
          span{
            font-size: 14px;
            color: #333333;
          }
        }
      }
    }
  }

  .footer {
    text-align: center;
  }

  .el-textarea .el-input__count {
    bottom: -30px;
    background: none;
  }
}
</style>
