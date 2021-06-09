<template>
  <div class="staff-form">
    <el-form
      class="staff-form inputCommon staff-detail-form"
      :model="staffForm"
      ref="staffForm"
      :rules="staffRules"
      label-width="90px"
      label-suffix="："
    >
      <div class="divRightTitleDiv">
        <div class="divRightTitle" style="margin-top: 5px">新增上报
          <div class="titleBiao"></div></div>
      </div>
      <el-row>
        <el-col :span="6">
          <el-form-item label="客户姓名" prop="clientName">
            <el-popover
                    ref="userPopover"
                    placement="bottom-start"
                    width="650"
                    trigger="click"
                    @show="popoverStatus = true"
                    @hide="popoverStatus = false"
            >
              <select-user v-if="popoverStatus" @change="handlePopoperClose"></select-user>
              <el-input class="select-user-trigger"
                      slot="reference"
                      disabled
                      v-model="staffForm.clientName"
                      placeholder="请选择客户">
                <i :class="`el-icon-arrow-${popoverStatus ? 'up' : 'down'}`" slot="suffix"></i>
              </el-input>
            </el-popover>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="性别" prop="gender">
            <el-radio-group :disabled="true" v-model="staffForm.gender">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="客户编号" prop="clientNo">
            <el-input v-model="staffForm.clientNo" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="客户年龄" prop="cardNo">
            <el-input v-model="staffForm.age" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="项目名称" prop="itemName">
            <el-input
              type="text"
              placeholder="请输入"
              v-model="staffForm.itemName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="上报等级" prop="reportLv">
            <el-select
                    v-model="staffForm.reportLv"
                    placeholder="请选择"
            >
              <el-option label="红色预警" :value="1"></el-option>
              <el-option label="橙色预警" :value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="结果" prop="itemValue">
            <el-input
                    type="text"
                    placeholder="请输入"
                    v-model="staffForm.itemValue"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="上报科室" class="form-item-sex" prop="reportDepartment">
            <el-input
                    type="text"
                    placeholder="请输入"
                    v-model="staffForm.reportDepartment"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="上报医生" prop="reportUserId">
            <el-select
                    v-model="staffForm.reportUserId"
                    placeholder="请选择"
                    @change="getUserName"
            >
              <el-option :label="item.realName" :value="item.id" v-for="(item, index) in userList"
                         :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="上报时间" class="form-item-sex" prop="reportDate">
            <el-date-picker
                    style="width: 100%"
                    v-model="staffForm.reportDate"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="请选择">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注说明">
              <el-input
                      type="textarea"
                      v-model="staffForm.remark"
                      :rows="4"
                      placeholder="请输入"
                      :maxlength="300"
                      show-word-limit
                      style="width: 100%"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      <div class="form-buttons">
        <el-button size="small" class="cancelBtn" @click="cancel">取消</el-button>
        <el-button size="small" class="sureBtn" type="primary" @click="submit"
          >保存</el-button
        >
      </div>
    </el-form>
  </div>
</template>

<script>
import SelectUser from '../../archives_manage/medical_history_select_user.vue';
import * as dayjs from 'dayjs';
export default {
  name: 'StaffForm',
  components: {
    SelectUser,
  },
  data() {
    return {
      userList: [],
      popoverStatus: false,
      staffForm: {
        clientNo: '',
        gender: '',
        clientId: '',
        clientName: '',
        itemName: '',
        reportLv: '',
        itemValue: '',
        reportDepartment: '',
        reportUserId: '',
        reportUserName: '',
        reportDate: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        remark: '',
      },
      staffRules: {
        clientName: [{ required: true, message: '请选择客户' }],
        itemName: [{ required: true, message: '请输入项目名称' }],
        reportDepartment: [{ required: true, message: '请选择上报科室' }],
        itemValue: [{ required: true, message: '请输入结果' }],
        reportLv: [{ required: true, message: '请选择上报等级' }],
        reportUserId: [{ required: true, message: '请输入上报医生' }],
        reportDate: [{ required: true, message: '请选择上报时间' }],
      },
    };
  },
  mounted() {
    this.getUserList();
  },
  methods: {
    handlePopoperClose(data) {
      console.log(data);
      this.$refs.userPopover.doClose();
      this.popoverStatus = false;
      this.staffForm.clientName = data.name;
      this.staffForm.clientId = data.id;
      this.staffForm.clientNo = data.clientNo;
      this.staffForm.age = data.age;
      this.staffForm.gender = data.gender;
    },
    async getUserList() {
      const res = await this.$api.systemManageInterface
        .userList({ pageNo: 1, pageSize: 999999 });
      console.log(res.data);
      const { data } = res.data;
      if (data) {
        this.userList = data.data || [];
      }
    },
    getUserName() {
      this.staffForm.reportUserName =
        this.userList.filter(res => res.id === this.staffForm.reportUserId)[0].realName;
    },
    cancel() {
      this.$router.go(-1);
    },
    submit() {
      this.$refs.staffForm.validate((valid) => {
        if (valid) {
          this.$api.sunFollow.savePositiveTracking(this.staffForm).then(() => {
            this.$message.success('操作成功');
            this.$router.push({
              path: '/first_follow',
            });
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
  /*/deep/ .el-radio__input.is-disabled {
    cursor: auto;
    .el-radio__inner {
      cursor: auto;
    }
    + span.el-radio__label {
      color: #333;
      cursor: auto;
    }
    &.is-checked .el-radio__inner {
      background-color: #fff;
      border-color: #4991fd;
      cursor: auto;
      &::after {
        cursor: auto;
        background: #4991fd;
      }
    }
  }*/
}
</style>
