<template>
  <div>
    <StationSearch
      :changeStyle="'radio'"
      @fromChildDate="switchType"
    ></StationSearch>
    <section style="margin-top:15px;">
      <BaseTable
        ref="table"
        :data="manualList"
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
            >{{ scope.row.clientName }}</span
          >
        </template>
        <template slot-scope="scope" slot="reportState">
          <span>{{scope.row.reportState | getReportState}}</span>
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
  name: 'manualTracking',
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
      manualList: [],
      columns: [
        { type: 'expand', prop: 'expand' },
        { label: '体检编号', prop: 'reportNo' },
        { label: '姓名', prop: 'clientName' },
        { label: '手机号', prop: 'mobile' },
        { label: '身份证号', prop: 'cardNo' },
        { label: '上报科室', prop: 'reportDepartment' },
        { label: '项目名称', prop: 'itemName' },
        { label: '异常结果', prop: 'itemValue' },
        { label: '异常等级', prop: 'levelName' },
        { label: '上报医生', prop: 'reportUserName' },
        { label: '上报时间', prop: 'reportDate' },
        { label: '是否主检', prop: 'reportState' },
        { label: '备注说明', prop: 'remark' },
        { label: '回访医生', prop: 'recieveUserName' },
        { label: '跟踪时间', prop: 'trackingTime' },
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
      this.getManualTrackingRequest();
    },
    fromTableExpands(val) {
      this.expandsList = val;
    },
    pageNoChange(pageNo) {
      this.pageParams.pageNo = pageNo;
      this.getManualTrackingRequest();
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
    expandPageNoChange(pageNo) {
      this.expandsPageParams.pageNo = pageNo;
      this.getTrankRecordsRequest();
    },
    async getManualTrackingRequest(pageNo) {
      this.pageParams.pageNo = pageNo || this.pageParams.pageNo;
      const params = {
        searchType: 4,
        ...this.pageParams,
        ...this.date,
      };
      const res = await this.$api.personal.getManualTracking(params);
      const { data } = res.data;
      this.pageParams.total = data.total;
      this.manualList = data.data;
    },
    async getTrankRecordsRequest() {
      const params = {
        reportId: this.expandId,
        recordType: 2,
        ...this.expandsPageParams,
      };
      const res = await this.$api.sunFollow.getTrankingRecord(params);
      const { data } = res.data;
      this.expandsData = data.data;
      this.expandsPageParams.total = data.total;
      if (data.data && data.data.length) {
        return data;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
