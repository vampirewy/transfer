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
        <h3 class="name">新增-其他检测</h3>
      </div>-->
        <div class="divRightTitleDiv">
            <div class="divRightTitle">新增-其他检测
                <div class="titleBiao"></div></div>
        </div>

      <div class="medicate-record mt20">
          <el-row>
              <el-col :span="6">
          <el-form-item label="姓名" prop="clientName" class="boxs">
            <el-popover
              ref="userPopover"
              placement="bottom-start"
              :disabled="!!editId"
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
                :class="`select-user-trigger ${editId ? 'disabled' : ''}`"
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
          <el-row>
          <el-col :span="6">
        <el-form-item label="日期时间" prop="startDate">
          <el-date-picker
              v-model="infoSource.startDate"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              :max-date="new Date()"
              style="width: 100%"
              placeholder="选择日期时间">
            </el-date-picker>
        <!-- <el-date-picker
            class="start-date"
            v-model="infoSource.startDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择日期"
            style="width: 100%"
        ></el-date-picker> -->
        </el-form-item>
          </el-col>
          <!-- <el-col :span="6">
            <el-form-item label="时间" prop="Timevalue">
              <el-time-picker
              v-model="infoSource.Timevalue"
              :picker-options="{
                selectableRange: '00:00:00 - 23:00:00'
              }"
              placeholder="请选择时间">
            </el-time-picker>
            </el-form-item>
          </el-col> -->
          </el-row>
      </div>
      <!-- <div class="form-title">
        <div class="line"></div>
        <h3 class="name">就医信息</h3>
      </div> -->

      <div class="medicate-info mt20" style="margin-top:0">
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
        <div class="divRightTitleDiv" style="margin-top: -20px">
            <div class="divRightTitle">检查项目
                <div class="titleBiao"></div></div>
        </div>
        <div class="row" v-if="!editId">
          <el-form-item label="检测项目" prop="clientName" style="width:40%;background:#ffffff">
            <el-popover
              ref="userPopovers"
              placement="bottom-start"
              width="650"
              trigger="click"
              @show="detectionpopoverStatus = true"
              @hide="detectionhandlePopoperClose"
            >
              <detectionuser
                v-if="detectionpopoverStatus"
                @change="detectiononSelectUser"
              ></detectionuser>
              <el-input
                :class="`select-user-trigger ${id ? 'disabled' : ''}`"
                slot="reference"
                disabled
                v-model="detectioninfoSource.clientName"
                placeholder="请选择(可多选)"
              >
                <i
                  :class="detectionpopoverStatus ?
                  'el-icon-arrow-up':'el-icon-arrow-down'"
                  slot="suffix"
                ></i>
                <!-- <i
                  :class="`el-icon-caret-${detectionpopoverStatus ? 'top' : 'bottom'}`"
                  slot="suffix"
                ></i> -->
              </el-input>
            </el-popover>
          </el-form-item>
          <div class="othertest">
              <div @click="othertestAdd">添加</div>
          </div>
        </div>
     <el-table class="medicate-list mt20" :data="detectionInfos" align="center">
        <el-table-column label="检测项目" prop="name" show-overflow-tooltip>
          <!-- <template slot-scope="scope">
            <span>{{ scope.row.drugsName | getResult }}</span>
          </template> -->
        </el-table-column>
        <el-table-column
          label="检测结果"
          prop="consequences"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
              <input type="text" class="elinputs"
              onkeyup="value=value.replace(/[\u4E00-\u9FA5]/g,'')"
              v-model="scope.row.consequences" name="" id="">
              <!-- <el-input
                type="input"
                v-model="scope.row.consequences"
                placeholder="请输入"
                :maxlength="150"
                show-word-limit
              ></el-input> -->
          </template>
        </el-table-column>
        <el-table-column
          label="计量单位"
          prop="unit"
          show-overflow-tooltip
        >
          <!-- <template slot-scope="scope">
            <span>{{ scope.row.startDate | getResult }}</span>
          </template> -->
        </el-table-column>
        <el-table-column label="操作" prop="index">
          <template slot-scope="scope">
            <el-button type="text" @click="remove(scope.$index,)">
              <img
                class="icon-delete"
                src="@/assets/images/service/deletes.png"
              />
            </el-button>
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
        <el-button class="reset-btn" size="small" @click="blackReturn"
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
import detectionuser from '../components/detection_user.vue';
import selectUser from '../components/select_user.vue';
import deleteIcon from '~/src/assets/images/deleteicon.png';
import * as dayjs from 'dayjs';

