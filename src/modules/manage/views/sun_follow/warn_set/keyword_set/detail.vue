<template>
  <div class="staff-form">
    <el-form
      class="staff-form inputCommon staff-detail-form"
      :model="staffForm"
      ref="staffForm"
      label-width="90px"
      label-suffix="："
    >
      <div class="divRightTitleDiv">
        <div class="divRightTitle">查看-关键字配置
          <div class="titleBiao"></div></div>
      </div>
      <el-row>
        <el-col :span="6">
          <el-form-item label="模板名称">
            <span>{{staffForm.realName | getResult}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="科室">
            <span>{{staffForm.subject | getResult}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="项目">
            <span>{{staffForm.project | getResult}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="预警分类">
            <span>{{staffForm.dataRangeName | getResult}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="适用性别" class="form-item-sex">
            <span>{{staffForm.sex | getResultGender}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="18">
          <el-form-item label="适宜年龄">
            <span v-if="!staffForm.startAge && !staffForm.endAge">不限</span>
            <span v-else>{{staffForm.startAge | getResult}}
              -
              {{staffForm.endAge | getResult}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="divRightTitleDiv">
        <div class="divRightTitle">条件配置
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
        <el-button size="small" class="cancelBtn" @click="$emit('cancel')">返回</el-button>
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
      selectPlanuser: [],
      planUserName: '',
      planuserModalVisible: false, // 干预人人列表弹窗
      detailDatalist: [
        { name: '一般检查',
          contactName: '身高',
          contactCondition: '<',
          contactVal: '100',
          contactLowVal: '200',
          contactHighVal: '60',
        },
        { name: '一般检查',
          contactName: '体重',
          contactCondition: '区间',
          contactVal: '60',
          contactLowVal: '30',
          contactHighVal: '200',
        },
      ],
      relationOptions: [{ value: 0, name: '<' }, { value: 1, name: '≤' }, { value: 2, name: '>' },
        { value: 3, name: '≥' }, { value: 4, name: '区间' }],
      staffForm: {
        id: this.id,
        subject: '内科',
        project: '胸部CT',
        dataRangeName: '红色预警',
        realName: '肺癌指标',
        sex: 0,
        startAge: '',
        endAge: '',
        haveAllText: '肺；结节；增生',
        haveSomeText: '肺；结节；增生',
        notHaveAllText: '胃；暗影；息肉',
      },
      roleMenuIds: [],
      roleMenuIdsMap: {},
      newRoleOptions: [...this.roleOptions],
    };
  },
  mounted() {
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
    async queryRoleDetail(id) {
      // 角色详情
      await this.$api.systemManageInterface.roleDetail(id).then((res) => {
        const { data } = res;
        const role = data.data || {};
        this.roleMenuIds = role.menuIds;
        this.roleMenuIdsMap[id] = this.roleMenuIds;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.staff-form {
  /deep/ .el-form-item{
    margin-bottom: 10px;
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
  /deep/ .el-button--small{
    padding: 0 !important;
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
