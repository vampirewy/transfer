<template>
  <div class="create-edit">
    <el-form
      :inline="false"
      :label-position="form.labelPosition"
      :model="form"
      label-width="90px"
      class="user-edit-form"
      :disabled="true"
    >
      <div class="divRight">
        <div class="lines"></div>
        <div class="titless">查看异常库</div>
        <!-- <div class="divRightTitleDiv">
          <div class="divRightTitle"><span>|</span>查看-异常库</div>
        </div> -->
      </div>
      <el-row>
        <el-col :span="6">
          <el-form-item label="异常名称：">
            <span>{{form.abnormalName}}</span>
            <!-- <el-input
              v-model="form.abnormalName"
              disabled
            ></el-input> -->
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="异常类型：">
            <span>{{form.abnormalTypeName}}</span>

            <!-- <el-input
              v-model="form.abnormalTypeName"
              show-word-limit
            ></el-input> -->
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="性别限制：">
            <span>{{form.gender}}</span>

            <!-- <el-input
              v-model="form.gender"
              show-word-limit
            ></el-input> -->
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="ICD10：">
            <span>{{form.icdCode}}</span>

            <!-- <el-input
              v-model="form.icdCode"
              show-word-limit
            ></el-input> -->
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-form-item label="其他名称">
        <el-tag
          v-for="(it, i) in form.abnormalAlias"
          :key="i"
          style="margin-right: 6px"
          >{{ it.name }}</el-tag
        >
      </el-form-item> -->
      <el-row>
        <el-col :span="6">
          <el-form-item label="重要性：">
            <span>{{form.dangerLevelName}}</span>
            <!-- <el-input v-model="form.dangerLevelName"></el-input> -->
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="紧急性：">
            <span>{{form.medicalLimitName}}</span>
            <!-- <el-input v-model="form.medicalLimitName"></el-input> -->
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="推荐科室：">
            <span>{{form.recommendDepartmentName}}</span>
            <!-- <el-input v-model="form.recommendDepartmentName"></el-input> -->
          </el-form-item>
        </el-col>
        <!-- <el-col :span="6">
          <el-form-item label="性别">
            <el-select v-model="form.gender">
              <el-option label="不限" :value="0">不限</el-option>
              <el-option label="男" :value="1">男</el-option>
              <el-option label="女" :value="2">女</el-option>
            </el-select>
          </el-form-item>
        </el-col> -->
        <el-col :span="6">
          <el-form-item label="推荐检查：">
            <span>{{form.recommendInspectName}}</span>
            <!-- <el-input v-model="form.recommendInspectName"></el-input> -->
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="医学解释">
        <span>{{form.medicalExplain}}</span>
        <!-- <el-input
          type="textarea"
          :rows="4"
          v-model="form.medicalExplain"
        >
        </el-input> -->
      </el-form-item>

      <el-form-item label="常见原因">
        <span>{{form.commonCause}}</span>
        <!-- <el-input
          type="textarea"
          :rows="4"
          v-model="form.commonCause"
        >
        </el-input> -->
      </el-form-item>

      <el-form-item label="建议">
        <span>{{form.advice}}</span>
        <!-- <el-input
          type="textarea"
          :rows="4"
          v-model="form.advice"
        >
        </el-input> -->
      </el-form-item>
    </el-form>
    <!-- <div class="footer">
      <el-button class="reset-btn" size="small" @click="goBack">返回</el-button>
    </div> -->
    <div style="text-align: center;margin-top: 20px;">
        <el-button class="cancelBtn" @click="$router.go(-1)">返回</el-button>
        <!-- <el-button class="sureBtn" type="primary" @click="onSubmit">保存</el-button> -->
      </div>
  </div>
</template>

<script>
// import { dangerLevelList, medicalLimitList } from '~/src/constant/base_data';

