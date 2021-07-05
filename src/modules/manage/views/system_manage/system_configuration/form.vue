<template>
  <div class="staff-form">
    <gender
      v-if="viewIndexes == 2"
      :id="currentData"
      :data="staffForm"
      @chid-event="getlist"
      @close="handleClose"
    >
    </gender>
    <el-form
      :model="staffForm"
      ref="staffForm"
      label-width="100px"
      label-suffix="："
    >
      <el-row>
        <el-col :span="24">
          <el-form-item label="个报前言" style="width: 100%">
            <el-input
              type="textarea"
              v-model="staffForm.personReportPreface"
              :rows="3"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="个报结束语" style="width: 100%">
            <el-input
              type="textarea"
              v-model="staffForm.personReportConcludingRemark"
              :rows="3"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="wltitle">
        <div class="quan"></div>
        <span>问卷、膳食方案取前后</span>
        <el-input
          type="text"
          v-model="staffForm.nearestDay"
          style="50px;"
          placeholder="请输入"
        ></el-input>
        <span>天内离体检日期最近的一份</span>
      </div>
      <el-row>
        <el-col :span="24">
          <el-form-item label="报告是否审核">
            <el-switch v-model="staffForm.isAudit" active-color="#13ce66"> </el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="体检推荐">
            <el-radio v-model="staffForm.peRecommendMode" label="1"
              >分性别指定项目</el-radio
            >
            <el-radio v-model="staffForm.peRecommendMode" label="2"
              >根据异常推荐</el-radio
            >
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="staffForm.peRecommendMode == 1">
          <div class="gender">
            <div class="genderMan" @click="showpop(1)">男性</div>
            <div class="genderGirl" @click="showpop(2)">女性</div>
          </div>
        </el-col>
      </el-row>
      <div class="wltitle">
        <div class="quan"></div>
        <span>封面封底</span>
      </div>
      <el-row>
        <el-col :span="24">
          <div class="form_tags">
            <div
              class="tags"
              @click="openpdf(staffForm.personCoverTemplateFile)"
            >
              <img src="@/assets/images/common/export.png" alt="" /><span
                >下载个报pdf封面模板</span
              >
            </div>
            <div
              class="tags"
              @click="openpdf(staffForm.personBackCoverTemplateFile)"
            >
              <img src="@/assets/images/common/export.png" alt="" /><span
                >下载个报pdf封底模板</span
              >
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="封面底纹">
            <div class="form-item-upload">
              <el-input
                v-model="staffForm.personCoverTemplateFile"
                placeholder="请上传pdf格式的封面"
              ></el-input>
              <upload
                :on-success="
                  (res) => handleUploadSuccess(res, 'personCoverTemplateFile')
                "
                :on-progress="() => handleUploadProgress('personCoverTemplateFile')"
                :on-error="() => handleUploadError('personCoverTemplateFile')"
                :before-upload="beforeUpload"
                :show-file-list="false"
                :disabled="personalFrontImageLoading"
                type="organization"
              >
                <el-button
                  size="small"
                  class="addbutton"
                  :loading="personalFrontImageLoading"
                  >上传</el-button
                >
              </upload>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="6" style="margin-left: 200px">
          <el-form-item label="封底底纹">
            <div class="form-item-upload">
              <el-input
                v-model="staffForm.personBackCoverTemplateFile"
                placeholder="请上传"
              ></el-input>
              <upload
                :on-success="
                  (res) => handleUploadSuccess(res, 'personBackCoverTemplateFile')
                "
                :on-progress="() => handleUploadProgress('personBackCoverTemplateFile')"
                :on-error="() => handleUploadError('personBackCoverTemplateFile')"
                :before-upload="beforeUpload"
                :show-file-list="false"
                :disabled="personalFrontImageLoading"
                type="organization"
              >
                <el-button
                  size="small"
                  class="addbutton"
                  :loading="personalFrontImageLoading"
                  >上传</el-button
                >
              </upload>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="divTop">
        <div class="divTitle">
          <span><img src="@/assets/images/common/titleLeft.png" alt="" /></span>
          团报配置
        </div>
      </div>
      <el-row>
        <el-col :span="24">
          <el-form-item label="团报前言" style="width: 100%">
            <el-input
              type="textarea"
              v-model="staffForm.groupReportPreface"
              :rows="3"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="团报结束语" style="width: 100%">
            <el-input
              type="textarea"
              v-model="staffForm.groupReportConcludingRemark"
              :rows="3"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="wltitle">
        <div class="quan"></div>
        <span>异常TOP推荐检查前</span>
        <el-select
          style="width: 100px"
          v-model="staffForm.groupAbnormalTop"
          placeholder="请选择"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <span style="margin-left: 20px">位</span>
      </div>
      <div class="wltitle">
        <div class="quan"></div>
        <span>封面封底</span>
      </div>
      <el-row>
        <el-col :span="24">
          <div class="form_tags">
            <div
              class="tags"
              @click="openpdf(staffForm.groupCoverTemplateFile)"
            >
              <img src="@/assets/images/common/export.png" alt="" /><span
                >下载团报pdf封面模板</span
              >
            </div>
            <div
              class="tags"
              @click="openpdf(staffForm.groupBackCoverTemplateFile)"
            >
              <img src="@/assets/images/common/export.png" alt="" /><span
                >下载团报pdf封底模板</span
              >
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="封面底纹">
            <div class="form-item-upload">
              <el-input
                v-model="staffForm.groupCoverTemplateFile"
                placeholder="请上传"
              ></el-input>
              <upload
                :on-success="
                  (res) => handleUploadSuccess(res, 'groupCoverTemplateFile')
                "
                :on-progress="() => handleUploadProgress('groupCoverTemplateFile')"
                :on-error="() => handleUploadError('groupCoverTemplateFile')"
                :before-upload="beforeUpload"
                :show-file-list="false"
                :disabled="personalFrontImageLoading"
                type="organization"
              >
                <el-button
                  size="small"
                  class="addbutton"
                  :loading="personalFrontImageLoading"
                  >上传</el-button
                >
              </upload>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="6" style="margin-left: 200px">
          <el-form-item label="封底底纹">
            <div class="form-item-upload">
              <el-input
                v-model="staffForm.groupBackCoverTemplateFile"
                placeholder="请上传"
              ></el-input>
              <upload
                :on-success="
                  (res) => handleUploadSuccess(res, 'groupBackCoverTemplateFile')
                "
                :on-progress="() => handleUploadProgress('groupBackCoverTemplateFile')"
                :on-error="() => handleUploadError('groupBackCoverTemplateFile')"
                :before-upload="beforeUpload"
                :show-file-list="false"
                :disabled="personalFrontImageLoading"
                type="organization"
              >
                <el-button
                  size="small"
                  class="addbutton"
                  :loading="personalFrontImageLoading"
                  >上传</el-button
                >
              </upload>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="form-buttons">
        <!-- <el-button size="small" class="cancelBtn" @click="$emit('cancel')">{{
          detail ? '返回' : '取消'
        }}</el-button> -->
        <el-button
          size="small"
          v-if="!detail"
          class="sureBtn"
          type="primary"
          @click="submit"
          >保存</el-button
        >
      </div>
    </el-form>
  </div>
