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
        <el-col :span="8">
          <el-form-item label="角色名称" :prop="detail ? '' : 'name'">
            <span v-if="detail">{{roleForm.name}}</span>
            <el-input v-else
                      type="text"
                      placeholder="请输入"
                      maxlength="30"
                      v-model="roleForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="是否启用">
            <span v-if="detail">{{roleForm.state | getResultState}}</span>
            <el-switch
                    v-else
                    v-model="roleForm.state"
                    :active-value="1"
                    :inactive-value="0"
                    active-color="#13ce66"
            >
            </el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="角色描述">
        <span v-if="detail">{{roleForm.remark}}</span>
        <el-input
                v-else
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
        :permission="permission"
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
      permission: [],
      roleForm: {
        id: this.id,
        name: '',
        adminFlag: 1,
        state: 1,
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
    this.menuList();
    console.log(this.roleForm);
  },
  methods: {
    menuList() {
      // 角色列表
      this.$api.systemManageInterface
        .getMenu({})
        .then((res) => {
          const { data } = res;
          const result = data.data || {};
          console.log(result);
          // console.log(JSON.parse(JSON.stringify(ACCESS)));
          if (!this.detail) { // 不是详情要全部展示出来
            this.permission = result.synthesisMenuList;
            if (this.permission[0].menuCode === 'home') { // 设置默认选中
              this.permission[0].disabled = true;
            }
          }
          this.getDetail(result);
        /* console.log(this.data);
          if (this.disabled) {
            console.log(this.data);
            this.filterTree(this.data); // 查看的情况下，筛选出选中的
          }
          this.setSelectAll();*/
        });
    },
    getDetail(result) {
      this.roleForm.menuIds = ['home']; // 为了解决首次data不更新
      if (this.id) {
        // 角色详情
        this.$api.systemManageInterface.roleDetail(this.id).then((res) => {
          const { data } = res;
          this.roleForm = Object.assign(this.roleForm, data.data || {});
          if (this.roleForm.adminFlag !== undefined) {
            this.roleForm.adminFlag = this.roleForm.adminFlag ? 1 : 0;
          }
          if (this.detail) { // 为了详情时不一下子展示出来，增加体验感
            this.permission = result.synthesisMenuList;
            if (this.permission[0].menuCode === 'home') { // 设置默认选中
              this.permission[0].disabled = true;
            }
            this.filterTree(data.data.menuIds);
          }
        });
      }
    },
    filterTree(data) {
      this.permission = this.filterArray(
        this.permission,
        data,
      );
      console.log(this.permission);
      const nodes = this.$refs.tree.store.nodesMap;
      console.log(nodes);
      Object.keys(nodes).forEach((i) => {
        nodes[i].expanded = false;
      });
    },
    filterArray(arr, data) {
      const res = [];
      arr.forEach((item) => {
        if (data.includes(item.menuCode)) {
          res.push(item);
          if (item.roleMenuList && item.roleMenuList.length > 0) {
            this.$set(item, 'roleMenuList', this.filterArray(item.roleMenuList, data));
          }
        }
      });
      return res;
    },
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
      const { id, name, remark, adminFlag, menuIds, state } = this.roleForm;
      if (menuIds.length === 0) {
        return this.$message.warning('请选择权限');
      }
      this.$api.systemManageInterface[fn]({
        id,
        name,
        remark,
        adminFlag,
        menuIds,
        state,
      }).then(() => {
        this.$message.success('操作成功');
        this.$emit('afterSubmit');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  /deep/ .el-textarea__inner{
    border: 1px solid #DDE0E6!important;
  }
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
