<template>
  <el-dialog title="新增附件" :visible.sync="visible" width="610px"
             :modal-append-to-body="false" @close="cancel">
    <el-form :model="formData" label-width="90px" ref="form" :rules="rules">
      <el-form-item label="附件上传：" prop="route">
        <el-input
                readonly
                v-model="formData.route"
                placeholder="大小不超过15MB"
                autocomplete="off">
        </el-input>
        <upload
          ref="upload"
          type="userAuth"
          :on-success="handleImageSuccess"
          :limit="1"
          :on-exceed="handleLimit"
          :before-upload="beforeUpload"
        >
          <el-button size="small" class="claickbutton" v-if="!formData.filePath">上传</el-button>
          <el-button size="small" class="claickbutton" v-else>重新上传</el-button>
        </upload>
      </el-form-item>
      <div class="el-upload__tip">支持格式：txt、docx、xlsx、jpg、png、jpeg、zip、rar、pdf</div>
      <div class="flex">
        <el-form-item label="附件标题：" prop="title">
        <el-input
                style="width:100%;"
                v-model="formData.title"
                placeholder="请输入"
                autocomplete="off"
                maxlength="30">
        </el-input>
      </el-form-item>
      <el-form-item label="上传时间：">
        <el-input style="width:100%;"
        disabled="true" v-model="formData.uploadDate"></el-input>
      </el-form-item>
      </div>
      <el-form-item label="备注：">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入"
          v-model="formData.remark"
          :maxlength="300"
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
        route: [{ required: false, message: '' }],
      },
      readonly: true,
    };
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    handleImageSuccess(file) {
      console.log('handleImageSuccess', file);
      this.formData.filePath = file.data;
      if (this.formData.filePath) {
        this.formData.route = '已上传';
      }
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
    margin-top: -12px;
  }
  /deep/ .el-upload {
    text-align: left;
  }
  /deep/ .el-form-item__content{
    display: flex;
    .el-input{
      width: 43%;
    }
  }
  .el-upload__tip{
    color: #f94242;
    margin-top: -15px;
    padding-left: 90px;
    margin-bottom: 5px;
  }
  .claickbutton{
    width: 90px;
    background: #36BF2F;
    color: #fff;
    margin-left: 10px;
    font-weight: 200;
  }
</style>
