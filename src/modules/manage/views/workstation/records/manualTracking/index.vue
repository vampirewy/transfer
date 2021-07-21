<template>
  <div>
    <StationSearch
      :changeStyle="'radio'"
      @fromChildDate="switchType"
    ></StationSearch>
    <section style="margin-top:15px;">
      <BaseTable
        :data="manualList"
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
import { REPORT_STATE } from '../../constant/base_data';
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
    };
  },
  methods: {
    switchType(query) {
      console.log('手动上报跟踪选择的时间----->', query);
      this.date.searchStartTime = query.startTime;
      this.date.searchEndTime = query.endTime;
      this.pageParams.pageNo = 1;
      this.getManualTrackingRequest();
    },
    pageNoChange(pageNo) {
      this.pageParams.pageNo = pageNo;
      this.getManualTrackingRequest();
    },
    async getManualTrackingRequest() {
      const params = {
        searchType: 4,
        ...this.pageParams,
        ...this.date,
      };
      const res = await this.$api.personal.getManualTracking(params);
      const { data } = res.data;
      this.pageParams.total = data.total;
      if (data.data && data.data.length) {
        data.data.forEach((item) => {
          item.reportState = REPORT_STATE[item.reportState];
        });
      }
      this.manualList = data.data;
    },
  },
};
</script>

<style lang="scss" scoped></style>
