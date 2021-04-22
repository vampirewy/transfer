<template>
  <div class="role-form">
    <el-form
      :class="{ 'role-form inputCommon': true, 'role-detail-form': detail }"
      :model="roleForm"
      ref="roleForm"
      :rules="roleRules"
      label-width="110px"
      label-suffix="："
    >
      <div class="title">{{detail ? '查看' : (id ? '编辑' : '新增')}}角色</div>
      <el-row>
        <el-col :span="12">
          <el-form-item label="角色名称" prop="name">
            <el-input
              type="text"
              :disabled="detail"
              placeholder="请输入"
              maxlength="30"
              v-model="roleForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否管理员" prop="adminFlag">
            <el-radio-group :disabled="detail" v-model="roleForm.adminFlag">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="角色描述" prop="remark">
        <el-input
          :disabled="detail"
          type="textarea"
          v-model="roleForm.remark"
          :rows="4"
          :placeholder="detail ? '' : '请输入'"
          maxlength="300"
          show-word-limit
        ></el-input>
      </el-form-item>
      <div class="title permission-title">权限管理</div>
      <permission
        :data="roleForm.menuIds"
        :disabled="detail"
        :isFilter="detail"
        @change="val => (roleForm.menuIds = val)"
      ></permission>
      <div class="form-buttons">
        <el-button size="small" class="cancelBtn" @click="$emit('cancel')">
          {{detail ? '返回' : '取消'}}
        </el-button>
        <el-button
          class="sureBtn"
          size="small"
          v-if="!detail"
          type="primary"
          @click="submit">保存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import Permission from '../permission.vue';

export default {
  name: 'RoleForm',
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
  },
  data() {
    return {
      roleForm: {
        id: this.id,
        name: '',
        adminFlag: 1,
        remark: '',
        menuIds: [],
      },
      roleRules: {
        name: [{ required: true, message: '角色名称不能为空' }],
        adminFlag: [{ required: true, message: '是否管理员不能为空' }],
      },
    };
  },
  mounted() {
    console.log(this.roleForm);
    if (this.id) {
      // 角色详情
      this.$api.systemManageInterface.roleDetail(this.id).then((res) => {
        const { data } = res;
        this.roleForm = Object.assign(this.roleForm, data.data || {});
        if (this.roleForm.adminFlag !== undefined) {
          this.roleForm.adminFlag = this.roleForm.adminFlag ? 1 : 0;
        }
      });
    }
  },
  methods: {
    submit() {
      this.$refs.roleForm.validate((valid) => {
        if (valid) {
          this.saveRole();
        }
      });
    },
    saveRole() {
      // 保存角色
      const fn = this.roleForm.id ? 'editRole' : 'addRole';
      const { id, name, remark, adminFlag, menuIds } = this.roleForm;
      this.$api.systemManageInterface[fn]({
        id,
        name,
        remark,
        adminFlag,
        menuIds,
      }).then(() => {
        this.$message.success('操作成功');
        this.$emit('afterSubmit');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.role-form {
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
  /*/deep/ .el-radio__input.is-disabled {
    cursor: auto;
    .el-radio__inner {
      cursor: auto;
    }
    + span.el-radio__label {
      color: #333;
      cursor: auto;
    }*/
  /*  &.is-checked .el-radio__inner {
      background-color: #fff;
      border-color: #4991fd;
      cursor: auto;
      &::after {
        cursor: auto;
        background: #4991fd;
      }
    }*/
  /*}*/
}
</style>
