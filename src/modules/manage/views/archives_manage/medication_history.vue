<template>
  <div class="medication-history">
      <template >
        <div class="table-operate-buttonss" style="margin-top: -8px;">
          <!-- <span class="page-name">用药记录</span> -->

          <div class="divTop">
            <div class="divTitle">
              <span><img src="@/assets/images/common/titleLeft.png" alt="" /></span>
              用药记录
            </div>
            <div class="searchCondition">
              <div class="searchLeft">
                <div class="searchInputFormItem">
                  <el-input
                    placeholder="姓名/客户编号"
                    v-model="form.keyWord"
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
                    v-model="form.gender"
                    placeholder="请选择"
                    style="width: 140px"
                  >
                    <el-option label="男" value="1" key="1"></el-option>
                    <el-option label="女" value="2" key="2"></el-option>
                  </el-select>
                </div>
                <div>
                <span>开始日期：</span>
                <el-date-picker
                  v-model="form.startStartInputTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  :max-date="form.endStartInputTime || new Date()"
                  placeholder="选择开始日期"
                  style="width: 140px"
                >
                </el-date-picker>
                <span class="timing">-</span>
                <el-date-picker
                  v-model="form.endStartInputTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  :min-date="form.startStartInputTime"
                  :max-date="new Date()"
                  placeholder="选择结束日期"
                  style="width: 140px"
                >
                </el-date-picker>
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
          <div v-if="!isTrue" class="searchCondition" style="width: 100%">
            <div class="searchLeft" style="padding-left: 5px">
               <div>
                  <span>人员类别：</span>
                  <el-select
                    v-model="form.clientGrid"
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
                <span>结束日期：</span>
                <el-date-picker
                  v-model="form.endInputStartTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  :max-date="form.endInputEndTim || new Date()"
                  placeholder="选择开始日期"
                  style="width: 140px"
                >
                </el-date-picker>
                <span class="timing">-</span>
                <el-date-picker
                  v-model="form.endInputEndTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  :min-date="form.endInputStartTime"
                  :max-date="new Date()"
                  placeholder="选择结束日期"
                  style="width: 140px"
                >
                </el-date-picker>
              </div>
            </div>
          </div>

          <div class="operates">
            <operate-button
              type="add"
              @click="$router.push('medication_history_add')"
              v-if="getAccess('medication_history_add')"
            >
            </operate-button>
            <operate-button
              type="delete"
              @click="handleRemove"
              v-if="getAccess('medication_history_batch_delete')"
            >
            </operate-button>
          </div>
        </div>
        <div>
          <el-table
            class="has-expand-table"
            :data="table.list"
            ref="table"
            align="center"
          >
            <el-table-column type="selection"> </el-table-column>
            <el-table-column label="客户编号" prop="clientNo" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.clientNo | getResult }}</span>
              </template>
            </el-table-column>
            <el-table-column label="姓名" prop="clientName" show-overflow-tooltip>
              <template slot-scope="scope">
                <span class="clientName"
                      @click="commonHref.toPersonalHealth(scope.row.clientId, $router)">
                  {{ scope.row.clientName || '-'}}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="性别" prop="gender" show-overflow-tooltip>
              <template slot-scope="scope">
                {{scope.row.gender === 1 ? '男' : (scope.row.gender === 2 ? '女' : '-')}}
              </template>
            </el-table-column>
            <el-table-column label="年龄" prop="age" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.age | getResult }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="人员类别"
              prop="clientGridName"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{ scope.row.clientGridName | getResult }}</span>
              </template>
            </el-table-column>
            <el-table-column label="药品名称" prop="drugName" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.drugName | getResult }}</span>
              </template>
            </el-table-column>
            <el-table-column label="针对问题" prop="mainIndication" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.mainIndication | getResult }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="开始时间"
              prop="startDate"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{ scope.row.startDate | getResult }}</span>
              </template>
            </el-table-column>
            <el-table-column label="结束时间" prop="endDate" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.endDate | getResult }}</span>
              </template>
            </el-table-column>
             <el-table-column label="用药记录" prop="pharmacyCount" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.pharmacyCount | getResult }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" prop="index" width="150px">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="
                    $router.push('medication_history_edit/' + scope.row.id + '')
                  "
                  v-if="getAccess('medication_history_edit')"
                  >编辑
                </el-button>
                <el-button type="text" size="small"
                 @click="handleDetailRow(scope.row)"
                 v-if="getAccess('medication_history_view')"
                  >查看</el-button
                >
                <!-- <el-button
                  type="text"
                  size="small"
                  @click="remove(scope)"
                  v-if="getAccess('medication_history_delete')"
                  >删除
                </el-button> -->
              </template>
            </el-table-column>
          </el-table>
          <div style="text-align: right">
            <el-pagination
              style="margin-top: 15px"
              :current-page="table.currentPage"
              :page-size="table.pageSize"
              :total="table.totalCount"
              :page-sizes="[15]"
              background
              layout="prev, pager, next, jumper, total, sizes"
              @current-change="handlePageChange"
              @size-change="handleSizeChange"
            ></el-pagination>
          </div>
        </div>
      </template>
    <!-- </query-page> -->
    <detail
      :visible="detailModalVisible"
      :value="currentValue"
      @cancel="detailModalVisible = false"
    ></detail>
  </div>
