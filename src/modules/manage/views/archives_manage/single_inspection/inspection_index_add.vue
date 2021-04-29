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
        <h3 v-if="id != ''" class="name">编辑-就医用户信息</h3>
        <h3 v-else class="name">新增单项检查</h3>
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
            <el-form-item label="检查编号" prop="drugsName" style="width:25%">
              <el-input
                v-model="infoSource.drugsName"
                placeholder="请输入"
                :maxlength="100"
                style="width: 200px"
              ></el-input>
            </el-form-item>
            <el-form-item label="检查机构" prop="specification" style="width:25%">
              <el-input
                v-model="infoSource.specification"
                placeholder="请输入"
                :maxlength="30"
                style="width: 200px"
              ></el-input>
            </el-form-item>
             <el-form-item label="检查时间" prop="endDate" style="width:25%">
              <el-date-picker
                class="end-date"
                v-model="infoSource.endDate"
                type="date"
                :min-date="infoSource.startDate"
                value-format="yyyy-MM-dd"
                placeholder="请选择"
                style="width: 200px"
              ></el-date-picker>
            </el-form-item>
            <!-- <el-form-item label="就医机构" prop="countDay" style="width:25%">
              <el-input
                v-model="infoSource.countDay"
                placeholder="请输入"
                :maxlength="30"
                number
                style="width: 200px"
              ></el-input>
            </el-form-item> -->
        </div>

        <!-- <div class="row">
            <el-form-item label="就医科室" prop="dose" style="width:25%">
              <el-input
                v-model="infoSource.dose"
                placeholder="请输入"
                :maxlength="30"
                style="width: 200px"
              ></el-input>
            </el-form-item>
            <el-form-item label="主管医生" prop="result" style="width:25%">
              <el-select
                style="width: 200px"
                placeholder="请选择"
                v-model="infoSource.result"
              >
                <el-option
                  v-for="item in resultList"
                  :key="item.paramValue"
                  :label="item.name"
                  :value="item.paramValue">
                </el-option>
              </el-select>
            </el-form-item>
              <el-form-item label="就医时间" prop="startDate" style="width:25%">
              <el-date-picker
                class="start-date"
                v-model="infoSource.startDate"
                type="date"
                :max-date="infoSource.endDate"
                value-format="yyyy-MM-dd"
                placeholder="请选择开始用药时间"
                style="width: 200px"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="出院时间" prop="endDate" style="width:25%">
              <el-date-picker
                class="end-date"
                v-model="infoSource.endDate"
                type="date"
                :min-date="infoSource.startDate"
                value-format="yyyy-MM-dd"
                placeholder="请选择结束用药时间"
                style="width: 200px"
              ></el-date-picker>
            </el-form-item>
        </div> -->
         <!-- <div class="row">
            <el-form-item label="就医金额" prop="dose" style="width:25%">
              <el-input
                v-model="infoSource.dose"
                placeholder="请输入"
                :maxlength="30"
                style="width: 200px"
              ></el-input>
            </el-form-item>
             <el-form-item label="当前状态" prop="result" style="width:25%">
              <el-select
                style="width: 200px"
                placeholder="请选择"
                v-model="infoSource.result"
              >
                <el-option
                  v-for="item in resultList"
                  :key="item.paramValue"
                  :label="item.name"
                  :value="item.paramValue">
                </el-option>
              </el-select>
            </el-form-item>
         </div> -->

        <div class="row">
            <el-form-item label="检查描述" prop="ingrenient" style="width:100%">
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
       <div class="form-title">
        <div class="line"></div>
        <h3 class="name">检查项目</h3>
      </div>
        <div class="row">
            <div>
                <span>体检库：</span>
                <el-select
                v-model="formData.gridId"
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
            </div>
          <el-form-item label="检查项目" prop="clientName" style="width:25%">
            <el-popover
              ref="userPopoverCheck"
              placement="bottom-start"
              width="650"
              trigger="click"
              @show="popoverStatusCheck = true"
              @hide="handlePopoperCloseCheck"
            >
              <select-examination
                v-if="popoverStatusCheck"
                @change="onSelectUserCheck"
                :examination="formData.gridId"
              ></select-examination>
              <el-input
                :class="`select-user-trigger ${id ? 'disabled' : ''}`"
                slot="reference"
                disabled
                v-model="infoSource.clientNameCheck"
                placeholder="请选择"
                style="width: 232px;"
              >
                <i
                  :class="`el-icon-caret-${popoverStatus ? 'top' : 'bottom'}`"
                  slot="suffix"
                ></i>
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
          prop="startDate"
        >
         <template slot-scope="scope">
             <input class="Checkinput" type="text" v-model="scope.row.outcome">
          </template>
        </el-table-column>
        <el-table-column label="正常参考" prop="refRange" >
          <template slot-scope="scope">
             <input class="Checkinput" type="text" v-model="scope.row.reference">
          </template>
        </el-table-column>
        <el-table-column label="单位" prop="unit" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="建议" prop="dose" >
          <template slot-scope="scope">
             <input class="Checkinput" type="text" v-model="scope.row.Suggestion">
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
              <el-button type="text" @click="Addoperates(scope.$index, scope.row.id)">
              <img
                class="icon-delete"
                src="@/assets/images/service/compile.png"
              />
            </el-button>
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
      },
      drugsList: [],
      resultList: [],
      gridList: [],
      rules: {
        clientName: [{ required: true, message: '客户不能为空' }],
        drugsName: [{ required: true, message: '药品名称不能为空' }],
        startDate: [{ required: true, message: '开始时间不能为空' }],
        endDate: [{ required: true, message: '结束时间不能为空' }],
        result: [{ required: true, message: '当前状态不能为空' }],
      },
      formData: {
        pageNo: 1,
        gridId: '',
      },
      StatusCheck: [],
    };
  },
  mounted() {
    console.log(this.id);
    window.vm = this;
    this.getResultList();
    this.queryList();
    if (this.id) {
      this.saveInspectRecord(this.id);
    }
  },
  methods: {
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
      console.log(res.data);
      const { data } = res.data;
      if (data) {
        this.gridList = data || [];
      }
    },
    saveInspectRecord(id) {
      this.$api.healthMonitorInterface.SinglegetDetail(id).then(({ data }) => {
        if (data.success) {
          this.infoSource.gridName = data.data.clientId;
          this.id = data.data.id;
          this.infoSource.endDate = data.data.inspectionDate;
          this.infoSource.drugsName = data.data.inspectionNo;
          this.infoSource.specification = data.data.inspectionOrg;
          this.infoSource.ingrenient = data.data.intro;
          for (let i = 0; i < data.data.inspectionRecordConfigDtos.length; i++) {
            const json = {};
            json.sectionName = data.data.inspectionRecordConfigDtos[i].sectionItem;
            json.itemName = data.data.inspectionRecordConfigDtos[i].itemName;
            json.startDate = data.data.inspectionRecordConfigDtos[i].itemValue;
            json.refRange = data.data.inspectionRecordConfigDtos[i].itemRef;
            json.unit = data.data.inspectionRecordConfigDtos[i].unit;
            json.dose = data.data.inspectionRecordConfigDtos[i].advice;
            this.drugsList.push(json);
          }
          console.log(this.drugsList, 'sdfsfsfsdfsdf');
          this.$message.success('操作成功');
        }
      });
    },
    inspectionAdd() {
      if (this.StatusCheck) {
        for (let i = 0; i < this.StatusCheck.length; i++) {
          this.drugsList.push(this.StatusCheck[i]);
        }
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
      this.infoSource.gridName = data.gridName;
    },
    onSelectUserCheck(data) {
      data.outcome = '';
      data.reference = '';
      data.Suggestion = '';
      console.log(data, '接收的数据12323');
      this.$refs.userPopoverCheck.doClose();
      this.popoverStatusCheck = false;
      this.StatusCheck.push(data);
    //   this.infoSource.clientName = data.name;
    //   this.infoSource.clientId = data.id;
    //   this.infoSource.age = data.age;
    //   this.infoSource.gender = data.gender;
    //   this.infoSource.gridName = data.gridName;
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

      if (!this.drugsList.length) {
        return this.$message.warning('请添加检查项目');
      }
      const arrars = [];
      for (let i = 0; i < this.drugsList.length; i++) {
        const json = {};
        json.sectionItem = this.drugsList[i].sectionName;
        json.itemName = this.drugsList[i].itemName;
        json.itemValue = this.drugsList[i].startDate;
        json.itemRef = this.drugsList[i].reference;
        json.unit = this.drugsList[i].unit;
        json.advice = this.drugsList[i].Suggestion;
        arrars.push(json);
      }
      this.$api.healthMonitorInterface.saveInspectRecord({
        clientId: this.infoSource.clientId,
        id: this.id,
        inspectionNo: this.infoSource.drugsName,
        inspectionOrg: this.infoSource.specification,
        inspectionDate: this.infoSource.endDate + this.infoSource.startDates,
        intro: this.infoSource.ingrenient,
        inspectionRecordConfigRequests: arrars,
      }).then(({ data }) => {
        if (data.success) {
          this.$message.success('操作成功');
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
    border: 0;
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
.inspectionAdd{
    width: 70px;
    height: 40px;
    background: #36BF2F;
    border-radius: 5px;
    margin-left: 45px;
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
}
.icon-delete{
    width: 30px;
}
</style>
