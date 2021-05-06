<template>
  <div class="medication-history-add">
    <el-form
        ref="form"
        :inline="false"
        :rules="rules"
        :model="infoSource"
        :label-position="right"
        label-suffix="："
        label-width="83px"
        class="form-inline"
    >
      <div class="form-title">
        <div class="line"></div>
        <h3 class="name">新增-血糖</h3>
      </div>

      <div class="medicate-record mt20">
      <div class="row">
          <el-form-item label="姓名" prop="clientName" style="width:25%">
            <el-popover
              ref="userPopover"
              placement="bottom-start"
              width="650"
              trigger="click"
              @show="popoverStatus = true"
              @hide="handlePopoperClose"
            >
              <select-user
                v-if="popoverStatus"
                @change="onSelectUser"
              ></select-user>
              <el-input
                :class="`select-user-trigger ${id ? 'disabled' : ''}`"
                slot="reference"
                disabled
                v-model="infoSource.clientName"
                placeholder="请选择客户"
                style="width: 232px;"
              >
                <i
                  :class="`el-icon-caret-${popoverStatus ? 'top' : 'bottom'}`"
                  slot="suffix"
                ></i>
              </el-input>
            </el-popover>
          </el-form-item>
          <el-form-item label="性别" prop="gender" style="width:20%">
            <el-radio v-model="infoSource.gender" :label="1" disabled>男</el-radio>
            <el-radio v-model="infoSource.gender" :label="2" disabled>女</el-radio>
          </el-form-item>
              <el-form-item label="年龄" prop="age" style="width:25%">
            <el-input
              v-model="infoSource.age"
              disabled
              class="age-input"
              style="width: 200px;"
            ></el-input>
          </el-form-item>
          <el-form-item label="客户编号" prop="gridName" style="width:25%">
            <el-input
              v-model="infoSource.gridName"
              disabled
              style="width: 200px;"
            ></el-input>
          </el-form-item>
      </div>
      </div>

      <!-- <div class="form-title">
        <div class="line"></div>
        <h3 class="name">就医信息</h3>
      </div> -->

      <div class="medicate-info mt20" style="margin-top:0">
        <div class="row">
            <el-form-item label="收缩压" prop="drugsName" style="width:25%">
              <el-input
                v-model="infoSource.drugsName"
                placeholder="请输入"
                :maxlength="100"
                style="width: 200px"
              ></el-input>
            </el-form-item>
            <el-form-item label="舒张压" prop="specification" style="width:25%">
              <el-input
                v-model="infoSource.specification"
                placeholder="请输入"
                :maxlength="30"
                style="width: 200px"
              ></el-input>
            </el-form-item>
            <el-form-item label="脉搏" prop="specification" style="width:25%">
              <el-input
                v-model="infoSource.specification"
                placeholder="请输入"
                :maxlength="30"
                style="width: 200px"
              ></el-input>
            </el-form-item>
        </div>
        <div class="row">
            <el-form-item label="备注" prop="ingrenient" style="width:100%">
              <el-input
                type="textarea"
                :rows="5"
                v-model="infoSource.ingrenient"
                placeholder="请输入"
                :maxlength="300"
                show-word-limit
              ></el-input>
            </el-form-item>
        </div>
      </div>
      <div class="handle-btn mt30 mb30">
        <el-button class="reset-btn" size="small" @click="goBack"
          >返回</el-button
        >
        <el-button class="add-btn" type="primary" size="small" @click="submit"
          >保存</el-button
        >
      </div>
    </el-form>
  </div>
</template>
<script>
import detail from '../components/detail.vue';
import selectUser from '../components/select_user.vue';

