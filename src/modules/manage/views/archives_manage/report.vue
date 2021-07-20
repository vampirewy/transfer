<template>
  <div class="report-page">
      <template>
        <div>
          <div class="table-operate-buttonss" style="margin-top: -8px">
            <!-- <span class="page-name">体检报告</span> -->
          <div class="divTop">
            <div class="divTitle">
              <span><img src="@/assets/images/common/titleLeft.png" alt="" /></span>
              体检报告
            </div>
            <div class="searchCondition">
              <div class="searchLeft">
                <div class="searchInputFormItem">
                  <el-input
                    placeholder="姓名/体检编号"
                    v-model="formData.keywords"
                  >
                  </el-input>
                  <span class="searchBtnImgSpan" @click="search">
                    <img
                      class="searchBtnImg"
                      src="@/assets/images/common/topsearch.png"
                    />
                  </span>
                </div>
                <div>
                  <span>客户性别：</span>
                  <el-select
                    v-model="formData.gender"
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
                    v-model="formData.clientGrid"
                    placeholder="请选择"
                    style="width: 140px"
                  >
                    <el-option
                      :label="item.gridName"
                      :value="item.id"
                      v-for="(item, index) in gridList"
                      :key="index"
                    ></el-option>
                  </el-select>
                </div>
                <div>
                  <span>是否总检：</span>
                  <el-select
                    v-model="formData.reportState"
                    placeholder="请选择"
                    style="width: 140px"
                  >
                  <el-option label="未知" value="0" key="0"></el-option>
                  <el-option label="已总检" value="1" key="1"></el-option>
                  <el-option label="未总检" value="2" key="2"></el-option>
                  </el-select>
                </div>
              </div>
               <div class="searchRight">
                <div class="buttones">
                  <div class="searchFor" @click="search">
                    <img src="@/assets/images/common/topsearchblue.png" alt="" />
                  </div>
                  <div class="resetAll" @click="reset">重置</div>
                  <div class="more" v-if="isTrue" @click="upMore">
                    <span>></span>
                    展开更多
                  </div>
                  <div class="more noMore" v-if="!isTrue" @click="upMore">
                    <span>></span>收起筛选
                  </div>
                </div>
              </div>
            </div>
          </div>
           <div v-if="!isTrue" class="searchCondition" style="width: 90%">
            <div class="searchLeft" style="padding-left: 5px">
              <div>
                <span>参检团队：</span>
                <el-input placeholder="参检团队" v-model="formData.workUnitName"
                style="width:140px">
                </el-input>
              </div>
              <div>
                <span>体检日期：</span>
                <el-date-picker
                  v-model="formData.minReportDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  :max-date="formData.maxReportDate || new Date()"
                  placeholder="选择开始日期"
                  style="width: 140px"
                >
                </el-date-picker>
                <span class="timing">-</span>
                <el-date-picker
                  v-model="formData.maxReportDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  :min-date="formData.minReportDate"
                  :max-date="new Date()"
                  placeholder="选择结束日期"
                  style="width: 140px"
                >
                </el-date-picker>
              </div>
              <div>
                <span>采集日期：</span>
                <el-date-picker
                  v-model="formData.minCreateDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  :max-date="formData.maxCreateDate || new Date()"
                  placeholder="选择开始日期"
                  style="width: 140px"
                >
                </el-date-picker>
                <span class="timing">-</span>
                <el-date-picker
                  v-model="formData.maxCreateDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  :min-date="formData.minCreateDate"
                  :max-date="new Date()"
                  placeholder="选择结束日期"
                  style="width: 140px"
                >
                </el-date-picker>
              </div>
            </div>
          </div>
          <div class="topbottomborder"></div>

            <div class="operates">
              <operate-button
                type="add"
                @click="handleAdd"
                v-if="getAccess('physical_examination_report_add')"></operate-button>
              <operate-button
                type="delete"
                @click="handleDelete"
                v-if="getAccess('physical_examination_report_batch_delete')
                "></operate-button>
                <!-- <operate-button
                type="editGray"
                @click="handleeditGray"
                v-if="getAccess('physical_examination_report_batch_delete')
                "></operate-button> -->
            </div>
          </div>
          <div>
            <el-table
              ref="table"
              class="has-expand-table"
              :data="dataSource"
              @selection-change="handleSelectionChange"
              :row-key="getRowKeys"
              @expand-change="handleExpandChange">
              <el-table-column type="selection" width="40" align="center"></el-table-column>
              <el-table-column
                label="体检编号"
                prop="reportNo"
                align="center"
                show-overflow-tooltip></el-table-column>
              <el-table-column
                label="姓名"
                prop="clientName"
                align="center"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <span class="clientName"
                        @click="commonHref.toPersonalHealth(scope.row.clientId, $router)">
                  {{ scope.row.clientName }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="性别"
                prop="gender"
                align="center"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  {{scope.row.gender === 1 ? '男' : (scope.row.gender === 2 ? '女' : '')}}
                </template>
              </el-table-column>
              <el-table-column
                label="年龄"
                prop="age"
                align="center"
                show-overflow-tooltip></el-table-column>
              <el-table-column
                label="人员类别"
                prop="clientGridName"
                align="center"
                show-overflow-tooltip></el-table-column>
              <el-table-column
                label="体检日期"
                prop="reportDate"
                min-width="100"
                show-overflow-tooltip
                align="center">
              </el-table-column>
               <el-table-column
                label="总检日期"
                prop="zjDate"
                min-width="100"
                show-overflow-tooltip
                align="center">
              </el-table-column>
                 <el-table-column
                label="总检"
                prop="reportState"
                align="center"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  {{scope.row.reportState === 1 ?
                  '已总检' : (scope.row.reportState === 2 ?
                  '未总检' : '')}}
                </template>
                </el-table-column>
              <el-table-column
                label="采集日期"
                prop="createdTime"
                align="center"
                show-overflow-tooltip></el-table-column>
              <el-table-column
                label="体检次数"
                prop="reportCount"
                align="center"
                show-overflow-tooltip></el-table-column>
              <el-table-column
                label="参检团队"
                prop="workUnitName"
                align="center"
                min-width="100"
                show-overflow-tooltip></el-table-column>
              <el-table-column label="操作" prop="index" width="120" align="center">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="small"
                    @click="handleEdit(scope.row.id)"
                    v-if="getAccess('physical_examination_report_edit')
                    "
                  >编辑</el-button>
                  <el-button
                    type="text"
                    size="small"
                    @click="handleDetail(scope.row.id)"
                    v-if="getAccess('physical_examination_report_view')"
                  >查看</el-button>
                  <!-- <el-button
                    type="text"
                    size="small"
                    @click="remove([scope.row.id])"
                    v-if="getAccess('physical_examination_report_delete')"
                  >删除</el-button> -->
                </template>
              </el-table-column>
            </el-table>
            <div style="text-align: right">
              <el-pagination
                style="margin-top: 15px"
                @current-change="searchpage"
                background
                :total="total"
                :page-size="params.pageSize"
                :current-page="params.pageNo"
                :page-sizes="[15]"
                layout="prev, pager, next, jumper, total, sizes"
              ></el-pagination>
            </div>
          </div>
        </div>
      </template>
    <!-- </query-page> -->
  </div>
</template>

<script>
import QueryPage from '~/src/components/query_page/index.vue';
import Search from '~/src/components/query_page/search.vue';
import QueryFilter from '~/src/components/query_page/query_filter.vue';
import OperateButton from '~/src/components/query_page/operate_button.vue';
import deleteIcon from '~/src/assets/images/deleteicon.png';
import ReportEdit from './report_edit.vue';
import ReportDetail from './report_detail.vue';

export default {
  name: 'physical_examination_report',
  components: {
    QueryPage,
    Search,
    QueryFilter,
    OperateButton,
    ReportEdit,
    ReportDetail,
  },
  data() {
    return {
      isTrue: true,
      view: 1, // 1:列表，2:新增、编辑，3:详情
      currentId: '',
      total: 0,
      dataSource: [],
      gridList: [], // 人员类别
      formData: {
        keywords: '', // 搜索客户姓名/企业名称/体检医院
        gender: '', // 性别0-男1-女
        minReportDate: null, // 体检日期搜索 最小体检日期搜索
        maxReportDate: null, // 体检日期搜索 最大体检日期搜索
        // workUnitName: '', // 所属企业名字
        // reportNo: '', // 体检编号
        // clientId: '', // 客户id
        reportState: '', // 总检状态 0.未知 1.已总检 2.未总检
        clientGrid: '', // 客户类型
        minCreateDate: null, // 搜索条件采集时间最小时间
        maxCreateDate: null, // 搜索条件采集时间最大时间
        // reportAbnormalTempId: '', // 临时异常id搜索
        workUnitName: '', // 参检团队
      },
      params: {
        pageNo: 1, // 页码
        pageSize: 15, // 页数 默认10
      },
      multipleSelection: [],
      expands: [],
      getRowKeys: row => row.id,
      expandData: {
        clientId: '',
        pageNo: 1,
        pageSize: 15,
        total: 0,
        list: [],
      },
      loading: false,
      pickerStartTime: {
        disabledDate: (time) => {
          if (this.formData.maxReportDate) {
            const endTime = new Date(this.formData.maxReportDate);
            return time.getTime() > new Date(endTime).getTime() - (3600 * 1000 * 23 * 1);
          }
        },
      },
      pickerEndTime: {
        disabledDate: (time) => {
          if (this.formData.minReportDate) {
            const startTime = new Date(this.formData.minReportDate);
            return time.getTime() < new Date(startTime).getTime() - (3600 * 1000 * 23 * 1);
          }
        },
      },
    };
  },
  activated() {
    if (localStorage.getItem('homeSearchData')) {
      // const HomeSearchData = JSON.parse(localStorage.getItem('homeSearchData'));
      // this.formData.minReportDate = HomeSearchData.startDate;
      // this.formData.maxReportDate = HomeSearchData.lastDate;
      // this.formData.searchRange = HomeSearchData.searchRange;
    }
  },
  destroyed() {
    // 清除时间 和 我的/平台
    localStorage.removeItem('homeSearchData');
  },
  methods: {
    upMore() {
      this.isTrue = !this.isTrue;
      this.$forceUpdate();
    },
    handleClose() { // refresh
      this.view = 1;
      this.fetch();
    },
    handleEdit(id) {
      this.view = 2;
      this.currentId = id;
      this.$router.push({
        path: '/report_edit',
        query: {
          // clientId: '1408304870765432833',
          id: this.currentId,
        },
      });
    },
    handleDetail(id) {
      this.view = 3;
      this.currentId = id;
      this.currentId = id;
      this.$router.push({
        path: '/report_detail',
        query: {
          id: this.currentId,
        },
      });
    },
    handleAdd() {
      this.view = 2;
      this.currentId = '';
      this.$router.push({
        path: '/report_edit',
        query: {
          id: '',
        },
      });
    },
    handleExpandPageChange(page) {
      this.expandData.pageNo = page;
      this.getReoprtList();
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
        this.expandData.clientId = row.clientId;
        this.expandData.pageNo = 1;
        this.getReoprtList().then(() => {
          this.$refs.table.toggleRowExpansion(row);
        });
      }
    },
    getReoprtList() {
      this.expandData.list = [];
      this.loading = true;
      return this.$api.reportInterface.fetchReportList({
        pageNo: this.expandData.pageNo,
        pageSize: this.expandData.pageSize,
        clientId: this.expandData.clientId,
      }).then(({ data }) => {
        this.expandData.list = data.data.data;
        this.expandData.total = data.data.total;
        this.loading = false;
        // 展开的table的渲染更新依赖外层table数据，如果外层数据没变，展开的内容不会更新渲染，所以这里更新一下dataSource
        this.dataSource = [...this.dataSource];
        this.$forceUpdate();
      }).catch(() => {
        this.loading = false;
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    reset() {
      this.formData.keywords = '';
      this.formData.workUnitName = '';
      this.formData.gender = '';
      this.formData.clientGrid = '';
      this.formData.reportState = '';
      this.formData.minReportDate = null;
      this.formData.maxReportDate = null;
      this.formData.minCreateDate = null;
      this.formData.maxCreateDate = null;
      this.search();
    },
    searchpage(current = 1) {
      this.params.pageNo = current;
      this.fetch();
    },
    search() {
      // if (!this.checkRangeDate()) {
      //   return false;
      // }
      this.params.pageNo = 1;
      this.fetch();
    },
    handleDelete() { // 批量删除
      if (this.multipleSelection.length === 0) {
        this.$message.error('请先选择数据');
        return false;
      }
      let batch = false;
      if (this.multipleSelection.length >= 2) {
        batch = true;
      }
      this.remove(this.multipleSelection.map(item => item.id), batch);
    },
    remove(list, batch) {
      this.$confirm(`<div class="delete-text-content"><img class="delete-icon" src="${deleteIcon}"/><span>该操作无法撤销，是否确认${batch ? '批量' : ''}删除！</span></div>`, '删除提示', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'message-box-customize',
        showClose: true,
      }).then(() => {
        this.$api.reportInterface.batchRemove({
          reportIdList: list,
        }).then(({ data }) => {
          if (data.success) {
            this.$message.success('操作成功');
            this.fetch();
          }
        });
      }).catch(() => {});
    },
    // 获取人员列表
    async getGridList() {
      const res = await
      this.$api.userManagerInterface.getGridList({ pageNo: 1, pageSize: 10000 });
      const { data } = res.data;
      this.gridList = data.data;
    },
    fetch() {
      // if (!this.checkRangeDate()) {
      //   return false;
      // }
      this.formData.pageNo = this.params.pageNo;
      this.formData.pageSize = this.params.pageSize;
      const sendData = Object.assign({}, this.formData);
      // if (sendData.minReportDate) {
      //   sendData.minReportDate = `${sendData.minReportDate} 00:00:00`;
      // }
      // if (sendData.maxReportDate) {
      //   sendData.maxReportDate = `${sendData.maxReportDate} 23:59:59`;
      // }
      this.$api.reportInterface
        .fetchReportList(sendData)
        .then(({ data }) => {
          if (data.success) {
            this.total = data.data.total;
            this.dataSource = data.data.data;
          }
        });
      this.getGridList();
    },
    checkRangeDate() {
      if (this.formData.minReportDate && this.formData.maxReportDate
      && new Date(this.formData.minReportDate) > new Date(this.formData.maxReportDate)) {
        this.$message.error('开始时间不可大于结束时间');
        return false;
      }
      return true;
    },
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.fetch());
  },
};
</script>

<style lang="scss" scoped>
.report-page {
  /deep/ .el-pagination__sizes {
    margin-right: 0;
    .el-select .el-input {
      margin: 0;
    }
  }
}
.table-operate-buttonss{
  .page-name{
    font-size: 16px;
    color: #333333;
    font-weight: 600;
  }
}
.operates{
  margin: 20px 0 10px 0;
}
</style>
