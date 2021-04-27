<template>
  <div class="diet-form">
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
        <el-form>
          <div class="diet-formulate">
            <div
              class="diet-formulate-head"
              style="margin-bottom: 20px; position: relative"
            >
              <div class="item-title">制定食谱</div>
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
    <el-food-op :visible.sync="isShowFoodOp"></el-food-op>
    <el-cooking :visible.sync="isShowCooking"></el-cooking>
    <el-diet-pagoda :visible.sync="isShowDietPagoda"></el-diet-pagoda>
  </div>
</template>

<script>
import dietProportionChart from '../../chart_data/diet_proportion.vue'; // 三大营养素供能比
import dietProteinroportionChart from '../../chart_data/diet_protein_proportion.vue'; // 动物性及豆类蛋白质占总蛋白质比例
import dietDistributionChart from '../../chart_data/diet_distribution.vue'; // 三餐能量分配比
import elFoodOp from '../../diet_programme/edit_form/el_modal/el_food_op.vue'; // 食物操作
import elCooking from '../../diet_programme/edit_form/el_modal/el_cooking.vue'; // 食谱烹饪方式
import elDietPagoda from '../../diet_programme/edit_form/el_modal/el_diet_pagoda.vue'; // 膳食宝塔

export default {
  name: 'diet_form',
  components: {
    elFoodOp,
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
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
