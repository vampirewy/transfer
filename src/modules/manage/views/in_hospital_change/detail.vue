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
          <el-form-item label="客户姓名：" >
            <span>{{form.name | getResult}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="性别" >
            <span>{{form.gender | getResultGender}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="体检编号：" >
            <span>{{form.clientNo | getResult}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="客户年龄：" >
            <span>{{form.age | getResult}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="手机号码：" >
            <span>{{form.mobile | getResult}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="身份证号：" >
            <span>{{form.cardNo | getResult}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="初步印象：" >
            <span>{{form.firstDesc | getResult}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="转诊说明：" >
            <span>{{form.desc | getResult}}</span>
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
              <el-form-item label="就诊状态：" >
                <span class="warnStatus1" v-if="form.status === 1">
                待就诊
              </span>
                <span v-if="form.status === 2">
                已就诊
              </span>
                <span class="warnStatus3" v-if="form.status === 3">
                已取消
              </span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="就诊时间：" >
                <span>{{form.createdTime | getResult}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="就诊科室：" >
                <span>{{form.subjectName | getResult}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="就诊医生：" >
                <span>{{form.doctor | getResult}}</span>
              </el-form-item>
            </el-col>
            <div v-if="form.status === 2">
            <el-col :span="6">
              <el-form-item label="总支出：" >
                <span>{{form.fee | getResult}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="主诉：" >
                <span>{{form.zhusu | getResult}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="检查：" >
                <span>{{form.jiancha | getResult}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="诊断：" >
                <span>{{form.zhenduan | getResult}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="方案：" >
                <span>{{form.fangan | getResult}}</span>
              </el-form-item>
            </el-col>
            </div>
          </el-row>
      </div>
       <div class="handle-btn">
        <el-button class="cancelBtn" size="small" @click="goBack"
          >返回</el-button>
         <el-button v-if="form.status === 1" class="cancelReservationBtn" size="small"
         >取消预约</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'in_hospitable_change_detail',
  data() {
    return {
      form: { id: this.$route.query.id,
        clientNo: '2021015898745',
        name: '吴白',
        gender: 1,
        cardNo: '330726199210158956',
        mobile: '15899856354',
        age: 30,
        subjectName: '内科',
        doctor: '陈良',
        createdTime: '2021-04-27 14：00',
        fee: '239.00',
        status: 2,
        firstDesc: '肺部CT（疑似肺癌）',
        desc: '',
        zhusu: '呼吸不畅，咳嗽，胸闷',
        jiancha: '患者各项指标均已超出正常值，请注意，白细胞严重偏高，嗜血细胞偏低',
        zhenduan: '肺炎',
        fangan: '每日服用消炎药物，隔一周检查',
      },
    };
  },
  mounted() {
    /* if (this.ids) {
      this.$api.medicalHistoryInterface.medicalInfoDetail(this.ids).then((res) => {
        const { data } = res;
        console.log(data, '撒打算大的');
        this.form = Object.assign(this.form, data.data || {});
        this.currentUser = {
          id: this.form.clientInfoId,
          name: this.form.clientName,
          age: this.form.age,
          gender: this.form.gender,
          gridName: this.form.clientGridName,
        };
      });
    }*/
  },
  methods: {
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
