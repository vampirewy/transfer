<template>
  <div class="staff-page">
    <div style="margin-bottom:20px;">
      <!-- <el-button
            class="btn-new btnAdd"
            size="small"
            style="margin: 2px 0 12px 0"
            @click="registerOpenFunc"
    ><img src="@/assets/images/common/addBtn.png" />挂号</el-button> -->
      <el-button
              class="btn-new btnAdd"
              size="small"
              @click="handleSomeCloseCase"
              :disabled="noFinish"
              style="color:#fff;background:orange;border:none;"
              v-if="!isTask"
      >结案</el-button>
    </div>
    <p class="abnormal">主检异常：</p>
      <el-table :data="tableData" align="center" class="openTable"
                @selection-change="handleSelectionChange">
        <el-table-column
                prop="abnormalName"
                label="异常结果"
                show-overflow-tooltip>
          <template slot-scope="scope">
                <span>
                  {{scope.row.abnormalName | getResult}}
                </span>
          </template>
        </el-table-column>
        <el-table-column
                prop="levelName"
                label="阳性分级"
                show-overflow-tooltip
        >
        <template slot-scope="scope">
                <span>
                  {{scope.row.levelName | getResult}}
                </span>
          </template></el-table-column>
        <el-table-column prop="advice" label="就诊建议">
          <template slot-scope="scope">
                <span>
                  {{scope.row.advice | getResult}}
                </span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="state" label="状态设置为空">
          <template>
            <div :class="stateColor" @click="isRegister">{{stateShow}}</div>
          </template>
        </el-table-column> -->
      </el-table>
      <!-- <el-pagination
              background
              layout="prev, pager, next, jumper, total, sizes"
              :total="total"
              :page-sizes="[5]"
              :current-page="currentPage"
              :page-size="pageSize"
              @current-change="handleCurrentChange"
      ></el-pagination> -->
      <div style="margin-top:20px;">
        <p class="abnormal">异常指标：</p>
         <el-table :data="tableList" align="center" class="openTable">
           <template v-if="abnormalTable.length === 0">
             <el-table-column
                  prop="itemName"
                  label="项目"
                  show-overflow-tooltip
                  align="center"
            ></el-table-column>
            <el-table-column
                    prop="itemValue"
                    label="数值/说明"
                    show-overflow-tooltip
                    align="center"
            >
            <template slot-scope="scope">
              <span>{{scope.itemValue}}</span>
              <img v-if="scope.itemState === 1" class="iconStyle"
              src="@/assets/images/wdecline.png" alt="">
              <img v-if="scope.itemState === 2" class="iconStyle"
              src="@/assets/images/wrise.png" alt="">
            </template>
            </el-table-column>
           </template>
           <!-- eslint-disable -->
          <template v-else v-for="(val,index) in abnormalTable.length>3?3:abnormalTable.length">
                <el-table-column label="项目" align="center" prop="itemName" show-overflow-tooltip :key="index">
                    <template slot-scope="scope" v-if="scope.$index*3+index<abnormalTable.length">{{abnormalTable[scope.$index*3+index].itemName}}</template>
                </el-table-column>
                <el-table-column label="数值/说明" align="center" prop="itemValue" show-overflow-tooltip :key="index">
                    <template slot-scope="scope" v-if="scope.$index*3+index<abnormalTable.length">
                      <span>{{abnormalTable[scope.$index*3+index].itemValue}}</span>
                      <img v-if="abnormalTable[scope.$index*3+index].itemState === 1" class="iconStyle" src="@/assets/images/wdecline.png" alt="">
                      <img v-if="abnormalTable[scope.$index*3+index].itemState === 2" class="iconStyle" src="@/assets/images/wrise.png" alt="">
                    </template>
                </el-table-column>
            </template>
            <!-- eslint-enable -->
         </el-table>
      </div>
      <!--</template>
    </query-page>-->
    <el-dialog
            title="提示"
            :visible.sync="reservationSuccessShow"
            :modal-append-to-body='false'
            width="380px"
            style="margin-top: 11vh;"
    >
      <div class="reservationInfo">
        <p>您已成功预约{{reservationForm.doctorName}}医生的</p>
        <p class="time">{{reservationForm.activeDate}}
          {{reservationForm.activeDay}}{{reservationForm.activeAmPm === 'am' ? '上午' : '下午'}}，
          {{reservationForm.activeTime}} &nbsp;{{reservationForm.activeNum}}号</p>
        <p>请注意查收预约短信通知！</p>
        <el-button size="small" class="sureBtn" type="primary"
                   @click="reservationSuccessShow = false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import registerOpen from '../../../in_hospital_change/el_modal/registerOpen.vue';
