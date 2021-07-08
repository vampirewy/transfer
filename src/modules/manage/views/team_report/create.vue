<template>
  <div class="user-edit">
    <el-row>
      <el-col :span="24">
        <div class="divRight">
          <div class="divRightTitleDiv">
            <div class="divRightTitle" style="margin: 0">
              生成
              <div class="titleBiao"></div>
            </div>
          </div>
        </div>
        <el-form
          ref="form"
          class="user-edit-form"
          :model="formData"
          label-width="90px"
          :rules="rules"
        >
          <el-row>
            <el-col :span="6">
              <el-form-item label="报告编号：" prop="name">
                <el-input v-model="formData.no" maxLength="30"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="报告名称：" prop="name">
                <el-input v-model="formData.name" maxLength="30"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="体检日期：" prop="name">
                <el-date-picker
                  v-model="formData.startTime"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  :max-date="formData.endTime"
                  placeholder="选择开始日期"
                  style="width: 140px"
                >
                </el-date-picker>
                <span class="timing">-</span>
                <el-date-picker
                  v-model="formData.endTime"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  :min-date="formData.startTime"
                  placeholder="选择结束日期"
                  style="width: 140px"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="人员范围：">
                <el-radio-group v-model="formData.worker">
                  <el-radio :label="1" value="1">按参检团队</el-radio>
                  <el-radio :label="2" value="2">按工作单位</el-radio>
                  <el-radio :label="3" value="3">按部门</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <div class="divRight">
              <div class="divRightTitleDiv">
                <div class="divRightTitle">
                  团队信息
                  <div class="titleBiao"></div>
                </div>
              </div>
            </div>
            <el-col :span="24" v-if="formData.worker == 1">
              <el-form-item label="参检团队">
                <div class="template-add-wrapper" style="display: flex">
                  <el-popover
                    style="display: block; width: 100%"
                    ref="sportPopover"
                    placement="bottom-end"
                    width="650"
                    trigger="click"
                    @show="popoverStatus = true"
                    @hide="handlePopoverClosework"
                  >
                    <sport-template
                      v-if="popoverStatus"
                      @change="handleSportSelectChange"
                      @cancel="handlePopoverClose1"
                    >
                    </sport-template>
                    <el-input
                      class="select-user-trigger"
                      slot="reference"
                      disabled
                      v-model="templateStr"
                      placeholder="请选择"
                    >
                      <i
                        :class="`el-icon-arrow-${
                          popoverStatus ? 'up' : 'down'
                        }`"
                        slot="suffix"
                      ></i>
                    </el-input>
                  </el-popover>
                  <el-button class="addLv" @click="addSportTemplate"
                    >添加</el-button
                  >
                </div>
              </el-form-item>
              <el-table :data="form.sportLibraryDTOList" class="sport-table">
                <el-table-column
                  label="参检团队"
                  prop="workUnitName"
                  align="center"
                ></el-table-column>
                <el-table-column
                  label="参检人数"
                  prop="total"
                  align="center"
                ></el-table-column>
                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      @click="form.sportLibraryDTOList.splice(scope.$index, 1)"
                    >
                      <img
                        style="width: 30px"
                        src="../../../../assets/images/common/del.png"
                        alt=""
                      />
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
            <el-col :span="24">
              <div v-if="formData.worker == 2">
                <el-form-item label="工作单位">
                  <div class="template-add-wrapper" style="display: flex">
                    <el-popover
                      style="display: block; width: 100%"
                      ref="sportPopover2"
                      placement="bottom-end"
                      width="650"
                      trigger="click"
                      @show="popoverStatuswork = true"
                      @hide="handlePopoverClosework2"
                    >
                      <jointeam
                        v-if="popoverStatuswork"
                        @change="handleSportSelectChange2"
                        @cancel="handlePopoverClose2"
                      >
                      </jointeam>
                      <el-input
                        class="select-user-trigger"
                        slot="reference"
                        disabled
                        v-model="templateStrwork"
                        placeholder="请选择"
                      >
                        <i
                          :class="`el-icon-arrow-${
                            popoverStatuswork ? 'up' : 'down'
                          }`"
                          slot="suffix"
                        ></i>
                      </el-input>
                    </el-popover>
                    <el-button class="addLv" @click="addSportTemplatework2"
                      >添加</el-button
                    >
                  </div>
                </el-form-item>
                <el-table :data="form.teamListwork" class="sport-table">
                  <el-table-column
                    label="参检团队"
                    prop="workUnitName"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    label="参检人数"
                    prop="total"
                    align="center"
                  ></el-table-column>
                  <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        @click="form.teamListwork.splice(scope.$index, 1)"
                      >
                        <img
                          style="width: 30px"
                          src="../../../../assets/images/common/del.png"
                          alt=""
                        />
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div v-if="formData.worker == 3">
                <el-form-item label="工作单位">
                  <div class="template-add-wrapper" style="display: flex">
                    <el-popover
                      style="display: block; width: 100%;"
                      ref="sportPopover3"
                      placement="bottom-end"
                      width="650"
                      trigger="click"
                      @show="popoverStatuswork3 = true"
                      @hide="handlePopoverClosework3"
                    >
                      <sport-template3
                        v-if="popoverStatuswork3"
                        @change="handleSportSelectChange3"
                        @cancel="handlePopoverClose3"
                      >
                      </sport-template3>
                      <el-input
                        class="select-user-trigger"
                        slot="reference"
                        disabled
                        v-model="templateStrwork3"
                        placeholder="请选择"
                      >
                        <i
                          :class="`el-icon-arrow-${
                            popoverStatuswork3 ? 'up' : 'down'
                          }`"
                          slot="suffix"
                        ></i>
                      </el-input>
                    </el-popover>
                  </div>
                </el-form-item>
                <el-form-item label="所在部门">
                  <div class="template-add-wrapper" style="display: flex">
                    <el-popover
                      style="display: block; width: 100%"
                      ref="sportPopover4"
                      placement="bottom-end"
                      width="650"
                      trigger="click"
                      @show="fristcheckwork1"
                      @hide="handlePopoverClosework4"
                    >
                      <department
                        v-if="popoverStatuses4"
                        :departmentName = templateStrwork3
                        :form = formData
                        @change="handleSportSelectChange4"
                        @cancel="handlePopoverClose4"
                      >
                      </department>
                      <el-input
                        class="select-user-trigger"
                        slot="reference"
                        disabled
                        v-model="templatees4"
                        placeholder="请选择"
                      >
                        <i
                          :class="`el-icon-arrow-${
                            popoverStatuses4 ? 'up' : 'down'
                          }`"
                          slot="suffix"
                        ></i>
                      </el-input>
                    </el-popover>
                    <el-button class="addLv" @click="addTemplatees3"
                      >添加</el-button
                    >
                  </div>
                </el-form-item>
                <el-table :data="form.teamListworkes" class="sport-table">
                  <el-table-column
                    label="参检团队"
                    prop="departmentName"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    label="参检人数"
                    prop="total"
                    align="center"
                  ></el-table-column>
                  <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        @click="form.teamListworkes.splice(scope.$index, 1)"
                      >
                        <img
                          style="width: 30px"
                          src="../../../../assets/images/common/del.png"
                          alt=""
                        />
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="是否对比：">
                <el-switch v-model="value" active-color="#13ce66"> </el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <div v-if="value">
            <el-row>
              <el-col :span="8">
                <el-form-item label="体检日期：">
                  <el-date-picker
                    v-model="form.startReportDate"
                    type="date"
                    :max-date="form.endReportDate"
                    placeholder="选择开始日期"
                    style="width: 130px"
                  >
                  </el-date-picker>
                  <span class="timing">-</span>
                  <el-date-picker
                    v-model="form.endReportDate"
                    type="date"
                    :min-date="form.startReportDate"
                    placeholder="选择结束日期"
                    style="width: 130px"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="16" v-if="formData.worker == 1">
                <el-form-item label="参检团队6">
                  <div class="template-add-wrapper" style="display: flex">
                    <el-popover
                      style="display: block; width: 100%"
                      ref="sportPopover5"
                      placement="bottom-end"
                      width="650"
                      trigger="click"
                      @show="popoverStatus5 = true"
                      @hide="handlePopoverClosework5"
                    >
                      <sport-templates
                        v-if="popoverStatus5"
                        @change="handleSportSelectChange5"
                        @cancel="handlePopoverClose5"
                      >
                      </sport-templates>
                      <el-input
                        class="select-user-trigger"
                        slot="reference"
                        disabled
                        v-model="templateStr5"
                        placeholder="请选择"
                      >
                        <i
                          :class="`el-icon-arrow-${
                            popoverStatus5 ? 'up' : 'down'
                          }`"
                          slot="suffix"
                        ></i>
                      </el-input>
                    </el-popover>
                    <el-button class="addLv" @click="addSportTemplatesta5"
                      >添加</el-button
                    >
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <div v-if="formData.worker == 2">
                  <el-form-item label="工作单位">
                    <div class="template-add-wrapper" style="display: flex">
                      <el-popover
                        style="display: block; width: 100%"
                        ref="sportPopover6"
                        placement="bottom-end"
                        width="650"
                        trigger="click"
                        @show="popoverStatus6 = true"
                        @hide="handlePopoverClosework6"
                      >
                        <jointeam
                          v-if="popoverStatus6"
                          @change="handleSportSelectChange6"
                          @cancel="handlePopoverClose6"
                        >
                        </jointeam>
                        <el-input
                          class="select-user-trigger"
                          slot="reference"
                          disabled
                          v-model="templateStr6"
                          placeholder="请选择"
                        >
                          <i
                            :class="`el-icon-arrow-${
                              popoverStatus6 ? 'up' : 'down'
                            }`"
                            slot="suffix"
                          ></i>
                        </el-input>
                      </el-popover>
                      <el-button class="addLv" @click="addSportTemplatework6"
                        >添加</el-button
                      >
                    </div>
                  </el-form-item>
                </div>
                <div v-if="formData.worker == 3">
                  <el-form-item label="工作单位">
                    <div class="template-add-wrapper" style="display: flex">
                      <el-popover
                        style="display: block; width: 100%"
                        ref="sportPopover7"
                        placement="bottom-end"
                        width="650"
                        trigger="click"
                        @show="popoverStatus7 = true"
                        @hide="handlePopoverClosework7"
                      >
                        <sport-templates
                          v-if="popoverStatus7"
                          @change="handleSportSelectChange7"
                          @cancel="handlePopoverClose7"
                        >
                        </sport-templates>
                        <el-input
                          class="select-user-trigger"
                          slot="reference"
                          disabled
                          v-model="templateStrwork7"
                          placeholder="请选择"
                        >
                          <i
                            :class="`el-icon-arrow-${
                              popoverStatus7 ? 'up' : 'down'
                            }`"
                            slot="suffix"
                          ></i>
                        </el-input>
                      </el-popover>
                      <!-- <el-button class="sureBtn" @click="addSportTemplate">添加</el-button> -->
                    </div>
                  </el-form-item>
                  <el-form-item label="所在部门">
                    <div class="template-add-wrapper" style="display: flex">
                      <el-popover
                        style="display: block; width: 100%"
                        ref="sportPopover8"
                        placement="bottom-end"
                        width="650"
                        trigger="click"
                        @show="fristcheckwork2"
                        @hide="handlePopoverClosework8"
                      >
                        <department
                          v-if="popoverStatus8"
                          :departmentName = templateStrwork7
                          :form = formData
                          @change="handleSportSelectChange8"
                          @cancel="handlePopoverClose8"
                        >
                        </department>
                        <el-input
                          class="select-user-trigger"
                          slot="reference"
                          disabled
                          v-model="templateStrwork8"
                          placeholder="请选择"
                        >
                          <i
                            :class="`el-icon-arrow-${
                              popoverStatus8 ? 'up' : 'down'
                            }`"
                            slot="suffix"
                          ></i>
                        </el-input>
                      </el-popover>
                      <el-button class="addLv" @click="addTemplate8"
                        >添加</el-button
                      >
                    </div>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" v-if="formData.worker == 1">
                <el-table :data="form.stateamlist" class="sport-table">
                  <el-table-column
                    label="对比参检名称"
                    prop="workUnitName"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    label="对比参检人数"
                    prop="total"
                    align="center"
                  ></el-table-column>
                  <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        @click="form.stateamlist.splice(scope.$index, 1)"
                      >
                        <img
                          style="width: 30px"
                          src="../../../../assets/images/common/del.png"
                          alt=""
                        />
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
              <el-col :span="24" v-if="formData.worker == 2">
                <el-table :data="form.stateamlist2" class="sport-table">
                  <el-table-column
                    label="对比参检名称"
                    prop="workUnitName"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    label="对比参检人数"
                    prop="total"
                    align="center"
                  ></el-table-column>
                  <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        @click="form.stateamlist2.splice(scope.$index, 1)"
                      >
                        <img
                          style="width: 30px"
                          src="../../../../assets/images/common/del.png"
                          alt=""
                        />
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
              <el-col :span="24" v-if="formData.worker == 3">
                <el-table :data="form.stateamlist3" class="sport-table">
                  <el-table-column
                    label="对比参检部门"
                    prop="departmentName"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    label="对比参检人数"
                    prop="total"
                    align="center"
                  ></el-table-column>
                  <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        @click="form.stateamlist3.splice(scope.$index, 1)"
                      >
                        <img
                          style="width: 30px"
                          src="../../../../assets/images/common/del.png"
                          alt=""
                        />
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
          </div>
        </el-form>
      </el-col>
    </el-row>

    <div style="text-align: center; margin-top: 20px">
      <el-button class="cancelBtn" @click="$router.go(-1)">返回</el-button>
      <el-button class="sureBtn" type="primary" @click="onSubmit"
        >保存</el-button
      >
    </div>

    <!-- <file-dialog
              :visible="dialogFormVisible"
              @cancel="dialogFormVisible = false"
              @upload-success="uploadSuccess"
              @refresh="search()"
      ></file-dialog> -->
    <!-- <file-detail
              :visible="fileDetailModalVisible"
              :current="currentRow"
              @cancel="fileDetailModalVisible = false"
      ></file-detail> -->
  </div>
</template>
<script>
import SportTemplate from './sport_template.vue';
import SportTemplates from './sportteplates.vue';
import SportTemplate3 from './sporttemplate3.vue';
import jointeam from './jointeam.vue';
import department from './department.vue';
// import File from './components/file_dialog.vue';
// import FileDetail from './components/file_detail.vue';
import doctorSelect from '@/components/doctor_select/index.vue';
import deleteIcon from '~/src/assets/images/deleteicon.png';
// import * as dayjs from 'dayjs';

export default {
  name: 'ClientEdit',
  components: {
    SportTemplate,
    jointeam,
    department,
    SportTemplates,
    SportTemplate3,
    // 'file-dialog': File,
    // 'file-detail': FileDetail,
    'doctor-select': doctorSelect,
  },
  computed: {
    filterTableList() {
      return this.dataSource.filter(it => it.deleted === 0);
    },
  },
  data() {
    return {
      keywords: '',
      obj: {},
      savelist1: [],
      savelist2: [],
      form: {
        startTime: '',
        endTime: '',
        foodPrecautions: '',
        sportLibraryDTOList: [],
        teamListwork: [],
        teamListworkes: [],
        stateamlist: [],
        stateamlist2: [],
        stateamlist3: [],
      },
      templateStr: '',
      templateStrwork: '',
      templateStrwork3: '',
      templateStrwork7: '',
      templateStrwork8: '',
      templatees3: '',
      template: '',
      templateStr5: '',
      templateStr6: '',
      selectTemplate: [],
      selectTemplate2: [],
      selectTemplate3: [],
      selectTemplate4: [],
      selectTemplate5: [],
      selectTemplate6: [],
      selectTemplate7: [],
      selectTemplate8: [],
      value: false,
      formData: {
        no: '',
        startTime: '',
        endTime: '',
        startReportDate: '',
        endReportDate: '',
        worker: 1,
        birth: '', // 1992-01-04
        gridId: '',
        userRealName: '',
        profession: '',
        address: '',
        tagList: [],
        mobile: '',
        name: '',
        marriage: '',
        ethnicGroup: '',
        educationLevel: '',
        workUnitName: '',
        workUnitAddress: '',
        userIdList: [],
        workIdList: [],
        selectedDoctors: [],
      },
      rules: {
        marriage: [
          {
            required: true,
            message: '请选择',
            trigger: 'change',
          },
        ],
      },
      popoverStatus: false,
      popoverStatuses3: false,
      popoverStatuswork: false,
      addpopoverStatus: false,
      addpopoverStatuswork: false,
      popoverStatuswork3: false,
      dialogFormVisible: false,
      popovercontrast: false,
      popoverStatus5: false,
      popoverStatus6: false,
      popoverStatus7: false,
      popoverStatuses4: false,
      popoverStatus8: false,
      fileDetailModalVisible: false,
      selectedDoctorIds: [], // 选择的医生id
      dataSource: [],
      currentRow: {},
      gridList: [],
      marriageList: [],
      ethnicGroupList: [],
      educationLevelList: [],
      professionList: [],
      chooseFileList: [],
      params: {
        pageNo: 1,
        pageSize: 15,
        total: 0,
      },
    };
  },
  methods: {
    handlePopoverClose1() {
      this.popoverStatus = false;
      this.$refs.sportPopover.doClose();
    },
    handlePopoverClose2() {
      this.popoverStatuswork = false;
      this.$refs.sportPopover2.doClose();
    },
    handlePopoverClose3() {
      this.popoverStatuswork3 = false;
      this.$refs.sportPopover3.doClose();
    },
    handlePopoverClose4() {
      this.popoverStatuses4 = false;
      this.$refs.sportPopover4.doClose();
    },
    handlePopoverClose5() {
      this.popoverStatuses5 = false;
      this.$refs.sportPopover5.doClose();
    },
    handlePopoverClose6() {
      this.popoverStatuses6 = false;
      this.$refs.sportPopover6.doClose();
    },
    handlePopoverClose7() {
      this.popoverStatuses7 = false;
      this.$refs.sportPopover7.doClose();
    },
    handlePopoverClose8() {
      this.popoverStatuses8 = false;
      this.$refs.sportPopover8.doClose();
    },
    handlePopoverClosework() {
      this.popoverStatus = false;
      this.$refs.sportPopover.doClose();
      this.templateStr = this.selectTemplate[0].workUnitName;
    },
    handlePopoverClosework2() {
      this.popoverStatus2 = false;
      this.$refs.sportPopover2.doClose();
      this.templateStrwork = this.selectTemplate2[0].workUnitName;
    },
    handlePopoverClosework3() {
      this.popoverStatuswork3 = false;
      this.$refs.sportPopover3.doClose();
      this.templateStrwork3 = this.selectTemplate3[0].workUnitName;
    },
    handlePopoverClosework4() {
      this.popoverStatuses4 = false;
      this.$refs.sportPopover4.doClose();
      // this.templateStrwork4 = this.selectTemplatework3[0].workUnitName;
    },
    handlePopoverClosework5() {
      this.popoverStatuses5 = false;
      this.$refs.sportPopover5.doClose();
      this.templateStr5 = this.selectTemplate5[0].workUnitName;
    },
    handlePopoverClosework6() {
      this.popoverStatuses6 = false;
      this.$refs.sportPopover6.doClose();
      this.templateStr6 = this.selectTemplate6[0].workUnitName;
    },
    handlePopoverClosework7() {
      this.popoverStatuses7 = false;
      this.$refs.sportPopover7.doClose();
      this.templateStrwork7 = this.selectTemplate7[0].workUnitName;
    },
    handlePopoverClosework8() {
      console.log(this.selectTemplate8, 111);
      this.popoverStatuses8 = false;
      this.$refs.sportPopover8.doClose();
      this.templateStrwork8 = this.selectTemplate8[0].departmentName;
    },
    handleSportSelectChange(data) {
      this.selectTemplate = data;
      this.handlePopoverClose1();
    },
    handleSportSelectChange2(data) {
      this.selectTemplate2 = data;
      this.handlePopoverClose2();
    },
    handleSportSelectChange3(data) {
      this.selectTemplate3 = data;
      this.handlePopoverClose3();
    },
    handleSportSelectChange4(data) {
      this.selectTemplate4 = data;
      this.handlePopoverClose4();
    },
    handleSportSelectChange5(data) {
      this.selectTemplate5 = data;
      this.handlePopoverClose5();
    },
    handleSportSelectChange6(data) {
      this.selectTemplate6 = data;
      this.handlePopoverClose6();
    },
    handleSportSelectChange7(data) {
      this.selectTemplate7 = data;
      this.handlePopoverClose7();
    },
    handleSportSelectChange8(data) {
      this.selectTemplate8 = data;
      this.handlePopoverClose8();
    },
    fristcheckwork1() {
      if (this.templateStrwork3) {
        this.popoverStatuses4 = true;
      } else {
        this.handlePopoverClose4();
        this.$message.error('请先选择工作单位！');
      }
    },
    fristcheckwork2() {
      if (this.templateStrwork7) {
        this.popoverStatus8 = true;
      } else {
        this.handlePopoverClose8();
        this.$message.error('请先选择工作单位！');
      }
    },
    addSportTemplate() {
      if (this.selectTemplate && this.selectTemplate.length > 0) {
        this.form.sportLibraryDTOList = this.selectTemplate;
        this.selectTemplate = [];
      }
    },
    // 对比团队
    addSportTemplatesta5() {
      if (this.selectTemplate5) {
        this.form.stateamlist = this.selectTemplate5;
        this.selectTemplate5.forEach((item, index) => {
          this.gettimeteam(
            item.workUnitName,
            index,
            this.formData.startTime,
            this.formData.endTime,
          );
        });
        this.selectTemplate5 = [];
      }
    },
    addSportTemplatework6() {
      if (this.selectTemplate6) {
        this.form.stateamlist2 = this.selectTemplate6;
        this.selectTemplate6.forEach((item, index) => {
          // const obj = {
          //   total: '',
          // };

          // this.form.stateamlist2.push(obj);
          this.gettimeteamwork(
            item.workUnitName,
            index,
            this.formData.startTime,
            this.formData.endTime,
          );
        });
        this.selectTemplate6 = [];
      }
    },
    addTemplate8() {
      if (this.selectTemplate8) {
        this.form.stateamlist3 = this.selectTemplate8;
        this.selectTemplate8.forEach((item, index) => {
          this.gettime(
            item.departmentName,
            index,
            this.formData.startTime,
            this.formData.endTime,
          );
        });
        this.selectTemplate8 = [];
      }
    },
    // 添加
    addSportTemplatework2() {
      if (this.selectTemplate2 && this.selectTemplate2.length > 0) {
        this.form.teamListwork = this.selectTemplate2;
        this.selectTemplate2 = [];
      }
    },
    // 没有对比之前的添加的部门
    addTemplatees3() {
      if (this.selectTemplate3 && this.selectTemplate3.length > 0) {
        this.form.teamListworkes = this.selectTemplate3;
        this.selectTemplate3 = [];
      }
    },
    // 限定期限内参检团队人数
    async gettimeteam(name, num, starttimes, endtime) {
      const res = await this.$api.accessReport.groupnametotal({
        workUnitName: name,
        startReportDate: starttimes,
        endReportDate: endtime,
      });
      const { data } = res.data;
      this.form.stateamlist[num].total = data;
    },
    // 限定期限内参检单位人数
    async gettimeteamwork(name, num, starttimes, endtime) {
      const res = await this.$api.accessReport.groupworktotal({
        workUnitName: name,
        startReportDate: starttimes,
        endReportDate: endtime,
      });
      const { data } = res.data;
      console.log(this.selectTemplatework, data, num);
      this.form.stateamlist2[num].total = data;
    },
    // 限定期限内参检部门人数
    async gettime(name, num, dename, starttimes, endtime) {
      const res = await this.$api.accessReport.departmenttotal({
        workUnitName: name,
        departmentName: dename,
        startReportDate: starttimes,
        endReportDate: endtime,
      });
      const { data } = res.data;
      this.form.stateamlist3[num].total = data;
    },
    async getSystemParamByCode(code, fieldName) {
      const res = await this.$api.userManagerInterface.getSystemParamByCode(
        code,
      );
      const { data } = res.data;
      this[`${fieldName}List`] = data;
    },
    onSubmit() {
      let isshow = '';
      if (this.value) {
        isshow = 1;
      } else {
        isshow = 2;
      }
      if (this.formData.worker === 1) {
        this.savelist1 = [];
        this.savelist2 = [];
        this.form.sportLibraryDTOList.forEach((item) => {
          this.obj.unitName = item.workUnitName;
          this.obj.departmentName = '';
          this.savelist1.push(this.obj);
          this.obj = {};
        });
        this.form.stateamlist.forEach((item) => {
          this.obj.unitName = item.workUnitName;
          this.obj.departmentName = '';
          this.savelist2.push(this.obj);
          this.obj = {};
        });
      } else if (this.formData.worker === 2) {
        this.savelist1 = [];
        this.savelist2 = [];
        this.form.teamListwork.forEach((item) => {
          this.obj.unitName = item.workUnitName;
          this.obj.departmentName = '';
          this.savelist1.push(this.obj);
          this.obj = {};
        });
        this.form.stateamlist2.forEach((item) => {
          this.obj.unitName = item.workUnitName;
          this.obj.departmentName = '';
          this.savelist2.push(this.obj);
          this.obj = {};
        });
      } else {
        this.savelist1 = [];
        this.savelist2 = [];
        this.form.teamListworkes.forEach((item) => {
          this.obj.unitName = this.templateStrwork3;
          this.obj.departmentName = item.departmentName;
          this.savelist1.push(this.obj);
          this.obj = {};
        });
        this.form.stateamlist3.forEach((item) => {
          this.obj.unitName = this.templateStrwork7;
          this.obj.departmentName = item.departmentName;
          this.savelist2.push(this.obj);
          this.obj = {};
        });
      }
      this.$api.accessReport
        .departmenttotal({
          reportName: this.formData.name,
          startDate: this.formData.startTime,
          endDate: this.formData.endTime,
          startDateCompare: this.formData.startReportDate,
          endDateCompare: this.formData.endReportDate,
          no: this.formData.no,
          scope: this.formData.worker,
          isContrast: isshow,
          currentTeam: this.savelist1,
          compareTeam: this.savelist2,
        })
        .then(({ data }) => {
          if (data) {
            this.$message.success('操作成功');
            this.$router.go(-1);
          }
        });
      // this.$refs.form.validate((valid) => {
      //   if (valid) {
      //     this.$api.accessReport
      //       .departmenttotal({
      //         reportName: this.formData.name,
      //         startDate: this.formData.startTime,
      //         endDate: this.formData.endTime,
      //         startDateCompare: this.formData.startReportDate,
      //         endDateCompare: this.formData.endReportDate,
      //         no: this.formData.no,
      //         scope: this.formData.worker,
      //         isContrast: isshow,
      //         currentTeam: this.savelist1,
      //         compareTeam: this.savelist2,
      //       })
      //       .then(({ data }) => {
      //         if (data) {
      //           this.$message.success('操作成功');
      //           this.$router.go(-1);
      //         }
      //       });
      //   } else {
      //     return false;
      //   }
      // });
    },

    addNewTag() {
      this.formData.tagList.push({
        tag: this.formData.tag,
      });
      this.formData.tag = '';
    },
    close(index) {
      this.formData.tagList.splice(index, 1);
    },
    getAge(identityCard) {
      const len = `${identityCard}`.length;
      if (len === 0) {
        return 0;
      }
      // 身份证号码只能为15位或18位其它不合法
      if (len !== 15 && len !== 18) {
        return 0;
      }

      let strBirthday = '';
      if (len === 18) {
        // 处理18位的身份证号码从号码中得到生日和性别代码
        strBirthday = `${identityCard.substr(6, 4)}/${identityCard.substr(
          10,
          2,
        )}/${identityCard.substr(24, 2)}`;
      }
      if (len === 15) {
        strBirthday = `19${identityCard.substr(6, 2)}/${identityCard.substr(
          8,
          2,
        )}/${identityCard.substr(10, 2)}`;
      }
      // 时间字符串里，必须是“/”
      return new Date(strBirthday); // const birthDate = new Date(strBirthday);
      // const nowDateTime = new Date();
      // let age = nowDateTime.getFullYear() - birthDate.getFullYear();
      // 再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
      // eslint-disable-next-line max-len
      // if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() === birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
      //   age--;
      // }
      // return age;
    },
    remove({ row }) {
      const deleteDom = `<div class="delete-text-content">
        <img class="delete-icon" src="${deleteIcon}"/><span>该操作无法撤销，是否确认删除！</span></div>
        `;
      this.$confirm(deleteDom, '删除提示', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'message-box-customize',
        showClose: true,
      }).then(() => {
        const idx = this.dataSource.findIndex(t => t.id === row.id);
        this.$set(
          this.dataSource,
          idx,
          Object.assign({}, this.dataSource[idx], { deleted: 1 }),
        );
      });
    },
    search(current = 1) {
      this.params.pageNo = current;
      this.fetchFileList(this.$route.params.userId);
    },
    fetch(userId) {
      this.$api.userManagerInterface.getDetail(userId).then(({ data }) => {
        if (data) {
          let result = data.data;
          // eslint-disable-next-line no-param-reassign
          result.birth = result.birth || this.getAge(result.cardNo);
          result = {
            ...result,
            gridId: result.gridId === '0' ? '' : result.gridId,
            ethnicGroup: result.ethnicGroup === 0 ? '' : result.ethnicGroup,
            marriage: result.marriage === 0 ? '' : result.marriage,
            profession: result.profession === 0 ? '' : result.profession,
            educationLevel:
              result.educationLevel === 0 ? '' : result.educationLevel,
          };
          this.selectedDoctorIds = (result.userList || []).map(
            doctor => doctor.id,
          );

          const nameList = [];
          if (result.userList && result.userList.length) {
            result.userList.map(t => nameList.push(t.realName));
          }

          if (result.workHomeDOList && result.workHomeDOList.length) {
            result.workHomeDOList.map(t => nameList.push(t.name));
          }

          this.formData.userRealName = nameList.join(',');

          this.formData.userIdList = (result.userList || []).map(
            row => row.id,
          );
          this.formData.workIdList = (result.workHomeDOList || []).map(
            row => row.id,
          );

          (result.userList || []).forEach((t) => {
            const val = t;
            val.selectType = 1;
            this.formData.selectedDoctors.push(val);
          });

          (result.workHomeDOList || []).forEach((t) => {
            const val = t;
            val.selectType = 2;
            val.realName = val.name;
            this.formData.selectedDoctors.push(val);
          });

          // this.searchDoctor(this.selectedDoctorIds);
          Object.assign(this.formData, result);
        }
      });
    },
    fetchFileList(userId) {
      const thates = this;
      thates.$api.userManagerInterface
        .fetchFileList({
          clientId: userId,
          ...thates.params,
        })
        .then(({ data }) => {
          if (data) {
            thates.dataSource = data.data.data;
            thates.dataSource.forEach((it) => {
              it.deleted = 0;
            });
            thates.params.total = data.data.total;
          }
        });
    },
  },
  mounted() {
    this.getSystemParamByCode('HM009', 'educationLevel');
    this.getSystemParamByCode('HM005', 'ethnicGroup');
    this.getSystemParamByCode('HM007', 'marriage');
    this.getSystemParamByCode('HM008', 'profession');

    if (this.$route.query.owner && !this.$route.params.userId) {
      const userName = this.$store.state.user.userName;
      const userId = this.$store.state.user.userId;
      this.formData.userRealName = userName;
      this.formData.selectedDoctors = [
        {
          realName: userName,
          id: userId,
        },
      ];
    }
  },
  beforeRouteEnter(to, from, next) {
    // ...
    next((vm) => {
      if (to.params.userId) {
        vm.fetchFileList(to.params.userId);
        vm.fetch(to.params.userId);
      }
      if (to.params.userId) {
        document.title = '生成报告';
      } else {
        document.title = '生成报告';
      }
    });
  },
};
</script>
<style lang="less" scoped>
.el-popover.el-popper {
  width: 65% !important;
}
.user-edit {
  .select-user-trigger {
    cursor: pointer;
  }
  .addLv {
    width: 80px;
    height: 40px;
    font-size: 14px;
    background: #36bf2f;
    border-radius: 5px;
    text-align: center;
    color: #ffffff;
    margin-left: 10px;
    border: none;
  }
  .tags {
    margin-right: 10px;
  }
  /deep/.el-card {
    border: 0;
  }
  /deep/.el-card.is-always-shadow {
    box-shadow: none !important;
  }
  /deep/.el-form-item__label {
    padding-right: 8px !important;
  }
  /deep/ .select-user-trigger {
    .el-input__suffix {
      right: 15px;
    }
    input {
      border: 1px solid #dde0e6 !important;
    }
    input,
    i {
      background-color: white !important;
      cursor: pointer;
      color: #333333;
      &::placeholder {
        color: #999999 !important;
      }
    }
    &.disabled {
      input,
      i {
        cursor: not-allowed;
      }
    }
  }
  .user-edit-form {
    margin-top: 20px;
  }
  .divRight {
    flex: 1;
    .divRightTitleDiv {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      .divRightTitle {
        font-size: 16px;
        color: #333333;
        font-weight: bold;
        span {
          color: #4991fd;
          font-size: 18px;
          margin-right: 9px;
        }
      }
    }
  }
}
</style>
