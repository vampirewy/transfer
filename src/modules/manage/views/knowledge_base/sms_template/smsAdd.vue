<template>
  <div class="medical-history-form">
    <el-form
      class="medical-history-form"
      :model="form"
      ref="form"
      :rules="rules"
      label-width="90px"
      label-suffix="："
    >
      <!-- <div class="basic-info-title">{{id ? '' : '新增'}}短信模版</div> -->
      <!-- <el-row>
        <el-col :span="6">
          <el-form-item label="姓名" prop="clientInfoId">
            <el-popover
              ref="userPopover"
              placement="bottom-start"
              width="650"
              trigger="click"
              @show="popoverStatus = true"
              @hide="popoverStatus = false">
              <select-user v-if="popoverStatus"  @change="handleSelectUser"></select-user>
              <el-input
                class="select-user-trigger"
                slot="reference"
                disabled
                v-model="currentUser.name"
                placeholder="请选择客户">
                <i :class="`el-icon-caret-${popoverStatus ? 'top' : 'bottom'}`" slot="suffix"></i>
              </el-input>
            </el-popover>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="性别" prop="gender">
            <el-radio v-model="currentUser.gender" :label="2" disabled>女</el-radio>
            <el-radio v-model="currentUser.gender" :label="1" disabled>男</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="年龄" prop="age">
            <el-input v-model="currentUser.age" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="客户编号" prop="customerType">
            <el-input v-model="currentUser.gridName" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row> -->
      <!-- <div class="main-info-title">新增短信</div> -->
      <div class="form-title">
        <div class="line"></div>
        <h3 class="name">{{ids ? '编辑' : '新增'}}计划</h3>
      </div>
      <el-row>
        <!-- <el-col :span="6">
          <el-form-item label="就医编号" prop="hospital">
            <el-input v-model="form.hospital" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="就医类型" prop="medicalType">
            <el-select v-model="form.medicalType" placeholder="请选择就医类型">
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="医保卡号" prop="department">
            <el-input v-model="form.department" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="就医机构" prop="patientNo">
            <el-input v-model="form.patientNo" placeholder="请输入" @input="replace"></el-input>
          </el-form-item>
        </el-col> -->
        <!-- <el-col :span="6">
          <el-form-item label="就医科室" prop="doctorName">
            <el-input v-model="form.doctorName" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="主管医生" prop="hpi">
            <el-input v-model="form.hpi" placeholder="请输入" :maxlength="300"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="就医时间" prop="inDate">
            <el-date-picker
              v-model="form.inDate"
              type="date"
              placeholder="请选择就医时间"
              value-format="yyyy-MM-dd"
              :picker-options="options.inDate"
              @change="handleStartDateChange"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="出院时间" prop="outDate">
            <el-date-picker
              v-model="form.outDate"
              type="date"
              placeholder="请选择出院时间"
              value-format="yyyy-MM-dd"
              :picker-options="options.outDate"
            ></el-date-picker>
          </el-form-item>
        </el-col> -->
        <el-col :span="6">
          <el-form-item label="短信类别" prop="result" >
            <el-select v-model="form.smsTypeName" placeholder="请选择当前状态" width="150">
              <el-option
                v-for="item in smsTypes"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="短信主题" prop="result">
            <el-select v-model="form.ThemeListName" placeholder="请选择当前状态">
              <el-option
                v-for="item in ThemeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="适宜性别" prop="result">
            <el-select v-model="form.gender" placeholder="请选择当前状态">
              <el-option label="男" value="1" key="1"></el-option>
              <el-option label="女" value="2" key="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="适宜人群" prop="result">
            <el-select v-model="form.Crowd" placeholder="请选择当前状态">
              <el-option label="不限" value="0" key="0"></el-option>
              <el-option label="成人" value="1" key="1"></el-option>
              <el-option label="老人" value="2" key="2"></el-option>
              <el-option label="少儿" value="3" key="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="适宜季节" prop="result">
            <el-select v-model="form.Season" placeholder="请选择当前状态">
              <el-option label="不限" value="0">不限</el-option>
              <el-option label="春" value="1">春</el-option>
              <el-option label="夏" value="2">夏</el-option>
              <el-option label="秋" value="3">秋</el-option>
              <el-option label="冬" value="4">冬</el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="6">
          <el-form-item label="检查" prop="examination">
            <el-input v-model="form.examination" placeholder="请输入" :maxlength="300"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="诊断" prop="diagnosis">
            <el-input v-model="form.diagnosis" placeholder="请输入" :maxlength="300"></el-input>
          </el-form-item>
        </el-col> -->
        <el-col :span="24">
          <el-form-item label="短信内容" prop="result">
            <el-input
              type="textarea"
              v-model="form.result"
              :rows="5"
              placeholder="请输入"
              :maxlength="4000"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <div class="form-buttons">
        <el-button plain @click="$emit('cancel')" size="small">取消</el-button>
        <el-button type="primary" @click="submit" size="small">保存</el-button>
      </div> -->
       <div class="handle-btn mt30 mb30">
        <el-button class="reset-btn" size="small" @click="goBack"
          >返回</el-button>
        <el-button class="add-btn" type="primary" size="small" @click="submit"
          >保存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
// import SelectUser from '../medical_history_select_user.vue';
import * as dayjs from 'dayjs';
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');
dayjs.extend(isSameOrAfter);

