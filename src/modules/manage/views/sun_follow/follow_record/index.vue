<template>
  <div>
  <div class="divTop">
    <div class="divTitle">
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
          <span>客户性别：</span>
          <el-select
                  v-model="form.gender"
                  placeholder="请选择"
                  style="width: 140px"
                  clearable
          >
            <el-option label="男" value="1" key="1"></el-option>
            <el-option label="女" value="2" key="2"></el-option>
          </el-select>
        </div>
        <div>
          <span>人员类别：</span>
          <el-select
                  v-model="form.gridId"
                  placeholder="请选择"
                  style="width: 140px"
                  clearable
          >
            <el-option :label="item.gridName" :value="item.id" v-for="(item, index) in gridList"
                       :key="index"></el-option>
          </el-select>
        </div>
        <div>
          <span>是否总检：</span>
          <el-select
                  v-model="form.reportState"
                  placeholder="请选择"
                  style="width: 140px"
                  clearable
          >
          <el-option label="未知" value="0" key="0"></el-option>
          <el-option label="已总检" value="1" key="1"></el-option>
          <el-option label="未总检" value="2" key="2"></el-option>
          </el-select>
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
        <span>上报来源：</span>
        <el-select
                v-model="form.source"
                placeholder="请选择"
                style="width: 140px"
                clearable
        >
          <el-option :label="item.name" :value="item.value" v-for="(item, index) in sourceList"
                     :key="index"></el-option>
        </el-select>
      </div>
      <div>
        <span>手机号码：</span>
        <el-input
                v-model="form.phoneNo"
                placeholder="请输入"
                style="width: 140px">
        </el-input>
      </div>
      <div>
        <span>上报科室：</span>
        <el-input
                v-model="form.reportDepartment"
                placeholder="请输入"
                style="width: 140px">
        </el-input>
      </div>
      <div>
        <span>项目名称：</span>
        <el-input
                v-model="form.itemName"
                placeholder="请输入"
                style="width: 140px">
        </el-input>
      </div>
      <div>
        <span>上报人：</span>
        <el-input
                v-model="form.reportUserName"
                placeholder="请输入"
                style="width: 140px">
        </el-input>
      </div>
      <div>
        <span>上报时间：</span>
        <el-date-picker
                v-model="form.startTime"
                type="date"
                value-format="yyyy-MM-dd"
                :max-date="form.endTime || new Date()"
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
                :max-date="new Date()"
                placeholder="结束时间"
                style="width: 140px"
        >
        </el-date-picker>
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
        <el-radio-group v-model="form.reportLv" @change="onSearch">
          <el-radio :label="''">全部</el-radio>
          <el-radio :label="1">红色预警</el-radio>
          <el-radio :label="2">橙色预警</el-radio>
        </el-radio-group>
        </div>
      </div>
    </div>
  <div class="user-follow">
    <el-table :data="table.list" style="width: 100%" align="center" ref="table"
              @selection-change="handleSelectionChange"
              :row-key="getRowKeys"
              @expand-change="handleExpandChange">
      <el-table-column type="selection" width="40"></el-table-column>
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
      <el-table-column prop="age" label="年龄" width="60px">
        <template slot-scope="scope">
          <span>{{ scope.row.age | getResult }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="itemName" label="项目名称" min-width="80px">
        <template slot-scope="scope">
          <span>{{ scope.row.itemName | getResult }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结果" prop="result" min-width="100px">
        <template slot-scope="scope">
              <span :class="scope.row.reportLv === 1 ? 'warnRed' : 'warnYellow'">
                {{ scope.row.itemValue | getResult }}
              </span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="上报科室" prop="reportDepartment" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.reportDepartment | getResult}}</span>
        </template>
      </el-table-column>
      <el-table-column label="上报医生" prop="reportUserName" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.reportUserName | getResult}}</span>
        </template>
      </el-table-column>-->
      <el-table-column label="上报时间" prop="reportDate" min-width="115px" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.reportDate | getResult}}</span>
        </template>
      </el-table-column>
      <el-table-column label="最近跟踪" prop="nearestTrackingDate"
      min-width="115px" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.nearestTrackingDate | getResult}}</span>
        </template>
      </el-table-column>
      <el-table-column label="最近结果" prop="stateName" min-width="110px" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.stateName | getResult}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="isCloseCase" label="是否结案" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.isCloseCase | getResultReportState}}</span>
        </template>
      </el-table-column>
      <!--<el-table-column prop="recieveUserName" label="接收人" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.recieveUserName | getResult}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="recieveDate" label="接收时间" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.recieveDate | getResult}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="reportState" label="是否总检" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.reportState | getResultReportState}}</span>
        </template>
      </el-table-column>-->
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <el-button
                  type="text"
                  size="small"
                  v-if="getAccess('follow_record_view')"
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
export default {
  name: 'follow_record',
  data() {
    return {
      upload_url: process.env.api.upload_url,
      isTrue: true,
      form: {
        reportLv: '',
        keywords: '', // 关键字
        gender: '', // 性别
        gridId: '', // 人员类别
        reportState: '', // 是否总检
        source: '',
        phoneNo: '', // 手机号码
        reportDepartment: '',
        itemName: '',
        reportUserName: '',
        startTime: '',
        endTime: '',
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
      this.getGridList(); // 获取人员列类别
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
      if (this.form.startTime) {
        sendData.startTime = `${this.form.startTime} 00:00:00`;
      }
      if (this.form.endTime) {
        sendData.endTime = `${this.form.endTime} 23:59:59`;
      }
      const res = await this.$api.sunFollow.getPositiveRecordListPage(sendData);
      const { data } = res.data;
      console.log(data);
      if (data) {
        this.table.list = data.data || [];
        this.table.totalCount = data.total;
      }
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
        // 其他展开的行收起
        if (data.id !== row.id) {
          this.$refs.table.toggleRowExpansion(data);
        }
      });
      console.log(row);
      if (this.expands.includes(row)) {
        this.$refs.table.toggleRowExpansion(row);
      } else {
        this.expandData.clientId = row.id;
        this.expandData.pageNo = 1;
        this.excuteType = type;
        /* this.getReoprtList(type).then(() => {
          this.$refs.table.toggleRowExpansion(row);
        });*/
        this.getReoprtList(type);
        setTimeout(() => {
          this.$refs.table.toggleRowExpansion(row);
        }, 200);
      }
    },
    getReoprtList(type) {
      this.expandData.list = [];
      this.loading = true;
      let Type = '';
      if (type) { Type = type; } else { Type = this.excuteType; }
      // mock
      if (Type === 2) {
        this.expandData.list = [
          { name: '肺部CT',
            result: '疑似肺癌',
            subjectName: '内科',
            doctor: '陈良',
            createdTime: '2021-04-27 14：00',
            createdNewTime: '2021-04-29 19：20',
            nextFollowTime: '2021-05-07',
          },
          { name: '胃部CT',
            result: '疑似胃癌',
            subjectName: '内科',
            doctor: '陈良',
            createdTime: '2021-04-27 14：00',
            createdNewTime: '2021-04-29 19：20',
            nextFollowTime: '2021-05-07',
          },
        ];
      } else if (Type === 1) {
        this.expandData.list = [
          { name: '肺部CT',
            result: '疑似肺癌',
            subjectName: '内科',
            doctor: '陈良',
            createdTime: '2021-04-27 14：00',
            createdNewTime: '2021-04-29 19：20',
            nextFollowTime: '2021-05-07',
          },
        ];
      }
      this.expandData.total = this.expandData.list.length;
      this.loading = false;
      // 展开的table的渲染更新依赖外层table数据，如果外层数据没变，展开的内容不会更新渲染，所以这里更新一下dataSource
      this.table.list = [...this.table.list];
      this.$forceUpdate();
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
</style>
