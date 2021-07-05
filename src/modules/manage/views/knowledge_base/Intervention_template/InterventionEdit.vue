<template>
  <div class="userManage">
        <!-- <div class="divTop">
          <div class="divTitle">
            <span><img src="@/assets/images/common/titleLeft.png" alt=""></span>
            编辑计划</div>
        </div> -->
        <div class="form-title">
          <div class="line"></div>
          <h3 class="name">编辑计划</h3>
        </div>
        <el-row>
          <el-col :span="6">
              <div class="isEnabled"><span>模板名称：</span>{{templateName}}</div>
        </el-col>
        <el-col :span="6">
          <div class="isEnabled">
            <span>是否启用：</span>
                <el-switch
                  v-model="isstate"
                  :active-value="1"
                  :inactive-value="0"
                  active-color="#13ce66"
                  >
                </el-switch>
          </div>
        </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="isEnabled"><span>模板条件：</span>{{qualification}}</div>
          </el-col>
        </el-row>
        <!-- <div class="divTop">
          <div class="divTitle">
            <span><img src="@/assets/images/common/titleLeft.png" alt=""></span>
            计划列表</div>
        </div> -->
        <div class="form-title">
          <div class="line"></div>
          <h4 class="name">计划列表</h4>
        </div>
        <div class="divRightTitleDiv">
          <div>
            <el-button
                    class="btn-new btnAdd"
                    size="small"
                    style="margin: 16px 0"
                    @click="InterventionAdd()"
            ><img src="@/assets/images/common/addBtn.png" />新增</el-button>
            <el-button
                    size="small"
                    class="btn-new btnDel"
                    @click="handleSomeRemove"
                    v-if="getAccess('customer_pool_batch_delete')"
            ><img src="@/assets/images/common/delBtn.png" />删除</el-button>
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
            <el-table-column type="selection" min-width="40"></el-table-column>
            <el-table-column label="阶段" prop="month" min-width="80" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>
                  {{ scope.row.month }}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="干预形式" prop="planWayTxt" min-width="80" show-overflow-tooltip />
            <el-table-column label="主要内容" prop="planContent" min-width="80" show-overflow-tooltip />
            <el-table-column label="干预提示" prop="day" min-width="80" show-overflow-tooltip />
            <!-- <el-table-column label="附件" prop="attachment">
              <template slot-scope="scope">
                <div
                class="elbutton"
                @click="
                  $router.push({
                    name: 'user_edit',
                    params: {
                      userId: scope.row.id,
                    },
                  })
                ">
                  查看
                </div>
              </template>
            </el-table-column> -->
            <el-table-column label="操作" prop="index"  width="150">
              <template slot-scope="scope">
                <el-button
                        type="text"
                        size="small"
                        @click="edits(scope.row)"
                        v-if="getAccess('customer_pool_edit')"
                >编辑</el-button>
                <el-button type="text"
                        size="small"
                        style="color:#DDE0E6"
                        >|</el-button>
                <el-button
                        type="text"
                        size="small"
                        @click="LookInfo(scope.row)"
                >查看</el-button
                >
                <!-- <el-button
                        class="font-enable"
                        type="text"
                        size="small"
                        @click="changeStatus(scope, '1')"
                        v-if="
                  scope.row.state === '0' &&
                    getAccess('customer_pool_on_off')
                "
                >启用</el-button
                >
                <el-button
                        class="font-disable"
                        type="text"
                        size="small"
                        @click="changeStatus(scope, '0')"
                        v-if="
                  scope.row.state === '1' && scope.row.healthManageId !== '1' &&
                    getAccess('customer_pool_on_off')
                "
                >禁用</el-button
                > -->
              </template>
            </el-table-column>
          </el-table>
          <!-- <div style="text-align: right">
            <el-pagination
                    style="margin-top: 15px"
                    @current-change="onChangePage"
                    background
                    layout="prev, pager, next, jumper, total, sizes"
                    :total="total"
                    :pageSizes="[15]"
                    :page-size="15"
            ></el-pagination>
          </div> -->
        </div>
      <!-- </template> -->
    <edit-detail
      v-if="modalVisible"
      :visible="modalVisible"
      :value="currentValue"
      :id="valueid"
      :interveneTemplateId="ids"
      @cancel="cancel"
    ></edit-detail>
    <edit-detail-info
      v-if="modalVisibleInfo"
      :visible="modalVisibleInfo"
      :id="valueidInfo"
      @cancels="cancels"
    ></edit-detail-info>
    <div class="handle-btn mt30 mb30">
      <el-button class="reset-btn" size="small" @click="goBack"
        >返回</el-button>
      <!-- <el-button class="add-btn" type="primary" size="small" @click="submit"
        >保存</el-button> -->
    </div>
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
import editDetail from './components/edit_detail.vue';
import editDetailInfo from './components/edit_detail_info.vue';