export default {
  name: 'detail',
  data() {
    return {
      form: {
        labelPosition: 'right',
        labelWidth: '137px',
        abnormalName: '',
        abnormalAlias: [
          {
            name: '',
          },
        ],
        gender: '',
        state: 1,
        dangerLevel: 1,
        // dangerLevelList,
        // medicalLimitList,

        medicalLimit: '1',
        organTypeList: [],
        dangerLevelList: [],
        medicalLimitList: [],
        commonCause: '',
        medicalExplain: '',
        advice: '',
        abnormalTypeName: '',
        icdCode: '',
      },
      table: [],
      id: this.$route.params.id,
    };
  },
  mounted() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      this.getDetail();
      this.getOrganTypeList();
      this.getImportList();
      this.getQuickList();
    },
    async getOrganTypeList() {
      const { data } = await this.$api.unusualListInterface.getOrganTypeList();
      this.$set(this.form, 'organTypeList', data.data);
      // this.form.organTypeList
    },

    async getImportList() {
      const { data } = await this.$api.unusualListInterface.getImportList();
      this.$set(this.form, 'dangerLevelList', data.data);
      // this.form.organTypeList
    },
    async getQuickList() {
      const { data } = await this.$api.unusualListInterface.getQuickList();
      this.$set(this.form, 'medicalLimitList', data.data);
      // this.form.organTypeList
    },
    /**
     * 获取异常详情
     * @return {Promise<void>}
     */
    async getDetail() {
      const reqBody = { id: this.$route.params.id };
      // const reqBody = { id: '1392061524995657730' };
      const res = await this.$api.unusualListInterface.getOrganAbnormal(
        reqBody,
      );
      const { data } = res.data;
      this.form.abnormalName = data.abnormalName;
      if (data.gender === 1) {
        this.form.gender = '男';
      } else {
        this.form.gender = '女';
      }
      this.form.dangerLevel = data.dangerLevel;
      this.form.medicalLimit = data.medicalLimit;
      this.form.state = data.state;
      this.form.medicalExplain = data.medicalExplain;
      this.form.commonCause = data.commonCause;
      this.form.abnormalTypeName = data.abnormalTypeName;
      this.form.medicalLimitName = data.medicalLimitName;
      this.form.dangerLevelName = data.dangerLevelName;
      this.form.advice = data.advice;
      this.form.icdCode = data.icdCode;
      this.form.recommendDepartmentName = data.recommendDepartmentName;
      this.form.recommendInspectName = data.recommendInspectName;
      this.form.abnormalAlias = data.abnormalAlias.map(it => ({ name: it }));
    },
    /**
     * 返回
     */
    goBack() {
      this.$router.push({
        path: '/Exception',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.create-edit {
  padding: 10px;
  .red {
    color: #f00;
    font-style: normal;
  }
  .module-title {
    font-weight: 700;
    padding-left: 15px;
  }
  .form-title {
    color: #707070;
  }
  .el-form-item {
    .el-select {
      width: 100%;
    }
  }
  .alias-content {
    .item {
      margin-bottom: 5px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .handle-add {
    // margin-top: 10px;
    // border: 1px dashed #d9d9d9;
    // border-radius: 6px;
    // cursor: pointer;
    // width: 200px;
    // height: 40px;
    // line-height: 40px;
    padding-top: 12px;
    padding-bottom: 12px;
    margin-left: 20px;
  }
  .reset-btn {
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 8px;
    background: #97a6bd;
    color: #ffffff;
    font-weight: 400;
    padding: 12px 26px;
  }
  .footer {
    width: 100%;
    text-align: center;
    padding: 10px 0;
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

  /deep/.el-form-item__label {
    padding-right: 8px !important;
  }
  /deep/.el-input__inner,
  /deep/.el-textarea__inner {
    border: 0;
    // background-color: #f4f4f6 !important;
  }
  .user-edit-form {
    padding-right: 20px;
    border-right: 1px solid #f4f4f6;
  }

  .row {
    display: flex;
    flex-direction: row;
  }

  .divRight {
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
      margin-top: 17px;
      opacity: 0.5;
    }
    // flex: 1;
    // margin-bottom: 20px;
    // .divRightTitleDiv {
    //   display: flex;
    //   align-items: baseline;
    //   justify-content: space-between;
    //   .divRightTitle {
    //     font-size: 18px;
    //     color: #333333;
    //     font-weight: bold;
    //     span {
    //       color: #4991fd;
    //       font-size: 18px;
    //       margin-right: 9px;
    //     }
    //   }
    // }
  }
}
</style>
