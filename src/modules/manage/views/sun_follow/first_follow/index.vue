<template>
  <div>
  <div class="divTop">
    <div class="divTitle">
      <span><img src="@/assets/images/common/titleLeft.png" alt=""></span>
      首次跟踪
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
        <div><el-button
                class="btn-new btnAdd"
                size="small"
                style="margin: 16px 0"
                @click="add"
                v-if="getAccess('first_follow_add')"
        ><img src="@/assets/images/common/addBtn.png" />新增</el-button>
        <el-button
                class="btn-new btnAdd"
                size="small"
                @click="exportList"
                style="margin: 16px 0"
                v-if="getAccess('first_follow_export')"
        ><img src="@/assets/images/common/export.png" />导出</el-button>
        </div>
        <el-radio-group v-model="form.reportLv" @change="onSearch" style="margin: 16px 0">
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
              :row-key="getRowKeys"
              @expand-change="handleExpandChange">
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
      <el-table-column prop="itemName" label="项目名称" min-width="80px" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.itemName | getResult }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结果" prop="itemValue" min-width="100px">
        <template slot-scope="scope">
              <span :class="scope.row.reportLv === 1 ? 'warnRed' : 'warnYellow'">
                {{ scope.row.itemValue | getResult }}
              </span>
        </template>
      </el-table-column>
      <el-table-column label="上报科室" prop="reportDepartment" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.reportDepartment | getResult}}</span>
        </template>
      </el-table-column>
      <el-table-column label="上报医生" prop="reportUserName" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.reportUserName | getResult}}</span>
        </template>
      </el-table-column>
      <el-table-column label="上报时间" prop="reportDate" min-width="115px" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.reportDate | getResult}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="recieveUserName" label="上报来源" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.source === 1 ? '采集系统' :
            scope.row.source === 2 ? '手动上报' :
            scope.row.source === 3 ? '后台预警' : ''}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="reportState" label="是否总检" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.reportState | getResultReportState}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <el-button
                  type="text"
                  size="small"
                  v-if="getAccess('first_follow_do')"
                  @click="handleView(scope.row)"
          >处理</el-button>
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
import QueryPage from '~/src/components/query_page/index.vue';
import Search from '~/src/components/query_page/search.vue';
import QueryFilter from '~/src/components/query_page/query_filter.vue';
import OperateButton from '~/src/components/query_page/operate_button.vue';
import ManagerList from '@/components/user_health/manager_list.vue';