</template>

<script>
import QueryPage from '~/src/components/query_page/index.vue';
import Search from '~/src/components/query_page/search.vue';
import QueryFilter from '~/src/components/query_page/query_filter.vue';
import OperateButton from '~/src/components/query_page/operate_button.vue';
import detail from './components/detail.vue';
import deleteIcon from '~/src/assets/images/deleteicon.png';
// import { MAX_PAGESIZE } from '~/src/libs/util/index';

export default {
  name: 'medication_history',
  components: {
    QueryPage,
    Search,
    QueryFilter,
    OperateButton,
    detail,
  },
  data() {
    return {
      isTrue: true,
      form: {
        keyWord: '', // 输入框内容
        gender: '', // 客户性别
        clientGrid: '', // 人员类别
        startStartInputTime: '', // 开始时间
        endStartInputTime: '', // 开始时间结束时间
        endInputStartTime: '', // 结束时间
        endInputEndTime: '', // 结束时间结束时间
      },
      genderList: [
        {
          name: '男',
          value: 1,
        },
        {
          name: '女',
          value: 2,
        },
      ],
      gridList: [], // 人员类别
      table: {
        list: [],
        totalCount: 0,
        currentPage: 1,
        pageSize: 15,
      },
      detailParams: {
        clientId: '',
        id: '',
        total: 0,
        pageNo: 1,
        pageSize: 15,
      },
      currentValue: {},
      detailModalVisible: false,
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getGridLists();
      vm.queryList();
    });
  },
  methods: {
    upMore() {
      this.isTrue = !this.isTrue;
      this.$forceUpdate();
    },
    search() {
      this.table.currentPage = 1;
      this.queryList();
    },
    reset() {
      this.form.keyWord = '';
      this.form.gender = '';
      this.form.clientGrid = '';
      this.form.startStartInputTime = '';
      this.form.endStartInputTime = '';
      this.form.endInputStartTime = '';
      this.form.endInputEndTime = '';
      this.table.currentPage = 1;
      this.queryList();
    },
    // 获取人员列表
    async getGridLists() {
      const res = await
      this.$api.userManagerInterface.getGridList({ pageNo: 1, pageSize: 10000 });
      const { data } = res.data;
      this.gridList = data.data;
    },
    onSearch() {
      this.table.currentPage = 1;
      this.queryList();
    },
    onReset() {
      Object.assign(this.$data, this.$options.data());
      this.table.currentPage = 1;
      this.getGridList();
      this.queryList();
    },
    remove({ row }) {
      this.$confirm(`<div class="delete-text-content"><img class="delete-icon" src="${deleteIcon}"/><span>该操作无法撤销，是否确认删除！</span></div>`, '删除提示', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'message-box-customize',
        showClose: true,
      }).then(() => {
        this.$api.medication.remove(row.id).then(({ data }) => {
          if (data.code === 200) {
            this.$message.success('操作成功');
            this.queryList();
          }
        });
      });
    },
    // 获取人员列表
    async getGridList() {
      const res = await
      this.$api.userManagerInterface.getGridList({ pageNo: 1, pageSize: 10000 });
      const { data } = res.data;
      this.gridList = data.data;
    },
    async queryList() {
      const res = await this.$api.medication.fetch({
        ...this.form,
        pageNo: this.table.currentPage,
        pageSize: this.table.pageSize,
      });
      const { data } = res;
      const result = data.data || {};
      this.table.list = result.data || [];
      this.table.list.forEach((it) => {
        const t = it;
        t.children = [];
        t.pageNo = this.detailParams.pageNo;
        t.pageSize = this.detailParams.pageSize;
        t.total = this.detailParams.total;
        t.expand = false;
      });
      this.table.totalCount = result.total || 0;
      // this.setExpandColumn(result.list);
    },
    setExpandColumn(list) {
      this.$nextTick(() => {
        const column = document.querySelectorAll(
          '.el-table__body .el-table__row',
        );

        column.forEach((it, i) => {
          const icon = it.querySelector('.el-table__expand-icon');
          icon.innerHTML = `<a href="javascript:;" class="expand-icon" id="${
            list[i].id
          }">${
            list[i].pharmacyCount !== null ? list[i].pharmacyCount : '-'
          }</a>`;
        });
      });
    },
    handleEdit() {
      const selection = this.$refs.table.selection;
      if (!selection.length) {
        return this.$message.warning('请选择记录');
      }
    },
    handleRemove() {
      const selection = this.$refs.table.selection;
      if (!selection.length) {
        return this.$message.warning('请选择记录');
      }

      this.$confirm(`<div class="delete-text-content"><img class="delete-icon" src="${deleteIcon}"/><span>该操作无法撤销，是否确认删除！</span></div>`, '删除提示', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'message-box-customize',
        showClose: true,
      }).then(() => {
        selection.forEach((t) => {
          this.$api.medication.remove(t.id).then(() => {
            selection.pop();
            if (!selection.length) {
              this.$message.success('操作成功');
              this.queryList();
            }
          });
        });
      });
    },
    handleDetailRow(scope) {
      this.$api.medication.getDetail(scope.id).then(({ data }) => {
        this.currentValue = data.data;
        this.detailModalVisible = true;
      });
    },
    handleDetail(scope) {
      this.currentValue = scope;
      this.detailModalVisible = true;
    },
    handlePageChange(target) {
      this.table.currentPage = target;
      this.queryList();
    },
    handleSizeChange(size) {
      this.table.pageSize = size;
      this.queryList();
    },
    async onPageDetailChange(target) {
      setTimeout(async () => {
        const ref = this.$refs[`expandTable_${this.detailParams.id}`];
        const { data } = await this.$api.medication.getClientOtherList({
          clientId: this.detailParams.clientId,
          pageNo: target,
          pageSize: this.detailParams.pageSize,
        });
        const { list } = data.data;
        ref.data = list;
      }, 100);
    },
    onPageDetailClick(clientId, id) {
      this.detailParams.clientId = clientId;
      this.detailParams.id = id;
    },
  },
};
</script>

<style lang="scss" scoped>
.medication-history /deep/ {
  background: #fff;
  .search-button {
    &:hover {
      background: #55aaff;
    }
    img {
      width: 16px;
    }
  }

  .expand-table {
    /*.el-table__header-wrapper th {
      background: #6c6ce5;
      opacity: 0.6;
    }*/
    .el-table__header-wrapper th .cell {
      font-size: 14px;
      color: #fff;
    }
    .el-table__body td {
      background: rgba(108, 108, 229, 0.05);
    }
    .el-table__body tr:hover > td {
      background-color: #E8E8FA;
    }
  }
  .el-table__header,
  .el-table__body,
  .el-table__footer {
    table-layout: auto;
  }
  .el-table__expand-icon--expanded {
    transform: none;
  }
  .el-button + .el-button {
    margin-left: 3px;
  }
 /* .el-icon-arrow-right:before {
    content: '';
  }*/

  .expand-icon {
    color: #6c6ce5;
    text-decoration: none;
    cursor: pointer;
  }

  .el-pagination {
    text-align: right;
    padding: 0;
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
