<template>
  <div class="report-edit">
    <el-form ref="form" :model="formData" label-width="90px" label-suffix="：" :rules="rules">
      <!-- <div class="title">{{id ? '编辑' : '新增'}}体检信息-基本信息</div> -->
      <div class="form-title">
        <div class="line"></div>
        <h3 class="name">{{id ? '编辑' : '新增'}}体检信息-基本信息</h3>
     </div>
      <el-row>
        <el-col :span="6">
          <el-form-item label="姓名" prop="clientId">
            <el-popover
              ref="userPopover"
              placement="bottom-start"
              width="650"
              trigger="click"
              :disabled="!!id"
              @show="popoverStatus = true"
              @hide="popoverStatus = false">
              <select-user v-if="popoverStatus" @change="handleSelectUser"></select-user>
              <el-input
                :class="`select-user-trigger ${id ? 'disabled' : ''}`"
                slot="reference"
                disabled
                v-model="formData.clientName"
                placeholder="请选择客户">
                <i :class="`el-icon-caret-${popoverStatus ? 'top' : 'bottom'}`" slot="suffix"></i>
              </el-input>
            </el-popover>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="性别" prop="gender">
            <el-radio v-model="formData.gender" :label="1" disabled>男</el-radio>
            <el-radio v-model="formData.gender" :label="2" disabled>女</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="年龄" prop="age">
            <el-input
              v-model="formData.age"
              disabled
              class="age-input"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="客户编号" prop="gridName">
            <el-input
              v-model="formData.cardNo"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <physical @submit="onSubmit" @close="$emit('close')" :value="formData"></physical>
    <!-- <div>
      <el-button @click="$router.go(-1)">取消</el-button>

      <el-button type="primary" @click="next">下一步</el-button>
    </div>-->

    <el-dialog title="新增档案" :visible.sync="dialogFormVisible"></el-dialog>
    <client-dialog
      :visible="clientDialogVisible"
      @cancel="clientDialogVisible = false"
      @change="onClientChange"
    ></client-dialog>
  </div>
</template>
<script>
import Physical from './components/physical.vue';
import ClientDialog from '../user_manage/components/client_dialog.vue';
import * as dayjs from 'dayjs';
import SelectUser from './medical_history_select_user.vue';

