<template>
  <div class="staff-form">
    <el-form
      :class="{ 'staff-form inputCommon': true, 'staff-detail-form': detail }"
      :model="staffForm"
      ref="staffForm"
      :rules="staffRules"
      label-width="90px"
      label-suffix="："
    >
      <div class="divRightTitleDiv">
        <div class="divRightTitle">{{detail ? '查看' : (id ? '编辑' : '新增')}}指标
          <div class="titleBiao"></div></div>
      </div>
      <el-row>
        <el-col :span="6">
          <el-form-item label="模板名称" prop="name">
            <el-input
              :disabled="detail"
              type="text"
              placeholder="请输入"
              v-model="staffForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="阳性分级" prop="positiveLevel">
            <el-select
                    :disabled="detail"
                    v-model="staffForm.positiveLevel"
                    placeholder="请选择"
            >
              <el-option label="阳性一级" :value="1"></el-option>
              <el-option label="阳性二级" :value="2"></el-option>
              <el-option label="阳性三级" :value="3"></el-option>
              <el-option label="阳性四级" :value="4"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="适用性别" class="form-item-sex">
              <el-select
                      :disabled="detail"
                      v-model="staffForm.gender"
                      placeholder="请选择"
              >
              <el-option label="不限" :value="0">不限</el-option>
              <el-option label="男" :value="1">男</el-option>
              <el-option label="女" :value="2">女</el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form-item label="适宜年龄">
            <el-input
                    :disabled="detail"
                    type="text"
                    style="width: 140px"
                    placeholder="请输入"
                    v-model="staffForm.minAge"></el-input>
            -
            <el-input
                    :disabled="detail"
                    style="width: 140px"
                    type="text"
                    placeholder="请输入"
                    v-model="staffForm.maxAge"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="divRightTitleDiv">
        <div class="divRightTitle" style="margin-top: 10px">模板条件
          <div class="titleBiao"></div></div>
      </div>
      <div class="row" style="margin-top:30px;">
        <el-row style="display: flex;">
          <el-col :span="6">
            <el-form-item label="条件关系" prop="conditionRelation">
              <el-select
                      v-model="staffForm.conditionRelation"
                      placeholder="请选择"
              >
                <el-option label="全部" :value="1"></el-option>
                <el-option label="任意" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="指标名称" style="background:#ffffff">
              <el-popover
                      ref="userPopovers"
                      placement="bottom-start"
                      width="650"
                      trigger="click"
                      popover-class="popoverCss"
                      @show="detectionpopoverStatus = true"
                      @hide="detectionhandlePopoperClose"
              >
                <project-open
                        v-if="detectionpopoverStatus"
                        @change="detectiononSelectUser"
                        @cancel="detectionhandlePopoperClose"
                ></project-open>
                <el-input class="select-user-trigger"
                          slot="reference"
                          :disabled="detectioninfoSource.name !== '' ? false : true"
                          v-model="detectioninfoSource.name"
                          placeholder="请选择"
                          style="width:100%"
                >
                  <i
                          :class="`el-icon-arrow-${detectionpopoverStatus ? 'up' : 'down'}`"
                          slot="suffix"
                  ></i>
                </el-input>
              </el-popover>
            </el-form-item>
          </el-col>
          <div class="othertest">
            <div @click="othertestAdd">添加</div>
          </div>
        </el-row>
      </div>
      <el-table :data="addProject" align="center">
        <el-table-column label="科室名称" prop="sectionName">
          <template slot-scope="scope">
              <el-input type="text" v-model="scope.row.sectionName" />
          </template>
        </el-table-column>
        <el-table-column label="小项名称" prop="itemName">
          <template slot-scope="scope">
            <el-input type="text" v-model="scope.row.itemName" />
          </template>
        </el-table-column>
        <el-table-column label="小项条件" prop="itemName">
          <template slot-scope="scope">
            <el-select v-model="scope.row.itemCondition" placeholder="请选择"
                       @change="changeItemCondition(scope.row)">
              <el-option
                      v-for="(item, index) in relationOptions"
                      :label="item.name"
                      :value="item.value"
                      :key="index"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="条件的值" prop="itemValue">
          <template slot-scope="scope">
            <el-input :disabled="scope.row.itemCondition === 6"
                    type="text"
                    :placeholder="scope.row.itemCondition !== 6 ? '请输入' : ''"
                    v-model="scope.row.itemValue"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="低值" prop="minItemValue">
          <template slot-scope="scope">
            <el-input :disabled="scope.row.itemCondition !== 6 && scope.row.itemCondition !== ''"
                    type="text" :placeholder="scope.row.itemCondition === 6
                    || scope.row.itemCondition === '' ? '请输入' : ''"
                    v-model="scope.row.minItemValue"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="高值" prop="maxItemValue">
          <template slot-scope="scope">
            <el-input :disabled="scope.row.itemCondition !== 6 && scope.row.itemCondition !== ''"
                    type="text" :placeholder="scope.row.itemCondition === 6
                    || scope.row.itemCondition === '' ? '请输入' : ''"
                    v-model="scope.row.maxItemValue"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="index">
          <template slot-scope="scope">
            <el-button type="text" @click="remove(scope.$index,)">
              <img class="icon-delete" src="@/assets/images/service/deletes.png"/>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="form-buttons">
        <el-button size="small" class="cancelBtn" @click="$emit('cancel')">{{
          detail ? '返回' : '取消'
        }}</el-button>
        <el-button size="small" v-if="!detail" class="sureBtn" type="primary" @click="submit"
          >保存</el-button
        >
      </div>
    </el-form>
  </div>
