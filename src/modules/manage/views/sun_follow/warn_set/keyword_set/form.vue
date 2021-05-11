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
          <el-form-item label="模板名称" prop="realName">
            <el-input
              :disabled="detail"
              type="text"
              placeholder="请输入"
              v-model="staffForm.realName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="科室" class="form-item-sex" prop="subject">
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
        <el-col :span="6">
          <el-form-item label="项目" class="form-item-sex"  prop="project">
            <el-select
                    :disabled="detail"
                    v-model="staffForm.project"
                    placeholder="请选择"
            >
              <el-option label="胸部CT" :value="0"></el-option>
              <el-option label="腹部CT" :value="1"></el-option>
              <el-option label="B超" :value="0"></el-option>
              <el-option label="脑部CT" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="预警分类" prop="dataRange">
            <el-select
                    :disabled="detail"
                    v-model="staffForm.dataRange"
                    placeholder="请选择"
            >
              <el-option label="红色预警" :value="0"></el-option>
              <el-option label="橙色预警" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="适用性别" class="form-item-sex">
            <el-select
                    :disabled="detail"
                    v-model="staffForm.sex"
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
                    v-model="staffForm.startAge"></el-input>
            -
            <el-input
                    :disabled="detail"
                    style="width: 140px"
                    type="text"
                    placeholder="请输入"
                    v-model="staffForm.endAge"></el-input>
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
            <el-input v-model="staffForm.haveAllText" placeholder="多个关键字用“；”隔开"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="包含以下任意关键字" label-width="170px">
            <el-input v-model="staffForm.haveSomeText" placeholder="多个关键字用“；”隔开"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="不包含以下全部关键字" label-width="170px">
            <el-input v-model="staffForm.notHaveAllText" placeholder="多个关键字用“；”隔开"></el-input>
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
      formData: {
        gridId: '',
      },
      relationOptions: [{ value: 0, name: '<' }, { value: 1, name: '≤' }, { value: 2, name: '>' },
        { value: 3, name: '≥' }, { value: 4, name: '区间' }],
      staffForm: {
        id: this.id,
        mobileNo: '',
        realName: '',
        subject: '',
        project: '',
        sex: '',
        roleId: '',
        dataRange: '',
        // menuIds: [],
      },
      staffRules: {
        realName: [{ required: true, message: '模板名称不能为空' }],
        subject: [{ required: true, message: '请选择科室' }],
        project: [{ required: true, message: '请选择项目' }],
        dataRange: [{ required: true, message: '请选择预警分类' }],
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
          this.$emit('afterSubmit');
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
