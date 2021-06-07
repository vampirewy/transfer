<template>
  <el-dialog
    title="查看体检库"
    class="dialog-detail"
    :modal-append-to-body="false"
    width="570px"
    :visible.sync="visible"
    @close="cancels"
  >
    <!-- <div class="form-title">
      <div class="point"></div>
      <h3 class="name">企业信息</h3>
    </div> -->

    <el-form
      :label-position="right"
      label-width="100px"
      label-text-align="center"
      :model="value"
      ref="form"
      class="form-content"
    >
      <!-- <el-form-item label="企业名称：">
        <el-input
          v-model="value.workUnitName"
          :disabled="value.type === 2"
          :placeholder="value.type === 1 ? '请输入' : ''"
          :maxlength="30"
          style="width: 430px"
        ></el-input>
      </el-form-item> -->
      <!-- <el-form-item label="体检库名称：">
        <el-input
          v-model="value.address"
          :disabled="value.type === 2"
          :placeholder="value.type === 1 ? '请输入' : ''"
          :maxlength="180"
          style="width: 410px"
        ></el-input>
      </el-form-item> -->
      <div style="display: flex;">
        <el-form-item label="选择月份：" >
          <el-select v-model="id.month" disabled placeholder="请选择">
            <!-- <el-option label="男" value="1" key="1"></el-option>
            <el-option label="女" value="2" key="2"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="选择日期：" >
          <el-select v-model="id.day" disabled placeholder="请选择">
            <!-- <el-option label="是" value="1" key="1"></el-option>
            <el-option label="否" value="2" key="2"></el-option> -->
          </el-select>
        </el-form-item>
      </div>
      <div style="display: flex;">
        <el-form-item label="干预形式：" >
          <el-select style="width:160px" v-model="id.planWayTxt" disabled placeholder="请选择">
            <el-option
              v-for="item in form.planWayList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-col :span="6">
          <el-form-item label="主要内容：" >
            <el-input v-model="id.planContent"
            style="width:160px" disabled placeholder="请输入" ></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-form-item label="主要内容：" >
          <el-select v-model="results" placeholder="请选择">
            <el-input>
            </el-input>
            <el-option
              v-for="item in resultOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item> -->
      </div>
      <el-col :span="24">
          <el-form-item label="干预提示：" prop="result">
            <el-input
              type="textarea"
              v-model="id.planWay"
              :rows="5"
              disabled
              placeholder="请输入"
              :maxlength="300"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-col>
      <!-- <el-form-item label="导入体检库：">
        <el-input
          v-model="value.contact"
          :disabled="value.type === 2"
          :placeholder="value.type === 1 ? '请输入' : ''"
          :maxlength="30"
          style="width: 166px"
        ></el-input>
        <span class="tel">是否启用：</span>
        <el-input
          v-model="value.mobile"
          :format="/^(1\d{0,10}){0,1}$/"
          :disabled="value.type === 2"
          :placeholder="value.type === 1 ? '请输入' : ''"
          style="width: 166px"
        ></el-input>
      </el-form-item> -->
    </el-form>
    <div slot="footer" class="dialog-footer" >
      <el-button size="small" @click="cancel" class="cancelBtn">取消</el-button>
      <!-- <el-button type="primary" size="small" @click="submit" class="sureBtn">确定</el-button> -->
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'edit_or_detail',
  props: {
    visible: Boolean,
    id: Object,
  },
  data() {
    return {
      modalTitle: '编辑',
      gender: '', // 性别
      Status: '', // 状态
      interfereform: '', // 干预形式
      results: '', // 内容
      Prompt: '', // 提示
      // resultOptions: [
      //   { value: 1, label: '未指定' },
      //   { value: 2, label: '治疗中' },
      //   { value: 3, label: '转诊' },
      //   { value: 4, label: '转为慢病' },
      //   { value: 5, label: '痊愈' },
      //   { value: 6, label: '其他' },
      // ],
      form: {
        planWayList: [],
      },
    };
  },
  mounted() {
    console.log(this.id, '接收的数据123');
    // this.getDetail();
  },
  methods: {
    async getDetail() {
      const reqBody = { id: this.id };
      const res = await this.$api.interventionTemplateInterface.getInterveneTemplatePlanById(
        reqBody,
      );
      const { data } = res.data;
      this.Prompt = data.title;
      this.results = data.planContent;
      this.interfereform = data.planWay;
    },
    cancel() {
      this.$emit('cancels');
    },
    async submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const obj = {
            interveneTemplateId: this.interveneTemplateId,
            title: this.results,
            planWay: this.interfereform,
            planContent: this.Prompt,
          };
          console.log('obj', obj);
          if (this.id === '') {
            this.$api.interventionTemplateInterface
              .saveInterveneTemplatePlan(obj)
              .then(({ data }) => {
                if (data.success) {
                  this.$message.success('操作成功');
                  // if (this.confirmfunc) {
                  //   this.confirmfunc.call(this, obj);
                  // }
                  this.cancel();
                }
              });
          } else {
            obj.id = this.id;
            this.$api.interventionTemplateInterface
              .updateInterveneTemplatePlan(obj)
              .then(({ data }) => {
                if (data.success) {
                  this.$message.success('操作成功');
                  // if (this.confirmfunc) {
                  //   this.confirmfunc.call(this, obj);
                  // }
                  this.cancel();
                }
              });
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-detail /deep/ {
  .form-title {
    display: flex;
    align-items: center;
    .point {
      width: 5px;
      height: 5px;
      background: #4991fd;
      margin-right: 8px;
      -webkit-border-radius: 1px;
      -moz-border-radius: 1px;
      border-radius: 1px;
    }
    .name {
      font-size: 16px;
      font-weight: 600;
      color: #333333;
    }
  }
  .form-content {
    margin-top: 20px;
    .el-input__inner {
      background-color: #f4f4f6;
      border: 0;
    }
    .tel {
      margin-left: 20px;
      color: #666;
    }
  }
  .dialog-footer {
    text-align: center;
    padding: 0 32px;
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
}
</style>
