<template>
  <div class="staff-form">
    <el-form
      class="staff-form inputCommon staff-detail-form"
      :model="staffForm"
      ref="staffForm"
      label-width="90px"
      label-suffix="："
    >
      <div class="divRightTitleDiv">
        <div class="divRightTitle">查看-关键字配置
          <div class="titleBiao"></div></div>
      </div>
      <el-row>
        <el-col :span="6">
          <el-form-item label="模板名称">
            <span>{{staffForm.name | getResult}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="科室">
            <span>{{staffForm.sectionName | getResult}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="项目">
            <span>{{staffForm.itemName | getResult}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="预警分类">
            <span>
              {{staffForm.trackingLv === 1 ? '红色预警' : '橙色预警' }}
            </span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="适用性别" class="form-item-sex">
            <span>{{staffForm.gender | getResultGender}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="18">
          <el-form-item label="适宜年龄">
             <span>
                  {{staffForm.minAge}}
                  -
                  {{staffForm.maxAge }}
                </span>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="divRightTitleDiv">
        <div class="divRightTitle">条件配置
          <div class="titleBiao"></div></div>
      </div>
      <el-row>
        <el-col :span="24">
          <el-form-item label="包含以下全部关键字" label-width="170px">
            <el-input v-model="staffForm.warnTemplateItemKeywordsDtos0keyword"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="包含以下任意关键字" label-width="170px">
            <el-input v-model="staffForm.warnTemplateItemKeywordsDtos1keyword"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="不包含以下全部关键字" label-width="170px">
            <el-input v-model="staffForm.warnTemplateItemKeywordsDtos2keyword"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="form-buttons">
        <el-button size="small" class="cancelBtn" @click="$emit('cancel')">返回</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'StaffForm',
  props: {
    id: {
      type: [String, Number],
      required: false,
      default: '',
    },
  },
  data() {
    return {
      staffForm: {},
    };
  },
  mounted() {
    this.$api.sunFollow.getWarnTemplateDetail({ id: this.id }).then(async (res) => {
      const { data } = res;
      this.staffForm = data.data;
      this.staffForm.warnTemplateItemKeywordsDtos0keyword =
        data.data.warnTemplateItemKeywordsDtos[0].keyword;
      this.staffForm.warnTemplateItemKeywordsDtos1keyword =
        data.data.warnTemplateItemKeywordsDtos[1].keyword;
      this.staffForm.warnTemplateItemKeywordsDtos2keyword =
        data.data.warnTemplateItemKeywordsDtos[2].keyword;
    });
  },
};
</script>

<style lang="scss" scoped>
.staff-form {
  /deep/ .el-form-item{
    margin-bottom: 10px;
  }
  .form-buttons {
    text-align: center;
    margin-top: 30px;
    button + button {
      margin-left: 20px;
    }
  }
}
</style>
