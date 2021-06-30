<template>
  <el-dialog
          class="el-plan-setting-mdl"
          :title="modalTitle"
          :visible.sync="show"
          width="900px"
          alignFooter="right"
          :close-on-click-modal="false"
          @close="onVisible"
  >
  <div class="medical-history-form">
    <el-form
      class="medical-history-form"
      :model="form"
      ref="form"
      label-width="90px"
      label-suffix="："
    >
      <div class="topStatus">
        <el-row>
          <div class="status" :class="'status' + form.state">{{form.state | stateFilter}}</div>
          <el-col :span="12">
            <el-form-item label="就诊时间" >
              <span v-if="!form.appointmentDate"> - </span>
              <span v-else>{{ form.appointmentDate}} {{ form.appointmentHourStart}}
            ~ {{ form.appointmentHourEnd}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="就诊科室" >
              <span>{{form.departmentName | getResult}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="就诊医生" >
              <span>{{form.doctorName | getResult}}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="wltitle">
        <div class="quan"></div>
        <span>客户信息</span>
      </div>
      <el-row>
        <el-col :span="8">
          <el-form-item label="客户姓名" >
            <span>{{form.name | getResult}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="性别" >
            <span>{{form.gender | getResultGender}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="客户年龄" >
            <span>{{form.age | getResult}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="身份证号" >
            <span>{{form.cardNo | getResult}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号码" >
            <span>{{form.mobile | getResult}}</span>
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
      <div class="wltitle" v-if="form.state === 3">
        <div class="quan"></div>
        <span>就诊信息</span>
      </div>
      <div v-if="form.state === 3">
          <el-row>
            <el-col :span="8">
              <el-form-item label="就诊时间" >
                  <span v-if="!form.appointmentDate"> - </span>
                  <span v-else>{{ form.appointmentDate}} {{ form.appointmentHourStart}}
            ~ {{ form.appointmentHourEnd}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="就诊科室" >
                <span>{{form.departmentName | getResult}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="就诊医生" >
                <span>{{form.doctorName | getResult}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <div>
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
              <el-col :span="6">
                <el-form-item label="费用支出" >
                  <span style="color: #FA2B2B;font-size: 24px;font-weight: bold">
                    {{form.price | getResult}}</span>
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
  </el-dialog>
</template>

<script>
import deleteIcon from '~/src/assets/images/common/editIcon.png';
export default {
  name: 'detail',
  data() {
    return {
      modalTitle: '',
      show: true,
      propsData: {}, // 父组件传过来的
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
  filters: {
    stateFilter(val) {
      let Value;
      switch (val) {
        case 0:
          Value = '待确认';
          break;
        case 1:
          Value = '已取消';
          break;
        case 2:
          Value = '待就诊';
          break;
        case 3:
          Value = '已就诊';
          break;
        default:
          Value = '-';
          break;
      }
      return Value;
    },
  },
  mounted() {
    this.$nextTick(async () => {
      this.getDetail(this.propsData);
    });
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
    getDetail(row) {
      this.$api.InhospitalChange.getRegistrationDetail({
        id: row.id }).then((res) => {
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
    onVisible(value) {
      if (!value) {
        this.$jDynamic.hide({ component: 'detail' });
      }
    },
    goBack() {
      this.show = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.medical-history-form {
  /deep/ .el-form-item{
    margin-bottom: 10px;
  }
  .topStatus{
    background: #F6F8FC;
    border-radius: 8px;
    padding: 20px 0 10px 0;
    /deep/ .el-form-item{
      margin-bottom: 0;
    }
    .status{
      width: 70px;
      height: 24px;
      background: #3154AC;
      border-radius: 0px 50px 50px 0px;
      font-size: 12px;
      color: white;
      text-align: center;
      line-height: 24px;
      margin-bottom: 8px;
      &.status0{
        background-color: #F33D21;
      }
      &.status1{
        background-color: #B4BBC9;
      }
      &.status2{
        background-color: #FA912B;
      }
      &.status3{
        background-color: #3154AC;
      }
    }
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
.wltitle span {
  font-size: 14px;
}
</style>
