<template>

  <div class="extimate-report">
    <exception-explain
      v-if="view === 2"
      :id="currentData.reportId"
      @close="handleClose">
    </exception-explain>
    <match-exception
      v-else-if="view === 4"
      :exception="currentUnMatchData"
      @close="handleClose">
    </match-exception>
    <comment
      v-else-if="view === 3"
      :id="currentData.reportId"
      @close="handleClose">
    </comment>
    <examine
      v-else-if="view === 5"
      :id="currentData"
      @close="handleClose"
    >
    </examine>
    <div v-else>
    <div class="TabBars">
    <div>
      <span class="fristName" v-for="(item,index) in tabbor" :key="index"
      :class="Tabactive === index?'TabBarsName':'TabBarsNames'" @click="TabbarBtn(index)">
        {{item}}
      </span>
    </div>
  </div>
      <div class="divTop">
          <div class="divTitle">
            <span><img src="@/assets/images/common/titleLeft.png" alt=""></span>
            {{Tabactive == '0'?'个人健康报告':Tabactive == '1'?'心理评估':'中医体质评估'}}</div>
          <div class="searchCondition">
          <div class="searchLeft">
          <div class="searchInputFormItem">
            <el-input v-if="Tabactive === 0"
            placeholder="姓名/手机号/单位/体检编号" v-model="form.keywords"></el-input>
            <el-input v-else placeholder="姓名/手机号/单位" v-model="form.keywords">
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
          >
            <el-option :label="item.gridName"
            :value="item.id" v-for="(item, index) in gridList"
                       :key="index"></el-option>
          </el-select>
          </div>
            <div>
            <span>问卷来源：</span>
            <el-select
                  v-model="form.source"
                  placeholder="请选择"
                  style="width: 140px"
          >
            <el-option :label="item.name" :value="item.paramValue"
                       v-for="(item, index) in questionFromList" :key="index"></el-option>
          </el-select>
          </div>
            </div>
            <div class="searchRight">
            <div class="buttones">
            <div class="searchFor" @click="onSearch">
            <img src="@/assets/images/common/topsearchblue.png" alt="">
          </div>
          <div class="resetAll" @click="reset">重置</div>
          <div class="more" v-if="isTrue"  @click="upMore">
            <span>></span>
            展开更多</div>
          <div class="more noMore" v-else @click="upMore">
            <span>></span>收起筛选</div>
          </div>
            </div>
          </div>
        </div>
          <div v-if="!isTrue" class="searchCondition" style="width:80%;">
          <div class="searchLeft" style="padding-left:5px;">
           <div v-if="Tabactive === 0">
            <span>体检日期：</span>
            <el-date-picker
            v-model="form.minReportDate"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            style="width: 140px;"
            :picker-options="pickerStartTime"
            placeholder="选择开始时间">
            </el-date-picker>
            <span class="timing">-</span>
          <el-date-picker
            v-model="form.maxReportDate"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            style="width: 140px"
            :picker-options="pickerEndTime"
            placeholder="选择结束时间">
          </el-date-picker>
          </div>
          <div v-else>
            <span>填写日期：</span>
            <el-date-picker
            v-model="form.startTime"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            style="width: 140px;"
            :picker-options="pickerStartTime"
            placeholder="选择开始时间">
            </el-date-picker>
            <span class="timing">-</span>
          <el-date-picker
            v-model="form.endTime"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            style="width: 140px"
            :picker-options="pickerEndTime"
            placeholder="选择结束时间">
          </el-date-picker>
          </div>
          </div>
        </div>
        <div class="topbottomborder"></div>
        <div class="divRightTitleDiv">
          <div v-if="Tabactive == 0">
            <el-button
            style="margin: 16px 0;"
                    size="small"
                    @click="handleExamine"
                    class="btn-new btnDel"
                    v-if="getAccess('customer_pool_distribute')"
            ><img src="@/assets/images/common/examine.png" />审核</el-button>
            <el-button
            style="width:120px;margin: 16px 0;"
                    size="small"
                    @click="handleExamine"
                    class="btn-new btnDel"
                    v-if="getAccess('customer_pool_distribute')"
            ><img src="@/assets/images/common/createReport.png" />生成报告</el-button>
          </div>
          <el-button v-if="Tabactive == 1" style="width:120px;margin: 16px 0;"
                    size="small"
                    @click="generateReporte"
                    class="btn-new btnDel"
            ><img src="@/assets/images/common/createReport.png" />生成报告</el-button>
            <el-button v-if="Tabactive == 2"
            style="width:120px;margin: 16px 0;"
                    size="small"
                    @click="generateReportes"
                    class="btn-new btnDel"
            ><img src="@/assets/images/common/createReport.png" />生成报告</el-button>
        </div>
        <div class="right">
          <!-- 心理评估 -->
          <div v-if="Tabactive == 1">
            <el-table
              ref="table"
              :key="Tabactive"
              class="has-expand-table"
              style="width: 100%"
              @selection-change="handleSelectionChangee"
              :row-key="getRowKeys"
              @expand-change="handleExpandChangee"
              align="center"
              :data="clientTypeList">
              <el-table-column type="expand" width="1" class-name="hide-expand-column">
                <!-- <el-table :data="expandData.list" class="expand-table">
                  <el-table-column
                    label="异常名称"
                    prop="abnormalName"
                    align="center">
                  </el-table-column>
                  <el-table-column label="操作" prop="index" align="center">
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        @click="$router.push(
                        `/basic_data/unusual_list/create?name=${scope.row.abnormalName}`)">
                        新增
                      </el-button>
                      <span>|</span>
                      <el-button type="text" @click="handleMatch(scope.row)">匹配</el-button>
                    </template>
                  </el-table-column>
                </el-table> -->
              </el-table-column>
              <el-table-column type="selection" width="40"></el-table-column>
              <el-table-column label="客户编号" prop="id" width="90" show-overflow-tooltip>
              </el-table-column>
              <el-table-column label="姓名" prop="clientName" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span class="clientName"
                        @click="commonHref.toPersonalHealth(scope.row.clientId, $router)">
                    {{ scope.row.clientName || '-'}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="性别" prop="gender" width="55" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>
                    {{ scope.row.gender == '1' ? '男': '女'}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="年龄" prop="age" width="55" show-overflow-tooltip>
                <template slot-scope="scope">
            <span>{{ scope.row.age | getResult}}</span>
          </template>
              </el-table-column>
              <el-table-column
                label="人员类别"
                prop="clientGridName"
                min-width="80"
                show-overflow-tooltip>
                <template slot-scope="scope">
            <span>{{ scope.row.clientGridName | getResult}}</span>
          </template>
              </el-table-column>
              <el-table-column
                label="单位"
                prop="workUnitName"
                min-width="80"
                show-overflow-tooltip>
                <template slot-scope="scope">
            <span>{{ scope.row.workUnitName | getResult}}</span>
          </template>
              </el-table-column>
              <el-table-column label="填写日期" prop="questionDate"
              min-width="90"
              show-overflow-tooltip>
                <template slot-scope="scope">
            <span>{{ scope.row.questionDate | getResultDate}}</span>
          </template>
              </el-table-column>
              <el-table-column label="总分" prop="psyTotalScore" min-width="90" show-overflow-tooltip>
                <template slot-scope="scope">
            <span>{{scope.row.psyTotalScore | getResult}}</span>
          </template>
              </el-table-column>
              <el-table-column label="问卷来源" prop="sourceName" min-width="90" show-overflow-tooltip>
                <template slot-scope="scope">
            {{ scope.row.sourceName | getResult}}
          </template>
              </el-table-column>
              <el-table-column label="查看报告" align="center" width="60">
                <template slot-scope="scope">
                  <el-button
                  v-if="scope.row.assessReportName"
                    type='text'
                    size="small"
                    @click="openPdf(scope.row)">
                查看</el-button>
                <span v-else>-</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="60">
                <template slot-scope="scope">
                  <el-button
                    type='text'
                    size="small"
                    @click="
                $router.push({
                  name: 'health_questionnaire_detail',
                  params: {
                    qusType: scope.row.questionType,
                    id: scope.row.id,
                  },
                })">
                查看</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div style="text-align: right">
              <el-pagination
                style="margin-top: 15px"
                background
                @current-change="handlePageChange"
                @size-change="handleSizeChange"
                :page-sizes="[15]"
                :current-page="table.pageNo"
                :page-size="table.pageSize"
                layout="prev, pager, next, jumper, total, sizes"
                :total="table.total"
              ></el-pagination>
            </div>
          </div>
          <!-- 生活方式评估 -->
          <div v-if="Tabactive == 0">
            <el-table
              :key="Tabactive"
              ref="table"
              class="has-expand-table"
              style="width: 100%"
              @selection-change="handleSelectionChange"
              :row-key="getRowKeys"
              @expand-change="handleExpandChange"
              align="center"
              :data="table.list">
              <el-table-column type="expand" width="1" class-name="hide-expand-column">
                <el-table :data="expandData.list" class="expand-table">
                  <el-table-column
                    label="异常名称"
                    prop="abnormalName"
                    align="center">
                  </el-table-column>
                  <el-table-column label="操作" prop="index" align="center">
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        @click="$router.push(
                        `/basic_data/unusual_list/create?name=${scope.row.abnormalName}`)">
                        新增
                      </el-button>
                      <span>|</span>
                      <el-button type="text" @click="handleMatch(scope.row)">匹配</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-table-column>
              <el-table-column type="selection" width="40"></el-table-column>
              <el-table-column label="体检编号" prop="reportNo" width="90" show-overflow-tooltip>
              </el-table-column>
              <el-table-column label="姓名" prop="clientName" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span class="clientName"
                        @click="commonHref.toPersonalHealth(scope.row.clientId, $router)">
                    {{ scope.row.clientName || '-'}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="性别" prop="genderTxt" width="55" show-overflow-tooltip>
              </el-table-column>
              <el-table-column label="年龄" prop="age" width="55" show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                label="人员类别"
                prop="gradeName"
                min-width="80"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                label="单位"
                prop="workUnitName"
                min-width="80"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column label="体检日期" prop="reportDate" min-width="90" show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                label="生活方式问卷"
                prop="lifeQuestionDate"
                min-width="120"
                align="center">
                 <!-- <template slot-scope="scope">
                  <el-select
                    v-model="scope.row.lifeQuestionDate"
                    placeholder="请选择"
                    style="width: 155px">
                    <el-option
                      :label="scope.row.lifeQuestionDate"
                      :value="scope.row.lifeQuestionDate"
                      :key="scope.row.lifeQuestionDate">
                    </el-option>
                  </el-select>
                </template> -->
                <template slot-scope="scope">
                  <el-popover
                          v-if="scope.row.lifeQuestionDate"
                          :ref="`popover-${scope.row.reportId}`"
                          placement="bottom-start"
                          width="570"
                          trigger="click"
                          @show="popoverStatusShow(scope.row)"
                          @hide="popoverStatus = false"
                  >
                    <questions-open
                      v-if="popoverStatus && popoverRefIndex === scope.row.reportId"
                      :clientId="scope.row.clientId"
                      @change="handlePopoperClose"></questions-open>
                    <el-input
                            class="select-user-trigger disabled"
                            slot="reference"
                            disabled
                            v-model="scope.row.lifeQuestionDate"
                            placeholder="请选择">
                      <i :class="`el-icon-arrow-${popoverStatus ? 'up' : 'down'}`"
                         slot="suffix"></i>
                    </el-input>
                  </el-popover>
                  <span v-else>无</span>
                </template>
              </el-table-column>
              <el-table-column label="异常" width="60" show-overflow-tooltip>
                <template slot-scope="scope">
                  <img
                    v-if="scope.row.reportAbnormalTotal > 0"
                    class="exception-explain-img"
                    @click="handleViewException(scope.row)"
                    src="../../../../assets/images/exception.png"/>
                </template>
              </el-table-column>
              <el-table-column
                label="未匹配异常"
                prop="notMatchAbnromalTotal"
                align="center"
                width="90" show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-button
                  style="color:#36BF2F;font-weight:600;"
                    type='text'
                    @click="expandsHandle(scope.row)">
                    {{scope.row.notMatchAbnromalTotal || 0}}
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column
                label="报告状态"
                prop="assessReportStateTxt"
                align="center"
                min-width="90"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column label="点评" align="center" width="55" show-overflow-tooltip>
                <template slot-scope="scope">
                  <img
                    @click="handleComment(scope.row)"
                    class="comment-img"
                    v-if="getAccess('assessment_report_comment')"
                    src="../../../../assets/images/comment.png"/>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="60">
                <template slot-scope="scope">
                  <el-button
                  v-if="scope.row.assessReportName"
                    type='text'
                    size="small"
                    @click="openPdf(scope.row)">
                查看</el-button>
                <span v-else>-</span>
                </template>
              </el-table-column>
            </el-table>
            <div style="text-align: right">
              <el-pagination
                style="margin-top: 15px"
                background
                @current-change="handlePageChange"
                @size-change="handleSizeChange"
                :page-sizes="[15]"
                :current-page="table.pageNo"
                :page-size="table.pageSize"
                layout="prev, pager, next, jumper, total, sizes"
                :total="table.total"
              ></el-pagination>
            </div>
          </div>
          <!-- 中医体质评估 -->
          <div v-if="Tabactive == 2">
            <el-table
              :key="Tabactive"
              ref="tables"
              class="has-expand-table"
              style="width: 100%"
              @selection-change="handleSelectionChangees"
              :row-key="getRowKeys"
              @expand-change="handleExpandChange"
              align="center"
              :data="dataSource">
              <el-table-column type="expand" width="1" class-name="hide-expand-column">
                <el-table :data="expandData.list" class="expand-table">
                  <el-table-column
                    label="异常名称"
                    prop="abnormalName"
                    align="center">
                  </el-table-column>
                  <el-table-column label="操作" prop="index" align="center">
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        @click="$router.push(
                        `/basic_data/unusual_list/create?name=${scope.row.abnormalName}`)">
                        新增
                      </el-button>
                      <span>|</span>
                      <el-button type="text" @click="handleMatch(scope.row)">匹配</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-table-column>
              <el-table-column type="selection" width="40"></el-table-column>
              <el-table-column label="客户编号" prop="clientNo" show-overflow-tooltip>
              </el-table-column>
              <el-table-column label="姓名" prop="clientName" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span class="clientName"
                        @click="commonHref.toPersonalHealth(scope.row.clientId, $router)">
                    {{ scope.row.clientName || '-'}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="性别" prop="gender" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span class="clientName">
                    {{ scope.row.gender == '1' ? '男': '女'}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="年龄" prop="age" show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                label="人员类别"
                prop="clientGridName"
                min-width="80"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                label="单位"
                prop="workUnitName"
                min-width="80"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column label="填写日期" prop="questionDate"
              min-width="90" show-overflow-tooltip>
              </el-table-column>
              <el-table-column label="查看报告" align="center" width="60">
                <template slot-scope="scope">
                  <el-button
                  v-if="scope.row.assessReportName"
                    type='text'
                    size="small"
                    @click="openPdf(scope.row)">
                查看</el-button>
                <span v-else>-</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
            <el-button
                    type="text"
                    size="small"
                    @click="
                $router.push({
                  name: 'health_questionnaire_detail',
                  params: {
                    qusType: scope.row.questionType,
                    id: scope.row.id,
                  },
                })
              " v-if="getAccess('china_constitution_questionnaire_view')
              "
            >查看</el-button>
          </template>
              </el-table-column>
            </el-table>
            <div style="text-align: right">
              <el-pagination
                style="margin-top: 15px"
                background
                @current-change="handlePageChange"
                @size-change="handleSizeChange"
                :page-sizes="[15]"
                :current-page="table.pageNo"
                :page-size="table.pageSize"
                layout="prev, pager, next, jumper, total, sizes"
                :total="table.total"
              ></el-pagination>
            </div>
          </div>
        </div>
        </div>
    <!-- </query-page> -->
  </div>
</template>

<script>
import QueryPage from '~/src/components/query_page/index.vue';
import Search from '~/src/components/query_page/search.vue';
import QueryFilter from '~/src/components/query_page/query_filter.vue';
import OperateButton from '~/src/components/query_page/operate_button.vue';
import ExceptionExplain from './exception_explain.vue';
import Examine from './examine.vue';
import Comment from './comment.vue';
import MatchException from './match_exception.vue';
import QuestionsOpen from '~/src/components/date_select/questions_open.vue';
// import { MAX_PAGESIZE } from '~/src/libs/util/index';

export default {
  name: 'assessment_report',
  components: {
    QueryPage,
    Search,
    QueryFilter,
    OperateButton,
    ExceptionExplain,
    Comment,
    Examine,
    MatchException,
    QuestionsOpen,
  },
  data() {
    return {
      pdf_url: process.env.api.pdf_url,
      isTrue: true,
      tabbor: ['个人健康报告', '心理评估', '中医体质评估'],
      Tabactive: 0,
      view: 1, // 1:列表页，2：异常解读，3：点评，4：匹配
      popoverStatus: false,
      popoverRefIndex: '',
      popoverRow: {},
      form: {
        keywords: '',
        reportNo: '',
        workUnitName: '',
        gridId: '',
        gender: '',
        minReportDate: null,
        maxReportDate: null,
        minAssessReportDate: null,
        maxAssessReportDate: null,
        startTime: null,
        endTime: null,
      },
      table: {
        list: [],
        pageSize: 15,
        pageNo: 1,
        total: 0,
      },
      dataSource: [],
      clientTypeList: [],
      gridList: [],
      questionFromList: [],
      multipleSelection: [],
      multipleSelectiones: [],
      multipleSelectione: [],
      expands: [],
      getRowKeys: row => row.reportId,
      expandData: {
        id: '',
        pageNo: 1,
        pageSize: 15,
        total: 0,
        list: [],
      },
      loading: false,
      currentData: {},
      currentUnMatchData: {},
      pickerStartTime: {
        disabledDate(time) {
          return time.getTime() > Date.now(); // - 8.64e7
        },
      },
      pickerEndTime: {
        disabledDate: (time) => {
          if (this.form.minReportDate) {
            const startTime = new Date(this.form.minReportDate);
            return (time.getTime() < new Date(startTime).getTime() - (3600 * 1000 * 23 * 1)
             || time.getTime() > Date.now());
          }
        },
      },
    };
  },
  /* mounted() {
    if (localStorage.getItem('homeSearchData')) {
      const HomeSearchData = JSON.parse(localStorage.getItem('homeSearchData'));
      this.form.minAssessReportDate = HomeSearchData.startDate;
      this.form.maxAssessReportDate = HomeSearchData.lastDate;
      this.form.searchRange = HomeSearchData.searchRange;
    }
    this.getClientTypeList();
    this.queryPageList();
  },*/
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (localStorage.getItem('homeSearchData')) {
        const HomeSearchData = JSON.parse(localStorage.getItem('homeSearchData'));
        vm.form.minAssessReportDate = HomeSearchData.startDate;
        vm.form.maxAssessReportDate = HomeSearchData.lastDate;
        vm.form.searchRange = HomeSearchData.searchRange;
      }
      // vm.getClientTypeList();
      vm.queryPageList();
      vm.getGridList();
      vm.getQuestionFromList();
    });
  },
  destroyed() {
    // 清除时间 和 我的/平台
    localStorage.removeItem('homeSearchData');
  },
  methods: {
    // 人员类别
    async getGridList() {
      const res = await this.$api.userManagerInterface.getGridList({ pageNo: 1, pageSize: 10000 });
      const { data } = res.data;
      this.gridList = data.data;
    },
    // 问卷来源
    async getQuestionFromList() {
      const res = await this.$api.health.getQuestionFromList({ pageNo: 1, pageSize: 10000 });
      const { data } = res.data;
      this.questionFromList = data;
    },
    // 展开更多
    upMore() {
      this.isTrue = !this.isTrue;
    },
    TabbarBtn(index) {
      this.Tabactive = index;
      this.form.source = null;
      this.form.gender = '';
      this.form.keywords = '';
      this.form.workUnitName = '';
      this.form.gridId = '';
      this.form.minReportDate = null;
      this.form.maxReportDate = null;
      this.form.minAssessReportDate = null;
      this.form.maxAssessReportDate = null;
      this.table.pageNo = 1;
      this.queryPageList();
      this.$forceUpdate();
    },
    popoverStatusShow(row) {
      this.popoverStatus = true;
      this.popoverRow = row;
      this.popoverRefIndex = row.reportId;
    },
    handlePopoperClose(data) {
      const Index = `popover-${this.popoverRefIndex}`;
      this.$refs[Index].doClose();
      this.popoverStatus = false;
      this.popoverRow.lifeQuestionDate = data.questionDate ? data.questionDate.split(' ')[0] : '';
      this.popoverRow.lifeQuestionId = data.id;
    },
    // 查看pdf
    openPdf(data) {
      window.open(this.pdf_url + data.assessReportName);
    },
    handleMatch(data) {
      this.view = 4;
      this.currentUnMatchData = data;
    },
    handleViewException(data) {
      this.view = 2;
      this.currentData = data;
    },
    handleComment(data) {
      this.view = 3;
      this.currentData = data;
    },
    handleExamine() {
      if (this.multipleSelection.length === 0) {
        this.$message.warning('请先选择数据');
        return false;
      }
      // this.view = 5;
      const params = this.multipleSelection.map(({ clientId, lifeQuestionId, reportId }) => {
        const data = {
          clientId,
          lifeQuestionId,
          reportInfoId: reportId,
        };
        return data;
      });
      this.$api.accessReport.generateReport(params).then(() => {
        this.$message.success('操作成功');
        this.queryPageList();
        this.getQuestionFromList();
      });
    },
    handleClose() {
      this.view = 1;
      this.queryPageList();
    },
    reset() {
      this.form.source = null;
      this.form.gender = '';
      this.form.keywords = '';
      this.form.workUnitName = '';
      this.form.gridId = '';
      this.form.minReportDate = null;
      this.form.maxReportDate = null;
      this.form.minAssessReportDate = null;
      this.form.maxAssessReportDate = null;
      this.table.pageNo = 1;
      this.queryPageList();
    },
    onSearch() {
      if (!this.checkRangeDate()) {
        return false;
      }
      this.table.pageNo = 1;
      this.queryPageList();
    },
    async queryPageList() {
      if (!this.checkRangeDate()) {
        return false;
      }
      const sendData = Object.assign({}, this.form);
      if (sendData.minAssessReportDate) {
        sendData.minAssessReportDate = `${sendData.minAssessReportDate} 00:00:00`;
      }
      if (sendData.maxAssessReportDate) {
        sendData.maxAssessReportDate = `${sendData.maxAssessReportDate} 23:59:59`;
      }
      if (this.Tabactive === 0) {
        // 生活方式评估
        await this.$api.accessReport.fetchUserList({
          ...sendData,
          pageNo: this.table.pageNo,
          pageSize: this.table.pageSize,
        }).then(({ data }) => {
          this.table.total = data.data.total;
          this.table.list = data.data.data;
        });
      } else if (this.Tabactive === 1) {
        // 心理问卷
        this.$api.health
          .fetch(Object.assign({
            ...sendData,
            pageNo: this.table.pageNo,
            pageSize: this.table.pageSize,
            questionType: 3,
          }))
          .then(({ data }) => {
            this.total = data.data.total;
            this.clientTypeList = data.data.data;
          });
      } else {
        // 中医体质评估
        this.$api.health
          .fetch(Object.assign({
            ...sendData,
            pageNo: this.table.pageNo,
            pageSize: this.table.pageSize,
            questionType: 2,
          }))
          .then(({ data }) => {
            this.total = data.data.total;
            this.dataSource = data.data.data;
          });
      }
    },
    // 心理问卷
    // getClientTypeList() {
    //   this.$api.medicalHistoryInterface.clientTypeList({
    //     pageNo: 1,
    //     pageSize: MAX_PAGESIZE,
    //   }).then((res) => {
    //     this.clientTypeList = res.data.data.data;
    //   });
    // },
    checkRangeDate() {
      if (this.form.minReportDate && this.form.maxReportDate
      && new Date(this.form.minReportDate) > new Date(this.form.maxReportDate)) {
        this.$message.error('体检日期开始时间不可大于结束时间');
        return false;
      }
      if (this.form.minAssessReportDate && this.form.maxAssessReportDate
      && new Date(this.form.minAssessReportDate) > new Date(this.form.maxAssessReportDate)) {
        this.$message.error('生成日期开始时间不可大于结束时间');
        return false;
      }
      return true;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSelectionChangee(val) {
      this.multipleSelectione = val;
    },
    handleSelectionChangees(val) {
      this.multipleSelectiones = val;
    },
    handleExpandChange(row, expandRows) {
      this.expands = expandRows;
    },
    expandsHandle(row) {
      if (this.loading) {
        return false;
      }
      this.expands.forEach((data) => {
        // 其他展开的行收起
        if (data.id !== row.id) {
          this.$refs.table.toggleRowExpansion(data);
        }
      });
      if (this.expands.includes(row)) {
        this.$refs.table.toggleRowExpansion(row);
      } else {
        this.expandData.id = row.reportId;
        this.expandData.pageNo = 1;
        this.getUnMatchExceptionList().then(() => {
          this.$refs.table.toggleRowExpansion(row);
        });
      }
    },
    getUnMatchExceptionList() {
      this.expandData.list = [];
      this.loading = true;
      return this.$api.accessReport.getUnMatchExceptionList(this.expandData.id).then(({ data }) => {
        this.expandData.list = data.data;
        this.loading = false;
        this.tableData = [...this.tableData];
      }).catch(() => {
        this.loading = false;
      });
    },
    handlePageChange(page) {
      this.table.pageNo = page;
      this.queryPageList();
    },
    handleSizeChange(size) {
      this.table.pageSize = size;
      this.queryPageList();
    },
    // 生成报告
    generateReporte() {
      if (this.multipleSelectione.length === 0) {
        this.$message.warning('请先选择数据');
        return false;
      }
      const params = [];
      this.multipleSelectione.forEach((value) => {
        params.push(value.id);
      });
      this.$api.accessReport.generatepsyReport(params).then(() => {
        this.$message.success('操作成功');
        this.queryPageList();
      });
    },
    // 生成中医报告
    generateReportes() {
      if (this.multipleSelectiones.length === 0) {
        this.$message.warning('请先选择数据');
        return false;
      }
      const params = [];
      this.multipleSelectiones.forEach((value) => {
        params.push(value.id);
      });
      this.$api.accessReport.generatetcmReport(params).then(() => {
        this.$message.success('操作成功');
        this.queryPageList();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .main .main-content-con .content-wrapper{
  padding: 0 !important;
}
/deep/ .el-table__expand-icon > .el-icon{
  margin: 0;
}
/*/deep/ .el-table__expanded-cell {
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
}*/
.divTop{
  padding-top: 30px;
}
.TabBars {
  display: flex;
  align-items: center;
  height: 47px;
  width: calc(100% - 40px);
  background: #f6f8fc;
  position: absolute;
  top: 18px;
  margin-top: -20px;
  z-index: 1;
  margin-left: -20px;
  div {
    .TabBarsNames {
      cursor: pointer;
      background: #eef1f5;
      border-color: transparent;
      color: #666666;
      position: relative;
      padding: 14px 16px;
      font-size: 14px;
      border-radius: 8px 8px 0 0;
      margin: 0 26px 0 20px;
    }
    .fristName:nth-child(1) {
      border-radius: 8px 5px 0 0;
      margin-left: 0;
    }
    .TabBarsNames:after {
      content: '';
      display: block;
      width: 25px;
      height: 47px;
      position: absolute;
      -webkit-transform: skewX(23deg);
      transform: skewX(23deg);
      background: #eef1f5;
      border-top-right-radius: 8px;
      top: 0px;
      right: -13px;
    }
    .TabBarsNames:before {
      content: '';
      display: block;
      width: 25px;
      height: 47px;
      position: absolute;
      -webkit-transform: skewX(-23deg);
      transform: skewX(-23deg);
      background: #eef1f5;
      border-top-left-radius: 8px;
      top: 0px;
      left: -13px;
    }
    .fristName:nth-child(1)::before {
      width: 0;
      height: 0;
    }
    .TabBarsName {
      cursor: pointer;
      background: #ffffff;
      border-color: transparent;
      color: #333333;
      font-weight: 600;
      position: relative;
      margin: 0 26px 0 20px;
      padding: 14px 16px;
      font-size: 14px;
      border-radius: 8px 8px 0 0;
    }
    .TabBarsName:after {
      content: '';
      display: block;
      width: 25px;
      height: 47px;
      position: absolute;
      -webkit-transform: skewX(23deg);
      transform: skewX(23deg);
      background: white;
      border-top-right-radius: 8px;
      top: 0px;
      right: -13px;
    }
    .TabBarsName::before {
      content: '';
      display: block;
      width: 25px;
      height: 47px;
      position: absolute;
      -webkit-transform: skewX(-23deg);
      transform: skewX(-23deg);
      background: white;
      border-top-left-radius: 8px;
      top: 0px;
      left: -13px;
    }
  }
}
.extimate-report {
  /deep/ .search-button {
    &:hover {
      background: #55AAFF;
    }
    img {
      width: 16px;
    }
  }
  /deep/ .el-table .cell{
    padding-left: 1px !important;
    padding-right: 1px !important;
  }
  /deep/ .select-user-trigger {
    display: flex;
    .el-input__suffix{
      right: 10px;
      top: 4px;
    }
    input, i {
      cursor: pointer;
      border: none;
      background-color: white !important;
      &::placeholder{
        color: #666666;
      }
    }
    input{
      border: 1px solid #97A6BD!important;
      color: #333333;
      height: 32px;
    }
  }
  /deep/ .comment-img, /deep/ .exception-explain-img {
    cursor: pointer;
    width: 18px;
    vertical-align: middle;
  }
  /deep/ .el-pagination__sizes {
    margin-right: 0;
    .el-select .el-input {
      margin: 0;
    }
  }
  /deep/ .el-pagination__sizes {
    margin-right: 0;
    .el-select .el-input {
      margin: 0;
    }
  }
}
</style>
