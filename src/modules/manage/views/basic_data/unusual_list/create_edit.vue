<template>
  <div class="create-edit">
    <el-form
      ref="form"
      :inline="false"
      :label-position="form.labelPosition"
      :model="form"
      :rules="rules"
      label-width="90px"
      class="user-edit-form"
    >
      <div class="divRight">
        <div class="divRightTitleDiv">
          <div class="divRightTitle">
            <span>|</span>
            {{$route.meta.type === 'unusual_list_edit' ? '编辑' : '新增'}}-异常库
          </div>
        </div>
      </div>
      <el-form-item label="异常名称" style="width:25%" prop="abnormalName">
        <el-input
          v-model="form.abnormalName"
          show-word-limit
          placeholder="请输入异常名称"
        ></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="6">
          <el-form-item label="其他名称" prop="abnormalAlias">
            <el-input
              v-model="abnormalAlia"
              maxlength="30"
              placeholder="请输入异常别名"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="18">
          <ul class="alias-content">
            <li class="item">
              <!-- <el-button type="text" @click="aliasRemove(i)">删除</el-button> -->
              <el-button @click="addAlias" class="handle-add">+添加</el-button>

              <span style="margin-left: 30px">已选名称:</span>
              <el-tag
                v-for="(it, i) in form.abnormalAlias"
                :key="i"
                style="margin-right: 6px"
                closable
                @close="aliasRemove(i)"
                >{{ it.name }}</el-tag
              >
            </li>
            <li class="action"></li>
          </ul>
        </el-col>
      </el-row>
      <div class="row">
        <el-form-item label="性别" style="width:25%" prop="gender">
          <el-select v-model="form.gender" style="width: 100%" placeholder="请选择">
            <el-option label="不限" :value="0">不限</el-option>
            <el-option label="男" :value="1">男</el-option>
            <el-option label="女" :value="2">女</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="异常类型" style="width:25%" prop="abnormalType">
          <el-select v-model="form.abnormalType" style="width: 100%">
            <el-option
              :label="item.name"
              :value="item.paramValue"
              v-for="item in form.organTypeList"
              :key="item.paramValue"
            ></el-option>
            <!-- <el-option label="不启用" :value="0"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="重要性" style="width:25%" prop="dangerLevel">
          <el-select
            v-model="form.dangerLevel"
            placeholder="请选择重要性"
            style="width: 100%"
          >
            <el-option
              :label="it.name"
              :value="it.paramValue"
              :key="i"
              v-for="(it, i) in form.dangerLevelList"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="紧急性" style="width:25%" prop="medicalLimit">
          <el-select
            v-model="form.medicalLimit"
            placeholder="请选择紧急性"
            style="width: 100%"
          >
            <el-option
              :label="it.name"
              :value="it.paramValue"
              :key="i"
              v-for="(it, i) in form.medicalLimitList"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <el-form-item label="医学解释" prop="medicalExplain">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入内容"
          v-model="form.medicalExplain"
          :maxlength="1000"
          show-word-limit
        >
        </el-input>
      </el-form-item>
      <el-form-item label="常见原因" prop="commonCause">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入内容"
          v-model="form.commonCause"
          :maxlength="1000"
          show-word-limit
        >
        </el-input>
      </el-form-item>
      <el-form-item label="建议" prop="advice">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入内容"
          v-model="form.advice"
          :maxlength="1000"
          show-word-limit
        >
        </el-input>
      </el-form-item>

      <div class="footer">
        <el-button class="reset-btn" size="small" @click="cancel">返回</el-button>
        <el-button class="add-btn" type="primary" size="small" @click="save">保存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
// import { dangerLevelList, medicalLimitList } from '~/src/constant/base_data';

