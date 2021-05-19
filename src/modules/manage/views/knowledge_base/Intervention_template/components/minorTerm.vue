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
          >
            <el-option label="是" value="1" key="1"></el-option>
            <el-option label="否" value="2" key="0"></el-option>
          </el-select>
          </div>
          <div v-if="TabTitle === 'Minterm'">
            <span>体检库：</span>
           <el-select
                  v-model="formData.gender"
                  placeholder="请选择"
                  style="width: 140px"
          >
            <el-option label="男" value="1" key="1"></el-option>
            <el-option label="女" value="2" key="2"></el-option>
          </el-select>
          </div>
          <div class="row" style="display: flex">
            <el-form-item :label="labelName" prop="clientName" style="background:#ffffff">
              <el-popover
                ref="userPopovers"
                placement="bottom-start"
                width="650"
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
                    :class="`el-icon-caret-${detectionpopoverStatus ? 'top' : 'bottom'}`"
                    slot="suffix"
                  ></i>
                </el-input>
              </el-popover>
            </el-form-item>
            <div class="othertest" style="margin-top:15px">
                <div @click="othertestAdd">添加</div>
            </div>
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
                      >
                        <el-option label="男" value="1" key="1"></el-option>
                        <el-option label="女" value="2" key="2"></el-option>
                      </el-select>
                    </div>
                  </span>
                  <span v-else>
                    <el-input placeholder="" v-model="scope.row[item.prop]">
                    </el-input>
                  </span>
                  </span>
                  <span v-else-if="item.label === '风险等级'">
                    <div>
                      <el-select
                              v-model="scope.row[item.prop]"
                              placeholder="请选择"
                              style="width: 140px"
                      >
                        <el-option label="男" value="1" key="1"></el-option>
                        <el-option label="女" value="2" key="2"></el-option>
                      </el-select>
                    </div>
                  </span>
                  <span v-else-if="item.label === '判定结果'">
                    <div>
                      <el-select
                              v-model="scope.row[item.prop]"
                              placeholder="请选择"
                              style="width: 140px"
                      >
                        <el-option label="男" value="1" key="1"></el-option>
                        <el-option label="女" value="2" key="2"></el-option>
                      </el-select>
                    </div>
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
                <span v-if="NameType === 'Minterm'">
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
                </span>
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
          <div style="text-align: right">
            <el-pagination
                    style="margin-top: 15px"
                    @current-change="onChangePage"
                    background
                    layout="prev, pager, next, jumper, total, sizes"
                    :total="params.total"
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
  0: '男',
  1: '女',
};
const COLUMNS = {
  Minterm: [
    { label: '科室名称', prop: 'sectionName' },
    { label: '小项名称', prop: 'itemName' },
    { label: '小项条件', prop: 'isMain' },
    { label: '条件的值', prop: 'isMainText' },
    { label: '低值', prop: 'minAge' },
    { label: '高值', prop: 'maxValue' },
  ],
  Category: [
    { label: '人员类别', prop: 'gridName' },
  ],
  Exception: [
    { label: '异常名称', prop: 'abnormalTypeName' },
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
    { label: '风险等级', prop: 'name' },
  ],
  Constitution: [
    { label: '体质名称', prop: 'name' },
    { label: '判定结果', prop: 'name' },
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
      detectionpopoverStatus: false,
      total: 0,
      dataSource: {
        list: [],
        columns: COLUMNS.Minterm,
      },
      dialogTableVisible: false,
      clientId: '',
      formData: {
        state: '',
        keywords: '',
        gender: '',
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
    };
  },
  mounted() {
    // console.log(this.indexs, this.TabTitle);
    this.NameType = this.TabTitle;
    this.dataSource.columns = COLUMNS[this.TabTitle];
    if (this.InterventionList.length !== 0) {
      this.dataSource.list = this.InterventionList;
    } else {
      this.dataSource.list = [];
    }
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
    }
    // this.timer = new Date().getTime();
    // console.log(this.InterventionList, 'cccccc');
  },
  methods: {
    othertestAdd() {
      this.detectionInfo.forEach((val) => {
        this.dataSource.list.push(val);
      });
      this.$emit('change', this.dataSource.list, this.TabTitle);
      this.detectioninfoSource.clientName = '';
      this.detectionInfo = [];
    },
    detectionhandlePopoperClose() {
      this.detectionpopoverStatus = false;
    },
    // 选择检测项目
    detectiononSelectUser(data, NameType) {
      console.log(data, NameType, '123123选择检测项目');
      if (data) {
        data.forEach((val) => {
          if (NameType === 'Minterm') {
            this.detectioninfoSource.clientName += `${val.sectionName}、`;
          }
          if (NameType === 'Category') {
            this.detectioninfoSource.clientName += `${val.gridName}、`;
          }
          if (NameType === 'Exception') {
            this.detectioninfoSource.clientName += `${val.abnormalTypeName}、`;
          }
          this.detectionInfo.push(val);
        });
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
      this.$message.success('操作成功');
    },
    // 展开更多
    upMore() {
      this.isTrue = !this.isTrue;
    },
    // 新增
    InterventionAdd() {
      console.log('12312313');
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
</style>
