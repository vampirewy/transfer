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
        <div class="divRightTitle">查看指标
          <div class="titleBiao"></div></div>
      </div>
      <el-row>
        <el-col :span="6">
          <el-form-item label="模板名称">
            <span>{{staffForm.realName | getResult}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="预警分类">
            <span>{{staffForm.dataRangeName | getResult}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="适用性别" class="form-item-sex">
            <span>{{staffForm.sex | getResultGender}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
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
        <div class="divRightTitle">模板条件
          <div class="titleBiao"></div></div>
      </div>
      <div class="adddepart">
        <el-table
                :data="detailDatalist"
                ref="multipleTable"
                tooltip-effect="dark"
                class="openTable"
                stripe
                style="width: 100%"
        >
          <el-table-column prop="name" label="科室名称">
            <template slot-scope="scope">
              <div>{{ scope.row.name }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="contactName" label="小项名称">
            <template slot-scope="scope">
              <div>{{ scope.row.contactName }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="contactCondition" label="小项条件">
            <template slot-scope="scope">
              <div>{{ scope.row.contactCondition }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="contactVal" label="条件的值">
            <template slot-scope="scope">
              <div>{{ scope.row.contactVal }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="contactLowVal" label="低值">
            <template slot-scope="scope">
              <div>{{ scope.row.contactLowVal }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="contactHighVal" label="高值">
            <template slot-scope="scope">
              <div>{{ scope.row.contactHighVal }}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
        dataRangeName: '红色预警',
        realName: '肺癌指标',
        sex: 0,
        startAge: '',
        endAge: '',
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