export default {
  name: 'create_edit',
  data() {
    // const validatorAbnormalAlias = (rule, value, callback) => {
    //   if (!value || value.length === 0) {
    //     callback(new Error('请输入其他名称'));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      routeType: 1, // 1新增 2编辑
      abnormalAlia: '',
      form: {
        labelPosition: 'right',
        abnormalName: '',
        abnormalAlias: [],
        gender: 0,
        state: 1,
        dangerLevel: '',
        dangerLevelList: [],
        medicalLimit: '',
        medicalLimitList: [],
        medicalExplain: '',
        commonCause: '',
        advice: '',
        abnormalType: '',
        organTypeList: [],
      },
      rules: {
        abnormalName: [{ required: true, message: '请输入异常名称' }],
        // abnormalAlias: [
        //   { required: true, message: '请输入其他名称' },
        //   { validator: validatorAbnormalAlias, trigger: 'blur' },
        // ],
        gender: [{ required: true, message: '请选择性别' }],
        abnormalType: [{ required: true, message: '请选择异常类型' }],
        dangerLevel: [{ required: true, message: '请选择重要性' }],
        medicalLimit: [{ required: true, message: '请选择紧急性' }],
      },
      table: [],
    };
  },
  mounted() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      const route = this.$route;
      if (route.meta.type === 'unusual_list_create') {
        this.routeType = 1;
        if (this.$route.query.name) {
          this.form.abnormalName = this.$route.query.name;
        }
      } else if (route.meta.type === 'unusual_list_edit') {
        this.routeType = 2;
        this.getDetail();
      }
      this.getOrganTypeList();
      this.getImportList();
      this.getQuickList();
    },
    /**
     * 获取异常详情
     * @return {Promise<void>}
     */
    async getDetail() {
      const reqBody = { id: this.$route.params.id };
      const res = await this.$api.unusualListInterface.getOrganAbnormal(
        reqBody,
      );
      const { data } = res.data;
      this.form.abnormalName = data.abnormalName;
      this.form.gender = data.gender;
      this.form.dangerLevel = data.dangerLevel;
      this.form.medicalLimit = data.medicalLimit;
      this.form.state = data.state;
      this.form.medicalExplain = data.medicalExplain;
      this.form.commonCause = data.commonCause;
      this.form.advice = data.advice;
      this.form.abnormalType = data.abnormalType;

      this.form.abnormalAlias = data.abnormalAlias.map(it => ({ name: it }));
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
     * 添加异常别名
     */
    addAlias() {
      if (this.abnormalAlia === '') {
        return this.$message.warning('请填写异常别名');
      }
      this.form.abnormalAlias.push({
        name: this.abnormalAlia,
      });
      this.abnormalAlia = '';
    },
    /**
     * 删除异常别名
     * @param i
     */
    aliasRemove(i) {
      this.form.abnormalAlias.splice(i, 1);
    },
    /**
     * 取消
     */
    cancel() {
      this.$router.back();
    },
    /**
     * 异常新增/更新
     * @return {Promise<ElMessageComponent>}
     */
    save() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const abnormalAlias = this.form.abnormalAlias
            .filter(it => it.name !== '')
            .map(it => it.name);
          const reqBody = {
            abnormalName: this.form.abnormalName,
            gender: this.form.gender,
            dangerLevel: this.form.dangerLevel,
            medicalLimit: this.form.medicalLimit,
            state: this.form.state,
            medicalExplain: this.form.medicalExplain,
            commonCause: this.form.commonCause,
            advice: this.form.advice,
            abnormalType: this.form.abnormalType,
            abnormalAlias,
          };

          if (this.routeType === 1) {
            await this.$api.unusualListInterface.saveOrganAbnormal(reqBody);
          } else if (this.routeType === 2) {
            reqBody.id = this.$route.params.id;
            await this.$api.unusualListInterface.updateOrganAbnormal(reqBody);
          }
          if (this.routeType === 1) {
            Object.assign(this.$data, this.$options.data());
          }
          this.$message.success('操作成功');
          this.cancel();
        }
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
  .alias-content {
    .item {
      margin-bottom: 5px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .handle-add {
    border-color: #4991fd;
    color: #4991fd;
    padding-top: 12px;
    padding-bottom: 12px;
    margin-left: 20px;
    border-radius: 8px;
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
  .add-btn {
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 8px;
    padding: 12px 25px;
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
    background-color: #f4f4f6 !important;
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
    flex: 1;
    margin-bottom: 20px;
    .divRightTitleDiv {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      .divRightTitle {
        font-size: 18px;
        color: #333333;
        font-weight: bold;
        span {
          color: #4991fd;
          font-size: 18px;
          margin-right: 9px;
        }
      }
    }
  }
}
</style>