// import deleteIcon from '~/src/assets/images/doctor/tips.png';
import * as dayjs from 'dayjs';
export default {
  name: 'follow_content',
  components: {
    registerOpen,
  },
  props: {
    noFinish: {
      default: false,
      type: Boolean,
    },
    isTask: Boolean,
  },
  data() {
    return {
      abnormalTable: [],
      tableList: [],
      viewIndex: 1, // 1:列表页，2:新增，3:编辑，4:详情
      status: '',
      role: '',
      query: '',
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 100000,
      multipleSelection: [], // 当前页选中的数据
      userForm: {
        clientId: '',
        clientNo: '',
        gender: '',
        age: '',
        clientName: '',
        mobile: '',
        cardNo: '',
        primaFacie: '',
        referralIntro: '',
      },
      nowDate: dayjs(new Date()).format('YYYY-MM-DD'),
      reservationForm: {},
      reservationSuccessShow: false, // 挂号成功
      stateColor: '',
      stateShow: '',
    };
  },
  mounted() {
    // 员工列表
    this.queryList();
    this.getClientUserInfo(this.$route.params.clientId);
    this.getAbnormal();
  },
  methods: {
    isRegister() {
      console.log('分别有挂号、已预约、已就诊、挂号');
      if (this.tableData.state === 1) {
        this.stateColor = 'registerBtn';
        this.registerOpenFunc();
      }
    },
    handleTable() {
      if (this.abnormalTable.length > 0) {
        const num = Math.ceil(this.abnormalTable.length / 3);
        for (let i = 0; i < num; i++) {
          this.tableList.push({});
        }
      }
    },
    handleSelectionChange(val) {
      // table组件选中事件,
      this.multipleSelection = val;
    },
    getClientUserInfo(id) {
      this.$api.userManagerInterface.getDetail(id).then(({ data }) => {
        this.userForm.clientId = this.$route.params.clientId;
        this.userForm.clientNo = data.data.clientNo;
        this.userForm.gender = data.data.gender;
        this.userForm.age = data.data.age;
        this.userForm.clientName = data.data.name;
        this.userForm.mobile = data.data.mobile;
        this.userForm.cardNo = data.data.cardNo;
      });
    },
    search() {
      this.currentPage = 1;
      this.queryList();
    },
    getAbnormal() {
      this.$api.sunFollow.getAbnolmalIndex({
        reportId: this.$route.query.reportId,
      }).then((res) => {
        const { data } = res;
        const result = data.data || {};
        this.abnormalTable = result || [];
        this.handleTable();
      });
    },
    queryList() {
      // 列表
      this.$api.sunFollow.getAbnormalInfo({
        // clientId: this.$route.params.clientId,
        // sourceType: this.$route.params.sourceType, // 请求来源 1-首次跟踪列表进入 2-跟踪回访任务列表进入
        reportId: this.$route.query.reportId,
        pageSize: this.pageSize,
        pageNo: this.currentPage,
      }).then((res) => {
        const { data } = res;
        const result = data.data || {};
        this.total = data.data.length;
        this.tableData = result || [];
        // this.tableData.state = 1;
        // if (this.tableData.state === 1) {
        //   this.stateColor = 'registerBtn';
        //   this.stateShow = '挂号';
        // } else if (this.tableData.state === 2) {
        //   this.stateColor = 'appointState';
        //   this.stateShow = '已预约';
        // } else if (this.tableData.state === 3) {
        //   this.stateColor = 'visitState';
        //   this.stateShow = '已就诊';
        // }
        // this.emitTable();
      });
    },
    /* toCloseCase(row) {
      const Row = row;
      let sendDataVal;
      let msg;
      if (Row.isCloseCase === 1) {
        msg = '确定取消结案？';
        sendDataVal = 2;
      } else if (Row.isCloseCase === 2) {
        msg = '确定结案？';
        sendDataVal = 1;
      }
      this.$confirm(`<div class="delete-text-content">
      <img class="delete-icon" src="${deleteIcon}"/><span>${msg}</span></div>`, '提示', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'message-box-customize',
        showClose: true,
      }).then(
        async () => {
          const idsList = [{ positiveTrackingId: Row.id, isCloseCase: sendDataVal }];
          const reqBody = {
            clientId: this.$route.params.clientId,
            contentSaveRequests: idsList,
          };
          await this.$api.sunFollow.getClientPositiveCloseCase(reqBody);
          this.$message.success('操作成功');
          return this.queryList();
        },
      );
    },*/
    /**
     * 批量结案
     */
    handleSomeCloseCase() {
      // if (this.multipleSelection.length === 0) {
      //   this.$message({
      //     message: '请选择要结案的数据',
      //     type: 'warning',
      //   });
      //   return;
      // }
      // this.multipleSelection.forEach((value) => {
      //   value.isCloseCase = 1;
      // });
      this.emitTable();
    },
    changeState(row) {
      if (row.state === 3) {
        row.isCloseCase = 1;
      } else {
        row.isCloseCase = 2;
      }
      this.emitTable();
    },
    emitTable() {
      this.$emit('getTable', 2);
    },
    /**
     * 查看
     */
    registerOpenFunc() {
      const Row = Object.assign({}, this.userForm);
      this.$jDynamic.show({
        component: 'registerOpen',
        data: {
          modalTitle: '预约挂号',
          propsData: Row,
          confirmfunc: async (value) => {
            console.log(value);
            this.reservationForm = value;
            this.reservationSuccessShow = true;
          },
        },
        render: h => h(registerOpen),
      });
    },
    // handleCurrentChange(page) {
    //   this.currentPage = page;
    //   this.queryList();
    // },
  },
};
</script>

