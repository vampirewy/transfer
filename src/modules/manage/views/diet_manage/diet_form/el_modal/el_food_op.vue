<template>
  <el-dialog
    title="添加食物"
    class="dialog-detail"
    :modal-append-to-body="false"
    top="20px"
    width="1000px"
    :visible.sync="visible"
    @close="visibles = false"
  >
    <p class="item-title">已选择食物</p>
    <div class="selected-food">
      <div class="selected-food-item">
        菠萝鸡片
        <img src="@/assets/images/body/closeChooseTab.png" alt="" />
      </div>
    </div>
    <p class="item-title">食物列表</p>
    <div class="food-list">
      <div class="left">
        <el-tabs stretch type="border-card" value="1">
          <el-tab-pane label="成品菜" name="1">
            <el-collapse>
              <el-collapse-item title="中国菜" name="1">
                <ul class="food-type-list">
                  <li class="food-type-item is_active">心调养食谱</li>
                  <li class="food-type-item">心调养食谱</li>
                  <li class="food-type-item">心调养食谱</li>
                </ul>
              </el-collapse-item>
              <el-collapse-item title="中国菜" name="2">
                <ul class="food-type-list">
                  <li class="food-type-item">心调养食谱</li>
                  <li class="food-type-item">心调养食谱</li>
                  <li class="food-type-item">心调养食谱</li>
                </ul>
              </el-collapse-item>
              <el-collapse-item title="中国菜" name="3">
                <ul class="food-type-list">
                  <li class="food-type-item">心调养食谱</li>
                  <li class="food-type-item">心调养食谱</li>
                  <li class="food-type-item">心调养食谱</li>
                </ul>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
          <el-tab-pane label="原料" name="2">
            <ul class="food-type-list">
              <li class="food-type-item is_active">谷类及制品</li>
              <li class="food-type-item">谷类及制品</li>
              <li class="food-type-item">谷类及制品</li>
            </ul>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="right">
        <div class="divTop">
          <div class="divTitle">
            <div class="searchCondition">
              <div class="searchLeft">
                <div class="searchInputFormItem">
                  <el-input placeholder="请输入条件搜索"> </el-input>
                  <span class="searchBtnImgSpan">
                    <img
                      class="searchBtnImg"
                      src="@/assets/images/common/topsearch.png"
                    />
                  </span>
                </div>
              </div>
              <div class="searchRight">
                <div class="buttones">
                  <div class="searchFor">
                    <img
                      src="@/assets/images/common/topsearchblue.png"
                      alt=""
                    />
                  </div>
                  <div class="resetAll">重置</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <el-table row-class-name="table-row" :data="foodTableData">
          <el-table-column type="selection" align="center" width="55">
          </el-table-column>
          <el-table-column align="center" prop="title" label="菜名">
          </el-table-column>
          <el-table-column align="center" prop="title2" label="餐次">
          </el-table-column>
        </el-table>
        <el-pagination
        background
        layout="prev, pager, next, jumper, total, sizes"
        :total="total"
        :page-sizes="[15]"
        :current-page="currentPage"
        :page-size="pageSize"
        @current-change="handleCurrentChange"
      ></el-pagination>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="visibles = false" class="cancelBtn"
        >取消</el-button
      >
      <el-button type="primary" size="small" @click="submit" class="sureBtn"
        >确定</el-button
      >
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      currentPage:1,
      total:0,
      pageSize:15,
      foodTableData: [{ title: '干烧冬笋', title2: '午餐、晚餐' }],
    };
  },
  computed: {
    visibles: {
      get() {
        return this.visible;
      },
      set() {
        this.$emit('update:visible', false);
      },
    },
  },
  methods: {
    handleCurrentChange(){},
    async submit() {
      await this.$api.companyManageInterface.updateWorkUnit({
        id: this.value.id,
        workUnitName: this.value.workUnitName,
        contact: this.value.contact,
        mobile: this.value.mobile,
        address: this.value.address,
      });
      this.$message.success('操作成功');
      this.cancel();
    },
  },
};
</script>

<style lang="scss" scoped>
.item-title {
  font-size: 15px;
  font-weight: 600;
  color: #333333;
  line-height: 20px;
  position: relative;
  padding-left: 15px;
  &::before {
    content: '';
    display: inline-block;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    border: 1px solid #b4bbc9;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
}
.dialog-detail /deep/ {
  .el-dialog {
    height: 90vh;
  }
  .el-dialog__body {
    padding: 20px 25px 0 34px !important;
    max-height: 700px;
  }
  .dialog-footer {
    text-align: center;
  }
}
.selected-food {
  width: 100%;
  height: 114px;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #dde0e6;
  padding: 20px;
  box-sizing: border-box;
  margin: 16px 0;
  .selected-food-item {
    display: inline-flex;
    align-items: center;
    background: #f6f8fc;
    border-radius: 16px;
    padding: 8px 13px;
    font-size: 12px;
    font-weight: 400;
    color: #333333;
    img {
      width: 16px;
      height: 16px;
      margin-left: 5px;
      cursor: pointer;
    }
  }
}
.food-list {
  display: flex;
  margin-top: 20px;
  .left {
    width: 25%;
    min-height: 600px;
    border-radius: 8px 8px 0px 8px;
    border: 1px solid #e5e7ef;
  }
  .right {
    border-radius: 0px 8px 8px 0px;
    border: 1px solid #e5e7ef;
    flex: 1;
    padding: 20px;
    box-sizing: border-box;
    /deep/.el-table {
      margin: 20px 0;
    }
    /deep/.table-row {
      height: 44px;
    }
    /deep/.el-pagination{
      text-align: center;
    }
  }
}
.el-tabs {
  border: none !important;
  box-shadow: none !important;
  /deep/ .el-tabs__nav {
    background: none !important;
    border: none !important;
  }
  /deep/ .el-tabs__nav-wrap {
    margin-bottom: -4px;
  }
  /deep/ .el-tabs__item {
    border-radius: 8px 8px 0px 0px !important;
    background-color: #f6f8fc;
    color: #333333;
    border: none !important;
    overflow: hidden;
    font-size: 12px;
    &.is-active {
      color: #ffffff !important;
      background-color: #3154ac !important;
    }
  }
  /deep/ .el-icon-plus {
    color: #36bf2f;
  }
  /deep/ .el-tabs__new-tab {
    background: #f6f8fc !important;
    border: none !important;
  }
}
/deep/ .el-tabs__content {
  padding: 0;
  .el-collapse-item__header {
    padding: 0 30px;
    font-size: 12px;
    font-weight: 400;
    color: #333333;
    height: 48px;
  }
  .el-collapse-item__content {
    padding: 0;
  }
  .el-collapse-item__header.is-active {
    background-color: #eaedf6;
    color: #3154ac;
  }
  .el-collapse-item__arrow {
    font-size: 16px;
  }
  .el-collapse-item__arrow.is-active {
    transform: rotate(-90deg);
  }
}
.food-type-list {
  background-color: #f6f8fc;
  .food-type-item {
    height: 48px;
    line-height: 48px;
    padding: 0 30px;
    font-size: 12px;
    font-weight: 400;
    color: #333333;
    cursor: pointer;
    &.is_active {
      color: #ffffff;
      background-color: #3154ac;
    }
  }
}
.searchLeft {
  flex: 1;
}
.searchCondition .searchInputFormItem {
  width: 100% !important;
}
.searchCondition .searchInputFormItem .el-input {
  width: 95%;
}
</style>
