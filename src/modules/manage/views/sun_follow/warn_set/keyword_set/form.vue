<template>
  <div class="staff-form">
    <el-form
      :class="{ 'staff-form inputCommon': true, 'staff-detail-form': detail }"
      :model="staffForm"
      ref="staffForm"
      :rules="staffRules"
      label-width="90px"
      label-suffix="："
    >
      <div class="divRightTitleDiv">
        <div class="divRightTitle">{{detail ? '查看' : (id ? '编辑' : '新增')}}关键字配置
          <div class="titleBiao"></div></div>
      </div>
      <el-row>
        <el-col :span="6">
          <el-form-item label="模板名称" prop="name">
            <el-input
              :disabled="detail"
              type="text"
              placeholder="请输入"
              v-model="staffForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="科室" class="form-item-sex" prop="sectionName">
            <!--<el-input
                    :disabled="detail"
                    type="text"
                    placeholder="请输入"
                    v-model="staffForm.sectionName"></el-input>-->
            <el-select
                    :disabled="detail"
                    v-model="staffForm.sectionName"
                    placeholder="请选择"
                    @change="getItemList"
            >
              <el-option :label="item.sectionName" :value="item.sectionName"
                         v-for="(item, index) in departmentList"
                         :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="项目" class="form-item-sex"  prop="itemName">
            <!--<el-input
                    :disabled="detail"
                    type="text"
                    placeholder="请输入"
                    v-model="staffForm.itemName"></el-input>-->
            <el-select
                    :disabled="detail"
                    v-model="staffForm.itemName"
                    placeholder="请选择"
                    @change="getItemList"
            >
              <el-option :label="item.itemName" :value="item.itemName"
                         v-for="item in itemList"
                         :key="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="预警分类" prop="trackingLv">
            <el-select
                    :disabled="detail"
                    v-model="staffForm.trackingLv"
                    placeholder="请选择"
            >
              <el-option label="红色预警" :value="1"></el-option>
              <el-option label="橙色预警" :value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="适用性别" class="form-item-sex">
            <el-select
                    :disabled="detail"
                    v-model="staffForm.gender"
                    placeholder="请选择"
            >
              <el-option label="不限" :value="0">不限</el-option>
              <el-option label="男" :value="1">男</el-option>
              <el-option label="女" :value="2">女</el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="18">
          <el-form-item label="适宜年龄">
            <el-input
                    :disabled="detail"
                    type="text"
                    style="width: 140px"
                    placeholder="请输入"
                    v-model="staffForm.minAge"></el-input>
            -
            <el-input
                    :disabled="detail"
                    style="width: 140px"
                    type="text"
                    placeholder="请输入"
                    v-model="staffForm.maxAge"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="divRightTitleDiv">
        <div class="divRightTitle" style="margin-top: 10px">条件配置
          <div class="titleBiao"></div></div>
      </div>
      <el-row>
        <el-col :span="24">
          <el-form-item label="包含以下全部关键字" label-width="170px">
            <el-input v-model="staffForm.warnTemplateItemKeywordsSaveRequests[0].keyword"
                      placeholder="多个关键字用“；”隔开"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="包含以下任意关键字" label-width="170px">
            <el-input v-model="staffForm.warnTemplateItemKeywordsSaveRequests[1].keyword"
                      placeholder="多个关键字用“；”隔开"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="不包含以下全部关键字" label-width="170px">
            <el-input v-model="staffForm.warnTemplateItemKeywordsSaveRequests[2].keyword"
                      placeholder="多个关键字用“；”隔开"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="form-buttons">
        <el-button size="small" class="cancelBtn" @click="$emit('cancel')">{{
          detail ? '返回' : '取消'
        }}</el-button>
        <el-button size="small" v-if="!detail" class="sureBtn" type="primary" @click="submit"
          >保存</el-button
        >
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
    roleOptions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      gridList: [],
      departmentList: [],
      itemList: [],
      relationOptions: [{ value: 0, name: '<' }, { value: 1, name: '≤' }, { value: 2, name: '>' },
        { value: 3, name: '≥' }, { value: 4, name: '区间' }],
      staffForm: {
        id: this.id,
        templateType: 2,
        name: '',
        sectionName: '',
        itemName: '',
        trackingLv: '',
        gender: '',
        minAge: '',
        maxAge: '',
        warnTemplateItemKeywordsSaveRequests: [
          { keyword: '', keywordType: 1 },
          { keyword: '', keywordType: 2 },
          { keyword: '', keywordType: 3 },
        ],
      },
      staffRules: {
        name: [{ required: true, message: '请输入模板名称' }],
        sectionName: [{ required: true, message: '请输入科室名称' }],
        itemName: [{ required: true, message: '请输入项目名称' }],
        trackingLv: [{ required: true, message: '请选择预警分类' }],
      },
    };
  },
  mounted() {
    this.getSectionList();
  },
  methods: {
    async getSectionList() {
      const res = await this.$api.physicalProjectListInterface
        .getSectionList({ pageNo: 1, pageSize: 999999 });
      console.log(res.data);
      const { data } = res.data;
      this.departmentList = data.data || [];
      this.getDetail();
    },
    async getItemList() {
      const res = await this.$api.physicalProjectListInterface
        .listPage({ pageNo: 1, pageSize: 999999, sectionName: this.staffForm.sectionName });
      console.log(res.data);
      const { data } = res.data;
      if (data) {
        this.itemList = data.data || [];
      }
    },
    getDetail() {
      if (this.id) {
        // 详情
        this.$api.sunFollow.getWarnTemplateDetail({ id: this.id }).then(async (res) => {
          const { data } = res;
          this.staffForm.name = data.data.name;
          this.staffForm.sectionName = data.data.sectionName;
          this.staffForm.itemName = data.data.itemName;
          this.staffForm.trackingLv = data.data.trackingLv;
          this.staffForm.gender = data.data.gender;
          this.staffForm.minAge = data.data.minAge;
          this.staffForm.maxAge = data.data.maxAge;
          this.staffForm.warnTemplateItemKeywordsSaveRequests =
            data.data.warnTemplateItemKeywordsDtos;
          this.getItemList();
        });
      }
    },
    submit() {
      this.$refs.staffForm.validate((valid) => {
        if (valid) {
          this.$api.sunFollow.saveWarnTemplate(this.staffForm).then(() => {
            this.$message.success('操作成功');
            this.$emit('afterSubmit');
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.staff-form {
  .form-buttons {
    text-align: center;
    margin-top: 30px;
    button + button {
      margin-left: 20px;
    }
  }
  /deep/ .el-select {
    width: 100%;
    .is-disabled .el-input__suffix {
      display: none;
    }
  }
}
</style>
