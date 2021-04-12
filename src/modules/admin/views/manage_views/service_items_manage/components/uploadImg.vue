<template>
  <div class="img-uploader">
    <upload
      :on-success="handleImageSuccess"
      :before-upload="beforeUpload"
      :show-file-list="false"
      :disabled="disabled"
      class="upload"
      type="userAuth"
      :limit="limit"
    >
      <img v-if="imageUrl" :src="upload_url + imageUrl" class="avatar" />
      <div v-if="imageUrl" class="re-image">
        <img class="icon" src="@/assets/images/service/re-upload.png" />
        <p class="icon-desc">重新上传项目图标</p>
      </div>
      <div class="image" v-else>
        <img class="icon" src="@/assets/images/service/upload.png" />
        <p class="icon-desc">点击上传项目图标</p>
      </div>
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
    refIndex: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    limit: {
      type: Number,
    },
  },
  data() {
    return {
      API: process.env.api.common_url,
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
      console.log(file);
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
      const flag = /jpg|jpeg|png/.test(file.type.toLowerCase());
      if (!flag) {
        if (document.getElementsByClassName('el-message').length === 0) {
          this.$message.error('仅支持扩展名为 .jpg .png 的文件');
        }
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang="scss">
.img-uploader {
  .upload {
    height: 200px;
    width: 310px;
    border: 1px dashed #97a6bd;
    border-radius: 8px;
    .el-upload {
      height: 200px;
      width: 310px;
      vertical-align: middle;
      align-items: center;
      display: flex;
      justify-content: center;
    }
    .avatar {
      max-width: 100%;
      opacity: 0.5;
      height: 200px;
      width: 310px;
      object-fit: contain;
    }
    .re-image {
      position: absolute;
      width: 310px;
      height: 200px;
      background: rgba(0,0,0,.5);
      img {
        margin-top: 65px;
      }
      .icon-desc {
        color: #fff;
      }
    }
  }
  .icon {
    width: 40px;
    height: 40px;
  }
  .icon-desc {
    font-size: 14px;
    font-weight: 400;
    color: #97a6bd;
  }
}
</style>
