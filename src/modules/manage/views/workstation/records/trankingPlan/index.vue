<!-- 工作记录 -- 随访计划 -->
<template>
  <div>
    <StationSearch
      :changeStyle="'radio'"
      @fromChildDate="switchType"
    ></StationSearch>
    <section style="margin-top:15px;">
      <BaseTable
        :data="trankingList"
        :columns="columns"
        :isShowPagination="true"
        :pagination="pageParams"
        @change="pageNoChange"
      >
        <template slot-scope="scope" slot="clientName">
          <span
            class="cursor c-3154ac"
            @click="commonHref.toPersonalHealth(scope.row.clientId, $router)"
          >
            {{ scope.row.clientName }}
          </span>
        </template>
        <template slot="operation" slot-scope="scope">
          <span class="cursor c-3154ac"
          @click="$router.push(`health_plan/user_follow_do/view/${scope.row.id}`)"
          >
            查看
          </span>
        </template>
      </BaseTable>
    </section>
  </div>
</template>

<script>
import StationSearch from '../../components/search.vue';
import BaseTable from '~/src/components/base_table/index.vue';
import { GENDER } from '../../constant/base_data';
export default {
  name: 'trankingPlan',
  components: {
    StationSearch,
    BaseTable,
  },
  data() {
    return {
      pageParams: {
        total: 0,
        pageSize: 15,
        pageNo: 1,
      },
      date: {
        searchStartTime: '',
        searchEndTime: '',
      },
      trankingList: [],
      columns: [
        { label: '客户编号', prop: 'clientNo' },
        { label: '姓名', prop: 'clientName' },
        { label: '性别', prop: 'gender' },
        { label: '年龄', prop: 'age' },
        { label: '人员类别', prop: 'gridName' },
        { label: '随访人', prop: 'executeUserName' },
        { label: '随访形式', prop: 'executePlanWayName' },
        { label: '随访标题', prop: 'executePlanTitle' },
        { label: '执行日期', prop: 'executeTime' },
        { label: '依从度', prop: 'assortLevelName' },
        { label: '满意度', prop: 'pleasedLevelName' },
        { label: '操作', prop: 'operation' },
      ],
    };
  },
  methods: {
    switchType(query) {
      this.date.searchStartTime = query.startTime;
      this.date.searchEndTime = query.endTime;
      this.pageParams.pageNo = 1;
      this.getTankingRequest();
    },
    pageNoChange(pageNo) {
      this.pageParams.pageNo = pageNo;
      this.getTankingRequest();
    },
    async getTankingRequest(pageNo) {
      this.pageParams.pageNo = pageNo || this.pageParams.pageNo;
      const params = {
        ...this.date,
        ...this.pageParams,
        searchType: 2,
      };
      const res = await this.$api.userFollowInterface.getInterveneRecordListPage(
        params,
      );
      const { data } = res.data;
      this.pageParams.total = data.total;
      (data.data || []).map(item => (item.gender = GENDER[item.gender]));
      this.trankingList = data.data;
    },
  },
};
</script>

<style lang="scss" scoped></style>
