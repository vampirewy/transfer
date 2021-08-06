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
      <div class="title">{{detail ? '查看' : (id ? '编辑' : '新增')}}员工</div>
      <el-row>
        <el-col :span="6">
          <el-form-item label="用户角色" prop="roleId">
            <el-select
                    :disabled="detail"
                    v-model="staffForm.roleId"
                    placeholder="请选择"
            >
              <!--@change="roleChange"-->
              <el-option
                      v-for="item in newRoleOptions"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="用户姓名" prop="realName">
            <el-input
                    :disabled="detail"
                    type="text"
                    placeholder="请输入"
                    v-model="staffForm.realName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="性别" prop="sex" class="form-item-sex">
            <el-radio-group :disabled="detail" v-model="staffForm.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="是否启用">
            <el-switch
                    v-model="staffForm.state"
                    :active-value="1"
                    :inactive-value="0"
                    active-color="#13ce66"
            >
            </el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="登录名" prop="mobileNo">
            <el-input
                    :disabled="detail"
                    v-model="staffForm.mobileNo"
                    :maxlength="30"
                    placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="!id">
          <el-form-item label="登陆密码" prop="password">
            <el-input
                    :disabled="detail"
                    type="text"
                    :maxlength="30"
                    placeholder="请输入"
                    v-model="staffForm.password"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="手机号码" prop="contact">
            <el-input
                    :disabled="detail"
                    type="text"
                    @input="handleMobileChange"
                    placeholder="请输入"
                    maxlength="11"
                    v-model="staffForm.contact"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="科室/部门" prop="department">
            <el-input
                    :disabled="detail"
                    v-model="staffForm.department"
                    :maxlength="30"
                    placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="管理范围" prop="dataRange">
            <el-select
                    :disabled="detail"
                    v-model="staffForm.dataRange"
                    placeholder="请选择"
            >
              <el-option label="管理员" :value="2"></el-option>
              <el-option label="单位管理" :value="3"></el-option>
              <el-option label="健康医生" :value="4"></el-option>
              <el-option label="类别管理" :value="5"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="staffForm.dataRange === 3">
          <el-form-item label="单位" prop="workUnitIdList">
            <el-select
                    v-model="staffForm.workUnitIdList"
                    placeholder="请选择"
                    multiple
            >
              <el-option
                      v-for="item in workUnitList"
                      :key="item.unitId"
                      :label="item.unitName"
                      :value="item.unitId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="staffForm.dataRange === 5">
          <el-form-item label="类别" prop="gridIdList">
            <el-select
                    v-model="staffForm.gridIdList"
                    placeholder="请选择"
                    multiple
            >
              <el-option :label="item.gridName" :value="item.id" v-for="(item, index) in gridList"
                         :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!--<template v-if="staffForm.type !== 0">
        <div class="title permission-title">权限管理</div>
        <permission
          :roleData="roleMenuIds"
          :data="staffForm.menuIds"
          :disabled="detail"
          isFilter
          @change="val => (staffForm.menuIds = val)"
        ></permission>
      </template>-->
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
import Permission from '../permission.vue';

export default {
  name: 'StaffForm',
  components: {
    Permission,
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
      staffForm: {
        id: this.id,
        mobileNo: '',
        realName: '',
        contact: '',
        password: '',
        sex: '',
        state: 1,
        roleId: '',
        dataRange: '',
        department: '',
        workUnitIdList: [],
        gridIdList: [],
        // menuIds: [],
      },
      staffRules: {
        mobileNo: [{ required: true, message: '账号不能为空' }],
        realName: [{ required: true, message: '姓名不能为空' }],
        sex: [{ required: true, message: '性别不能为空' }],
        roleId: [{ required: true, message: '角色不能为空' }],
        password: [{ required: true, message: '登录不能为空' }],
        contact: [{ required: true, message: '手机号码不能为空' }],
        dataRange: [{ required: true, message: '数据范围不能为空' }],
        department: [{ required: true, message: '科室/部门不能为空' }],
        workUnitIdList: [{ required: true, message: '单位不能为空' }],
        gridIdList: [{ required: true, message: '类别不能为空' }],
      },
      roleMenuIds: [],
      roleMenuIdsMap: {},
      newRoleOptions: [...this.roleOptions],
      workUnitList: [],
      gridList: [],
    };
  },
  mounted() {
    this.getGridList();
    this.getWorkUnitList();
  },
  methods: {
    handleMobileChange() {
      this.staffForm.contact = this.staffForm.contact.replace(/[^0-9]/g, '');
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
    async getWorkUnitList() {
      const res = await this.$api.companyManageInterface.getWorkUnitList({});
      const { data } = res;
      this.workUnitList = data.data || [];
      this.getDetail();
    },
    async getGridList() {
      const res = await this.$api.userManagerInterface.getGridList({ pageNo: 1, pageSize: 100000 });
      const { data } = res.data;
      this.gridList = data.data;
    },
    getDetail() {
      if (this.id) {
        // 用户详情
        this.$api.systemManageInterface.userDetail(this.id).then(async (res) => {
          const { data } = res;
          this.staffForm = Object.assign(this.staffForm, data.data || {});
          if (data.data.dataRange === 3) { // 单位管理
            const sameWork = [];
            data.data.rangeNames.forEach((item) => {
              this.workUnitList.forEach((itemList) => {
                // 比较a1和a2，如果a1里面的数据a2中已经存在了，就拿出
                if (item === itemList.workUnitName) {
                  sameWork.push(itemList.id);
                }
              });
            });
            this.staffForm.workUnitIdList = sameWork;
          } else if (data.data.dataRange === 5) { // 类别管理
            this.staffForm.gridIdList = data.data.rangeNames;
          }
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
      }
    },
    roleChange(id) {
      // 切换角色，读取缓存数据，没有缓存则查询角色详情
      this.roleMenuIds = [];
      if (this.roleMenuIdsMap[id]) {
        this.roleMenuIds = this.roleMenuIdsMap[id];
      } else {
        this.queryRoleDetail(id);
      }
    },
    submit() {
      const sendData = Object.assign({}, this.staffForm);
      if (sendData.dataRange === 3) {
        const sameWork = [];
        sendData.workUnitIdList.forEach((item) => {
          this.workUnitList.forEach((itemList) => {
            // 比较a1和a2，如果a1里面的数据a2中已经存在了，就拿出
            if (item === itemList.id) {
              sameWork.push(itemList.workUnitName);
            }
          });
        });
        sendData.rangeNames = sameWork;
      } else if (sendData.dataRange === 5) {
        sendData.rangeNames = sendData.gridIdList;
      }
      console.log(sendData);
      this.$refs.staffForm.validate((valid) => {
        if (valid) {
          const fn = sendData.id ? 'editUser' : 'addUser';
          this.$api.systemManageInterface[fn](sendData).then(() => {
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
  .title {
    font-size: 16px;
    font-weight: 600;
    color: #333333;
    line-height: 25px;
    position: relative;
    margin-bottom: 20px;
    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 2px;
      transform: translateY(-50%);
      width: 32px;
      height: 4px;
      background: #3154AC;
      border-radius: 3px;
      opacity: 0.5;
    }
    &.permission-title {
      margin-top: 10px;
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
