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
        <div class="divRightTitle">{{detail ? '查看' : (id ? '编辑' : '新增')}}指标
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
      </el-row>
      <el-row>
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
        <div class="divRightTitle" style="margin-top: 10px">模板条件
          <div class="titleBiao"></div></div>
      </div>
      <el-row style="display: flex">
        <el-col :span="5">
          <el-form-item label="条件关系：">
            <el-select
                    v-model="formData.gridId"
                    placeholder="请选择"
            >
              <el-option
                      v-for="(item, index) in gridList"
                      :label="item.name"
                      :value="item.id"
                      :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
        <el-form-item label="体检库：">
          <el-select
                  v-model="formData.gridId"
                  placeholder="请选择"
          >
            <el-option
                    v-for="(item, index) in gridList"
                    :label="item.name"
                    :value="item.id"
                    :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="14">
        <el-form-item label="检查项目" prop="clientName">
          <el-popover
                  ref="userPopover"
                  placement="top-start"
                  width="545"
                  trigger="click"
                  @show="planuserModalVisible = true"
                  @hide="planuserModalVisible = false"
          >
            <manager-list v-if="planuserModalVisible"
                          @change="handlePlanuserSelectChange"
                          @cancel="handlePlanuserClose"></manager-list>
            <el-input class="select-user-trigger" slot="reference"
                      :disabled="planUserName !== '' ? false : true"
                      v-model="planUserName" placeholder="请输入">
              <i :class="`el-icon-arrow-${planuserModalVisible ? 'up' : 'down'}`"
                 slot="suffix"></i>
            </el-input>
          </el-popover>
        </el-form-item>
        </el-col>
        <div class="inspectionAdd">
          <div @click="inspectionAdd()">添加</div>
        </div>
      </el-row>
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
              <div v-if="scope.row.isActive == 1">
                {{ scope.row.contactCondition }}
              </div>
              <el-select v-model="scope.row.contactCondition" placeholder="请选择"
                         style="width: 100px" v-else>
                <el-option v-for="item in relationOptions" :key="item.value" :label="item.name"
                           :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="contactVal" label="条件的值">
            <template slot-scope="scope">
              <div v-if="scope.row.isActive == 1">
                {{ scope.row.contactVal }}
              </div>
              <el-input
                      class="addinput"
                      v-else
                      v-model="scope.row.contactVal"
                      maxlength="30"
                      placeholder="请输入"
              >
              </el-input>
            </template>
          </el-table-column>
          <el-table-column prop="contactLowVal" label="低值">
            <template slot-scope="scope">
              <div v-if="scope.row.isActive == 1">
                {{ scope.row.contactLowVal }}
              </div>
              <el-input
                      class="addinput"
                      v-else
                      v-model="scope.row.contactLowVal"
                      maxlength="30"
                      placeholder="请输入"
              >
              </el-input>
            </template>
          </el-table-column>
          <el-table-column prop="contactHighVal" label="高值">
            <template slot-scope="scope">
              <div v-if="scope.row.isActive == 1">
                {{ scope.row.contactHighVal }}
              </div>
              <el-input
                      class="addinput"
                      v-else
                      v-model="scope.row.contactHighVal"
                      maxlength="30"
                      placeholder="请输入"
              >
              </el-input>
            </template>
          </el-table-column>
          <el-table-column
                  prop="number"
                  label="操作"
                  min-width="90"
                  align="center"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small">
                <img
                        v-if="scope.row.isActive == 1"
                        @click="btnlooker(scope.$index, scope.row)"
                        style="width: 30px; height: 30px"
                        src="@/assets/images/service/compile.png"
                        alt=""
                />
                <img
                        v-else
                        @click="baocun(scope.$index, scope.row)"
                        style="width: 30px; height: 30px"
                        src="@/assets/images/service/allergic.png"
                        alt=""
                />
              </el-button>
              <el-button
                      type="text"
                      size="small"
                      @click="removekeys(scope.$index, scope.row)"
              >
                <img
                        style="width: 30px; height: 30px"
                        src="@/assets/images/service/deletes.png"
                        alt=""
                />
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
import ManagerList from '@/components/date_select/project_open.vue';
export default {
  name: 'StaffForm',
  components: {
    ManagerList,
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
      selectPlanuser: [],
      planUserName: '',
      planuserModalVisible: false, // 干预人人列表弹窗
      detailDatalist: [],
      relationOptions: [{ value: 0, name: '<' }, { value: 1, name: '≤' }, { value: 2, name: '>' },
        { value: 3, name: '≥' }, { value: 4, name: '区间' }],
      staffForm: {
        id: this.id,
        mobileNo: '',
        realName: '',
        sex: '',
        roleId: '',
        dataRange: '',
        // menuIds: [],
      },
      staffRules: {
        realName: [{ required: true, message: '模板名称不能为空' }],
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
    // 关闭干预人列表
    handlePlanuserSelectChange(dataList) {
      this.$refs.userPopover.doClose();
      this.planuserModalVisible = false;
      const list = [];
      dataList.forEach((value) => {
        list.push(value.itemName);
        this.selectPlanuser.push(value);
      });
      console.log(dataList);
      this.planUserName = list.join(',');
    },
    handlePlanuserClose() {
      this.planuserModalVisible = false;
      this.$refs.userPopover.doClose();
    },
    inspectionAdd() {
      console.log(this.selectPlanuser);
      if (this.selectPlanuser.length === 0) {
        this.$message({
          message: '请选择检查项目',
          type: 'warning',
        });
        return;
      }
      this.selectPlanuser.forEach((val) => {
        const arr = {
          name: val.sectionName,
          contactName: val.itemName,
          contactCondition: '',
          contactVal: '',
          contactLowVal: '',
          contactHighVal: '',
          isActive: 2,
        };
        this.detailDatalist.push(arr);
      });
      this.selectPlanuser = [];
      this.planUserName = '';
    },
    btnlooker(index, data) {
      data.isActive = 2;
      this.$set(this.detailDatalist, index, data);
    },
    removekeys(index, data) {
      console.log(data);
      /* if (data.hospitalDepartmentId) {
        this.deletedHospitalDepartmentIds.push(data.hospitalDepartmentId); // push进要删除的科室的数组
      }*/
      this.detailDatalist.splice(index, 1);
    },
    baocun(index, data) {
      if (data.contactCondition && data.contactVal && data.contactLowVal && data.contactHighVal) {
        data.isActive = 1;
        this.$set(this.detailDatalist, index, data);
      }
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
          if (this.detailDatalist.length === 0) {
            return this.$message({
              message: '请选择检查项目',
              type: 'warning',
            });
          }
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
  /deep/ .select-user-trigger {
    line-height: 37px;
    input{
      border: 1px solid #DDE0E6!important;
      background-color: white!important;
    }
    input, i {
      cursor: pointer;
    }
    &.disabled {
      input, i {
        background-color: white!important;
        cursor: not-allowed;
      }
    }
    .el-input__suffix{
      width: 25px;
    }
  }
  .inspectionAdd{
    width: 90px;
    height: 40px;
    background: #36BF2F;
    border-radius: 5px;
    margin-left: 20px;
    text-align: center;
    line-height: 40px;
    color: #ffffff;
    font-size: 14px;
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
