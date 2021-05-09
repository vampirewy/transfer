<template>
  <el-dialog
    class="comment-dialog"
    :modal-append-to-body="false"
    title="平均风险设置"
    top="3vh"
    :visible="true"
    :before-close="() => $emit('close')"
  >
    <div>
      <el-table class="medicate-list mt20" :data="form" align="center">
        <el-table-column label="年龄下限" prop="minAge" show-overflow-tooltip>
          <template slot-scope="scope">
            <div>
              <span>{{ scope.row.minAge }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="年龄上限" prop="maxAge" show-overflow-tooltip>
          <template slot-scope="scope">
            <div>
              <span>{{ scope.row.maxAge }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="男性风险"
          prop="configRiskMan"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div v-if="scope.row.isshow">
              <span>{{form.con}}</span>
              <el-input
                type="input"
                :rows="5"
                v-model="scope.row.configRiskMan"
                placeholder="请输入"
                :maxlength="150"
                show-word-limit
              ></el-input>
            </div>
            <div v-else>
              <span>{{ scope.row.configRiskMan }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="女性风险"
          prop="configRiskWoman"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div v-if="scope.row.isshow">
              <el-input
                type="input"
                :rows="5"
                v-model="scope.row.configRiskWoman"
                placeholder="请输入"
                :maxlength="150"
                show-word-limit
              ></el-input>
            </div>
            <div v-else>
              <span>{{ scope.row.configRiskWoman }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="index">
          <template slot-scope="scope">
            <el-button
              type="text"
              v-if="!scope.row.isshow"
              @click="Addoperates(scope.$index)"
            >
              <img
                class="icon-delete"
                src="@/assets/images/service/compile.png"
              />
            </el-button>
            <el-button
              type="text"
              v-if="scope.row.isshow"
              @click="ModifyListBtn(scope.$index, scope.row.id)"
            >
              <img
                class="icon-delete"
                src="@/assets/images/service/allergic.png"
              />
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" class="cancelBtn" @click="$emit('close')"
        >还原初始值</el-button>
      <el-button size="small" type="primary" @click="submit">保存</el-button>
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
      newList: [],
    };
  },
  computed: {
  },
  mounted() {
    this.getCommentDetail();
  },
  methods: {
    getCommentDetail() {
      this.$api.systemManageInterface
        .getAvgList(this.id.id)
        .then(({ data }) => {
          this.form = data.data;
        });
    },
    // 点击编辑
    Addoperates(index) {
      let ismun = true;
      for (let i = 0; i < this.form.length; i++) {
        if (this.form[i].isshow) {
          ismun = false;
        }
      }
      if (ismun) {
        this.$set(this.form[index], 'isshow', true);
      }
      console.log(this.form, 147896548);
    },
    // 点击行保存
    ModifyListBtn(index) {
      this.$set(this.form[index], 'isshow', false);
    },
    submit() {
      this.$api.systemManageInterface
        .saveAvg(
          this.form,
        )
        .then((response) => {
          if (response.data.rc === 0) {
            // this.$emit('close');
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
      width: 110px;
      border-radius: 20px;
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
.icon-delete {
  width: 30px;
}
</style>
