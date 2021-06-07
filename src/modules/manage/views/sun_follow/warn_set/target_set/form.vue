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
        <div class="divRightTitle">{{detail ? '查看' : (id ? '编辑' : '新增')}}指标
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
      </el-row>
      <el-row>
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
        <div class="divRightTitle" style="margin-top: 10px">模板条件
          <div class="titleBiao"></div></div>
      </div>
      <el-row style="display: flex">
        <el-col :span="6">
        <el-form-item label="检查项目" prop="clientName">
          <el-popover
                  ref="userPopover"
                  placement="top-start"
                  width="545"
                  trigger="click"
                  @show="planuserModalVisible = true"
                  @hide="planuserModalVisible = false"
          >
            <manager-list v-if="planuserModalVisible"
                          @change="handlePlanuserSelectChange"
                          @cancel="handlePlanuserClose"></manager-list>
            <el-input class="select-user-trigger" slot="reference"
                      :disabled="planUserName !== '' ? false : true"
                      v-model="planUserName" placeholder="请输入">
              <i :class="`el-icon-arrow-${planuserModalVisible ? 'up' : 'down'}`"
                 slot="suffix"></i>
            </el-input>
          </el-popover>
        </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="科室名称" prop="sectionName">
            <el-input
                    :disabled="detail"
                    type="text"
                    placeholder="请输入"
                    v-model="staffForm.sectionName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="小项名称" prop="itemName">
            <el-input
                    :disabled="detail"
                    type="text"
                    placeholder="请输入"
                    v-model="staffForm.itemName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="小项条件" prop="itemCondition">
            <el-select
                    v-model="staffForm.itemCondition"
                    placeholder="请选择"
                    @change="changeItemCondition"
            >
              <el-option
                      v-for="(item, index) in relationOptions"
                      :label="item.name"
                      :value="item.value"
                      :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="条件的值" :prop="staffForm.itemCondition !== 6 ? 'itemValue' : ''"
                        ref="itemValue">
            <el-input
                    :disabled="staffForm.itemCondition === 6"
                    type="text"
                    :placeholder="staffForm.itemCondition !== 6 ? '请输入' : ''"
                    v-model="staffForm.itemValue"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="低值" :prop="staffForm.itemCondition === 6
          || staffForm.itemCondition === '' ? 'minItemValue' : ''" ref="minItemValue">
            <el-input
                    :disabled="staffForm.itemCondition !== 6 && staffForm.itemCondition !== ''"
                    type="text"
                    :placeholder="staffForm.itemCondition === 6
                    || staffForm.itemCondition === '' ? '请输入' : ''"
                    v-model="staffForm.minItemValue"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="高值" :prop="staffForm.itemCondition === 6
          || staffForm.itemCondition === '' ? 'maxItemValue' : ''" ref="maxItemValue">
            <el-input
                    :disabled="staffForm.itemCondition !== 6 && staffForm.itemCondition !== ''"
                    type="text"
                    :placeholder="staffForm.itemCondition === 6
                    || staffForm.itemCondition === '' ? '请输入' : ''"
                    v-model="staffForm.maxItemValue"></el-input>
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
import ManagerList from '@/components/date_select/project_open.vue';
export default {
  name: 'StaffForm',
  components: {
    ManagerList,
  },
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
      planUserName: '',
      planuserModalVisible: false, // 干预人人列表弹窗
      relationOptions: [{ value: 1, name: '>' }, { value: 2, name: '=' }, { value: 3, name: '<' },
        { value: 4, name: '≥' }, { value: 5, name: '≤' }, { value: 6, name: '区间' }],
      staffForm: {
        id: this.id,
        templateType: 1,
        name: '',
        roleId: '',
        trackingLv: '',
        gender: '',
        minAge: '',
        maxAge: '',
        sectionName: '',
        itemName: '',
        itemCondition: '',
        itemValue: '',
        minItemValue: '',
        maxItemValue: '',
      },
      staffRules: {
        name: [{ required: true, message: '请输入模板名称' }],
        trackingLv: [{ required: true, message: '请选择预警分类' }],
        sectionName: [{ required: true, message: '请输入科室名称' }],
        itemName: [{ required: true, message: '请输入小项名称' }],
        itemCondition: [{ required: true, message: '请选择小项条件' }],
        itemValue: [{ required: true, message: '请输入条件的值' }],
        minItemValue: [{ required: true, message: '请输入低值' }],
        maxItemValue: [{ required: true, message: '请输入高值' }],
      },
    };
  },
  mounted() {
    if (this.id) {
      this.$api.sunFollow.getWarnTemplateDetail({ id: this.id }).then(async (res) => {
        const { data } = res;
        this.staffForm.name = data.data.name;
        this.staffForm.trackingLv = data.data.trackingLv;
        this.staffForm.gender = data.data.gender;
        this.staffForm.minAge = data.data.minAge;
        this.staffForm.maxAge = data.data.maxAge;
        this.staffForm.sectionName = data.data.sectionName;
        this.planUserName = data.data.itemName;
        this.staffForm.itemName = data.data.itemName;
        this.staffForm.itemCondition = data.data.itemCondition;
        this.staffForm.itemValue = data.data.itemValue;
        this.staffForm.minItemValue = data.data.minItemValue;
        this.staffForm.maxItemValue = data.data.maxItemValue;
      });
    }
  },
  methods: {
    // 关闭小项列表
    handlePlanuserSelectChange(dataList) {
      this.$refs.userPopover.doClose();
      this.planuserModalVisible = false;
      this.planUserName = dataList.itemName;
      this.staffForm.sectionName = dataList.sectionName;
      this.staffForm.itemName = dataList.itemName;
    },
    handlePlanuserClose() {
      this.planuserModalVisible = false;
      this.$refs.userPopover.doClose();
    },
    changeItemCondition(val) {
      console.log(val);
      if (val === 6) {
        this.staffForm.itemValue = '';
        this.$refs.itemValue.clearValidate();
      } else {
        this.staffForm.minItemValue = '';
        this.staffForm.maxItemValue = '';
        this.$refs.minItemValue.clearValidate();
        this.$refs.maxItemValue.clearValidate();
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
  /deep/ .select-user-trigger {
    line-height: 37px;
    input{
      border: 1px solid #DDE0E6!important;
      background-color: white!important;
    }
    input, i {
      cursor: pointer;
    }
    &.disabled {
      input, i {
        background-color: white!important;
        cursor: not-allowed;
      }
    }
    .el-input__suffix{
      width: 25px;
      right: 5px;
    }
  }
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