export default {
  name: 'reportEdit',
  // props: ['id'],
  components: {
    SelectUser,
    physical: Physical,
    'client-dialog': ClientDialog,
  },
  data() {
    return {
      id: this.$route.query.id || '',
      popoverStatus: false,
      selectUser: null,
      activeName: 'first',
      formData: {
        clientName: '',
        clientId: '',
        reportNo: '',
        reportDate: '',
        examinationOrgan: '',
        gender: 1,
        age: '',
        cardNo: '',
      },
      dialogFormVisible: false,
      clientDialogVisible: false,
      dataSource: [
        {
          name: '测试测试',
        },
        {
          name: '测试测试',
        },
      ],
      rules: {
        clientId: [
          {
            required: true,
            message: '请选择客户',
            trigger: 'blur',
          },
        ],
        reportNo: [
          {
            required: true,
            message: '请输入体检编号',
            trigger: 'blur',
          },
        ],
        reportDate: [
          {
            required: true,
            message: '请选择体检时间',
            trigger: 'blur',
          },
        ],
        examinationOrgan: [
          {
            required: true,
            message: '请输入体检机构',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  mounted() {
    if (this.id) {
      this.fetch(this.id);
    }
    console.log(this.id, '接受id');
  },
  methods: {
    handleSelectUser(data) {
      console.log(data, '接收的数据');
      this.$refs.userPopover.doClose();
      this.popoverStatus = false;
      this.formData.clientName = data.name;
      this.formData.clientId = data.id;
      this.formData.gender = data.gender;
      this.formData.age = data.age;
      this.formData.cardNo = data.cardNo;
      this.$refs.form.validateField('clientId');
    },
    onVisibleChange(value) {
      if (value) {
        this.clientDialogVisible = true;
      }
    },
    handleClick() {},
    next() {
      return new Promise((resolve) => {
        this.$refs.form.validate((valid) => {
          if (valid) {
            resolve();
          } else {
            return false;
          }
        });
      });
    },
    onSubmit(physical = {}, valid) {
      this.next().then(() => {
        if (valid) {
          const formData = Object.assign(this.formData, physical);
          formData.reportDate = dayjs(formData.reportDate).format(
            'YYYY-MM-DD HH:mm:ss',
          );
          const arr = [];
          formData.sectionConclusionList.forEach((item) => {
            if (item.itemList.length > 0) {
              arr.push(item);
            }
          });
          formData.sectionConclusionList = arr;
          let request;
          if (this.id) {
            formData.id = this.id;
            request = this.$api.reportInterface.update.bind(
              this.$api.reportInterface,
            );
          } else {
            request = this.$api.reportInterface.addNewReport.bind(
              this.$api.reportInterface,
            );
          }
          request(formData).then(({ data }) => {
            if (data) {
              this.$message.success('操作成功');
              this.$emit('close', true);
              this.$router.go(-1);
            }
          });
        }
      });
    },
    remove({ row }) {
      this.$confirm('确定要删除该数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$api.reportInterface.remove(row.id);
      });
    },
    fetch(id) {
      this.$api.reportInterface.getReportDetail(id).then(({ data }) => {
        if (data.success) {
          this.formData = data.data;
          if (!this.formData.sectionConclusionList) {
            this.$set(this.formData, 'sectionConclusionList', []);
          }
          if (!this.formData.abnormalList) {
            this.$set(this.formData, 'abnormalList', []);
          }
          if (!this.formData.notMatchAbnormalList) {
            this.$set(this.formData, 'notMatchAbnormalList', []);
          }
        }
      });
    },
    onClientChange(row) {
      this.formData.clientName = row.name;
      this.formData.clientId = row.id;
      this.clientDialogVisible = false;
    },
    replace(value = '') {
      const REG = /[\u4e00-\u9fa5]/gi;
      const str = value.replace(REG, '');
      this.formData.reportNo = str;
    },
  },
};
</script>

<style lang="scss" scoped>
.report-edit {
  .form-title {
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 20px;
    .line {
      width: 36px;
      height: 4px;
      background: #3154AC;
      margin-right: 8px;
      border-radius: 1px;
      position: absolute;
      margin-top: 12px;
      opacity: 0.5;
    }
    .name {
      font-size: 18px;
      font-weight: 600;
      color: #333333;
    }
  }
  .title {
    font-size: 18px;
    font-weight: 600;
    color: #333333;
    line-height: 25px;
    padding-left: 10px;
    position: relative;
    margin-bottom: 20px;
    &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 2px;
      height: 18px;
      background: #4991FD;
      border-radius: 1px;
    }
  }
  /deep/ .select-user-trigger {
    input, i {
      cursor: pointer;
      &.el-icon-caret-bottom, &.el-icon-caret-top {
        &::before {
          content: url('../../../../assets/images/common/arrow.png');
        }
        &.el-icon-caret-bottom {
          transform: rotate(180deg);
        }
      }
    }
    .el-input__suffix {
      right: 15px;
    }
    &.disabled {
      input, i {
        cursor: not-allowed;
      }
      .el-input__inner {
        color: #999999 !important;
        background-color: #E7E7ED !important;
      }
    }
    input::placeholder {
      color: #666;
    }
    .el-input__inner {
      color: #333 !important;
      background: #F4F4F6 !important;
    }

  }
  /deep/ input, /deep/ textarea {
    border: none;
    background: #F4F4F6;
    border-radius: 5px;
  }
}
/* .clientName .el-select-dropdown__empty {
  display: none;
} */
</style>
