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
          <el-form-item label="体检编号" prop="birthday">
            <el-input v-model="staffForm.no" disabled></el-input>
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
          <el-form-item label="项目名称" prop="realName">
            <el-input
              type="text"
              placeholder="请输入"
              v-model="staffForm.realName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="上报等级" prop="dataRange">
            <el-select
                    v-model="staffForm.dataRange"
                    placeholder="请选择"
            >
              <el-option label="红色预警" :value="0"></el-option>
              <el-option label="橙色预警" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="结果" prop="result">
            <el-input
                    type="text"
                    placeholder="请输入"
                    v-model="staffForm.result"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="上报科室" class="form-item-sex" prop="subject">
            <el-select
                    :disabled="detail"
                    v-model="staffForm.subject"
                    placeholder="请选择"
            >
              <el-option label="外科" :value="0"></el-option>
              <el-option label="内科" :value="1"></el-option>
              <el-option label="五官" :value="0"></el-option>
              <el-option label="检验科" :value="0"></el-option>
              <el-option label="心血管科" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="上报医生" prop="doctor">
            <el-input
                    type="text"
                    placeholder="请输入"
                    v-model="staffForm.doctor"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="上报时间" class="form-item-sex" prop="createTime">
            <el-date-picker
                    style="width: 100%"
                    v-model="staffForm.createTime"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    placeholder="请选择">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注说明" prop="desc">
              <el-input
                      type="textarea"
                      v-model="staffForm.desc"
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
        <el-button size="small" v-if="!detail" class="sureBtn" type="primary" @click="submit"
          >保存</el-button
        >
      </div>
    </el-form>
  </div>
</template>

<script>
import SelectUser from '../../archives_manage/medical_history_select_user.vue';
export default {
  name: 'StaffForm',
  components: {
    SelectUser,
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
      gridList: [],
      formData: {
        gridId: '',
      },
      relationOptions: [{ value: 0, name: '<' }, { value: 1, name: '≤' }, { value: 2, name: '>' },
        { value: 3, name: '≥' }, { value: 4, name: '区间' }],
      popoverStatus: false,
      staffForm: {
        id: this.id,
        no: '',
        gender: '',
        clientId: '',
        clientName: '',
        mobileNo: '',
        realName: '',
        subject: '',
        project: '',
        doctor: '',
        createTime: '',
        sex: '',
        roleId: '',
        dataRange: '',
        result: '',
        desc: '',
        // menuIds: [],
      },
      staffRules: {
        clientName: [{ required: true, message: '请选择客户' }],
        realName: [{ required: true, message: '请输入项目名称' }],
        subject: [{ required: true, message: '请选择上报科室' }],
        result: [{ required: true, message: '请输入结果' }],
        dataRange: [{ required: true, message: '请选择上报等级' }],
        doctor: [{ required: true, message: '请输入上报医生' }],
        createTime: [{ required: true, message: '请选择上报时间' }],
      },
      roleMenuIds: [],
      roleMenuIdsMap: {},
      newRoleOptions: [...this.roleOptions],
    };
  },
  mounted() {
    this.queryList();
    /* if (this.id) {
      // 用户详情
      this.$api.systemManageInterface.userDetail(this.id).then(async (res) => {
        const { data } = res;
        this.staffForm = Object.assign(this.staffForm, data.data || {});
        // type为0: 超级管理员，下拉选项添加超级管理员选项
        if (this.staffForm.type) {
          this.queryRoleDetail(this.staffForm.roleId);
        } else {
          this.newRoleOptions.push({
            id: this.staffForm.roleId,
            name: this.staffForm.roleName,
          });
        }
      });
    } else if (this.roleOptions.length > 0) {
      this.staffForm.roleId = this.roleOptions[0].id;
      this.queryRoleDetail(this.staffForm.roleId);
    }*/
  },
  methods: {
    handleMobileChange() {
      this.staffForm.mobileNo = this.staffForm.mobileNo.replace(/[^0-9]/g, '');
    },
    handlePopoperClose(data) {
      console.log(data);
      this.$refs.userPopover.doClose();
      this.popoverStatus = false;
      this.staffForm.clientName = data.name;
      this.staffForm.clientId = data.id;
      this.staffForm.no = '201806084856';
      this.staffForm.age = data.age;
      this.staffForm.gender = data.gender;
      // this.getClientUserInfo(this.staffForm.clientId);
      // this.$refs.form.validateField('clientId');
    },
    /* getClientUserInfo(id) {
      this.$api.userManagerInterface.getDetail(id).then(({ data }) => {
        this.setData(data.data);
      });
    },
    setData(data) {
      this.staffForm.no = '201806084856';
      this.staffForm.age = data.age;
      this.staffForm.gender = data.gender;
    },*/
    async queryList() {
      const res = await this.$api.physicalProjectListInterface.listOrganItemLibrary();
      //   const res = await this.$api.PhysicalProjectListInterface.listOrganItemLibrary({
      //     keywords: this.keyword,
      //     pageNo: this.currentPage,
      //     pageSize: this.pageSize,
      //   });
      console.log(res.data);
      const { data } = res.data;
      if (data) {
        this.gridList = data || [];
      }
    },
    async queryRoleDetail(id) {
      // 角色详情
      await this.$api.systemManageInterface.roleDetail(id).then((res) => {
        const { data } = res;
        const role = data.data || {};
        this.roleMenuIds = role.menuIds;
        this.roleMenuIdsMap[id] = this.roleMenuIds;
      });
    },
    cancel() {
      this.$router.go(-1);
    },
    submit() {
      this.$refs.staffForm.validate((valid) => {
        if (valid) {
          /* const fn = this.staffForm.id ? 'editUser' : 'addUser';
          this.$api.systemManageInterface[fn](this.staffForm).then(() => {
            this.$message.success('操作成功');
            this.$emit('afterSubmit');
          });
        }*/
          this.$message.success('操作成功');
          this.$router.push({
            path: '/first_follow',
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
