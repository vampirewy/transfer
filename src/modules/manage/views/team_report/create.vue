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
                  <el-input
                    v-model="formData.name"
                    maxLength="30"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="报告编号：" prop="name">
                  <el-input
                    v-model="formData.name"
                    maxLength="30"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="体检日期：" prop="name">
                  <el-date-picker
                    v-model="formData.startTime"
                    type="date"
                    :max-date="formData.endTime"
                    placeholder="选择开始日期"
                    style="width: 140px"
                  >
                  </el-date-picker>
                  <span class="timing">-</span>
                  <el-date-picker
                    v-model="formData.endTime"
                    type="date"
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
                            style="display: block;width: 100%;"
                      ref="sportPopover"
                      placement="bottom-end"
                      width="650"
                      trigger="click"
                      @show="popoverStatus = true"
                      @hide="handlePopoverClose"
                    >
                      <sport-template
                        v-if="popoverStatus"
                        @change="handleSportSelectChange"
                        @cancel="handlePopoverClose"
                      >
                      </sport-template>
                      <el-input
                        class="select-user-trigger"
                        slot="reference"
                        disabled
                        v-model="templateStr"
                        placeholder="请选择"
                      >
                        <i :class="`el-icon-arrow-${popoverStatus ? 'up' : 'down'}`"
                           slot="suffix"></i>
                      </el-input>
                    </el-popover>
                    <el-button class="addLv" @click="addSportTemplate">添加</el-button>
                  </div>
                </el-form-item>
                <el-table :data="form.sportLibraryDTOList" class="sport-table">
                  <el-table-column
                    label="参检团队"
                    prop="name"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    label="参检人数"
                    prop="sportTypeTxt"
                    align="center"
                  ></el-table-column>
                  <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        @click="
                          form.sportLibraryDTOList.splice(scope.$index, 1)
                        "
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
                  <div class="template-add-wrapper">
                    <el-popover
                      ref="sportPopover"
                      placement="bottom-end"
                      width="650"
                      trigger="click"
                      @show="popoverStatus = true"
                      @hide="handlePopoverClose"
                    >
                      <sport-template
                        v-if="popoverStatus"
                        @change="handleSportSelectChange"
                        @cancel="handlePopoverClose"
                      >
                      </sport-template>
                      <el-input
                        style="width: 90%"
                        class="select-template-trigger"
                        slot="reference"
                        disabled
                        v-model="templateStr"
                        placeholder="请选择"
                      >
                        <i
                          :class="`el-icon-caret-${
                            popoverStatus ? 'top' : 'bottom'
                          }`"
                          slot="suffix"
                        ></i>
                      </el-input>
                    </el-popover>
                    <el-button class="sureBtn" @click="addSportTemplate">添加</el-button>
                  </div>
                </el-form-item>
                <el-table :data="form.sportLibraryDTOList" class="sport-table">
                  <el-table-column
                    label="参检团队"
                    prop="name"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    label="参检人数"
                    prop="sportTypeTxt"
                    align="center"
                  ></el-table-column>
                  <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        @click="
                          form.sportLibraryDTOList.splice(scope.$index, 1)
                        "
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
                  <div class="template-add-wrapper">
                    <el-popover
                      ref="sportPopover"
                      placement="bottom-end"
                      width="650"
                      trigger="click"
                      @show="popoverStatus = true"
                      @hide="handlePopoverClose"
                    >
                      <sport-template
                        v-if="popoverStatus"
                        @change="handleSportSelectChange"
                        @cancel="handlePopoverClose"
                      >
                      </sport-template>
                      <el-input
                        style="width: 90%"
                        class="select-template-trigger"
                        slot="reference"
                        disabled
                        v-model="templateStr"
                        placeholder="请选择"
                      >
                        <i
                          :class="`el-icon-caret-${
                            popoverStatus ? 'top' : 'bottom'
                          }`"
                          slot="suffix"
                        ></i>
                      </el-input>
                    </el-popover>
                    <el-button class="sureBtn" @click="addSportTemplate">添加</el-button>
                  </div>
                </el-form-item>
                <el-form-item label="部门">
                  <div class="template-add-wrapper">
                    <el-popover
                      ref="sportPopover"
                      placement="bottom-end"
                      width="650"
                      trigger="click"
                      @show="popoverStatus = true"
                      @hide="handlePopoverClose"
                    >
                      <sport-template
                        v-if="popoverStatus"
                        @change="handleSportSelectChange"
                        @cancel="handlePopoverClose"
                      >
                      </sport-template>
                      <el-input
                        style="width: 90%"
                        class="select-template-trigger"
                        slot="reference"
                        disabled
                        v-model="templateStr"
                        placeholder="请选择"
                      >
                        <i
                          :class="`el-icon-caret-${
                            popoverStatus ? 'top' : 'bottom'
                          }`"
                          slot="suffix"
                        ></i>
                      </el-input>
                    </el-popover>
                    <el-button class="sureBtn" @click="addSportTemplate">添加</el-button>
                  </div>
                </el-form-item>
                <el-table :data="form.sportLibraryDTOList" class="sport-table">
                  <el-table-column
                    label="参检团队"
                    prop="name"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    label="参检人数"
                    prop="sportTypeTxt"
                    align="center"
                  ></el-table-column>
                  <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        @click="
                          form.sportLibraryDTOList.splice(scope.$index, 1)
                        "
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
                  <el-switch v-model="value" active-color="#13ce66">
                  </el-switch>
                </el-form-item>
              </el-col>
            </el-row>
            <div v-if="value">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="体检日期：">
                    <el-date-picker
                      v-model="formData.startTime"
                      type="date"
                      :max-date="formData.endTime"
                      placeholder="选择开始日期"
                      style="width: 140px"
                    >
                    </el-date-picker>
                    <span class="timing">-</span>
                    <el-date-picker
                      v-model="formData.endTime"
                      type="date"
                      :min-date="formData.startTime"
                      placeholder="选择结束日期"
                      style="width: 140px"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="16">
                  <el-form-item label="参检团队">
                    <div class="template-add-wrapper">
                      <el-popover
                        ref="sportPopover"
                        placement="bottom-end"
                        width="650"
                        trigger="click"
                        @show="popoverStatus = true"
                        @hide="handlePopoverClose"
                      >
                        <sport-template
                          v-if="popoverStatus"
                          @change="handleSportSelectChange"
                          @cancel="handlePopoverClose"
                        >
                        </sport-template>
                        <el-input
                          style="width: 85%"
                          class="select-template-trigger"
                          slot="reference"
                          disabled
                          v-model="templateStr"
                          placeholder="请选择"
                        >
                          <i
                            :class="`el-icon-caret-${
                              popoverStatus ? 'top' : 'bottom'
                            }`"
                            slot="suffix"
                          ></i>
                        </el-input>
                      </el-popover>
                      <el-button class="sureBtn" @click="addSportTemplate"
                        >添加</el-button
                      >
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-table
                    :data="form.sportLibraryDTOList"
                    class="sport-table"
                  >
                    <el-table-column
                      label="运动名称"
                      prop="name"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      label="运动类型"
                      prop="sportTypeTxt"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      label="运动强度"
                      prop="strengthDegreeTxt"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      label="代谢当量"
                      prop="met"
                      align="center"
                    ></el-table-column>
                    <el-table-column label="操作" align="center">
                      <template slot-scope="scope">
                        <el-button
                          type="text"
                          @click="
                            form.sportLibraryDTOList.splice(scope.$index, 1)
                          "
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
// import File from './components/file_dialog.vue';
// import FileDetail from './components/file_detail.vue';
import doctorSelect from '@/components/doctor_select/index.vue';
import deleteIcon from '~/src/assets/images/deleteicon.png';
import * as dayjs from 'dayjs';

export default {
  name: 'ClientEdit',
  components: {
    SportTemplate,
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
      form: {
        foodPrecautions: '',
        sportLibraryDTOList: [],
        sportPrecautions: '',
        preface: '',
        commentContent: '',
        commentName: '',
      },
      value: false,
      activeName: 'first',
      currentUser: {
        name: '',
      },
      formData: {
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
      dialogFormVisible: false,
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
    handlePopoverClose() {
      this.popoverStatus = false;
      this.$refs.sportPopover.doClose();
    },
    handleSportSelectChange(data) {
      this.selectTemplate = data;
      this.handlePopoverClose();
    },
    addSportTemplate() {
      if (this.selectTemplate && this.selectTemplate.length > 0) {
        this.form.sportLibraryDTOList = this.selectTemplate;
        this.selectTemplate = [];
      }
    },
    async searchDoctor(selectedUserIds) {
      const selectedUserIdsStr = selectedUserIds.join(',');
      const res = await this.$api.userManagerInterface.searchDoctor({
        selectedUserIds: selectedUserIdsStr,
      });
      const { data } = res.data;
      this.formData.userRealName = (data.list || [])
        .filter(item => item.selected)
        .map(item => item.realName)
        .join(',');
    },
    async getGridList() {
      const res = await this.$api.userManagerInterface.getGridList({
        pageNo: 1,
        pageSize: 10000,
      });
      const { data } = res.data;
      this.gridList = data.data.filter(t => t.state === '1');
    },
    async getSystemParamByCode(code, fieldName) {
      const res = await this.$api.userManagerInterface.getSystemParamByCode(
        code,
      );
      const { data } = res.data;
      this[`${fieldName}List`] = data;
    },
    removeMultiFile() {
      if (!this.chooseFileList.length) {
        this.$message.error('请选择要删除的附件');
        return;
      }
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
        const ids = this.chooseFileList.map(f => f.id);
        for (let i = ids.length - 1; i >= 0; i--) {
          const idx = this.dataSource.findIndex(t => t.id === ids[i]);
          this.$set(
            this.dataSource,
            idx,
            Object.assign({}, this.dataSource[idx], { deleted: 1 }),
          );
        }
      });
    },
    handleSelectionChange(rows) {
      this.chooseFileList = rows;
    },
    submitAssign(rows) {
      this.$refs.popover1.showPopper = false;
      this.formData.userIdList = rows
        .filter(t => t.selectType === 1)
        .map(t => t.id);
      this.formData.workIdList = rows
        .filter(t => t.selectType === 2)
        .map(t => t.id);

      this.formData.userRealName = rows.map(item => item.realName).join(',');
    },
    handlePopoperShow() {
      this.popoverStatus = true;
    },
    handlePopoperClose() {
      this.popoverStatus = false;
    },
    submit() {},
    handleClick() {},
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.$route.query.owner && !this.$route.params.userId) {
            this.formData.userIdList.push(this.$store.state.user.userId);
            // this.formData.userIdList = [this.$route.query.owner];
          }
          // this.formData.birthday = dayjs(this.formData.birthday).format('YYYY-MM-DD');
          this.formData = {
            ...this.formData,
            birth: dayjs(this.formData.birth).format('YYYY-MM-DD'),
          };
          this.formData.annexParams = this.dataSource
            .filter(t => t.time && t.deleted === 0)
            .map(t => ({
              title: t.title,
              remark: t.remark,
              createTime: t.createTime,
              filePath: t.filePath,
            }));

          this.formData.annexIdList = this.dataSource
            .filter(t => t.id && t.deleted === 1)
            .map(t => t.id);

          console.log('formData', this.formData);

          this.$api.userManagerInterface
            .saveOrEditUser(this.formData)
            .then(({ data }) => {
              if (data) {
                this.$message.success('操作成功');
                this.$router.go(-1);
              }
            });
        } else {
          return false;
        }
      });
    },

    addNewTag() {
      this.formData.tagList.push({
        tag: this.formData.tag,
      });
      this.formData.tag = '';
    },
    close(index) {
      // console.log(index);
      this.formData.tagList.splice(index, 1);
      // console.log(object);
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
    uploadSuccess(val) {
      this.dataSource.push({
        title: val.title,
        remark: val.remark,
        createTime: val.createTime,
        filePath: val.filePath,
        time: new Date().getTime(),
        deleted: 0,
      });
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
    synchronousAge() {
      this.formData.birth = this.getAge(this.formData.cardNo);
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
    open({ row }) {
      this.fileDetailModalVisible = true;
      this.currentRow = row;
    },
  },
  mounted() {
    this.getGridList();
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
        document.title = '编辑客户';
      } else {
        document.title = '新增客户';
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
  .addLv{
    width: 80px;
    height: 40px;
    font-size: 14px;
    background: #36BF2F;
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
    .el-input__suffix{
      right: 15px;
    }
    input{
      border: 1px solid #DDE0E6!important;
    }
    input, i {
      background-color: white!important;
      cursor: pointer;
      color: #333333;
      &::placeholder{
        color: #999999!important;
      }
    }
    &.disabled {
      input, i {
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
