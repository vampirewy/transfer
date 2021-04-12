<template>
  <div class="position-audit-form">
    <div class="el-row-container">
      <el-row type="flex" align="middle" :gutter="18">
        <el-col :span="6">
          <div class="grid-content">
            <div class="title">基础信息</div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="18">
        <el-col :span="6">
          <div class="grid-content">
            <span class="label">姓名：</span>
            {{ detailData.realName }}</div>
          <div class="grid-content">
            <span class="label">注册手机：</span>
            {{ detailData.mobileNo }}
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <span class="label">性别：</span>
            {{ detailData.sex }}
          </div>
          <div class="grid-content">
            <span class="label">注册时间：</span>
            {{ detailData.createTime }}
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content text-align-right">
            <span class="label-color">状态</span>
          </div>
          <div class="grid-content text-align-right">{{ detailData.auditStateDesc }}</div>
        </el-col>
      </el-row>
    </div>
    <div class="el-row-container">
      <div class="title">认证信息</div>
      <el-row :gutter="18">
        <el-col :span="6">
          <div class="grid-content">
            <span class="label">认证类型：</span>
            {{ detailData.professionalTitleTypeDesc }}
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <span class="label">认证职称：</span>
            {{ detailData.professionalTitle }}
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="18">
        <el-col :span="6">
          <div class="grid-content flex">
            <div class="align-self-flex-start label">职称证书：</div>
            <el-image
              style="width: 130px; height: 160px"
              :src="upload_url + detailData.certificates"
              fit="contain"
            ></el-image>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-row :gutter="18">
      <el-col :span="6">
        <el-row type="flex" justify="start">
          <el-button size="small" @click="$emit('cancel')">返回</el-button>
        </el-row>
      </el-col>
      <el-col :span="6">
        <div v-if="detailData.auditState === 0" class="el-row-container">
          <el-row justify="center" type="flex">
            <el-button size="small" @click="auditSubmit('1')" type="primary">通过</el-button>
            <el-button size="small" @click="dialogFormVisible = true" type="danger">不通过</el-button>
          </el-row>
        </div>
        <div v-else class="grid-content"></div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content"></div>
      </el-col>
    </el-row>
    <!--不通过表单-->
    <el-dialog title="请填写未通过的理由" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item>
          <el-input
                  v-model="form.reason"
                  type="textarea"
                  placeholder="请输入内容"
                  autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="onDialogConfirm" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'form',
  props: {
    detailId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      form: {
        reason: '',
      },
      dialogFormVisible: false,
      detailData: {},
      upload_url: process.env.api.upload_url,
    };
  },
  mounted() {
    this.queryTitleDetail(this.detailId);
  },
  methods: {
    onDialogConfirm() {
      this.auditSubmit('2');
      this.dialogFormVisible = false;
    },
    auditSubmit(status) {
      this.$api.doctorAuditInterface
        .auditDoctorTitle({
          ...this.form,
          auditState: status,
          id: this.detailId,
        })
        .then((response) => {
          const result = response.data;
          const { code, message } = result;
          if (code === 200) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.$emit('cancel');
              },
            });
          } else {
            this.$message.error(message || '网络异常！');
          }
        });
    },
    queryTitleDetail(id) {
      this.$api.doctorAuditInterface
        .getTitleDetailById({
          id,
        })
        .then((response) => {
          const result = response.data;
          const { code, data, message } = result;
          if (code === 200) {
            this.detailData = data;
          } else {
            this.$message.error(message || '网络异常！');
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
  .flex {
    display: flex;
  }
  .align-self-flex-start {
    align-self: flex-start;
  }
  .text-align-right {
    text-align: right;
  }
  .label-color {
    color: #707070;
  }
.position-audit-form {
  padding: 0 20px;
  background-color: #ffffff;
}
.title {
  color: #262626;
  font-size: 20px;
  padding: 20px 0;
}
  .label {
    display: inline-block;
    width: 120px;
    text-align: right;
    color: #707070;
  }
.row-buttons {
  padding: 10px 0;
}
.grid-content {
  color: #333333;
  font-size: 16px;
  min-height: 36px;
}
</style>
