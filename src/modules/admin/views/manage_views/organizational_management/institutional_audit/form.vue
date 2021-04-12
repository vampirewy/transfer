<template>
  <div class="institutional-audit-form">
    <div class="el-row-container">
      <div class="title">基础信息</div>
      <el-row :gutter="18">
        <el-col :span="6">
          <div class="grid-content">
            <span class="label">机构名称：</span>
            {{ detailData.organizationName }}
          </div>
          <div class="grid-content">
            <span class="label">省市区：</span>
            {{ region }}
          </div>
          <div class="grid-content">
            <span class="label">详细地址：</span>
            {{ detailData.organizationAddress }}
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <span class="label">机构等级：</span>
            {{ detailData.organizationLevelDesc }}
          </div>
          <div class="grid-content">
            <span class="label">创建人：</span>
            {{ detailData.createUser }}
          </div>
          <div class="grid-content">
            <span class="label">联系方式：</span>
            {{ detailData.contact }}
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <span class="label">创建时间：</span>
            {{ detailData.createTime }}
          </div>
          <div class="grid-content">
            <span class="label"> 审核状态：</span>
           {{ detailData.stateDesc }}
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="el-row-container">
      <div class="title">认证信息</div>
      <el-row :gutter="18">
        <el-col :span="6">
          <div class="grid-content flex">
            <div class="align-self-flex-start label">机构证书：</div>
            <el-image
              style="width: 130px; height: 160px"
              :src="upload_url + detailData.licenseImageUrl"
              fit="contain"
            ></el-image>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <span class="label">机构编号：</span>
            {{ detailData.organizationScope }}
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <span class="label">企业名称：</span>
            {{ detailData.organizationScope }}
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="el-row-container">
      <el-row justify="end" type="flex">
        <el-col class="row-buttons" :span="6">
          <el-button
            v-show="!detailData.state"
            @click="auditSubmit('1')"
            size="small"
            type="primary"
            >通过</el-button
          >
          <el-button
            v-show="!detailData.state"
            @click="auditSubmit('2')"
            type="danger"
            size="small"
            >不通过</el-button
          >
          <el-button size="small" @click="$emit('cancel')">
            返回
          </el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'form',
  props: {
    detail: {
      type: Boolean,
      default: false,
    },
    detailData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      upload_url: process.env.api.upload_url,
    };
  },
  computed: {
    region() {
      return `${this.detailData.province}/${this.detailData.city}/${this.detailData.district}`;
    },
  },
  methods: {
    auditSubmit(status) {
      this.$api.institutionalInterface
        .auditOrganization({
          organizationId: this.detailData.id,
          state: status,
        })
        .then((response) => {
          const result = response.data;
          const { code, message } = result;
          if (code === 200) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 800,
              onClose: () => {
                this.$emit('refresh');
              },
            });
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
.institutional-audit-form {
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
  margin-top: 20px;
}
.grid-content {
  color: #333333;
  font-size: 16px;
  min-height: 36px;
}
</style>