export default {
  name: 'first_follow',
  components: {
    QueryPage,
    Search,
    QueryFilter,
    OperateButton,
    ManagerList,
  },
  data() {
    return {
      upload_url: process.env.api.upload_url,
      isTrue: true,
      form: {
        keywords: '', // 关键字
        gender: '', // 性别
        gridId: '', // 人员类别
        reportState: '', // 是否总检
        source: '',
        phoneNo: '',
        startTime: '',
        endTime: '',
        reportLv: '',
      },
      abnormalModalVisible: false, // 异常列表弹窗
      selectPlanuser: [],
      planuserModalVisible: false, // 随访人人列表弹窗
      selectAbnormal: [],
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
      idKey: 'clientId', // 标识列表数据中每一行的唯一键的名称(需要按自己的数据改一下)
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.onLoad();
    });
  },
  methods: {
    // 设置选中的方法
    setSelectRow() {
      if (!this.multipleSelectionAll || this.multipleSelectionAll.length <= 0) {
        return;
      }
      // 标识当前行的唯一键的名称
      const idKey = this.idKey;
      const selectAllIds = [];
      this.multipleSelectionAll.forEach((row) => {
        selectAllIds.push(row[idKey]);
      });
      this.$refs.table.clearSelection();
      for (let i = 0; i < this.table.list.length; i++) {
        if (selectAllIds.indexOf(this.table.list[i][idKey]) >= 0) {
          // 设置选中，记住table组件需要使用ref="table"
          this.$refs.table.toggleRowSelection(this.table.list[i], true);
        }
      }
    },
    // 记忆选择核心方法
    changePageCoreRecordData() {
      // 标识当前行的唯一键的名称
      const idKey = this.idKey;
      const that = this;
      // 如果总记忆中还没有选择的数据，那么就直接取当前页选中的数据，不需要后面一系列计算
      if (this.multipleSelectionAll.length <= 0) {
        this.multipleSelectionAll = this.multipleSelection;
        return;
      }
      // 总选择里面的key集合
      const selectAllIds = [];
      this.multipleSelectionAll.forEach((row) => {
        selectAllIds.push(row[idKey]);
      });
      const selectIds = [];
      // 获取当前页选中的id
      this.multipleSelection.forEach((row) => {
        selectIds.push(row[idKey]);
        // 如果总选择里面不包含当前页选中的数据，那么就加入到总选择集合里
        if (selectAllIds.indexOf(row[idKey]) < 0) {
          that.multipleSelectionAll.push(row);
        }
      });
      const noSelectIds = [];
      // 得到当前页没有选中的id
      this.table.list.forEach((row) => {
        if (selectIds.indexOf(row[idKey]) < 0) {
          noSelectIds.push(row[idKey]);
        }
      });
      noSelectIds.forEach((id) => {
        if (selectAllIds.indexOf(id) >= 0) {
          for (let i = 0; i < that.multipleSelectionAll.length; i++) {
            if (that.multipleSelectionAll[i][idKey] === id) {
              // 如果总选择中有未被选中的，那么就删除这条
              that.multipleSelectionAll.splice(i, 1);
              break;
            }
          }
        }
      });
    },
    // 得到选中的所有数据
    getAllSelectionData() {
      // 再执行一次记忆勾选数据匹配，目的是为了在当前页操作勾选后直接获取选中数据
      this.changePageCoreRecordData();
    },
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
      if (this.form.startTime) {
        sendData.startTime = `${this.form.startTime} 00:00:00`;
      }
      if (this.form.endTime) {
        sendData.endTime = `${this.form.endTime} 23:59:59`;
      }
      const res = await this.$api.sunFollow.getPositiveFirstListPage(sendData);
      const { data } = res.data;
      console.log(data);
      if (data) {
        this.table.list = data.data || [];
        this.table.totalCount = data.total;
        setTimeout(() => {
          this.setSelectRow();
        }, 100);
      }
    },
    /**
     * 导出列表
     * @return {Promise<void>}
     */
    async exportList() {
      const res = await this.$api.sunFollow.exportPositiveFirst(this.form);
      const { data } = res.data;
      window.open(this.upload_url + data);
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
    add() {
      this.$router.push({
        path: '/first_follow_create',
      });
    },
    handleView(row) {
      this.$router.push({
        path: `/first_follow_do/${row.clientId}/1`,
      });
    },
    // 获取下拉计划 / 记录数据
    /**
     * 新增
     */
    handleCreate() {
      if (this.multipleSelection.length !== 1) {
        this.$message({
          message: '请选择一条记录创建',
          type: 'warning',
        });
        return;
      }
      console.log(this.multipleSelection);
      this.multipleSelection.forEach((val) => {
        val.clientId = val.id;
      });
      // this.multipleSelection[0].clientId = '1379239122384576513';
      this.$store.commit('intervention/SET_USERCHECK_LIST', this.multipleSelection);
      this.$store.dispatch('intervention/setTplList', []);
      this.$router.push({ // 1 单个
        path: '/health_plan/user_follow_create/create/1',
      });
    },
    /**
     * 批量新增
     */
    handleCreateTogether() {
      this.getAllSelectionData(); // 获取全部勾选的数据
      if (this.multipleSelectionAll.length < 2) {
        this.$message({
          message: '请选择至少两条记录进行创建',
          type: 'warning',
        });
        return;
      }
      this.multipleSelectionAll.forEach((val) => {
        val.clientId = val.id;
      });
      this.$store.commit('intervention/SET_USERCHECK_LIST', this.multipleSelectionAll);
      this.$store.dispatch('intervention/setTplList', []);
      this.$router.push({ // 2 批量
        path: '/health_plan/user_follow_create/createBatch/2',
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
      this.changePageCoreRecordData();
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
