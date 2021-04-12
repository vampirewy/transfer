<template>
  <el-dialog
    class="el-plan-setting-mdl"
    :title="modalTitle"
    :visible.sync="show"
    width="570px"
    alignFooter="right"
    :close-on-click-modal="false"
    @close="onVisible"
  >
    <div class="body">
      <div class="search-title">
        <span>干预模板</span>
      </div>
      <div class="header">
        <el-form :inline="false"
                 label-width="85px"
                 :rules="rules"
                 ref="form"
                 :model="form" class="form-inline">
          <el-row>
            <el-col :span="12">
            <el-form-item label="模板名称：" prop="name">
              <el-input style="width: 180px" v-model="form.name" placeholder="请输入">
              </el-input>
            </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="是否启用：" prop="state">
              <el-select placeholder="请选择" v-model="form.state" clearable style="width: 180px">
                <el-option label="是" :value="1"></el-option>
                <el-option label="否" :value="0"></el-option>
              </el-select>
            </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="性别：" prop="gender">
                <el-select placeholder="请选择" v-model="form.gender" clearable style="width: 180px">
                  <el-option label="不限" :value="0"></el-option>
                  <el-option label="男" :value="1"></el-option>
                  <el-option label="女" :value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="条件关系：" prop="conditionRelation">
                <el-select placeholder="请选择" v-model="form.conditionRelation"
                           clearable style="width: 180px">
                  <el-option label="全部" :value="1"></el-option>
                  <el-option label="任意" :value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" class="cancelBtn" @click="cancel">取消</el-button>
      <el-button size="small" class="sureBtn" type="primary" @click="save">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import ManagerList from '@/components/user_health/manager_list.vue';

export default {
  name: 'TplAddMdl',
  components: {
    ManagerList,
  },
  data() {
    return {
      show: true,
      modalType: 1, // 1新增 2编辑 3合并
      modalTitle: '',
      planId: '',
      id: '',
      selectCheck: [],
      openCheckVisible: false,
      form: {
        name: '',
        state: 1,
        gender: '',
        conditionRelation: '',
      },
      rules: {
        name: [{ required: true, message: '请输入模板名称' }],
        state: [{ required: true, message: '请选择是否启用' }],
        gender: [{ required: true, message: '请选择性别' }],
        conditionRelation: [{ required: true, message: '请选择条件关系' }],
      },
    };
  },
  mounted() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      this.$nextTick(async () => {
        if (this.modalType === 2) {
          this.getDetail();
        }
      });
    },
    /**
     * 获取干预模板计划编辑写入
     * @return {Promise<void>}
     */
    async getDetail() {
      console.log(this.propsData);
      const PropsData = Object.assign({}, this.propsData);
      const { name, state, gender, conditionRelation } = PropsData;
      this.form.name = name;
      this.form.state = state;
      this.form.gender = gender;
      this.form.conditionRelation = conditionRelation;
    },
    onVisible(value) {
      if (!value) {
        this.$jDynamic.hide({ component: 'TplAddMdl' });
      }
    },
    /**
     * 保存
     */
    save() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const obj = {
            name: this.form.name,
            state: this.form.state,
            gender: this.form.gender,
            conditionRelation: this.form.conditionRelation,
          };
          if (this.modalType === 1) {
            this.$api.interventionTemplateInterface
              .saveInterveneTemplate(obj)
              .then(({ data }) => {
                if (data.success) {
                  if (this.confirmfunc) {
                    this.confirmfunc.call(this, obj);
                  }
                  this.cancel();
                }
              });
          } else if (this.modalType === 2) {
            obj.id = this.id;
            this.$api.interventionTemplateInterface
              .updateInterveneTemplate(obj)
              .then(({ data }) => {
                if (data.success) {
                  if (this.confirmfunc) {
                    this.confirmfunc.call(this, obj);
                  }
                  this.cancel();
                }
              });
          }
        }
      });
    },
    cancel() {
      this.show = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-plan-setting-mdl {
  /deep/ .el-dialog__body{
    padding: 30px 12px 10px 12px !important;
  }
  /deep/ .el-input__inner,/deep/ .el-textarea__inner{
    background-color: #F4F4F6;
    color: #333333;
    &::placeholder {
      color: #666666;
    }
  }
  .body {
    .search-title {
      font-size: 18px;
      font-weight: 600;
      color: #333333;
      line-height: 25px;
      padding-left: 10px;
      margin-bottom: 20px;
      position: relative;
      &:before {
        content: '';
        width: 5px;
        height: 5px;
        background: #4991FD;
        border-radius: 3px;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .red {
      color: #f00;
    }
    .colClass{
      width: 66px;
    }
    .form-title {
      color: #262626;
      display: inline-block;
      width: 61px;
      text-align: right;
    }
    .el-pagination {
      padding: 10px 0;
      text-align: right;
    }
    // 下拉弹框
    /deep/ .select-user-trigger {
      line-height: 37px;
      input, i {
        cursor: pointer;
      }
      &.disabled {
        input, i {
          cursor: not-allowed;
        }
      }
      .el-input__suffix{
        width: 25px;
      }
    }
  }
  .el-select{
    width: 100%;
  }
  /*/deep/ .el-textarea .el-input__count{
    bottom: -11px;
    background: none;
    height: 20px;
  }*/
  .el-button + .el-button{
    margin-left: 20px;
  }
  /deep/ .el-dialog__footer{
    padding: 0px 25px 12px 0;
  }
}
</style>
