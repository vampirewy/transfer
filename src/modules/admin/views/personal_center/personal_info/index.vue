<template>
  <div class="personalContent">
    <div class="person-title">个人信息</div>
    <el-form
      :model="personalForm"
      ref="personalForm"
      :rules="personalRules"
      label-width="70px"
      class="inputCommon"
    >
      <el-form-item label="头像" class="form-item-avatar">
        <Upload
          v-model="personalForm.headImage"
          :imgtype="'headimg'"
          :imgform="'headimg'"
        ></Upload>
      </el-form-item>
      <el-form-item label="姓名">
        <div>{{ personalForm.realName }}</div>
      </el-form-item>
      <el-form-item label="联系电话">
        <div>{{ personalForm.mobile }}</div>
      </el-form-item>
      <el-form-item label="简介">
        <el-row>
          <el-col :span="12">
            <el-input
              type="textarea"
              rows="5"
              maxlength="1000"
              placeholder="'请简单的介绍你自己吧"
              v-model="personalForm.introduction"
              show-word-limit
            ></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="擅长">
        <el-row>
          <el-col :span="12">
            <el-input
              type="textarea"
              rows="5"
              maxlength="1000"
              placeholder="您擅长什么都可以写出来"
              v-model="personalForm.skill"
              show-word-limit
            ></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="专治">
        <el-row>
          <el-col :span="12">
            <el-input
              v-model="specializedTreatment"
              maxlength="30"
              placeholder="请输入后添加"></el-input>
          </el-col>
          <el-button
            size="small"
            class="add-button"
            @click="addSpecializedTreatment">添加</el-button>
        </el-row>
        <div
          class="specialized-treatments"
          v-if="personalForm.specializedTreatmentList.length > 0">
          <el-tag
            v-for="(tag, index) in personalForm.specializedTreatmentList"
            :key="index"
            closable
            @close="deleteSpecializedTreatment(tag)">
            {{tag.content}}
          </el-tag>
        </div>
      </el-form-item>
      <div class="buttons">
        <el-button
          plain
          size="small"
          @click="$router.back()">返回</el-button>
        <el-button
          type="primary"
          size="small"
          @click="save">保存</el-button>
      </div>
    </el-form>
    <auth-dialog
      v-if="authDialogStatus"
      :authData="currentAuth"
      @close="handleAuthClose"
      @submit="handleAuthSubmit"></auth-dialog>
  </div>
</template>

<script>
import Upload from '@/modules/manage/views/personal_center/personal_info/upload_img.vue';
import { localSave, localRead } from '~/src/libs/util';
import AuthDialog from '@/modules/manage/views/personal_center/personal_info/auth_dialog.vue';

