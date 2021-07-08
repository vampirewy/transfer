<template>
  <div>
    <div class="content">
      <div class="content-left">
        <div class="formSearchTitle">
          <span class="dianLves"
            ><img src="@/assets/images/common/titleLeft.png" alt="" /></span
          >个人健康报告
        </div>
      </div>
      <div class="divRightTitleDiv">
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
                    @click="generateReport"
                    class="btn-new btnDel"
                    v-if="getAccess('customer_pool_distribute')"
            ><img src="@/assets/images/common/createReport.png" />生成报告</el-button>
        </div>
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
              <el-table-column label="体检日期" prop="reportDate" show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                label="问卷"
                prop="lifeQuestionDate"
                min-width="120"
                align="center">
                 <template slot-scope="scope">
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
                </template>
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
                label="审核状态"
                prop="assessReportStateTxt"
                align="center"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button
                    type='text'
                    size="small"
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
<script>
import QuestionsOpen from '~/src/components/date_select/questions_open.vue';
export default {
  name: 'personalexport',
  components: {
    QuestionsOpen,
  },
  data() {
    return {
      table: {
        list: [],
        pageSize: 15,
        pageNo: 1,
        total: 0,
      },
      expandData: {
        id: '',
        pageNo: 1,
        pageSize: 15,
        total: 0,
        list: [],
      },
      expands: [],
      loading: false,
      popoverStatus: false,
      popoverRefIndex: '',
      popoverRow: {},
      multipleSelection: [],
    };
  },
  mounted() {
    this.queryPageList();
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleExpandChange(row, expandRows) {
      this.expands = expandRows;
    },
    async queryPageList() {
      // if (!this.checkRangeDate()) {
      //   return false;
      // }
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
        this.table.list = data.data.data;
      });
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
      window.open(data.assessReportName);
    },
    // 审核
    handleExamine() {
      // if (this.multipleSelection.length === 0) {
      //   this.$message.warning('请先选择数据');
      //   return false;
      // }
      // this.view = 5;
      // debugger;
      // const params = this.multipleSelection.map(({ clientId, lifeQuestionId, reportId }) => {
      //   const data = {
      //     clientId,
      //     lifeQuestionId,
      //     reportInfoId: reportId,
      //   };
      //   return data;
      // });
      // console.log(params, 123456);
      // this.$api.accessReport.generateReport(params).then(() => {
      //   this.$message.success('操作成功');
      //   this.queryPageList();
      // });
    },
    // 生成报告
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
/deep/ .comment-img, /deep/ .exception-explain-img {
    cursor: pointer;
    width: 18px;
    vertical-align: middle;
  }
  /deep/ .select-user-trigger .el-input__suffix{
    top: 9px;
  }
</style>
