<template>
  <div class="create-edit">
    <div class="title">{{routeType === 1 ? '新增' : '编辑'}}-生活方式模板</div>
    <el-form
      class="life-style-form"
      :model="form"
      ref="form"
      :rules="rules"
      label-width="90px"
      label-suffix="："
    >
      <el-row>
        <el-col :span="6">
          <el-form-item label="方案名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="指导类型" prop="guideType">
            <el-select
              v-model="form.guideType"
              placeholder="请选择"
            >
              <el-option
                :label="it.name"
                :value="it.paramValue"
                :key="i"
                v-for="(it, i) in guideTypeList"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="指导内容" prop="guideContent">
            <el-input
              type="textarea"
              :rows="6"
              v-model="form.guideContent"
              maxlength="1000"
              show-word-limit
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="form-buttons">
        <el-button plain size="small" @click="cancel">取消</el-button>
        <el-button size="small" type="primary" @click="save">保存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'create_edit',
  data() {
    return {
      routeType: 1, // 1新增 2编辑
      labelPosition: 'top',
      form: {
        name: '',
        guideType: '',
        guideContent: '',
      },
      rules: {
        name: { required: true, message: '请输入方案名称', trigger: 'blur' },
        guideType: { required: true, message: '请选择指导类型', trigger: 'change' },
        guideContent: { required: true, message: '请输入指导内容', trigger: 'blur' },
      },
      guideTypeList: [],
    };
  },
  mounted() {
    this.getGuideTypeList();
    this.onLoad();
  },
  methods: {
    getGuideTypeList() {
      this.$api.lifeStyleInterface.getGuideTypeList().then(({ data }) => {
        this.guideTypeList = data.data;
      });
    },
    onLoad() {
      const route = this.$route;
      if (route.meta.type === 'life_style_create') {
        this.routeType = 1;
      } else if (route.meta.type === 'life_style_edit') {
        this.routeType = 2;
        this.getDetail();
      }
    },
    /**
     * 获取生活方式明细
     * @return {Promise<void>}
     */
    async getDetail() {
      const reqBody = { id: this.$route.params.id };
      const res = await this.$api.lifeStyleInterface.getLifeStyleById(reqBody);
      const { data } = res.data;
      this.form.name = data.name;
      this.form.guideType = data.guideType;
      this.form.guideContent = data.guideContent;
    },
    cancel() {
      this.$router.back();
    },
    /**
     * 生活方式新增/更新
     * @return {Promise<ElMessageComponent>}
     */
    save() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const reqBody = {
            organId: '',
            orgCode: '',
            name: this.form.name,
            guideType: this.form.guideType,
            guideContent: this.form.guideContent,
          };
          let p;
          if (this.routeType === 1) {
            p = this.$api.lifeStyleInterface.saveLifeStyle(reqBody);
          } else if (this.routeType === 2) {
            reqBody.id = this.$route.params.id;
            p = this.$api.lifeStyleInterface.updateLifeStyle(reqBody);
          }
          p.then(() => {
            this.$message.success('操作成功');
            this.cancel();
          });
        }
      });
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
