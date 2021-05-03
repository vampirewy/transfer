<template>
  <div class="staff-form">
      <div class="title">跟踪回访配置</div>
      <div class="wltitle">
        <div class="quan"></div>
        <span>红色预警设置</span>
      </div>
      <div class="track">
        <div class="track_top">
              <span>回访频率：每</span>
              <el-input
              style="width:30%;"
              v-model="staffForm.mobileNo"
              @input="handleMobileChange"
              :maxlength="11"
              placeholder="请输入"></el-input>
              <span>天回访一次</span>
            </div>
              <div class="track_top">
                <span>跟踪方式：</span>
                <el-select
                style="width:70%;"
              v-model="staffForm.dataRange"
              placeholder="请选择"
            >
              <el-option label="全部" :value="0"></el-option>
              <el-option label="仅自己" :value="1"></el-option>
            </el-select>
              </div>
              <div class="track_top">
                <span>跟踪人员：</span>
                <el-select
                style="width:70%;"
              v-model="staffForm.dataRange"
              placeholder="请选择"
            >
              <el-option label="全部" :value="0"></el-option>
              <el-option label="仅自己" :value="1"></el-option>
            </el-select>
              </div>
      </div>
       <div class="wltitle">
        <div class="quan"></div>
        <span>橙色预警设置</span>
      </div>
      <div class="track">
        <div class="track_top">
              <span>回访频率：每</span>
              <el-input
              style="width:30%;"
              v-model="staffForm.mobileNo"
              @input="handleMobileChange"
              :maxlength="11"
              placeholder="请输入"></el-input>
              <span>天回访一次</span>
            </div>
              <div class="track_top">
                <span>跟踪方式：</span>
                <el-select
                style="width:70%;"
              v-model="staffForm.dataRange"
              placeholder="请选择"
            >
              <el-option label="全部" :value="0"></el-option>
              <el-option label="仅自己" :value="1"></el-option>
            </el-select>
              </div>
              <div class="track_top">
                <span>跟踪人员：</span>
                <el-select
                style="width:70%;"
              v-model="staffForm.dataRange"
              placeholder="请选择"
            >
              <el-option label="全部" :value="0"></el-option>
              <el-option label="仅自己" :value="1"></el-option>
            </el-select>
              </div>
      </div>
      <div class="form-buttons">
        <el-button size="small" class="cancelBtn" @click="$emit('cancel')">取消</el-button>
        <el-button size="small" class="sureBtn" type="primary" @click="submit"
          >保存</el-button
        >
      </div>
  </div>
</template>

<script>

export default {
  name: 'StaffForm',
  components: {
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
        sex: '',
        roleId: '',
        dataRange: '',
        // menuIds: [],
      },
      roleMenuIds: [],
      roleMenuIdsMap: {},
    };
  },
  mounted() {
  },
  methods: {
    submit() {
      this.$refs.staffForm.validate((valid) => {
        if (valid) {
          const fn = this.staffForm.id ? 'editUser' : 'addUser';
          this.$api.systemManageInterface[fn](this.staffForm).then(() => {
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
        position: fixed;
    left: 0;
    right: 0;
    bottom: 30px;
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
}
.track{
  display: flex;
  padding-left: 20px;
  .track_top{
    display: flex;
    width: 20%;
    align-items: center;
    justify-content: space-between;
    margin-right: 70px;
  }
}
</style>
