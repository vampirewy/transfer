<template>
  <div class="medical-history-form">
    <el-form
      class="medical-history-form"
      :model="form"
      ref="form"
      label-width="90px"
      label-suffix="："
    >
      <div class="divRightTitleDiv">
        <div class="divRightTitle" style="margin-top: 0">挂号详情
          <div class="titleBiao"></div></div>
      </div>
      <el-row>
        <el-col :span="6">
          <el-form-item label="客户姓名" >
            <span>{{form.name | getResult}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="性别" >
            <span>{{form.gender | getResultGender}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="客户编号" >
            <span>{{form.clientNo | getResult}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="客户年龄" >
            <span>{{form.age | getResult}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="手机号码" >
            <span>{{form.mobile | getResult}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="身份证号" >
            <span>{{form.cardNo | getResult}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="初步印象" >
            <span>{{form.primaFacie | getResult}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="转诊说明" >
            <span>{{form.referralIntro | getResult}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="divRightTitleDiv">
        <div class="divRightTitle" style="margin-top: 5px">挂号信息
          <div class="titleBiao"></div></div>
      </div>
      <div>
          <el-row>
            <el-col :span="6">
              <el-form-item label="就诊状态" >
                <span class="warnStatus1" v-if="form.state === 2">
                待就诊
              </span>
                  <span v-if="form.state === 3">
                已就诊
              </span>
                  <span class="warnStatus3" v-if="form.state === 1">
                已取消
              </span>
                  <span v-if="form.state === 0">
                待确认
              </span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="就诊时间" >
                  <span v-if="!form.appointmentDate"> - </span>
                  <span v-else>{{ form.appointmentDate}} {{ form.appointmentHourStart}}
            ~ {{ form.appointmentHourEnd}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="就诊科室" >
                <span>{{form.departmentName | getResult}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="就诊医生" >
                <span>{{form.doctorName | getResult}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <div v-if="form.state !== 1">
            <el-col :span="6">
              <el-form-item label="总支出" >
                <span>{{form.price | getResult}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="主诉" >
                <span>{{form.orderConfigDtoList.complaint | getResult}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="检查" >
                <span>{{form.orderConfigDtoList.inspect | getResult}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="诊断" >
                <span>{{form.orderConfigDtoList.diagnosis | getResult}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="方案" >
                <span>{{form.orderConfigDtoList.scheme | getResult}}</span>
              </el-form-item>
            </el-col>
            </div>
          </el-row>
      </div>
       <div class="handle-btn">
        <el-button class="cancelBtn" size="small" @click="goBack"
          >返回</el-button>
         <el-button v-if="form.state === 2" class="cancelReservationBtn" size="small"
                    @click="cancelReservation"
         >取消预约</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import deleteIcon from '~/src/assets/images/common/editIcon.png';
export default {
  name: 'in_hospitable_change_detail',
  data() {
    return {
      form: {
        clientNo: '',
        name: '',
        gender: '',
        cardNo: '',
        mobile: '',
        age: '',
        primaFacie: '', // 初步印象
        referralIntro: '', // 转诊说明
        orderConfigDtoList: {
          complaint: '', inspect: '', diagnosis: '', scheme: '',
        },
        /* state: '',
        subjectName: '内科',
        doctor: '陈良',
        createdTime: '2021-04-27 14：00',
        fee: '239.00',
        zhusu: '呼吸不畅，咳嗽，胸闷',
        jiancha: '患者各项指标均已超出正常值，请注意，白细胞严重偏高，嗜血细胞偏低',
        zhenduan: '肺炎',
        fangan: '每日服用消炎药物，隔一周检查',*/
      },
    };
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    getClientUserInfo(id) {
      this.$api.userManagerInterface.getDetail(id).then(({ data }) => {
        this.form.clientNo = data.data.clientNo;
        this.form.name = data.data.name;
        this.form.gender = data.data.gender;
        this.form.mobile = data.data.mobile;
        this.form.age = data.data.age;
        this.form.cardNo = data.data.cardNo;
      });
    },
    getDetail() {
      this.$api.InhospitalChange.getRegistrationDetail({
        id: this.$route.params.id }).then((res) => {
        const { data } = res;
        this.getClientUserInfo(data.data.clientId);
        this.form = Object.assign(this.form, data.data || {});
        if (data.data.orderConfigDtoList.length === 0) {
          this.form.orderConfigDtoList.complaint = '';
          this.form.orderConfigDtoList.inspect = '';
          this.form.orderConfigDtoList.diagnosis = '';
          this.form.orderConfigDtoList.scheme = '';
        }
        console.log(this.form);
      });
    },
    /**
     * 取消预约
     */
    cancelReservation() {
      this.$confirm(`<div class="delete-text-content"><img class="delete-icon" src="${deleteIcon}"/><span>该操作无法撤销，是否确认取消预约！</span></div>`, '取消提示', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'message-box-customize',
        showClose: true,
      }).then(
        async () => {
          const reqBody = {
            id: this.$route.params.id,
            state: 1,
          };
          await this.$api.InhospitalChange.upstateRegistrationState(reqBody);
          this.$message.success('操作成功');
          return this.getDetail();
        },
      );
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.medical-history-form {
  /deep/ .el-form-item{
    margin-bottom: 10px;
  }
}
.warnStatus1{
  color: #FA912B;
}
.warnStatus3{
  color: #F33D21;
}
 .handle-btn {
    text-align: center;
   margin: 20px 0;
 }
.cancelReservationBtn{
  color: #F33D21;
  border: 1px solid #F33D21;
  background: rgba(243, 61, 33, 0.1);
  border-radius: 50px;
}
</style>
