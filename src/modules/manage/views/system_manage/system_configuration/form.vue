<template>
  <div class="staff-form">
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
              v-model="staffForm.mobileNo"
              :rows="3"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="个报结束语" style="width: 100%">
            <el-input
              type="textarea"
              v-model="staffForm.mobileNo"
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
          v-model="staffForm.mobileNo"
          style="50px;"
          placeholder="请输入"
        ></el-input>
        <span>天内离体检日期最近的一份</span>
      </div>
      <el-row>
        <el-col :span="24">
          <el-form-item label="报告是否审核">
            <el-switch v-model="value" active-color="#13ce66"> </el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="体检推荐">
            <el-radio v-model="radio" label="1">分性别指定项目</el-radio>
            <el-radio v-model="radio" label="2">根据异常推荐</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="radio == 1">
          <div class="gender">
            <div class="genderMan">男性</div>
            <div class="genderGirl">女性</div>
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
            <div class="tags">
              <img src="@/assets/images/common/export.png" alt="" /><span
                >下载个报pdf封面模版</span
              >
            </div>
            <div class="tags">
              <img src="@/assets/images/common/export.png" alt="" /><span
                >下载个报pdf封底模版</span
              >
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="封面底纹">
            <div class="form-item-upload">
              <el-input placeholder="请上传"></el-input>
              <upload
                :on-success="
                  (res) => handleUploadSuccess(res, 'personalFrontImage')
                "
                :on-progress="() => handleUploadProgress('personalFrontImage')"
                :on-error="() => handleUploadError('personalFrontImage')"
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
              <el-input placeholder="请上传"></el-input>
              <upload
                :on-success="
                  (res) => handleUploadSuccess(res, 'personalFrontImage')
                "
                :on-progress="() => handleUploadProgress('personalFrontImage')"
                :on-error="() => handleUploadError('personalFrontImage')"
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
              v-model="staffForm.mobileNo"
              :rows="3"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="团报结束语" style="width: 100%">
            <el-input
              type="textarea"
              v-model="staffForm.mobileNo"
              :rows="3"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="wltitle">
        <div class="quan"></div>
        <span>异常TOP推荐检查前</span>
        <el-select style="width:100px;" v-model="value1" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <span style="margin-left:20px;">位</span>
      </div>
      <div class="wltitle">
        <div class="quan"></div>
        <span>封面封底</span>
      </div>
      <el-row>
        <el-col :span="24">
          <div class="form_tags">
            <div class="tags">
              <img src="@/assets/images/common/export.png" alt="" /><span
                >下载个报pdf封面模版</span
              >
            </div>
            <div class="tags">
              <img src="@/assets/images/common/export.png" alt="" /><span
                >下载个报pdf封底模版</span
              >
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="封面底纹">
            <div class="form-item-upload">
              <el-input placeholder="请上传"></el-input>
              <upload
                :on-success="
                  (res) => handleUploadSuccess(res, 'personalFrontImage')
                "
                :on-progress="() => handleUploadProgress('personalFrontImage')"
                :on-error="() => handleUploadError('personalFrontImage')"
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
              <el-input placeholder="请上传"></el-input>
              <upload
                :on-success="
                  (res) => handleUploadSuccess(res, 'personalFrontImage')
                "
                :on-progress="() => handleUploadProgress('personalFrontImage')"
                :on-error="() => handleUploadError('personalFrontImage')"
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
import Permission from '../permission.vue';

export default {
  name: 'StaffForm',
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
    roleOptions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      value: false,
      radio: '1',
      options: [
        {
          value: '选项1',
          label: '黄金糕',
        },
        {
          value: '选项2',
          label: '双皮奶',
        },
        {
          value: '选项3',
          label: '蚵仔煎',
        },
      ],
      value1: '',
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
    // if (this.id) {
    //   // 用户详情
    //   this.$api.systemManageInterface.userDetail(this.id).then(async (res) => {
    //     const { data } = res;
    //     this.staffForm = Object.assign(this.staffForm, data.data || {});
    //     // type为0: 超级管理员，下拉选项添加超级管理员选项
    //     if (this.staffForm.type) {
    //       this.queryRoleDetail(this.staffForm.roleId);
    //     } else {
    //       this.newRoleOptions.push({
    //         id: this.staffForm.roleId,
    //         name: this.staffForm.roleName,
    //       });
    //     }
    //   });
    // } else if (this.roleOptions.length > 0) {
    //   this.staffForm.roleId = this.roleOptions[0].id;
    //   this.queryRoleDetail(this.staffForm.roleId);
    // }
  },
  methods: {
    // async queryRoleDetail(id) {
    //   // 角色详情
    //   await this.$api.systemManageInterface.roleDetail(id).then((res) => {
    //     const { data } = res;
    //     const role = data.data || {};
    //     this.roleMenuIds = role.menuIds;
    //     this.roleMenuIdsMap[id] = this.roleMenuIds;
    //   });
    // },
    submit() {
      // this.$refs.staffForm.validate((valid) => {
      //   if (valid) {
      //     const fn = this.staffForm.id ? 'editUser' : 'addUser';
      //     this.$api.systemManageInterface[fn](this.staffForm).then(() => {
      //       this.$message.success('操作成功');
      //       this.$emit('afterSubmit');
      //     });
      //   }
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
