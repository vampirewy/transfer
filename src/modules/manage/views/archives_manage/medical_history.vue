<template>
  <div class="medical-history">
    <template >
        <template >
          <div class="table-operate-buttonss" style="margin-top: -8px">
            <!-- <span class="page-name">就医记录</span> -->
          <div class="divTop">
            <div class="divTitle">
              <span><img src="@/assets/images/common/titleLeft.png" alt="" /></span>
              就医记录
            </div>
            <div class="searchCondition">
              <div class="searchLeft">
                <div class="searchInputFormItem">
                  <el-input
                    placeholder="姓名"
                    v-model="formData.keyWord"
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
                  <span>就医类型：</span>
                  <el-select
                    v-model="formData.medicalType"
                    placeholder="请选择"
                    style="width: 140px"
                  >
                  <!-- <el-option label="未知" value="0" key="0"></el-option> -->
                  <el-option label="门诊" value="1" key="1"></el-option>
                  <el-option label="住院" value="2" key="2"></el-option>
                  </el-select>
                </div>
              </div>
               <div class="searchRight">
                <div class="buttones">
                  <div class="searchFor" @click="search">
                    <img src="@/assets/images/common/topsearchblue.png" alt="" />
                  </div>
                  <div class="resetAll" @click="reset()">重置</div>
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
           <div v-if="!isTrue" class="searchCondition" style="width: 100%">
            <div class="searchLeft" style="padding-left: 5px">
              <div>
                <span>就医日期：</span>
                <el-date-picker
                  v-model="formData.inDateStartTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  :max-date="formData.inDateEndTime || new Date()"
                  placeholder="选择开始日期"
                  style="width: 140px"
                >
                </el-date-picker>
                <span class="timing">-</span>
                <el-date-picker
                  v-model="formData.inDateEndTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  :min-date="formData.inDateStartTime"
                  :max-date="new Date()"
                  placeholder="选择结束日期"
                  style="width: 140px"
                >
                </el-date-picker>
              </div>
              <div>
                <span>出院日期：</span>
                <el-date-picker
                  v-model="formData.outDateStartTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  :max-date="formData.outDateEndTime || new Date()"
                  placeholder="选择开始日期"
                  style="width: 140px"
                >
                </el-date-picker>
                <span class="timing">-</span>
                <el-date-picker
                  v-model="formData.outDateEndTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  :min-date="formData.outDateStartTime"
                  :max-date="new Date()"
                  placeholder="选择结束日期"
                  style="width: 140px"
                >
                </el-date-picker>
              </div>
              <div>
                  <span>当前状态：</span>
                  <el-select
                    v-model="formData.result"
                    placeholder="请选择"
                    style="width: 140px"
                  >
                    <el-option
                    v-for="item in resultOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                  </el-select>
                </div>
            </div>
          </div>
          <div class="topbottomborder"></div>
            <div class="operates">
              <operate-button
                type="add"
                @click="add"
                v-if="getAccess('medical_history_add')">
              </operate-button>
              <operate-button
                type="delete"
                @click="handleDelete"
                v-if="getAccess('medical_history_batch_delete')">
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
                  <el-table-column label="就医日期" prop="inDate" align="center"
                  show-overflow-tooltip></el-table-column>
                  <el-table-column label="医疗机构" prop="hospital" align="center"
                  show-overflow-tooltip></el-table-column>
                  <el-table-column label="就医科室" prop="department" align="center"
                  show-overflow-tooltip></el-table-column>
                  <el-table-column
                    label="诊断"
                    prop="diagnosis"
                    show-overflow-tooltip
                    align="center">
                  </el-table-column>
                  <el-table-column label="当前状态" prop="result" align="center"
                  show-overflow-tooltip>
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
              </el-table-column>
              <el-table-column label="性名" prop="clientName" align="center"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <span class="clientName"
                      @click="commonHref.toPersonalHealth(scope.row.clientId, $router)">
                {{ scope.row.clientName }}</span>
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
                label="就医类型"
                align="center"
                prop="medicalType"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  {{scope.row.medicalType === 1 ? '门诊' : (scope.row.medicalType === 2 ? '住院' : '')}}
                </template>
              </el-table-column>
                <el-table-column
                label="医疗机构"
                align="center"
                prop="hospital"
                show-overflow-tooltip>
              </el-table-column>
               <el-table-column
                label="科室"
                align="center"
                prop="department"
                show-overflow-tooltip>
              </el-table-column>
               <el-table-column
                label="诊断"
                align="center"
                prop="diagnosis"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                label="就医日期"
                align="center"
                prop="inDate"
                show-overflow-tooltip>
              </el-table-column>
            <el-table-column
                label="出院日期"
                align="center"
                prop="outDate"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                label="当前状态"
                align="center"
                prop="result"
                show-overflow-tooltip>
                <template slot-scope="scope">{{ statusMap[scope.row.result] }}</template>
              </el-table-column>
              <el-table-column
                label="就医次数"
                align="center"
                prop="medicalCount"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column label="操作" prop="id" width="120" align="center">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="edit(scope.row)" v-if="
                  getAccess('medical_history_edit')
                  ">编辑</el-button>
                  <span style="color:#DDE0E6">|</span>
                  <el-button
                    type="text"
                    size="small"
                    @click="detail(scope.row)"
                    v-if="getAccess('medical_history_view')"
                  >查看</el-button>
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
    <detail-dialog v-if="viewIndex === 4" :id="currentId" @close="viewIndex = 1"></detail-dialog>
  </div>
