<template>
  <el-dialog
    class="comment-dialog"
    :modal-append-to-body="false"
    title="评估设置-肺癌患病风险评估"
    top="3vh"
    :visible="true"
    :before-close="() => $emit('close')"
  >
    <div>
      <el-form
        ref="form"
        class="user-edit-form"
        :model="formData"
        label-width="100px"
        label-suffix="："
      >
        <el-row>
          <el-col :span="11">
            <el-form-item label="适宜性别">
              <el-select
                v-model="formData.profession"
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  :label="item.name"
                  :value="item.id"
                  v-for="(item, index) in denger"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="问卷是否必填" prop="gender">
              <el-radio-group v-model="formData.gender">
                <el-radio :label="1" value="1">是</el-radio>
                <el-radio :label="2" value="2">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11" style="margin-right: 1px">
            <el-form-item label="适宜年龄">
              <el-input
                v-model="formData.name"
                maxLength="30"
                placeholder="输入最小年龄"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1" style="margin-right: 1px">
            <div style="padding-top: 10px; text-align: center">一</div>
          </el-col>
          <el-col :span="10">
            <el-input
              v-model="formData.name"
              maxLength="30"
              placeholder="输入最大年龄"
            >
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="异常排除" prop="sportLibraryDTOList">
              <div class="template-add-wrapper">
                <el-popover
                  ref="sportPopover"
                  width="640"
                  trigger="click"
                  @show="popoverStatus = true"
                  @hide="handlePopoverClose"
                >
                  <abnormal
                    v-if="popoverStatus"
                    @change="handleSportSelectChange"
                    @cancel="handlePopoverClose"
                  >
                  </abnormal>
                  <el-input
                    class="select-template-trigger"
                    slot="reference"
                    v-model="templateStr"
                    style="width:80%;"
                    placeholder="请选择（可多选）"
                  >
                    <i
                      class="el-select__caret el-input__icon "
                      :class="
                        popoverStatus
                          ? 'el-icon-arrow-up'
                          : 'el-icon-arrow-down'
                      "
                      slot="suffix"
                    ></i>
                  </el-input>
                </el-popover>
                <el-button @click="addSportTemplate" class="addbutton">添加</el-button>
              </div>
              <el-form-item>
              <el-tag
                      class="tags"
                      closable
                      v-for="(tag, index) in formData.tagList"
                      :key="tag.name"
                      @close="close(index)"
              >{{ tag.name }}</el-tag>
            </el-form-item>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="必查项目" prop="sportLibraryDTOList">
              <div class="template-add-wrapper">
                <el-popover
                  ref="sportPopover"
                  width="640"
                  trigger="click"
                  @show="popoverStatus = true"
                  @hide="handlePopoverClose"
                >
                  <abnormal
                    v-if="popoverStatus"
                    @change="handleSportSelectChange"
                    @cancel="handlePopoverClose"
                  >
                  </abnormal>
                  <el-input
                    class="select-template-trigger"
                    slot="reference"
                    v-model="templateStr"
                    style="width:80%;"
                    placeholder="请选择（可多选）"
                  >
                    <i
                      class="el-select__caret el-input__icon "
                      :class="
                        popoverStatus
                          ? 'el-icon-arrow-up'
                          : 'el-icon-arrow-down'
                      "
                      slot="suffix"
                    ></i>
                  </el-input>
                </el-popover>
                <el-button @click="addSportTemplate" class="addbutton">添加</el-button>
              </div>
              <el-form-item>
              <el-tag
                      class="tags"
                      closable
                      v-for="(tag, index) in formData.tagList"
                      :key="tag.name"
                      @close="close(index)"
              >{{ tag.name }}</el-tag>
            </el-form-item>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="异常得分" prop="sportLibraryDTOList">
              <div class="template-add-wrapper">
                <el-popover
                  ref="sportPopover"
                  width="640"
                  trigger="click"
                  @show="popoverStatus = true"
                  @hide="handlePopoverClose"
                >
                  <abnormal
                    v-if="popoverStatus"
                    @change="handleSportSelectChange"
                    @cancel="handlePopoverClose"
                  >
                  </abnormal>
                  <el-input
                    class="select-template-trigger"
                    slot="reference"
                    v-model="templateStr"
                    style="width:80%;"
                    placeholder="请选择（可多选）"
                  >
                    <i
                      class="el-select__caret el-input__icon "
                      :class="
                        popoverStatus
                          ? 'el-icon-arrow-up'
                          : 'el-icon-arrow-down'
                      "
                      slot="suffix"
                    ></i>
                  </el-input>
                </el-popover>
                <el-button @click="addSportTemplate" class="addbutton">添加</el-button>
              </div>
              <el-form-item>
              <el-tag
                      class="tags"
                      closable
                      v-for="(tag, index) in formData.tagList"
                      :key="tag.name"
                      @close="close(index)"
              >{{ tag.name }}</el-tag>
            </el-form-item>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" class="cancelBtn" @click="$emit('close')"  style="width:90px;"
        >取消</el-button
      >
      <el-button size="small" type="primary" @click="submit" style="width:90px;">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
import abnormal from './abnormal.vue';
export default {
  name: 'Comment',
  props: ['id'],
  components: {
    abnormal,
  },
  data() {
    return {
      activeIndex: '1',
      selectTemplate: [],
      formData: {
        birth: '', // 1992-01-04
        gridId: '',
        userRealName: '',
        profession: '',
        address: '',
        tagList: [],
        mobile: '',
        name: '',
        age: '',
        gender: '',
        cardNo: '',
        marriage: '',
        ethnicGroup: '',
        educationLevel: '',
        remark: '',
        tag: '',
        workUnitName: '',
        workUnitAddress: '',
        userIdList: [],
        workIdList: [],
        selectedDoctors: [],
        workUnitDepartment: '',
        sportLibraryDTOList: [],
      },
      denger: [
        {
          name: '男',
          id: '1',
        },
        {
          name: '女',
          id: '2',
        },
      ],
      popoverStatus: false,
      newList: [],
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
    // 添加
    addSportTemplate() {
      if (this.selectTemplate && this.selectTemplate.length > 0) {
        this.formData.tagList = this.selectTemplate;
        this.selectTemplate = [];
      }
      console.log(this.formData.tagList, 123456);
    },
    // 删除
    close(index) {
      this.formData.tagList.splice(index, 1);
    },
    handlePopoverClose() {
      this.popoverStatus = false;
      this.$refs.sportPopover.doClose();
    },
    handleSportSelectChange(data) {
      this.selectTemplate = data;
      this.handlePopoverClose();
    },
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
    },
    // 点击行保存
    ModifyListBtn(index) {
      this.$set(this.form[index], 'isshow', false);
    },
    submit() {
      this.$api.systemManageInterface.saveAvg(this.form).then((response) => {
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
.el-button{
  padding: 12px 18px;
}
.tags {
      margin-right: 10px;
    }
</style>
