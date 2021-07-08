<template>
  <div>
    <div class="content-left">
      <div class="formSearchTitle">
        <span class="dianLves"
          ><img src="@/assets/images/common/titleLeft.png" alt="" /></span
        >用药记录
      </div>
      <div class="follow-plan">
        <div class="divRightTitleDiv">
          <div>
            <el-button
                    class="btn-new btnAdd"
                    size="small"
                    @click="medication_add"
                    v-if="getAccess('medication_history_add')"
            ><img src="@/assets/images/common/addBtn.png" />新增</el-button>
            <el-button
              size="small"
              class="btn-new btnDel"
              @click="handleDelete"
              v-if="getAccess('medication_history_batch_delete')"
              ><img src="@/assets/images/common/delBtn.png" />删除</el-button
            >
          </div>
        </div>
        <el-table
          :data="table.list"
          @selection-change="handleSelectionChange"
          style="width: 100%"
          align="center"
        >
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column label="药品名称" prop="drugName" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.drugName | getResult }}</span>
              </template>
            </el-table-column>
            <el-table-column
            prop="mainIndication"
            label="针对问题"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
          <span>{{ scope.row.mainIndication }}</span>
        </template>
          </el-table-column>
          <el-table-column
            prop="startDate"
            label="用药开始时间"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
          <span>{{ scope.row.startDate }}</span>
        </template>
          </el-table-column>
          <el-table-column
            prop="endDate"
            label="用药结束时间"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
          <span>{{ scope.row.endDate }}</span>
        </template>
          </el-table-column>
          <el-table-column
            prop="executePlanWayName"
            label="操作"
            show-overflow-tooltip
            width='140'
          >
            <template slot-scope="scope">
              <el-button
                  type="text"
                  size="small"
                  @click="$router.push('/medication_history_edit/' + scope.row.id + '')"
                  v-if="getAccess('medication_history_edit')"
                  >编辑
                </el-button>
              <el-button type="text" size="small">|</el-button>
              <el-button
                type="text"
                size="small"
                @click="handleDetail(scope.row)"
                v-if="getAccess('physical_examination_report_view')"
                >查看</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next, jumper, total, sizes"
          :total="total"
          :page-size="15"
          @current-change="pageClick"
          :pageSizes="[15]"
        ></el-pagination>
      </div>
      <detail
      :visible="detailModalVisible"
      :value="currentValue"
      @cancel="detailModalVisible = false"
    ></detail>
    </div>
  </div>
</template>
<script>
import detail from '../components/detail.vue';
import deleteIcon from '~/src/assets/images/deleteicon.png';
export default {
  name: 'InportantIndex',
  components: {
    detail,
  },
  props: ['clientId'],
  data() {
    return {
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
      currentPage: 1,
      total: 0,
      multipleSelection: [],
      currentValue: {},
      detailModalVisible: false,
    };
  },
  mounted() {
    // this.getImportantIndex();
    this.queryList();
  },
  methods: {
    medication_add() {
      this.$router.push({
        path: '/medication_history_add',
        query: {
          clientId: this.$route.params.id,
        },
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleDelete() {
      // 批量删除
      if (this.multipleSelection.length === 0) {
        this.$message.error('请先选择数据');
        return false;
      }
      this.remove(
        this.multipleSelection.map(item => item.id),
        true,
      );
    },
    remove(list, batch = false) {
      this.$confirm(
        `<div class="delete-text-content"><img class="delete-icon" src="${deleteIcon}"/><span>该操作无法撤销，是否确认${
          batch ? '' : ''
        }删除！</span></div>`,
        '删除提示',
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          customClass: 'message-box-customize',
          showClose: true,
        },
      )
        .then(() => {
          this.$api.reportInterface
            .batchRemove({
              reportIdList: list,
            })
            .then(({ data }) => {
              if (data.success) {
                this.$message.success('操作成功');
                this.fetch();
              }
            });
        })
        .catch(() => {});
    },
    handleEdit(id) {
      const getid = id;
      this.$router.push({
        path: '/report_edit',
        query: {
          id: getid,
        },
      });
    },
    handleDetail(scope) {
      this.$api.medication.getDetail(scope.id).then(({ data }) => {
        this.currentValue = data.data;
        this.detailModalVisible = true;
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
  },
};
</script>
<style lang="scss" scoped>
.divRightTitleDiv{
  margin-bottom: 15px;
}
</style>
