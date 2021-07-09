<template>
  <div>
  <div class="divTop">
    <div class="divTitle">
      <span><img src="@/assets/images/common/titleLeft.png" alt=""></span>
      跟踪计划
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
          <span>上报时间：</span>
          <el-date-picker
                  v-model="form.startReportDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  :max-date="form.endReportDate || new Date()"
                  placeholder="开始时间"
                  style="width: 140px"
          >
          </el-date-picker>
          <span class="timing">-</span>
          <el-date-picker
                  v-model="form.endReportDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  :min-date="form.startReportDate"
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
        <span>跟踪时间：</span>
        <el-date-picker
                v-model="form.startTrackingDate"
                type="date"
                value-format="yyyy-MM-dd"
                :max-date="form.endTrackingDate"
                placeholder="开始时间"
                style="width: 140px"
        >
        </el-date-picker>
        <span class="timing">-</span>
        <el-date-picker
                v-model="form.endTrackingDate"
                type="date"
                value-format="yyyy-MM-dd"
                :min-date="form.startTrackingDate"
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
      <div style="text-align: right;margin: 16px 0">
        <el-radio-group v-model="form.reportLv" @change="onSearch">
          <el-radio :label="''">全部</el-radio>
          <el-radio :label="1">红色预警</el-radio>
          <el-radio :label="2">橙色预警</el-radio>
        </el-radio-group>
      </div>
    </div>
  <div class="user-follow">
   <!-- <div class="tableTopDoDiv">
      <div class="divRightTitleDiv">
        <div class="divRightTitle"><span>|</span>创建计划</div>
      </div>
      <div class="table-operate-buttons">
        <operate-button
                type="accurate"
                @click="handleCreate"
                v-if="getAccess('create_plan_personal_create')
              "></operate-button>
        <operate-button
                type="someAdd"
                @click="handleCreateTogether"
                v-if="getAccess('create_plan_batch_create')
              "></operate-button>
      </div>
    </div>-->
    <el-table :data="table.list" style="width: 100%" align="center" ref="table"
              @selection-change="handleSelectionChange"
              class="openTable"
              :row-key="getRowKeys"
              @expand-change="handleExpandChange">
      <el-table-column type="expand" width="1" class-name="hide-expand-column">
        <el-table :data="expandData.list" class="expand-table" align="center">
          <el-table-column label="跟踪项目" prop="itemName" min-width="90px" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.itemName | getResult}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="结果"
            prop="result"
            min-width="80px">
            <template slot-scope="scope">
              <span :class="scope.row.reportLv === 1 ? 'warnRed' : 'warnYellow'">
                {{ scope.row.itemValue | getResult }}
              </span>
            </template>
          </el-table-column>
          <!--<el-table-column label="上报科室" prop="reportDepartment" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.reportDepartment | getResult}}</span>
            </template>
          </el-table-column>
          <el-table-column label="上报医生" prop="reportUserName" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.reportUserName | getResult}}</span>
            </template>
          </el-table-column>-->
          <el-table-column label="上报时间" prop="reportDate" min-width="90px" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.reportDate | getResult}}</span>
            </template>
          </el-table-column>
          <el-table-column label="最近跟踪" prop="nearestTrackingDate"
                           min-width="90px" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.nearestTrackingDate | getResult}}</span>
            </template>
          </el-table-column>
           <el-table-column
            label="最近结果"
            prop="result"
            min-width="80px">
            <template slot-scope="scope">
              <span>
                {{ scope.row.stateName | getResult }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="下次跟踪" prop="nextTrackingDate"
                           min-width="90px" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.nextTrackingDate | getResult}}</span>
            </template>
          </el-table-column>
          <el-table-column label="跟踪方式" prop="nextTrackingDate"
                           width="90px" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.trackingWayName | getResult}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            prop="planContent"
            min-width="80">
            <template slot-scope="scope">
              <el-button v-if="excuteType === 1 && getAccess('follow_task_follow')"
                      @click="handleTask(scope.row)"
                      type="text"
                      size="small"
              >跟踪</el-button>
              <el-button v-if="excuteType === 2 && getAccess('follow_record_view')"
                      @click="handleView(scope.row)"
                      type="text"
                      size="small"
              >查看</el-button>
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

      <!--<el-table-column type="selection" width="40"></el-table-column>-->
      <el-table-column prop="clientNo" label="客户编号" min-width="100px" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.clientNo | getResult}}</span>
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
      <el-table-column prop="isTrackingNum" label="待跟踪项目" width="90px" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="text"
                     @click="expandsHandle(scope.row, 1)" style="color: #3154AC;font-size: 14px">
            {{scope.row.isTrackingNum | getResult}}</el-button>
        </template>
      </el-table-column>
      <!--<el-table-column prop="earliestReportDate" label="最早上报"
      min-width="105px" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.earliestReportDate | getResult}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="nearestReportDate" label="最新上报"
      min-width="105px" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.nearestReportDate | getResult}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="nearestTrackingDate" label="最近跟踪" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.nearestTrackingDate | getResult}}</span>
        </template>
      </el-table-column>-->
      <el-table-column prop="nextTrackingDate" label="下次跟踪" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.nextTrackingDate | getResult}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="nextTrackingDate" label="*下次跟踪方式" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.nextTrackingDate | getResult}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="nextTrackingDate" label="*下次跟踪提示" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.nextTrackingDate | getResult}}</span>
        </template>
      </el-table-column>
      <!--<el-table-column prop="nextTrackingDate" label="*跟踪方式" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.nextTrackingDate | getResult}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="nextTrackingDate" label="*跟踪提示" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.nextTrackingDate | getResult}}</span>
        </template>
      </el-table-column>-->
      <!--<el-table-column prop="trackingRecordNum" label="跟踪记录" width="90px" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="text"
                     @click="expandsHandle(scope.row, 2)" style="color: #36BF2F;font-size: 14px">
            {{scope.row.trackingRecordNum | getResult}}</el-button>
        </template>
      </el-table-column>-->
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <el-button
                  type="text"
                  size="small"
                  @click="handleTask(scope.row)"
                  v-if="getAccess('follow_task_follow')"
          >跟踪</el-button>
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
  name: 'follow_task',
  data() {
    return {
      isTrue: true,
      form: {
        keywords: '', // 关键字
        gender: '', // 性别
        startReportDate: '',
        endReportDate: '',
        gridId: '', // 人员类别
        startTrackingDate: '',
        endTrackingDate: '',
        reportLv: '',
      },
      abnormalModalVisible: false, // 异常列表弹窗
      selectPlanuser: [],
      planuserModalVisible: false, // 随访人人列表弹窗
      selectAbnormal: [],
      gridList: [], // 人员类别下拉框
      expands: [],
      getRowKeys: row => row.clientId,
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
    // 设置选中的方法
    handleSelectionChange(val) {
      // table组件选中事件,
      this.multipleSelection = val;
    },
    onLoad() {
      this.getList();
      this.getGridList(); // 获取人员列类别
    },
    // 关闭异常列表
    handleAbnormalSelectChange(dataList) {
      this.$refs.abnormalPopover.doClose();
      this.abnormalModalVisible = false;
      const list = [];
      const listId = [];
      dataList.forEach((value) => {
        list.push(value.abnormalName);
        listId.push(value.abnormalCode);
      });
      this.form.abnormalId = listId;
      this.form.abnormalName = list.join(',');
      /* if (this.selectAbnormal.length > 0) {
        this.onAbnormalChange(this.selectAbnormal);
        this.selectAbnormal = [];
      } */
    },
    handleAbnormalClose() {
      this.abnormalModalVisible = false;
      this.$refs.abnormalPopover.doClose();
    },
    // 关闭异常列表
    handlePlanuserClose(data) {
      this.$refs.userPopover.doClose();
      this.planuserModalVisible = false;
      this.form.planUserId = data.id;
      this.form.planUserName = data.realName;
    },
    upMore() {
      this.isTrue = !this.isTrue;
    },
    /**
     * 获取列表
     * @return {Promise<void>}
     */
    async getList() {
      const sendData = Object.assign({}, this.form, { pageNo: this.table.pageNo,
        pageSize: this.table.pageSize });
      if (this.form.startReportDate) {
        sendData.startReportDate = `${this.form.startReportDate} 00:00:00`;
      }
      if (this.form.endReportDate) {
        sendData.endReportDate = `${this.form.endReportDate} 23:59:59`;
      }
      if (this.form.startTrackingDate) {
        sendData.startTrackingDate = `${this.form.startTrackingDate} 00:00:00`;
      }
      if (this.form.endTrackingDate) {
        sendData.endTrackingDate = `${this.form.endTrackingDate} 23:59:59`;
      }
      const res = await this.$api.sunFollow.getPositiveTaskdListPage(sendData);
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
        if (data.clientId !== row.clientId) {
          this.$refs.table.toggleRowExpansion(data);
        }
      });
      console.log(row);
      if (this.expands.includes(row)) {
        this.$refs.table.toggleRowExpansion(row);
      } else {
        this.expandData.clientId = row.clientId;
        this.expandData.pageNo = 1;
        this.excuteType = type;
        this.getReoprtList(type).then(() => {
          this.$refs.table.toggleRowExpansion(row);
        });
      }
    },
    /* getReoprtList(type) {
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
    },*/
    getReoprtList(type) { // 真实接口
      this.expandData.list = [];
      this.loading = true;
      let Type = '';
      let fn = '';
      if (type) { Type = type; } else { Type = this.excuteType; }
      if (Type === 1) {
        fn = 'getWaitingTrackingItemList';
      } else if (Type === 2) {
        fn = 'getRecordTrackingItemList';
      }
      return this.$api.sunFollow[fn]({
        pageNo: this.expandData.pageNo,
        pageSize: this.expandData.pageSize,
        clientId: this.expandData.clientId,
      }).then(({ data }) => {
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
    // 跟踪
    handleTask(row) {
      this.$router.push({
        path: `/first_follow_do/${row.clientId}/2`,
      });
    },
    // 查看
    handleView(row) {
      localStorage.setItem('positiveTrackingDetail', JSON.stringify({
        itemName: row.itemName, itemValue: row.itemValue, reportLv: row.reportLv }));
      this.$router.push({
        path: `/follow_record_detail/${row.clientId}/${row.id}`,
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
    padding: 6px 0!important;
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
