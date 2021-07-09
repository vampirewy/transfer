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
        <div class="divRightTitle">查看指标
          <div class="titleBiao"></div></div>
      </div>
      <el-row>
        <el-col :span="6">
          <el-form-item label="模板名称">
            <span>{{staffForm.name | getResult}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="预警分类">
            <span>
              {{staffForm.trackingLv === 1 ? '红色预警' : '橙色预警' }}
            </span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="适用性别" class="form-item-sex">
            <span>{{staffForm.gender | getResultGender}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="适宜年龄">
            <span>
                  {{staffForm.minAge}}
                  -
                  {{staffForm.maxAge }}
                </span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="条件关系" class="form-item-sex">
            <span>{{staffForm.conditionRelation === 1 ? '全部' :
              staffForm.conditionRelation === 2 ? '任意' : ''}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="divRightTitleDiv">
        <div class="divRightTitle">模板条件
          <div class="titleBiao"></div></div>
      </div>
      <el-table :data="staffForm.warnTemplateItemDtos" align="center">
        <el-table-column label="科室名称" prop="sectionName">
          <template slot-scope="scope">
            {{scope.row.sectionName | getResult}}
          </template>
        </el-table-column>
        <el-table-column label="小项名称" prop="itemName">
          <template slot-scope="scope">
            {{scope.row.itemName | getResult}}
          </template>
        </el-table-column>
        <el-table-column label="小项条件" prop="itemName">
          <template slot-scope="scope">
            {{relationOptions.find(res => res.value === scope.row.itemCondition).name | getResult}}
          </template>
        </el-table-column>
        <el-table-column label="条件的值" prop="itemValue">
          <template slot-scope="scope">
            {{scope.row.itemValue | getResult}}
          </template>
        </el-table-column>
        <el-table-column label="低值" prop="minItemValue">
          <template slot-scope="scope">
            {{scope.row.minItemValue | getResult}}
          </template>
        </el-table-column>
        <el-table-column label="高值" prop="maxItemValue">
          <template slot-scope="scope">
            {{scope.row.maxItemValue | getResult}}
          </template>
        </el-table-column>
      </el-table>
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
    detail: {
      type: Boolean,
      default: false,
    },
    id: {
      type: [String, Number],
      required: false,
      default: '',
    },
  },
  data() {
    return {
      relationOptions: [{ value: 1, name: '>' }, { value: 2, name: '=' }, { value: 3, name: '<' },
        { value: 4, name: '≥' }, { value: 5, name: '≤' }, { value: 6, name: '区间' }],
      staffForm: {},
    };
  },
  mounted() {
    this.$api.sunFollow.getWarnTemplateDetail({ id: this.id }).then(async (res) => {
      const { data } = res;
      this.staffForm = data.data;
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
