<template>
  <div class="organization-info inputCommon">
    <div class="title">机构信息维护</div>
    <el-form ref="form" :model="formData" label-width="90px" label-suffix="：">
      <el-row>
        <el-col :span="6">
          <el-form-item label="机构名称" prop="organizationName">
            <el-input
              v-model="formData.organizationName"
              maxlength="30"
              placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="机构地址" prop="organizationAddress">
            <el-input
              v-model="formData.organizationAddress"
              maxlength="30"
              placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="咨询电话" prop="contact">
            <el-input
              v-model="formData.contact"
              placeholder="请输入"
              @input="handleContactChange"
              :maxlength="11"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="个报封面" prop="personalFrontImage">
            <div class="form-item-upload">
              <el-input
                disabled
                v-model="formData.personalFrontImageName"
                placeholder="请上传pdf格式的封面"></el-input>
              <upload
                :on-success="res => handleUploadSuccess(res, 'personalFrontImage')"
                :on-progress="() => handleUploadProgress('personalFrontImage')"
                :on-error="() => handleUploadError('personalFrontImage')"
                :before-upload="beforeUpload"
                :show-file-list="false"
                :disabled="personalFrontImageLoading"
                type="organization">
                <el-button size="small" :loading="personalFrontImageLoading">上传</el-button>
              </upload>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="个报封底" prop="personalBackImage">
            <div class="form-item-upload">
              <el-input
                disabled
                v-model="formData.personalBackImageName"
                placeholder="请上传pdf格式的封底"></el-input>
              <upload
                :on-success="res => handleUploadSuccess(res, 'personalBackImage')"
                :on-progress="() => handleUploadProgress('personalBackImage')"
                :on-error="() => handleUploadError('personalBackImage')"
                :before-upload="beforeUpload"
                :show-file-list="false"
                :disabled="personalBackImageLoading"
                type="organization">
                <el-button size="small" :loading="personalBackImageLoading">上传</el-button>
              </upload>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="机构介绍">
        <el-input
          type="textarea"
          rows="5"
          placeholder="请输入"
          maxlength="1000"
          show-word-limit
          v-model="formData.introduction">
        </el-input>
      </el-form-item>
      <div class="form-buttons">
        <!-- <el-button plain @click="$router.back()" size="small">返回</el-button> -->
        <el-button type="primary" @click="submit" size="small">保存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { getToken } from '~/src/libs/util';
import Upload from '~/src/components/upload/index.vue';
export default {
  name: 'OrganizationInfo',
  components: {
    Upload,
  },
  data() {
    return {
      importHeaders: { sid: getToken() },
      API: process.env.api.common_url,
      formData: {
        organizationName: '',
        organizationAddress: '',
        contact: '',
        personalFrontImage: '',
        personalFrontImageName: '',
        personalBackImage: '',
        personalBackImageName: '',
        teamFrontImage: '',
        teamBackImage: '',
        introduction: '',
      },
      personalFrontImageLoading: false,
      personalBackImageLoading: false,
    };
  },
  mounted() {
    this.getOrganizationInfo();
  },
  methods: {
    handleContactChange() {
      this.formData.contact = this.formData.contact.replace(/[^0-9]/g, '');
    },
    getOrganizationInfo() {
      this.$api.loginInterface.getOrganizationInfo().then(({ data }) => {
        this.formData = { ...data.data };
      });
    },
    submit() {
      this.$api.loginInterface.saveOrganizationInfo({ ...this.formData }).then(() => {
        this.$message.success('操作成功');
      });
    },
    beforeUpload(file) {
      const isPDF = file.type === 'application/pdf';
      if (!isPDF) {
        this.$message.warning('上传附件只能是 pdf 格式!');
        return false;
      }
      const sizeValid = file.size / 1024 / 1024 < 15; // 这里做文件大小限制
      if (!sizeValid) {
        this.$message({
          message: '上传文件大小不能超过 15MB!',
          type: 'warning',
        });
        return false;
      }
      return true;
    },
    handleUploadSuccess(res, key) {
      this[`${key}Loading`] = false;
      const { code, data, message } = res;
      if (code === 200) {
        this.formData[key] = data;
        this.formData[`${key}Name`] = data.substring(data.lastIndexOf('/') + 1);
      } else {
        this.$message.error(message || '网络异常！');
      }
    },
    handleUploadError(key) {
      this[`${key}Loading`] = false;
      this.$message.error('上传失败！');
    },
    handleUploadProgress(key) {
      this[`${key}Loading`] = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.organization-info {
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
  .form-item-upload {
    display: flex;
    .el-input {
      flex: 1;
      margin-right: 10px;
    }
  }
  .form-buttons {
    text-align: center;
    margin-top: 30px;
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