</template>

<script>
import Upload from '~/src/components/upload/index.vue';
import Permission from '../permission.vue';
import gender from './gener.vue';
export default {
  name: 'StaffForm',
  components: {
    Permission,
    gender,
    Upload,
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
      pdf_url: process.env.api.pdf_url,
      viewIndexes: 0,
      value: false,
      radio: '1',
      options: [
        {
          value: 3,
          label: 3,
        },
        {
          value: 5,
          label: 5,
        },
        {
          value: 10,
          label: 10,
        },
        {
          value: 15,
          label: 15,
        },
        {
          value: 20,
          label: 20,
        },
      ],
      value1: '',
      staffForm: {
        id: '',
        personReportPreface: '',
        personReportConcludingRemark: '',
        nearestDay: '',
        isAudit: '',
        peRecommendMode: '',
        manPeItem: '',
        womanPeItem: '',
        manPeItemSpecial: '',
        womanPeItemSpecial: '',
        personCoverTemplateFile: '',
        personBackCoverTemplateFile: '',
        groupReportPreface: '',
        groupReportConcludingRemark: '',
        groupAbnormalTop: null,
        groupCoverTemplateFile: '',
        groupBackCoverTemplateFile: '',
      },
      staffRules: {
        mobileNo: [{ required: true, message: '账号不能为空' }],
        realName: [{ required: true, message: '姓名不能为空' }],
        sex: [{ required: true, message: '性别不能为空' }],
        roleId: [{ required: true, message: '角色不能为空' }],
        dataRange: [{ required: true, message: '数据范围不能为空' }],
      },
      roleMenuIds: [],
      roleMenuIdsMap: {},
      newRoleOptions: [...this.roleOptions],
    };
  },
  mounted() {
    this.getCommentDetail();
  },
  methods: {
    // 查看pdf
    openpdf(data) {
      window.open(this.pdf_url + data);
    },
    showpop(data) {
      this.viewIndexes = 2;
      this.currentData = data;
    },
    handleClose() {
      this.viewIndexes = 1;
    },
    getCommentDetail() {
      this.$api.systemManageInterface.getconfigDetail().then(({ data }) => {
        this.staffForm = data.data;
        this.staffForm.peRecommendMode = (this.staffForm.peRecommendMode, '');
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
      const { data, message } = res;
      console.log(this.staffForm[key], 123);
      if (res.rc === 0) {
        this.staffForm[key] = res.data;
        this.staffForm[`${key}Name`] = data.substring(data.lastIndexOf('/') + 1);
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
    getlist(data) {
      if (this.currentData === 1) {
        this.staffForm.manPeItem = data.manPeItem;
        this.staffForm.manPeItemSpecial = data.manPeItemSpecial;
      } else {
        this.staffForm.womanPeItem = data.manPeItem;
        this.staffForm.womanPeItemSpecial = data.manPeItemSpecial;
      }
    },
    submit() {
      // this.$refs.staffForm.validate((valid) => {
      // if (valid) {
      this.$api.systemManageInterface.saveconfig(this.staffForm).then(() => {
        this.$message.success('操作成功');
      });
      // }
      // });
    },
  },
};
</script>

<style lang="scss" scoped>
.form-item-upload {
  display: flex;
}
.addbutton {
  margin: 0 0 0 10px;
  position: absolute;
  top: 0;
}
.form_tags {
  display: flex;
  padding-left: 20px;
  margin-bottom: 20px;
  .tags {
    padding: 10px 16px;
    background: #f6f8fc;
    border-radius: 20px;
    border: 1px solid #f4f4f6;
    font-size: 14px;
    color: #333;
    margin-right: 20px;
    img {
      width: 14px;
      vertical-align: middle;
      margin-right: 5px;
    }
  }
}
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
      background: #3154ac;
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
  .gender {
    display: flex;
    padding-left: 100px;
    margin-bottom: 40px;
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 90px;
      height: 40px;
      margin-right: 20px;
    }
    .genderMan {
      background: rgba(49, 84, 172, 0.1);
      border-radius: 20px;
      border: 1px solid #3154ac;
      font-size: 14px;
      color: #3154ac;
      &:hover {
        background: rgba(49, 84, 172, 0.3);
        cursor: pointer;
      }
    }
    .genderGirl {
      background: rgba(243, 61, 33, 0.1);
      border-radius: 20px;
      border: 1px solid #f33d21;
      font-size: 14px;
      color: #f33d21;
      &:hover {
        background: rgba(243, 61, 33, 0.3);
        cursor: pointer;
      }
    }
  }
}
</style>
