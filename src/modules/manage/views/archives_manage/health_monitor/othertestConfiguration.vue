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
        <h3 class="name">新增-其他配置</h3>
      </div>

      <div class="medicate-record mt20">
       <div class="row">
            <el-form-item label="检测项目" prop="drugsName" style="width:25%">
              <el-input
                v-model="infoSource.drugsName"
                placeholder="请输入"
                :maxlength="100"
                style="width: 200px"
              ></el-input>
            </el-form-item>
            <el-form-item label="计量单位" prop="specification" style="width:25%">
              <el-input
                v-model="infoSource.specification"
                placeholder="请输入"
                :maxlength="30"
                style="width: 200px"
              ></el-input>
            </el-form-item>
            <el-form-item label="是否启用" prop="isstate" style="width:25%">
                <!-- <div style="margin:5px 0 0 20px"> -->
                    <el-switch
                    v-model="isstate"
                    active-color="#13ce66">
                    </el-switch>
                <!-- </div> -->
            </el-form-item>
        </div>
      </div>
      <div class="medicate-info mt20" style="margin-top:0">
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
       <!-- <div class="form-title">
        <div class="line"></div>
        <h3 class="name">检查项目</h3>
      </div> -->
        <div class="row">
          <div style="text-align: center;width:100%">
              <div class="othertest" @click="rowAdd">添加</div>
          </div>
        </div>
     <el-table class="medicate-list mt20" :data="drugsList" align="center">
        <el-table-column label="检测项目" prop="name" show-overflow-tooltip>
        <template slot-scope="scope">
            <div v-if="scope.row.isshow">
                <el-input
                type="input"
                :rows="5"
                v-model="ModifyList.name"
                placeholder="请输入"
                :maxlength="150"
                height="20"
                show-word-limit
              ></el-input>
            </div>
            <div v-else>
                <span>{{scope.row.name}}</span>
            </div>
        </template>
        </el-table-column>
        <el-table-column
          label="计量单位"
          prop="unit"
          show-overflow-tooltip
        >
        <template slot-scope="scope">
            <div v-if="scope.row.isshow">
                <el-input
                type="input"
                :rows="5"
                v-model="ModifyList.unit"
                placeholder="请输入"
                :maxlength="150"
                show-word-limit
              ></el-input>
            </div>
            <div v-else>
                <span>{{scope.row.unit}}</span>
            </div>
        </template>
        </el-table-column>
        <el-table-column
          label="是否启用"
          prop="state"
          show-overflow-tooltip
        >
        <template slot-scope="scope">
            <div v-if="scope.row.isshow">
                <el-switch
                v-model="ModifyList.state"
                :active-value="1"
                :inactive-value="2"
                active-color="#13ce66">
                </el-switch>
            </div>
            <div v-else>
                {{scope.row.state === 1 ? '是' : (scope.row.state === 2 ? '否' : '')}}
            </div>
        </template>
        </el-table-column>
        <el-table-column
          label="检查描述"
          prop="intro"
          show-overflow-tooltip
        >
        <template slot-scope="scope">
            <div v-if="scope.row.isshow">
                <el-input
                type="input"
                :rows="5"
                v-model="ModifyList.intro"
                placeholder="请输入"
                :maxlength="150"
                show-word-limit
              ></el-input>
            </div>
            <div v-else>
                <span>{{scope.row.intro}}</span>
            </div>
        </template>
        </el-table-column>
        <el-table-column label="操作" prop="index">
          <template slot-scope="scope">
<el-button type="text" v-if="!scope.row.isshow" @click="Addoperates(scope.$index, scope.row.id)">
              <img
                class="icon-delete"
                src="@/assets/images/service/compile.png"
              />
            </el-button>
<el-button type="text" v-if="scope.row.isshow" @click="ModifyListBtn(scope.$index, scope.row.id)">
              <img
                class="icon-delete"
                src="@/assets/images/service/allergic.png"
              />
            </el-button>
            <el-button type="text" @click="deleteField(scope.$index, scope.row.id)">
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
import selectUser from '../components/select_user.vue';
import deleteIcon from '~/src/assets/images/deleteicon.png';

