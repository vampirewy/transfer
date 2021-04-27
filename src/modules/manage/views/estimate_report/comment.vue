<template>
  <el-dialog
    class="comment-dialog"
    :modal-append-to-body="false"
    title="点评"
    top="5vh"
    :visible="true"
    width="900px"
    :before-close="() => $emit('close')">
    <el-form
      class="comment-form"
      :model="form"
      ref="form"
      label-width="70px"
      label-suffix="："
    >
      <el-tabs v-model="activeIndex">
        <el-tab-pane label="饮食注意事项" name="1">
          <el-form-item label="注意事项" prop="foodPrecautions">
            <el-input
              type="textarea"
              v-model="form.foodPrecautions"
              placeholder="请输入"
              maxlength="400"
              :rows="12"
              show-word-limit>
            </el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="推荐运动" name="2">
          <el-form-item label="模板名称" prop="sportLibraryDTOList">
            <div class="template-add-wrapper">
              <el-popover
                ref="sportPopover"
                placement="bottom-end"
                width="650"
                trigger="click"
                @show="popoverStatus = true"
                @hide="handlePopoverClose">
                <sport-template
                  v-if="popoverStatus"
                  @change="handleSportSelectChange"
                  @cancel="handlePopoverClose">
                </sport-template>
                <el-input
                  class="select-template-trigger"
                  slot="reference"
                  disabled
                  v-model="templateStr"
                  placeholder="请选择">
                  <i :class="`el-icon-caret-${popoverStatus ? 'top' : 'bottom'}`" slot="suffix"></i>
                </el-input>
              </el-popover>
              <el-button plain @click="addSportTemplate">添加</el-button>
            </div>
          </el-form-item>
          <el-table :data="form.sportLibraryDTOList" class="sport-table">
              <el-table-column label="运动名称" prop="name" align="center"></el-table-column>
              <el-table-column label="运动类型" prop="sportTypeTxt" align="center"></el-table-column>
              <el-table-column
                label="运动强度"
                prop="strengthDegreeTxt"
                align="center">
              </el-table-column>
              <el-table-column label="代谢当量" prop="met" align="center"></el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    @click="form.sportLibraryDTOList.splice(scope.$index, 1)">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="运动注意事项" name="3">
          <el-form-item label="注意事项" prop="sportPrecautions">
            <el-input
              type="textarea"
              v-model="form.sportPrecautions"
              placeholder="请输入"
              maxlength="400"
              :rows="12"
              show-word-limit>
            </el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="前言" name="4">
          <el-form-item label="前言内容" prop="preface">
            <el-input
              type="textarea"
              v-model="form.preface"
              placeholder="请输入"
              maxlength="1000"
              :rows="12"
              show-word-limit>
            </el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="专家点评" name="5">
          <el-form-item label="专家点评" prop="commentContent">
            <el-input
              type="textarea"
              v-model="form.commentContent"
              placeholder="请输入"
              maxlength="2000"
              :rows="12"
              show-word-limit>
            </el-input>
          </el-form-item>
          <div class="sign">
            <span>签名：</span>
            <el-input v-model="form.commentName" placeholder="请输入"></el-input>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" plain @click="$emit('close')">取消</el-button>
      <el-button size="small" type="primary" @click="submit">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import SportTemplate from './sport_template.vue';
export default {
  name: 'Comment',
  props: ['id'],
  components: {
    SportTemplate,
  },
  data() {
    return {
      activeIndex: '1',
      form: {
        foodPrecautions: '',
        sportLibraryDTOList: [],
        sportPrecautions: '',
        preface: '',
        commentContent: '',
        commentName: '',
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
    getCommentDetail() {
      this.$api.accessReport.getComment(this.id).then(({ data }) => {
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
      const { commentName, commentContent, foodPrecautions, sportPrecautions, preface } = this.form;
      const sportItems = [];
      this.form.sportLibraryDTOList.forEach((item) => {
        sportItems.push(item.id);
      });
      const params = {
        commentName,
        commentContent,
        foodPrecautions,
        sportPrecautions,
        preface,
        reportId: this.id,
        sportItem: sportItems.join(),
      };
      this.$api.accessReport.comment(params).then(() => {
        this.$message.success('操作成功');
        this.$emit('close');
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
      border: 1px solid #F4F4F6;
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
          border: 1px solid #3154AC;
          &:hover {
            color: #3154AC;
            border-color: #3154AC;
            background: rgba(49, 84, 172, 0.3);
          }
        }
      }
      .sport-table {
        line-height: 20px;
        th, td {
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
            background: #F4F4F6;
            border: none;
          }
        }
      }
    }
  }
  /deep/ textarea {
    background: #F4F4F6;
    border-radius: 5px;
    border: none;
    resize: none;
  }
  /deep/ .el-input__count {
    background: #F4F4F6;
  }
  /deep/ .el-form-item {
    margin-bottom: 0;
  }
  /deep/ .el-dialog__body {
    padding: 20px 26px 0 26px !important;
  }
  /deep/ .el-dialog__footer {
    padding-top: 30px;
    padding-right: 26px;
    text-align: right;
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
          border: 1px solid #3154AC;
          &:hover {
            color: #3154AC;
            border-color: #3154AC;
            background: rgba(49, 84, 172, 0.3);
          }
    }
  }
  /deep/ .select-template-trigger input {
    cursor: pointer;
    color: #333 !important;
    background: #F4F4F6 !important;
  }
}
</style>