export default {
  name: 'MedicalHistoryForm',
  components: {
    // SelectUser,
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
  },
  data() {
    return {
      popoverStatus: false,
      ThemeList: [],
      smsTypes: [],
      form: {
        smsTypeName: '', // 短信类别
        ThemeListName: '', // 主题类别
        gender: '', // 性别
        Season: '', // 季节
        Crowd: '', // 人群
        result: '', // 短信内容
      },
      options: {
        inDate: {
          disabledDate: (cur) => {
            // eslint-disable-next-line no-underscore-dangle
            const _now = dayjs(new Date()).format('YYYY-MM-DD');
            // eslint-disable-next-line no-underscore-dangle
            const _cur = dayjs(cur);
            if (_cur.isAfter(_now, 'day')) {
              return true;
            }
            return false;
          },
        },
        outDate: {
          disabledDate: (cur) => {
            // eslint-disable-next-line no-underscore-dangle
            const _now = this.form.inDate
              ? dayjs(this.form.inDate).format('YYYY-MM-DD')
              : dayjs(new Date()).format('YYYY-MM-DD');
            // eslint-disable-next-line no-underscore-dangle
            const _cur = dayjs(cur);
            if (_cur.isSameOrAfter(_now)) {
              return false;
            }
            return true;
          },
        },
      },
      rules: {
        clientInfoId: [{ required: true, message: '客户不能为空' }],
        medicalType: [{ required: true, message: '就医类型不能为空' }],
        hospital: [{ required: true, message: '医疗机构不能为空' }],
        inDate: [{ required: true, message: '就医时间不能为空' }],
        result: [{ required: true, message: '当前状态不能为空' }],
        hpi: [{ required: true, message: '现病史不能为空' }],
        diagnosis: [{ required: true, message: '诊断不能为空' }],
      },
      resultOptions: [
        { value: 1, label: '未指定' },
        { value: 2, label: '治疗中' },
        { value: 3, label: '转诊' },
        { value: 4, label: '转为慢病' },
        { value: 5, label: '痊愈' },
        { value: 6, label: '其他' },
      ],
      typeOptions: [
        { value: 1, label: '门诊' },
        { value: 2, label: '住院' },
      ],
      currentUser: {},
      ids: this.$route.params.id,
    };
  },
  mounted() {
    if (this.ids) {
      this.$api.projectList.smsListInfo(this.ids).then((res) => {
        const { data } = res;
        this.form = {
          result: data.data.content,
          gender: data.data.suitGender,
          smsTypeName: data.data.categoryName,
          ThemeListName: data.data.themName,
          Crowd: data.data.suitCrowd,
          Season: data.data.suitSeason,
        };
      });
    }
    this.getGridList();
    this.getGridType();
  },
  methods: {
    async getGridList() {
      const res = await this.$api.projectList.getSortlist({ lv: 2, parentId: 1 });
      const { data } = res.data;
      this.ThemeList = data;
      console.log(this.ThemeList);
    },
    async getGridType() {
      const res = await this.$api.projectList.getSortlist({ lv: 1, parentId: 0 });
      const { data } = res.data;
      this.smsTypes = data;
      // console.log(this.smsTypes);
    },
    handleStartDateChange() {
      if (this.form.medicalType === 1 && this.form.inDate) {
        this.form.outDate = this.form.inDate;
      }
    },
    handleSelectUser(data) {
      this.$refs.userPopover.doClose();
      this.popoverStatus = false;
      this.currentUser = data;
      this.form.clientInfoId = data.id;
      this.$refs.form.validateField('clientInfoId');
    },
    replace(value) {
      const REG = /[\u4e00-\u9fa5]/gi;
      const str = value.replace(REG, '');
      this.form.patientNo = str;
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const params = {
            content: this.form.result,
            suitGender: this.form.gender,
            categoryName: this.form.smsTypeName,
            themName: this.form.ThemeListName,
            suitCrowd: this.form.Crowd,
            suitSeason: this.form.Season,
          };
          if (this.ids) {
            params.id = this.ids;
          }
          this.$api.projectList.saveMessageTemplate(params).then((res) => {
            const { data } = res;
            if (data.success) {
              this.$message.success('操作成功');
              this.$router.go(-1);
              // this.$emit('afterSubmit');
            }
          });
        }
      });
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.medical-history-form {
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
  .basic-info-title, .main-info-title {
    font-size: 18px;
    font-weight: 600;
    color: #333333;
    line-height: 25px;
    padding-left: 10px;
    position: relative;
    margin-bottom: 20px;
    &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 2px;
      height: 18px;
      background: #4991FD;
      border-radius: 1px;
    }
    &.main-info-title {
      margin-top: 10px;
    }
  }
  /deep/ .select-user-trigger {
    input, i {
      cursor: pointer;
      &.el-icon-caret-bottom, &.el-icon-caret-top {
        &::before{
          // content: url('../../../../assets/images/common/arrow.png');
        }
        &.el-icon-caret-bottom {
          transform: rotate(180deg);
        }
      }
    }
    .el-input__suffix {
      right: 15px;
    }
    input::placeholder {
      color: #666;
    }
    .el-input__inner {
      /* color: #333 !important;
      background: #F4F4F6 !important;*/
    }
  }
  /deep/ input, /deep/ textarea {
    // border: none;
    // background: #F4F4F6;
    border-radius: 5px;
  }
  /deep/ .el-radio.is-disabled {
    .el-radio__label {
      color: #999;
    }
  }
  /deep/ .el-radio__input.is-disabled.is-checked .el-radio__inner {
    background-color: #4991fd;
    border-color: #4991fd;
  }
  .el-select,
  .el-date-editor {
    width: 100%;
  }
  .form-buttons {
    text-align: center;
    margin-top: 10px;
    button {
      width: 80px;
      border-radius: 8px;
      border: none;
    }
    button + button {
      margin-left: 20px;
    }
    /deep/ .is-plain {
      background: #97A6BD;
      color: #fff;
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
</style>
