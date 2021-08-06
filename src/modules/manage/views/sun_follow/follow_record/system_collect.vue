<template>
  <div>
  <div class="divTop">
    <div class="divTitle" style="margin-top:15px;">
      <span><img src="@/assets/images/common/titleLeft.png" alt=""></span>
      跟踪记录
    </div>
    <div class="searchCondition">
      <div class="searchLeft">
        <div class="searchInputFormItem">
          <el-input placeholder="姓名/编号" v-model="form.keywords">
          </el-input>
          <span class="searchBtnImgSpan" @click="onSearch">
                  <img class="searchBtnImg" src="@/assets/images/common/topsearch.png"/>
              </span>
        </div>
        <div>
          <span>阳性分级：</span>
          <el-select
                  v-model="form.positiveLevel"
                  placeholder="请选择"
                  style="width: 140px"
                  clearable
          >
            <el-option :label="item.name"
            :value="item.paramValue" :key="index" v-for="(item, index) in levelList"></el-option>
          </el-select>
        </div>
        <div class="abnormalStyle">
          <span>异常结果：</span>
          <el-input placeholder="请输入" v-model="form.abnormalResult">
          </el-input>
        </div>
         <div>
        <span>主检时间：</span>
        <el-date-picker
                v-model="form.zjStartTime"
                type="date"
                value-format="yyyy-MM-dd"
                :max-date="form.zjEndTime || new Date()"
                placeholder="开始时间"
                style="width: 140px"
        >
        </el-date-picker>
        <span class="timing">-</span>
        <el-date-picker
                v-model="form.zjEndTime"
                type="date"
                value-format="yyyy-MM-dd"
                :min-date="form.zjStartTime"
                :max-date="new Date()"
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
          <div class="more" v-if="isTrue"  @click="upMore">
            <span>></span>
            展开更多</div>
          <div class="more noMore" v-else @click="upMore">
            <span>></span>收起筛选</div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="!isTrue" class="searchCondition">
    <div class="searchLeft" style="padding-left:5px;">
      <div>
        <span>管理医生：</span>
        <el-select
                v-model="form.manageDoctorId"
                placeholder="请选择"
                style="width: 140px"
                clearable
        >
          <el-option :label="item.realName" :value="item.id" v-for="(item, index) in doctorList"
                     :key="index"></el-option>
        </el-select>
      </div>
      <div v-if="dataRange">
        <span>回访医生：</span>
        <el-select
                v-model="form.visitDoctorId"
                placeholder="请选择"
                style="width: 140px"
                clearable
        >
          <el-option :label="item.realName" :value="item.id" v-for="(item, index) in doctorList"
                     :key="index"></el-option>
        </el-select>
      </div>
      <div>
        <span>体检时间：</span>
        <el-date-picker
                v-model="form.minReportDate"
                type="date"
                value-format="yyyy-MM-dd"
                :max-date="form.maxReportDate || new Date()"
                placeholder="开始时间"
                style="width: 140px"
        >
        </el-date-picker>
        <span class="timing">-</span>
        <el-date-picker
                v-model="form.maxReportDate"
                type="date"
                value-format="yyyy-MM-dd"
                :min-date="form.minReportDate"
                :max-date="new Date()"
                placeholder="结束时间"
                style="width: 140px"
        >
        </el-date-picker>
      </div>
      <div>
        <span>所属企业</span>
        <el-select
                v-model="form.workUnitId"
                placeholder="请选择"
                style="width: 140px"
                clearable>
          <el-option :label="item.unitName" :value="item.unitId" v-for="(item, index) in unitList"
                :key="index"></el-option>
        </el-select>
      </div>
    </div>
  </div>
    <div class="topbottomborder"></div>
    <div class="divRightTitleDiv">
      <!-- <div class="divRightTitle"><span>|</span>客户池</div> -->
      <div style="display: flex;justify-content: space-between;align-items: center;">
        <div>
        <!--<el-button  产品说先隐藏 功能已对接好
                class="btn-new btnAdd"
                size="small"
                style="margin: 16px 0;"
                @click="exportList"
                v-if="getAccess('follow_record_export')"
        ><img src="@/assets/images/common/export.png" />导出</el-button>-->
        </div>
        <div style="margin: 16px 0">
        </div>
      </div>
    </div>
  <div class="user-follow">
    <el-table :data="table.list" style="width: 100%" align="center" ref="table"
              @selection-change="handleSelectionChange"
              :row-key="getRowKeys"
              class="openTable"
              @expand-change="handleExpandChange">
      <el-table-column type="expand" width="1" class-name="hide-expand-column">
        <el-table :data="expandData.list" class="expand-table" align="center">
          <el-table-column
          label="跟踪时间"
          prop="trackDate"
          min-width="90px"
          show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row.trackDate | getResult}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="跟踪人"
            prop="visitDoctorName"
            min-width="80px">
            <template slot-scope="scope">
              <span>{{ scope.row.visitDoctorName | getResult }}</span>
            </template>
          </el-table-column>
         <el-table-column label="跟踪方式" prop="trackWay"
                           width="90px" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.trackWay | getResult}}</span>
            </template>
          </el-table-column>
           <el-table-column
            label="跟踪结果"
            prop="result"
            min-width="80px">
            <template slot-scope="scope">
              <span>
                {{ scope.row.result | getResult }}
              </span>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align: right">
          <el-pagination
                  style="margin-top: 10px!important;"
                  @current-change="handleExpandPageChange"
                  background
                  layout="prev,pager,next,jumper,total,sizes"
                  :total="expandData.total"
                  :page-size="expandData.pageSize"
                  :current-page="expandData.pageNo"
                  :hide-on-single-page="true"
                  :pageSizes="[5]"
          ></el-pagination>
        </div>
      </el-table-column>
      <!-- <el-table-column type="selection" width="40"></el-table-column> -->
      <el-table-column prop="clientId" label="客户编号" min-width="100px" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.clientId | getResult}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="reportNo" label="体检编号" min-width="100px" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.reportNo | getResult}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="90"
      >
        <template slot-scope="scope">
             <span class="clientName"
                   @click="commonHref.toPersonalHealth(scope.row.clientId, $router)">
               {{ scope.row.clientName | getResult}}
             </span>
        </template>
      </el-table-column>
      <el-table-column prop="gender" label="性别" width="60px">
        <template slot-scope="scope">
          <span>{{scope.row.gender | getResultGender}}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属企业" prop="workUnitName" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.workUnitName | getResult }}</span>
        </template>
      </el-table-column>
      <el-table-column label="体检时间" prop="reportDate" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.reportDate | getResult }}</span>
        </template>
      </el-table-column>
      <el-table-column label="主检医生" prop="zjDoctor" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.zjDoctor | getResult }}</span>
        </template>
      </el-table-column>
      <el-table-column label="主检时间" prop="zjDate" min-width="115px" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.zjDate | getResult }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上报时间" prop="reportDate" min-width="115px" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.reportDate | getResult}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="abnormalResult" label="异常结果" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.abnormalResult | getResult }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="levelName" label="阳性分级" show-overflow-tooltip>
        <template slot-scope="scope">
          <span
          :class="{warnRed : scope.row.positiveLevel === 1}"
          >{{ scope.row.levelName | getResult }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="doctorName" label="管理医生" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.doctorName | getResult }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="visitDoctorName" label="回访医生" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.visitDoctorName | getResult }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="recordNum" label="跟踪记录" width="80">
        <template slot-scope="scope">
          <el-button type="text"
                     @click="expandsHandle(scope.row, 2)"
                     style="color: #3154AC;font-size: 14px"
                     >{{scope.row.recordNum | getResult}}</el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <el-button
                  type="text"
                  size="small"
                  v-if="getAccess('follow_record_view')"
                  @click="handleView(scope.row)"
          >查看</el-button>
        </template>
      </el-table-column> -->
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
export default {
  name: 'system_collect',
  data() {
    return {
      upload_url: process.env.api.upload_url,
      isTrue: true,
      form: {
        keywords: '', // 关键字
        gridId: '', // 人员类别
        zjStartTime: '',
        zjEndTime: '',
        reportLv: '',
        reportId: '', // 体检编号
        positiveLevel: '', // 阳性等级
        abnormalResult: '', // 异常结果
        manageDoctorId: '', // 管理医生
        visitDoctorId: '', // 回访医生
        minReportDate: '', // 体检开始时间
        maxReportDate: '', // 体检结束时间
        searchType: 3, // 首次跟踪列表
        searchStartTime: '', // 工作台开始查询时间
        searchEndTime: '', // 工作台结束查询时间
      },
      gridList: [], // 人员类别下拉框
      sourceList: [{ value: 1, name: '采集系统' }, { value: 2, name: '手动上报' }, { value: 3, name: '后台预警' }], // 上报来源下拉框
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
      multipleSelectionAll: [], // 所有选中的数据包含跨页数据
      multipleSelection: [], // 当前页选中的数据
      unitList: [],
      doctorList: [],
      levelList: [],
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.onLoad();
    });
  },
  mounted() {
    this.getList();
    this.getUnitList();
    this.getDoctorList();
    this.getLevelList();
  },
  computed: {
    dataRange() {
      return localStorage.getItem('dataRange') !== 4;
    },
  },
  methods: {
    async getLevelList() {
      const res = await this.$api.sunFollow.getPositiveLevel();
      const { data } = res;
      this.levelList = data.data || [];
    },
    handleSelectionChange(val) {
      // table组件选中事件,
      this.multipleSelection = val;
    },
    onLoad() {
      this.getList();
      this.getGridList(); // 获取人员列类别
      this.getUnitList();
      this.getDoctorList();
      this.getLevelList();
      /* const StringList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
      const quanzhongList = [7, 5, 3, 2, 6, 1, 4, 9];
      const addList = [];
      StringList.forEach((val, index) => {
        addList.push({ Val: val, Count: index + quanzhongList[index] });
      });
      console.log(addList);
      let s;
      for (let i = 0; i < addList.length; i++) {
        for (let j = 1; j < addList.length; j++) {
          // console.log(addList[j].Count);
          console.log(addList[j - 1].Count);
          if (addList[j - 1].Count < addList[j].Count) {
            s = addList[j - 1];
            addList[j - 1] = addList[j];
            addList[j] = s;
          }
        }
      }
      console.log(addList);*/
    },
    upMore() {
      this.isTrue = !this.isTrue;
    },
    /**
     * 获取随访列表
     * @return {Promise<void>}
     */
    async getList() {
      const sendData = Object.assign({}, this.form, { pageNo: this.table.pageNo,
        pageSize: this.table.pageSize });
      if (this.form.minReportDate) {
        sendData.minReportDate = this.form.minReportDate;
      }
      if (this.form.maxReportDate) {
        sendData.maxReportDate = this.form.maxReportDate;
      }
      if (this.form.zjStartTime) {
        sendData.zjStartTime = this.form.zjStartTime;
      }
      if (this.form.zjEndTime) {
        sendData.zjEndTime = this.form.zjEndTime;
      }
      sendData.searchType = 3;
      const res = await this.$api.sunFollow.getSystemCollectList(sendData);
      const { data } = res.data;
      if (data) {
        this.table.list = data.data || [];
        this.table.totalCount = data.total;
      }
    },
    // 获取企业列表
    async getUnitList() {
      const res = await this.$api.companyManageInterface.getWorkUnitList({});
      const { data } = res;
      this.unitList = data.data || [];
    },
    // 管理医生/回访医生列表
    async getDoctorList() {
      const res = await this.$api.doctorInterface.getDoctorList({ pageNo: 1, pageSize: 10000 });
      const { data } = res;
      this.doctorList = data.data.data || [];
    },
    /**
     * 获取人员类别
     * @return {Promise<void>}
     */
    async getGridList() {
      const res = await this.$api.userManagerInterface.getGridList({ pageNo: 1, pageSize: 10000 });
      const { data } = res.data;
      this.gridList = data.data;
    },
    handleExpandPageChange(page) {
      this.expandData.pageNo = page;
      this.getReoprtList();
    },
    handleExpandChange(row, expandRows) {
      this.expands = expandRows;
    },
    expandsHandle(row, type) {
      if (this.loading) {
        return false;
      }
      this.expands.forEach((data) => {
        console.log(this.expands, 'expands');
        // 其他展开的行收起
        if (data.id !== row.id) {
          this.$refs.table.toggleRowExpansion(data);
        }
      });
      if (this.expands.includes(row)) {
        this.$refs.table.toggleRowExpansion(row);
      } else {
        this.expandData.id = row.id;
        this.expandData.pageNo = 1;
        this.excuteType = type;
        this.getReoprtList(type, row).then(() => {
          this.$refs.table.toggleRowExpansion(row);
        });
      }
    },
    getReoprtList(type, row) { // 真实接口
      this.expandData.list = [];
      this.loading = true;
      let Type = '';
      let fn = '';
      let params;
      if (type) { Type = type; } else { Type = this.excuteType; }
      if (Type === 1) {
        fn = 'getWaitingTrackingItemList';
        params = {
          pageNo: this.expandData.pageNo,
          pageSize: this.expandData.pageSize,
          clientId: this.expandData.clientId,
        };
      } else if (Type === 2) {
        fn = 'getTrankingRecord';
        params = {
          reportId: row.id,
          recordType: 1,
          pageNo: this.expandData.pageNo,
          pageSize: this.expandData.pageSize,
        };
      }
      return this.$api.sunFollow[fn](params).then(({ data }) => {
        console.log(data);
        /* if (Type === 2) {
          this.expandData.list = data.data.data;
        } else if (Type === 1) {
          this.expandData.list = [];
          data.data.forEach((value) => {
            const Value = value;
            Value.planDate = Value.executeTime;
            Value.planWayName = Value.executePlanWayName;
            Value.planTitle = Value.executePlanTitle;
            Value.planContent = Value.executePlanContent;
            this.expandData.list.push(Value);
          });
        }*/
        this.expandData.list = data.data.data;
        this.expandData.total = data.data.total;
        this.loading = false;
        // 展开的table的渲染更新依赖外层table数据，如果外层数据没变，展开的内容不会更新渲染，所以这里更新一下dataSource
        this.table.list = [...this.table.list];
        this.$forceUpdate();
      }).catch(() => {
        this.loading = false;
      });
    },
    /* getReoprtList(type) { 真实接口
      this.expandData.list = [];
      this.loading = true;
      let Type = '';
      if (type) { Type = type; } else { Type = this.excuteType; }
      return this.$api.interventionPlanInterface.getInterveneList({
        pageNo: this.expandData.pageNo,
        pageSize: this.expandData.pageSize,
        clientId: 1382540131324256257, // this.expandData.clientId,
        executeState: Type,
      }).then(({ data }) => {
        console.log(data);
        if (Type === 2) {
          this.expandData.list = data.data.data;
        } else if (Type === 1) {
          this.expandData.list = [];
          data.data.data.forEach((value) => {
            const Value = value;
            Value.planDate = Value.executeTime;
            Value.planWayName = Value.executePlanWayName;
            Value.planTitle = Value.executePlanTitle;
            Value.planContent = Value.executePlanContent;
            this.expandData.list.push(Value);
          });
        }
        this.expandData.total = data.data.total;
        this.loading = false;
        // 展开的table的渲染更新依赖外层table数据，如果外层数据没变，展开的内容不会更新渲染，所以这里更新一下dataSource
        this.table.list = [...this.table.list];
        this.$forceUpdate();
      }).catch(() => {
        this.loading = false;
      });
    },*/
    /**
     * 导出列表
     * @return {Promise<void>}
     */
    async exportList() {
      const res = await this.$api.sunFollow.exportPositiveRecord(this.form);
      const { data } = res.data;
      window.open(this.upload_url + data);
    },
    handleView(row) {
      localStorage.setItem('positiveTrackingDetail', JSON.stringify({
        itemName: row.itemName, itemValue: row.itemValue, reportLv: row.reportLv }));
      this.$router.push({
        path: `/follow_record_detail/${row.clientId}/${row.positiveTrackingId}`,
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
    /**
     * 分页计划
     * @param target
     */
    handleChangePlan(target) {
      this.tablePlan.pageNo = target;
      this.expandsHandle();
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
  /deep/ .abnormalStyle .el-input {
    width: 65%;
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
  .warnRed{
    color: #F33D21;
  }
  .warnYellow{
    border: 1px solid #FA912B;
    border-radius: 50px;color: #FA912B;
    font-size: 12px;
    padding: 2px 9px;
  }
</style>
