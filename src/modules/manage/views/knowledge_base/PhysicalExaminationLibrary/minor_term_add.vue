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
      <div class="form-title">
        <div class="line"></div>
        <h3 class="name">{{id ? '编辑' : '新增'}}小项</h3>
      </div>
      <el-row>
        <el-col :span="6">
          <el-form-item label="项目库" prop="gridListId" >
            <el-select v-model="form.gridListId" placeholder="请选择" width="150">
              <el-option
                v-for="item in gridList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="项目科室" prop="SectionListId">
            <el-input v-model="form.SectionListId" placeholder="请输入"></el-input>
            <!-- <el-select v-model="SectionListId" placeholder="请选择">
              <el-option
                v-for="item in SectionList"
                :key="item.id"
                :label="item.sectionName"
                :value="item.id"
              ></el-option>
            </el-select> -->
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <!-- <el-form-item label="标题" prop="result"> -->
            <el-form-item label="小项名称" prop="MinorItemsName">
              <el-input v-model="form.MinorItemsName" placeholder="请输入"></el-input>
            </el-form-item>
          <!-- </el-form-item> -->
        </el-col>
        <el-col :span="6">
          <el-form-item label="适宜性别" >
            <el-select v-model="form.Gender" placeholder="请选择">
              <el-option label="不限" :value="0" key="0"></el-option>
              <el-option label="男" :value="1" key="1"></el-option>
              <el-option label="女" :value="2" key="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="年龄范围">
            <div style="display: flex;">
            <el-input v-model="form.minAge" placeholder="请输入"></el-input>
            <span style="margin:0 10px 0 10px;color:#333333">—</span>
            <el-input v-model="form.maxAge" placeholder="请输入"></el-input>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="正常范围" >
            <div style="display: flex;">
            <el-input v-model="form.minnormal" placeholder="请输入"></el-input>
            <span style="margin:0 10px 0 10px;color:#333333">—</span>
            <el-input v-model="form.maxnormal" placeholder="请输入"></el-input>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="小项单位">
            <el-input v-model="form.Units" placeholder="请输入" :maxlength="300"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="正常参考" >
            <el-input v-model="form.Reference" placeholder="请输入" :maxlength="300"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <div style="margin:0 0 40px 80px">
            <el-checkbox
            v-model="form.checked1"
            :checked="form.checked1==1? true:false" true-label="1" false-label="0"
            >默认重要指标</el-checkbox>
            <el-checkbox
            v-model="form.checked2"
            :checked="form.checked2==1? true:false" true-label="1" false-label="0"
            >参与报告对比</el-checkbox>
          </div>
        </el-col>
        <!-- <el-col :span="6">
          <el-form-item label="诊断" prop="diagnosis">
            <el-input v-model="form.diagnosis" placeholder="请输入" :maxlength="300"></el-input>
          </el-form-item>
        </el-col> -->
        <el-col :span="24">
          <el-form-item label="小项介绍" >
            <el-input
              type="textarea"
              v-model="form.Introduction"
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
    // detail: {
    //   type: Boolean,
    //   default: false,
    // },
    // id: {
    //   type: [String, Number],
    //   required: false,
    //   default: '',
    // },
    id: '',
  },
  data() {
    return {
      popoverStatus: false,
      gridList: [],
      SectionList: [],
      form: {
        gridListId: '', // 项目库
        checked1: 1, // 默认重要指标
        checked2: 0, // 参与报告对比
        riskFactor: '', // 危险因素
        isSystem: '', // 排序编号
        advice: '', // 建议
        riskType: '',
        orgCode: '',
        MinorItemsName: '', // 小项名称
        SectionListId: '', // 项目科室
        Gender: '', // 性别
        minAge: '', // 年龄范围
        maxAge: '', // 年龄范围
        minnormal: '', // 正常范围
        maxnormal: '', // 正常范围
        Reference: '', // 正常参考
        Introduction: '', // 小项介绍
        Units: '', // 单位
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
        gridListId: [{ required: true, message: '项目库不能为空' }],
        SectionListId: [{ required: true, message: '项目科室不能为空' }],
        MinorItemsName: [{ required: true, message: '小项名称不能为空' }],
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
      // ids: this.$route.params.id,
    };
  },
  mounted() {
    if (this.id) {
      this.$api.physicalProjectListInterface.getOrganItem(this.id).then((res) => {
        const { data } = res;
        this.form = {
          gridListId: data.data.organItemLibraryId,
          checked1: data.data.isMain, // 默认重要指标
          checked2: data.data.displayPosition, // 参与报告对比
          MinorItemsName: data.data.itemName, // 小项名称
          Gender: data.data.gender, // 性别
          minAge: data.data.minAge, // 年龄范围
          maxAge: data.data.maxAge, // 年龄范围
          minnormal: data.data.minValue, // 正常范围
          maxnormal: data.data.maxValue, // 正常范围
          Reference: data.data.refRange, // 正常参考
          Introduction: data.data.intro, // 小项介绍
          Units: data.data.unit, // 单位
          SectionListId: data.data.sectionName,
        };
      });
    }
    this.queryList();
  },
  methods: {
    async queryList() {
      const res = await this.$api.physicalProjectListInterface.listOrganItemLibrary();
      console.log(res.data);
      const { data } = res.data;
      if (data) {
        this.gridList = data || [];
        this.form.gridListId = data[0].id;
        this.getSectionList();
      }
    },
    async getSectionList() {
      const res = await this.$api.physicalProjectListInterface.getSectionList({
        pageNo: 1,
        pageSize: 100,
        organItemLibraryId: this.form.gridListId,
      });
      const { data } = res.data;
      if (data) {
        this.SectionList = data.data || [];
      }
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
      const params = {
        organItemLibraryId: this.form.gridListId,
        sectionName: this.form.SectionListId,
        itemName: this.form.MinorItemsName,
        gender: this.form.Gender,
        isCompare: this.form.checked2, // 是否对比
        isMain: this.form.checked1, // 重要指标 0否 1是
        state: 1, // 状态0不启用 1启用
        minAge: this.form.minAge,
        maxAge: this.form.maxAge,
        refRange: this.form.Reference, // 正常范围
        intro: this.form.Introduction,
        unit: this.form.Units,
      };
      if (this.id) {
        params.id = this.id;
      }
      this.$api.physicalProjectListInterface.saveOrganItem(params).then((res) => {
        const { data } = res;
        if (data.success) {
          this.$message.success('操作成功');
          this.$emit('cancels');
        }
      });
    },
    goBack() {
      // this.$router.go(-1);
      this.$emit('cancels');
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
      color: #333 !important;
      background: #F4F4F6 !important;
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
