<template>
  <div class="physical">
    <el-form :model="formData" label-width="90px" label-suffix="：" ref="form" :rules="rules">
      <el-row>
        <el-col :span="6">
           <el-form-item label="检查编号" prop="reportNo">
              <el-input
                v-model="formData.reportNo"
                placeholder="请输入"
                :maxlength="100"
              ></el-input>
            </el-form-item>
          <!-- <el-form-item label="录入模板">
            <el-select
              v-model="formData.reportTemplateId"
              @change="templateDetail"
              placeholder="请选择">
              <el-option
                v-for="template in templateList"
                :key="template.id"
                :label="template.name"
                :value="template.id">
              </el-option>
            </el-select>
          </el-form-item> -->
        </el-col>
           <el-col :span="6">
            <el-form-item label="体检机构" >
              <el-input
                v-model="formData.examinationOrgan"
                placeholder="请输入"
                :maxlength="30"
              ></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="6">
           <el-form-item label="体检日期" prop="reportDate">
              <el-date-picker
                class="end-date"
                v-model="formData.reportDate"
                type="date"
                :max-date="formData.startDate || new Date()"
                value-format="yyyy-MM-dd"
                placeholder="请选择"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="是否总检" prop="reportState">
            <el-select
                    v-model="formData.reportState"
                    placeholder="请选择"
                    style="width: 100%"
                    @change="isreportState"
            >
            <!-- <el-option label="未知" :value="0" key="0"></el-option> -->
            <el-option label="已总检" :value="1" key="1"></el-option>
            <el-option label="未总检" :value="2" key="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="参检团队" prop="workUnitName">
              <el-input
                v-model="formData.workUnitName"
                placeholder="请输入"
                :maxlength="30"
              ></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="6">
           <el-form-item label="总检日期" prop="zjDate">
              <el-date-picker
                class="end-date"
                v-model="formData.zjDate"
                :max-date="new Date()"
                type="date"
                :disabled="formData.reportState === 2"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="请选择"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
        </el-col>
      </el-row>
      <div class="divRightTitleDiv">
        <div class="divRightTitle" style="margin-top: 0">体检信息<div class="titleBiao"></div></div>
      </div>
      <div class="wltitle">
        <div class="quan"></div>
        <span>体检项目</span>
      </div>
      <!-- <el-col :span="6"> -->
        <!-- <el-form-item label="新增体检项目："
        prop="reportState"
        style="width:120px"> -->
        <!-- <div style="margin-left:14px">
        <span style="font-size:14px;color:#666">新增体检项目：</span>
          <el-select
            v-model="formData.reportState"
            placeholder="请选择"
            style="width: 200px"
          >
          <el-option label="未知" :value="0" key="0"></el-option>
          <el-option label="已总检" :value="1" key="1"></el-option>
          <el-option label="未总检" :value="2" key="2"></el-option>
          </el-select>
        </div> -->
        <div style="display:flex">
        <el-form-item label="体检项目" style="width: 100px;">
          <!-- <span style="font-size:14px;color:#666;margin:10px">新增体检项目：</span> -->
            <el-popover
              ref="userPopoverCheck"
              placement="bottom-start"
              trigger="click"
              @show="popoverStatusCheck = true"
              @hide="handlePopoperCloseCheck"
            >
              <physical-examination
                v-if="popoverStatusCheck"
                @change="onSelectUserCheck"
                :examination="infoSource.gridId"
              ></physical-examination>
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
        <!-- </el-form-item> -->
      <!-- </el-col> -->
      <!-- <div class="wltitle">
        <div class="quan"></div>
        <span>体检科室</span>
      </div> -->
      <!-- <div class="add-department" @click="addDepartment">
        <i class="el-icon-circle-plus"></i>
        <span>点击新增体检科室</span>
      </div> -->
      <div
        v-for="(item, index) in formData.sectionConclusionList"
        :key="index"
        class="section-conclusion-item">
        <div class="top">
          <div>
            <template v-if="item.sectionNameEdit">
              <el-input v-model="item.sectionName" :maxlength="15" placeholder="请输入科室名称"></el-input>
              <el-button @click="saveSectionName(item)">确定</el-button>
            </template>
            <span class="section-name" v-else>{{item.sectionName}}</span>
          </div>
          <div>
            <!-- <el-button
              v-if="!item.sectionNameEdit"
              @click="$set(item, 'sectionNameEdit', true)"
            >修改</el-button> -->
            <el-button @click="formData.sectionConclusionList.splice(index, 1)">删除</el-button>
          </div>
        </div>
        <div class="center">
          <el-table :data="item.itemList">
            <el-table-column prop="itemName" label="名称" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input
                  v-if="scope.row.editStatus"
                  v-model="scope.row.itemName1"
                  maxlength="200"></el-input>
                <span v-else>{{scope.row.itemName}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="itemValue" label="结果" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input
                  v-if="scope.row.editStatus"
                  v-model="scope.row.itemValue1"
                  maxlength="200"></el-input>
                <span v-else>{{scope.row.itemValue}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="refRange" label="正常参考" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input
                  v-if="scope.row.editStatus"
                  v-model="scope.row.refRange1"
                  maxlength="200"></el-input>
                <span v-else>{{scope.row.refRange}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="itemUnit" label="单位" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input
                  v-if="scope.row.editStatus"
                  v-model="scope.row.itemUnit1"
                  maxlength="200"></el-input>
                <span v-else>{{scope.row.itemUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="attention" label="重要指标">
              <template slot-scope="scope">
                <el-select
                        v-if="scope.row.editStatus"
                        v-model="scope.row.attention1"
                        placeholder="请选择">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="0"></el-option>
                </el-select>
                <span v-else>
                  {{scope.row.attention === '1' ? '是' : (scope.row.attention === '0' ? '否' : '')}}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="90">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  v-if="scope.row.editStatus"
                  @click="saveProject(scope.row)"
                >保存</el-button>
                <el-button type="text" v-else @click="editProject(scope.row)">编辑</el-button>
                <el-button
                  type="text"
                  @click="item.itemList.splice(item.itemList.indexOf(scope.row), 1)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="add-wrapper">
            <div>
              <span class="label">名称：</span>
              <el-input v-model="item.addData.itemName" maxlength="200"></el-input>
            </div>
            <div>
              <span class="label">结果：</span>
              <el-input v-model="item.addData.itemValue" maxlength="200"></el-input>
            </div>
            <div>
              <span class="label">正常参考：</span>
              <el-input v-model="item.addData.refRange" maxlength="200"></el-input>
            </div>
            <div>
              <span class="label">单位：</span>
              <el-input v-model="item.addData.itemUnit" maxlength="200"></el-input>
            </div>
            <div>
              <span class="label">重要指标：</span>
              <el-select v-model="item.addData.attention" placeholder="请选择">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </div>
            <el-button class="button-add-project" @click="addProject(item)">添加</el-button>
          </div>
        </div>
        <div class="bottom">
          <div>科室小结</div>
          <el-input
            type="textarea"
            rows="4"
            maxlength="2000"
            v-model="item.conclusion"
            placeholder="请输入科室小结"
          ></el-input>
        </div>
      </div>
      <div class="wltitle">
        <div class="quan"></div>
        <span>异常信息</span>
      </div>
      <div class="sub-title">
        <span>异常信息</span>
        <el-popover
          ref="abnormalPopover"
          placement="bottom-end"
          width="650"
          trigger="click"
          @show="abnormalModalVisible = true"
          @hide="handleAbnormalClose">
          <abnormal
            v-if="abnormalModalVisible"
            @change="handleAbnormalSelectChange"
            @cancel="handleAbnormalClose"
          ></abnormal>
          <span class="button-add-abnormal" slot="reference">添加异常</span>
        </el-popover>
      </div>
      <div class="abnormal-level">
        <span class="level1">一般</span>
        <span class="level2">轻度</span>
        <span class="level3">中度</span>
        <span class="level4">中重度</span>
        <span class="level5">重度</span>
        <span class="level0">未曾匹配</span>
      </div>
      <div
        class="abnormal-list"
        v-if="formData.abnormalList.length > 0 || formData.notMatchAbnormalList.length > 0">
        <div
          v-for="(item, index) in formData.abnormalList"
          :key="item.abnormalCode"
          :class="`abnormal-item level${item.dangerLevel}`"
        >
          <span
            class="abnormal-number"
            v-if="abnormalLevelMap[item.dangerLevel]">
            {{abnormalLevelMap[item.dangerLevel]}}
          </span>
          <span class="abnormal-name">{{item.abnormalName}}</span>
          <i class="el-icon-error" @click="removeAbnormal(index)"></i>
        </div>
        <div
          v-for="(item, index) in formData.notMatchAbnormalList"
          :key="index"
          class="abnormal-item level0"
        >
          <span class="abnormal-name">{{item}}</span>
          <i class="el-icon-error" @click="removeUnMatchAbnormal(index)"></i>
        </div>
      </div>
      <div class="text-add-abnormal" v-else>点击右上角添加体检异常信息</div>
      <div class="wltitle">
        <div class="quan"></div>
        <span>总检建议</span>
      </div>
      <div class="suggest-item" style="margin-top: 0">
        <div class="label">综述</div>
        <el-input
          type="textarea"
          v-model="formData.summarize"
          :maxlength="4000"
          placeholder="请输入综述"
          rows="4">
        </el-input>
      </div>
      <div class="suggest-item">
        <div class="label">建议</div>
        <el-input
          type="textarea"
          v-model="formData.advice"
          :maxlength="4000"
          placeholder="请输入建议"
          rows="4">
        </el-input>
      </div>
      <div class="buttons">
        <el-button class="cancelBtn" @click="black('close')">取消</el-button>
        <el-button type="primary" class="sureBtn" @click="submit">保存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import abnormal from './abnormal.vue';
import { MAX_PAGESIZE } from '~/src/libs/util/index';
import physicalExamination from './physicalExamination.vue';

export default {
  name: 'Physical',
  components: {
    abnormal,
    physicalExamination,
  },
  props: {
    value: Object,
  },
  data() {
    return {
      popoverStatusCheck: false,
      templateList: [],
      libraryList: [],
      formData: {
        // libraryId: '',
        reportTemplateId: '',
        abnormalList: [],
        notMatchAbnormalList: [],
        sectionConclusionList: [],
        summarize: '',
        advice: '',
        physicalExamination: '',
        gridId: '',
        examinationOrgan: '', // 检查机构
        reportNo: '', // 检查编号
        reportDate: '', // 体检时间
        reportState: 1, // 是否总检
        workUnitName: '', // 参检团队
        zjDate: '', // 总检日期
      },
      abnormalModalVisible: false,
      abnormalLevelMap: {
        1: 'I',
        2: 'II',
        3: 'III',
        4: 'IV',
        5: 'V',
      },
      rules: {
        reportNo: [
          { required: true, message: '请输入检查编号', trigger: 'blur' },
        ],
        physicalExamination: [
          { required: true, message: '请输入检查机构', trigger: 'blur' },
        ],
        reportDate: [
          { required: true, message: '请选择体检日期', trigger: 'blur' },
        ],
        reportState: [
          { required: true, message: '请选择是否总检', trigger: 'blur' },
        ],
        zjDate: [
          { required: true, message: '请选择总检日期', trigger: 'blur' },
        ],
        workUnitName: [
          { required: true, message: '请选择填写参检团队', trigger: 'blur' },
        ],
      },
      infoSource: {
        clientNameCheck: '',
      },
      StatusCheck: {},
      drugsList: [],
    };
  },
  watch: {
    value: {
      handler(cur) {
        this.formData = Object.assign(this.formData, JSON.parse(JSON.stringify(cur)));
        if (!this.formData.sectionConclusionList) {
          this.$set(this.formData, 'sectionConclusionList', []);
        }
        if (!this.formData.abnormalList) {
          this.$set(this.formData, 'abnormalList', []);
        }
        if (!this.formData.notMatchAbnormalList) {
          this.$set(this.formData, 'notMatchAbnormalList', []);
        }
        this.formData.sectionConclusionList.forEach((val) => {
          this.$set(val, 'addData', {});
          if (val.itemList && val.itemList.length > 0) {
            val.itemList.forEach((item) => {
              this.$set(item, 'editStatus', false);
            });
          }
        });
      },
      deep: true,
    },
  },
  mounted() {
    this.queryTemplate();
    this.queryLibrary();
  },
  methods: {
    isreportState() {
      if (this.formData.reportState === 2) {
        this.formData.zjDate = '';
      }
    },
    handlePopoperCloseCheck() {
      this.popoverStatusCheck = false;
    },
    onSelectUserCheck(data) {
      if (data) {
        // data.outcome = '';
        // data.reference = '';
        // data.Suggestion = '';
        // this.popoverStatusCheck = false;
        // data.forEach((val) => {
        this.infoSource.clientNameCheck += `${data.itemName}、`;
        this.StatusCheck = data;
        // });
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
    inspectionAdd() {
      if (this.StatusCheck.length !== 0) {
        let same = false;
        let minsame = false;
        this.formData.sectionConclusionList.forEach((valAnswer) => {
          if (this.StatusCheck.sectionName === valAnswer.sectionName) {
            same = true;
            valAnswer.itemList.forEach((list) => {
              if (this.StatusCheck.itemName === list.itemName) {
                this.$message.warning('该项目已存在');
                minsame = true;
                return false;
              }
            });
            if (minsame === false) {
              valAnswer.addData = {
                attention: String(this.StatusCheck.isMain),
                itemName: this.StatusCheck.itemName,
                itemValue: '',
                refRange: this.StatusCheck.refRange,
                itemUnit: this.StatusCheck.unit,
              };
            }
          }
        });
        if (same === false) {
          const json = {
            conclusion: '',
            sectionName: this.StatusCheck.sectionName,
            itemList: [],
          };
          json.addData = {
            attention: String(this.StatusCheck.isMain),
            itemName: this.StatusCheck.itemName,
            itemValue: '',
            refRange: this.StatusCheck.refRange,
            itemUnit: this.StatusCheck.unit,
          };
          this.formData.sectionConclusionList.push(json);
        }
        // }
        //   if (valQusOne.id === valAnswer.id) { // 如果有一样 就回答过了
        //     same = true;
        // if (same === false) { // 如果没有相同的则push
        //   this.drugsList.push(valQusOne);
        // }
        // this.drugsList.push(valQusOne);
        // });
        this.infoSource.clientNameCheck = '';
        this.StatusCheck = [];
        // this.$refs.modifyForm.resetFields();
      } else {
        this.$message.warning('请选择检查项目');
      }
    },
    handleAbnormalClose() {
      this.abnormalModalVisible = false;
      this.$refs.abnormalPopover.doClose();
    },
    handleAbnormalSelectChange(abnormalList, notMatchAbnormalList) {
      this.$refs.abnormalPopover.doClose();
      this.abnormalModalVisible = false;
      this.onAbnormalChange(abnormalList);
      this.onUnMatchAbnormalChange(notMatchAbnormalList);
    },
    saveProject(data) {
      if (this.checkProjectData(data, true)) {
        this.$set(data, 'editStatus', false);
        this.$set(data, 'itemName', data.itemName1);
        this.$set(data, 'itemValue', data.itemValue1);
        this.$set(data, 'refRange', data.refRange1);
        this.$set(data, 'itemUnit', data.itemUnit1);
        this.$set(data, 'attention', data.attention1);
      }
    },
    editProject(data) {
      this.$set(data, 'editStatus', true);
      this.$set(data, 'itemName1', data.itemName);
      this.$set(data, 'itemValue1', data.itemValue);
      this.$set(data, 'refRange1', data.refRange);
      this.$set(data, 'itemUnit1', data.itemUnit);
      this.$set(data, 'attention1', data.attention);
    },
    addProject(data) {
      const { itemName, itemValue, refRange, itemUnit, attention } = data.addData;
      if (itemName === '') {
        return this.$message.warning('名称不能为空');
      }
      if (itemValue === '') {
        return this.$message.warning('结果不能为空');
      }
      if (this.checkProjectData(data.addData)) {
        data.itemList.push({
          itemName,
          itemValue,
          refRange,
          itemUnit,
          attention,
          editStatus: false,
        });
        this.$set(data.addData, 'itemName', '');
        this.$set(data.addData, 'itemValue', '');
        this.$set(data.addData, 'refRange', '');
        this.$set(data.addData, 'itemUnit', '');
        this.$set(data.addData, 'attention', '0');
      }
    },
    checkProjectData(data, edit = false) {
      const itemName = edit ? data.itemName1 : data.itemName;
      const itemValue = edit ? data.itemValue1 : data.itemValue;
      const refRange = edit ? data.refRange1 : data.refRange;
      const itemUnit = edit ? data.itemUnit1 : data.itemUnit;
      // const attention = edit ? data.attention1 : data.attention;
      if (!itemName) {
        this.$message.error('项目名称不能为空');
        return false;
      }
      if (itemName.length > 200) {
        this.$message.error('项目名称最多输入200个字');
        return false;
      }
      if (itemValue && itemValue.length > 200) {
        this.$message.error('项目结果最多输入200个字');
        return false;
      }
      if (refRange && refRange.length > 200) {
        this.$message.error('参考范围最多输入200个字');
        return false;
      }
      if (itemUnit && itemUnit.length > 200) {
        this.$message.error('项目单位最多输入200个字');
        return false;
      }
      // if (!attention) {
      //   this.$message.error('是否关注不能为空');
      //   return false;
      // }
      return true;
    },
    saveSectionName(data) {
      if (!data.sectionName) {
        return false;
      }
      this.$set(data, 'sectionNameEdit', false);
    },
    addDepartment() {
      this.formData.sectionConclusionList.unshift({
        sectionName: '',
        sectionNameEdit: true,
        itemList: [],
        conclusion: '',
        addData: {
          attention: '0',
          itemName: '1',
          itemValue: '2',
          refRange: '3',
          itemUnit: '4',
        },
      });
    },
    queryTemplate() {
      this.$api.reportInterface.getTemplate({
        pageNo: 1,
        pageSize: MAX_PAGESIZE,
      }).then(({ data }) => {
        this.templateList = data.data.list;
      });
    },
    queryLibrary() {
      this.$api.reportInterface.getOrganType().then(({ data }) => {
        this.libraryList = data.data;
      });
    },
    templateDetail(id) {
      // for (let i = 0; i < this.templateList.length; i++) {
      //   if (this.templateList[i].id === id) {
      //     this.formData.libraryId = this.templateList[i].libraryId;
      //     break;
      //   }
      // }
      this.$api.reportInterface.getTemplateDetail(id).then(({ data }) => {
        this.onTemplateChange(data.data);
      });
    },
    onAbnormalChange(rows) {
      rows.forEach((row) => {
        if (!this.formData.abnormalList.find(val => val.abnormalCode === row.abnormalCode)) {
          this.formData.abnormalList.push({
            abnormalCode: row.abnormalCode,
            abnormalName: row.itemName,
            ...row,
          });
        }
      });
    },
    onUnMatchAbnormalChange(list) {
      list.forEach((val) => {
        if (!this.formData.notMatchAbnormalList.includes(val)) {
          this.formData.notMatchAbnormalList.push(val);
        }
      });
    },
    submit() {
      this.$refs.form.validate((valid) => {
        const arr = this.formData.sectionConclusionList;
        let error = false;
        for (let i = 0; i < arr.length; i++) {
          if (!arr[i].sectionName) {
            this.$message.error('请输入科室名称');
            error = true;
            break;
          }
        }
        arr.forEach((data) => {
          data.itemList.forEach((item) => {
            this.$set(item, 'sectionName', data.sectionName);
          });
        });
        if (error) {
          return false;
        }
        this.$emit('submit', this.formData, valid);
      });
    },
    removeAbnormal(index) {
      this.formData.abnormalList.splice(index, 1);
    },
    removeUnMatchAbnormal(index) {
      this.formData.notMatchAbnormalList.splice(index, 1);
    },
    onTemplateChange(row) {
      const sections = [];
      if (row.sectionConclusionList) {
        row.sectionConclusionList.forEach((val) => {
          const section = {
            sectionName: val.sectionName,
            sectionNameEdit: false,
            itemList: [],
            conclusion: val.conclusion,
            addData: {},
          };
          val.itemList.forEach(({ itemName, itemValue, refRange, itemUnit, attention }) => {
            const data = {
              itemName,
              itemValue,
              refRange,
              itemUnit,
              attention: attention || '0',
              editStatus: false,
            };
            section.itemList.push(data);
          });
          sections.push(section);
        });
      }
      this.$set(this.formData, 'sectionConclusionList', sections);
    },
    black() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>

.physical {
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
    margin-left: 240px;
}
  /deep/ .el-select {
    width: 100%;
  }
  /deep/ .title {
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
  .wltitle{
    height: 50px;
    margin-top: -15px;
    span{
      font-size: 14px;
    }
  }
  .add-department {
    width: 340px;
    height: 80px;
    background: #FFFFFF;
    border-radius: 8px;
    border: 1px dashed #97A6BD;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
    i {
      color: #9aa6bb;
      font-size: 24px;
      margin-right: 14px;
    }
    span {
      font-size: 14px;
      font-weight: 400;
      color: #97A6BD;
      line-height: 20px;
    }
  }
  .section-conclusion-item {
    margin-bottom: 30px;
    .top {
      padding: 10px;
      background: #3154AC;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      /deep/ .el-input {
        width: 180px;
        margin-right: 10px;
        input {
          background: #fff;
        }
      }
      /deep/ .el-button {
        padding: 0;
        width: 80px;
        height: 40px;
        background: rgba(255,255,255,0.2);
        border-radius: 8px;
        color: #fff;
        border: none;
        font-size: 14px;
      }
      .section-name {
        color: #fff;
      }
    }
    .center {
      padding: 20px;
      border-left: 1px solid #F4F4F6;
      border-right: 1px solid #F4F4F6;
      /deep/ .el-table {
        .el-table__header-wrapper th {
          padding: 13px 0;
        }
        &.el-table--enable-row-hover .el-table__body tr:hover > td {
          background: #fff;
        }
        .el-table__body td{
          padding: 7px 0;
        }
      }
      .add-wrapper {
        background: #F4F4F6;
        border-radius: 5px;
        display: flex;
        align-items: center;
        padding: 10px;
        width: 98%;
        > div {
          height: 40px;
          background: #FFFFFF;
          border-radius: 5px;
          display: flex;
          align-items: center;
          padding-left: 13px;
          margin-right: 13px;
          .label {
            font-size: 14px;
            color: #666;
          }
          /deep/ .el-input {
            flex: 1;
            input {
              background: #fff;
              padding-left: 0;
              border: none !important;
            }
          }
          /deep/ .el-select {
            flex: 1;
          }
        }
        .button-add-project {
          width: 70px;
          height: 40px;
          background: #36BF2F;
          border-radius: 5px;
          color: #fff;
        }
      }
    }
    .bottom {
      background: #EEF1F5;
      border-radius: 5px;
      padding: 15px 20px 10px 20px;
      >div:first-child {
        font-size: 14px;
        font-weight: 400;
        color: #3154AC;
        line-height: 20px;
      }
      /deep/ textarea {
        padding-left: 0;
        padding-right: 0;
        background: none;
        resize: none;
      }
    }
  }
  .suggest-item {
    margin-top: 20px;
    .label {
      font-size: 14px;
      color: #3154AC;
      line-height: 22px;
      background: #EEF1F5;
      padding: 15px 0 0 20px;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }
    /deep/ .el-textarea__inner{
      background: #EEF1F5;
      border-radius: 5px;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      resize: none;
    }
  }
  .buttons {
    text-align: center;
    margin-top: 30px;
    .el-button {
      width: 80px;
      height: 40px;
      border-radius: 8px;
      border: none;
      + .el-button {
        margin-left: 20px;
      }
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
  /deep/ .sub-title {
    height: 60px;
    background: #7CA7FF;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    color: #fff;
    padding: 0 10px 0 20px;
    align-items: center;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    .button-add-abnormal {
      display: inline-block;
      width: 80px;
      height: 40px;
      line-height: 40px;
      background: rgba(255,255,255, 0.2);
      border-radius: 8px;
      text-align: center;
      cursor: pointer;
      font-size: 14px;
      font-weight: 400;
    }
  }
  /deep/ .abnormal-level {
    display: flex;
    justify-content: flex-end;
    padding: 20px;
    border-left: 1px solid #F4F4F6;
    border-right: 1px solid #F4F4F6;
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
      &.level4:after {
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
  /deep/ .text-add-abnormal {
    font-size: 14px;
    font-weight: 400;
    color: #97A6BD;
    line-height: 20px;
    padding: 35px 0 45px 0;
    text-align: center;
    border-radius: 8px;
    border: 1px solid #F4F4F6;
    margin-bottom: 20px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-top: none;
  }
  /deep/ .abnormal-list {
    padding: 0 20px 0 20px;
    margin-bottom: 20px;
    border-radius: 8px;
    border: 1px solid #F4F4F6;
    display: flex;
    flex-wrap: wrap;
    border-top: none;
    .abnormal-item {
      border-radius: 50px;
      display: flex;
      align-items: center;
      padding: 8px 10px 10px 15px;
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
        padding-right: 20px;
      }
      .el-icon-error {
        color: #9aa6bb;
        cursor: pointer;
      }
      &.level1 {
       /* box-shadow: 0px 0px 15px 0px rgba(49, 197, 41, 0.2);*/
        border: 2px solid #31C529;
        .abnormal-number {
          color: #31C529;
        }
      }
      &.level2 {
        /*box-shadow: 0px 0px 15px 0px rgba(73, 145, 253, 0.2);*/
        border: 2px solid #4991FD;
        .abnormal-number {
          color: #4991FD;
        }
      }
      &.level3 {
        /*box-shadow: 0px 0px 15px 0px rgba(108, 108, 229, 0.2);*/
        border: 2px solid #6C6CE5;
        .abnormal-number {
          color: #6C6CE5;
        }
      }
      &.level4 {
        /*box-shadow: 0px 0px 15px 0px rgba(230, 176, 88, 0.2);*/
        border: 2px solid #E6B058;
        .abnormal-number {
          color: #E6B058;
        }
      }
      &.level5 {
        /*box-shadow: 0px 0px 15px 0px rgba(254, 43, 42, 0.2);*/
        border: 2px solid #FE2B2A;
        .abnormal-number {
          color: #FE2B2A;
        }
      }
      &.level0 {
        /*box-shadow: 0px 0px 15px 0px rgba(254, 43, 42, 0.2);*/
        border: 2px solid #97A6BD;
      }
    }
  }
}
</style>
