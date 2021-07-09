<template>
  <div class="userManage">
    <div>
        </div>
        <div class="divTop">
          <div class="searchCondition">
          <div class="searchLeft" style="margin:0 0 20px 40px">
          <div v-if="TabTitle !== 'Category'">
            <span>条件关系：</span>
           <el-select
                  v-model="formData.state"
                  placeholder="请选择"
                  style="width: 140px"
                  @change="RelationListId"
          >
            <el-option label="全部" value="1" key="1"></el-option>
            <el-option label="任意" value="2" key="2"></el-option>
          </el-select>
          </div>
          <!-- <div v-if="TabTitle === 'Minterm'">
            <span>体检库：</span>
           <el-select
                  v-model="formData.resultOptionsId"
                  placeholder="请选择"
                  style="width: 140px"
          >
          <el-option
            v-for="item in resultOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
          </el-select>
          </div> -->
          <div class="row" style="display: flex" v-if="TabTitle !== 'Constitution'">
            <el-form-item :label="labelName" prop="clientName" style="background:#ffffff">
              <el-popover
                ref="userPopovers"
                placement="bottom-start"
                width="700"
                trigger="click"
                @show="detectionpopoverStatus = true"
                @hide="detectionhandlePopoperClose"
              >
                <detectionuser
                  v-if="detectionpopoverStatus"
                  :NameType="NameType"
                  @change="detectiononSelectUser"
                ></detectionuser>
                <el-input
                  :class="`select-user-trigger ${id ? 'disabled' : ''}`"
                  slot="reference"
                  disabled
                  v-model="detectioninfoSource.clientName"
                  placeholder="请选择(可多选)"
                  style="width:380px"
                >
                  <i
                  :class=" detectionpopoverStatus? 'el-icon-arrow-up':'el-icon-arrow-down'"
                  slot="suffix"
                ></i>
                </el-input>
              </el-popover>
            </el-form-item>
            <div class="othertest" style="margin-top:14px">
                <div @click="othertestAdd">添加</div>
            </div>
          </div>
          <div v-if="TabTitle === 'Constitution'">
            <span>体质名称：</span>
           <el-select
                  v-model="ConstituList"
                  placeholder="请选择"
                  style="width: 140px"
                  @change="handleChange"
          >
          <el-option :label="item.name" :value="{value:item.code,label:item.name}"
                       v-for="(item, index) in Constitu" :key="index"></el-option>
            <!-- <el-option label="男" value="1" key="1"></el-option>
            <el-option label="女" value="2" key="2"></el-option> -->
          </el-select>
          <span style="color: #ffffff;" class="ConstitutionAdd" @click="ConstitutionAdd">添加</span>
          </div>
            </div>
          </div>
        </div>
        <div>
          <el-table
                  :data="dataSource.list"
                  @selection-change="handleSelectionChange"
                  ref="multipleTable"
                  align="center"
                  show-overflow-tooltip
          >
            <!-- <el-table-column type="selection" min-width="40"></el-table-column> -->
            <!-- <el-table-column label="科室名称" prop="name" min-width="80" show-overflow-tooltip>
            </el-table-column> -->
            <el-table-column
              v-for="(item, index) in dataSource.columns"
              :key="index"
              :label="item.label"
              :prop="item.prop"
              :min-width="item.minWidth"
              align="center">
              <template slot-scope="scope">
                <!-- <div v-if="index === 0"> -->
                  <span v-if="item.label === '小项条件' ||
                  item.label === '条件的值' ||
                  item.label === '低值' ||
                  item.label === '高值'">
                  <span v-if="item.label === '小项条件'">
                    <div>
                      <el-select
                              v-model="scope.row[item.prop]"
                              placeholder="请选择"
                              style="width: 140px"
                              @change="ChangeestatesJudg(scope.$index,$event)"
                      >
                        <el-option label=">" :value="1" key="1"></el-option>
                        <el-option label="<" :value="2" key="2"></el-option>
                        <el-option label="≥" :value="3" key="3"></el-option>
                        <el-option label="≤" :value="4" key="4"></el-option>
                        <el-option label="~" :value="5" key="5"></el-option>
                      </el-select>
                    </div>
                  </span>
                  <span v-else-if="item.label === '条件的值'">
                    <el-input placeholder=""
                    v-model="scope.row[item.prop]"
                    :disabled="dataSource.list[scope.$index].judgeRelation > 4 ? true:false"
                    onkeyup = "value=value.replace(/[^\d.]/g,'')"
                    >
                    </el-input>
                  </span>
                  <span v-else-if="item.label === '低值'">
                    <el-input placeholder=""
                    v-model="scope.row[item.prop]"
                    :disabled="dataSource.list[scope.$index].judgeRelation < 5 ? true:false"
                    onkeyup = "value=value.replace(/[^\d.]/g,'')"
                    >
                    </el-input>
                  </span>
                  <span v-else>
                    <el-input placeholder=""
                    v-model="scope.row[item.prop]"
                    :disabled="dataSource.list[scope.$index].judgeRelation < 5 ? true:false"
                    onkeyup = "value=value.replace(/[^\d.]/g,'')"
                    >
                    </el-input>
                  </span>
                  </span>
                  <span v-else-if="item.label === '风险等级'">
                    <div>
                      <el-select
                              v-model="scope.row[item.prop]"
                              placeholder="请选择"
                              style="width: 140px"
                              @change="Changeestates(scope.$index,$event)"
                      >
                        <el-option label="低危" value="2" key="2"></el-option>
                        <el-option label="中危" value="3" key="3"></el-option>
                        <el-option label="高危" value="4" key="4"></el-option>
                        <el-option label="很高危" value="5" key="5"></el-option>
                      </el-select>
                    </div>
                  </span>
                  <span v-else-if="item.label === '判定结果'">
                    <div v-if="dataSource.list[scope.$index].tizhiCode === '1'">
                      <el-select
                              v-model="scope.row[item.prop]"
                              placeholder="请选择"
                              style="width: 140px"
                      >
                      <!-- @visible-change="changeValue1(scope.$index,$event)" -->
                        <el-option label="是" value="1" key="1"></el-option>
                        <el-option label="基本是" value="2" key="2"></el-option>
                        <!-- <el-option label="倾向是" value="3" key="3"></el-option> -->
                        <el-option label="否" value="4" key="4"></el-option>
                      </el-select>
                    </div>
                    <div v-else>
                      <el-select
                              v-model="scope.row[item.prop]"
                              placeholder="请选择"
                              style="width: 140px"
                      >
                        <el-option label="是" value="1" key="1"></el-option>
                        <!-- <el-option label="基本是" value="2" key="2"></el-option> -->
                        <el-option label="倾向是" value="3" key="3"></el-option>
                        <el-option label="否" value="4" key="4"></el-option>
                      </el-select>
                    </div>
                  </span>
                  <span v-else-if="item.label === '性别'">
                    <span>
{{scope.row[item.prop] === 1 ? '男' : (scope.row[item.prop] === 2 ? '女' : '不限')}}
                    </span>
                  </span>
                  <span v-else>
                    <span>{{scope.row[item.prop]}}</span>
                  </span>
                <!-- </div> -->
                <!-- <span class="clientName" v-if="item.prop === 'clientName'"
                      @click="commonHref.toPersonalHealth(scope.row.clientId, $router)">
                  {{scope.row[item.prop]}}
                </span>
                <span v-else>{{item.formatter ? item.formatter(scope.row[item.prop]) :
                  scope.row[item.prop]}}</span> -->
              </template>
            </el-table-column>
            <el-table-column label="操作" prop="index"  width="150">
              <template slot-scope="scope">
                <!-- <span v-if="NameType === 'Minterm'">
                  <el-button type="text" v-if="scope.row.isshow"
                @click="ModifyListBtn(scope.$index, scope.row.id)">
                  <img
                    class="icon-delete"
                    src="@/assets/images/service/allergic.png"
                  />
                </el-button>
                  <el-button type="text"
                  @click="Addoperates(scope.$index, scope.row.id)"
                  v-else>
                  <img
                    class="icon-delete"
                    src="@/assets/images/service/compile.png"
                  />
                </el-button>
                </span> -->
                <span>
                  <el-button type="text" @click="deleteField(scope.$index, scope.row.id)">
                    <img
                      class="icon-delete"
                      src="@/assets/images/service/deletes.png"
                    />
                  </el-button>
                </span>
          </template>
            </el-table-column>
          </el-table>
          <div style="text-align: right;width:99%;margin-bottom: 20px;">
            <el-pagination
                    style="margin-top: 15px"
                    @current-change="onChangePage"
                    background
                    layout="prev, pager, next, jumper, total, sizes"
                    :total="total"
                    :pageSizes="[15]"
                    :page-size="15"
            ></el-pagination>
          </div>
        </div>
      <!-- </template> -->
    <edit-detail
      :visible="modalVisible"
      :value="currentValue"
      @cancel="cancel"
    ></edit-detail>
  </div>
