<template>
  <el-form ref="form" :model="formData" class="clientInfoFrom" label-width="90px" label-suffix="：">
    <el-row>
      <el-col :span="6">
        <el-form-item label="姓名" prop="clientId">
          <el-popover
                  ref="userPopover"
                  placement="bottom-start"
                  width="650"
                  trigger="click"
                  :disabled="!!id"
                  @show="popoverStatus = true"
                  @hide="popoverStatus = false"
          >
            <select-user v-if="popoverStatus" @change="handlePopoperClose"></select-user>
            <el-input
                    :class="`select-user-trigger ${id ? 'disabled' : ''}`"
                    slot="reference"
                    disabled
                    v-model="formData.clientName"
                    placeholder="请选择客户">
              <i :class="`el-icon-arrow-${popoverStatus ? 'up' : 'down'}`" slot="suffix"></i>
            </el-input>
          </el-popover>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="性别" prop="gender">
          <el-radio-group :disabled="true" v-model="formData.gender">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="出生日期" prop="birthday">
          <el-date-picker v-model="formData.birthday" style="width: 100%"
                          disabled></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="身份证号" prop="cardNo">
          <el-input v-model="formData.cardNo" disabled></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <!--<el-col :span="6">
        <el-form-item label="问卷类型" prop="questionType">
          <el-select v-model="formData.questionType"
                  placeholder="请选择问卷类型"
                  @change="onTypeChange">
            <el-option
                    :label="item.name"
                    :value="item.paramValue"
                    :key="item.paramValue"
                    v-for="item in options">

            </el-option>
          </el-select>
        </el-form-item>
      </el-col>-->
      <el-col :span="6">
        <el-form-item label="民族" prop="ethnicGroupName">
          <el-input v-model="formData.ethnicGroupName" disabled></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="formData.mobile" disabled></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="学历" prop="educationLevelName">
          <el-input v-model="formData.educationLevelName" disabled></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="职业类型" prop="professionName">
          <el-input v-model="formData.professionName" disabled></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="婚姻" prop="marriageName">
          <el-input v-model="formData.marriageName" disabled></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="工作单位" prop="workUnitName">
          <el-input v-model="formData.workUnitName" disabled></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="现居地址" prop="address">
          <el-input v-model="formData.address" disabled></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="问卷日期" prop="createTime">
          <el-date-picker v-model="formData.createTime" style="width: 100%"
                          value-format="yyyy-MM-dd"
                          placeholder="" @change="chooseTime"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import SelectUser from '../medical_history_select_user.vue';
export default {
  name: 'ClientInfo',
  props: ['id', 'propsData'],
  components: {
    SelectUser,
  },
  data() {
    return {
      popoverStatus: false,
      formData: {
        createTime: new Date(),
        mobile: '',
      },
    };
  },
  mounted() {},
  watch: {
    propsData(val) {
      console.log(val);
      this.formData = val;
      this.formData.createTime = val.questionDate;
    },
  },
  methods: {
    handlePopoperClose(data) {
      this.$refs.userPopover.doClose();
      this.popoverStatus = false;
      this.formData.clientName = data.name;
      this.formData.clientId = data.id;
      this.getClientUserInfo(this.formData.clientId);
      this.$refs.form.validateField('clientId');
    },
    getClientUserInfo(id) {
      this.$api.userManagerInterface.getDetail(id).then(({ data }) => {
        this.setData(data.data);
        this.$emit('change', this.formData.clientId);
      });
    },
    setData(data) {
      this.formData.birthday = data.birthday;
      this.formData.cardNo = data.cardNo;
      this.formData.mobile = data.mobile;
      this.formData.ethnicGroupName = data.ethnicGroupName;
      this.formData.educationLevelName = data.educationLevelName;
      this.formData.marriageName = data.marriageName;
      this.formData.professionName = data.professionName;
      this.formData.workUnitName = data.workUnitName;
      this.formData.address = data.address;
      this.formData.gender = data.gender;
    },
    chooseTime() {
      console.log(this.formData.createTime);
      this.$emit('changeDate', this.formData.createTime);
    },
  },
};
</script>

<style lang="scss" scoped>
  .clientInfoFrom{
    /*/deep/ .el-input__inner {
      color: #333;
    }*/
    /deep/ .el-date-editor.el-input{
      width: auto;
    }
    /deep/ .select-user-trigger {
      .el-input__suffix{
        right: 15px;
      }
      input{
        border: 1px solid #DDE0E6!important;
      }
      input, i {
        background-color: white!important;
        cursor: pointer;
        color: #333333;
        &::placeholder{
          color: #999999!important;
        }
      }
      &.disabled {
        input, i {
          cursor: not-allowed;
        }
      }
    }
  }
</style>