<style lang="scss" scoped>
  .el-pagination {
    margin: 20px 0 0;
    text-align: right;
  }
  /*/deep/ .el-table .el-table__header-wrapper th{
    padding: 13px 0!important;
  }*/
  .warnRed{
    border: 1px solid #F33D21;
    border-radius: 50px;color: #F33D21;
    font-size: 12px;
    padding: 2px 9px;
  }
  .warnYellow{
    border: 1px solid #FA912B;
    border-radius: 50px;color: #FA912B;
    font-size: 12px;
    padding: 2px 9px;
  }
  .staff-page {
    .query-container {
      margin-bottom: 40px;
      display: flex;
      justify-content: space-between;
      .left {
        .el-input {
          display: inline-block;
          width: 266px;
        }
      }
      .right {
        display: flex;
        .el-button + .el-button {
          margin-left: 8px;
        }
      }
    }
    .table-buttons {
      margin-bottom: 16px;
    }
  }
  .reservationInfo{
    text-align: center;
    font-size: 14px;
    color: #333333;
    .time{
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 24px;
      margin-top: 3px;
    }
    .sureBtn{
      margin-top: 24px;
    }
  }
  .abnormal{
    color: #333;
    font-size: 14px;
    margin: 5px 0;
  }
  .registerBtn{
    cursor: pointer;
    color: #02A7F0;
  }
  .appointState{
    color: #7F7F7F;
  }
  .visitState{
    color: #AAAAAA;
  }
  /deep/ .el-table .cell {
    display: flex;
    .iconStyle{
      width: 18px;
      margin-left: 5px;
    }
  }
</style>
