<!-- 工作任务 -- 待跟踪计划 -->
<template>
  <div>
    <section style="margin-top:15px;">
      <BaseTable
        :data="followupList"
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
          <span
            class="cursor c-3154ac"
            @click="$router.push(`/first_follow_do/${scope.row.clientId}/2`)"
            >跟踪</span
          >
        </template>
      </BaseTable>
    </section>
  </div>
</template>

<script>
import BaseTable from '~/src/components/base_table/index.vue';
import { GENDER } from '../../constant/base_data';
export default {
  name: 'followUpPlan',
  components: { BaseTable },
  data() {
    return {
      pageParams: {
        total: 0,
        pageSize: 15,
        pageNo: 1,
      },
      followupList: [],
      columns: [
        { label: '客户编号', prop: 'clientCode' },
        { label: '体检编号', prop: 'reportNo' },
        { label: '姓名', prop: 'clientName' },
        { label: '性别', prop: 'gender' },
        { label: '年龄', prop: 'age' },
        { label: '所属企业', prop: 'workUnitName' },
        { label: '异常结果', prop: 'abnormalResult' },
        { label: '阳性分级', prop: 'levelName' },
        { label: '主检时间', prop: 'zjDate' },
        { label: '上报时间', prop: 'createdTime' },
        { label: '最近跟踪', prop: 'trackDate' },
        { label: '计划创建人', prop: 'doctorName' },
        { label: '跟踪计划', prop: 'nextTrackDate' },
        { label: '跟踪方式', prop: 'trackWay' },
        { label: '跟踪提示', prop: 'trackTip' },
        { label: '跟踪记录', prop: 'trackRecord' },
        { label: '操作', prop: 'operation' },
      ],
    };
  },
  methods: {
    pageNoChange(pageNo) {
      this.pageParams.pageNo = pageNo;
      this.getFollowupPlanRequest();
    },
    async getFollowupPlanRequest() {
      const params = {
        ...this.pageParams,
        searchType: 2,
      };
      const res = await this.$api.personal.getFollowupPlan(params);
      const { data } = res.data;
      this.pageParams.total = data.total;
      (data.data || []).map(item => (item.gender = GENDER[item.gender]));
      this.followupList = data.data;
    },
  },
};
</script>

<style lang="scss" scoped></style>
