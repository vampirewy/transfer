<template>
  <div>
    <div class="content-left">
      <div class="formSearchTitle">
        <span class="dianLves"
          ><img src="@/assets/images/common/titleLeft.png" alt="" /></span
        >待随访计划
      </div>
      <div class="follow-plan">
        <div class="divRightTitleDiv">
          <div>
            <el-button
              style="margin: 16px 0"
              size="small"
              class="btn-new btnDel"
              @click="handleDelete"
              v-if="getAccess('physical_examination_report_batch_delete')"
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
          <el-table-column
            prop="planTitle"
            label="随访标题"
            show-overflow-tooltip
          >
          <template slot-scope="scope">
          <span>{{ scope.row.planTitle | getResult}}</span>
        </template>
          </el-table-column>
          <el-table-column
            prop="executeTime"
            label="随访日期"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
          <span>{{ scope.row.planDate | getResult}}</span>
        </template>
          </el-table-column>
          <el-table-column
            prop="planWayName"
            label="随访方式"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
          <span>{{ scope.row.planWayName | getResult}}</span>
        </template>
          </el-table-column>
          <el-table-column
            prop="planContent"
            label="随访内容"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
          <span>{{ scope.row.planContent | getResult }}</span>
        </template>
          </el-table-column>
          <el-table-column
            prop="planUserName"
            label="干预人"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
          <span>{{ scope.row.planUserName | getResult }}</span>
        </template>
          </el-table-column>
          <el-table-column
            prop="executePlanWayName"
            label="操作"
            width="140"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="handleEdit(scope.row.id)"
                v-if="getAccess('physical_examination_report_edit')"
                >编辑</el-button
              >
              <el-button type="text" size="small">|</el-button>
              <el-button
                type="text"
                size="small"
                @click="handleDetail(scope.row.id)"
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
      table: {
        list: [],
        totalCount: 0,
        currentPage: 1,
        pageSize: 15,
      },
      form: {
        keywords: '', // 关键字
        gender: '', // 性别
        workUnitName: '', // 企业单位
        planUserId: '',
        planDate: '',
        planWay: '', // 随访方式
        startTime: '',
        endTime: '',
        executeState: '2', // 状态
        gridId: '', // 客户类型
        tag: '',
        startPlanTime: '',
        endPlanTime: '',
        startCreatedTime: '',
        endCreatedTime: '',
        planUserIdList: [],
        createdByList: [],
      },
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
    handleDetail(id) {
      const getid = id;
      this.$router.push({
        path: '/report_detail',
        query: {
          id: getid,
        },
      });
    },
    async getList() {
      const reqBody = {
        keywords: this.form.keywords,
        gender: this.form.gender,
        gridId: this.form.gridId,
        planWay: this.form.planWay,
        tag: this.form.tag,
        startPlanTime: this.form.startPlanTime,
        endPlanTime: this.form.endPlanTime,
        startCreatedTime: this.form.startCreatedTime,
        endCreatedTime: this.form.endCreatedTime,
        planUserIdList: this.form.planUserIdList,
        createdByList: this.form.createdByList,
        pageNo: this.table.currentPage,
        pageSize: this.table.pageSize,
        clientId: this.$route.params.id,
      };
      const res = await this.$api.userFollowInterface.getIntervenePlanListPage(
        reqBody,
      );
      const { data } = res.data;
      if (data) {
        this.table.list = data.data || [];
        this.table.totalCount = data.total;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.divRightTitleDiv{
  margin-bottom: 15px;
}
</style>
