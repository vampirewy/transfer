<template>
  <el-dialog
    class="comment-dialog"
    :modal-append-to-body="false"
    :title="`设置默认推荐检查-${genger}`"
    top="3vh"
    width="550px"
    :visible="true"
    :before-close="() => $emit('close')"
  >
    <el-form class="comment-form" label-width="70px" label-suffix="：">
      <el-row>
        <p class="tips">温馨提示：注意多个项目直接用英文逗号,分隔开</p>
        <el-col :span="24">
          <el-form-item label="基本项目">
            <el-input
              type="textarea"
              v-model="list.manPeItem"
              placeholder="请输入"
              maxlength="300"
              :rows="3"
              show-word-limit
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="专项检查">
            <el-input
              type="textarea"
              v-model="list.manPeItemSpecial"
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
      <!-- <el-button size="small" plain @click="$emit('close')">取消</el-button> -->
      <el-button size="small" type="primary" @click="emit"
        >确定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
// import SportTemplate from './sport_template.vue';
export default {
  name: 'Comment',
  props: {
    data: Array,
    id: Object,
  },
  components: {
    // SportTemplate,
  },
  data() {
    return {
      genger: '',
      list:
        {
          manPeItem: '',
          manPeItemSpecial: '',
        },
    };
  },
  computed: {},
  mounted() {
    if (this.id === 1) {
      this.genger = '男';
      this.list.manPeItem = this.data.manPeItem;
      this.list.manPeItemSpecial = this.data.manPeItemSpecial;
    } else {
      this.genger = '女';
      this.list.manPeItem = this.data.womanPeItem;
      this.list.manPeItemSpecial = this.data.womanPeItemSpecial;
    }
  },
  methods: {
    emit() {
      this.$emit('chid-event', this.list);
      this.$emit('close');
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
      color: #3154ac;
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
  .tips {
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #fa912b;
    line-height: 30px;
  }
}
</style>
