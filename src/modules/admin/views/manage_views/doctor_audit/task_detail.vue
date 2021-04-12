<template>
  <div class="create-edit">
    <div class="title">审核信息</div>
    <div class="smalltitle">认证信息</div>
    <div class="content">
      <div
        class="content-center"
        v-for="(item, index) in guideTypeList.userAuthList"
        :key="index"
      >
        <div class="center-top">
          <img :src="upload_url + item.certificateImageUrl" alt="" />
        </div>
        <div class="center-bottom">
          <p>{{ item.userAuthName }}</p>
          <p class="work">{{ item.userAuthTypeDesc }}</p>
        </div>
      </div>
    </div>

    <el-form
      class="life-style-form"
      :model="form"
      ref="form"
      :rules="rules"
      label-width="90px"
      label-suffix="："
    >
      <el-row>
        <div class="title">审核内容</div>
        <el-col :span="6">
          <el-form-item class="is-no-asterisk" label="审核人">
            <el-input
              style="width:220px;"
              v-model="guideTypeList.updateUser"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item class="is-no-asterisk" label="审核时间">
            <el-input
              style="width:220px;"
              disabled
              v-model="checktime"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item class="is-no-asterisk" label="审核状态">
            <el-input
              style="width:220px;"
              v-model="guideTypeList.auditStateDesc"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            class="is-no-asterisk"
            label="审核意见"
            prop="guideContent"
          >
            <el-input
              type="textarea"
              :rows="6"
              disabled
              v-model="guideTypeList.auditAdvice"
              maxlength="1000"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="form-buttons">
        <el-button plain size="small" @click="cancel">返回</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'create_edit',
  data() {
    return {
      upload_url: process.env.api.upload_url,
      routeType: 1, // 1新增 2编辑
      labelPosition: 'top',
      checktime: '',
      form: {
        auditTime: '',
        auditState: '',
        auditAdvice: '',
        // guideType: '',
        // guideContent: '',
        // examine:'',//审核
      },
      username: '',
      examine: [
        {
          name: '审核通过',
          paramValue: '1',
        },
        {
          name: '审核不通过',
          paramValue: '2',
        },
      ],
      guideTypeList: [],
    };
  },
  mounted() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      this.getDetailes();
    },
    /**
     * 获取审核记录查看
     * @return {Promise<void>}
     */
    async getDetailes() {
      const reqBody = { id: this.$route.params.id };
      const res = await this.$api.doctorAuditInterface.getDetailById(reqBody);
      const { data } = res.data;
      this.guideTypeList = data;
      this.checktime = data.auditTime.substring(0, 10);
    },
    cancel() {
      this.$router.back();
    },
    /**
     * 资质审核
     * @return {Promise<ElMessageComponent>}
     */
  },
};
</script>

<style lang="scss" scoped>
.create-edit {
  /deep/ .el-input__inner {
    color: #333;
  }
  /deep/ .select-user-trigger {
    input,
    i {
      cursor: pointer;
    }
  }
  /deep/ input,
  /deep/ textarea {
    border: none;
    background: #f4f4f6;
    border-radius: 5px;
  }
  /deep/ .el-textarea .el-input__count {
    background: #f4f4f6;
  }
  /deep/ .el-input:not(.select-user-trigger) input[disabled] {
    background: #e7e7ed;
  }
  .title {
    font-size: 18px;
    font-weight: 600;
    color: #333333;
    line-height: 25px;
    position: relative;
    padding-left: 10px;
    margin-bottom: 20px;
    &:after {
      width: 2px;
      height: 18px;
      background: #4991fd;
      border-radius: 1px;
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .smalltitle {
    font-size: 16px;
    font-weight: 500;
    color: #333333;
    line-height: 25px;
    position: relative;
    padding-left: 10px;
    margin-bottom: 20px;
    &:after {
      width: 5px;
      height: 5px;
      background: #26c165;
      border-radius: 2.5px;
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .content {
    display: flex;
    margin: 30px 0;
    .content-center {
      border: 1px solid #f4f4f6;
      width: 305px;
      margin-right: 30px;
      .center-top {
        width: 100%;
        height: 200px;
        background: #000000;
        border-radius: 8px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 8px;
        }
      }
      .center-bottom {
        padding: 20px;
        p {
          font-size: 16px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #333333;
          line-height: 22px;
        }
        .work {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
          line-height: 20px;
        }
      }
    }
  }
  .form-buttons {
    text-align: center;
    margin-top: 10px;
    button {
      width: 80px;
      border-radius: 8px;
      border: none;
    }
    button + button {
      margin-left: 20px;
    }
    /deep/ .is-plain {
      background: #97a6bd;
      color: #fff;
    }
  }
}
</style>
