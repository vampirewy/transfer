<template>
  <div>
  <!--<query-page @reset="onReset" @search="onSearch">
    <template slot="left">
      <search>
        <div class="searchInputFormItem">
          <el-input placeholder="姓名/手机号/企业单位" v-model="form.keywords">
            &lt;!&ndash; <el-button slot="append" icon="el-icon-search" @click="onSearch">
            </el-button>&ndash;&gt;
          </el-input>
          <span class="searchBtnImgSpan" @click="onSearch">
            <img class="searchBtnImg" src="@/assets/images/common/search.png"/>
          </span>
        </div>
      </search>
      <query-filter>
        <el-select placeholder="性别" v-model="form.gender" clearable>
          <el-option label="男" :value="1"></el-option>
          <el-option label="女" :value="2"></el-option>
        </el-select>
        &lt;!&ndash;<el-input placeholder="企业单位" v-model="form.workUnitName"></el-input>&ndash;&gt;
        <el-select placeholder="人员类别" v-model="form.gridId" clearable>
          <el-option :label="item.gridName" :value="item.id" v-for="item in gridList"
                     :key="item.id"></el-option>
        </el-select>
        <el-popover
                ref="userPopover"
                placement="top-start"
                width="545"
                trigger="click"
                @show="planuserModalVisible = true"
                @hide="planuserModalVisible = false"
        >
          <manager-list v-if="planuserModalVisible"
                        :propsType="'doctor'" @change="handlePlanuserClose"></manager-list>
          <el-input class="select-user-trigger" slot="reference"
                    :disabled="form.planUserId !== '' ? false : true"
                    v-model="form.planUserName" placeholder="管理医生">
            <i :class="`el-icon-arrow-${planuserModalVisible ? 'up' : 'down'}`"
               slot="suffix"></i>
          </el-input>
        </el-popover>
        <el-popover
                ref="abnormalPopover"
                placement="top-start"
                width="545"
                trigger="click"
                @show="abnormalModalVisible = true"
                @hide="handleAbnormalClose">
          <abnormal v-if="abnormalModalVisible"
                    @change="handleAbnormalSelectChange"
                    @cancel="handleAbnormalClose"></abnormal>
          <el-input class="select-user-trigger" slot="reference"
                    :disabled="form.abnormalName !== '' ? false : true"
                    v-model="form.abnormalName" placeholder="异常名称">
          <i :class="`el-icon-arrow-${abnormalModalVisible ? 'up' : 'down'}`"
             slot="suffix"></i>
        </el-input>
        </el-popover>
      </query-filter>
    </template>
    <template slot="right">-->
  <div class="divTop">
    <div class="divTitle">
      <span><img src="@/assets/images/common/titleLeft.png" alt=""></span>
      创建计划
    </div>
    <div class="searchCondition">
      <div class="searchLeft">
        <div class="searchInputFormItem">
          <el-input placeholder="姓名/编号/单位" v-model="form.keywords">
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
          <span>异常名称：</span>
          <el-popover
                  ref="abnormalPopover"
                  placement="top-start"
                  width="590"
                  trigger="click"
                  @show="abnormalModalVisible = true"
                  @hide="handleAbnormalClose">
            <abnormal v-if="abnormalModalVisible"
                      @change="handleAbnormalSelectChange"
                      @cancel="handleAbnormalClose"></abnormal>
            <el-input class="select-user-trigger" slot="reference" style="width: 140px"
                      :disabled="form.abnormalName !== '' ? false : true"
                      v-model="form.abnormalName" placeholder="请选择">
              <i :class="`el-icon-arrow-${abnormalModalVisible ? 'up' : 'down'}`"
                 slot="suffix"></i>
            </el-input>
          </el-popover>
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
        <span>剩余计划：</span>
        <el-select
                v-model="form.hasIntervenePlan"
                placeholder="请选择"
                style="width: 140px"
                clearable
        >
          <el-option label="有" value="1" key="1"></el-option>
          <el-option label="无" value="2" key="2"></el-option>
        </el-select>
      </div>
      <div>
        <span>体检报告：</span>
        <el-select
                v-model="form.hasReport"
                placeholder="请选择"
                style="width: 140px"
                clearable
        >
          <el-option label="有" value="1" key="1"></el-option>
          <el-option label="无" value="2" key="2"></el-option>
        </el-select>
      </div>
      <div>
        <span>客户标签：</span>
        <el-input placeholder="请输入" style="width: 140px" v-model="form.tag"></el-input>
      </div>
      <div>
        <span>建档日期：</span>
        <el-date-picker
                v-model="form.startTime"
                type="date"
                value-format="yyyy-MM-dd"
                :max-date="form.endTime"
                placeholder="开始时间"
                style="width: 120px"
        >
        </el-date-picker>
        <span class="timing">-</span>
        <el-date-picker
                v-model="form.endTime"
                type="date"
                value-format="yyyy-MM-dd"
                :min-date="form.startTime"
                placeholder="结束时间"
                style="width: 120px"
        >
        </el-date-picker>
      </div>
      <div>
        <span>体检日期：</span>
        <el-date-picker
                v-model="form.startReportDate"
                type="date"
                value-format="yyyy-MM-dd"
                :max-date="form.endReportDate"
                placeholder="开始时间"
                style="width: 120px"
        >
        </el-date-picker>
        <span class="timing">-</span>
        <el-date-picker
                v-model="form.endReportDate"
                type="date"
                value-format="yyyy-MM-dd"
                :min-date="form.startReportDate"
                placeholder="结束时间"
                style="width: 120px"
        >
        </el-date-picker>
      </div>
      <div>
        <span>采集日期：</span>
        <el-date-picker
                v-model="form.startCollectionDate"
                type="date"
                value-format="yyyy-MM-dd"
                :max-date="form.endCollectionDate"
                placeholder="开始时间"
                style="width: 120px"
        >
        </el-date-picker>
        <span class="timing">-</span>
        <el-date-picker
                v-model="form.endCollectionDate"
                type="date"
                value-format="yyyy-MM-dd"
                :min-date="form.startCollectionDate"
                placeholder="结束时间"
                style="width: 120px"
        >
        </el-date-picker>
      </div>
    </div>
  </div>
    <div class="topbottomborder"></div>
    <div class="divRightTitleDiv">
      <!-- <div class="divRightTitle"><span>|</span>客户池</div> -->
      <div>
        <el-button
                class="btn-new btnAdd"
                size="small"
                style="margin: 16px 0;width: 110px"
                @click="handleCreate"
                v-if="getAccess('create_plan_personal_create')"
        ><img src="@/assets/images/common/addBtn.png" />自动创建</el-button>
        <el-button
                size="small"
                class="btn-new btnDel"
                style="width: 140px"
                @click="handleCreateTogether"
                v-if="getAccess('create_plan_batch_create')"
        ><img src="@/assets/images/healthPlan/togetherAdd.png" />智能匹配创建</el-button>
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
      <el-table-column type="expand" width="1" class-name="hide-expand-column">
        <el-table :data="expandData.list" class="expand-table" align="center">
          <el-table-column
            :label="excuteType === 2 ? '随访日期' : '执行日期'"
            prop="planDate"
            min-width="25%"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.planDate | getResultDate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="随访形式" prop="planWayName" min-width="25%" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.planWayName | getResult}}</span>
            </template>
          </el-table-column>
          <el-table-column label="随访标题" prop="planTitle" min-width="25%" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.planTitle | getResult}}</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="excuteType === 2 ? '随访提示' : '随访结果'"
            prop="planContent"
            min-width="25%"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.planContent | getResult}}</span>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align: right">
          <el-pagination
                  style="padding-top: 15px;background-color: #f7f7fd"
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

      <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column prop="gender" label="客户编号" width="100px">
        <template slot-scope="scope">
          <span>{{scope.row.clientNo | getResult}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="100"
      >
        <template slot-scope="scope">
             <span class="clientName"
                   @click="commonHref.toPersonalHealth(scope.row.id, $router)">
               {{ scope.row.name | getResult}}
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
      <el-table-column prop="gridName" label="人员类别" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.gridName | getResult}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="workUnitName" label="单位">
        <template slot-scope="scope">
          <span>{{ scope.row.workUnitName | getResult }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createdTime" label="建档日期" show-overflow-tooltip>
        <!--管理医生-->
        <template slot-scope="scope">
          <span>{{ scope.row.createdTime | getResultDate}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="newstReportDate" label="最新体检日期" show-overflow-tooltip>
        <!--管理医生-->
        <template slot-scope="scope">
          <span>{{ scope.row.newstReportDate | getResultDate}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="noExecuteCount" label="干预计划" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="text"
                     @click="expandsHandle(scope.row, 2)" style="color: #3154AC;font-size: 14px">
            {{scope.row.unExecutePlanTotal | getResult}}</el-button>
          <span style="color: #3154AC;font-size: 14px">/</span>
          <el-button type="text"
                     @click="expandsHandle(scope.row, 1)" style="color: #3154AC;font-size: 14px">
            {{scope.row.executePlanTotal | getResult}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="tags" label="标签" show-overflow-tooltip>
        <!--最后一次随访时间-->
        <template slot-scope="scope">
          <span>{{ scope.row.tags | getResult }}</span>
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
import { genderList, executeStateList } from '~/src/constant/health_plan';
import QueryPage from '~/src/components/query_page/index.vue';
import Search from '~/src/components/query_page/search.vue';
import QueryFilter from '~/src/components/query_page/query_filter.vue';
import OperateButton from '~/src/components/query_page/operate_button.vue';
import abnormal from './el_modal/abnormal.vue';
import ManagerList from '@/components/user_health/manager_list.vue';

export default {
  name: 'user_follow_create',
  components: {
    QueryPage,
    Search,
    QueryFilter,
    OperateButton,
    abnormal,
    ManagerList,
  },
  data() {
    return {
      isTrue: true,
      form: {
        keywords: '', // 关键字
        gender: '', // 性别
        gridId: '', // 人员类别
        hasIntervenePlan: '', // 剩余计划
        hasReport: '', // 体检报告
        tag: '', // 客户标签
        startReportDate: '', // 体检日期
        endReportDate: '', // 体检日期
        startCollectionDate: '', // 采集日期
        endCollectionDate: '', // 采集日期
        workUnitName: '', // 企业单位
        planUserId: '',
        planUserName: '',
        planWay: '', // 随访方式
        executeState: '', // 状态
        selectTime: [], // 选择时间
        planWayList: [],
        genderList,
        executeStateList,
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
      multipleSelectionAll: [], // 所有选中的数据包含跨页数据
      multipleSelection: [], // 当前页选中的数据
      idKey: 'clientId', // 标识列表数据中每一行的唯一键的名称(需要按自己的数据改一下)
    };
  },
  activated() {
    this.onLoad();
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
      this.getPlanWayList();
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
     * 获取随访列表
     * @return {Promise<void>}
     */
    async getList() {
      console.log(this.form);
      if (this.form.startTime) {
        this.form.startTime = `${this.form.startTime.split(' ')[0]} 00:00:00`;
      }
      if (this.form.endTime) {
        this.form.endTime = `${this.form.endTime.split(' ')[0]} 23:59:59`;
      }
      if (this.form.startReportDate) {
        this.form.startReportDate = `${this.form.startReportDate.split(' ')[0]} 00:00:00`;
      }
      if (this.form.endReportDate) {
        this.form.endReportDate = `${this.form.endReportDate.split(' ')[0]} 23:59:59`;
      }
      if (this.form.startCollectionDate) {
        this.form.startCollectionDate = `${this.form.startCollectionDate.split(' ')[0]} 00:00:00`;
      }
      if (this.form.endCollectionDate) {
        this.form.endCollectionDate = `${this.form.endCollectionDate.split(' ')[0]} 23:59:59`;
      }
      const reqBody = {
        planWay: this.form.planWay,
        executeState: this.form.executeState,
        gender: this.form.gender,
        gridId: this.form.gridId,
        planUserId: this.form.planUserId,
        reportAbnormalCodes: this.form.abnormalId,
        hasIntervenePlan: this.form.hasIntervenePlan,
        hasReport: this.form.hasReport,
        /* tag: this.form.tag,*/
        startReportDate: this.form.startReportDate,
        endReportDate: this.form.endReportDate,
        startCollectionDate: this.form.startCollectionDate,
        endCollectionDate: this.form.endCollectionDate,
        workUnitName: this.form.workUnitName,
        startTime: this.form.startTime,
        endTime: this.form.endTime,
        keywords: this.form.keywords,
        pageNo: this.table.pageNo,
        pageSize: this.table.pageSize,
      };
      const res = await this.$api.userFollowInterface.getIntervenePlanPageList(
        reqBody,
      );
      const { data } = res.data;
      if (data) {
        this.table.list = data.data || [];
        this.table.totalCount = data.total;
        setTimeout(() => {
          this.setSelectRow();
        }, 100);
      }
    },
    /**
     * 获取随访方式
     * @return {Promise<void>}
     */
    async getPlanWayList() {
      const res = await this.$api.userFollowInterface.getIntervenePlanWayList();
      const { data } = res.data;
      const list = data.map((it) => {
        const { id, name } = it;
        return { id, name };
      });
      list.unshift({ name: '全部', value: '' });
      this.form.planWayList = list;
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
        this.getReoprtList(type).then(() => {
          this.$refs.table.toggleRowExpansion(row);
        });
      }
    },
    getReoprtList(type) {
      this.expandData.list = [];
      this.loading = true;
      let Type = '';
      if (type) { Type = type; } else { Type = this.excuteType; }
      return this.$api.interventionPlanInterface.getInterveneList({
        pageNo: this.expandData.pageNo,
        pageSize: this.expandData.pageSize,
        clientId: this.expandData.clientId,
        executeState: Type,
      }).then(({ data }) => {
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
      right: 5px;
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
    padding: 6px 0;
  }
  /deep/ .el-table__expand-column .el-icon{
    visibility:hidden;
  }
  /deep/ .el-table__expanded-cell {
    padding: 0;
    .el-table .el-table__header-wrapper th {
      background: rgba(108, 108, 229, 0.6);
      .cell {
        color: #fff;
      }
    }
    .el-table--enable-row-hover .el-table__body tr:hover > td {
      background-color: #f7f7fd;
    }
    .el-table .el-table__body td {
      background-color: #f7f7fd;
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
</style>
