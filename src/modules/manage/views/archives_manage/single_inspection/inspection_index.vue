<template>
  <div class="medical-history">
    <template >
        <template >
          <div class="table-operate-buttonss" style="margin-top: -8px">
            <!-- <span class="page-name">就医记录</span> -->
            <div class="divTop">
            <div class="divTitle">
              <span><img src="@/assets/images/common/titleLeft.png" alt="" /></span>
              单项检查
            </div>
            <div class="searchCondition">
              <div class="searchLeft">
                <div class="searchInputFormItem">
                  <el-input
                    placeholder="姓名/客户编号"
                    v-model="formData.keywords"
                    style="width: 144px"
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
                    style="width: 145px"
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
                    style="width: 145px"
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
                <span>体检日期：</span>
                <el-date-picker
                  v-model="formData.startTime"
                  value-format="yyyy-MM-dd hh:mm:ss"
                  type="date"
                  :max-date="formData.endTime || new Date()"
                  placeholder="选择开始日期"
                  style="width: 120px"
                >
                </el-date-picker>
                <span class="timing">-</span>
                <el-date-picker
                  v-model="formData.endTime"
                  value-format="yyyy-MM-dd hh:mm:ss"
                  type="date"
                  :min-date="formData.startTime"
                  :max-date="new Date()"
                  placeholder="选择结束日期"
                  style="width: 120px"
                >
                </el-date-picker>
              </div>
              </div>
               <div class="searchRight">
                <div class="buttones">
                  <div class="searchFor" @click="search">
                    <img src="@/assets/images/common/topsearchblue.png" alt="" />
                  </div>
                  <div class="resetAll" @click="resetAll">重置</div>
                  <!-- <div class="more" v-if="isTrue" @click="upMore">
                    <span>></span>
                    展开更多
                  </div>
                  <div class="more noMore" v-if="!isTrue" @click="upMore">
                    <span>></span>收起筛选
                  </div> -->
                </div>
              </div>
            </div>
          </div>
           <!-- <div v-if="!isTrue" class="searchCondition" style="width: 100%">
            <div class="searchLeft" style="padding-left: 5px">
              <div>
                <span>体检日期：</span>
                <el-date-picker
                  v-model="formData.physicalstartTime"
                  type="date"
                  :max-date="formData.endTime"
                  placeholder="选择开始日期"
                  style="width: 140px"
                >
                </el-date-picker>
                <span class="timing">-</span>
                <el-date-picker
                  v-model="formData.physicalendTime"
                  type="date"
                  :min-date="formData.startTime"
                  placeholder="选择结束日期"
                  style="width: 140px"
                >
                </el-date-picker>
              </div>
              <div>
                <span>采集日期：</span>
                <el-date-picker
                  v-model="formData.gatherstartTime"
                  type="date"
                  :max-date="formData.endTime"
                  placeholder="选择开始日期"
                  style="width: 140px"
                >
                </el-date-picker>
                <span class="timing">-</span>
                <el-date-picker
                  v-model="formData.gatherendTime"
                  type="date"
                  :min-date="formData.startTime"
                  placeholder="选择结束日期"
                  style="width: 140px"
                >
                </el-date-picker>
              </div>
              <div>
                  <span>是否总检：</span>
                  <el-select
                    v-model="formData.TotalTest"
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
            </div>
          </div> -->
          <div class="topbottomborder"></div>
            <div class="operates">
              <operate-button
                type="add"
                @click="add"
                v-if="getAccess('inspection_index_add')">
              </operate-button>
              <operate-button
                type="delete"
                @click="handleDelete"
                v-if="getAccess('inspection_index_deleted')">
              </operate-button>
            </div>
          </div>
          <div>
            <el-table
              ref="table"
              class="has-expand-table"
              :data="tableData"
              @selection-change="handleSelectionChange"
              :row-key="getRowKeys"
              @expand-change="handleExpandChange">
              <el-table-column type="expand" width="1" class-name="hide-expand-column">
                <el-table :data="expandData.list" class="expand-table">
                  <el-table-column label="就医日期" prop="inDate" align="center"></el-table-column>
                  <el-table-column label="医疗机构" prop="hospital" align="center"></el-table-column>
                  <el-table-column label="就医科室" prop="department" align="center"></el-table-column>
                  <el-table-column
                    label="诊断"
                    prop="diagnosis"
                    show-overflow-tooltip
                    align="center">
                  </el-table-column>
                  <el-table-column label="当前状态" prop="result" align="center">
                    <template slot-scope="scope">{{ statusMap[scope.row.result] }}</template>
                  </el-table-column>
                  <el-table-column label="操作" prop="index" width="160" align="center">
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        @click="detail(scope.row)"
                        v-if="getAccess('medical_history_view')">查看</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div style="text-align: right">
                  <el-pagination
                    style="margin-top: 15px"
                    @current-change="handleExpandPageChange"
                    background
                    :total="expandData.total"
                    :page-size="expandData.pageSize"
                    :current-page="expandData.pageNo"
                    :hide-on-single-page="true"
                    :page-sizes="[15]"
                    layout="prev, pager, next, jumper, total, sizes"
                  ></el-pagination>
                </div>
              </el-table-column>
              <el-table-column type="selection" align="center"></el-table-column>
              <el-table-column
                label="客户编号"
                prop="clientNo"
                align="center"
                show-overflow-tooltip>
                <!-- <template slot-scope="scope">
                <span class="clientName"
                      @click="commonHref.toPersonalHealth(scope.row.clientId, $router)">
                  {{ scope.row.clientName || '-'}}
                </span>
                </template> -->
              </el-table-column>
              <el-table-column
                label="姓名"
                align="center"
                prop="clientName"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <span class="clientName"
                        @click="commonHref.toPersonalHealth(scope.row.clientId, $router)">
                    {{ scope.row.clientName || '-'}}
                  </span>
                </template>
              </el-table-column>
                <el-table-column label="性别" prop="gender" align="center">
                <template slot-scope="scope">
                  {{scope.row.gender === 1 ? '男' : (scope.row.gender === 2 ? '女' : '')}}
                </template>
              </el-table-column>
                <el-table-column
                label="年龄"
                align="center"
                prop="age"
                show-overflow-tooltip>
              </el-table-column>
               <el-table-column
                label="检查单号"
                align="center"
                prop="inspectionNo"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                label="检查机构"
                align="center"
                prop="inspectionOrg"
                show-overflow-tooltip>
              </el-table-column>
            <el-table-column
                label="检查日期"
                align="center"
                prop="inspectionDate"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                label="检查项目"
                align="center"
                prop="itemNames"
                show-overflow-tooltip>
              </el-table-column>
              <!-- <el-table-column
                label="项目库"
                align="center"
                prop="diagnosis"
                show-overflow-tooltip>
              </el-table-column> -->
              <el-table-column
                label="次数"
                align="center"
                prop="inspectionCount"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column label="操作" prop="id" width="120" align="center">
                <template slot-scope="scope">
                  <el-button type="text" size="small"
                   @click="adds(scope.row)"
                   v-if="getAccess('inspection_index_edit')"
                   style="color:#3154AC">编辑</el-button>
                  <span style="color:#DDE0E6">|</span>
                  <el-button
                    type="text"
                    size="small"
                    @click="detail(scope.row)"
                    v-if="getAccess('medical_history_view')"
                   style="color:#3154AC">查看</el-button>
                  <!-- <el-button type="text" size="small" @click="remove(scope.row.id)" v-if="
                  getAccess('medical_history_delete')
                  ">删除</el-button> -->
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              style="margin-top: 15px"
              background
              :total="total"
              :page-size="15"
              :current-page="formData.pageNo"
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
              :page-sizes="[15]"
              layout="prev, pager, next, jumper, total, sizes"
            ></el-pagination>
          </div>
        </template>
      <!-- </query-page> -->
    </template>
    <detail-dialog
    v-if="viewIndex === 4"
    :id="currentId"
     @close="viewIndex = 1">
     </detail-dialog>
  </div>