export default {
  name: 'medication_history_add',
  components: {
    detail,
    selectUser,
  },
  data() {
    return {
      popoverStatus: false,
      total: 0,
      infoSource: {
        drugsName: '',
        mainIndication: '',
        specification: '',
        countDay: '',
        startDate: '',
        endDate: '',
        dose: '',
        ingrenient: '',
        resoures: '',
        result: '',
        clientName: '',
        clientId: '',
        age: '',
        gender: '',
        gridName: '',
      },
      drugsList: [],
      resultList: [],
      rules: {
        clientName: [{ required: true, message: '客户不能为空' }],
        drugsName: [{ required: true, message: '药品名称不能为空' }],
        startDate: [{ required: true, message: '开始时间不能为空' }],
        endDate: [{ required: true, message: '结束时间不能为空' }],
        result: [{ required: true, message: '当前状态不能为空' }],
      },
      formData: {
        pageNo: 1,
      },
    };
  },
  mounted() {
    window.vm = this;
    this.getResultList();
  },
  methods: {
    async getResultList() {
      const res = await this.$api.medication.getResultList();
      const { data } = res;
      this.resultList = data.data.data;
    },
    handlePopoperClose() {
      this.popoverStatus = false;
    },
    onSelectUser(data) {
      this.$refs.userPopover.doClose();
      this.popoverStatus = false;
      this.infoSource.clientName = data.name;
      this.infoSource.clientId = data.id;
      this.infoSource.age = data.age;
      this.infoSource.gender = data.gender;
      this.infoSource.gridName = data.gridName;
    },
    addRecord() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.drugsList.push(JSON.parse(JSON.stringify(this.infoSource)));
          this.clear();
        }
      });
    },
    remove(index) {
      this.$confirm('确定要删除该数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.drugsList.splice(index, 1);
      });
    },
    clear() {
      const field = [
        'drugsName',
        'mainIndication',
        'specification',
        'countDay',
        'startDate',
        'endDate',
        'dose',
        'result',
        'ingrenient',
        'resoures',
      ];
      field.map((v) => {
        this.infoSource[v] = '';
        return true;
      });
      setTimeout(() => {
        this.$refs.form.clearValidate();
      }, 0);
    },
    goBack() {
      this.$router.go(-1);
    },
    handleCurrentChange(page) {
      this.formData.pageNo = page;
      this.queryList();
    },
    handleSizeChange(size) {
      this.formData.pageSize = size;
      this.queryList();
    },
    submit() {
      const reqBody = {
        clientId: this.infoSource.clientId,
        organId: '',
        paramList: this.drugsList,
      };

      if (!this.infoSource.clientId) {
        return this.$message.warning('请选择客户');
      }

      if (!this.drugsList.length) {
        return this.$message.warning('请添加药品');
      }

      this.$api.medication.add(reqBody).then(({ data }) => {
        if (data.code === 200) {
          this.$router.go(-1);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.medication-history-add /deep/ {
  .row {
    display: flex;
    flex-direction: row;
  }
  .red {
    font-style: normal;
    color: #f00;
  }
  .mt10 {
    margin-top: 10px;
  }
  .mt20 {
    margin-top: 20px;
  }
  .mt30 {
    margin-top: 30px;
  }
  .mb30 {
    margin-bottom: 30px;
  }
  .el-input__inner,
  .el-textarea__inner {
    // background-color: #f4f4f6;
    /*border: 0;*/
  }
  .select-user-input {
    .el-input__inner {
      color: #333;
      cursor: pointer;
    }
  }
  .form-inline {
    .form-title {
      display: flex;
      align-items: center;
      position: relative;
      margin-top: 20px;
      .line {
        width: 36px;
        height: 4px;
        background: #3154AC;
        margin-right: 8px;
        border-radius: 1px;
        position: absolute;
        margin-top: 12px;
        opacity: 0.5;
      }
      .name {
        font-size: 18px;
        font-weight: 600;
        color: #333333;
      }
    }
  }
  .handle-btn {
    text-align: center;
    .reset-btn {
      // -webkit-border-radius: 8px;
      // -moz-border-radius: 8px;
      // border-radius: 8px;
      // background: #97a6bd;
      // color: #ffffff;
      // font-weight: 400;
      // padding: 12px 26px;
      width: 90px;
      height: 40px;
      background: rgba(49, 84, 172, 0.1);
      border-radius: 20px;
      border: 1px solid #3154AC;
      text-align:center;
      color: #3154AC;
    }
    .add-btn {
      // -webkit-border-radius: 8px;
      // -moz-border-radius: 8px;
      // border-radius: 8px;
      // padding: 12px 25px;
      width: 90px;
      height: 40px;
      background: rgba(49, 84, 172, 0.1);
      border-radius: 20px;
      background: #3154AC;
      border: 1px solid #3154AC;
      text-align:center;
    }
  }
  .el-input.is-disabled .el-input__inner{
      background: #ffffff !important;
  }
}
</style>
