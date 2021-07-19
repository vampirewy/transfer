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
              v-if="getAccess('wait_visit_plan_batch_delete')"
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
                  prop="planContent"
                  label="随访问卷"
                  show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row.templateQuestionName | getResult }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="planUserName"
            label="随访人"
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
                @click="handleEdit(scope.row)"
                v-if="getAccess('wait_visit_plan_edit')"
                >编辑</el-button
              >
              <el-button type="text" size="small">|</el-button>
              <el-button
                type="text"
                size="small"
                @click="handleDetail(scope.row)"
                v-if="getAccess('wait_visit_plan_exec')"
                >执行</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next, jumper, total, sizes"
          :total="table.totalCount"
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
import InterventionAddMdl from './intervention_add_mdl.vue';
export default {
  name: 'InportantIndex',
  components: {
    InterventionAddMdl,
  },
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
          this.$api.userFollowInterface
            .deleteSomeFollowplanDel(
              list,
            )
            .then(({ data }) => {
              if (data.success) {
                this.$message.success('操作成功');
                this.getList();
              }
            });
        })
        .catch(() => {});
    },
    handleEdit(row) {
      const Row = row;
      Row.planTime = Row.planDate;
      this.$jDynamic.show({// 有planId的都是自己编辑的
        component: 'InterventionAddMdl',
        data: {
          modalType: 2,
          addType: '2', // 个人创建 / 批量创建
          editType: 2, // 计划重新编辑
          modalTitle: '编辑',
          // planId: this.multipleSelection[0].planId,
          // id: this.checkPlanList[0].id,
          propsData: Row,
          confirmfunc: async (value) => {
            const Value = value;
            Value.id = Row.id;
            Value.clientId = Row.clientId;
            this.editUserFollow(Value);
          },
        },
        render: h => h(InterventionAddMdl),
      });
    },
    /**
     * 编辑随访
     * @return {Promise<ElMessageComponent>}
     */
    async editUserFollow(value) {
      const clientIds = [value.clientId];
      const intervenePlans = [Object.assign({}, value)];
      intervenePlans.forEach((it) => {
        const setIt = it;
        setIt.ignore = false;
        setIt.planUserId = it.planDoctor;
        if (it.planTime.split(' ').length === 1) {
          setIt.planDate = `${it.planTime} 00:00:00`; // 编辑重选时间要重新设
        } else if (it.planTime.split(' ').length === 2) {
          setIt.planDate = it.planTime;
        }
      });
      const result = intervenePlans.filter(it => !it.ignore);
      const reqBody = {
        // id: value.id,
        organId: '', // 区域id
        clientIds, // 客户id
        intervenePlans: result,
        // executeState: '2', // 执行状态-值为1已执行，2待执行
      };
      await this.$api.userFollowInterface.saveIntervenePlan(reqBody);
      this.$message.success('操作成功');
      return this.getList();
    },
    handleDetail(row) {
      console.log(row);
      if (row.templateQuestionId) {
        this.$router.push({
          path: `/health_plan/user_follow_do/do/${row.id}`,
        });
      } else {
        this.$emit('doIntervene', row.id);
      }
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
