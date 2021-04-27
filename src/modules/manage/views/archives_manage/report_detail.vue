<template>
  <div class="detail-content">
    <div class="title">查看体检报告-基本信息</div>
    <el-form ref="form" :model="formData" label-width="90px" label-suffix="：" disabled>
      <el-row>
        <el-col :span="6">
          <el-form-item label="姓名" prop="clientId">
            <el-input v-model="formData.clientName"></el-input>
            <!-- <div class="form-item-value">{{formData.clientName}}</div> -->
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="体检编号" prop="reportNo">
            <el-input v-model="formData.reportNo"></el-input>
            <!-- <div class="form-item-value">{{formData.reportNo}}</div> -->
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="体检日期" prop="reportDate">
            <el-input v-model="formData.reportDate"></el-input>
            <!-- <div class="form-item-value">{{formData.reportDate}}</div> -->
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="体检机构" prop="examinationOrgan">
            <el-input v-model="formData.examinationOrgan"></el-input>
            <!-- <div class="form-item-value">{{formData.examinationOrgan}}</div> -->
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="录入模板" prop="reportTemplateId">
            <el-input v-model="templateName"></el-input>
            <!-- <div class="form-item-value">{{templateName}}</div> -->
          </el-form-item>
        </el-col>
        <!-- <el-col :span="6">
          <el-form-item label="体检库" prop="libraryId">
            <div class="form-item-value">{{libraryName}}</div>
          </el-form-item>
        </el-col> -->
      </el-row>
    </el-form>
    <template v-if="formData.sectionConclusionList.length > 0">
      <div class="title physical-examination-info">体检信息</div>
      <div
        v-for="(item, index) in formData.sectionConclusionList"
        :key="index"
        class="section-conclusion-item">
        <div class="top">
          <span class="section-name">{{item.sectionName}}</span>
        </div>
        <div class="center">
          <el-table :data="item.itemList">
            <el-table-column prop="itemName" label="名称"></el-table-column>
            <el-table-column prop="itemValue" label="结果">
              <template slot-scope="scope">
                <span>
                  <span>{{scope.row.itemValue}}</span>
                  <img class="qushi" style="width:24px;height:24px;vertical-align: bottom;"
                  v-if="scope.row.judageValue === 1" src="@/assets/images/wrise.png" alt="">
                  <img class="qushi" style="width:24px;height:24px;vertical-align: bottom;"
                  v-if="scope.row.judageValue === -1" src="@/assets/images/wrise.png" alt="">
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="refRange" label="正常参考"></el-table-column>
            <el-table-column prop="itemUnit" label="单位"></el-table-column>
            <el-table-column prop="attention" label="是否关注指标">
              <template slot-scope="scope">
                <span>
                  {{scope.row.attention === '2' ? '是' : (scope.row.attention === '0' ? '否' : '')}}
                </span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="bottom" v-if="item.conclusion">
          <div>科室小结</div>
          <div class="bottom-conclusion">{{item.conclusion}}</div>
        </div>
      </div>
    </template>
    <template v-if="formData.abnormalList.length > 0 || formData.notMatchAbnormalList.length > 0">
      <div class="sub-title">
        <span>异常信息</span>
      </div>
      <div class="abnormal-level">
        <span class="level1">一般</span>
        <span class="level2">轻度</span>
        <span class="level3">中度</span>
        <span class="level4">中重度</span>
        <span class="level5">重度</span>
        <span class="level0">未曾匹配</span>
      </div>
      <div class="abnormal-list">
        <div
          v-for="item in formData.abnormalList"
          :key="item.abnormalCode"
          :class="`abnormal-item level${item.dangerLevel}`"
        >
          <span class="abnormal-number">{{abnormalLevelMap[item.dangerLevel]}}</span>
          <span class="abnormal-name">{{item.abnormalName}}</span>
        </div>
        <div
          v-for="(item, index) in formData.notMatchAbnormalList"
          :key="index"
          class="abnormal-item level0"
        >
          <span class="abnormal-name">{{item}}</span>
        </div>
      </div>
    </template>
    <template v-if="!!formData.summarize || !!formData.advice">
      <div class="sub-title">
        <span>总检建议</span>
      </div>
      <div class="suggest-item" v-if="!!formData.summarize">
        <div class="label">综述</div>
        <div>{{formData.summarize}}</div>
      </div>
      <div class="suggest-item" v-if="!!formData.advice">
        <div class="label">建议</div>
        <div>{{formData.advice}}</div>
      </div>
    </template>
    <div class="buttons">
      <el-button @click="$emit('close')">返回</el-button>
    </div>
  </div>
</template>

