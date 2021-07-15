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
        <h3 v-if="id != ''" class="name">编辑-就医用户信息</h3>
        <h3 v-else class="name">新增单项检查</h3>
      </div>-->
        <div class="divRightTitleDiv" style="margin-top: -20px">
            <div class="divRightTitle">{{id ? '编辑-单项检查' : '新增-单项检查'}}
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
              :disabled="!!id || !!clientId"
              @show="popoverStatus = true"
              @hide="handlePopoperClose"
            >
              <select-user
                v-if="popoverStatus"
                @change="onSelectUser"
              ></select-user>
              <el-input
                :class="`select-user-trigger ${id || clientId? 'disabled' : ''}`"
                slot="reference"
                disabled
                v-model="infoSource.clientName"
                placeholder="请选择客户"
                style="width:100%"
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
          <el-form-item label="性别" prop="gender">
            <el-radio v-model="infoSource.gender" :label="1" disabled>男</el-radio>
            <el-radio v-model="infoSource.gender" :label="2" disabled>女</el-radio>
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
          <el-form-item label="客户编号" prop="gridName">
            <el-input
              v-model="infoSource.gridName"
              disabled
            ></el-input>
          </el-form-item>
          </el-col>
      </el-row>
      </div>

      <!-- <div class="form-title">
        <div class="line"></div>
        <h3 class="name">就医信息</h3>
      </div> -->

      <div class="medicate-info mt20" style="margin-top:0">
        <el-row>
            <el-col :span="6">
            <el-form-item label="检查编号" prop="drugsName">
              <el-input
                v-model="infoSource.drugsName"
                placeholder="请输入"
                :maxlength="100"
                onkeyup="value=value.replace(/[\u4E00-\u9FA5]/g,'')"
              ></el-input>
            </el-form-item>
            </el-col>
                <el-col :span="6">
            <el-form-item label="检查机构" prop="specification">
              <el-input
                v-model="infoSource.specification"
                placeholder="请输入"
                :maxlength="30"
              ></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="6">
             <el-form-item label="检查时间" prop="endDate">
              <el-date-picker
                class="end-date"
                v-model="infoSource.endDate"
                type="date"
                :max-date="new Date()"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="请选择"
                style="width:100%"
              ></el-date-picker>
            </el-form-item>
            </el-col>
        </el-row>
        <div class="row">
            <el-form-item label="检查描述" style="width:100%">
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
       <!--<div class="form-title">
        <div class="line"></div>
        <h3 class="name">检查项目</h3>
      </div>-->
        <div class="divRightTitleDiv" style="margin-top: -20px">
            <div class="divRightTitle">检查项目
                <div class="titleBiao"></div></div>
        </div>
        <div class="row">
            <!-- <div>
            <el-form-item label="体检库" prop="gridId">
                <el-select
                v-model="infoSource.gridId"
                placeholder="请选择"
                style="width: 140px"
                >
                <el-option
                    v-for="(item, index) in gridList"
                    :label="item.name"
                    :value="item.id"
                    :key="index"
                ></el-option>
                </el-select>
            </el-form-item>
            </div> -->
            <!-- prop="clientNameCheck" -->
          <el-form-item label="检查项目" class="boxs">
            <el-popover
              ref="userPopoverCheck"
              placement="bottom-start"
              trigger="click"
              @show="popoverStatusCheck = true"
              @hide="handlePopoperCloseCheck"
            >
              <select-examination
                v-if="popoverStatusCheck"
                @change="onSelectUserCheck"
                :examination="infoSource.gridId"
              ></select-examination>
              <el-input
                :class="`select-user-trigger ${id ? 'disabled' : ''}`"
                ref="modifyForm"
                slot="reference"
                disabled
                v-model="infoSource.clientNameCheck"
                placeholder="请选择"
                style="width: 232px;"
              >
              <i
                  :class="popoverStatusCheck ?
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
          <div class="inspectionAdd">
              <div @click="inspectionAdd()">添加</div>
          </div>
        </div>
     <el-table class="medicate-list mt20" :data="drugsList" align="center">
        <el-table-column label="科室" prop="sectionName" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="项目"
          prop="itemName"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="结果"
          prop="itemValue"
        >
         <template slot-scope="scope">
             <input class="Checkinput" type="text" placeholder="请输入" v-model="scope.row.itemValue">
          </template>
        </el-table-column>
        <el-table-column label="参考范围" prop="refRange" >
          <template slot-scope="scope">
             <input class="Checkinput" type="text" placeholder="请输入" v-model="scope.row.refRange">
          </template>
        </el-table-column>
        <el-table-column label="单位" prop="unit">
          <template slot-scope="scope">
             <input class="Checkinput" type="text" placeholder="请输入" v-model="scope.row.unit">
          </template>
        </el-table-column>
        <el-table-column label="建议" prop="advice" >
          <template slot-scope="scope">
             <input class="Checkinput" type="text" placeholder="请输入" v-model="scope.row.advice">
          </template>
        </el-table-column>
        <!-- <el-table-column label="每日次数" prop="countDay" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.countDay | getResult }}</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column
          label="针对情况"
          prop="mainIndication"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{ scope.row.mainIndication | getResult }}</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column
          label="用药情况"
          prop="resoures"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{ scope.row.resoures | getResult }}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="操作" prop="index">
          <template slot-scope="scope">
              <!-- <el-button type="text" @click="Addoperates(scope.$index, scope.row.id)">
              <img
                class="icon-delete"
                src="@/assets/images/service/compile.png"
              />
            </el-button> -->
            <el-button type="text" @click="deleteField(scope.$index, scope.row.id)">
              <img
                class="icon-delete"
                src="@/assets/images/service/deletes.png"
              />
            </el-button>
            <!-- <el-button type="text" @click="remove(scope)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
              style="margin-top: 15px"
              background
              :total="total"
              :page-size="15"
              :current-page="formData.pageNo"
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
              :page-sizes="[15]"
              layout="prev, pager, next, jumper, total, sizes"
            ></el-pagination>
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
import selectExamination from '../components/select_examination.vue';

