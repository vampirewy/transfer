<template>
  <div class="extimate-report">
    <match-exception
      v-if="view === 4"
      :exception="currentUnMatchData"
      @close="handleClose">
    </match-exception>
    <comment
      v-else-if="view === 3"
      :id="currentData.id"
      @close="handleClose">
    </comment>
    <div v-else>
      <div class="divTop">
          <div class="divTitle">
            <span><img src="@/assets/images/common/titleLeft.png" alt=""></span>团体报告</div>
          <div class="searchCondition">
          <div class="searchLeft">
          <div class="searchInputFormItem">
            <el-input placeholder="单位/编号" v-model="form.keywords">
            </el-input>
            <span class="searchBtnImgSpan" @click="onSearch">
                <img class="searchBtnImg" src="@/assets/images/common/topsearch.png"/>
            </span>
          </div>
          <div>
            <span>生成日期：</span>
            <el-date-picker
            v-model="form.startCreatedTime"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            style="width: 140px;"
            :picker-options="pickerStartTime"
            placeholder="选择开始时间">
            </el-date-picker>
            <span class="timing">-</span>
          <el-date-picker
            v-model="form.endCreatedTime"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            style="width: 140px"
            :picker-options="pickerEndTime"
            placeholder="选择结束时间">
          </el-date-picker>
          </div>
            </div>
            <div class="searchRight">
            <div class="buttones">
            <div class="searchFor" @click="onSearch">
            <img src="@/assets/images/common/topsearchblue.png" alt="">
          </div>
          <div class="resetAll" @click="reset">重置</div>
          <div class="more" v-if="isTrue" @click="upMore">
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
           <div>
            <span>体检开始：</span>
            <el-date-picker
            v-model="form.startPEStartTime"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            style="width: 140px;"
            :picker-options="pickerStartTime1"
            placeholder="选择开始时间">
            </el-date-picker>
            <span class="timing">-</span>
          <el-date-picker
            v-model="form.endPEStartTime"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            style="width: 140px"
            :picker-options="pickerEndTime1"
            placeholder="选择结束时间">
          </el-date-picker>
          </div>
          <div>
            <span>体检结束：</span>
            <el-date-picker
            v-model="form.startPEndTime"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            style="width: 140px;"
            :picker-options="pickerStartTime2"
            placeholder="选择开始时间">
            </el-date-picker>
            <span class="timing">-</span>
          <el-date-picker
            v-model="form.endPEndTime"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            style="width: 140px"
            :picker-options="pickerEndTime2"
            placeholder="选择结束时间">
          </el-date-picker>
          </div>
          </div>
        </div>
        <div class="topbottomborder"></div>
        <div class="divRightTitleDiv">
          <div>
            <el-button
            style="margin: 16px 0;"
                    size="small"
                    @click="createReport"
                    class="btn-new btnDel"
                    v-if="getAccess('team_report_create')"
            ><img src="@/assets/images/common/addBtn.png" />生成</el-button>
            <el-button
            style="margin: 16px 0;"
                    size="small"
                    @click="generateReport"
                    class="btn-new btnDel"
                    v-if="getAccess('team_report_receive')"
            ><img src="@/assets/images/common/deliverBtn.png" />配置</el-button>
          </div>
        </div>
        <div class="right">
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
              <el-table-column label="报告编号" prop="no" width="90" show-overflow-tooltip>
              </el-table-column>
              <el-table-column label="团队名称" prop="teamName" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  <!-- <span class="clientName"
                        @click="commonHref.toPersonalHealth(scope.row.clientId, $router)">
                    {{ scope.row.teamName || '-'}}
                  </span> -->
                  <span>
                    {{ scope.row.teamName || '-'}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="参检团队" prop="inspectionTeam" show-overflow-tooltip>
              </el-table-column>
              <el-table-column label="参检人数" prop="scope" show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                label="体检开始日期"
                prop="startDate"
                min-width="80"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                label="体检结束日期"
                prop="endDate"
                min-width="80"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column label="点评" align="center" width="55" show-overflow-tooltip>
                <template slot-scope="scope">
                  <img
                    @click="handleComment(scope.row)"
                    class="comment-img"
                    v-if="getAccess('team_report_said')"
                    src="../../../../assets/images/comment.png"/>
                </template>
              </el-table-column>
              <el-table-column label="生成日期" prop="createdTime" min-width="90" show-overflow-tooltip>
              </el-table-column>
              <el-table-column label="操作" align="center" width="60">
                <template slot-scope="scope">
                  <el-button
                    type='text'
                    size="small"
                    v-if="getAccess('team_report_view')"
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
        </div>
    <!-- </query-page> -->
  </div>
</template>

<script>
import QueryPage from '~/src/components/query_page/index.vue';
import Search from '~/src/components/query_page/search.vue';
import QueryFilter from '~/src/components/query_page/query_filter.vue';
import OperateButton from '~/src/components/query_page/operate_button.vue';
import Comment from './comment.vue';
import MatchException from './match_exception.vue';
import QuestionsOpen from '~/src/components/date_select/questions_open.vue';
import { MAX_PAGESIZE } from '~/src/libs/util/index';

export default {
  name: 'team_report',
  components: {
    QueryPage,
    Search,
    QueryFilter,
    OperateButton,
    Comment,
    MatchException,
    QuestionsOpen,
  },
  data() {
    return {
      isTrue: true,
      tabbor: ['个人健康报告', '心理评估', '中医体质评估'],
      Tabactive: 0,
      view: 1, // 1:列表页，2：异常解读，3：点评，4：匹配
      popoverStatus: false,
      popoverRefIndex: '',
      popoverRow: {},
      form: {
        keywords: '',
        startCreatedTime: null,
        endCreatedTime: null,
        startPEStartTime: null,
        endPEStartTime: null,
        startPEndTime: null,
        endPEndTime: null,
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
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e7;
        },
      },
      pickerEndTime: {
        disabledDate: (time) => {
          if (this.form.startCreatedTime) {
            const startTime = new Date(this.form.startCreatedTime);
            return (time.getTime() < new Date(startTime).getTime() - (3600 * 1000 * 23 * 1)
             || time.getTime() > Date.now() - 8.64e7);
          }
        },
      },
      pickerStartTime1: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e7;
        },
      },
      pickerEndTime1: {
        disabledDate: (time) => {
          if (this.form.startPEStartTime) {
            const startTime = new Date(this.form.startPEStartTime);
            return (time.getTime() < new Date(startTime).getTime() - (3600 * 1000 * 23 * 1)
             || time.getTime() > Date.now() - 8.64e7);
          }
        },
      },
      pickerStartTime2: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e7;
        },
      },
      pickerEndTime2: {
        disabledDate: (time) => {
          if (this.form.startPEndTime) {
            const startTime = new Date(this.form.startPEndTime);
            return (time.getTime() < new Date(startTime).getTime() - (3600 * 1000 * 23 * 1)
             || time.getTime() > Date.now() - 8.64e7);
          }
        },
      },
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (localStorage.getItem('homeSearchData')) {
        const HomeSearchData = JSON.parse(localStorage.getItem('homeSearchData'));
        vm.form.minAssessReportDate = HomeSearchData.startDate;
        vm.form.maxAssessReportDate = HomeSearchData.lastDate;
        vm.form.searchRange = HomeSearchData.searchRange;
      }
      vm.getClientTypeList();
      vm.queryPageList();
    });
  },
  destroyed() {
    // 清除时间 和 我的/平台
    localStorage.removeItem('homeSearchData');
  },
  methods: {
    reset() {
      this.form.keywords = '';
      this.form.startCreatedTime = null;
      this.form.endCreatedTime = null;
      this.form.startPEStartTime = null;
      this.form.endPEStartTime = null;
      this.form.startPEndTime = null;
      this.form.endPEndTime = null;
      this.table.pageNo = 1;
      this.queryPageList();
    },
    // 展开更多
    upMore() {
      this.isTrue = !this.isTrue;
    },
    TabbarBtn(index) {
      this.Tabactive = index;
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
      this.popoverRow.lifeQuestionDate = data.createTime ? data.createTime.split(' ')[0] : '';
      this.popoverRow.lifeQuestionId = data.id;
    },
    // 查看pdf
    openPdf(data) {
      window.open(data.reportFile);
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
      await this.$api.accessReport.groupReportList({
        ...sendData,
        pageNo: this.table.pageNo,
        pageSize: this.table.pageSize,
      }).then(({ data }) => {
        this.table.total = data.data.total;
        this.table.list = data.data.data;
      });
    },
    getClientTypeList() {
      this.$api.medicalHistoryInterface.clientTypeList({
        pageNo: 1,
        pageSize: MAX_PAGESIZE,
      }).then((res) => {
        this.clientTypeList = res.data.data.data;
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
    // 配置
    generateReport() {
      this.$router.push({
        path: '/team_configure',
      });
    },
    // 生成
    createReport() {
      if (this.multipleSelection.length === 0) {
        this.$router.push({
          path: '/team_create',
        });
      } else if (this.multipleSelection.length > 1) {
        this.$message.warning('请选择一条数据');
      } else {
        this.$router.push({
          path: '/team_create',
          query: {
            id: this.multipleSelection[0].reportId,
          },
        });
      }
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
.searchCondition .buttones div{
  margin: 10px 10px 0 0;
}
</style>
