<!-- 工作任务 -- 待随访计划 -->
<template>
  <div>
    <section style="margin-top:15px;">
      <BaseTable
        :data="list"
        :columns="columns"
        :isShowPagination="true"
        :pagination="pageParams"
        @change="pageNoChange"
      >
        <template slot-scope="scope" slot="clientName">
          <span
            class="cursor c-3154ac"
            @click="commonHref.toPersonalHealth(scope.row.clientId, $router)"
            >{{ scope.row.clientName }}</span
          >
        </template>
        <template slot-scope="scope" slot="operation">
          <span class="cursor c-3154ac" @click="editPlan(scope.row)">编辑</span>
          <span
            class="cursor c-3154ac"
            @click="$router.push(`health_plan/user_follow_do/do/${scope.row.id}`)"
          >
            执行
          </span>
        </template>
      </BaseTable>
    </section>
  </div>
</template>

<script>
import BaseTable from '~/src/components/base_table/index.vue';
import InterventionAddMdl from '~/src/modules/manage/views/health_plan/user_follow_create/el_modal/intervention_add_mdl.vue';
import { GENDER } from '../../constant/base_data';
export default {
  name: 'trankingPlan',
  components: {
    BaseTable,
    InterventionAddMdl,
  },
  data() {
    return {
      pageParams: {
        total: 0,
        pageSize: 15,
        pageNo: 1,
      },
      list: [],
      columns: [
        { label: '客户编号', prop: 'clientNo' },
        { label: '姓名', prop: 'clientName' },
        { label: '性别', prop: 'gender' },
        { label: '年龄', prop: 'age' },
        { label: '人员类别', prop: 'gridName' },
        { label: '单位', prop: 'workUnitName' },
        { label: '手机号码', prop: 'mobile' },
        { label: '随访标题', prop: 'planTitle' },
        { label: '随访方式', prop: 'planWayName' },
        { label: '随访提示', prop: 'planContent' },
        { label: '随访问卷', prop: 'templateQuestionName' },
        { label: '随访人', prop: 'planUserName' },
        { label: '随访日期', prop: 'planDate' },
        { label: '创建人', prop: 'createdByName' },
        { label: '操作', prop: 'operation' },
      ],
    };
  },
  methods: {
    editPlan(row) {
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
      this.pageParams.pageNo = 1;
      this.getTrankingPlanRequest();
      this.$emit('updateTaskCount', { isRefresh: 'recordTrankingPlan' });
    },
    pageNoChange(pageNo) {
      this.pageParams.pageNo = pageNo;
      this.getTrankingPlanRequest();
    },
    async getTrankingPlanRequest() {
      const res = await this.$api.userFollowInterface.getIntervenePlanListPage({
        ...this.pageParams,
      });
      const { data } = res.data;
      this.pageParams.total = data.total;
      (data.data || []).map(item => (item.gender = GENDER[item.gender]));
      this.list = data.data;
    },
  },
};
</script>

<style lang="scss" scoped></style>
