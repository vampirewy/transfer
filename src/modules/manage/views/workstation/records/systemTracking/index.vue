<template>
  <div>
    <StationSearch
      :changeStyle="'radio'"
      @fromChildDate="switchType"
    ></StationSearch>
    <section style="margin-top:15px;">
      <BaseTable
        ref="table"
        :data="sysList"
        :columns="columns"
        :isShowPagination="true"
        :pagination="pageParams"
        @change="pageNoChange"
        @fromTableExpands="fromTableExpands"
      >
        <template slot-scope="scope" slot="clientName">
          <span
            class="cursor c-3154ac"
            @click="commonHref.toPersonalHealth(scope.row.clientId, $router)"
          >
            {{ scope.row.clientName }}
          </span>
        </template>
        <template slot-scope="scope" slot="gender">
          <span>{{scope.row.gender | getResultGender}}</span>
        </template>
        <template slot-scope="scope" slot="recordNum">
          <span class="cursor c-3154ac" @click="watchRecords(scope.row)">{{
            scope.row.recordNum
          }}</span>
        </template>
        <template slot="expand">
          <BaseTable
            :data="expandsData"
            :columns="expandColumns"
            :isShowPagination="true"
            :pagination="expandsPageParams"
            @change="expandPageNoChange"
          ></BaseTable>
        </template>
      </BaseTable>
    </section>
  </div>
</template>

<script>
import StationSearch from '../../components/search.vue';
import BaseTable from '~/src/components/base_table/index.vue';

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
      // 列表数据
      sysList: [],
      columns: [
        { type: 'expand', prop: 'expand' },
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
        { label: '异常结果', prop: 'abnormalResult' },
        { label: '阳性分级', prop: 'levelName' },
        { label: '管理医生', prop: 'doctorName' },
        { label: '回访医生', prop: 'visitDoctorName' },
        { label: '跟踪记录', prop: 'recordNum' },
      ],
      expandsList: [],
      // 展开数据
      expandsData: [],
      expandsPageParams: {
        total: 0,
        pageSize: 15,
        pageNo: 1,
      },
      expandColumns: [
        { label: '跟踪时间', prop: 'trackDate' },
        { label: '跟踪人', prop: 'visitDoctorName' },
        { label: '跟踪方式', prop: 'trackWay' },
        { label: '跟踪结果', prop: 'result' },
        { label: '跟踪记录', prop: 'remark' },
      ],
      expandId: '',
    };
  },
  methods: {
    switchType(query) {
      this.date.searchStartTime = query.startTime;
      this.date.searchEndTime = query.endTime;
      this.pageParams.pageNo = 1;
      this.getSysTrankingRequest();
    },
    fromTableExpands(val) {
      this.expandsList = val;
    },
    async watchRecords(row) {
      this.expandId = row.id;
      this.expandsList.forEach((item) => {
        if (item.clientId !== row.clientId) {
          this.$refs.table.$refs.table.toggleRowExpansion(item);
        }
      });
      if (this.expandsList.includes(row)) {
        this.$refs.table.$refs.table.toggleRowExpansion(row);
      } else {
        this.expandsPageParams.pageNo = 1;
        const result = await this.getTrankRecordsRequest();
        if (result) {
          this.$refs.table.$refs.table.toggleRowExpansion(row);
        }
      }
    },
    pageNoChange(pageNo) {
      this.pageParams.pageNo = pageNo;
      this.getSysTrankingRequest();
    },
    expandPageNoChange(pageNo) {
      this.expandsPageParams.pageNo = pageNo;
      this.getTrankRecordsRequest();
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
      this.sysList = data.data;
    },
    async getTrankRecordsRequest() {
      const params = {
        reportId: this.expandId,
        recordType: 1,
        ...this.expandsPageParams,
      };
      const res = await this.$api.sunFollow.getTrankingRecord(params);
      const { data } = res.data;
      console.log(data);
      this.expandsData = data.data;
      this.expandsPageParams.total = data.total;
      if (data.data && data.data.length) {
        return data;
      }
    },
  },
  mounted() {
    this.getSysTrankingRequest();
  },
};
</script>

<style lang="scss" scoped></style>
