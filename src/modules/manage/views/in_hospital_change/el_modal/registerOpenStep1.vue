<template>
  <div>
    <div class="wltitle">
      <div class="quan"></div>
      <span>基本信息</span>
    </div>
    <div class="header">
      <el-form :inline="false" :model="propsForm"
               label-width="85px"
               ref="form"
               class="form-inline">
        <el-row>
          <el-col :span="8">
          <el-form-item label="客户姓名：">
            {{propsForm.clientName | getResult}}
          </el-form-item>
          </el-col>
          <el-col :span="8">
          <el-form-item label="性别：">
            {{propsForm.gender | getResultGender}}
          </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户年龄：">
              {{propsForm.age | getResult}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="手机号码：">
              {{propsForm.mobile | getResult}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="身份证号：">
              {{propsForm.cardNo | getResult}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="初步印象：" class="desc">
              {{propsForm.primaFacie | getResult}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="转诊说明：" class="desc">
              {{propsForm.referralIntro | getResult}}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="form-buttons">
      <el-button size="small" class="sureBtn" type="primary" @click="next"
      >下一步</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'registerOpenStep1',
  props: ['form'],
  data() {
    return {
      propsForm: this.form,
    };
  },
  methods: {
    next() {
      this.$emit('prevNext', 1);
    },
  },
};
</script>

<style lang="scss" scoped>
  .wltitle span {
    font-size: 14px;
  }
  /deep/ .el-form-item{
    margin-bottom: 10px;
  }
  .desc{
    /deep/ .el-form-item__content{
      line-height: 22px;
      margin-top: 10px;
    }
  }
</style>