</template>

<script>
import projectOpen from '@/components/date_select/project_open.vue';
export default {
  name: 'StaffForm',
  components: {
    projectOpen,
  },
  props: {
    detail: {
      type: Boolean,
      default: false,
    },
    id: {
      type: [String, Number],
      required: false,
      default: '',
    },
    roleOptions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      planUserName: '',
      planuserModalVisible: false, // 随访人人列表弹窗
      detectionpopoverStatus: false,
      detectioninfoSource: {
        Customer: '', // 客户id
        name: '', // 项目名称
        clientId: '', // 检测项目id
        age: '',
        gender: '',
        gridName: '',
      },
      MatchingInfo: [],
      addProject: [],
      relationOptions: [{ value: 1, name: '>' }, { value: 2, name: '=' }, { value: 3, name: '<' },
        { value: 4, name: '≥' }, { value: 5, name: '≤' }, { value: 6, name: '区间' }],
      staffForm: {
        id: this.id,
        templateType: 1,
        name: '',
        positiveLevel: '',
        conditionRelation: '',
        gender: '',
        minAge: '',
        maxAge: '',
      },
      staffRules: {
        name: [{ required: true, message: '请输入模板名称' }],
        positiveLevel: [{ required: true, message: '请选择阳性等级' }],
        conditionRelation: [{ required: true, message: '请选择条件关系' }],
        sectionName: [{ required: true, message: '请输入科室名称' }],
        itemName: [{ required: true, message: '请输入小项名称' }],
        itemCondition: [{ required: true, message: '请选择小项条件' }],
        itemValue: [{ required: true, message: '请输入条件的值' }],
        minItemValue: [{ required: true, message: '请输入低值' }],
        maxItemValue: [{ required: true, message: '请输入高值' }],
      },
    };
  },
  mounted() {
    if (this.id) {
      this.$api.sunFollow.getWarnTemplateDetail({ id: this.id }).then(async (res) => {
        const { data } = res;
        this.staffForm.name = data.data.name;
        this.staffForm.positiveLevel = data.data.positiveLevel;
        this.staffForm.gender = data.data.gender;
        this.staffForm.minAge = data.data.minAge;
        this.staffForm.maxAge = data.data.maxAge;
        this.staffForm.conditionRelation = data.data.conditionRelation;
        this.addProject = data.data.warnTemplateItemDtos;
      });
    }
  },
  methods: {
    // 关闭小项列表
    handlePlanuserSelectChange(dataList) {
      this.$refs.userPopover.doClose();
      this.planuserModalVisible = false;
      this.planUserName = dataList.itemName;
      this.staffForm.sectionName = dataList.sectionName;
      this.staffForm.itemName = dataList.itemName;
    },
    handlePlanuserClose() {
      this.planuserModalVisible = false;
      this.$refs.userPopover.doClose();
    },
    changeItemCondition(row) {
      if (row.itemCondition === 6) {
        this.$set(row, 'itemValue', '');
        // this.$refs.itemValue.clearValidate();
      } else {
        console.log(row);
        this.$set(row, 'minItemValue', '');
        this.$set(row, 'maxItemValue', '');
        // this.$refs.minItemValue.clearValidate();
        // this.$refs.maxItemValue.clearValidate();
      }
    },
    // 选择检测项目
    detectiononSelectUser(data) {
      if (data) {
        data.forEach((val) => {
          this.detectioninfoSource.name += `${val.itemName},`;
          this.MatchingInfo.push(val);
        });
        this.$refs.userPopovers.doClose();
        this.detectionpopoverStatus = false;
      } else {
        this.$refs.userPopovers.doClose();
      }
    },
    detectionhandlePopoperClose() {
      this.detectionpopoverStatus = false;
      this.$refs.userPopovers.doClose();
    },
    othertestAdd() {
      this.addProject = this.addProject.concat(this.MatchingInfo);
      /* this.MatchingInfo.forEach((valQusOne) => {
        this.addProject.push(valQusOne);
        let same = false;
        this.addProject.forEach((valAnswer) => {
          if (valQusOne.itemName === valAnswer.itemName) { // 如果有一样 就回答过了
            same = true;
          }
        });
        if (same === false) { // 如果没有相同的则push
          this.addProject.push(valQusOne);
        }
      });*/
      // for (let i = 0; i < vm.MatchingInfo.length; i++) {
      //   vm.addProject.push(vm.MatchingInfo[i]);
      // }
      console.log(this.MatchingInfo);
      this.MatchingInfo = [];
      this.detectioninfoSource.name = '';
      console.log(this.addProject);
    },
    remove(index) {
      this.addProject.splice(index, 1);
    },
    submit() {
      this.$refs.staffForm.validate((valid) => {
        if (valid) {
          if (this.addProject.length === 0) {
            return this.$message.warning('请添加模板条件');
          }
          const sendData = Object.assign({}, this.staffForm);
          sendData.warnTemplateItemSaveRequests = [...this.addProject];
          const list = [];
          this.addProject.forEach((val) => {
            list.push({
              sectionName: val.sectionName,
              itemName: val.itemName,
              itemCondition: val.itemCondition,
              itemValue: val.itemValue,
              minItemValue: val.minItemValue,
              maxItemValue: val.maxItemValue,
              state: 1,
            });
          });
          sendData.warnTemplateItemSaveRequests = list;
          console.log(sendData);
          this.$api.sunFollow.saveWarnTemplate(sendData).then(() => {
            this.$message.success('操作成功');
            this.$emit('afterSubmit');
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.staff-form {
  .othertest{
    width: 80px;
    height: 40px;
    background: #36BF2F;
    border-radius: 5px;
    text-align: center;
    line-height: 40px;
    color: #ffffff;
    margin-left: 20px;
    margin-top: 2px;
    cursor: pointer;
  }
  .icon-delete{
    width:30px;
  }
  /deep/ .select-user-trigger {
    line-height: 37px;
    input{
      border: 1px solid #DDE0E6!important;
      background-color: white!important;
    }
    input, i {
      cursor: pointer;
    }
    &.disabled {
      input, i {
        background-color: white!important;
        cursor: not-allowed;
      }
    }
    .el-input__suffix{
      width: 25px;
      right: 5px;
    }
  }
  .form-buttons {
    text-align: center;
    margin-top: 30px;
    button + button {
      margin-left: 20px;
    }
  }
  /deep/ .el-select {
    width: 100%;
    .is-disabled .el-input__suffix {
      display: none;
    }
  }
}
</style>
