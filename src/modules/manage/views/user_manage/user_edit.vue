<template>
  <div class="user-edit">
    <div>
      <el-row>
        <el-col :span="12">
          <div class="divRight">
            <div class="divRightTitleDiv">
              <div class="divRightTitle">
                {{ $route.params.userId ? '编辑客户' : '新增客户'}}
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
                  label-suffix="："
          >
            <el-row>
              <el-col :span="12">
                <el-form-item label="姓名" prop="name">
                  <el-input v-model="formData.name" maxLength="30"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系方式" prop="mobile">
                  <el-input
                    v-model="formData.mobile"
                    maxlength=11
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="人员类别" prop="gridId">
                  <el-select
                          v-model="formData.gridId"
                          placeholder="请选择"
                          style="width: 100%;"
                  >
                      <el-option :label="item.gridName"
                                 :value="item.id"
                                 v-for="(item, index) in gridList"
                                 :key="index"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="民族">
                  <el-select
                          v-model="formData.ethnicGroup"
                          placeholder="请选择"
                          style="width: 100%;"
                  >
                    <el-option :label="item.name"
                               :value="item.paramValue"
                               v-for="(item, index) in ethnicGroupList"
                               :key="index"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="学历">
                  <el-select
                          v-model="formData.educationLevel"
                          placeholder="请选择"
                          style="width: 100%;"
                  >
                    <el-option :label="item.name"
                               :value="item.paramValue"
                               v-for="(item, index) in educationLevelList"
                               :key="index"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="职业">
                  <el-select
                          v-model="formData.profession"
                          placeholder="请选择"
                          style="width: 100%;"
                  >
                    <el-option :label="item.name"
                               :value="item.paramValue"
                               v-for="(item, index) in professionList"
                               :key="index"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="证件类型" prop="cardType">
                  <el-select
                          v-model="formData.cardType"
                          placeholder="请选择"
                          style="width: 100%;"
                          @change="cardTypeChange"
                  >
                    <el-option :label="item.name"
                               :value="item.paramValue"
                               v-for="(item, index) in cardTypeList"
                               :key="index"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="证件号码" prop="cardNo">
                  <el-input
                    @blur="formData.cardType===1?synchronousAge():''"
                    v-model="formData.cardNo"
                    :maxlength="formData.cardType===1?18:20">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="年龄" prop="age">
                  <el-input v-model="formData.age" :readonly="formData.cardType===1"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="性别" prop="gender">
                  <el-radio-group v-model="formData.gender" :disabled="formData.cardType===1">
                    <el-radio :label="1" value="1">男</el-radio>
                    <el-radio :label="2" value="2">女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="12">
                <el-form-item label="出生日期" prop="birth">
                  <el-date-picker
                          v-model="formData.birth"
                          type="date"
                          placeholder="选择出生日期"
                          style="width: 100%"
                          :picker-options="pickerOptions0"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col> -->
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="婚姻状况">
                  <el-select
                          v-model="formData.marriage"
                          placeholder="请选择"
                          style="width: 100%;"
                  >
                    <el-option :label="item.name"
                               :value="item.paramValue"
                               v-for="(item, index) in marriageList"
                               :key="index"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="企业单位">
                  <el-input v-model="formData.workUnitName" placeholder="请填写"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="部门">
                  <!-- <el-select
                          v-model="formData.workUnitDepartment"
                          placeholder="请选择"
                          style="width: 100%;"
                  >
                    <el-option :label="item.name"
                               :value="item.paramValue"
                               v-for="(item, index) in professionList"
                               :key="index"></el-option>
                  </el-select> -->
                  <el-input v-model="formData.workUnitDepartment"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="管理医生"  prop="userRealName">
                  <el-popover
                          ref="popover1"
                          placement="bottom"
                          popper-class="user-edit-popper"
                          width="650"
                          trigger="click"
                          @show="handlePopoperShow"
                          @hide="handlePopoperClose">
                    <doctor-select
                            v-if="popoverStatus"
                            mode="normal"
                            :isRadio="true"
                            :clientId="$route.params.userId"
                            :selectedDoctor="formData.selectedDoctors"
                            :selectedDoctorIds="selectedDoctorIds"
                            @cancel="$refs.popover1.showPopper = false"
                            @change="submitAssign"
                    />
                    <el-input
                            slot="reference"
                            class="select-user-trigger"
                            v-model="formData.userRealName"
                            placeholder="请选择"
                    ></el-input>
                    <!-- <el-select
                          v-model="formData.marriage"
                          placeholder="请选择"
                          style="width: 100%;"
                  >
                    <el-option
                               slot="reference"
                               class="select-user-trigger"
                               :value="formData.userRealName"
                               ></el-option>
                  </el-select> -->
                  </el-popover>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="工作地址">
                  <el-input v-model="formData.workUnitAddress" placeholder="请填写"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="居住地址">
                  <el-input v-model="formData.address" placeholder="请填写"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="客户标签">
              <el-row style="display: flex">
                <el-col style="flex: 1;margin-right: 5px">
                  <el-input v-model="formData.tag" maxlength="10"></el-input>
                </el-col>
                <el-col style="width: 80px">
                  <el-button
                          class="addbutton"
                          style="height: 40px;width:80px;font-size: 14px"
                          :disabled="!formData.tag"
                          @click="addNewTag"
                  >添加</el-button>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="已选标签">
              <el-tag
                      class="tags"
                      closable
                      v-for="(tag, index) in formData.tagList"
                      :key="tag.tag"
                      @close="close(index)"
              >{{ tag.tag }}</el-tag>
            </el-form-item>
            <!-- <el-form-item label="客户编号" prop="clientNo">
              <el-input type="input" v-model="formData.clientNo"></el-input>
            </el-form-item>-->
            <el-form-item label="备注" prop="remark">
              <el-input
                      rows="4"
                      type="textarea"
                      placeholder="输入备注内容"
                      :maxlength="300"
                      show-word-limit
                      v-model="formData.remark">
              </el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12"  style="padding-left: 20px;">
          <div class="divRight">
            <div class="divRightTitleDiv">
              <div class="divRightTitle">附件列表<div class="titleBiao"></div></div>
              <div>
                <el-button
                        class="btn-new btnAdd"
                        @click="dialogFormVisible = true"
                        size="small">
                  <img src="@/assets/images/common/addBtn.png" />
                  新增
                </el-button>
                <el-button
                        class="btn-new btnDel"
                        @click="removeMultiFile()"
                        size="small">
                  <img src="@/assets/images/common/delBtn.png" />删除
                </el-button>
              </div>
            </div>
          </div>
          <el-table
                  style="margin-top: 8px;"
                  :data="filterTableList"
                  align="center"
                  @selection-change="handleSelectionChange"
          >
              <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column prop="remark" label="附件说明"></el-table-column>
            <el-table-column prop="createdTime" label="上传时间"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="open(scope)">查看</el-button>
                <el-button type="text" @click="remove(scope)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="text-align: right">
            <el-pagination
                    style="margin-top: 15px"
                    @current-change="search"
                    background
                    layout="prev, pager, next"
                    :total="params.total"
            ></el-pagination>
          </div>
        </el-col>
      </el-row>

      <div style="text-align: center;margin-top: 20px;">
        <el-button class="cancelBtn" @click="$router.go(-1)">返回</el-button>
        <el-button class="sureBtn" type="primary" @click="onSubmit">保存</el-button>
      </div>

      <file-dialog
              :visible="dialogFormVisible"
              @cancel="dialogFormVisible = false"
              @upload-success="uploadSuccess"
              @refresh="search()"
      ></file-dialog>
      <file-detail
              :visible="fileDetailModalVisible"
              :current="currentRow"
              @cancel="fileDetailModalVisible = false"
      ></file-detail>
    </div>

  </div>
