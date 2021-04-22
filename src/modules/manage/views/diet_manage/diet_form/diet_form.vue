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
        <div class="diet-type-item">
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
            <span> - </span>
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
          <el-form-item label="添加人员: " label-width="80px">
            <el-select
              multiple
              style="width: 100%"
              placeholder="请选择（多选）"
              clearable
            >
              <el-option label="男" :value="1"></el-option>
              <el-option label="女" :value="0"></el-option>
            </el-select>
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
            <div class="diet-formulate-head" style="margin-bottom: 20px">
              <div class="item-title">适用人员</div>
              <div class="in_out-put">
                <div>
                  <img src="@/assets/images/edit@2x.png" alt="" />
                  从模版导入
                </div>
                <div>
                  <img src="@/assets/images/edit@2x.png" alt="" />
                  保存为模版
                </div>
              </div>
            </div>
            <el-tabs type="card" editable v-model="editableTabsValue">
              <el-tab-pane
                :key="item.title"
                v-for="item in editableTabs"
                :label="item.title"
                :name="item.name"
              >
                <el-collapse v-model="activeNames">
                  <el-collapse-item name="1">
                    <template slot="title">
                      <div class="header">
                        <span><i class="el-icon-arrow-down"></i>早餐</span>
                        <i class="el-icon-plus"></i>
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
                  <el-collapse-item name="2">
                    <template slot="title">
                      <div class="header">
                        <span><i class="el-icon-arrow-down"></i>午餐</span>
                        <i class="el-icon-plus"></i>
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
                        <i class="el-icon-plus"></i>
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
                        <i class="el-icon-plus"></i>
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
                <div>
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
            <el-input type="textarea" :rows="4" class="diet-rule_textarea" />
          </div>
        </el-form>
         <div class="form-buttons">
            <el-button
              size="small"
              class="cancelBtn"
              @click="$emit('cancel')"
              >{{ detail ? '返回' : '取消' }}</el-button
            >
            <el-button
              size="small"
              v-if="!detail"
              class="sureBtn"
              type="primary"
              @click="submit"
              >保存</el-button
            >
          </div>
      </div>
    </div>
    <div class="diet-form_right">1111</div>
  </div>
</template>

<script>
export default {
  name: 'diet_form',
  components: {},
  data() {
    return {
      isActive: false,
      activeNames: '1',
      editableTabsValue: '2',
      editableTabs: [
        { title: '第1天', name: '1' },
        { title: '第2天', name: '2' },
      ],
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
@import './diet_form.scss';
</style>
