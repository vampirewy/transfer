<template>
  <div class="userManage">
    <div>
        </div>
        <div class="divTop">
          <div class="searchCondition">
          <div class="searchLeft" style="margin:0 0 20px 40px">
          <div>
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
          <div>
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
            <el-form-item label="检测项目" prop="clientName" style="background:#ffffff">
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
                  :data="dataSource"
                  @selection-change="handleSelectionChange"
                  ref="multipleTable"
                  align="center"
                  show-overflow-tooltip
          >
            <!-- <el-table-column type="selection" min-width="40"></el-table-column> -->
            <el-table-column label="科室名称" prop="name" min-width="80" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>
                  {{ scope.row.name }}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="小项名称" prop="gender" min-width="80" show-overflow-tooltip />
            <el-table-column label="小项条件"
            prop="qualification" min-width="80" show-overflow-tooltip />
            <el-table-column label="条件的值" prop="orgCode" min-width="80" show-overflow-tooltip />
            <el-table-column label="低值" prop="checked" min-width="60" show-overflow-tooltip />
            <el-table-column label="高值" prop="checked" min-width="60" show-overflow-tooltip />
            <!-- <el-table-column label="" min-width="150"  prop="state">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.state "
                  active-value="1"
                  inactive-value="0"
                  active-color="#13ce66"
                  @change=changeStatus(scope,scope.row.state)
                  >
                </el-switch>
              </template>
            </el-table-column> -->
            <el-table-column label="操作" prop="index"  width="150">
              <template slot-scope="scope">
<el-button type="text" @click="Addoperates(scope.$index, scope.row.id)">
              <img
                class="icon-delete"
                src="@/assets/images/service/compile.png"
              />
            </el-button>
<!-- <el-button type="text" v-if="scope.row.isshow"
 @click="ModifyListBtn(scope.$index, scope.row.id)">
              <img
                class="icon-delete"
                src="@/assets/images/service/allergic.png"
              />
            </el-button> -->
            <el-button type="text" @click="deleteField(scope.$index, scope.row.id)">
              <img
                class="icon-delete"
                src="@/assets/images/service/deletes.png"
              />
            </el-button>
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
import * as dayjs from 'dayjs';
import detectionuser from './detection_user.vue';
// import editDetail from 'edit_detail.vue';

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
  data() {
    return {
      detectionpopoverStatus: false,
      isTrue: true,
      value: true,
      total: 0,
      gridList: [],
      doctorList: [],
      dataSource: [],
      chooseUserList: [],
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
    };
  },
  mounted() {
    this.fetch();
    // this.getUserList();
    // this.getGridList(); // 获取人员列类别
    // this.getDoctor(); // 获取医生列表
  },
  methods: {
    othertestAdd() {

    },
    detectionhandlePopoperClose() {
      this.detectionpopoverStatus = false;
    },
    // 选择检测项目
    detectiononSelectUser(data) {
      // data.clientId = this.infoSource.clientId;
      // data.ingrenient = this.infoSource.ingrenient;
      // data.consequences = '123132';
      // this.detectionInfo.push(data);
      console.log(data, '选择检测项目');
      this.$refs.userPopovers.doClose();
      this.detectionpopoverStatus = false;
      // this.detectioninfoSource.clientName += data.name;
      // this.detectioninfoSource.clientId = data.id;
      // this.detectioninfoSource.age = data.age;
      // this.detectioninfoSource.gender = data.gender;
      // this.detectioninfoSource.gridName = data.gridName;
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
    // 获取人员列表
    async getGridList() {
      const res = await
      this.$api.userManagerInterface.getGridList({ pageNo: 1, pageSize: 10000 });
      const { data } = res.data;
      this.gridList = data.data;
    },
    // 获取医生列表
    async getDoctor() {
      const res = await
      this.$api.doctorInterface.getDoctorList({ pageNo: 1, pageSize: 10000 });
      const { data } = res.data;
      this.doctorList = data.data;
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
      // this.getGridList(); // 获取人员列类别
    },
    onChangePage(current = 1) {
      this.params.pageNo = current;
      this.getUserList();
    },
    search() {
      const hasOnlyStartTime = this.formData.startTime
              && (!this.formData.startTime || !this.formData.endTime);
      const hasOnlyEndTime = this.formData.endTime
              && (!this.formData.startTime || !this.formData.endTime);
      if (hasOnlyStartTime || hasOnlyEndTime) {
        this.$message.error('查询必须包括开始时间和结束时间');
        return;
      }
      if (this.formData.startTime > this.formData.endTime) {
        this.$message.error('查询的开始时间不可大于结束时间');
        return;
      }
      if (this.formData.startTime && this.formData.endTime) {
        this.formData.startTime = dayjs(this.formData.startTime).format('YYYY-MM-DD');
        this.formData.endTime = dayjs(this.formData.endTime).format('YYYY-MM-DD');
      }
      this.params.pageNo = 1;
      this.fetch();
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
    submitAssign(userList) {
      if (!userList.length) {
        this.$message.warning('请选择医生');
        return;
      }
      this.dialogTableVisible = false;
      const userIdList = userList.filter(t => t.selectType === 1).map(t => t.id);
      const workIdList = userList.filter(t => t.selectType === 2).map(t => t.id);

      this.submit({
        clientIdList: this.chooseUserList.map(val => val.id),
        userIdList,
        workIdList,
        type: 2, // 2-分配
      });
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
