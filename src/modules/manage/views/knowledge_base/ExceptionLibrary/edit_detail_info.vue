<template>
  <el-dialog
    title="查看异常别名"
    class="dialog-detail"
    :modal-append-to-body="false"
    width="570px"
    :visible.sync="visible"
    @close="cancel"
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
    <el-table :data="tableData"
    class="openTable"
    @selection-change="handleSelectionChange">
      <el-table-column prop="mainAbnormalName" label="主异常名称"></el-table-column>
      <el-table-column prop="createdTime" label="创建时间"></el-table-column>
      <el-table-column prop="abnormalName" label="异常别名"></el-table-column>
    </el-table>
    </el-form>
    <!-- <div slot="footer" class="dialog-footer" >
      <el-button size="small" @click="cancel" class="cancelBtn">取消</el-button>
      <el-button type="primary" size="small" @click="submit" class="sureBtn">确定</el-button>
    </div> -->
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
      tableData: [],
    };
  },
  mounted() {
    console.log(this.id, '接收的数据123');
    this.getDetail();
  },
  methods: {
    async getDetail() {
      // const reqBody = { id: this.id };
      const res = await this.$api.unusualListInterface.listByOrganAbnomalCode(
        this.id,
      );
      const { data } = res.data;
      console.log(data);
      this.tableData = data;
    },
    cancel() {
      this.$emit('cancel');
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
