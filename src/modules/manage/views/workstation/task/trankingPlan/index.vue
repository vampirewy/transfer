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
          <span class="cursor c-3154ac">编辑</span>
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
import { GENDER } from '../../constant/base_data';
export default {
  name: 'trankingPlan',
  components: {
    BaseTable,
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
