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
    <div style="display: flex;margin-bottom: 20px;">
      <el-input placeholder="异常名称"
      v-model="AddabnormalName"
      style="width:200px"
      >
      </el-input>
      <div class="inspectionAdd">
        <div @click="inspectionAdd()">添加</div>
      </div>
    </div>
    <el-table :data="tableData"
    class="openTable"
    @selection-change="handleSelectionChange">
      <el-table-column prop="mainAbnormalName" label="主异常名称"
      show-overflow-tooltip></el-table-column>
      <el-table-column prop="createdTime" label="创建时间"
      show-overflow-tooltip></el-table-column>
      <el-table-column prop="abnormalName" label="异常别名"
      show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" prop="index" width="120">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="editException(scope.row)"
              v-if="getAccess('life_style_questionnaire_edit')"
            >删除</el-button>
          </template>
        </el-table-column>
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
      AddabnormalName: '',
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
    this.getDetail();
  },
  methods: {
    inspectionAdd() {
      if (this.AddabnormalName === '') {
        return this.$message.warning('请填写异常名称');
      }
      this.$api.interventionTemplateInterface
        .organAbnormalAliasSave({
          abnormalCode: this.id,
          abnormalName: this.AddabnormalName,
        })
        .then(({ data }) => {
          if (data.success) {
            this.$message.success('操作成功');
            this.getDetail();
            this.$emit('cancelRemove');
          }
        });
    },
    editException(row) {
      if (row.canDelete) {
        this.$api.interventionTemplateInterface
          .organAbnormalAliasRemove(row.id)
          .then(({ data }) => {
            if (data.success) {
              this.$message.success('操作成功');
              this.$emit('cancelRemove');
              this.getDetail();
            }
          });
      } else {
        this.$message.error('该项不能删除');
      }
    },
    async getDetail() {
      // const reqBody = { id: this.id };
      const res = await this.$api.unusualListInterface.listByOrganAbnomalCode(
        this.id,
      );
      const { data } = res.data;
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
   .inspectionAdd{
    width: 70px;
    height: 40px;
    background: #36BF2F;
    border-radius: 5px;
    margin-left: 20px;
    text-align: center;
    line-height: 40px;
    color: #ffffff;
    font-size: 14px;
    cursor: pointer;
    // margin-left: 240px;
}
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
