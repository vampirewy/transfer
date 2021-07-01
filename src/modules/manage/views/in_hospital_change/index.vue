<template>
  <div>
  <div class="divTop">
    <div class="divTitle">
      <span><img src="@/assets/images/common/titleLeft.png" alt=""></span>
      院内转诊
    </div>
    <div class="searchCondition">
      <div class="searchLeft">
        <div class="searchInputFormItem">
          <el-input placeholder="姓名/订单编号/科室" v-model="form.keywords">
          </el-input>
          <span class="searchBtnImgSpan" @click="onSearch">
                  <img class="searchBtnImg" src="@/assets/images/common/topsearch.png"/>
              </span>
        </div>
        <div>
          <span>就诊状态：</span>
          <el-select
                  v-model="form.state"
                  placeholder="请选择"
                  style="width: 140px"
                  clearable
          >
            <el-option label="待确认" :value="0"></el-option>
            <el-option label="已取消" :value="1"></el-option>
            <el-option label="待就诊" :value="2"></el-option>
            <el-option label="已就诊" :value="3"></el-option>
          </el-select>
        </div>
        <div style="margin-top: 10px;">
          <span>预约时间：</span>
          <el-date-picker
                  v-model="form.startTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  :max-date="form.endTime"
                  placeholder="开始时间"
                  style="width: 140px"
          >
          </el-date-picker>
          <span class="timing">-</span>
          <el-date-picker
                  v-model="form.endTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  :min-date="form.startTime"
                  placeholder="结束时间"
                  style="width: 140px"
          >
          </el-date-picker>
        </div>
      </div>
      <div class="searchRight">
        <div class="buttones">
          <div class="searchFor" @click="onSearch(1)">
            <img src="@/assets/images/common/topsearchblue.png" alt="">
          </div>
          <div class="resetAll" @click="onReset">重置</div>
        </div>
      </div>
    </div>
  </div>
    <div class="topbottomborder"></div>
    <div class="divRightTitleDiv">
      <!-- <div class="divRightTitle"><span>|</span>客户池</div> -->
      <div style="display: flex;justify-content: space-between;align-items: center;">
        <div><el-button
                class="btn-new btnAdd"
                size="small"
                style="margin: 16px 0"
                @click="add"
        ><img src="@/assets/images/common/addBtn.png" />新增</el-button>
        <el-button
                class="btn-new btnAdd"
                size="small"
                @click="exportList"
        ><img src="@/assets/images/common/export.png" />导出</el-button>
        </div>
      </div>
    </div>
  <div class="user-follow">
    <el-table :data="table.list" style="width: 100%" align="center" ref="table"
              @selection-change="handleSelectionChange"
             >
      <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column prop="orderNo" label="订单编号" min-width="80px" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.orderNo | getResult}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="80"
      >
        <template slot-scope="scope">
             <span class="clientName"
                   @click="commonHref.toPersonalHealth(scope.row.clientId, $router)">
               {{ scope.row.clientName | getResult}}
             </span>
        </template>
      </el-table-column>
      <el-table-column prop="clientNo" label="客户编号" min-width="100px" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.clientNo | getResult}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="clientPhone" label="手机号码" min-width="90px">
        <template slot-scope="scope">
          <span>{{ scope.row.clientPhone | getResult }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="departmentName" label="就诊科室"  min-width="80px">
        <template slot-scope="scope">
          <span>{{ scope.row.departmentName | getResult }}</span>
        </template>
      </el-table-column>
      <el-table-column label="就诊医生" prop="doctorName" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.doctorName | getResult}}</span>
        </template>
      </el-table-column>
      <el-table-column label="预约时间" prop="appointmentDate" min-width="120px" show-overflow-tooltip>
        <template slot-scope="scope">
          <span v-if="!scope.row.appointmentDate"> - </span>
          <span v-else>{{ scope.row.appointmentDate}} {{ scope.row.appointmentHourStart}}
            ~ {{ scope.row.appointmentHourEnd}}</span>
        </template>
      </el-table-column>
      <el-table-column label="费用" prop="price" min-width="70px" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.price | getResult}}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="result" min-width="90px">
        <template slot-scope="scope">
              <span class="warnStatus2" v-if="scope.row.state === 2">
                待就诊
              </span>
              <span v-if="scope.row.state === 3">
                已就诊
              </span>
              <span class="warnStatus1" v-if="scope.row.state === 1">
                已取消
              </span>
              <span class="warnStatus0" v-if="scope.row.state === 0">
                待确认
              </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="130">
        <template slot-scope="scope">
          <el-button
                  v-if="scope.row.state === 0 || scope.row.state === 2"
                  type="text"
                  size="small"
                  @click="cancelReservation(scope.row)"
          >取消预约</el-button>
          <el-button
                  type="text"
                  size="small"
                  @click="handleView(scope.row)"
          >查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      @current-change="handleChange"
      :current-page="table.pageNo"
      :page-size="table.pageSize"
      layout="prev, pager, next, jumper, total, sizes"
      :total="table.totalCount"
      :pageSizes="[15]"
    >
    </el-pagination>
  </div>
    <!--</template>
  </query-page>-->
  </div>