</template>

<script>
// import assignDialog from './components/assign_dialog.vue';
// import doctorSelect from '~/src/components/doctor_select/index.vue';
import QueryPage from '~/src/components/query_page/index.vue';
import Search from '~/src/components/query_page/search.vue';
import QueryFilter from '~/src/components/query_page/query_filter.vue';
import deleteIcon from '~/src/assets/images/deleteicon.png';
// import * as dayjs from 'dayjs';
import detectionuser from './detection_user.vue';
// import editDetail from 'edit_detail.vue';
const SEX = {
  0: '不限',
  1: '男',
  2: '女',
};
const COLUMNS = {
  Minterm: [
    { label: '科室名称', prop: 'sectionName' },
    { label: '小项名称', prop: 'itemName' },
    { label: '小项条件', prop: 'judgeRelation' },
    { label: '条件的值', prop: 'itemValue' },
    { label: '低值', prop: 'minValue' },
    { label: '高值', prop: 'maxValue' },
  ],
  Category: [
    { label: '人员类别', prop: 'gridName' },
  ],
  Exception: [
    { label: '异常名称', prop: 'abnormalName' },
    { label: '性别',
      prop: 'gender',
      formatter(val) {
        return SEX[val];
      },
    },
  ],
  Composition: [
    { label: '组合异常名称', prop: 'name' },
  ],
  Disease: [
    { label: '评估模型名称', prop: 'name' },
    { label: '风险等级', prop: 'estates' },
  ],
  Constitution: [
    { label: '体质名称', prop: 'name' },
    { label: '判定结果', prop: 'judgeResult' },
  ],
};
export default {
  name: 'index',
  components: {
    // 'assign-dialog': assignDialog,
    // 'doctor-Select': doctorSelect,
    Search,
    QueryPage,
    QueryFilter,
    detectionuser,
    // editDetail,
  },
  props: {
    indexs: String,
    TabTitle: String,
    InterventionList: [],
  },
  data() {
    return {
      constitutionLists: [],
      detectionpopoverStatus: false,
      total: 0,
      dataSource: {
        list: [],
        columns: COLUMNS.Minterm,
      },
      dialogTableVisible: false,
      clientId: '',
      formData: {
        state: '2',
        keywords: '',
        gender: '',
        resultOptionsId: '',
      },
      params: {
        pageNo: 1,
        pageSize: 15,
        type: 0,
        total: 0,
      },
      detectioninfoSource: {
        Customer: '', // 客户id
        clientName: '',
        clientId: '', // 检测项目id
        age: '',
        gender: '',
        gridName: '',
      },
      isCollapse: true,
      modalVisible: false,
      currentValue: {},
      detectionInfo: [],
      labelName: '小项名称',
      NameType: '',
      // timer: '',
      Constitu: [],
      ConstituList: '',
      resultOptions: [],
    };
  },
  mounted() {
    this.NameType = this.TabTitle;
    this.dataSource.columns = COLUMNS[this.TabTitle];
    if (this.InterventionList.length !== 0) {
      this.dataSource.list = this.InterventionList;
      // if (this.InterventionList[0].conditionRelation === 1 &&
      // this.InterventionList[0].conditionRelation === 2) {
      //   this.formData.state = String(this.InterventionList[0].conditionRelation);
      // } else {
      //   this.formData.state = '1';
      // }
    }
    // else {
    //   this.dataSource.list = [];
    // }
    if (this.TabTitle === 'Minterm') {
      this.labelName = '小项名称';
    }
    if (this.TabTitle === 'Category') {
      this.labelName = '人员类别';
    }
    if (this.TabTitle === 'Exception') {
      this.labelName = '异常名称';
    }
    if (this.TabTitle === 'Composition') {
      this.labelName = '组合异常';
    }
    if (this.TabTitle === 'Disease') {
      this.labelName = '评估名称';
    }
    if (this.TabTitle === 'Constitution') {
      this.labelName = '体质名称';
      this.constitutionList();
    }
    this.getLibraryList();
    this.total = this.dataSource.list.length;
    // this.timer = new Date().getTime();
  },
  methods: {
    // 体检库下拉数据
    async getLibraryList() {
      const res = await this.$api.physicalProjectListInterface.listOrganItemLibrary();
      const { data } = res.data;
      this.resultOptions = data;
    },
    // handleChange(params) {
    //   const { value, label } = params;
    // },
    Changeestates(index, event) {
      this.$set(this.dataSource.list[index], 'estates', event);
      this.$forceUpdate();
    },
    ChangeestatesJudg(index) {
      if (this.dataSource.list[index].judgeRelation > 4) {
        this.dataSource.list[index].itemValue = '';
      } else {
        this.dataSource.list[index].minValue = '';
        this.dataSource.list[index].maxValue = '';
      }
      this.$set(this.dataSource.list[index], `${new Date()}`, '');
    },
    // changeValue1(index, event) {
    //   if (event) {
    //     if (this.dataSource.list[index].tizhiCode !== '1') {
    //       this.constitutionLists = [
    //         {
    //           id: '1',
    //           name: '是',
    //         },
    //         {
    //           id: '3',
    //           name: '倾向是',
    //         },
    //         {
    //           id: '4',
    //           name: '否',
    //         },
    //       ];
    //     } else {
    //       this.constitutionLists = [
    //         {
    //           id: '1',
    //           name: '是',
    //         },
    //         {
    //           id: '2',
    //           name: '基本是',
    //         },
    //         {
    //           id: '4',
    //           name: '否',
    //         },
    //       ];
    //     }
    //     console.log(this.dataSource.list, '平和');
    //   }
    // },
    constitutionList() {
      this.$api.reportInterface
        .getTcmList()
        .then(({ data }) => {
          this.Constitu = data.data;
        });
    },
    othertestAdd() {
      if (this.detectionInfo.length !== 0) {
        this.detectionInfo.forEach((valQusOne) => {
          let same = false;
          this.dataSource.list.forEach((valAnswer) => {
            if (valQusOne.id === valAnswer.id) { // 如果有一样 就回答过了
              same = true;
            }
          });
          if (same === false) { // 如果没有相同的则push
            this.dataSource.list.push(valQusOne);
          }
        });
        this.$emit('change', this.dataSource.list, this.TabTitle);
        this.detectioninfoSource.clientName = '';
        this.detectionInfo = [];
        this.total = this.dataSource.list.length;
      }
    },
    RelationListId() {
      this.dataSource.list = this.dataSource.list.map(
        (val) => {
          val.conditionRelation = this.formData.state;
          return val;
        },
      );
    },
    ConstitutionAdd() {
      const json = {
        tizhiCode: this.ConstituList.value,
        name: this.ConstituList.label,
        judgeResult: '',
        conditionRelation: this.formData.state,
      };
      let istrues = false;
      if (this.dataSource.list.length !== 0) {
        this.dataSource.list.forEach((val) => {
          if (Number(json.tizhiCode) === Number(val.tizhiCode)) {
            this.$message.error('请勿重复添加');
            istrues = true;
          }
        });
        if (istrues === false) {
          this.dataSource.list.push(json);
        }
      } else {
        this.dataSource.list.push(json);
      }
      this.$emit('change', this.dataSource.list, this.TabTitle);
    },
    detectionhandlePopoperClose() {
      this.detectionpopoverStatus = false;
    },
    // 选择检测项目
    detectiononSelectUser(data, NameType) {
      if (data) {
        // data.conditionRelation = this.formData.state;
        data.forEach((val) => {
          if (NameType === 'Minterm') {
            this.detectioninfoSource.clientName += `${val.itemName}、`;
          }
          if (NameType === 'Category') {
            this.detectioninfoSource.clientName += `${val.gridName}、`;
          }
          if (NameType === 'Exception') {
            this.detectioninfoSource.clientName += `${val.abnormalName}、`;
          }
          if (NameType === 'Composition') {
            this.detectioninfoSource.clientName += `${val.name}、`;
          }
          if (NameType === 'Disease') {
            this.detectioninfoSource.clientName += `${val.name}、`;
          }
          if (NameType === 'Constitution') {
            this.detectioninfoSource.clientName += `${val.name}、`;
          }
          this.detectionInfo.push(val);
        });
        console.log(this.detectionInfo, '12121212');
        for (let i = 0; i < this.detectionInfo.length; i++) {
          this.detectionInfo[i].conditionRelation = this.formData.state;
          if (NameType === 'Minterm') {
            this.detectionInfo[i].judgeRelation = '';
          }
        }
        this.$refs.userPopovers.doClose();
        this.detectionpopoverStatus = false;
      } else {
        this.$refs.userPopovers.doClose();
      }
    },
    Addoperates(index) {
      let ismun = true;
      for (let i = 0; i < this.dataSource.list.length; i++) {
        if (this.dataSource.list[i].isshow) {
          ismun = false;
        }
      }
      if (ismun) {
        this.$set(this.dataSource.list[index], 'isshow', true);
      }
    },
    fetch() {
      this.$api.interventionTemplateInterface
        .getInterveneTemplateListPage(Object.assign(this.params, this.formData))
        .then(({ data }) => {
          if (data.success) {
            this.params.total = data.data.total;
            this.dataSource = data.data.data;
          }
        });
    },
    deleteField(index) {
      this.dataSource.list.splice(index, 1);
      this.total = this.dataSource.list.length;
      this.$message.success('操作成功');
    },
    // 展开更多
    upMore() {
      this.isTrue = !this.isTrue;
    },
    // 新增
    InterventionAdd() {
      this.$router.push({
        name: 'InterventionAdd',
      });
      // this.modalVisible = true;
    },
    cancel() {
      this.modalVisible = false;
    },
    handleEditCheck() {},
    // 批量删除
    handleSomeRemove() {
      if (!this.chooseUserList.length) {
        this.$message.error('请选择需要删除客户');
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
        const params = {
          clientIdList: this.chooseUserList.map(user => user.id),
        };
        this.$api.userManagerInterface.deleteClientInfo(params).then(({ data }) => {
          if (data.code === 200) {
            this.$message.success('操作成功');
            this.search();
            this.chooseUserList = [];
            this.$refs.multipleTable.clearSelection();
          }
        });
      });
    },
    reset() {
      this.formData.Enabled = '';
      this.formData.keywords = '';
      this.formData.gender = '';
      this.params.pageNo = 1;
      this.fetch();
      // Object.assign(this.$data, this.$options.data());
      // this.getUserList();
    },
    onChangePage(current = 1) {
      this.params.pageNo = current;
      this.getUserList();
    },
    handleSelectionChange(rows) {
      this.chooseUserList = rows;
    },
    assign({ row = {} }) {
      if (row.id) {
        this.chooseUserList = [row];
      }
      if (this.chooseUserList.length) {
        this.clientId = this.chooseUserList[0].id;
        this.dialogTableVisible = true;
      } else {
        this.$message.warning('请选择客户');
      }
    },
    editplan() {
      this.$router.push({
        name: 'InterventionEdit',
      });
    },
    claim({ row = {} }) {
      if (!row.id) {
        if (!this.chooseUserList.length) {
          this.$message.warning('请选择客户');
          return;
        }
      } else {
        this.chooseUserList = [row];
      }
      this.$confirm(
        `<div class="delete-text-content"><img class="delete-icon" src="${deleteIcon}"/><span>您确定要删除该病人吗？</span></div>`,
        '提示',
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          customClass: 'message-box-customize',
          showClose: true,
        },
      ).then(() => {
        const params = {
          clientIdList: this.chooseUserList.map(user => user.id),
        };
        this.$api.userManagerInterface.deleteClientInfo(params).then(({ data }) => {
          if (data.code === 200) {
            this.$message.success('操作成功');
            this.getUserList();
            this.chooseUserList = [];
            this.$refs.multipleTable.clearSelection();
          }
        });
        // this.submit({
        //   clientIdList: this.chooseUserList.map(val => val.id),
        //   userIdList: [this.$store.state.user.userId],
        //   type: 1,
        // });
      });
    },
    submit(params) {
      this.$api.userManagerInterface.claim(params).then(({ data }) => {
        if (data.code === 200) {
          this.$message.success('操作成功');
          this.search();
          this.chooseUserList = [];
          this.$refs.multipleTable.clearSelection();
        }
      });
    },
    changeStatus({ row = {} }, status) {
      const setRow = row;
      this.$api.userManagerInterface.editUserStatus({
        id: setRow.id,
        state: status,
      }).then(({ data }) => {
        if (data.code === 200) {
          this.$message.success('操作成功');
          setRow.state = status;
        }
      });
    },
    getUserList() {
      this.$api.userManagerInterface
        .fetchUserList(Object.assign(this.params, this.formData))
        .then(({ data }) => {
          if (data.success) {
            this.total = data.data.total;
            this.dataSource = data.data.data;
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
  /deep/ .el-input__suffix-inner {
    margin-left: 10px;
  }

.othertest{
  width: 70px;
  height: 40px;
  background: #36BF2F;
  border-radius: 5px;
  text-align: center;
  line-height: 30px;
  color: #ffffff;
  margin-left: 20px;
}
.font-enable {
  color: #31c529;
}
.font-disable {
  color: #fe2b2a;
}
.el-button + .el-button {
  margin-left: 3px;
}
.userManage {
  .attachment-btn {
    cursor: pointer;
    width: 24px;
    height: 24px;
  }
  .form {
    width: 220px;
    background: #f4f4f6;
    border-radius: 10px;
    margin-right: 30px;
    .putAway {
      width: 20px;
      height: 80px;
      display: flex;
      align-items: center;
      text-align: center;
      background: #97a6bd;
      border-radius: 0px 5px 5px 0px;
      color: white;
      font-size: 12px;
      position: fixed;
      left: 250px;
      top: 350px;
      cursor: pointer;
    }
    .formLeft {
      padding: 0 20px 0 20px;
      text-align: center;
      .formSearchTitle {
        font-size: 18px;
        color: #333333;
        display: flex;
        align-items: center;
        font-weight: bold;
        margin: 20px 0 15px 0;
        &.setTimeText {
          font-size: 14px;
          font-weight: 400;
          margin-top: 0;
        }
        .dianBlue {
          width: 5px;
          height: 5px;
          background: #4991fd;
          border-radius: 50px;
          display: inline-block;
          margin-right: 6px;
        }
        .dianLv {
          width: 5px;
          height: 5px;
          background: #31c529;
          border-radius: 50%;
          display: inline-block;
          margin-right: 6px;
        }
      }
      .ge {
        width: 220px;
        height: 1px;
        background: #ffffff;
        margin-left: -20px;
      }
    }
  }
  .divRightTop {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    .divRightTitle {
      align-self: start;
      font-size: 18px;
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
.icon-delete{
    width: 30px;
}
.ConstitutionAdd{
  background: #31c529;
  padding: 10px 20px;
  border-radius: 5px;
}
</style>