</template>

<script>
import MedicalHistoryForm from '../medical_history_form.vue';
import DetailDialog from '../medical_history_detail.vue';
import QueryPage from '~/src/components/query_page/index.vue';
import Search from '~/src/components/query_page/search.vue';
import QueryFilter from '~/src/components/query_page/query_filter.vue';
import OperateButton from '~/src/components/query_page/operate_button.vue';
import deleteIcon from '~/src/assets/images/deleteicon.png';
import { MAX_PAGESIZE } from '~/src/libs/util/index';

export default {
  name: 'inspection_index',
  components: {
    MedicalHistoryForm,
    DetailDialog,
    QueryPage,
    Search,
    QueryFilter,
    OperateButton,
  },
  data() {
    return {
      isTrue: false,
      total: 0,
      tableData: [],
      gridList: [],
      formData: {
        keywords: '',
        startTime: '',
        endTime: '',
        clientGrid: '',
        gender: '',
        pageNo: 1,
        pageSize: 15,
      },
      typeMap: {
        1: '门诊',
        2: '住院',
      },
      statusMap: {
        1: '未指定',
        2: '治疗中',
        3: '转诊',
        4: '转为慢病',
        5: '痊愈',
        6: '其他',
      },
      viewIndex: 1, // 1:列表页，2:新增，3:编辑，4:详情
      currentId: '',
      multipleSelection: [],
      clientTypeList: [],
      expands: [],
      getRowKeys: row => row.id,
      expandData: {
        id: '',
        pageNo: 1,
        pageSize: 15,
        total: 0,
        list: [],
      },
      loading: false,
      // pickerStartTime: {
      //   disabledDate: (time) => {
      //     if (this.formData.endTime) {
      //       const endTime = new Date(this.formData.endTime);
      //       return time.getTime() > new Date(endTime).getTime() - (3600 * 1000 * 23 * 1);
      //     }
      //   },
      // },
      // pickerEndTime: {
      //   disabledDate: (time) => {
      //     if (this.formData.startTime) {
      //       const startTime = new Date(this.formData.startTime);
      //       return time.getTime() < new Date(startTime).getTime() - (3600 * 1000 * 23 * 1);
      //     }
      //   },
      // },
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getClientTypeList();
      vm.queryList();
      vm.getGridList();
    });
  },
  methods: {
    upMore() {
      this.isTrue = !this.isTrue;
      this.$forceUpdate();
    },
    handleExpandPageChange(page) {
      this.expandData.pageNo = page;
      this.getOtherPageList();
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
        this.expandData.id = row.clientId;
        this.expandData.pageNo = 1;
        this.getOtherPageList().then(() => {
          this.$refs.table.toggleRowExpansion(row);
        });
      }
    },
    getOtherPageList() {
      this.expandData.list = [];
      this.loading = true;
      return this.$api.medicalHistoryInterface.otherMedicalHistoryPageList(this.expandData.id, {
        pageNo: this.expandData.pageNo,
        pageSize: this.expandData.pageSize,
      }).then(({ data }) => {
        this.expandData.list = data.data.list;
        this.expandData.total = data.data.total;
        this.loading = false;
        // 展开的table的渲染更新依赖外层table数据，如果外层数据没变，展开的内容不会更新渲染，所以这里更新一下tableData
        this.tableData = [...this.tableData];
        this.$forceUpdate();
      }).catch(() => {
        this.loading = false;
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 获取人员列表
    async getGridList() {
      const res = await
      this.$api.userManagerInterface.getGridList({ pageNo: 1, pageSize: 10000 });
      const { data } = res.data;
      this.gridList = data.data;
    },
    queryList() {
      // if (!this.checkRangeDate()) {
      //   return false;
      // }
      this.$api.medicalHistoryInterface
        .singleinspectionPageList({ ...this.formData })
        .then((res) => {
          const { data } = res;
          if (data) {
            const result = data.data || {};
            this.tableData = result.data || [];
            this.total = result.total || 0;
            // for (let i = 0; i > result.data.length; i++) {
            //   for (let j = 0; j > result.data[i].inspectionRecordConfigDtos.length; j++) {
            //     console.log(result.data[i].inspectionRecordConfigDtos[j].itemName + ',');
            //   }
            // }
          }
        });
    },
    reset() {
      this.formData.keyWord = '';
      this.formData.workUnitName = '';
      this.formData.clientGrid = '';
      this.formData.department = '';
      this.formData.hospital = '';
      this.formData.startTime = '';
      this.formData.endTime = '';
      this.formData.pageNo = 1;
      this.queryList();
    },
    search() {
      // if (!this.checkRangeDate()) {
      //   return false;
      // }
      this.formData.pageNo = 1;
      this.queryList();
    },
    resetAll() {
      this.formData.keywords = '';
      this.formData.startTime = '';
      this.formData.endTime = '';
      this.formData.clientGrid = '';
      this.formData.gender = '';
      this.formData.pageNo = 1;
      this.formData.pageSize = 15;
      this.queryList();
    },
    handleEnter() {
      this.$refs.search.blur();
    },
    handleCurrentChange(page) {
      this.formData.pageNo = page;
      this.queryList();
    },
    handleSizeChange(size) {
      this.formData.pageSize = size;
      this.queryList();
    },
    add() {
      this.viewIndex = 2;
      this.currentId = '';
      this.$router.push({
        path: '/inspection_index_add',
        query: {
          id: '',
        },
      });
    },
    adds(row) {
      this.viewIndex = 2;
      this.currentId = '';
      this.$router.push({
        path: '/inspection_index_add',
        query: {
          id: row.id,
        },
      });
    },
    detail(data) {
      // this.viewIndex = 4;
      this.currentId = data.id;
      this.$router.push({
        path: '/inspection_index_info',
        query: {
          id: data.id,
        },
      });
    },
    handleEdit() {
      if (this.multipleSelection.length === 0) {
        this.$message.error('请先选择数据');
        return false;
      }
      if (this.multipleSelection.length > 1) {
        this.$message.error('请选择单条记录编辑');
        return false;
      }
      this.edit(this.multipleSelection[0]);
    },
    edit(data) {
      console.log(data);
      this.viewIndex = 3;
      this.currentId = data.id;
      this.$router.push({
        path: '/inspection_index_add',
        query: {
          id: data.id,
        },
      });
    },
    handleDelete() {
      if (this.multipleSelection.length === 0) {
        this.$message.error('请先选择数据');
        return false;
      }
      let batch = false;
      if (this.multipleSelection.length >= 2) {
        batch = true;
      }
      // TODO 批量删除
      this.remove(this.multipleSelection.map(item => item.id), batch);
    },
    remove(params, batch) {
      console.log(params, batch, '删除');
      this.$confirm(`<div class="delete-text-content"><img class="delete-icon" src="${deleteIcon}"/><span>该操作无法撤销，是否确认${batch ? '批量' : ''}删除！</span></div>`, '删除提示', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'message-box-customize',
        showClose: true,
      }).then(() => {
        let p;
        if (batch) {
          p = this.$api.medicalHistoryInterface.singleinspectionDelete(params);
        } else {
          p = this.$api.medicalHistoryInterface.singleinspectionDelete(params);
          // p = this.$api.medicalHistoryInterface.deleteMedicalInfo(params);
        }
        p.then((res) => {
          const { data } = res;
          if (data) {
            this.$message.success('操作成功');
            this.queryList();
          }
        });
      });
    },
    handleAfterSubmit() {
      this.viewIndex = 1;
      this.queryList();
    },
    checkRangeDate() {
      if (this.formData.startTime && this.formData.endTime
      && new Date(this.formData.startTime) > new Date(this.formData.endTime)) {
        this.$message.error('开始时间不可大于结束时间');
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
.medical-history {
  .searchCondition .searchInputFormItem{
    width: 180px;
  }
  background: #fff;
  /deep/ .search-button {
    &:hover {
      background: #55AAFF;
    }
    img {
      width: 16px;
    }
  }
  .el-button + .el-button {
    margin-left: 8px;
  }
  .el-pagination {
    text-align: right;
    padding: 0;
  }
  /deep/ .el-pagination__sizes {
    margin-right: 0;
    .el-select .el-input {
      margin: 0;
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
}
</style>
