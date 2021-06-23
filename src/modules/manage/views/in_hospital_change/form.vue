<template>
  <div class="staff-form">
    <el-form
      :class="{ 'staff-form inputCommon': true }"
      :model="staffForm"
      ref="staffForm"
      :rules="staffRules"
      label-width="90px"
      label-suffix="："
    >
      <div class="divRightTitleDiv">
        <div class="divRightTitle" style="margin-top: 5px">新增预约
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
          <el-form-item label="手机号码" prop="birthday">
            <el-input v-model="staffForm.mobile" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="身份证号" prop="birthday">
            <el-input v-model="staffForm.cardNo" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="初步印象" prop="primaFacie">
              <el-input
                      type="textarea"
                      v-model="form.primaFacie"
                      :rows="4"
                      placeholder="请输入"
                      :maxlength="300"
                      show-word-limit
                      style="width: 100%"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="转诊说明" prop="referralIntro">
            <el-input
                    type="textarea"
                    v-model="form.referralIntro"
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
        <!--<el-button size="small" class="sureBtn" type="primary" @click="submit"
          >保存</el-button
        >-->
        <el-button size="small" class="sureBtn" type="primary" @click="registerOpenFunc"
        >下一步</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import SelectUser from '../archives_manage/medical_history_select_user.vue';
import registerOpen from './el_modal/registerOpen.vue';
export default {
  name: 'StaffForm',
  components: {
    SelectUser,
    registerOpen,
  },
  data() {
    return {
      popoverStatus: false,
      staffForm: {
        // id: this.id,
        clientNo: '',
        gender: '',
        age: '',
        clientId: '',
        clientName: '',
        mobile: '',
        cardNo: '',
      },
      form: {
        clientId: '',
        primaFacie: '',
        referralIntro: '',
      },
      staffRules: {
        clientName: [{ required: true, message: '请选择客户' }],
      },
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
    handlePopoperClose(data) {
      console.log(data);
      this.$refs.userPopover.doClose();
      this.popoverStatus = false;
      this.staffForm.clientName = data.name;
      this.staffForm.clientId = data.id;
      this.staffForm.clientNo = data.clientNo;
      this.staffForm.age = data.age;
      this.staffForm.gender = data.gender;
      this.staffForm.mobile = data.mobile;
      this.staffForm.cardNo = data.cardNo;
      this.form.clientId = data.id;
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
    /**
     * 查看
     */
    registerOpenFunc() {
      this.$refs.staffForm.validate((valid) => {
        if (valid) {
          const Row = Object.assign({}, this.staffForm, this.form);
          this.$jDynamic.show({
            component: 'registerOpen',
            data: {
              modalTitle: '预约挂号',
              propsData: Row,
              confirmfunc: async (value) => {
                console.log(value);
              },
            },
            render: h => h(registerOpen),
          });
        }
      });
    },
    cancel() {
      this.$router.go(-1);
    },
    submit() {
      this.$refs.staffForm.validate((valid) => {
        if (valid) {
          this.$api.InhospitalChange.saveRegistration(this.form).then(() => {
            this.$message.success('操作成功');
            this.$router.push({
              path: '/in_hospital_change',
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
}
</style>
