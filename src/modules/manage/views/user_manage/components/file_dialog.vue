<template>
  <el-dialog title="新增附件" :visible.sync="visible" @close="cancel">
    <el-form :model="formData" label-width="90px" ref="form" :rules="rules">
      <el-form-item label="附件格式">
        <el-input
                v-model="formData.route"
                placeholded="请输入"
                autocomplete="off"
                maxlength="30">
        </el-input>
        <upload
          ref="upload"
          type="userAuth"
          :on-success="handleImageSuccess"
          :limit="1"
          :on-exceed="handleLimit"
          :before-upload="beforeUpload"
        >
          <el-button size="small" type="primary" v-if="!formData.filePath">点击上传</el-button>
          <el-button size="small" type="primary" v-else>重新上传</el-button>
        </upload>
      </el-form-item>
      <div class="el-upload__tip">支持格式：txt、docx、xlsx、jpg、png、jpeg、zip、rar、pdf</div>
      <el-form-item label="附件标题" prop="title">
        <el-input
                v-model="formData.title"
                placeholded="请输入"
                autocomplete="off"
                maxlength="30">
        </el-input>
      </el-form-item>
      <el-form-item label="上传时间">
        <el-input disabled="true" v-model="formData.uploadDate"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          type="textarea"
          placeholded="请输入"
          v-model="formData.remark"
          :maxlength="200"
          show-word-limit>
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button class="cancelBtn" @click="cancel">取 消</el-button>
      <el-button class="sureBtn" type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { getFileType } from '~/src/libs/util';
import * as dayjs from 'dayjs';
import Upload from '~/src/components/upload/index.vue';

export default {
  name: 'file',
  components: {
    Upload,
  },
  props: {
    visible: Boolean,
  },
  data() {
    return {
      formData: {
        title: '',
        remark: '',
        uploadDate: dayjs(new Date()).format('YYYY-MM-DD hh:mm:ss'),
        filePath: '',
        route: '',
      },
      fileList: [],
      rules: {
        title: [{ required: true, message: '请输入附件标题' }],
        route: [{ required: true, message: '请上传附件' }],
      },
    };
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    handleImageSuccess(file) {
      console.log('handleImageSuccess', file);
      this.formData.filePath = file.data;
    },
    handleLimit() {
      this.$message.warning('当前限制仅可上传1个文件');
    },
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 15; // 这里做文件大小限制
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 15MB!',
          type: 'warning',
        });
        return false;
      }
      const flag = /txt|docx|xlsx|jpg|png|jpeg|zip|rar|pdf/.test(getFileType(file.name));
      if (!flag) {
        if (document.getElementsByClassName('el-message').length === 0) {
          this.$message.error('仅支持扩展名为 .txt .docx .xlsx .jpg .png .jpeg .zip .rar .pdf 的文件');
        }
        return false;
      }
      return true;
    },
    submit() {
      if (!this.formData.filePath) {
        this.$message.error('请上传附件内容');
        return;
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.formData.clientId = this.$route.params.userId;
          this.$emit('upload-success', {
            title: this.formData.title,
            remark: this.formData.remark,
            createTime: this.formData.uploadDate,
            filePath: this.formData.filePath,
          });
          this.$refs.form.resetFields({
            title: '',
            remark: '',
          });
          this.formData.filePath = '';
          this.formData.title = '';
          this.formData.remark = '';
          this.cancel();
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .dialog-footer {
    text-align: center;
    padding: 0 26px;
  }
  /deep/ .el-upload {
    text-align: left;
  }
</style>