</template>

<script>
import MedicalHistoryForm from './medical_history_form.vue';
import DetailDialog from './medical_history_detail.vue';
import QueryPage from '~/src/components/query_page/index.vue';
import Search from '~/src/components/query_page/search.vue';
import QueryFilter from '~/src/components/query_page/query_filter.vue';
import OperateButton from '~/src/components/query_page/operate_button.vue';
import deleteIcon from '~/src/assets/images/deleteicon.png';
import { MAX_PAGESIZE } from '~/src/libs/util/index';

export default {
  name: 'medical_history',
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
      isTrue: true,
      total: 0,
      tableData: [],
      gridList: [], // 人员类别
      formData: {
        keyWord: '', // 姓名
        clientGrid: '', // 人员类别
        gender: '', // 性别
        medicalType: '', // 就医类型
        inDateStartTime: '', // 就医日期开始
        inDateEndTime: '', // 就医日期结束
        outDateStartTime: '', // 出院日期开始
        outDateEndTime: '', // 出院日期结束
        result: '', // 当前状态
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
      endTime: {
        disabledDate: (time) => {
          if (this.formData.endTime) {
            const endTime = new Date(this.formData.endTime);
            return time.getTime() > new Date(endTime).getTime() - (3600 * 1000 * 23 * 1);
          }
        },
      },
      startTime: {
        disabledDate: (time) => {
          if (this.formData.startTime) {
            const startTime = new Date(this.formData.startTime);
            return time.getTime() < new Date(startTime).getTime() - (3600 * 1000 * 23 * 1);
          }
        },
      },
      resultOptions: [
        { value: 1, label: '未指定' },
        { value: 2, label: '治疗中' },
        { value: 3, label: '转诊' },
        { value: 4, label: '转为慢病' },
        { value: 5, label: '痊愈' },
        { value: 6, label: '其他' },
      ],
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
    queryList() {
      if (!this.checkRangeDate()) {
        return false;
      }
      this.$api.medicalHistoryInterface
        .medicalHistoryPageList({ ...this.formData })
        .then((res) => {
          // const { data } = res;
          // if (data.code === 200) {
          const result = res.data || {};
          this.tableData = result.data.data || [];
          this.total = result.data.total || 0;
          // }
        });
    },
    // 获取人员列表
    async getGridList() {
      const res = await
      this.$api.userManagerInterface.getGridList({ pageNo: 1, pageSize: 10000 });
      const { data } = res.data;
      this.gridList = data.data;
    },
    reset() {
      this.formData.keyWord = '';
      this.formData.gender = '';
      this.formData.clientGrid = '';
      this.formData.medicalType = '';
      this.formData.inDateStartTime = '';
      this.formData.inDateEndTime = '';
      this.formData.outDateStartTime = '';
      this.formData.outDateEndTime = '';
      this.formData.result = '';
      this.formData.pageNo = 1;
      this.queryList();
    },
    search() {
      if (!this.checkRangeDate()) {
        return false;
      }
      this.formData.pageNo = 1;
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
      // this.$router.push('/medication_history_add');
      this.$router.push({
        path: '/medical_history_form',
      });
      // this.$router.push({
      //   path: `/medication_history_add${row.id}`,
      // });
      this.viewIndex = 2;
      this.currentId = '';
    },
    detail(data) {
      this.$router.push({
        path: '/medication_history_info',
        query: {
          id: data.id,
        },
      });
      // this.viewIndex = 4;
      // this.currentId = data.id;
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
      this.viewIndex = 3;
      this.currentId = data.id;
      this.$router.push({
        path: '/medical_history_form',
        query: {
          id: data.id,
          // clientId: '1408304870765432833',
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
      this.$confirm(`<div class="delete-text-content"><img class="delete-icon" src="${deleteIcon}"/><span>该操作无法撤销，是否确认${batch ? '批量' : ''}删除！</span></div>`, '删除提示', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'message-box-customize',
        showClose: true,
      }).then(() => {
        let p;
        if (batch) {
          p = this.$api.medicalHistoryInterface.batchDeleteMedicalInfo(params);
        } else {
          p = this.$api.medicalHistoryInterface.deleteMedicalInfo(params);
        }
        p.then((res) => {
          const { data } = res;
          if (data.success) {
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
  /deep/ .has-expand-table{
    .el-icon-arrow-right:before {
      content: '\E6E0';
      display: none;
    }
  }
.medical-history {
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