export default {
  name: 'medication_history_add',
  props: ['id', 'editId'],
  components: {
    detail,
    selectUser,
    detectionuser,
  },
  data() {
    return {
      popoverStatus: false,
      detectionpopoverStatus: false,
      total: 0,
      infoSource: {
        drugsName: '',
        mainIndication: '',
        specification: '',
        countDay: '',
        startDate: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        endDate: '',
        dose: '',
        ingrenient: '', // 检测描述
        resoures: '',
        result: '',
        clientName: '',
        clientId: '', // 客户id
        age: '',
        gender: '',
        gridName: '',
        startDates: ' 00:00:00',
        Timevalue: '',
      },
      detectioninfoSource: {
        Customer: '', // 客户id
        clientName: '',
        clientId: '', // 检测项目id
        age: '',
        gender: '',
        gridName: '',
      },
      detectionInfo: [], // 检测项目选中数据
      detectionInfos: [], // 渲染选中的项目
      drugsList: [],
      resultList: [],
      rules: {
        Timevalue: [{ required: true, message: '时间不能为空' }],
        clientName: [{ required: true, message: '项目不能为空' }],
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
    console.log(this.id, this.editId);
    if (this.editId) {
      this.othertestInfo(this.id, this.editId);
    }
    window.vm = this;
    this.getResultList();
  },
  methods: {
    async othertestInfo(id, editId) {
      // const reqBody = {
      //   clientId: id,
      //   healthDataOtherId: editId,
      // };
      const res = await this.$api.healthMonitorInterface.getDetailHealthOther(id, editId);
      const { data } = res.data;
      if (data) {
        this.infoSource.age = data.age;
        this.infoSource.clientId = data.clientId;
        this.infoSource.clientName = data.clientName;
        this.infoSource.gender = data.gender;
        this.editId = data.healthDataOtherId;
        this.infoSource.gridName = data.clientNo;
        // projectName: "33311"
        // result: "撒到我范围"
        this.infoSource.startDate = data.testDate;
        // unit: "11"
        console.log(data);
        const json = {
          name: data.projectName,
          consequences: data.result,
          unit: data.unit,
        };
        this.detectionInfos.push(json);
        // this.table.list = data.data || [];
        // this.table.totalCount = data.total;
      }
    },
    // othertestInfo(id, editId) {
    //   this.$api.healthMonitorInterface.getDetailHealthOther(id, editId).then(({ data }) => {
    //     this.infoSource.clientName = data.data.clientName;
    //     this.infoSource.gender = data.data.gender;
    //     this.infoSource.age = data.data.age;
    //     this.infoSource.clientId = data.data.clientId;
    //     this.infoSource.gridName = data.data.clientId;
    //     this.infoSource.SBP = data.data.sbp;
    //     this.infoSource.DBP = data.data.dbp;
    //     this.infoSource.pulse = data.data.hd;
    //     this.infoSource.conclusion = data.data.result;
    //     this.infoSource.startDate = data.data.testDate;
    //     console.log(data);
    //   });
    // },
    operates(index) {
      this.$set(this.detectionInfos[index], 'isshow', true);
      // console.log(this.detectionInfos);
      this.$forceUpdate();
    },
    othertestAdd() {
      if (this.detectioninfoSource.Customer !== '') {
        this.detectionInfo.forEach((valQusOne) => {
          let same = false;
          this.detectionInfos.forEach((valAnswer) => {
            if (valQusOne.id === valAnswer.id) { // 如果有一样 就回答过了
              same = true;
            }
          });
          if (same === false) { // 如果没有相同的则push
            valQusOne.consequences = '';
            this.detectionInfos.push(valQusOne);
          }
        });
        this.total = this.detectionInfos.length;
        this.detectioninfoSource.clientName = '';
        this.detectionInfo = [];
      } else {
        return this.$message.warning('请先选择客户');
      }
    },
    async getResultList() {
      const res = await this.$api.medication.getResultList();
      const { data } = res;
      this.resultList = data.data.data;
    },
    handlePopoperClose() {
      this.popoverStatus = false;
    },
    detectionhandlePopoperClose() {
      this.detectionpopoverStatus = false;
    },
    // 选择客户
    onSelectUser(data) {
      this.$refs.userPopover.doClose();
      this.popoverStatus = false;
      this.infoSource.clientName = data.name;
      this.detectioninfoSource.Customer = data.id;
      this.infoSource.clientId = data.id;
      this.infoSource.age = data.age;
      this.infoSource.gender = data.gender;
      this.infoSource.gridName = data.gridName;
      this.infoSource.gridName = data.clientNo;
    },
    // 选择检测项目
    detectiononSelectUser(data) {
      // console.log(data, '选择检测项目');
      if (data) {
        // console.log(this.detectionInfo, '000000');
        data.forEach((val) => {
          this.detectioninfoSource.clientName += `${val.name}、`;
          this.detectionInfo.push(val);
        });
        // this.detectionInfo.push(data);
        this.$refs.userPopovers.doClose();
        this.detectionpopoverStatus = false;
      } else {
        this.$refs.userPopovers.doClose();
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
      this.$confirm(`<div class="delete-text-content"><img class="delete-icon" src="${deleteIcon}"/><span>该操作无法撤销，是否确认删除！</span></div>`, '删除提示', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'message-box-customize',
        // showClose: true,
      }).then(() => {
        this.detectionInfos.splice(index, 1);
        this.total = this.detectionInfos.length;
      }).catch(() => {});
    },
    // remove(index) {
    //   this.$confirm('确定要删除该数据吗?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning',
    //   }).then(() => {
    //     this.detectionInfos.splice(index, 1);
    //   });
    // },
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
      // console.log(this.detectionInfos, 'qweqweqweqwe');
      if (!this.infoSource.clientName) {
        return this.$message.warning('请选择客户');
      }
      if (!this.infoSource.startDate) {
        return this.$message.warning('请填写时间');
      }
      if (this.detectionInfos.length === 0) {
        return this.$message.warning('请选择项目');
      }
      const arrars = [];
      let iscss = true;
      this.detectionInfos.forEach((val) => {
        if (val.consequences) {
          const json = {};
          json.id = this.editId;
          json.clientId = this.infoSource.clientId;
          json.result = val.consequences;
          json.healthDataItemId = val.id;
          json.detectDate = this.infoSource.startDate;
          json.remark = this.infoSource.ingrenient;
          arrars.push(json);
        } else {
          iscss = false;
          return false;
        }
      });
      // console.log(arrars);
      // for (let i = 0; i < this.detectionInfos.length; i++) {
      //   const json = {};
      //   json.clientId = this.infoSource.clientId;
      //   json.result = this.detectionInfos[i].consequences;
      //   json.healthDataItemId = this.detectionInfos[i].id;
      //   json.detectDate = this.infoSource.startDate;
      //   arrars.push(json);
      // }
      if (!iscss) {
        return this.$message.warning('请填写检测结果');
      }
      this.$api.healthMonitorInterface.saveHealthDataOther(arrars).then(({ data }) => {
        if (data.success) {
          this.$message.success('操作成功');
          this.$emit('messageData', true, true);
        }
      });
      // this.$api.medication.add(reqBody).then(({ data }) => {
      //   if (data.code === 200) {
      //     this.$router.go(-1);
      //   }
      // });
    },
    blackReturn() {
      this.$emit('messageData', true, true);
    },
  },
};
</script>

<style lang="scss" scoped>
.medication-history-add /deep/ {
  .boxs{
     .el-input__inner{
      background: #ffffff !important;
      border: 1px solid #e0e0e0 !important;
    }
  }
  .row {
    display: flex;
    flex-direction: row;
    .el-input__inner{
      background: #ffffff !important;
      border: 1px solid #e0e0e0 !important;
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
    //   background: #ffffff !important;
  }
  .othertest{
    width: 70px;
    height: 40px;
    background: #36BF2F;
    border-radius: 5px;
    text-align: center;
    line-height: 40px;
    color: #ffffff;
    margin-left: 20px;
  }
}
.icon-delete{
    width: 30px;
}
.elinputs{
    width: 150px;
    height: 32px;
    border: solid 1px #DDE0E6;
    padding-left: 10px;
    color: #333333;
    border-radius: 5px;
}
</style>
