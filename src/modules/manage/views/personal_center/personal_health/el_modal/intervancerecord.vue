<template>
  <div>
    <div class="content-left">
      <div class="formSearchTitle">
        <span class="dianLves"
          ><img src="@/assets/images/common/titleLeft.png" alt="" /></span
        >随访记录
      </div>
      <div class="follow-plan">
        <div class="divRightTitleDiv">
          <div>
            <el-button
              style="margin: 16px 0"
              size="small"
              class="btn-new btnDel"
              @click="handleSomeRemove"
              v-if="getAccess('visited_record_batch_delete')"
              ><img src="@/assets/images/common/delBtn.png" />删除</el-button
            >
          </div>
        </div>
        <el-table
          :data="tableData"
          @selection-change="handleSelectionChange"
          style="width: 100%"
          align="center"
        >
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column
            prop="clientName"
            label="随访人"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
          <span>{{ scope.row.executeUserName | getResult}}</span>
        </template>
          </el-table-column>
          <el-table-column
            prop="planDate"
            label="随访标题"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
          <span>{{ scope.row.executePlanTitle | getResult}}</span>
        </template>
          </el-table-column>
          <el-table-column
            prop="executePlanWayName"
            label="随访方式"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
          <span>{{ scope.row.executePlanWayName | getResult }}</span>
        </template>
          </el-table-column>
          <el-table-column
            prop="executeTime"
            label="执行日期"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
          <span>{{ scope.row.executeTime | getResult }}</span>
        </template>
          </el-table-column>
          <el-table-column
            prop="assortLevelName"
            label="依从度"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
          <span>{{ scope.row.assortLevelName | getResult }}</span>
        </template>
          </el-table-column>
          <el-table-column prop="pleasedLevelName" label="满意度" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.pleasedLevelName | getResult}}</span>
              </template>
            </el-table-column>
          <el-table-column
            prop="executePlanWayName"
            label="操作"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="handleDetail(scope.row)"
                v-if="getAccess('visited_record_view')"
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
    </div>
  </div>
</template>
<script>
import deleteIcon from '~/src/assets/images/deleteicon.png';
export default {
  name: 'InportantIndex',
  props: ['clientId'],
  data() {
    return {
      tableData: [
      ],
      currentPage: 1,
      total: 0,
      multipleSelection: [],
      form: {
        keywords: '', // 关键字
        gender: '', // 性别
        workUnitName: '', // 企业单位
        planUserId: '',
        planUserName: '',
        planDate: '',
        planWay: '', // 随访方式
        startTime: '',
        endTime: '',
        executeState: '1', // 状态
        gridId: '', // 客户类型
        assortLevel: '',
        pleasedLevel: '',
      },
      table: {
        list: [],
        totalCount: 0,
        currentPage: 1,
        pageSize: 15,
      },
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      const reqBody = {
        keywords: this.form.keywords,
        gridId: this.form.gridId,
        gender: this.form.gender,
        executePlanWay: this.form.planWay,
        pleasedLevel: this.form.pleasedLevel,
        assortLevel: this.form.assortLevel,
        pageNo: this.table.currentPage,
        pageSize: this.table.pageSize,
        clientId: this.$route.params.id,
      };
      const res = await this.$api.userFollowInterface.getInterveneRecordListPage(
        reqBody,
      );
      const { data } = res.data;
      if (data) {
        this.tableData = data.data || [];
        this.total = data.total;
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSomeRemove() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: '请选择要删除的记录',
          type: 'warning',
        });
        return;
      }
      this.$confirm(`<div class="delete-text-content"><img class="delete-icon" src="${deleteIcon}"/><span>该操作无法撤销，是否确认删除！</span></div>`, '删除提示', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'message-box-customize',
        showClose: true,
      }).then(
        async () => {
          const idsList = [];
          this.multipleSelection.forEach((value) => {
            idsList.push(value.id);
          });
          const reqBody = idsList;
          await this.$api.userFollowInterface.deleteSomeFollowplanDel(
            reqBody,
          );
          this.$message.success('操作成功');
          return this.getList();
        },
      );
    },
    handleAdd() {
      this.$router.push({
        path: '/report_edit',
        query: {
          id: '',
        },
      });
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
    handleDetail(row) {
      this.$router.push({
        path: `/health_plan/user_follow_do/view/${row.id}`,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.divRightTitleDiv{
  margin-bottom: 15px;
}
</style>
