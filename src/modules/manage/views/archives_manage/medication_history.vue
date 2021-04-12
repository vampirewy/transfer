<template>
  <div class="medication-history">
    <query-page @reset="onReset" @search="onSearch">
      <template slot="left">
        <search>
          <div class="searchInputFormItem">
          <el-input placeholder="姓名/手机号/企业单位" v-model="form.keyWord">
          </el-input>
          <span class="searchBtnImgSpan" @click="onSearch">
            <img class="searchBtnImg" src="@/assets/images/common/search.png"/>
          </span>
          </div>
        </search>
        <query-filter>

          <el-select
            v-model="form.clientGrid"
            placeholder="人员类别"
            class="mb10"
          >
            <el-option
              v-for="item in clientGridList"
              :key="item.id"
              :label="item.gridName"
              :value="item.id"
            >
            </el-option>
          </el-select>

          <el-input
            v-model="form.drugsName"
            placeholder="药品名称"
            class="mb10"
          ></el-input>

          <h3 class="filter-item-title">用药时间</h3>

          <el-date-picker
            class="start-date"
            v-model="form.startTime"
            type="date"
            :max-date="form.endTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择开始时间"
          ></el-date-picker>

          <el-date-picker
            class="end-date"
            v-model="form.endTime"
            type="date"
            :min-date="form.startTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择结束时间"
          ></el-date-picker>
        </query-filter>
      </template>
      <template slot="right">
        <div class="table-operate-buttons" style="margin-top: -8px;">
          <span class="page-name">用药历史</span>
          <div>
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
              label="企业单位"
              prop="workUnitName"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{ scope.row.workUnitName | getResult }}</span>
              </template>
            </el-table-column>
            <el-table-column label="人员类别" prop="clientGridName" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.clientGridName | getResult }}</span>
              </template>
            </el-table-column>
            <el-table-column label="药品名称" prop="drugName" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.drugName | getResult }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="开始用药时间"
              prop="startDate"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{ scope.row.startDate | getResult }}</span>
              </template>
            </el-table-column>
            <el-table-column label="结束用药时间" prop="endDate" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.endDate | getResult }}</span>
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
                <el-button type="text" size="small" @click="handleDetailRow(scope.row)"
                  >查看</el-button
                >
                <el-button
                  type="text"
                  size="small"
                  @click="remove(scope)"
                  v-if="getAccess('medication_history_delete')"
                  >删除
                </el-button>
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
    </query-page>
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
import deleteIcon from '~/src/assets/images/message-box-delete@2x.png';
import { MAX_PAGESIZE } from '~/src/libs/util/index';

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
      form: {
        keyWord: '',
        gender: '',
        clientGrid: '', // 人员类别
        drugsName: '', // 药品名称
        startTime: '', // 开始时间
        endTime: '', // 结束时间
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
      clientGridList: [],
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
  mounted() {
    this.getGridList();
    this.queryList();
  },
  methods: {
    async getGridList() {
      const res = await this.$api.medicalHistoryInterface.clientTypeList({
        pageNo: 1,
        pageSize: MAX_PAGESIZE,
      });
      const { data } = res.data;
      this.clientGridList = data.list;
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
    async queryList() {
      const res = await this.$api.medication.fetch({
        ...this.form,
        pageNo: this.table.currentPage,
        pageSize: this.table.pageSize,
      });
      const { data } = res;
      const result = data.data || {};
      this.table.list = result.list || [];
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
}
</style>
