<template>
  <el-dialog
    title="添加膳食规则"
    class="dialog-detail el_diet_rule"
    :modal-append-to-body="false"
    width="850px"
    top="100px"
    :visible.sync="visibles"
    @close="visibles = false"
  >
    <p class="item-title">选择规则</p>
    <div class="divTop diet_rule">
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
                <img src="@/assets/images/common/topsearchblue.png" alt="" />
              </div>
              <div class="resetAll">重置</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-table
      row-class-name="table-row"
      header-row-class-name="table-row"
      :data="tableData"
    >
      <el-table-column align="center" type="selection" width="55">
      </el-table-column>
      <el-table-column align="center" prop="title" label="规则名称">
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
    <div class="add-box">
      <el-radio-group v-model="type">
        <el-radio :label="1">直接添加</el-radio>
        <el-radio :label="2">覆盖当前</el-radio>
      </el-radio-group>
      <el-button type="primary" class="add-btn">确定添加</el-button>
    </div>
    <p class="item-title">已添加规则</p>
    <div class="added-rule-box">
      <p>1.限制总能量，保持适宜体重。每天总能量一般给予每公斤体重20~25千卡。</p>
      <p>
        2.多食用素食为主的碱性食物，如各种蔬菜、水果、鲜果汁、马铃薯、甘薯、海藻、紫菜、海带、西瓜、冬瓜等。
      </p>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="visibles = false" class="cancelBtn"
        >取消</el-button
      >
      <el-button type="primary" size="small" @click="submit" class="sureBtn"
        >保存规则</el-button
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
      type: 2,
      total: 0,
      currentPage: 1,
      pageSize: 15,
      tableData: [{ title: '高血压病合并高血糖的营养食疗原则' }],
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
    submit() {},
    handleCurrentChange() {},
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
.diet_rule {
  .searchCondition .searchLeft {
    flex: 1;
    .searchInputFormItem {
      width: 100%;
      .el-input {
        width: 95%;
      }
    }
  }
}
/deep/ .el-table {
  margin: 20px 0;
  .table-row {
    height: 44px;
  }
  .el-checkbox__inner {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    &::after {
      top: 2px;
      left: 5px;
    }
  }
}
.add-box {
  text-align: right;
  margin: 20px 0;
  padding-bottom: 20px;
  border-bottom: 1px dashed #dde0e6;
  .el-button {
    background-color: #36bf2f;
    border-radius: 5px !important;
    border-color: #36bf2f;
    margin-left: 20px;
  }
}
.added-rule-box {
  margin-top: 20px;
  min-height: 180px;
  max-height: 320px;
  overflow-y: auto;
  padding: 20px 16px 20px;
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid #dde0e6;
  p {
    font-size: 12px;
    font-weight: 400;
    color: #333333;
    line-height: 18px;
  }
}
.dialog-footer {
  text-align: center;
}
</style>
