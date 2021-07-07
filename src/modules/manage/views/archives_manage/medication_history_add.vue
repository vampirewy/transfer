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
      <!--<div class="form-title">
        <div class="line"></div>
        <h3 class="name">新增-就医用户信息</h3>
      </div>-->
<div class="divRightTitleDiv" style="margin-top: -20px">
            <div class="divRightTitle">新增-用户用药信息
                <div class="titleBiao"></div></div>
        </div>
      <div class="medicate-record mt20">
      <el-row>
      <el-col :span="6">
          <el-form-item label="姓名" prop="clientName" class="boxs">
            <el-popover
              ref="userPopover"
              placement="bottom-start"
              width="650"
              trigger="click"
              :disabled="!!clientId"
              @show="popoverStatus = true"
              @hide="handlePopoperClose"
            >
              <select-user
                v-if="popoverStatus"
                @change="onSelectUser"
              ></select-user>
              <el-input
                :class="`select-user-trigger ${clientId ? 'disabled' : ''}`"
                slot="reference"
                disabled
                v-model="infoSource.clientName"
                placeholder="请选择客户"

              >
              <i
                  :class="popoverStatus ?
                  'el-icon-arrow-up':'el-icon-arrow-down'"
                  slot="suffix"
                ></i>
                <!-- <i
                  :class="`el-icon-caret-${popoverStatus ? 'top' : 'bottom'}`"
                  slot="suffix"
                ></i> -->
              </el-input>
            </el-popover>
          </el-form-item>
          </el-col>
          <el-col :span="6">
          <el-form-item label="年龄" prop="age">
            <el-input
              v-model="infoSource.age"
              disabled
              class="age-input"
            ></el-input>
          </el-form-item>
          </el-col>
          <el-col :span="6">
          <el-form-item label="性别" prop="gender">
            <el-radio v-model="infoSource.gender" :label="1" disabled>男</el-radio>
            <el-radio v-model="infoSource.gender" :label="2" disabled>女</el-radio>
          </el-form-item>
          </el-col>
          <el-col :span="6">
          <el-form-item label="客户类别" prop="gridName">
            <el-input
              v-model="infoSource.gridName"
              disabled

            ></el-input>
          </el-form-item>
          </el-col>
      </el-row>
      </div>

      <!--<div class="form-title">
        <div class="line"></div>
        <h3 class="name">就医信息</h3>
      </div>-->
<div class="divRightTitleDiv" style="margin-top: -20px">
            <div class="divRightTitle">用药信息
                <div class="titleBiao"></div></div>
        </div>
      <div class="medicate-info mt20">
       <el-row>
       <el-col :span="6">
            <el-form-item label="药品名称" prop="drugsName">
              <el-input
                v-model="infoSource.drugsName"
                placeholder="请输入"
                :maxlength="100"

              ></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="6">
            <el-form-item label="针对问题" prop="mainIndication" style="width:25%">
              <el-input
                v-model="infoSource.mainIndication"
                placeholder="请输入"
                :maxlength="30"
                style="width: 200px"
              ></el-input>
            </el-form-item>
            </el-col>
            <!-- <el-form-item label="针对问题" prop="mainIndication" style="width:25%">
              <el-input
                v-model="infoSource.mainIndication"
                placeholder="请输入"
                :maxlength="30"
                style="width: 200px"
              ></el-input>
            </el-form-item> -->
            <el-col :span="6">
            <el-form-item label="规格" prop="specification">
              <el-input
                v-model="infoSource.specification"
                placeholder="请输入"
                :maxlength="30"

              ></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="6">
            <el-form-item label="每日次数" prop="countDay">
              <el-input
                v-model="infoSource.countDay"
                placeholder="请输入"
                :maxlength="30"
                number

              ></el-input>
            </el-form-item>
            </el-col>
           </el-row>

        <el-row>
            <el-col :span="6">
              <el-form-item label="开始时间" prop="startDate">
              <el-date-picker
                class="start-date"
                v-model="infoSource.startDate"
                type="date"
                :max-date="infoSource.endDate"
                value-format="yyyy-MM-dd"
                placeholder="请选择开始用药时间"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
            </el-col>
            <el-col :span="6">
            <el-form-item label="结束时间" prop="endDate">
              <el-date-picker
                class="end-date"
                v-model="infoSource.endDate"
                type="date"
                :min-date="infoSource.startDate"
                value-format="yyyy-MM-dd"
                placeholder="请选择结束用药时间"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
            </el-col>
            <el-col :span="6">
            <el-form-item label="每次剂量" prop="dose" >
              <el-input
                v-model="infoSource.dose"
                placeholder="请输入"
                :maxlength="30"

              ></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="6">
            <el-form-item label="使用方法" prop="dose" >
              <el-input
                v-model="infoSource.useMethod"
                placeholder="请输入"
                :maxlength="30"

              ></el-input>
            </el-form-item>
            </el-col>
            <!-- <el-col :span="6">
             <el-form-item label="当前状态" prop="result">
              <el-select
                style="width: 100%"
                placeholder="请选择"
                v-model="infoSource.result"
              >
                <el-option
                  v-for="item in resultOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            </el-col> -->
        </el-row>
        <div class="row">
            <el-form-item label="主要成分" prop="ingrenient" style="width:100%">
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

        <div class="row">
            <el-form-item label="用药情况" prop="resoures" style="width:100%">
              <el-input
                type="textarea"
                :rows="5"
                v-model="infoSource.resoures"
                placeholder="请输入"
                :maxlength="300"
                show-word-limit
              ></el-input>
            </el-form-item>
        </div>
        <div class="handle-btn mt10 mb30">
          <el-button class="reset-btn" size="small" @click="clear"
            >清空</el-button
          >
          <el-button
            class="add-btn"
            type="primary"
            size="small"
            @click="addRecord"
            >添加</el-button
          >
        </div>
      </div>

      <div class="form-title">
        <div class="line"></div>
        <h3 class="name">已添加药品</h3>
      </div>

      <el-table class="medicate-list mt20" :data="drugsList" align="center">
        <el-table-column label="药品名称" prop="drugsName" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.drugsName | getResult }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="主要成分"
          prop="ingrenient"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{ scope.row.ingrenient | getResult }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="开始时间"
          prop="startDate"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{ scope.row.startDate | getResult }}</span>
          </template>
        </el-table-column>
        <el-table-column label="结束时间" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.endDate | getResult }}</span>
          </template>
        </el-table-column>
        <el-table-column label="规格" prop="specification" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.specification | getResult }}</span>
          </template>
        </el-table-column>
        <el-table-column label="每次剂量" prop="dose" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.dose | getResult }}</span>
          </template>
        </el-table-column>
        <el-table-column label="每日次数" prop="countDay" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.countDay | getResult }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="针对情况"
          prop="mainIndication"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{ scope.row.mainIndication | getResult }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="用药情况"
          prop="resoures"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{ scope.row.resoures | getResult }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column
          label="药品信息"
          prop="resoures"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{ scope.row.resoures | getResult }}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="操作" prop="index">
          <template slot-scope="scope">
            <el-button type="text" @click="remove(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

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
import detail from './components/detail.vue';
import selectUser from './components/select_user.vue';
import deleteIcon from '~/src/assets/images/deleteicon.png';