export default {
  name: 'medication_history_add',
  components: {
    detail,
    selectUser,
    selectExamination,
  },
  data() {
    return {
      popoverStatus: false,
      popoverStatusCheck: false,
      total: 0,
      id: this.$route.query.id,
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
        clientNameCheck: '', // 检查项目
        startDates: ' 00:00:00',
        // gridId: '',
      },
      drugsList: [],
      resultList: [],
      gridList: [],
      rules: {
        clientNameCheck: [{ required: true, message: '检查项目不能为空' }],
        clientName: [{ required: true, message: '客户不能为空' }],
        drugsName: [{ required: true, message: '检查编号不能为空' }],
        specification: [{ required: true, message: '检查机构不能为空' }],
        startDate: [{ required: true, message: '开始时间不能为空' }],
        endDate: [{ required: true, message: '检查时间不能为空' }],
        // gridId: [{ required: true, message: '体检库不能为空' }],
      },
      formData: {
        pageNo: 1,
      },
      StatusCheck: [],
      clientId: this.$route.query.clientId,
    };
  },
  mounted() {
    window.vm = this;
    // this.getResultList();
    this.queryList();
    if (this.id) {
      this.saveInspectRecord(this.id);
    }
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
          this.infoSource.gridName = data.data.clientNo;
        }
      });
    },
    async getResultList() {
      const res = await this.$api.medication.getResultList();
      const { data } = res;
      this.resultList = data.data;
    },
    async queryList() {
      const res = await this.$api.physicalProjectListInterface.listOrganItemLibrary();
      //   const res = await this.$api.PhysicalProjectListInterface.listOrganItemLibrary({
      //     keywords: this.keyword,
      //     pageNo: this.currentPage,
      //     pageSize: this.pageSize,
      //   });
      const { data } = res.data;
      if (data) {
        this.gridList = data || [];
      }
    },
    deleteField(index) {
      this.drugsList.splice(index, 1);
      this.total = this.drugsList.length;
    },
    saveInspectRecord(id) {
      this.$api.healthMonitorInterface.SinglegetDetail(id).then(({ data }) => {
        if (data.success) {
          this.infoSource.clientId = data.data.clientId;
          this.infoSource.gridName = data.data.clientId;
          this.infoSource.clientName = data.data.clientName;
          this.infoSource.age = data.data.age;
          this.id = data.data.id;
          this.infoSource.endDate = data.data.inspectionDate;
          this.infoSource.drugsName = data.data.inspectionNo;
          this.infoSource.specification = data.data.inspectionOrg;
          this.infoSource.ingrenient = data.data.intro;
          this.infoSource.gender = data.data.gender;
          for (let i = 0; i < data.data.inspectionRecordConfigDtos.length; i++) {
            const json = {};
            json.sectionName = data.data.inspectionRecordConfigDtos[i].sectionItem;
            json.itemName = data.data.inspectionRecordConfigDtos[i].itemName;
            json.itemValue = data.data.inspectionRecordConfigDtos[i].itemValue;
            json.refRange = data.data.inspectionRecordConfigDtos[i].itemRef;
            json.unit = data.data.inspectionRecordConfigDtos[i].unit;
            json.advice = data.data.inspectionRecordConfigDtos[i].advice;
            this.drugsList.push(json);
          }
          // this.$message.success('操作成功');
        }
      });
    },
    inspectionAdd() {
      if (this.StatusCheck) {
        this.StatusCheck.forEach((valQusOne) => {
          let same = false;
          this.drugsList.forEach((valAnswer) => {
            if (valQusOne.id === valAnswer.id) { // 如果有一样 就回答过了
              same = true;
            }
          });
          if (same === false) { // 如果没有相同的则push
            this.drugsList.push(valQusOne);
          }
        });
        this.total = this.drugsList.length;
        // for (let i = 0; i < this.StatusCheck.length; i++) {
        //   this.drugsList.push(this.StatusCheck[i]);
        // }
        this.infoSource.clientNameCheck = '';
        this.StatusCheck = [];
        this.$refs.modifyForm.resetFields();
      } else {
        this.$message.warning('请选择检查项目');
      }
    },
    handlePopoperClose() {
      this.popoverStatus = false;
    },
    handlePopoperCloseCheck() {
      this.popoverStatusCheck = false;
    },
    onSelectUser(data) {
      this.$refs.userPopover.doClose();
      this.popoverStatus = false;
      this.infoSource.clientName = data.name;
      this.infoSource.clientId = data.id;
      this.infoSource.age = data.age;
      this.infoSource.gender = data.gender;
      this.infoSource.gridName = data.clientNo;
    },
    onSelectUserCheck(data) {
      if (data) {
        // data.outcome = '';
        // data.reference = '';
        // data.Suggestion = '';
        // this.popoverStatusCheck = false;
        data.forEach((val) => {
          this.infoSource.clientNameCheck += `${val.itemName}、`;
          this.StatusCheck.push(val);
        });
        this.$refs.userPopoverCheck.doClose();
      //   this.infoSource.clientName = data.name;
      //   this.infoSource.clientId = data.id;
      //   this.infoSource.age = data.age;
      //   this.infoSource.gender = data.gender;
      //   this.infoSource.gridName = data.gridName;
      } else {
        this.$refs.userPopoverCheck.doClose();
      }
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
      if (!this.infoSource.clientId) {
        return this.$message.warning('请选择客户');
      }
      if (!this.infoSource.drugsName) {
        return this.$message.warning('请填写检查编号');
      }
      if (!this.infoSource.specification) {
        return this.$message.warning('请填写检查机构');
      }
      if (!this.infoSource.endDate) {
        return this.$message.warning('请填写检查时间');
      }
      // if (!this.drugsList.length) {
      //   return this.$message.warning('请添加检查项目');
      // }
      const arrars = [];
      for (let i = 0; i < this.drugsList.length; i++) {
        const json = {};
        json.sectionItem = this.drugsList[i].sectionName;
        json.itemName = this.drugsList[i].itemName;
        json.itemValue = this.drugsList[i].itemValue;
        json.itemRef = this.drugsList[i].refRange;
        json.unit = this.drugsList[i].unit;
        json.advice = this.drugsList[i].advice;
        arrars.push(json);
      }
      if (arrars.length === 0) {
        return this.$message.warning('请选择检查项目');
      }
      this.$api.healthMonitorInterface.saveInspectRecord({
        clientId: this.infoSource.clientId,
        id: this.id,
        inspectionNo: this.infoSource.drugsName,
        inspectionOrg: this.infoSource.specification,
        inspectionDate: this.infoSource.endDate,
        intro: this.infoSource.ingrenient,
        inspectionRecordConfigRequests: arrars,
      }).then(({ data }) => {
        if (data.success) {
          this.$message.success('操作成功');
          this.$router.go(-1);
        }
      });
    //   this.$api.medication.add(reqBody).then(({ data }) => {
    //     if (data.code === 200) {
    //       this.$router.go(-1);
    //     }
    //   });
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
  .row {
    display: flex;
    flex-direction: row;
    .el-input__inner {
      color: #333 !important;
      background-color: #ffffff !important;
      // background: #F4F4F6 !important;
    }
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
  // .el-input.is-disabled .el-input__inner{
  //     background: #ffffff !important;
  // }
}
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
}
.Checkinput{
    width: 140px;
    height: 40px;
    border: solid 1px #DDE0E6;
    border-radius: 5px;
    text-align: center;
    color: #333333;
    &:focus-visible{
        outline: none;
    }
}
.icon-delete{
    width: 30px;
}
</style>
