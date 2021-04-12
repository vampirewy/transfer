<template>
  <div :class="{'upload-container': imgform != 'headimg'}">
    <upload
      :disabled="disabled"
      :on-success="handleImageSuccess"
      :before-upload="beforeUpload"
      :className="{
         'avatar-uploader': imgform != 'headimg',
         'avatar-uploader-yuan': imgform == 'headimg',
      }"
      :show-file-list="false"
      :type="imgform === 'headimg' ? 'userImage' : 'userAuth'"
    >
      <span>
        <img v-if="imageUrl" :src="upload_url + imageUrl" class="avatar" />
        <i
          v-else
          :class="{
            'el-icon-plus': true,
            'avatar-uploader-main': imgtype == 'idCardFront',
            'avatar-uploader-back': imgtype == 'idCardBack',
            'avatar-uploader-headimg': imgtype == 'headimg',
          }"
        ></i>
      </span>
    </upload>
  </div>
</template>

<script>
import Upload from '~/src/components/upload/index.vue';

export default {
  name: 'uploadImg',
  components: {
    Upload,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    imgtype: {
      type: String,
      default: '',
    },
    imgform: {
      type: String,
      default: '',
    },
    refIndex: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      upload_url: process.env.api.upload_url,
    };
  },
  computed: {
    imageUrl() {
      return this.value;
    },
  },
  methods: {
    emitInput(val) {
      this.$emit('input', val, this.refIndex);
    },
    handleImageSuccess(file) {
      this.emitInput(file.data);
    },
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 1; // 这里做文件大小限制
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 1MB!',
          type: 'warning',
        });
        return false;
      }
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      if (!isJPG && !isPNG) {
        this.$message.warning('上传头像只能是 JPG、JPEG、PNG 格式!');
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang="scss">
.special-dialog[data-v-5ffc2cca] .el-dialog {
  width: 600px;
}

.avatar-uploader {
  width: 170px;
  height: 96px;
  float: left;
  margin: 0 20px 0 0;
  position: relative;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
  .avatar {
    height: 97px;
    width: auto;
  }
  .el-icon-plus {
    font-size: 20px;
    font-weight: bold;
    color: #8c939d;
    width: 170px;
    height: 96px;
    line-height: 96px;
    text-align: center;
  }
  .avatar-uploader-main {
    line-height: 69px;
    &:after {
      display: block;
      content: '请上传身份证正面';
      font-size: 12px;
      height: 20px;
      position: absolute;
      top: 30px;
      width: 170px;
    }
  }
  .avatar-uploader-back {
    line-height: 69px;
    &:after {
      display: block;
      content: '请上传身份证背面';
      font-size: 12px;
      height: 20px;
      position: absolute;
      top: 30px;
      width: 170px;
    }
  }
}
.avatar-uploader-yuan {
  width: 80px;
  border-radius: 50%;
  height: 80px;
  float: left;
  margin: 0 17px 0 0;
  position: relative;
  border: 2px solid #f5f5f5;
  cursor: pointer;
  overflow: hidden;
  .avatar {
    height: 80px;
    object-fit: cover;
  }
  .el-icon-plus {
    font-size: 20px;
    font-weight: bold;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .avatar-uploader-headimg {
    line-height: 52px;
    &:after {
      display: block;
      content: '上传头像';
      font-size: 12px;
      height: 20px;
      position: absolute;
      top: 25px;
      width: 80px;
    }
  }
}
.el-upload {
  overflow: inherit !important;
  > span {
    display: inline-block;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 6px;
    position: relative;
  }

  img {
    width: 100%;
  }
}

.upload-container {
  width: 100%;
  position: relative;
  .image-uploader {
    width: 200px;
    float: left;
  }
  .image-preview {
    width: 200px;
    height: 200px;
    position: relative;
    border: 1px dashed #d9d9d9;
    float: left;
    margin-left: 25px;
    .image-preview-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      text-align: center;
      img {
        max-width: 100%;
        max-height: 198px;
      }
    }
    .image-preview-action {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      color: #fff;
      opacity: 0;
      font-size: 20px;
      background-color: rgba(0, 0, 0, 0.5);
      transition: opacity 0.3s;
      cursor: pointer;
      text-align: center;
      line-height: 200px;
      .el-icon-delete {
        font-size: 36px;
      }
    }
    &:hover {
      .image-preview-action {
        opacity: 1;
      }
    }
  }
  .image-app-preview {
    width: 360px;
    height: 180px;
    position: relative;
    border: 1px dashed #d9d9d9;
    float: left;
    margin-left: 50px;
    .app-fake-conver {
      height: 44px;
      position: absolute;
      width: 100%;
      text-align: center;
      line-height: 64px;
      color: #fff;
    }
  }
}
</style>
