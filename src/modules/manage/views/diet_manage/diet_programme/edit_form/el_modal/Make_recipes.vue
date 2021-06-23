<template>
  <div class="diet-form">
    <div class="diet-form_center" style="padding: 0px 5px 0;">
      <div class="diet-plan-box">
        <el-form>
          <div class="diet-formulate">
            <el-tabs
              @tab-click="handleTabsEdit"
              type="card"
              editable
              @tab-remove="removeTab"
              @tab-add="addTab"
              v-model="editableTabsValue"
            >
              <el-tab-pane
                :key="item.day"
                v-for="(item, index) in editableTabs"
                :label="`第${item.day}天`"
                :name="item.day.toString()"
              >
                <el-collapse v-model="dietCollapseActiveNames">
                  <el-collapse-item
                    v-for="(it, inx) in item.clientDietPlanConfigList"
                    :key="it.mealType"
                    :name="it.mealType"
                  >
                    <template slot="title">
                      <div class="header">
                        <span
                          ><i class="el-icon-arrow-down"></i
                          >{{ mealTypeText[it.mealType - 1] }}</span
                        >
                        <i
                          class="el-icon-plus"
                          @click.stop="foodAdd(index, inx)"
                        ></i>
                      </div>
                    </template>
                    <div
                      class="food-collapse"
                      v-for="(its, inxs) in it.dietTemplateConfigDtos"
                      :key="inxs"
                    >
                      <div class="food-item">
                        <p class="food-title">
                          <img
                            class="food-circle"
                            v-show="its.configType === 1"
                            :src="
                              isActive
                                ? require('@/assets/images/diet/icon_line.png')
                                : require('@/assets/images/diet/icon_add.png')
                            "
                            @click="
                              switchCaiDtoIndex(
                                index.toString() +
                                  inx.toString() +
                                  inxs.toString(),
                              )
                            "
                            alt=""
                          />
                          <img
                            class="food-circle"
                            v-show="its.configType === 2"
                            :src="
                              require('@/assets/images/diet/icon_circle.png')
                            "
                            alt=""
                          />
                          {{ its.name }}
                          <i
                            v-show="its.configType === 1"
                            @click="isShowCooking = true"
                            class="el-icon-warning"
                          ></i>
                        </p>
                        <div class="input-box">
                          <el-input v-if="type !== 'info'" type="text" v-model="its.weight" />
                          <el-input v-else type="text" disabled v-model="its.weight" />
                          g
                        </div>
                        <img
                          v-if="type !== 'info'"
                          class="food-del"
                          @click="
                            deleteDietTempPlateConfigDtos(index, inx, inxs)
                          "
                          src="@/assets/images/diet/icon_del.png"
                          alt=""
                        />
                      </div>
                      <div
                        class="food-list"
                        :class="{
                          is_active:
                            activeCaiDtoIndex ===
                            index.toString() + inx.toString() + inxs.toString(),
                        }"
                      >
                        <div
                          v-for="(
                            its2, inxs2
                          ) in its.templateDietIngredientDtoList"
                          :key="inxs2"
                          class="food-item foot-list_item"
                        >
                          <p>{{ its2.name }}</p>
                          <div class="input-box">
                            <!-- <el-input disabled type="text" v-model="its2.weight" /> -->
                            <!-- <div class="weightbox">{{its2.weight}} g</div> -->
                            <div class="weightbox">{{(its.weight*its2.scale).toFixed(2)}} </div> g
                          </div>
                        </div>
                      </div>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-form>
      </div>
    </div>
    <el-food-op
      v-if="isShowFoodOp"
      @change="handleFoodSelect"
      :visible.sync="isShowFoodOp"
    ></el-food-op>
    <el-cooking :visible.sync="isShowCooking"></el-cooking>
  </div>
</template>

