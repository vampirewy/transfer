<template>
  <div class="position-management-form">
    <el-form
      ref="positionManagementForm"
      label-width="100px"
      label-position="left"
      class="form-item-admin-flag"
      :model="formData"
      :rules="positionManagementRules"
    >
      <el-row :gutter="18">
        <el-col :span="6">
          <el-form-item label="职称名" prop="title">
            <el-input v-model="formData.title" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="所属分类" prop="professionalTypeStr">
            <el-select
              v-model="formData.professionalTypeStr"
              @change="onProfessionalType(formData.professionalTypeStr)"
              placeholder="请选择"
            >
              <el-option
                v-for="(title, idx) in titleTypeList"
                :key="idx"
                :label="title.value"
                :value="title.key"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col :span="24">
          <div class="auth-condition-container-title">认证条件</div>
          <div class="auth-condition-box">
            <div class="auth-condition-container">
              <div
                      class="auth-condition-item"
                      v-for="(authCondition, index) in formData.authConditions"
                      :key="index">
                <el-row type="flex" align="middle" :gutter="14">
                  <el-col :span="1">
                    <div>{{index + 1}}</div>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item
                            class="form-item-authCondition"
                            :prop="'authConditions.' + index + '.name'"
                            :rules="{
                              required: true, message: '认证信息不能为空', trigger: 'blur'
                            }"
                    >
                      <el-input
                              placeholder="请输入认证信息名称"
                              v-model="authCondition.name"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="3">
                    <el-form-item
                            class="form-item-authCondition"
                            :prop="'authConditions.' + index + '.typeStr'"
                            :rules="{
                              required: true, message: '认证信息不能为空', trigger: 'blur'
                            }"
                    >
                      <el-select
                              v-model="authCondition.typeStr"
                              @change="
                                onAuthConditionType(authCondition.typeStr, index)
                              "
                              placeholder="请选择认证类型"
                      >
                        <el-option label="文本" value="0"></el-option>
                        <el-option label="图片" value="1"></el-option>
                        <el-option label="数字" value="2"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col v-show="authCondition.type" :span="4">
                    <template v-if="authCondition.type === '1'">
                      <el-row type="flex" align="middle">
                        <el-col>
                          <el-form-item
                                  class="form-item-authCondition"
                                  :prop="'authConditions.' + index + '.imageNum'"
                                  :rules="{
                                    required: true, message: '请选择图片张数', trigger: 'blur'
                                  }"
                          >
                            <el-select
                                    v-model="authCondition.imageNum"
                                    placeholder="请选择"
                            >
                              <el-option label="1" value="1"></el-option>
                              <el-option label="2" value="2"></el-option>
                              <el-option label="3" value="3"></el-option>
                              <el-option label="4" value="4"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="4">张</el-col>
                      </el-row>
                    </template>
                    <template v-else>
                      <el-form-item
                              class="form-item-authCondition"
                              :prop="'authConditions.' + index + '.rowType'"
                              :rules="{
                                required: true, message: '请选择单行或多行', trigger: 'blur'
                              }"
                      >
                        <el-radio v-model="authCondition.rowType" label="0">
                          单行
                        </el-radio>
                        <el-radio v-model="authCondition.rowType" label="1">
                          多行
                        </el-radio>
                      </el-form-item>
                    </template>
                  </el-col>
                  <el-col :span="2">
                    <el-checkbox
                            v-model="authCondition.checked"
                            @change="
                        onAuthConditionRequired(authCondition.checked, index)
                      "
                    >必填</el-checkbox
                    >
                  </el-col>
                  <el-col :span="2">
                    <div
                            class="remove-handle"
                            @click="remove(authCondition, index)"
                    >
                      移除
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div class="add-auth-condition-button">
              <div @click="addAuthCondition()">+添加一条</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <div class="el-row-container">
      <el-row type="flex" justify="end" >
        <div class="form-buttons">
          <el-button size="small" plain @click="$emit('cancel')">取消</el-button>
          <el-button size="small" @click="saveTitle()" type="primary">保存</el-button>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'form',
  props: {
    detailId: {
      type: String,
      default: '',
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
    titleTypeList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      types: ['文本', '图片', '数字'],
      formData: {
        title: '',
        professionalType: '',
        professionalTypeStr: '',
        authConditions: [
          {
            checked: false,
            required: 0,
            name: '',
            type: '',
            rowType: '',
            imageNum: undefined,
          },
        ],
      },
      positionManagementRules: {
        title: [{ required: true, message: '职称名不能为空' }],
        professionalTypeStr: [{ required: true, message: '所属分类不能为空' }],
      },
    };
  },
  mounted() {
    this.titleTypeList = this.titleTypeList.slice(1);
    if (this.isEdit) {
      this.queryTitleDetail(this.detailId);
    }
  },
  methods: {
    findTitleByType(type) {
      return this.titleTypeList.find(item => item.key === String(type));
    },
    queryTitleDetail(detailId) {
      this.$api.positionInterface
        .getTitleDetail({ id: detailId })
        .then((response) => {
          const result = response.data;
          const { code, data, message } = result;
          if (code === 200) {
            const titleObj = this.findTitleByType(data.professionalType);
            this.formData = {
              ...data,
              professionalTypeStr: titleObj ? titleObj.value : '',
              authConditions: this.formatAuthConditionList(
                data.authConditionList,
              ),
            };
            delete this.formData.authConditionList;
            console.log('formData: ', this.formData);
          } else {
            this.$message.error(message || '系统异常！');
          }
        });
    },
    formatAuthConditionList(list) {
      return list.map(item => ({
        ...item,
        type: String(item.type),
        rowType: String(item.rowType),
        typeStr: this.types[item.type],
        checked: !!item.required,
      }));
    },
    saveTitle() {
      this.$refs.positionManagementForm.validate((valid) => {
        if (valid) {
          const { id, title, professionalType, authConditions } = this.formData;
          console.log(JSON.stringify(this.formData, null, 2));
          this.$api.positionInterface
            .saveTitle({
              id,
              title,
              professionalType,
              authConditionList: authConditions,
            })
            .then((response) => {
              const result = response.data;
              const { code, message } = result;
              if (code === 200) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 600,
                  onClose: () => {
                    this.$emit('refresh');
                  },
                });
              } else {
                this.$message.error(message || '系统异常！');
              }
            });
        }
      });
    },
    remove(data, index) {
      if (!data.id) {
        this.formData.authConditions.splice(index, 1);
        return;
      }
      this.$confirm('该操作无法撤销，是否确认移除该项吗？', '移除确认', {
        type: 'warning',
      }).then(() => {
        this.$api.positionInterface
          .removeAuthCondition({ id: data.id })
          .then((response) => {
            const result = response.data;
            const { code, message } = result;
            if (code === 200) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 600,
              });
            } else {
              this.$message.error(message || '系统异常！');
            }
          });
        this.formData.authConditions.splice(index, 1);
      });
    },
    addAuthCondition() {
      const mockAuthCondition = {
        required: 0,
        name: '',
        type: '',
        rowType: '',
        imageNum: null,
      };
      // 添加认证条件
      this.formData.authConditions.push(mockAuthCondition);
    },
    onProfessionalType(value) {
      this.formData.professionalType = value;
    },
    onAuthConditionType(value, index) {
      this.formData.authConditions[index].type = this.formData.authConditions[
        index
      ].typeStr;
    },
    onAuthConditionRequired(value, index) {
      this.formData.authConditions[index].required = +this.formData
        .authConditions[index].checked;
    },
  },
};
</script>

<style lang="scss" scoped>
  .auth-condition-box {
    padding: 0 20px;
    border: 1px solid #dedede;
  }
  .auth-condition-item {
    margin-top: 20px;
  }
  .form-item-admin-flag {
    /deep/ .form-item-authCondition {
      margin-bottom: 0 !important;
      .el-form-item__content {
        margin-left: 0 !important;
      }
    }
  }
.remove-handle {
  cursor: pointer;
  color: red;
  font-size: 14px;
}
.add-auth-condition-button {
  padding: 12px 0;
  display: flex;
  font-size: 12px;
  color: #348eed;
  > div {
    cursor: pointer;
  }
}
  .auth-condition-container-title {
    font-size: 14px;
    margin-bottom: 20px;
  }
  .form-buttons {
    margin-top: 20px;
  }
</style>
