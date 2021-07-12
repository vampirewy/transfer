<template>
  <div class="staff-page">
    <div><el-button
            class="btn-new btnAdd"
            size="small"
            style="margin: 2px 0 12px 0"
            @click="registerOpenFunc"
    ><img src="@/assets/images/common/addBtn.png" />挂号</el-button>
      <el-button
              class="btn-new btnAdd"
              size="small"
              @click="handleSomeCloseCase"
      ><img src="@/assets/images/common/over.png" />结案</el-button>
    </div>
      <el-table :data="tableData" align="center" class="openTable"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="35"></el-table-column>
        <el-table-column
                prop="itemName"
                label="项目名称"
                width="80px"
                show-overflow-tooltip
        ></el-table-column>
        <el-table-column
                prop="itemValue"
                label="结果"
                show-overflow-tooltip>
          <template slot-scope="scope">
                <span :class="scope.row.reportLv === 1 ? 'warnRed' : 'warnYellow'">
                  {{scope.row.itemValue}}
                </span>
          </template>
        </el-table-column>
        <el-table-column
                prop="reportDate"
                label="上报时间"
                show-overflow-tooltip
        ></el-table-column>
        <el-table-column
                 v-if="$route.params.sourceType === '2'"
                prop="nextTrackingDate"
                label="计划跟踪"
                 width="98px"
                show-overflow-tooltip
        >
          <template slot-scope="scope">
                <span :style="{'color': nowDate === scope.row.nextTrackingDate ?
                '#F33D21' : '#333333'}">
                  {{scope.row.nextTrackingDate}}
                </span>
          </template>
        </el-table-column>
        <el-table-column
                prop="createTime"
                label="跟踪结果"
                min-width="120px"
        >
          <template slot-scope="scope">
            <el-select
                    v-model="scope.row.state"
                    placeholder="请选择"
                    style="width: 110px"
                    @change="changeState(scope.row)"
            >
              <el-option :label="item.name" :value="item.paramValue"  :key="index"
                         v-for="(item, index) in stateList"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
                prop="createTime"
                label="跟踪结案"
                show-overflow-tooltip
                min-width="75"
        >
          <template slot-scope="scope">
            <el-switch v-model="scope.row.isCloseCase"
                       @change="emitTable"
                       :active-value="1"
                       :inactive-value="2"
                       active-color="#13ce66">
            </el-switch>
            <!--<el-button
                    type="text"
                    size="small"
            >挂号</el-button>-->
            <!--<el-button
                    v-if="scope.row.isCloseCase === 1"
                    type="text"
                    size="small"
                    @click="toCloseCase(scope.row)"
            >取消结案</el-button> &lt;!&ndash;已结案数据&ndash;&gt;
            <el-button
                    v-if="scope.row.isCloseCase === 2"
                    type="text"
                    size="small"
                    @click="toCloseCase(scope.row)"
            >结案</el-button> &lt;!&ndash;未结案数据&ndash;&gt;-->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
              background
              layout="prev, pager, next, jumper, total, sizes"
              :total="total"
              :page-sizes="[15]"
              :current-page="currentPage"
              :page-size="pageSize"
              @current-change="handleCurrentChange"
      ></el-pagination>
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
  data() {
    return {
      viewIndex: 1, // 1:列表页，2:新增，3:编辑，4:详情
      status: '',
      role: '',
      query: '',
      stateList: [],
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 15,
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
    };
  },
  mounted() {
    this.getSystemParamBySC002();
    // 员工列表
    this.queryList();
    this.getClientUserInfo(this.$route.params.clientId);
  },
  methods: {
    handleSelectionChange(val) {
      // table组件选中事件,
      this.multipleSelection = val;
    },
    async getSystemParamBySC002() {
      const res = await this.$api.userManagerInterface.getSystemParamByCode('SC002');
      const { data } = res.data;
      this.stateList = data;
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
    queryList() {
      // 列表
      this.$api.sunFollow.getClientPositiveContent({
        clientId: this.$route.params.clientId,
        sourceType: this.$route.params.sourceType, // 请求来源 1-首次跟踪列表进入 2-跟踪回访任务列表进入
      }).then((res) => {
        const { data } = res;
        const result = data.data || {};
        this.total = data.data.length;
        result.forEach((val) => {
          val.state = '';
        });
        this.tableData = result || [];
        this.emitTable();
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
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: '请选择要结案的数据',
          type: 'warning',
        });
        return;
      }
      this.multipleSelection.forEach((value) => {
        value.isCloseCase = 1;
      });
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
      this.$emit('getTable', this.tableData);
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
    handleCurrentChange(page) {
      this.currentPage = page;
      this.queryList();
    },
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
</style>
