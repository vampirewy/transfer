<template>
  <div class="staff-form">
    <el-form
      :class="{ 'staff-form inputCommon': true, 'staff-detail-form': detail }"
      :model="staffForm"
      ref="staffForm"
      label-width="90px"
      label-suffix="："
    >
      <div class="title">查看员工</div>
      <el-row>
        <el-col :span="6">
          <el-form-item label="用户角色">
            {{staffForm.roleName}}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="用户姓名">
            {{staffForm.realName}}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="性别" prop="sex">
            {{staffForm.sex | getResultGender}}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="是否启用">
            {{staffForm.state | getResultState}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="登录名">
          {{staffForm.mobileNo}}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="手机号码">
          {{staffForm.contact}}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="科室/部门">
            {{staffForm.department}}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="管理范围">
            {{staffForm.dataRange | getResultDataRange }}
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="staffForm.dataRange === 3">
          <el-form-item label="单位">
            {{staffForm.rangeNames | getResult }}
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="staffForm.dataRange === 5">
          <el-form-item label="类别">
            {{staffForm.rangeNames | getResult }}
          </el-form-item>
        </el-col>
      </el-row>
      <div class="form-buttons">
        <el-button size="small" class="cancelBtn" @click="$emit('cancel')">返回</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'StaffDetail',
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
        rangeNames: '',
        // menuIds: [],
      },
      roleMenuIds: [],
      roleMenuIdsMap: {},
      newRoleOptions: [...this.roleOptions],
      gridList: [],
    };
  },
  mounted() {
    this.getGridList();
  },
  methods: {
    async getGridList() {
      const res = await this.$api.userManagerInterface.getGridList({ pageNo: 1, pageSize: 100000 });
      const { data } = res.data;
      this.gridList = data.data;
      this.getDetail();
    },
    getDetail() {
      // 用户详情
      this.$api.systemManageInterface.userDetail(this.id).then(async (res) => {
        const { data } = res;
        this.staffForm = Object.assign(this.staffForm, data.data || {});
        if (data.data.dataRange === 3) { // 单位管理
          this.staffForm.rangeNames = data.data.rangeNames.join('、');
        } else if (data.data.dataRange === 5) { // 类别管理
          const sameWork = [];
          data.data.rangeNames.forEach((item) => {
            this.gridList.forEach((itemList) => {
              // 比较a1和a2，如果a1里面的数据a2中已经存在了，就拿出
              if (item === itemList.id) {
                sameWork.push(itemList.gridName);
              }
            });
          });
          this.staffForm.rangeNames = sameWork.join('、');
        }
        // type为0: 超级管理员，下拉选项添加超级管理员选项
        if (this.staffForm.type) {
          // this.queryRoleDetail(this.staffForm.roleId);
        } else {
          this.newRoleOptions.push({
            id: this.staffForm.roleId,
            name: this.staffForm.roleName,
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
