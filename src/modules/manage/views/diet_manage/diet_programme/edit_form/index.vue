<template>
  <div class="diet-form">
    <div class="diet-form_left" v-if="selectedData.length !==0 || clientName !== ''">
      <div class="diet-form_left-item">
        <p class="item-title">推荐摄入</p>
        <div class="table" v-if="leftList.cientDietIntake">
          <div class="table-column">
            <div>高</div>
            <div>{{leftList.cientDietIntake.high || 0}}人</div>
          </div>
          <div class="table-column">
            <div>中</div>
            <div>{{leftList.cientDietIntake.mid || 0}}人</div>
          </div>
          <div class="table-column">
            <div>低</div>
            <div>{{leftList.cientDietIntake.low || 0}}人</div>
          </div>
        </div>
      </div>
      <div class="diet-form_left-item">
        <p class="item-title">体型</p>
        <div class="table"  v-if="leftList.cientDietShape">
          <div class="table-column">
            <div>未知</div>
            <div>{{leftList.cientDietShape.unknow || 0}}人</div>
          </div>
          <div class="table-column">
            <div>偏瘦</div>
            <div>{{leftList.cientDietShape.thin || 0}}人</div>
          </div>
          <div class="table-column">
            <div>正常</div>
            <div>{{leftList.cientDietShape.normal || 0}}人</div>
          </div>
          <div class="table-column">
            <div>超重</div>
            <div>{{leftList.cientDietShape.overWeight || 0}}人</div>
          </div>
          <div class="table-column">
            <div>肥胖</div>
            <div>{{leftList.cientDietShape.obesity || 0}}人</div>
          </div>
        </div>
        <div class="diet-form_left-item">
          <p class="item-title">膳食相关问题</p>
          <div class="table">
            <div class="table-column"
            v-for="(item, index) in leftList.clientDietRelateDiseaseList" :key="index">
              <div>{{item.name}}</div>
              <div>{{item.total}}人</div>
            </div>
            <!-- <div class="table-column">
              <div>经常吃夜宵</div>
              <div>0人</div>
            </div> -->
          </div>
        </div>
        <!-- <div class="diet-form_left-item">
          <p class="item-title">MNA营养评定</p>
          <div class="table">
            <div class="table-column"
            v-for="(item, index) in leftList.clientDietBadHabitsList" :key="index">
              <div>{{item.name}}</div>
              <div>{{item.total}}人</div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <div class="diet-form_center">
      <div class="diet-type">
        <div class="diet-type-item" @click="isShowDietPagoda = true">
          <img src="@/assets/images/diet/diet_image1.png" alt="膳食平衡宝塔" />
          <div>
            <p class="title">中国居民</p>
            <p class="desc">膳食平衡宝塔</p>
          </div>
        </div>
        <div class="diet-type-item" @click="isShowDietPagodaGuide = true">
          <img src="@/assets/images/diet/diet_image2.png" alt="膳食指南" />
          <div>
            <p class="title">中国居民</p>
            <p class="desc">膳食指南</p>
          </div>
        </div>
        <div class="diet-type-item" @click="isShowDietPagodaExchange = true">
          <img src="@/assets/images/diet/diet_image3.png" alt="食物交换份" />
          <div>
            <p class="title">常见</p>
            <p class="desc">食物交换份</p>
          </div>
        </div>
      </div>
      <div class="diet-plan-box">
        <div class="title">新增膳食方案</div>
        <el-form label-position="left">
          <el-form-item label="日期范围: "
          label-width="80px" v-if="type !== 'info'">
            <!-- <span>*</span> -->
            <el-date-picker
              v-model="stateDate"
              type="date"
              :min-date="new Date()"
              value-format="yyyy-MM-dd"
              placeholder="开始时间"
              style="width: 121px"
            >
            </el-date-picker>
            <span style="margin: 0 9px">-</span>
            <el-date-picker
              v-model="endDate"
              type="date"
              :min-date="stateDate"
              value-format="yyyy-MM-dd"
              placeholder="结束时间"
              style="width: 121px"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="日期范围: " label-width="80px" v-else>
            <el-date-picker
              v-model="stateDate"
              type="date"
              disabled
              value-format="yyyy-MM-dd"
              placeholder="开始时间"
              style="width: 121px"
            >
            </el-date-picker>
            <span style="margin: 0 9px">-</span>
            <el-date-picker
              v-model="endDate"
              disabled
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="结束时间"
              style="width: 121px"
            >
            </el-date-picker>
          </el-form-item>
          <div>
            <div class="item-title" style="margin-bottom: 20px">适用人员</div>
          </div>
          <el-form-item
            style="position: relative"
            label="添加人员: "
            label-width="80px"
            v-if="type !== 'info'"
          >
            <div @click="isShowPeopleSelect = true"
            class="select-mask" v-if="type === 'add' && !personclientId">
              <el-select
                value=""
                style="width: 100%"
                placeholder="请选择（多选）"
              >
              </el-select>
            </div>
            <div class="select-mask" v-else>
              <el-select
                value=""
                style="width: 100%"
                placeholder="请选择（多选）"
              >
              </el-select>
            </div>
            <el-people-select
              v-if="isShowPeopleSelect"
              :active.sync="isShowPeopleSelect"
              @change="onSelectUser"
              class="el-people-select"
            ></el-people-select>
          </el-form-item>
          <el-form-item
            class="dashed-border"
            label="已选人员: "
            label-width="80px"
          >
            <div class="selected-box" v-if="type === 'add'  && !personclientId">
              <div class="selected-item" v-for="(item, index) in selectedData" :key="index">
                <span>{{item.name}}</span>
                <i class="el-icon-error" @click="selectedDataDelect(index)"></i>
              </div>
            </div>
            <div class="selected-box" v-else>
              <div class="selected-item">
                <span>{{clientName}}</span>
              </div>
            </div>
          </el-form-item>
          <div class="diet-formulate">
            <div
              class="diet-formulate-head"
              style="margin-bottom: 20px; position: relative"
            >
              <div class="item-title">制定食谱</div>
              <div class="in_out-put" v-if="type !== 'info'">
                <el-col :span="6">
          <el-form-item label="" >
            <el-popover
              ref="userPopover"
              placement="bottom-start"
              width="650"
              trigger="click"
              @show="popoverStatus = true"
              @hide="handlePopoperClose"
            >
              <el-template-input
                v-if="popoverStatus"
                @change="PopoperCloseUser"
              ></el-template-input>
              <div @click="popoverStatus = true"
              :class="`select-user-trigger ${id || clientId? 'disabled' : ''}`"
                slot="reference">
                  <img src="@/assets/images/common/import.png" alt="" />
                  从模板导入
                </div>
            </el-popover>
          </el-form-item>
          </el-col>
                <div @click="addtemplate" class="preserve">
                  <img src="@/assets/images/common/export.png" alt="" />
                  保存为模板
                </div>
              </div>
              <!-- <el-template-input
                class="el-template-input"
                v-if="isShowTemplateInput"
                :active.sync="isShowTemplateInput"
              ></el-template-input> -->
            </div>
            <make-recipes
            ref="makeRecipes"
            :id="id"
            :AddtemplateId="AddtemplateId"
            :AddtemplateType="AddtemplateType"
            :key="maketime"
            :type="type"
            @change="handleFoodSelect"
            @makeIndex="makeIndex"
            ></make-recipes>
          </div>
          <div class="diet-formulate diet-rule">
            <div class="diet-formulate-head" style="margin-bottom: 20px">
              <div class="item-title">膳食原则</div>
              <div class="in_out-put" v-if="type !== 'info'">
                <div @click="isShowDiet" style="padding: 10px 20px;">
                  <img src="@/assets/images/common/addBtn.png" alt="" />
                  添加
                </div>
                <div @click="editDietRule" style="padding: 10px 20px;">
                  <img src="@/assets/images/common/editBtn.png" alt="" />
                  编辑
                </div>
                <div @click="delectDietRule" style="padding: 10px 20px;">
                  <img src="@/assets/images/common/delBtn.png" alt="" />
                  删除
                </div>
              </div>
            </div>
            <div class="diet-rule_textarea">
              <!-- <div v-for="(item, index) in mealList" :key="index"> -->
              <div>{{mealList}}</div>
              <!-- </div> -->
            </div>
          </div>
        </el-form>
        <div class="form-buttons">
          <el-button size="small" class="cancelBtn" @click="back">
            返回
          </el-button>
          <el-button size="small" class="sureBtn" type="primary"
          @click="submitBtn"
          v-if="type !== 'info'">保存</el-button
          >
        </div>
      </div>
    </div>
    <div class="diet-form_right">
      <el-tabs value="1" stretch type="border-card">
        <el-tab-pane name="1" label="食谱营养素分析">
          <div class="sign">
            <span class="sign-high">指标过高</span>
            <span class="sign-low">指标过低</span>
          </div>
          <el-table
            row-class-name="table-row"
            header-row-class-name="table-row"
            :data="analysisData"
          >
            <el-table-column align="center" prop="name" label="成分"
            show-overflow-tooltip>
            </el-table-column>
            <el-table-column align="center" prop="recommendQuantity" label="推荐量"
            show-overflow-tooltip>
              <template slot-scope="scope">
                <span class="analysis-high">{{ scope.row.recommendQuantity }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="provideQuantity" label="提供量"
            show-overflow-tooltip>
              <template slot-scope="scope">
                <span :class="scope.row.trend === 0 ? 'OrLowClassA' :
                (scope.row.trend === 1 ? 'OrLowClassB' : 'OrLowClassC')">
                {{ scope.row.provideQuantity }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- <el-tab-pane lazy name="2" label="物质及能量分配">
          <div class="chart-box">
            <p class="item-title">三大营养素供能比</p>
            <diet-proportion-chart :list="dietTemplateMaterial" :key="timer">
            </diet-proportion-chart>
            <p class="chart-desc">
              三大营养素推荐比值：蛋白质10%~15%，脂肪20%~30%，碳水化合物55%~65%
            </p>
          </div>
          <div class="chart-box">
            <p class="item-title">动物性及豆类蛋白质占总蛋白质比例</p>
            <diet-proteinroportion-chart :list="dietTemplateMaterial" :key="timer">
            </diet-proteinroportion-chart>
            <p class="chart-desc">
              一般推荐动物性蛋白质和豆类蛋白质占膳食蛋白质总量30%~50%。
            </p>
          </div>
          <div class="chart-box">
            <p class="item-title">三餐能量分配比</p>
            <diet-distribution-chart :list="dietTemplateMaterial" :key="timer">
            </diet-distribution-chart>
            <p class="chart-desc">
              三餐推荐分配比：早餐30%，午餐40%，晚餐30%。
            </p>
          </div>
        </el-tab-pane> -->
      </el-tabs>
    </div>
    <!-- <el-template-save :visible.sync="isShowTmplateSave"></el-template-save> -->
    <el-menu-template
      v-if="fathersList.length > 0"
      :value="dietMenuTemDetail"
      :fathersList="fathersList"
      ref="elMenuTemplate"
      :visible.sync="isShowDietMenuTemplate"
      @fatherMethod="fatherMethod"
    ></el-menu-template>
    <el-menu-template-type
      :visible.sync="isShowDietMenuTemplateType"
      @change="handleDietMenuTypeChange"
    ></el-menu-template-type>
    <el-food-op
    :visible.sync="isShowFoodOp"
    ></el-food-op>
    <el-diet-rule v-if="isShowDietRule"
    :visible.sync="isShowDietRule"
    @change="onSelectDietRule"
    :DietRule="mealList"></el-diet-rule>
    <el-cooking v-if="isShowCooking" :visible.sync="isShowCooking"></el-cooking>
    <el-diet-pagoda :visible.sync="isShowDietPagoda"></el-diet-pagoda>
    <el-diet-pagoda-guide :visible.sync="isShowDietPagodaGuide"></el-diet-pagoda-guide>
    <el-diet-pagoda-exchange :visible.sync="isShowDietPagodaExchange"></el-diet-pagoda-exchange>
  </div>
</template>

<script>
import dietProportionChart from '../../chart_data/diet_proportion.vue'; // 三大营养素供能比
import dietProteinroportionChart from '../../chart_data/diet_protein_proportion.vue'; // 动物性及豆类蛋白质占总蛋白质比例
import dietDistributionChart from '../../chart_data/diet_distribution.vue'; // 三餐能量分配比
import elPeopleSelect from './el_modal/el_people_selecet.vue'; // 人员选择组件
import elTemplateInput from './el_modal/el_template_input.vue'; // 食谱模板导入
import elTemplateSave from './el_modal/el_template_save.vue'; // 食谱模板保存
import elFoodOp from './el_modal/el_food_op.vue'; // 食物操作
import elDietRule from './el_modal/el_diet_rule.vue'; // 食谱原则
import elCooking from './el_modal/el_cooking.vue'; // 食谱烹饪方式
import elDietPagoda from './el_modal/el_diet_pagoda.vue'; // 膳食宝塔
import elDietPagodaGuide from './el_modal/el_diet_pagoda_guide.vue'; // 膳食宝塔
import elDietPagodaExchange from './el_modal/el_diet_pagoda_exchange.vue'; // 膳食宝塔
import makeRecipes from './el_modal/Make_recipes.vue';
import elMenuTemplate from './el_modal/el_menu_template.vue';
import elMenuTemplateType from '../../diet_menu_template/el_modal/el_menu_template_type.vue';
export default {
  name: 'diet_form',
  components: {
    elPeopleSelect,
    elTemplateInput,
    elTemplateSave,
    elFoodOp,
    elDietRule,
    elCooking,
    elDietPagoda,
    dietProportionChart,
    dietProteinroportionChart,
    dietDistributionChart,
    elDietPagodaGuide,
    elDietPagodaExchange,
    makeRecipes,
    elMenuTemplate,
    elMenuTemplateType,
  },
  props: {
    id: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    InfoType: {
      type: String,
      default: '',
    },
    personclientId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      timer: '',
      popoverStatus: false,
      isShowDietMenuTemplate: false,
      isShowDietMenuTemplateType: false,
      isShowDietPagoda: false,
      isShowDietPagodaGuide: false,
      isShowDietPagodaExchange: false,
      isShowCooking: false,
      isShowDietRule: false,
      isShowFoodOp: false,
      isShowTmplateSave: false,
      isShowTemplateInput: false,
      isShowPeopleSelect: false,
      isActive: false,
      stateDate: '',
      endDate: '',
      clientId: '', // 编辑适用人员Id
      clientName: this.$route.query.name || '', // 编辑适用人员
      analysisData: [
        { title: '能量', title2: '2205.23 kcal', title3: '2203.23 kcal' },
      ],
      dietCollapseActiveNames: '1',
      editableTabsValue: '1',
      editableTabs: [
        { title: '第1天', name: '1' },
        // { title: '第2天', name: '2' },
        // { title: '第3天', name: '3' },
        // { title: '第4天', name: '4' },
      ],
      selectedData: [], // 客户人员
      mealList: '', // 膳食原则
      perch: ' 00:00:00',
      dietMenuTemDetail: {},
      leftList: {},
      pageList: [],
      arrList: [], // 处理后提交的数据
      arrListInfo: [], // 第几天的数据
      dietTemplateMaterial: {}, // 图表数据
      // clientIds: this.$route.query.clientId || '',
      fathersList: [],
      maketime: '',
      Addtemplate: [],
      AddtemplateId: '',
      isfathers: true,
    };
  },
  mounted() {
    if (this.type === 'add' && this.personclientId) {
      const json = {
        id: this.personclientId,
        name: this.clientName,
      };
      this.selectedData.push(json);
      this.pageList.push(this.personclientId);
      this.HealthInfo();
    }
    if (this.id) {
      this.pageList.push(this.id);
      this.HealthInfo();
    }
  },
  methods: {
    handlePopoperClose() {
      this.popoverStatus = false;
    },
    PopoperCloseUser(data) {
      this.AddtemplateId = data.id;
      this.AddtemplateType = 'Addtemplate';
      this.maketime = new Date().getTime();
      // this.loadData(data.id);
      this.$refs.userPopover.doClose();
    },
    fatherMethod() {
      const fathers = this.$refs.makeRecipes.editableTabs;
      this.fathersList = fathers;
    },
    getClientUserInfo(id) {
      this.$api.userManagerInterface.getDetail(id).then(({ data }) => {
        if (data.success) {
          this.clientName = data.data.name;
          this.clientId = data.data.id;
          this.selectedData.push(data.data);
        }
      });
    },
    async HealthInfo() {
      await this.$api.dietRawMaterial
        .clientDietPlanPageHealthInfo(this.pageList)
        .then((res) => {
          if (res.data.success) {
            this.leftList = res.data.data;
          }
        });
    },
    async Analysis() {
      if (this.arrListInfo.length !== 0 || this.pageList.length !== 0) {
        await this.$api.dietRawMaterial
          .clientDietTemplateAnalysis({
            dietTemplateMealList: this.arrListInfo,
            clientIdList: this.pageList,
          })
          .then((res) => {
            if (res.data.success) {
              this.analysisData = res.data.data.dietTemplateNutritionList;
              this.dietTemplateMaterial = res.data.data.dietTemplateMaterial;
              this.timer = new Date().getTime();
            }
          });
      }
    },
    handleFoodSelect(data, index) {
      if (data.clientId) {
        this.pageList.push(data.clientId);
        this.stateDate = data.startDate;
        this.endDate = data.endDate;
        this.mealList = data.dietPrincipleContent;
        this.clientId = data.clientId;
        this.clientName = data.clientName;
      }
      if (data.templateConfigDayDtoList.length !== 0) {
        this.DataProcessing(data.templateConfigDayDtoList, index);
      }
    },
    // 数据处理
    DataProcessing(lists, index) {
      const arr = [];
      for (let i = 0; i < lists.length; i++) {
        const json = {};
        json.day = lists[i].day;
        json.clientDietPlanConfigList = [];
        for (let j = 0; j < lists[i].clientDietPlanConfigList.length; j++) {
          if (lists[i].clientDietPlanConfigList[j].dietTemplateConfigDtos.length !== 0) {
            for (let x = 0;
              x < lists[i].clientDietPlanConfigList[j].dietTemplateConfigDtos.length;
              x++) {
              const jsons = {
                caiType:
                lists[i].clientDietPlanConfigList[j].dietTemplateConfigDtos[x].configType,
                mealType:
                lists[i].clientDietPlanConfigList[j].dietTemplateConfigDtos[x].mealType,
                weight: lists[i].clientDietPlanConfigList[j].dietTemplateConfigDtos[x].weight,
              };
              if (jsons.caiType === 1) {
                jsons.caiId =
                lists[i].clientDietPlanConfigList[j].dietTemplateConfigDtos[x].caiId;
              }
              if (jsons.caiType === 2) {
                jsons.ingredientId =
                lists[i].clientDietPlanConfigList[j].dietTemplateConfigDtos[x].dietIngredientId;
              }
              json.clientDietPlanConfigList.push(jsons);
            }
          }
        }
        arr.push(json);
      }
      this.arrList = arr;
      this.makeIndex(index);
    },
    makeIndex(index) {
      // if (this.type !== 'add') {
      this.arrListInfo = this.arrList[index].clientDietPlanConfigList;
      this.Analysis();
      // }
    },
    addtemplate() {
      this.fatherMethod();
      this.isfathers = true;
      if (this.fathersList.length === 0) {
        return this.$message.warning('请添加食谱');
      }
      this.fathersList.forEach((val) => {
        val.clientDietPlanConfigList.forEach((item) => {
          if (item.dietTemplateConfigDtos.length !== 0) {
            this.isfathers = false;
            return false;
          }
        });
      });
      if (this.isfathers) {
        return this.$message.warning('请添加具体食谱');
      }
      this.dietMenuTemDetail = { id: '' };
      this.isShowDietMenuTemplate = true;
    },
    back() {
      if (this.$route.query.clientId) {
        this.$router.go(-1);
      } else {
        this.$parent.viewIndex = 1;
        this.$router.push({
          path: '/diet_manage/',
        });
      }
      console.log(this.$route.query.clientId);
      // this.$parent.viewIndex = 1;
      // this.$router.push({
      //   path: '/diet_manage/',
      // });
      // this.id = '';
    },
    handleDietMenuTypeChange(id = '', name = '') {
      // if (this.menuType === 1) {
      //   this.menuTypeSelectName = name;
      //   this.query.dietTemplateSortId = id;
      // } else {
      this.$refs.elMenuTemplate.menuTypeSelectName = name;
      this.$refs.elMenuTemplate.ruleForm.dietTemplateSortId = id;
      // }
    },
    onSelectUser(data) {
      data.forEach((valQusOne) => {
        let same = false;
        this.selectedData.forEach((valAnswer) => {
          if (valQusOne.id === valAnswer.id) { // 如果有一样 就回答过了
            same = true;
          }
        });
        if (same === false) { // 如果没有相同的则push
          this.selectedData.push(valQusOne);
          this.pageList.push(valQusOne.id);
        }
      });
      // data.forEach((val) => {
      //   this.selectedData.push(val);
      //   this.pageList.push(val.id);
      // });
      // console.log(this.pageList);
      this.HealthInfo();
    },
    onSelectDietRule(data) {
      this.mealList = data;
    },
    selectedDataDelect(index) {
      this.pageList = [];
      this.selectedData.splice(index, 1);
      this.selectedData.forEach((val) => {
        this.pageList.push(val.id);
      });
      this.HealthInfo();
    },
    removeTab(index) {
      this.editableTabs.splice(index - 1, 1);
      this.editableTabs.slice(index - 1).forEach((item) => {
        let { name } = item;
        name--;
        item.title = `第${name}天`;
        item.name = name.toString();
      });
    },
    addTab() {
      const len = this.editableTabs.length + 1;
      this.editableTabs.push({ title: `第${len}天`, name: len.toString() });
    },
    foodAdd() {
      this.isShowFoodOp = true;
    },
    delectDietRule() {
      this.mealList = '';
    },
    editDietRule() {
      this.isShowDietRule = true;
    },
    isShowDiet() {
      this.mealList = '';
      this.isShowDietRule = true;
    },
    // 保存
    submitBtn() {
      if (!this.stateDate) {
        return this.$message.warning('请选择开始时间');
      }
      if (!this.endDate) {
        return this.$message.warning('请选择结束时间');
      }
      let mealtext = '';
      if (this.mealList !== '') {
        mealtext = this.mealList;
      } else {
        return this.$message.warning('请选择膳食原则');
      }
      const clientId = [];
      if (this.$refs.makeRecipes.id === '') { // id等于空的时候代表不是新增
        if (this.selectedData.length !== 0) {
          this.selectedData.forEach((val) => {
            clientId.push(val.id);
          });
        } else {
          return this.$message.warning('请选择客户人员');
        }
      }
      const lists = this.$refs.makeRecipes.editableTabs;
      const arr = [];
      for (let i = 0; i < lists.length; i++) {
        const json = {};
        json.day = lists[i].day;
        json.clientDietPlanConfigList = [];
        for (let j = 0; j < lists[i].clientDietPlanConfigList.length; j++) {
          if (lists[i].clientDietPlanConfigList[j].dietTemplateConfigDtos.length !== 0) {
            for (let x = 0;
              x < lists[i].clientDietPlanConfigList[j].dietTemplateConfigDtos.length;
              x++) {
              const jsons = {
                caiId: lists[i].clientDietPlanConfigList[j].dietTemplateConfigDtos[x].caiId,
                configType:
                lists[i].clientDietPlanConfigList[j].dietTemplateConfigDtos[x].configType,
                mealType:
                lists[i].clientDietPlanConfigList[j].dietTemplateConfigDtos[x].mealType,
                weight: lists[i].clientDietPlanConfigList[j].dietTemplateConfigDtos[x].weight,
                dietIngredientId:
                lists[i].clientDietPlanConfigList[j].dietTemplateConfigDtos[x].dietIngredientId,
              };
              json.clientDietPlanConfigList.push(jsons);
            }
          }
        }
        arr.push(json);
      }
      if (this.$refs.makeRecipes.id === '') { // 新增
        this.$api.dietRawMaterial
          .clientDietPlanPageSave({
            clientIdList: clientId,
            startDate: this.stateDate + this.perch,
            endDate: this.endDate + this.perch,
            dietPrincipleContent: mealtext,
            treatmentContent: '',
            clientDietPlanMealSaveList: arr,
          })
          .then((res) => {
            if (res.data.success) {
              this.$message.success('操作成功');
              this.$parent.viewIndex = 1;
            }
          });
      } else { // 编辑
        this.$api.dietRawMaterial
          .clientDietPlanPageUpdate({
            id: this.$refs.makeRecipes.id,
            startDate: this.stateDate + this.perch,
            endDate: this.endDate + this.perch,
            dietPrincipleContent: mealtext,
            treatmentContent: '',
            clientDietPlanMealSaveList: arr,
          })
          .then((res) => {
            if (res.data.success) {
              this.$message.success('操作成功');
              this.$parent.viewIndex = 1;
            }
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
.diet-form_right /deep/ .el-tabs__content{
  overflow:visible !important;
}
</style>
