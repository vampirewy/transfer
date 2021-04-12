<template>
  <div class="create-edit">
    <div class="title">审核-审核任务</div>
    <div class="title">个人信息</div>
    <div class="bri">
      <div class="bri-left">简介</div>
      <div class="bri-content">{{guideTypeList.introduction}}</div>
    </div>
    <div class="bri">
      <div class="bri-left">擅长</div>
      <div class="bri-content">{{guideTypeList.skill}}</div>
    </div>
    <div class="bri">
      <div class="bri-left">专治</div>
      <div class="bri-right">
        <div class="bri-expertise"
        v-for="(item,index) in guideTypeList.specializedTreatmentList"
        :key="index">{{item.content}}</div>
      </div>
    </div>
    <div class="smalltitle">认证信息</div>
    <div class="content">
      <div class="content-center" v-for="(item,index) in guideTypeList.userAuthList" :key="index">
        <div class="center-top"><img :src="upload_url + item.certificateImageUrl" alt=""></div>
        <div class="center-bottom">
          <p >{{item.userAuthName}}</p>
          <p class="work">{{item.userAuthTypeDesc}}</p>
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
          <el-form-item  class="is-no-asterisk" label="审核人" >
            <el-input style="width:220px;" v-model="usernamees" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
           <el-form-item class="is-no-asterisk" label="审核时间" prop="stockDate">
            <!-- <el-date-picker
              v-model="form.auditTime"
              value-format="yyyy-MM-dd hh:mm:ss"
              type="datetime"
              :disabled="disabled"
              placeholder="选择开始时间">
              </el-date-picker> -->
              <el-date-picker
              :clearable="true"
              v-model="form.auditTime"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd hh:mm:ss"
              disabled
      ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
           <el-form-item class="is-no-asterisk" label="审核状态" prop="guideType">
           <el-select
              v-model="form.auditState"
              placeholder="请选择"
            >
              <el-option
                :label="it.name"
                :value="it.paramValue"
                :key="i"
                v-for="(it, i) in examine"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item class="is-no-asterisk"  label="审核意见" prop="guideContent">
            <el-input
              type="textarea"
              :rows="6"
              v-model="form.auditAdvice"
              maxlength="1000"
              show-word-limit
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="form-buttons">
        <el-button plain size="small" @click="cancel">返回</el-button>
        <el-button size="small" type="primary" @click="auditSubmit">提交</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'create_edit',
  data() {
    return {
      info: [],
      upload_url: process.env.api.upload_url,
      routeType: 1, // 1新增 2编辑
      labelPosition: 'top',
      form: {
        auditTime: '',
        auditState: '',
        auditAdvice: '',
      },
      username: '',
      usernamees: '',
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
    this.getNowTime();
  },
  methods: {
    getNowTime() {
      const now = new Date();
      const year = now.getFullYear();
      let month = now.getMonth();
      let date = now.getDate();
      const hour = ' 00:00:00';
      month += 1;
      month = month.toString().padStart(2, '0');
      date = date.toString().padStart(2, '0');
      const defaultDate = `${year}-${month}-${date}${hour}`;
      this.form.auditTime = defaultDate;
    },
    onLoad() {
      this.usernamees = this.$store.state.user.userName;
      this.getDetailes();
    },
    /**
     * 获取审核记录查看
     * @return {Promise<void>}
     */
    async getDetailes() {
      const reqBody = { id: this.$route.params.id };
      const res = await this.$api.doctorAuditInterface.getdoctorDetailById(reqBody);
      const { data } = res.data;
      this.guideTypeList = data;
      this.username = data.updateUser;
    },


    cancel() {
      this.$router.back();
    },
    /**
     * 资质审核
     * @return {Promise<ElMessageComponent>}
     */
    auditSubmit() {
      if (!this.form.auditTime) {
        this.$message.warning('请选择审核时间');
      } else if (!this.form.auditState) {
        this.$message.warning('请选择审核状态');
      } else {
        this.$api.doctorAuditInterface
          .auditDoctorTitles({
            ...this.form,
            userId: this.$route.params.id,
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
              this.$router.back();
            } else {
              this.$message.error(message || '网络异常！');
            }
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.create-edit {
  /deep/ .el-input__inner {
    color: #333;
  }
  /deep/ .select-user-trigger {
    input, i {
      cursor: pointer;
    }
  }
  /deep/ input, /deep/ textarea {
    border: none;
    background: #F4F4F6;
    border-radius: 5px;
  }
  /deep/ .el-textarea .el-input__count {
    background: #F4F4F6;
  }
  /deep/ .el-input:not(.select-user-trigger) input[disabled] {
    background: #E7E7ED;
  }
  .title {
    font-size: 18px;
    font-weight: 600;
    color: #333333;
    line-height: 25px;
    position: relative;
    padding-left: 10px;
    margin-bottom:20px;
    &:after {
      width: 2px;
      height: 18px;
      background: #4991FD;
      border-radius: 1px;
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .bri{
    display: flex;
    margin-bottom: 30px;
    .bri-left{
      width: 80px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      padding: 10px 0 0 20px;
    }
      .bri-content{
        width: 580px;
        min-height: 120px;
        padding: 10px 15px;
        border-radius: 5px;
        border: 1px solid #F0F0F0;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 24px;
      }
      .bri-right{
        width: 1035px;
        display: flex;
        .bri-expertise{
          background: rgba(73, 145, 253, 0.1);
          border-radius: 5px;
          border: 1px solid #4991FD;
          padding: 7px 11px;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #4991FD;
          line-height: 17px;
          margin: 0 10px 10px 0;
        }
      }
  }
   .smalltitle {
    font-size: 16px;
    font-weight: 500;
    color: #333333;
    line-height: 25px;
    position: relative;
    padding-left: 10px;
    margin-bottom:20px;
    &:after {
      width: 5px;
      height: 5px;
      background: #26C165;
      border-radius: 2.5px;
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .content{
    display: flex;
    margin: 30px 0;
    .content-center{
      border: 1px solid #F4F4F6;
      width: 305px;
      margin-right: 30px;
      .center-top{
        width: 100%;
        height: 200px;
        background: #000000;
        border-radius: 8px;
        img{
          width: 100%;
          height: 100%;
          border-radius: 8px;
        }
      }
      .center-bottom{
        padding:20px;
        p{
          font-size: 16px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #333333;
          line-height: 22px;
        }
        .work{
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
      background: #97A6BD;
      color: #fff;
    }
  }
}
</style>
