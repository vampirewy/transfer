<template>
  <el-dialog
    class="comment-dialog"
    :modal-append-to-body="false"
    :title="`介绍及说明-${form.name}患病风险评估`"
    top="3vh"
    :visible="true"
    :before-close="() => $emit('close')"
  >
    <el-form
      class="comment-form"
      :model="form"
      ref="form"
      :data="tableData"
      label-width="70px"
      label-suffix="："
    >
      <el-row>
        <el-col :span="11">
          <el-form-item label="模型名称">
            <span>{{ form.name }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="评估疾病">
            <span>{{ form.name }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="wltitle" style="margin-bottom:20px;height:20px;">
        <div class="quan"></div>
        <span>危害介绍</span>
      </div>
      <el-row>
        <el-col :span="24">
          <el-form-item label="疾病介绍">
            <el-input
              type="textarea"
              v-model="form.intro"
              placeholder="请输入"
              maxlength="300"
              :rows="3"
              show-word-limit
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="评估提示">
            <el-input
              type="textarea"
              v-model="form.tips"
              placeholder="请输入"
              maxlength="300"
              :rows="3"
              show-word-limit
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="wltitle">
        <div class="quan"></div>
        <span>预防要点</span>
      </div>
      <div class="TabBars">
        <div>
          <span
            class="fristName"
            v-for="(item, index) in tabbor"
            :key="index"
            :class="Tabactive === index ? 'TabBarsName' : 'TabBarsNames'"
            @click="TabbarBtn(index)"
          >
            {{ item }}
          </span>
        </div>
      </div>
      <el-row>
        <el-col :span="24">
          <el-form-item label="疾病预防" v-if="Tabactive == 0">
            <el-input
              type="textarea"
              v-model="form.lowRiskPoint"
              placeholder="请输入"
              maxlength="300"
              :rows="3"
              show-word-limit
            >
            </el-input>
          </el-form-item>
          <el-form-item label="疾病预防" v-if="Tabactive == 1">
            <el-input
              type="textarea"
              v-model="form.midRiskPoint"
              placeholder="请输入"
              maxlength="300"
              :rows="3"
              show-word-limit
            >
            </el-input>
          </el-form-item>
          <el-form-item label="疾病预防" v-if="Tabactive == 2">
            <el-input
              type="textarea"
              v-model="form.highRiskPoint"
              placeholder="请输入"
              maxlength="300"
              :rows="3"
              show-word-limit
            >
            </el-input>
          </el-form-item>
          <el-form-item label="疾病预防" v-if="Tabactive == 3">
            <el-input
              type="textarea"
              v-model="form.veryHighRiskPoint"
              placeholder="请输入"
              maxlength="300"
              :rows="3"
              show-word-limit
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" plain @click="$emit('close')">取消</el-button>
      <el-button size="small" type="primary" @click="submit">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
// import SportTemplate from './sport_template.vue';
export default {
  name: 'Comment',
  props: ['id'],
  components: {
    // SportTemplate,
  },
  data() {
    return {
      activeIndex: '1',
      Tabactive: 0,
      tabbor: ['低危', '中危', '高危', '很高危'],
      form: {
        id: '',
        name: '',
        intro: '',
        tips: '',
        modelExplain: '',
        lowRiskPoint: '',
        midRiskPoint: '',
        highRiskPoint: '',
        veryHighRiskPoint: '',
        questioned: '',
      },
      popoverStatus: false,
      selectTemplate: [],
    };
  },
  computed: {
    templateStr() {
      return this.selectTemplate.map(item => item.name).join(',');
    },
  },
  mounted() {
    this.getCommentDetail();
  },
  methods: {
    TabbarBtn(index) {
      this.Tabactive = index;
    },
    getCommentDetail() {
      this.$api.systemManageInterface
        .getListDetail(this.id.id)
        .then(({ data }) => {
          this.form = data.data;
        });
    },
    handlePopoverClose() {
      this.popoverStatus = false;
      this.$refs.sportPopover.doClose();
    },
    handleSportSelectChange(data) {
      this.selectTemplate = data;
      this.handlePopoverClose();
    },
    addSportTemplate() {
      if (this.selectTemplate && this.selectTemplate.length > 0) {
        this.form.sportLibraryDTOList = this.selectTemplate;
        this.selectTemplate = [];
      }
    },
    submit() {
      this.$api.systemManageInterface
        .saveModel({
          ...this.form,
        })
        .then((response) => {
          if (response.data.rc === 0) {
            this.$emit('close');
            this.$message.success('操作成功');
          } else {
            this.$message.error('网络异常！');
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.comment-dialog {
  /deep/ .el-tabs {
    .el-tabs__header {
      margin-bottom: 0;
    }
    .el-tabs__content {
      border: 1px solid #f4f4f6;
      border-top: none;
      padding: 20px;
      .template-add-wrapper {
        margin-bottom: 20px;
        display: flex;
        > span {
          flex: 1;
        }
        .el-button {
          margin-left: 19px;
          width: 90px;
          height: 40px;
          background: rgba(49, 84, 172, 0.1);
          border-radius: 20px;
          border: 1px solid #3154ac;
          &:hover {
            color: #3154ac;
            border-color: #3154ac;
            background: rgba(49, 84, 172, 0.3);
          }
        }
      }
      .sport-table {
        line-height: 20px;
        th,
        td {
          padding-top: 10px;
          padding-bottom: 10px;
        }
      }
      /deep/ .sign {
        display: flex;
        margin-top: 20px;
        align-items: center;
        justify-content: flex-end;
        .el-input {
          width: 166px;
          input {
            background: #f4f4f6;
            border: none;
          }
        }
      }
    }
  }
  /deep/ textarea {
    border-radius: 5px;
  }
  /deep/ .el-input__count {
    background: #f4f4f6;
  }
  /deep/ .el-dialog__body {
    padding: 20px 26px 0 26px !important;
  }
  /deep/ .el-dialog__footer {
    padding-top: 30px;
    padding-right: 26px;
    text-align: center;
    button {
      width: 90px;
      border-radius: 20px;
      border: none;
    }
    button + button {
      margin-left: 20px;
    }
    .is-plain {
      width: 90px;
      height: 40px;
      background: rgba(49, 84, 172, 0.1);
      border-radius: 20px;
      border: 1px solid #3154ac;
      color: #3154AC;
      &:hover {
        color: #3154ac;
        border-color: #3154ac;
        background: rgba(49, 84, 172, 0.3);
      }
    }
  }
  /deep/ .select-template-trigger input {
    cursor: pointer;
    color: #333 !important;
    // background: #f4f4f6 !important;
  }
  .el-col {
    margin-right: 20px;
  }
}
  .TabBars {
  display: flex;
  align-items: center;
  height: 38px;
  border-bottom: 1px solid #dde0e6;
  z-index: 1;
  margin: 40px 0 20px 0;
  div {
    .TabBarsNames {
      cursor: pointer;
      background: #eef1f5;
      border-color: transparent;
      color: #666666;
      position: relative;
      padding: 9.6px 10px;
      font-size: 12px;
      border-radius: 8px 8px 0 0;
      margin: 0 22px;
      bottom: -2px;
      // border: 1px solid #dde0e6;
    }
    .fristName:nth-child(1) {
      border-radius: 0px 5px 0 0;
      margin-left: 0;
      // border: 1px solid #DDE0E6;
    }
    .TabBarsNames:after {
      content: '';
      display: block;
      width: 20px;
      height: 34.8px;
      position: absolute;
      -webkit-transform: skewX(23deg);
      transform: skewX(23deg);
      background: #eef1f5;
      border-top-right-radius: 8px;
      top: 0px;
      right: -13px;
      // border-right: 1px solid #dde0e6;
      // border-bottom: 1px solid #dde0e6;
    }
    .TabBarsNames:before {
      content: '';
      display: block;
      width: 20px;
      height: 34.8px;
      position: absolute;
      -webkit-transform: skewX(-23deg);
      transform: skewX(-23deg);
      background: #eef1f5;
      border-top-left-radius: 8px;
      top: 0px;
      left: -13px;
      // border-left: 1px solid #dde0e6;
      // border-bottom: 1px solid #dde0e6;
    }
    .fristName:nth-child(1)::before {
      width: 0;
      height: 0;
    }
    .TabBarsName {
      cursor: pointer;
      background: #ffffff;
      border-color: transparent;
      color: #333333;
      position: relative;
      margin: 0 20px;
      padding: 9.5px 9px;
      font-size: 14px;
      border-radius: 8px 8px 0 0;
      border: 1px solid #dde0e6;
    }
    .TabBarsName:after {
      content: '';
      display: block;
      width: 20px;
      height: 38.5px;
      position: absolute;
      -webkit-transform: skewX(23deg);
      transform: skewX(23deg);
      background: white;
      border-top-right-radius: 8px;
      top: 0px;
      right: -13px;
      border-right: 1px solid #dde0e6;
      border-bottom: 1px solid #dde0e6;
    }
    .TabBarsName::before {
      content: '';
      display: block;
      width: 20px;
      height: 38.5px;
      position: absolute;
      -webkit-transform: skewX(-23deg);
      transform: skewX(-23deg);
      background: white;
      border-top-left-radius: 8px;
      top: 0px;
      left: -13px;
      border-left: 1px solid #dde0e6;
      border-bottom: 1px solid #dde0e6;
    }
  }
}
</style>