export default {
  name: 'index',
  components: {
    // 'assign-dialog': assignDialog,
    // 'doctor-Select': doctorSelect,
    Search,
    QueryPage,
    QueryFilter,
    editDetail,
    editDetailInfo,
  },
  data() {
    return {
      isstate: 0,
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
        gridId: '',
        doctorId: '',
        keywords: '',
        gender: '',
        genderType: '',
        startTime: '',
        endTime: '',
      },
      params: {
        pageNo: 1,
        pageSize: 15,
        interveneTemplateId: this.$route.params.id,
      },
      isCollapse: true,
      modalVisible: false,
      modalVisibleInfo: false,
      currentValue: {},
      ids: this.$route.params.id,
      templateName: '', // 模板名称
      qualification: '', // 模板名称
      valueid: '', // 当前id
      valueidInfo: {}, // 查看详情
    };
  },
  mounted() {
    // this.getUserList();
    // this.getGridList(); // 获取人员列类别
    // this.getDoctor(); // 获取医生列表
    // this.getDetail();
    this.fetch();
    this.TemplateList();
  },
  methods: {
    TemplateList() {
      this.$api.medicalHistoryInterface.updateInterveneTemplate(this.ids).then((res) => {
        const { data } = res.data;
        this.templateName = data.name;
        this.isstate = data.state;
        this.qualification = data.conditionTxt;
        // console.log(data, 'sdadas');
      });
    },
    async getDetail() {
      const reqBody = { id: this.ids };
      const res = await this.$api.interventionTemplateInterface.getInterveneTemplateById(
        reqBody,
      );
      const { data } = res.data;
      // console.log(data);
      this.templateName = data.name;
      if (data.state === 1) {
        this.isstate = true;
      } else {
        this.isstate = false;
      }
      this.qualification = data.qualification;
    },
    fetch() {
      this.$api.interventionTemplateInterface
        .getInterveneTemplatePlanList(this.params.interveneTemplateId)
        .then(({ data }) => {
          if (data.success) {
            this.total = data.total;
            this.dataSource = data.data;
            console.log(this.dataSource);
          }
        });
    },
    LookInfo(row) {
      this.valueidInfo = row;
      this.modalVisibleInfo = true;
      this.modalVisible = false;
    },
    // 展开更多
    upMore() {
      this.isTrue = !this.isTrue;
    },
    // 新增
    InterventionAdd() {
      // console.log('12312313');
      // this.$router.push({
      //   name: 'InterventionAdd',
      // });
      // console.log(this.ids, 'asdasd');
      this.valueid = '';
      this.modalVisible = true;
    },
    edits(row) {
      this.currentValue = row;
      this.valueid = row.id;
      this.modalVisible = true;
      this.modalVisibleInfo = false;
      // console.log(this.ids, this.valueid, 'asdasdasd');
    },
    cancel() {
      this.modalVisible = false;
      this.modalVisibleInfo = false;
      this.fetch();
    },
    cancels() {
      this.modalVisibleInfo = false;
      // this.fetch();
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
          interveneTemplatePlanIds: this.chooseUserList.map(user => user.id),
        };
        this.$api.interventionTemplateInterface.removeInterveneTemplatePlan(params).then(({
          data,
        }) => {
          if (data.success) {
            this.$message.success('操作成功');
            this.fetch();
            // this.search();
            // this.chooseUserList = [];
            // this.$refs.multipleTable.clearSelection();
          }
        });
      });
    },
    reset() {
      Object.assign(this.$data, this.$options.data());
      this.getUserList();
      this.getGridList(); // 获取人员列类别
    },
    onChangePage(current = 1) {
      this.params.pageNo = current;
      this.fetch();
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

    // changeStatus({ row = {} }, status) {
    //   const setRow = row;
    //   this.$api.userManagerInterface.editUserStatus({
    //     id: setRow.id,
    //     state: status,
    //   }).then(({ data }) => {
    //     if (data.code === 200) {
    //       this.$message.success('操作成功');
    //       setRow.state = status;
    //     }
    //   });
    // this.$confirm(
    // `<div class="delete-text-content"><img class="delete-icon"
    // src="${deleteIcon}"/><span>您确定要改变该病人状态吗？</span></div>`,
    //   '提示',
    //   {
    //     dangerouslyUseHTMLString: true,
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     customClass: 'message-box-customize',
    //     showClose: true,
    //   },
    // ).then(() => {
    //   this.$api.userManagerInterface
    //     .editUserStatus({
    //       id: setRow.id,
    //       state: status,
    //     })
    //     .then(({ data }) => {
    //       if (data.code === 200) {
    //         this.$message.success('操作成功');
    //         setRow.state = status;
    //       }
    //     });
    // });
    // },
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
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
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
  .isEnabled{
    font-size: 14px;
    color: #666666;
    margin: 10px 0 0 25px;
  }
  .divTitle{
    margin-top: 20px;
  }
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
.handle-btn {
    text-align: center;
    margin-top: 30px;
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
