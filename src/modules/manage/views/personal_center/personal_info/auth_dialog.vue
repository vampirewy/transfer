<template>
  <el-dialog
    class="auth-dialog"
    :title="authData ? '编辑认证信息' : '新增认证信息'"
    :visible="true"
    width="570px"
    :before-close="handleClose">
    <div class="title">认证信息</div>
    <el-form
      ref="form"
      :rules="rules"
      :model="form"
      label-width="90px"
      label-suffix="：">
      <el-row>
        <el-col :span="12">
          <el-form-item label="职称类别" prop="userAuthType">
            <el-select v-model="form.userAuthType" placeholder="请选择">
              <el-option
                v-for="(item, index) in typeList"
                :key="index"
                :label="item.name"
                :value="item.paramValue"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="职称名称" prop="userAuthName">
            <el-input v-model="form.userAuthName" maxlength="30" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="职称证件" prop="certificateImageUrl">
            <div class="form-item-upload">
              <el-input
                disabled
                :placeholder="form.certificateImageUrl ? '已上传' : '请上传小于5M的附件'"
              ></el-input>
              <upload
                :on-success="handleImageSuccess"
                :before-upload="beforeUpload"
                :show-file-list="false"
                type="userAuth"
              >
                <el-button size="small">{{form.certificateImageUrl ? '重新上传' : '上传'}}</el-button>
              </upload>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="buttons">
      <el-button plain size="small" @click="handleClose">取消</el-button>
      <el-button type="primary" size="small" @click="submit">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import Upload from '~/src/components/upload/index.vue';
export default {
  name: 'AuthDialog',
  components: {
    Upload,
  },
  props: {
    authData: {
      type: Object,
    },
  },
  data() {
    return {
      form: {
        id: '',
        userAuthType: '',
        userAuthName: '',
        certificateImageUrl: '',
      },
      rules: {
        userAuthType: [
          { required: true, message: '请选择职称类别' },
        ],
        userAuthName: [
          { required: true, message: '请输入职称名称' },
        ],
        certificateImageUrl: [
          { required: true, message: '请上传职称证件' },
        ],
      },
      typeList: [],
    };
  },
  mounted() {
    this.getTypeList();
    if (this.authData) {
      this.form.id = this.authData.id;
      this.form.userAuthType = this.authData.userAuthType;
      this.form.userAuthName = this.authData.userAuthName;
      this.form.certificateImageUrl = this.authData.certificateImageUrl;
    }
  },
  methods: {
    getTypeList() {
      this.$api.personal.getTypeList().then(({ data }) => {
        this.typeList = data.data || [];
      });
    },
    handleClose() {
      this.$emit('close');
    },
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 <= 5;
      if (!isLt2M) {
        this.$message.warning('上传文件大小不能超过 5MB!');
        return false;
      }
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      if (!isJPG && !isPNG) {
        this.$message.warning('上传附件只能是 JPG、JPEG、PNG 格式!');
        return false;
      }
      return true;
    },
    handleImageSuccess(res) {
      const { code, data, message } = res;
      if (code === 200) {
        this.form.certificateImageUrl = data;
      } else {
        this.$message.error(message || '网络异常！');
      }
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const { id, userAuthType, userAuthName, certificateImageUrl } = this.form;
          let userAuthTypeDesc = '';
          for (let i = 0; i < this.typeList.length; i++) {
            if (this.typeList[i].paramValue === userAuthType) {
              userAuthTypeDesc = this.typeList[i].name;
              break;
            }
          }
          this.$emit('submit', {
            id,
            userAuthName,
            userAuthType,
            certificateImageUrl,
            userAuthTypeDesc,
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.auth-dialog {
  .title {
    font-size: 16px;
    font-weight: 500;
    color: #333333;
    position: relative;
    padding-left: 10px;
    margin-bottom: 20px;
    &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 5px;
      height: 5px;
      background: #26C165;
    }
  }
  /deep/ .el-form-item__content {
    padding-left: 0 !important;
  }
  /deep/ .form-item-upload {
    display: flex;
    .el-button {
      margin-left: 10px;
      width: 80px;
      border-radius: 8px;
      border: 1px solid #4991FD;
      font-size: 14px;
      color: #4991FD;
      padding-left: 0;
      padding-right: 0;
    }
  }
  .buttons {
    text-align: right;
    margin-top: 10px;
    button {
      width: 80px;
      border-radius: 8px;
      border: none;
    }
    button + button {
      margin-left: 20px;
    }
    /deep/ .is-plain {
      background: #97A6BD;
      color: #fff;
    }
  }
}
</style>