export default {
  name: 'medication_history_add',
  components: {
    detail,
    selectUser,
  },
  data() {
    return {
      isstate: false,
      value: true,
      popoverStatus: false,
      total: 0,
      keyword: '',
      infoSource: {
        drugsName: '', // 检测项目
        mainIndication: '',
        specification: '', // 姓名
        countDay: '',
        startDate: '',
        endDate: '',
        dose: '',
        ingrenient: '', // 描述
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
        specification: [{ required: true, message: '计量单位不能为空' }],
        isstate: [{ required: true, message: '请选择是否启用' }],
        startDate: [{ required: true, message: '开始时间不能为空' }],
        endDate: [{ required: true, message: '结束时间不能为空' }],
        result: [{ required: true, message: '当前状态不能为空' }],
      },
      formData: {
        pageNo: 1,
        pageSize: 5,
      },
      ModifyList: {
        Name: '',
        unit: '',
        state: 1,
        intro: '',
      },
    };
  },
  mounted() {
    window.vm = this;
    this.getResultList();
    this.queryList();
  },
  methods: {
    async rowAdd() {
    //   const adds = {
    //     drugsName: this.infoSource.drugsName,
    //     ingrenient: '',
    //     startDate: this.isstate,
    //   };
    //   this.drugsList.push(adds);
    //   console.log(this.drugsList);
      if (this.infoSource.specification === '') {
        return this.$message.warning('请输入计量单位');
      }
      let states;
      if (this.isstate) {
        states = 1;
      } else {
        states = 2;
      }
      const res = await this.$api.healthMonitorInterface.saveHealthDataItem({
        name: this.infoSource.drugsName,
        unit: this.infoSource.specification,
        state: states,
        intro: this.infoSource.ingrenient,
      });
      console.log(res.data);
      if (res.data.success) {
        this.infoSource.drugsName = '';
        this.infoSource.specification = '';
        this.isstate = false;
        this.infoSource.ingrenient = '';
        this.queryList();
      }
    },
    async queryList() {
      const res = await this.$api.healthMonitorInterface.healthDataItemGetAll({
        projectName: this.keyword,
        pageNo: this.formData.pageNo,
        pageSize: this.formData.pageSize,
      });
      console.log(res.data);
      const { data } = res.data;
      if (data) {
        this.drugsList = data.data || [];
        console.log(this.drugsList);
        this.total = data.total;
      }
    },
    Addoperates(index) {
      let ismun = true;
      for (let i = 0; i < this.drugsList.length; i++) {
        if (this.drugsList[i].isshow) {
          ismun = false;
        }
      }
      if (ismun) {
        this.$set(this.drugsList[index], 'isshow', true);
      }
    },
    async getResultList() {
      const res = await this.$api.medication.getResultList();
      const { data } = res;
      this.resultList = data.data.data;
    },
    ModifyListBtn(index, ids) {
      this.$api.healthMonitorInterface.updateHealthDataItem({
        name: this.ModifyList.name,
        unit: this.ModifyList.unit,
        state: this.ModifyList.state,
        intro: this.ModifyList.intro,
        id: ids,
      }).then(({ data }) => {
        if (data.success) {
          this.$set(this.drugsList[index], 'isshow', false);
          this.$message.success('操作成功');
        }
      });
    },
    deleteField(index, list) {
      console.log(list);
      const numList = [];
      numList.push(list);
      this.$confirm(`<div class="delete-text-content"><img class="delete-icon" src="${deleteIcon}"/><span>该操作无法撤销，是否确认删除！</span></div>`, '删除提示', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'message-box-customize',
        // showClose: true,
      }).then(() => {
        this.$api.healthMonitorInterface.deleteHealthDataItem(numList).then(({ data }) => {
          if (data.success) {
            this.drugsList.splice(index, 1);
            this.$message.success('操作成功');
          }
        });
      }).catch(() => {});
    },
    changeStatus() {
      if (this.isstate === 1) {
        this.isstate = 2;
      } else {
        this.isstate = 1;
      }
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

      if (!this.infoSource.specification) {
        return this.$message.warning('请填写姓名');
      }
      this.$api.medication.add(reqBody).then(({ data }) => {
        if (data.code === 200) {
          this.$router.go(-1);
        }
      });
    },
    blackReturn() {
      this.$emit('messageData', true, true);
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
    display: inline-block;
  }
}
.icon-delete{
    width: 30px;
}
</style>