<script>
import elFoodOp from './el_food_op.vue'; // 食物操作
import elCooking from './el_cooking.vue'; // 食谱烹饪方式
import deleteIcon from '~/src/assets/images/common/editIcon.png';
export default {
  name: 'diet_form',
  components: {
    elFoodOp,
    elCooking,
    // elDietPagoda,
    // dietProportionChart,
    // dietProteinroportionChart,
    // dietDistributionChart,
    // elDietPagodaGuide,
    // elDietPagodaExchange,
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
  },
  data() {
    return {
      isShowDietPagodaGuide: false, // 膳食指南
      isShowDietPagodaExchange: false, // 食物交换
      isShowDietPagoda: false,
      isShowCooking: false,
      isShowDietRule: false,
      isShowFoodOp: false,
      isShowTmplateSave: false,
      isShowTemplateInput: false,
      isShowPeopleSelect: false,
      isActive: false,
      analysisData: [
        { title: '能量', title2: '2205.23 kcal', title3: '2203.23 kcal' },
      ],
      mealTypeText: ['早餐', '午餐', '晚餐', '加餐'],
      dietCollapseActiveNames: '1',
      activeCaiDtoIndex: '',
      editableTabsValue: '1',
      editableTabs: [],
      TabsIndex: 0,
      FoodList: [],
    };
  },
  created() {
    if (this.id) {
      this.getDetailList();
    }
  },
  watch: {
    editableTabs: {
      handler(newValue) {
        const json = {
          templateConfigDayDtoList: newValue,
        };
        this.$emit('change', json, this.TabsIndex);
      },
      deep: true,
    },
  },
  methods: {
    handleTabsEdit(e) {
      this.TabsIndex = e.index;
      this.$emit('makeIndex', e.index);
    },
    getDetailList() {
      this.$api.dietRawMaterial
        .clientDietPlanPageGetDetail(this.id)
        .then((res) => {
          if (res.data.success) {
            // this.$emit('change', res.data.data);
            this.deitsLists(res.data.data);
            // this.deitsLists(res.data.data.templateConfigDayDtoList);
            // this.$message.success('操作成功');
          }
        });
    },
    deitsLists(data) {
      // this.editableTabs = list;
      const list = data.templateConfigDayDtoList;
      list.forEach((item1) => {
        const json = {};
        json.day = item1.day;
        json.clientDietPlanConfigList = [];
        item1.mealTypeDtos.forEach((item2) => {
          const json2 = {};
          json2.mealType = item2.mealType;
          json2.dietTemplateConfigDtos = [];
          json.clientDietPlanConfigList.push(json2);
          item2.dietTemplateConfigDtos.forEach((item3) => {
            const json3 = {};
            json3.mealType = item2.mealType;
            json3.configType = item3.configType;
            json3.name = item3.name;
            json3.dietIngredientId = item3.dietIngredientId;
            json3.caiId = item3.caiId;
            json3.weight = item3.weight;
            json3.templateDietIngredientDtoList = [];
            json2.dietTemplateConfigDtos.push(json3);
            if (item3.templateDietIngredientDtoList) {
              item3.templateDietIngredientDtoList.forEach((item4) => {
                const json4 = {};
                json4.dietIngredientId = item4.dietIngredientId;
                json4.name = item4.name;
                json4.weight = item4.weight;
                json4.dietIngredientName = item4.scale;
                json4.scale = item4.scale;
                json3.templateDietIngredientDtoList.push(json4);
              });
            }
          });
        });
        this.editableTabs.push(json);
      });
      data.templateConfigDayDtoList = this.editableTabs;
      this.$emit('change', data, 0);
    },
    deleteDietTempPlateConfigDtos(index, inx, inxs) {
      this.editableTabs[index].clientDietPlanConfigList[inx].dietTemplateConfigDtos.splice(
        inxs,
        1,
      );
    },
    switchCaiDtoIndex(index) {
      this.activeCaiDtoIndex = index === this.activeCaiDtoIndex ? '' : index;
    },
    loadData() {
      this.$api.dietMenuTemplateInterface
        .getDietMenuTemConfigDetail(this.id)
        .then((res) => {
          this.editableTabs = res.data.data;
        });
    },
    back() {
      this.$parent.viewIndex = 1;
    },
    removeTab(day) {
      if (this.type !== 'info') {
        const index = this.editableTabs.findIndex(item => item.day === day * 1);
        this.editableTabs.splice(index, 1);
        this.editableTabs.forEach((val, indexs) => {
          val.day = indexs + 1;
        });
      }
    },
    addTab() {
      if (this.type !== 'info') {
        if (this.editableTabs.length < 7) {
          const day = this.editableTabs.length + 1;
          const meal = {
            day,
            clientDietPlanConfigList: [
              { mealType: 1, dietTemplateConfigDtos: [] },
              { mealType: 2, dietTemplateConfigDtos: [] },
              { mealType: 3, dietTemplateConfigDtos: [] },
              // { mealType: 4, dietTemplateConfigDtos: [] },
            ],
          };
          this.editableTabs.push(meal);
        } else {
          this.remove();
        }
      }
    },
    remove() {
      this.$confirm(`<div class="delete-text-content"><img class="delete-icon" src="${deleteIcon}"/><span>最多只能创建七天模板哦~</span></div>`, '提示', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        customClass: 'message-box-customize',
      }).then(
      );
    },
    foodAdd(index, inx) {
      if (this.type !== 'info') {
        this.selectDietMenuIndex = [index, inx];
        this.isShowFoodOp = true;
      }
    },
    handleFoodSelect(e) {
      // 选择食物回调
      const [index, inx] = this.selectDietMenuIndex;
      e.forEach((item) => {
        const obj = {};
        if (item.name) { // 判断是成品菜还是原料 原料是names
          obj.name = item.name;
          obj.configType = 1;
          obj.caiId = item.id;
          obj.weight = item.totalWeight;
          obj.templateDietIngredientDtoList = item.caiIngredientDtos.map(
            (it) => {
              it.name = it.dietIngredientName;
              return it;
            },
          );
        } else {
          obj.name = item.names;
          obj.configType = 2;
          obj.dietIngredientId = item.id;
          obj.weight = '';
        }
        obj.mealType = inx + 1;
        this.FoodList.push(obj);
        // return obj;
      });
      // this.editableTabs[index].clientDietPlanConfigList[inx].dietTemplateConfigDtos.push(
      //   ...e,
      // );
      this.FoodList.forEach((valQusOne) => {
        let same = false;
        this.editableTabs[index]
          .clientDietPlanConfigList[inx]
          .dietTemplateConfigDtos.forEach((valAnswer) => {
            if (valQusOne.configType === 1) {
              if (valQusOne.caiId === valAnswer.caiId) { // 如果有一样 就回答过了
                same = true;
              }
            }
            if (valQusOne.configType === 2) {
              if (valQusOne.dietIngredientId === valAnswer.dietIngredientId) { // 如果有一样 就回答过了
                same = true;
              }
            }
          });
        if (same === false) { // 如果没有相同的则push
          this.editableTabs[index].clientDietPlanConfigList[inx].dietTemplateConfigDtos.push(
            valQusOne,
          );
        }
      });
      this.FoodList = [];
    },
    submit() {
      const obj = [];
      this.editableTabs.forEach((item) => {
        item.clientDietPlanConfigList.forEach((item2) => {
          item2.dietTemplateConfigDtos.forEach((item3) => {
            if (item3.templateDietIngredientDtoList) {
              item3.templateDietIngredientDtoList.forEach((item4) => {
                obj.push({
                  dietTemplateId: this.id,
                  configType: item3.configType,
                  day: item.day,
                  mealType: item2.mealType,
                  dietIngredientId: item3.dietIngredientId,
                  weight: item4.weight,
                });
              });
            }
            obj.push({
              dietTemplateId: this.id,
              configType: item3.configType,
              day: item.day,
              mealType: item2.mealType,
              caiId: item3.caiId,
              dietIngredientId: item3.dietIngredientId,
              weight: item3.weight,
            });
          });
        });
      });
      // this.$api.dietMenuTemplateInterface
      //   .saveDietMenuTemConfig(obj)
      //   .then(() => {
      //     this.$message.success('操作成功!');
      //   });
    },
  },
};
</script>

<style lang="scss" scoped>
  .diet-form{
    /deep/ .el-tabs__nav-wrap.is-scrollable{
      padding: 0;
    }
  }

@import '../../../diet_menu_template/edit_form/index.scss';
</style>