</template>
<script>
import File from './components/file_dialog.vue';
import FileDetail from './components/file_detail.vue';
import doctorSelect from '@/components/doctor_select/index.vue';
import deleteIcon from '~/src/assets/images/deleteicon.png';
import * as dayjs from 'dayjs';

export default {
  name: 'ClientEdit',
  components: {
    'file-dialog': File,
    'file-detail': FileDetail,
    'doctor-select': doctorSelect,
  },
  computed: {
    filterTableList() {
      return this.dataSource.filter(it => it.deleted === 0);
    },
  },
  data() {
    const validateIDCard = (rule, value, callback) => {
      if (value === '') {
        callback(new Error());
        return;
      }
      if (this.formData.cardType === 1) {
        const IDCARD_REG = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/;
        if (!IDCARD_REG.test(value)) {
          callback(new Error('请输入合理身份证号'));
          return;
        }
      }
      callback();
    };

    return {
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e7;
        },
      },
      activeName: 'first',
      currentUser: {
        name: '',
      },
      formData: {
        birth: '', // 1992-01-04
        gridId: '',
        userRealName: '',
        profession: '',
        address: '',
        tagList: [],
        mobile: '',
        name: '',
        age: '',
        gender: '',
        cardType: 1,
        cardNo: '',
        marriage: '',
        ethnicGroup: '',
        educationLevel: '',
        remark: '',
        tag: '',
        workUnitName: '',
        workUnitAddress: '',
        userIdList: [],
        workIdList: [],
        selectedDoctors: [],
        workUnitDepartment: '',
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入用户姓名',
            trigger: 'blur',
          },
        ],
        birth: [
          {
            required: true,
            message: '请选择出生日期',
            trigger: 'blur',
          },
        ],
        mobile: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur',
          },
          {
            min: 11,
            max: 11,
            message: '请输入合法手机号',
            trigger: 'blur',
          },
        ],
        gridId: [
          {
            required: true,
            message: '请选择人员类别',
            trigger: 'change',
          },
        ],
        gender: [
          {
            required: true,
            message: '请选择性别',
            trigger: 'change',
          },
        ],
        cardType: [
          {
            required: true,
            message: '请选择证件类型',
            trigger: 'change',
          },
        ],
        cardNo: [
          {
            required: true,
            message: '请输入正确的证件号码',
            trigger: 'blur',
            validator: validateIDCard,
          },
        ],
        age: [
          {
            required: true,
            message: '请输入年龄',
            trigger: 'blur',
          },
        ],
        marriage: [
          {
            required: true,
            message: '请选择',
            trigger: 'change',
          },
        ],
        userRealName: [
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
      cardTypeList: [],
      params: {
        pageNo: 1,
        pageSize: 15,
        total: 0,
      },
    };
  },
  methods: {
    async getUserInfo() {
      const res = await this.$api.userManagerInterface.getUserInfo();
      const { data } = res.data;
      this.formData.userRealName = data.realName;
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
      const res = await this.$api.userManagerInterface.getGridList({ pageNo: 1, pageSize: 10000 });
      const { data } = res.data;
      this.gridList = data.data.filter(t => t.state === '1');
    },
    async getSystemParamByCode(code, fieldName) {
      const res = await this.$api.userManagerInterface.getSystemParamByCode(code);
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
          this.$set(this.dataSource, idx, Object.assign({}, this.dataSource[idx], { deleted: 1 }));
        }
      });
    },
    handleSelectionChange(rows) {
      this.chooseFileList = rows;
    },
    submitAssign(rows) {
      this.$refs.popover1.showPopper = false;
      this.formData.userIdList = rows.filter(t => t.selectType === 1).map(t => t.id);
      this.formData.workIdList = rows.filter(t => t.selectType === 2).map(t => t.id);

      this.formData.userRealName = rows
        .map(item => item.realName)
        .join(',');
    },
    handlePopoperShow() {
      this.popoverStatus = true;
    },
    handlePopoperClose() {
      this.popoverStatus = false;
    },
    submit() {},
    handleClick() {},
    // 操作证件类型
    cardTypeChange(val) {
      if (val === 1) {
        this.synchronousAge();
      }
    },
    onSubmit() {
      const reg = /^1[3|4|5|7|8|6|9][0-9]\d{8}$/;
      this.$refs.form.validate((valid) => {
        if (!reg.test(this.formData.mobile)) {
          this.$message.error('手机号错误！');
        } else if (!this.getAge(this.formData.cardNo)) {
          this.$message.error('身份证号错误！');
        } else if (valid) {
          if (this.$route.query.owner && !this.$route.params.userId) {
            this.formData.userIdList.push(this.$store.state.user.userId);
            // this.formData.userIdList = [this.$route.query.owner];
          }
          // this.formData.birthday = dayjs(this.formData.birthday).format('YYYY-MM-DD');
          this.formData = {
            ...this.formData,
            birth: dayjs(this.formData.birth).format('YYYY-MM-DD'),
          };
          this.formData.annexParams =
              this.dataSource.filter(t => t.time && t.deleted === 0).map(t => ({
                title: t.title,
                remark: t.remark,
                createTime: t.createTime,
                filePath: t.filePath,
              }));

          this.formData.annexIdList =
              this.dataSource.filter(t => t.id && t.deleted === 1).map(t => t.id);
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
      this.formData.tagList.splice(index, 1);
    },
    getAge(identityCard) {
      const len = (`${identityCard}`).length;
      if (len === 0) {
        return 0;
      }
      // 身份证号码只能为15位或18位其它不合法
      if ((len !== 15) && (len !== 18)) {
        return 0;
      }
      let strBirthday = '';
      if (len === 18) { // 处理18位的身份证号码从号码中得到生日和性别代码
        strBirthday = `${identityCard.substr(6, 4)}/${identityCard.substr(10, 2)}/${identityCard.substr(12, 2)}`;
        if (identityCard.substring(16, 17) % 2 === 0) {
          this.formData.gender = 2;
        } else {
          this.formData.gender = 1;
        }
      }
      if (len === 15) {
        strBirthday = `19${identityCard.substr(6, 2)}/${identityCard.substr(8, 2)}/${identityCard.substr(10, 2)}`;
      }
      // 时间字符串里，必须是“/”
      // return new Date(strBirthday);
      const birthDate = new Date(strBirthday);
      const nowDateTime = new Date();
      let age = nowDateTime.getFullYear() - birthDate.getFullYear();
      // 再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
      // eslint-disable-next-line max-len
      if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() === birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
        age--;
      }
      const sex = identityCard.toString().substr(16, 1) % 2 === 0 ? 2 : 1;
      return { birthDate, age, sex };
    },
    uploadSuccess(val) {
      this.dataSource.push({
        title: val.title,
        remark: val.remark,
        createdTime: val.createTime,
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
        this.$set(this.dataSource, idx, Object.assign({}, this.dataSource[idx], { deleted: 1 }));
      });
    },
    synchronousAge() {
      // this.formData.birth = this.getAge(this.formData.cardNo);
      const { age, sex } = this.getAge(this.formData.cardNo);
      this.formData.age = age || 0;
      this.formData.gender = sex;
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
          const { birthDate, age } = this.getAge(this.formData.cardNo);
          result.birth = result.birth || birthDate;
          result.age = result.age || age;
          result = {
            ...result,
            gridId: result.gridId === '0' ? '' : result.gridId,
            ethnicGroup: result.ethnicGroup === 0 ? '' : result.ethnicGroup,
            marriage: result.marriage === 0 ? '' : result.marriage,
            profession: result.profession === 0 ? '' : result.profession,
            educationLevel: result.educationLevel === 0 ? '' : result.educationLevel,
          };
          this.selectedDoctorIds = (result.userList || [])
            .map(doctor => doctor.id);

          const nameList = [];
          if (result.userList && result.userList.length) {
            result.userList.map(t => nameList.push(t.realName));
          }

          if (result.workHomeDOList && result.workHomeDOList.length) {
            result.workHomeDOList.map(t => nameList.push(t.name));
          }

          this.formData.userRealName = nameList.join(',');

          this.formData.userIdList = (result.userList || [])
            .map(row => row.id);

          this.formData.workIdList = (result.workHomeDOList || [])
            .map(row => row.id);

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
    this.getUserInfo();
    this.getSystemParamByCode('HM009', 'educationLevel');
    this.getSystemParamByCode('HM005', 'ethnicGroup');
    this.getSystemParamByCode('HM007', 'marriage');
    this.getSystemParamByCode('HM008', 'profession');
    this.getSystemParamByCode('CARDTYPE', 'cardType');

    if (this.$route.query.owner && !this.$route.params.userId) {
      const userName = this.$store.state.user.userName;
      const userId = this.$store.state.user.userId;
      this.formData.userRealName = userName;
      this.formData.selectedDoctors = [{
        realName: userName,
        id: userId,
      }];
    }
    console.log(this.filterTableList, '附件列表');
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
  .user-edit {
    .select-user-trigger {
      cursor: pointer;
    }
    .tags {
      margin-right: 10px;
    }
    /deep/.div {
      border: 0;
    }
    /deep/.div.is-always-shadow {
      box-shadow: none !important;
    }
    /deep/.el-form-item__label {
      padding-right: 8px !important;
    }
    /deep/.el-input__inner, /deep/.el-textarea__inner {
      background-color: #F4F4F6;
    }
    .user-edit-form {
      margin-top: 10px;
      padding-right: 20px;
      border-right: 1px solid #F4F4F6;
    }
    .divRight{
      flex: 1;
      .divRightTitleDiv{
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        .divRightTitle{
          font-size: 16px;
          color: #333333;
          font-weight: bold;
          margin: 0 0 20px 0;
          span{
            color: #4991FD;
            font-size: 18px;
            margin-right: 9px;
          }
        }
      }
    }
  }
</style>
