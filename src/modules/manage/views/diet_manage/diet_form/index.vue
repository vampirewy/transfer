<template>
  <div class="diet-form">
    <div class="diet-form_left">
      <div class="diet-form_left-item">
        <p class="item-title">推荐摄入</p>
        <div class="table">
          <div class="table-column">
            <div>高</div>
            <div>0人</div>
          </div>
          <div class="table-column">
            <div>高</div>
            <div>0人</div>
          </div>
        </div>
      </div>
      <div class="diet-form_left-item">
        <p class="item-title">体型</p>
        <div class="table">
          <div class="table-column">
            <div>未知</div>
            <div>0人</div>
          </div>
          <div class="table-column">
            <div>偏瘦</div>
            <div>0人</div>
          </div>
          <div class="table-column">
            <div>正常</div>
            <div>0人</div>
          </div>
          <div class="table-column">
            <div>超重</div>
            <div>0人</div>
          </div>
          <div class="table-column">
            <div>肥胖</div>
            <div>0人</div>
          </div>
        </div>
        <div class="diet-form_left-item">
          <p class="item-title">膳食相关问题</p>
          <div class="table">
            <div class="table-column">
              <div>吃饭过饱</div>
              <div>0人</div>
            </div>
            <div class="table-column">
              <div>经常吃夜宵</div>
              <div>0人</div>
            </div>
          </div>
        </div>
        <div class="diet-form_left-item">
          <p class="item-title">MNA营养评定</p>
          <div class="table">
            <div class="table-column">
              <div>营养状况良好</div>
              <div>0人</div>
            </div>
            <div class="table-column">
              <div>存在营养风险</div>
              <div>0人</div>
            </div>
            <div class="table-column">
              <div>营养不良</div>
              <div>0人</div>
            </div>
            <div class="table-column">
              <div>未评</div>
              <div>0人</div>
            </div>
          </div>
        </div>
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
        <div class="diet-type-item">
          <img src="@/assets/images/diet/diet_image2.png" alt="膳食指南" />
          <div>
            <p class="title">中国居民</p>
            <p class="desc">膳食指南</p>
          </div>
        </div>
        <div class="diet-type-item">
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
          <el-form-item label="日期范围: " label-width="80px">
            <el-date-picker
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="开始时间"
              style="width: 121px"
            >
            </el-date-picker>
            <span style="margin: 0 9px">-</span>
            <el-date-picker
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
          >
            <div @click="isShowPeopleSelect = true" class="select-mask">
              <el-select
                value=""
                style="width: 100%"
                placeholder="请选择（多选）"
              >
              </el-select>
            </div>
            <el-people-select
              :active.sync="isShowPeopleSelect"
              class="el-people-select"
            ></el-people-select>
          </el-form-item>
          <el-form-item
            class="dashed-border"
            label="已选人员: "
            label-width="80px"
          >
            <div class="selected-box">
              <div class="selected-item" v-for="item in 10" :key="item">
                <span>谢小妞</span>
                <i class="el-icon-error"></i>
              </div>
            </div>
          </el-form-item>
          <div class="diet-formulate">
            <div
              class="diet-formulate-head"
              style="margin-bottom: 20px; position: relative"
            >
              <div class="item-title">制定食谱</div>
              <div class="in_out-put">
                <div @click="isShowTemplateInput = true">
                  <img src="@/assets/images/common/import.png" alt="" />
                  从模版导入
                </div>
                <div @click="isShowTmplateSave = true">
                  <img src="@/assets/images/common/export.png" alt="" />
                  保存为模版
                </div>
              </div>
              <el-template-input
                class="el-template-input"
                :active.sync="isShowTemplateInput"
              ></el-template-input>
            </div>
            <el-tabs
              type="card"
              editable
              @tab-remove="removeTab"
              @tab-add="addTab"
              v-model="editableTabsValue"
            >
              <el-tab-pane
                :key="item.title"
                v-for="item in editableTabs"
                :label="item.title"
                :name="item.name"
              >
                <el-collapse v-model="dietCollapseActiveNames">
                  <el-collapse-item name="1">
                    <template slot="title">
                      <div class="header">
                        <span><i class="el-icon-arrow-down"></i>早餐</span>
                        <i class="el-icon-plus" @click.stop="foodAdd"></i>
                      </div>
                    </template>
                    <div class="food-collapse" v-for="item in 2" :key="item">
                      <div class="food-item">
                        <p class="food-title">
                          <img
                            class="food-circle"
                            :src="
                              isActive
                                ? require('@/assets/images/diet/icon_line.png')
                                : require('@/assets/images/diet/icon_add.png')
                            "
                            @click="isActive = !isActive"
                            alt=""
                          />
                          纯牛奶
                          <i
                            @click="isShowCooking = true"
                            class="el-icon-warning"
                          ></i>
                        </p>
                        <div class="input-box">
                          <el-input type="text" value="123123" />
                          g
                        </div>
                        <img
                          class="food-del"
                          src="@/assets/images/diet/icon_del.png"
                          alt=""
                        />
                      </div>
                      <div class="food-list" :class="{ is_active: isActive }">
                        <div class="food-item foot-list_item">
                          <p>甜酒酿</p>
                          <div class="input-box">
                            <el-input type="text" value="123123" />
                            g
                          </div>
                        </div>
                      </div>
                    </div>
                  </el-collapse-item>
                  <el-collapse-item name="2">
                    <template slot="title">
                      <div class="header">
                        <span><i class="el-icon-arrow-down"></i>午餐</span>
                        <i class="el-icon-plus" @click.stop="foodAdd"></i>
                      </div>
                    </template>
                    <div class="food-collapse" v-for="item in 2" :key="item">
                      <div class="food-item">
                        <p class="food-title">
                          <img
                            class="food-circle"
                            :src="
                              isActive
                                ? require('@/assets/images/diet/icon_line.png')
                                : require('@/assets/images/diet/icon_add.png')
                            "
                            @click="isActive = !isActive"
                            alt=""
                          />
                          纯牛奶
                        </p>
                        <div class="input-box">
                          <el-input type="text" value="123123" />
                          g
                        </div>
                        <img
                          class="food-del"
                          src="@/assets/images/diet/icon_del.png"
                          alt=""
                        />
                      </div>
                      <div class="food-list" :class="{ is_active: isActive }">
                        <div class="food-item foot-list_item">
                          <p>甜酒酿</p>
                          <div class="input-box">
                            <el-input type="text" value="123123" />
                            g
                          </div>
                        </div>
                      </div>
                    </div>
                  </el-collapse-item>
                  <el-collapse-item name="3">
                    <template slot="title">
                      <div class="header">
                        <span><i class="el-icon-arrow-down"></i>晚餐</span>
                        <i class="el-icon-plus" @click.stop="foodAdd"></i>
                      </div>
                    </template>
                    <div class="food-collapse" v-for="item in 2" :key="item">
                      <div class="food-item">
                        <p class="food-title">
                          <img
                            class="food-circle"
                            :src="
                              isActive
                                ? require('@/assets/images/diet/icon_line.png')
                                : require('@/assets/images/diet/icon_add.png')
                            "
                            @click="isActive = !isActive"
                            alt=""
                          />
                          纯牛奶
                        </p>
                        <div class="input-box">
                          <el-input type="text" value="123123" />
                          g
                        </div>
                        <img
                          class="food-del"
                          src="@/assets/images/diet/icon_del.png"
                          alt=""
                        />
                      </div>
                      <div class="food-list" :class="{ is_active: isActive }">
                        <div class="food-item foot-list_item">
                          <p>甜酒酿</p>
                          <div class="input-box">
                            <el-input type="text" value="123123" />
                            g
                          </div>
                        </div>
                      </div>
                    </div>
                  </el-collapse-item>
                  <el-collapse-item name="4">
                    <template slot="title">
                      <div class="header">
                        <span><i class="el-icon-arrow-down"></i>加餐</span>
                        <i class="el-icon-plus" @click.stop="foodAdd"></i>
                      </div>
                    </template>
                    <div class="food-collapse" v-for="item in 2" :key="item">
                      <div class="food-item">
                        <p class="food-title">
                          <img
                            class="food-circle"
                            :src="
                              isActive
                                ? require('@/assets/images/diet/icon_line.png')
                                : require('@/assets/images/diet/icon_add.png')
                            "
                            @click="isActive = !isActive"
                            alt=""
                          />
                          纯牛奶
                        </p>
                        <div class="input-box">
                          <el-input type="text" value="123123" />
                          g
                        </div>
                        <img
                          class="food-del"
                          src="@/assets/images/diet/icon_del.png"
                          alt=""
                        />
                      </div>
                      <div class="food-list" :class="{ is_active: isActive }">
                        <div class="food-item foot-list_item">
                          <p>甜酒酿</p>
                          <div class="input-box">
                            <el-input type="text" value="123123" />
                            g
                          </div>
                        </div>
                      </div>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="diet-formulate diet-rule">
            <div class="diet-formulate-head" style="margin-bottom: 20px">
              <div class="item-title">膳食原则</div>
              <div class="in_out-put">
                <div @click="isShowDietRule = true">
                  <img src="@/assets/images/common/addBtn.png" alt="" />
                  添加
                </div>
                <div>
                  <img src="@/assets/images/common/editBtn.png" alt="" />
                  编辑
                </div>
                <div>
                  <img src="@/assets/images/common/delBtn.png" alt="" />
                  删除
                </div>
              </div>
            </div>
            <div class="diet-rule_textarea"></div>
          </div>
        </el-form>
        <div class="form-buttons">
          <el-button size="small" class="cancelBtn" @click="back">
            返回
          </el-button>
          <el-button size="small" class="sureBtn" type="primary"
            >保存</el-button
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
            <el-table-column align="center" prop="title" label="成分">
            </el-table-column>
            <el-table-column align="center" prop="title2" label="推荐量">
              <template slot-scope="scope">
                <span class="analysis-high">{{ scope.row.title2 }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="title3" label="提供量">
              <template slot-scope="scope">
                <span class="analysis-low">{{ scope.row.title3 }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane lazy name="2" label="物质及能量分配">
          <div class="chart-box">
            <p class="item-title">三大营养素供能比</p>
            <diet-proportion-chart></diet-proportion-chart>
            <p class="chart-desc">
              三大营养素推荐比值：蛋白质10%~15%，脂肪20%~30%，碳水化合物55%~65%
            </p>
          </div>
          <div class="chart-box">
            <p class="item-title">动物性及豆类蛋白质占总蛋白质比例</p>
            <diet-proteinroportion-chart></diet-proteinroportion-chart>
            <p class="chart-desc">
              一般推荐动物性蛋白质和豆类蛋白质占膳食蛋白质总量30%~50%。
            </p>
          </div>
          <div class="chart-box">
            <p class="item-title">三餐能量分配比</p>
            <diet-distribution-chart></diet-distribution-chart>
            <p class="chart-desc">
              三餐推荐分配比：早餐30%，午餐40%，晚餐30%。
            </p>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-template-save :visible.sync="isShowTmplateSave"></el-template-save>
    <el-food-op :visible.sync="isShowFoodOp"></el-food-op>
    <el-diet-rule :visible.sync="isShowDietRule"></el-diet-rule>
    <el-cooking :visible.sync="isShowCooking"></el-cooking>
    <el-diet-pagoda :visible.sync="isShowDietPagoda"></el-diet-pagoda>
  </div>
</template>

<script>
import dietProportionChart from './chart_data/diet_proportion.vue'; //三大营养素供能比
import dietProteinroportionChart from './chart_data/diet_protein_proportion.vue'; //动物性及豆类蛋白质占总蛋白质比例
import dietDistributionChart from './chart_data/diet_distribution.vue'; //三餐能量分配比
import elPeopleSelect from './el_modal/el_people_selecet.vue';//人员选择组件
import elTemplateInput from './el_modal/el_template_input.vue';//食谱模版导入
import elTemplateSave from './el_modal/el_template_save.vue';//食谱模版保存
import elFoodOp from './el_modal/el_food_op.vue';//食物操作
import elDietRule from './el_modal/el_diet_rule.vue';//食谱原则
import elCooking from './el_modal/el_cooking.vue';//食谱烹饪方式
import elDietPagoda from './el_modal/el_diet_pagoda.vue';//膳食宝塔

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
  },
  data() {
    return {
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
      dietCollapseActiveNames: '1',
      editableTabsValue: '2',
      editableTabs: [
        { title: '第1天', name: '1' },
        { title: '第2天', name: '2' },
        { title: '第3天', name: '3' },
        { title: '第4天', name: '4' },
      ],
    };
  },
  methods: {
    back() {
      this.$parent.viewIndex = 1;
    },
    removeTab(name) {
      this.editableTabs.splice(name - 1, 1);
      this.editableTabs.slice(name - 1).forEach((item) => {
        let { name } = item;
        name--;
        item.title = `第${name}天`;
        item.name = name.toString();
      });
    },
    addTab() {
      let len = this.editableTabs.length + 1;
      this.editableTabs.push({ title: `第${len}天`, name: len.toString() });
    },
    foodAdd() {
      this.isShowFoodOp = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import './diet_form.scss';
</style>