export default {
  name: 'personalInfo',
  components: {
    Upload,
    AuthDialog,
  },
  data() {
    return {
      personalForm: {
        headImage: '',
        realName: '',
        mobile: '',
        introduction: '',
        skill: '',
        specializedTreatmentList: [],
        userAuthList: [],
      },
      specializedTreatment: '',
      personalRules: {},
      authDialogStatus: false,
      upload_url: process.env.api.upload_url,
      removeTreatmentIds: [],
      removeAuthIds: [],
      currentAuth: null,
      canSave: false,
      canAudit: false,
      auditState: '',
    };
  },
  mounted() {
    this.getUsercenterInfo();
  },
  methods: {
    editAuth(data) {
      this.currentAuth = data;
      this.authDialogStatus = true;
    },
    deleteAuth(auth, index) {
      this.personalForm.userAuthList.splice(index, 1);
      if (auth.id) {
        this.removeAuthIds.push(auth.id);
      }
    },
    handleAuthClose() {
      this.currentAuth = null;
      this.authDialogStatus = false;
    },
    handleAuthSubmit(data) {
      if (this.currentAuth) {
        const index = this.personalForm.userAuthList.indexOf(this.currentAuth);
        this.personalForm.userAuthList[index] = data;
      } else {
        this.personalForm.userAuthList.push(data);
      }
      this.currentAuth = null;
      this.authDialogStatus = false;
    },
    addSpecializedTreatment() {
      this.specializedTreatment = this.specializedTreatment.trim();
      if (this.specializedTreatment) {
        this.personalForm.specializedTreatmentList.push({ content: this.specializedTreatment });
        this.specializedTreatment = '';
      }
    },
    deleteSpecializedTreatment(data) {
      this.personalForm.specializedTreatmentList
        .splice(this.personalForm.specializedTreatmentList.indexOf(data), 1);
      if (data.id) {
        this.removeTreatmentIds.push(data.id);
      }
    },
    getUsercenterInfo() {
      this.removeTreatmentIds = [];
      this.removeAuthIds = [];
      // 获取个人信息
      this.$api.personal.userCenter().then((res) => {
        this.personalForm.headImage = res.data.data.headImage;
        this.personalForm.realName = res.data.data.realName;
        this.personalForm.mobile = res.data.data.mobile;
        this.personalForm.introduction = res.data.data.introduction;
        this.personalForm.skill = res.data.data.skill;
        this.personalForm.specializedTreatmentList = res.data.data.specializedTreatmentList;
        this.personalForm.userAuthList = res.data.data.userAuthList;
        this.auditState = res.data.data.auditState;
      });
    },
    save() {
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          this.$api.personal.saveUserInfo({
            ...this.personalForm,
            removeTreatmentIds: this.removeTreatmentIds,
            removeAuthIds: this.removeAuthIds,
          }).then(() => {
            this.$message.success('操作成功');
            this.getUsercenterInfo();
            this.$store.commit('user/SET_AVATAR', this.personalForm.headImage);
            const userInfo = localRead('HK_USER_INFO');
            const user = JSON.parse(userInfo);
            user.headImage = this.personalForm.headImage;
            localSave('HK_USER_INFO', JSON.stringify(user));// 重置头像字段后重新存储
          });
        }
      });
    },
    submitAudit() {
      this.$api.personal.submitAudit().then(() => {
        this.$message.success('操作成功');
        this.getUsercenterInfo();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.personalContent {
  padding-bottom: 30px;
  position: relative;
  .audit-status-image {
    position: absolute;
    right: 0;
    top: 0;
    width: 160px;
  }
  .form-item-avatar {
    display: flex;
    align-items: center;
    /deep/ .el-form-item__content {
      margin-left: 0 !important;
    }
  }
  /deep/ .el-form-item__content {
    padding-left: 50px;
  }
  /deep/ textarea {
    resize: none;
  }
  /deep/ .el-input__count {
    background: #F4F4F6;
  }
  .add-button {
    margin-left: 20px;
    width: 80px;
    border-radius: 8px;
    border: 1px solid #4991FD;
    color: #4991FD;
  }
  .specialized-treatments {
    line-height: 32px;
    margin-top: 20px;
    .el-tag {
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
  .person-title {
    font-size: 18px;
    font-weight: 600;
    color: #333333;
    line-height: 25px;
    margin-bottom: 30px;
    margin-top: 15px;
    padding-left: 10px;
    position: relative;
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
  .auth-list {
    display: flex;
    flex-wrap: wrap;
    > div {
      margin-right: 30px;
      margin-bottom: 30px;
      &.auth-item {
        border: 1px solid #F4F4F6;
        border-radius: 8px;
        .top {
          cursor: pointer;
          position: relative;
          width: 305px;
          height: 200px;
          border-radius: 8px;
          > img {
            width: 100%;
            height: 100%;
            border-radius: 8px;
          }
          > div {
            border-radius: 8px;
            visibility: hidden;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0,0,0,0.75);
            span {
              width: 40px;
              height: 40px;
              border-radius: 4px;
              background: #fff;
              display: flex;
              align-items: center;
              justify-content: center;
              + span {
                margin-left: 20px;
              }
              i {
                font-size: 18px;
                &.el-icon-edit-outline {
                  color: #4991FD;
                }
                &.el-icon-delete {
                  color: red;
                }
              }
            }
          }
          .auth-btn {
            &:hover {
              opacity: 0.8;
            }
          }
          .auth-btn:hover i {
            opacity: 0.8;
          }
        }
        .bottom {
          padding: 20px;
          .name {
            font-size: 16px;
            font-weight: 600;
            color: #333333;
            line-height: 22px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .type {
            margin-top: 7px;
            font-size: 14px;
            font-weight: 400;
            color: #666666;
            line-height: 20px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
        &:hover .top > div {
          visibility: visible;
        }
      }
      &.add-auth {
        cursor: pointer;
        width: 305px;
        height: 200px;
        border-radius: 8px;
        border: 1px dashed #97A6BD;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #97A6BD;
        font-size: 14px;
        &:hover {
          opacity: 0.8;
        }
        i {
          font-size: 20px;
          margin-bottom: 10px;
        }
      }
    }
  }
  .buttons {
    text-align: center;
    margin-top: 10px;
    padding-bottom: 30px;
    button {
      width: 80px;
      border-radius: 8px;
      border: none;
      padding-left: 0;
      padding-right: 0;
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