</template>

<script>
import deleteIcon from '~/src/assets/images/common/editIcon.png';
import detail from './detail.vue';
export default {
  name: 'in_hospital_change',
  components: {
    detail,
  },
  data() {
    return {
      upload_url: process.env.api.upload_url,
      warnType: 0,
      form: {
        keywords: '', // 关键字
        state: '',
        startTime: '',
        endTime: '',
      },
      abnormalModalVisible: false, // 异常列表弹窗
      selectPlanuser: [],
      planuserModalVisible: false, // 干预人人列表弹窗
      selectAbnormal: [],
      gridList: [], // 人员类别下拉框
      expands: [],
      getRowKeys: row => row.id,
      expandData: {
        clientId: '',
        pageNo: 1,
        pageSize: 5,
        total: 0,
        list: [],
      },
      expandRecordData: {
        clientId: '',
        pageNo: 1,
        pageSize: 5,
        total: 0,
        list: [],
      },
      loading: false,
      // expandData: [], // 随访计划值
      expandDataRecord: [], // 随访记录值
      expandDataClintId: '',
      excuteType: '',
      table: {
        list: [],
        totalCount: 0,
        pageNo: 1,
        pageSize: 15,
      },
      tablePlan: {
        list: [],
        totalCount: 0,
        pageNo: 1,
        pageSize: 1,
      },
      multipleSelection: [], // 当前页选中的数据
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.onLoad();
    });
  },
  methods: {
    handleSelectionChange(val) {
      // table组件选中事件,
      this.multipleSelection = val;
    },
    onLoad() {
      this.getList();
    },
    /**
     * 获取列表
     * @return {Promise<void>}
     */
    async getList() {
      const reqBody = Object.assign({ pageNo: this.table.pageNo,
        pageSize: this.table.pageSize }, this.form);
      if (this.form.startTime) {
        reqBody.startTime = `${this.form.startTime} 00:00:00`;
      }
      if (this.form.endTime) {
        reqBody.endTime = `${this.form.endTime} 23:59:59`;
      }
      const res = await this.$api.InhospitalChange.getRegistrationListPage(reqBody);
      /* const res = {
        data: {
          data: {
            data: [
              { id: '1',
                orderNo: '202104089696',
                clientNo: '2021015898745',
                name: '吴白',
                mobile: '15058969965',
                fee: '239.00',
                gender: 1,
                age: 30,
                status: 1,
                subjectName: '内科',
                doctor: '陈良',
                createdTime: '2021-04-27 14：00',
              },
              { id: '2',
                orderNo: '202104089697',
                clientNo: '20210213987451',
                name: '王新一',
                mobile: '13759856698',
                gender: 1,
                age: 20,
                fee: '600.00',
                status: 2,
                subjectName: '内科',
                doctor: '陈良',
                createdTime: '2021-04-27 18：00',
              },
              { id: '3',
                orderNo: '202104079666',
                clientNo: '2021021398754',
                name: '李心',
                mobile: '15868891236',
                gender: 1,
                age: 20,
                fee: '300.00',
                status: 3,
                subjectName: '内科',
                doctor: '陈良',
                createdTime: '2021-04-27 18：00',
              },
            ],
            total: 3,
          },
        },
      };*/
      const { data } = res.data;
      console.log(data);
      if (data) {
        this.table.list = data.data || [];
        this.table.totalCount = data.total;
        console.log(this.table.list);
      }
    },
    /**
     * 导出列表
     * @return {Promise<void>}
     */
    async exportList() {
      const reqBody = Object.assign({ pageNo: 1,
        pageSize: 999999 }, this.form);
      const res = await this.$api.InhospitalChange.exportRegistrationListPage(reqBody);
      const { data } = res.data;
      window.open(this.upload_url + data);
    },
    /**
     * 取消预约
     */
    cancelReservation(row) {
      this.$confirm(`<div class="delete-text-content"><img class="delete-icon" src="${deleteIcon}"/><span>该操作无法撤销，是否确认取消预约！</span></div>`, '取消提示', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'message-box-customize',
        showClose: true,
      }).then(
        async () => {
          const reqBody = {
            id: row.id,
            state: 1,
          };
          await this.$api.InhospitalChange.upstateRegistrationState(reqBody);
          this.$message.success('操作成功');
          return this.getList();
        },
      );
    },
    add() {
      this.$router.push({
        path: '/in_hospital_change_create',
      });
    },
    handleView(row) {
      /* this.$router.push({
        path: `/in_hospital_change_detail/${row.id}`,
      });*/
      const Row = { id: row.id };
      this.$jDynamic.show({
        component: 'detail',
        data: {
          modalTitle: '挂号详情',
          propsData: Row,
          confirmfunc: async (value) => {
            console.log(value);
          },
        },
        render: h => h(detail),
      });
    },
    /**
     * 搜索
     */
    onSearch() {
      this.table.pageNo = 1;
      this.getList();
    },
    /**
     * 重置
     */
    onReset() {
      Object.assign(this.$data, this.$options.data());
      this.table.pageNo = 1;
      this.onLoad();
    },
    /**
     * 关闭
     * @param scope
     */
    handleClose(scope) {
      this.$confirm('确定要关闭吗?', '提示', { type: 'warning' }).then(
        async () => {
          const reqBody = {
            id: scope.id,
            organId: '', // 区域id
            clientId: '', // 客户id
            planWay: scope.planWay, // 计划干预方式
            planTitle: scope.planTitle, // 随访标题
            planContent: scope.planContent, // 随访内容
            planDate: scope.planDate, // 计划日期
            planRemark: scope.planRemarrk, // 计划备注
            executeState: '4', // 执行状态关闭-值为4
            executePlanWay: '', // 执行干预方式
            executePlanContent: '', // 执行内容
            assortLevel: scope.assortLevel, // 配合度 系统参数
            collectionQuestionType: scope.collectionQuestionType, // 需要收集的问卷类型
          };
          await this.$api.userFollowInterface.intervenePlanUpdate(reqBody);
          this.$message.success('操作成功');
          return this.getList();
        },
      );
    },
    /**
     * 分页
     * @param target
     */
    handleChange(target) {
      // 改变页的时候调用一次，改变每页显示条数的时候也要调用一次
      this.table.pageNo = target;
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped>
  /deep/ .select-user-trigger {
    line-height: 37px;
    input, i {
      cursor: pointer;
    }
    &.disabled {
      input, i {
        cursor: not-allowed;
      }
    }
    .el-input__suffix{
      width: 25px;
    }
  }
  /deep/ .el-input.is-disabled .el-input__inner{
    background-color: white;
    border-color: white;
    cursor: pointer;
  }
.user-follow {
  .tablePlanColumn{
      background: #f7f7fd;
  }
  /deep/ .el-table td{
    padding: 3px 0!important;
  }
  /deep/ .el-table__expand-column .el-icon{
    visibility:hidden;
  }
  /deep/ .el-table__expanded-cell {
    padding: 0;
    .el-table .el-table__header-wrapper th {
      background: #EEF1F5;
      padding: 13px 0;
      .cell {
        color: #333;
      }
    }
    .el-table--enable-row-hover .el-table__body tr:hover > td {
      background-color: #f7f7fd;
    }
    .el-table .el-table__body td {
      background-color: white;
      padding: 3px 0!important;
    }
  }
  /*padding: 20px 32px 15px 32px;*/
  .tool-button {
    margin-bottom: 16px;
  }
  .search-btn {
    float: right;
    margin-right: 0;
  }
  /*.el-button + .el-button {
    margin-left: 8px;
  }*/
  .el-pagination {
    padding: 10px 0;
    text-align: right;
  }
}
 .warnStatus0{
   color: #F33D21;
 }
  .warnStatus1{
    color: #B4BBC9;
  }
  .warnStatus2{
    color: #FA912B;
  }
</style>