<script>
import { MAX_PAGESIZE } from '~/src/libs/util/index';
export default {
  name: 'report_detail',
  props: ['id'],
  data() {
    return {
      formData: {
        sectionConclusionList: [],
        abnormalList: [],
        notMatchAbnormalList: [],
      },
      templateName: '',
      libraryName: '',
      abnormalLevelMap: {
        1: 'I',
        2: 'II',
        3: 'III',
        4: 'IV',
        5: 'V',
      },
    };
  },
  mounted() {
    this.fetch(this.id);
  },
  methods: {
    fetch(id) {
      this.$api.reportInterface.getReportDetail(id).then(({ data }) => {
        if (data.success) {
          this.formData = data.data;
          if (!this.formData.sectionConclusionList) {
            this.$set(this.formData, 'sectionConclusionList', []);
          }
          if (!this.formData.abnormalList) {
            this.$set(this.formData, 'abnormalList', []);
          }
          if (!this.formData.notMatchAbnormalList) {
            this.$set(this.formData, 'notMatchAbnormalList', []);
          }
          this.queryTemplate();
          this.queryLibrary();
        }
      });
    },
    queryTemplate() {
      this.$api.reportInterface.getTemplate({
        pageNo: 1,
        pageSize: MAX_PAGESIZE,
      }).then(({ data }) => {
        data.data.list.forEach((item) => {
          if (item.id === this.formData.reportTemplateId) {
            this.templateName = item.name;
          }
        });
      });
    },
    queryLibrary() {
      this.$api.reportInterface.getOrganType().then(({ data }) => {
        data.data.forEach((item) => {
          if (item.id === this.formData.libraryId) {
            this.libraryName = item.name;
          }
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.detail-content{
  .title {
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
    &.physical-examination-info {
      margin: 10px 0 20px;
    }
  }
  /deep/ .form-item-value {
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    background: #F4F4F6;
    border-radius: 5px;
  }
  .section-conclusion-item {
    margin-bottom: 30px;
    .top {
      height: 60px;
      padding-left: 20px;
      background: #4991FD;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .section-name {
        color: #fff;
      }
    }
    .center {
      padding: 20px;
      border-left: 1px solid #F4F4F6;
      border-right: 1px solid #F4F4F6;
      /deep/ .el-table {
        &::before {
          display: none;
        }
        .el-table__header-wrapper th {
          background: rgba(73, 145, 253, 0.1);
        }
        &.el-table--enable-row-hover .el-table__body tr:hover > td {
          background: #fff;
        }
      }

    }
    .bottom {
      background: #F4F4F6;
      border-radius: 5px;
      padding: 10px 20px;
      >div:first-child {
        font-size: 14px;
        font-weight: 400;
        color: #4991FD;
        line-height: 20px;
        margin-bottom: 8px;
      }
    }
  }
  .sub-title {
    height: 60px;
    background: #4991FD;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    color: #fff;
    padding: 0 10px 0 20px;
    align-items: center;
  }
  .abnormal-level {
    display: flex;
    justify-content: flex-end;
    margin: 20px 0;
    span {
      font-size: 12px;
      font-weight: 400;
      color: #333333;
      line-height: 17px;
      padding-left: 14px;
      position: relative;
      margin-left: 40px;
      &:after {
        content: '';
        width: 8px;
        height: 8px;
        border-radius: 4px;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
      &.level1:after {
        background: #31C529;
      }
      &.level2:after {
        background: #4991FD;
      }
      &.level3:after {
        background: #6C6CE5;
      }
      &.level4.abnormal-level {
        background: #E6B058;
      }
      &.level5:after {
        background: #FE2B2A;
      }
      &.level0:after {
        background: #97A6BD;
      }
    }
  }
  .abnormal-list {
    padding: 20px 20px 0 20px;
    margin-bottom: 20px;
    border-radius: 5px;
    border: 1px solid #F4F4F6;
    display: flex;
    flex-wrap: wrap;
    .abnormal-item {
      border-radius: 8px;
      display: flex;
      align-items: center;
      padding: 14px 28px;
      margin-right: 20px;
      margin-bottom: 20px;
      .abnormal-number {
        width: 22px;
        margin-right: 2px;
      }
      .abnormal-name {
        font-size: 14px;
        font-weight: 400;
        color: #333333;
        line-height: 20px;
        text-shadow: 0px 0px 15px rgba(73, 145, 253, 0.2);
      }
      &.level1 {
        box-shadow: 0px 0px 15px 0px rgba(49, 197, 41, 0.2);
        border: 2px solid #31C529;
        .abnormal-number {
          color: #31C529;
        }
      }
      &.level2 {
        box-shadow: 0px 0px 15px 0px rgba(73, 145, 253, 0.2);
        border: 2px solid #4991FD;
        .abnormal-number {
          color: #4991FD;
        }
      }
      &.level3 {
        box-shadow: 0px 0px 15px 0px rgba(108, 108, 229, 0.2);
        border: 2px solid #6C6CE5;
        .abnormal-number {
          color: #6C6CE5;
        }
      }
      &.level4 {
        box-shadow: 0px 0px 15px 0px rgba(230, 176, 88, 0.2);
        border: 2px solid #E6B058;
        .abnormal-number {
          color: #E6B058;
        }
      }
      &.level5 {
        box-shadow: 0px 0px 15px 0px rgba(254, 43, 42, 0.2);
        border: 2px solid #FE2B2A;
        .abnormal-number {
          color: #FE2B2A;
        }
      }
      &.level0 {
        box-shadow: 0px 0px 15px 0px rgba(254, 43, 42, 0.2);
        border: 2px solid #97A6BD;
      }
    }
  }
  .suggest-item {
    margin-top: 27px;
    .label {
      margin-bottom: 17px;
      font-size: 16px;
      font-weight: 600;
      color: #333333;
      line-height: 22px;
    }
  }
  .buttons {
    text-align: center;
    margin-top: 30px;
    .el-button {
      width: 90px;
      height: 40px;
      border-radius: 20px;
      &:not(.el-button--primary) {
        background: rgba(49, 84, 172, 0.1);
          border-radius: 20px;
          border: 1px solid #3154AC;
          &:hover {
            color: #3154AC;
            border-color: #3154AC;
            background: rgba(49, 84, 172, 0.3);
          }
      }
    }
  }
}
</style>
