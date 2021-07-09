<template>
  <div class="medication-history-edit">
    <el-form
      ref="form"
      :inline="false"
      :rules="rules"
      :model="dataSource"
      label-suffix="："
      label-width="83px"
      class="form-inline"
    >
      <div class="form-title">
        <!-- <div class="line"></div>
        <h3 class="name">编辑用药记录</h3> -->
        <div class="lines"></div>
        <div class="titless">编辑用药记录</div>
      </div>

      <div class="medicate-info mt20">
        <el-row>
          <el-col :span="6">
            <el-form-item label="药品名称" prop="drugsName">
              <el-input
                v-model="dataSource.drugsName"
                placeholder="请输入"
                :maxlength="100"
                style="width: 200px"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="针对问题" prop="mainIndication">
              <el-input
                v-model="dataSource.mainIndication"
                placeholder="请输入"
                :maxlength="30"
                style="width: 200px"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="规格" prop="specification">
              <el-input
                v-model="dataSource.specification"
                placeholder="请输入"
                :maxlength="30"
                style="width: 200px"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="每日次数" prop="countDay">
              <el-input
                v-model="dataSource.countDay"
                placeholder="请输入"
                :maxlength="30"
                number
                style="width: 200px"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="开始时间" prop="startDate">
              <el-date-picker
                class="start-date"
                v-model="dataSource.startDate"
                type="date"
                :max-date="dataSource.endDate"
                value-format="yyyy-MM-dd"
                placeholder="请选择开始用药时间"
                style="width: 200px"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="结束时间" prop="endDate">
              <el-date-picker
                class="end-date"
                v-model="dataSource.endDate"
                type="date"
                :min-date="dataSource.startDate"
                value-format="yyyy-MM-dd"
                placeholder="请选择结束用药时间"
                style="width: 200px"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="每日剂量" prop="doseOne">
              <el-input
                v-model="dataSource.doseOne"
                placeholder="请输入"
                :maxlength="30"
                style="width: 200px"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="使用方法" prop="dose" >
              <el-input
                v-model="dataSource.useMethod"
                placeholder="请输入"
                :maxlength="30"
                style="width: 200px"
              ></el-input>
            </el-form-item>
            </el-col>
          <!-- <el-col :span="6">
            <el-form-item label="当前状态" prop="result">
              <el-select
                style="width: 205px"
                placeholder="请选择当前状态"
                v-model="dataSource.result"
              >
                <el-option
                    v-for="item in resultOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
        </el-row>

        <el-row class="compose">
          <el-col :span="24">
            <el-form-item label="主要成分" prop="ingrenient" style="width: 100%">
              <el-input
                type="textarea"
                :rows="5"
                v-model="dataSource.ingrenient"
                placeholder="请输入"
                :maxlength="300"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row class="situation">
          <el-col :span="24">
            <el-form-item label="用药情况" prop="resoures" style="width: 100%">
              <el-input
                type="textarea"
                :rows="5"
                v-model="dataSource.resoures"
                placeholder="请输入"
                :maxlength="300"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
         <div style="text-align: center;margin-top: 20px;">
        <el-button class="cancelBtn" @click="$router.go(-1)">返回</el-button>
        <el-button class="sureBtn" type="primary" @click="submit">保存</el-button>
      </div>
        <!-- <div class="handle-btn mt10 mb30">
          <el-button class="reset-btn" size="small" @click="goBack">返回</el-button>
          <el-button class="add-btn" type="primary" size="small" @click="submit"
            >保存</el-button
          >
        </div> -->
      </div>
    </el-form>
  </div>
</template>
<script>

export default {
  name: 'medication_history_edit',
  data() {
    return {
      dataSource: {
        id: '',
        drugsName: '',
        mainIndication: '',
        specification: '',
        countDay: '',
        startDate: '',
        endDate: '',
        doseOne: '',
        ingrenient: '',
        resoures: '',
        result: '',
        useMethod: '',
      },
      rules: {
        drugsName: [{ required: true, message: '药品名称不能为空' }],
        startDate: [{ required: true, message: '开始时间不能为空' }],
        endDate: [{ required: true, message: '结束时间不能为空' }],
        result: [{ required: true, message: '当前状态不能为空' }],
      },
      resultList: [],
      resultOptions: [
        { value: 1, label: '未指定' },
        { value: 2, label: '治疗中' },
        { value: 3, label: '转诊' },
        { value: 4, label: '转为慢病' },
        { value: 5, label: '痊愈' },
        { value: 6, label: '其他' },
      ],
    };
  },
  mounted() {
    // this.getResultList();
  },
  methods: {
    async getResultList() {
      const res = await this.$api.medication.getResultList();
      const { data } = res;
      this.resultList = data.data;
      console.log(this.resultList, 'resultListresultList');
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$api.medication.update(this.dataSource).then(({ data }) => {
            if (data.success) {
              this.$message.success('操作成功');
              this.$router.go(-1);
            }
          });
        }
      });
    },
    fetch(id) {
      this.$api.medication.getDetail(id).then(({ data }) => {
        if (data) {
          this.dataSource = {
            ...this.dataSource,
            ...data.data,
          };
        }
      });
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (to.params.id) {
        vm.fetch(to.params.id);
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.medication-history-edit /deep/ {

  .red {
    font-style: normal;
    color: #f00;
  }
  .mt10 {
  }
  .mt20 {
    margin-top: 20px;
  }
  .mt30 {
    margin-top: 30px;
  }
  .mb30 {
    margin-bottom: 30px;
  }
  .el-input__inner,
  .el-textarea__inner {
    background-color: #ffffff;
  }
  .form-inline {
    .form-title {
      position: relative;
      .titless {
      position: relative;
      padding-left: 10px;
      font-size: 18px;
      font-weight: 600;
      color: #333333;
      line-height: 25px;
      margin-bottom: 20px;
      }
    .lines {
      width: 36px;
      height: 4px;
      background: #3154AC;
      margin-left: 10px;
      border-radius: 1px;
      position: absolute;
      margin-top: -5px;
      opacity: 0.5;
    }
      display: flex;
      align-items: center;
      .line {
        width: 2px;
        height: 18px;
        background: #4991fd;
        margin-right: 8px;
        -webkit-border-radius: 1px;
        -moz-border-radius: 1px;
        border-radius: 1px;
      }
      .name {
        font-size: 18px;
        font-weight: 600;
        color: #333333;
      }
    }
    .handle-btn {
      text-align: center;
      .reset-btn {
        color: #3154AC;
        font-weight: 400;
        padding: 12px 26px;
        width: 90px;
        height: 40px;
        background: rgba(49, 84, 172, 0.1);
        border-radius: 50px;
        border: 1px solid #3154AC;
      }
      .add-btn {
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
        border-radius: 8px;
        padding: 12px 25px;
      }
    }
    .compose {
      .el-form-item__content {
        width: 94%;
      }
    }
    .situation {
      .el-form-item__content {
        width: 94%;
      }
    }
  }
}
</style>
