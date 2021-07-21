<template>
  <div>
    <StationSearch
      :changeStyle="'radio'"
      @fromChildDate="switchType"
    ></StationSearch>
    <section style="margin-top:15px;">
      <BaseTable
        :data="sysList"
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
        <template slot-scope="scope" slot="recordNum">
          <span class="cursor c-3154ac">{{ scope.row.recordNum }}</span>
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
  name: 'systemTracking',
  components: { StationSearch, BaseTable },
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
      sysList: [],
      columns: [
        { label: '客户编号', prop: 'clientCode' },
        { label: '体检编号', prop: 'reportNo' },
        { label: '姓名', prop: 'clientName' },
        { label: '性别', prop: 'gender' },
        { label: '年龄', prop: 'age' },
        { label: '所属企业', prop: 'workUnitName' },
        { label: '体检时间', prop: 'reportDate' },
        { label: '主检医生', prop: 'zjDoctor' },
        { label: '主检时间', prop: 'zjDate' },
        { label: '上报时间', prop: 'createdTime' },
        { label: '异常结果', prop: 'visitResut' },
        { label: '阳性分级', prop: 'levelName' },
        { label: '管理医生', prop: 'doctorName' },
        { label: '回访医生', prop: 'visitDoctorName' },
        { label: '跟踪记录', prop: 'recordNum' },
      ],
    };
  },
  methods: {
    switchType(query) {
      this.date.searchStartTime = query.startTime;
      this.date.searchEndTime = query.endTime;
      this.pageParams.pageNo = 1;
      this.getSysTrankingRequest();
    },
    pageNoChange(pageNo) {
      this.pageParams.pageNo = pageNo;
      this.getSysTrankingRequest();
    },
    async getSysTrankingRequest() {
      const params = {
        searchType: 4,
        ...this.date,
        ...this.pageParams,
      };
      const res = await this.$api.personal.getSysTranking(params);
      const { data } = res.data;
      this.pageParams.total = data.total;
      (data.data || []).map(item => (item.gender = GENDER[item.gender]));
      this.sysList = data.data;
    },
  },
};
</script>

<style lang="scss" scoped></style>