export default {
  name: 'medication_history_add',
  components: {
    detail,
    selectUser,
  },
  data() {
    return {
      popoverStatus: false,
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
        useMethod: '',
      },
      drugsList: [],
      resultList: [],
      rules: {
        clientName: [{ required: true, message: '客户不能为空' }],
        drugsName: [{ required: true, message: '药品名称不能为空' }],
        startDate: [{ required: true, message: '开始时间不能为空' }],
        endDate: [{ required: true, message: '结束时间不能为空' }],
        // result: [{ required: true, message: '当前状态不能为空' }],
      },
      id: '',
      resultOptions: [
        { value: 1, label: '未指定' },
        { value: 2, label: '治疗中' },
        { value: 3, label: '转诊' },
        { value: 4, label: '转为慢病' },
        { value: 5, label: '痊愈' },
        { value: 6, label: '其他' },
      ],
      clientId: this.$route.query.clientId,
    };
  },
  mounted() {
    window.vm = this;
    // this.getResultList();
    // console.log(this.id);
    if (this.clientId) {
      this.getClientUserInfo(this.clientId);
    }
  },
  methods: {
    getClientUserInfo(id) {
      this.$api.userManagerInterface.getDetail(id).then(({ data }) => {
        if (data.success) {
          this.infoSource.clientName = data.data.name;
          this.infoSource.clientId = data.data.id;
          this.infoSource.age = data.data.age;
          this.infoSource.gender = data.data.gender;
          this.infoSource.gridName = data.data.gridName;
        }
      });
    },
    async getResultList() {
      console.log('sdfsfsdf');
      this.$api.medicalHistoryInterface.medicalInfoDetail(this.id).then((res) => {
        const { data } = res;
        this.data = data.data || {};
        console.log(this.data, 'zzzzzzzzz');
      });
      // const res = await this.$api.medication.getResultList();
      // const { data } = res;
      // this.resultList = data.data;
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
      // this.$confirm('确定要删除该数据吗?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning',
      // }).then(() => {
      //   this.drugsList.splice(index, 1);
      // });
      this.$confirm(`<div class="delete-text-content"><img class="delete-icon" src="${deleteIcon}"/><span>该操作无法撤销，是否确认删除！</span></div>`, '删除提示', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'message-box-customize',
        showClose: true,
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
        if (data.success) {
          this.$message.success('操作成功');
          this.$router.go(-1);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .medication-history-add /deep/ {
    .boxs{
    .el-input__inner {
      color: #333 !important;
      background-color: #ffffff !important;
      border: 1px solid #e0e0e0 !important;
      // background: #F4F4F6 !important;
      }
    }
  }
  /deep/ .el-message-box__btns-left {
    text-align: center !important;
  }
  .el-message-box__btns-left {
    text-align: center !important;
  }
.medication-history-add /deep/ {
  .el-message-box__btns-left {
    text-align: center !important;
  }
  .el-button--small {
    border-radius: 30px;
  }
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
      width: 90px;
      height: 40px;
      background: rgba(49, 84, 172, 0.1);
      border-radius: 20px;
      border: 1px solid #3154AC;
      text-align:center;
      color: #3154AC;
    }
    .add-btn {
      width: 90px;
      height: 40px;
      background: rgba(49, 84, 172, 0.1);
      border-radius: 20px;
      background: #3154AC;
      border: 1px solid #3154AC;
      text-align:center;
    }
  }
}
</style>
