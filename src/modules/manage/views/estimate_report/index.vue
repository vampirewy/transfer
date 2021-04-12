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
    <query-page v-else @reset="reset" @search="onSearch">
      <template slot="left">
        <search>
          <div class="searchInputFormItem">
            <el-input placeholder="姓名/手机号/企业单位" v-model="form.keywords"></el-input>
            <span class="searchBtnImgSpan" @click="onSearch">
              <img class="searchBtnImg" src="@/assets/images/common/search.png"/>
            </span>
          </div>
        </search>
        <query-filter>
          <el-input placeholder="体检编号" v-model="form.reportNo"></el-input>
          <!-- <el-input placeholder="企业单位" v-model="form.workUnitName"></el-input> -->
          <el-select placeholder="人员类别" v-model="form.gridId" clearable>
            <el-option
              v-for="item in clientTypeList"
              :key="item.id"
              :label="item.gridName"
              :value="item.id">
            </el-option>
          </el-select>
          <div class="filter-item-title">体检日期</div>
          <el-date-picker
            v-model="form.minReportDate"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :picker-options="pickerStartTime"
            placeholder="选择开始时间">
            </el-date-picker>
          <el-date-picker
            v-model="form.maxReportDate"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :picker-options="pickerEndTime"
            placeholder="选择结束时间">
          </el-date-picker>
          <div class="filter-item-title">生成日期</div>
          <el-date-picker
            v-model="form.minAssessReportDate"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :picker-options="pickerStartTime1"
            placeholder="选择开始时间">
            </el-date-picker>
          <el-date-picker
            v-model="form.maxAssessReportDate"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :picker-options="pickerEndTime1"
            placeholder="选择结束时间">
          </el-date-picker>
        </query-filter>
      </template>
      <template slot="right">
        <div>
          <div class="table-operate-buttons">
            <span class="page-name">评估报告</span>
            <div>
              <operate-button
              type="generateReport"
              v-if="getAccess('assessment_report_generate')"
              @click="generateReport">
              </operate-button>
            </div>
          </div>
          <div>
            <el-table
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
                label="企业单位"
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
                 <!--<template slot-scope="scope">
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
                </template>-->
                <template slot-scope="scope" v-if="scope.row.lifeQuestionDate">
                  <el-popover
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
                    <!--v-if="popoverStatus"-->
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
                    type='text'
                    v-if="scope.row.notMatchAbnromalTotal > 0"
                    @click="expandsHandle(scope.row)">
                    {{scope.row.notMatchAbnromalTotal}}
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
                    type='text'
                    size="small"
                    v-if="!!scope.row.assessReportName"
                    @click="openPdf(scope.row)">查看</el-button>
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
      </template>
    </query-page>
  </div>
</template>

<script>
import QueryPage from '~/src/components/query_page/index.vue';
import Search from '~/src/components/query_page/search.vue';
import QueryFilter from '~/src/components/query_page/query_filter.vue';
import OperateButton from '~/src/components/query_page/operate_button.vue';
import ExceptionExplain from './exception_explain.vue';
import Comment from './comment.vue';
import MatchException from './match_exception.vue';
import QuestionsOpen from '~/src/components/date_select/questions_open.vue';
import { MAX_PAGESIZE } from '~/src/libs/util/index';

export default {
  name: 'EstimateReport',
  components: {
    QueryPage,
    Search,
    QueryFilter,
    OperateButton,
    ExceptionExplain,
    Comment,
    MatchException,
    QuestionsOpen,
  },
  data() {
    return {
      view: 1, // 1:列表页，2：异常解读，3：点评，4：匹配
      popoverStatus: false,
      popoverRefIndex: '',
      popoverRow: {},
      form: {
        keywords: '',
        reportNo: '',
        workUnitName: '',
        gridId: '',
        minReportDate: null,
        maxReportDate: null,
        minAssessReportDate: null,
        maxAssessReportDate: null,
      },
      table: {
        list: [],
        pageSize: 15,
        pageNo: 1,
        total: 0,
      },
      clientTypeList: [],
      multipleSelection: [],
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
        disabledDate: (time) => {
          if (this.form.maxReportDate) {
            const endTime = new Date(this.form.maxReportDate);
            return time.getTime() > new Date(endTime).getTime() - (3600 * 1000 * 23 * 1);
          }
        },
      },
      pickerEndTime: {
        disabledDate: (time) => {
          if (this.form.minReportDate) {
            const startTime = new Date(this.form.minReportDate);
            return time.getTime() < new Date(startTime).getTime() - (3600 * 1000 * 23 * 1);
          }
        },
      },
      pickerStartTime1: {
        disabledDate: (time) => {
          if (this.form.maxAssessReportDate) {
            const endTime = new Date(this.form.maxAssessReportDate);
            return time.getTime() > new Date(endTime).getTime() - (3600 * 1000 * 23 * 1);
          }
        },
      },
      pickerEndTime1: {
        disabledDate: (time) => {
          if (this.form.minAssessReportDate) {
            const startTime = new Date(this.form.minAssessReportDate);
            return time.getTime() < new Date(startTime).getTime() - (3600 * 1000 * 23 * 1);
          }
        },
      },
    };
  },
  mounted() {
    if (localStorage.getItem('homeSearchData')) {
      const HomeSearchData = JSON.parse(localStorage.getItem('homeSearchData'));
      this.form.minAssessReportDate = HomeSearchData.startDate;
      this.form.maxAssessReportDate = HomeSearchData.lastDate;
      this.form.searchRange = HomeSearchData.searchRange;
    }
    this.getClientTypeList();
    this.queryPageList();
  },
  destroyed() {
    // 清除时间 和 我的/平台
    localStorage.removeItem('homeSearchData');
  },
  methods: {
    popoverStatusShow(row) {
      /* if (this.popoverRefIndex) {
        const Index = `popover-${this.popoverRefIndex}`;
        this.$refs[Index].doClose();
        this.popoverStatus = false;
      }*/
      this.popoverStatus = true;
      this.popoverRow = row;
      this.popoverRefIndex = row.reportId;
    },
    handlePopoperClose(data) {
      const Index = `popover-${this.popoverRefIndex}`;
      this.$refs[Index].doClose();
      this.popoverStatus = false;
      this.popoverRow.lifeQuestionDate = data.createTime ? data.createTime.split(' ')[0] : '';
      this.popoverRow.lifeQuestionId = data.id;
      // this.formData.questionId = data.id;
      // this.formData.questionTime = data.createTime ? data.createTime.split(' ')[0] : '';
      // this.getDangerRiskInfo(this.formData.questionId);
    },
    openPdf(data) {
      window.open(data.assessReportName);
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
    handleClose() {
      this.view = 1;
      this.queryPageList();
    },
    reset() {
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
      await this.$api.accessReport.fetchUserList({
        ...sendData,
        pageNo: this.table.pageNo,
        pageSize: this.table.pageSize,
      }).then(({ data }) => {
        this.table.total = data.data.total;
        this.table.list = data.data.list;
      });
    },
    getClientTypeList() {
      this.$api.medicalHistoryInterface.clientTypeList({
        pageNo: 1,
        pageSize: MAX_PAGESIZE,
      }).then((res) => {
        this.clientTypeList = res.data.data.list;
      });
    },
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
    generateReport() {
      if (this.multipleSelection.length === 0) {
        this.$message.warning('请先选择数据');
        return false;
      }
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
      });
    },
  },
};
</script>

<style lang="scss" scoped>
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
      right: 15px;
      top: 6px;
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
    }
    /*&.disabled {
      input, i {
        cursor: auto;
      }
    }*/
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
