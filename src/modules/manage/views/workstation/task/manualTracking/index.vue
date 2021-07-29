<template>
  <div>
    <section style="margin-top:15px;">
      <BaseTable
        :data="list"
        :columns="columns"
        :isShowPagination="true"
        :pagination="pageParams"
        @change="pageNoChange"
        @sortChange="sortChange"
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
        <template slot-scope="scope" slot="levelName">
          <span :class="scope.row.levelName === '阳性一级' ? 'c-fe2b2a' : ''">{{
            scope.row.levelName
          }}</span>
        </template>
        <template slot="operation" slot-scope="scope">
          <span class="cursor c-3154ac" @click="openPop(scope.row)">跟踪</span>
        </template>
      </BaseTable>
    </section>
    <TrackPop
      :isShowTrackPop="isShowTrackPop"
      :trackingId="trackingId"
      @cancel="cancel"
    ></TrackPop>
  </div>
</template>

<script>
import BaseTable from '~/src/components/base_table/index.vue';
import TrackPop from '~/src/components/track_pop/index.vue';

const SORT_TYPE = {
  levelName: 'byLevel',
  reportDate: 'byReportDate',
};

export default {
  name: 'manualTracking',
  components: { BaseTable, TrackPop },
  data() {
    return {
      pageParams: {
        total: 0,
        pageSize: 15,
        pageNo: 1,
      },
      data: {
        sortRule: '',
        sortType: '',
      },
      list: [],
      columns: [
        { label: '体检编号', prop: 'reportNo' },
        { label: '姓名', prop: 'clientName' },
        { label: '手机号', prop: 'mobile' },
        { label: '身份证号', prop: 'cardNo' },
        { label: '上报科室', prop: 'reportDepartment' },
        { label: '项目名称', prop: 'itemName' },
        { label: '异常结果', prop: 'itemValue' },
        { label: '异常等级', prop: 'levelName', sortable: 'custom' },
        { label: '上报医生', prop: 'reportUserName' },
        { label: '上报时间', prop: 'reportDate', sortable: 'custom' },
        { label: '是否主检', prop: 'reportState' },
        { label: '备注说明', prop: 'remark' },
        { label: '回访医生', prop: 'recieveUserName' },
        { label: '跟踪时间', prop: 'trackingTime' },
        { label: '操作', prop: 'operation' },
      ],
      isShowTrackPop: false,
      trackingId: '',
    };
  },
  methods: {
    pageNoChange(pageNo) {
      this.pageParams.pageNo = pageNo;
      this.getManualTrackingRequest();
    },
    sortChange({ prop, order }) {
      if (order === 'ascending') {
        this.data.sortRule = 1;
        this.data.sortType = SORT_TYPE[prop];
      } else {
        this.data.sortRule = 2;
        this.data.sortType = SORT_TYPE[prop];
      }
      this.pageParams.pageNo = 1;
      this.getManualTrackingRequest();
    },
    openPop(current) {
      this.isShowTrackPop = true;
      this.trackingId = current.id;
    },
    cancel(isSuccess) {
      this.isShowTrackPop = false;
      this.trackingId = '';
      if (isSuccess) {
        this.pageParams.pageNo = 1;
        this.getManualTrackingRequest();
        this.$emit('updateTaskCount', { isRefresh: 'recordManualTacking' });
      }
    },
    async getManualTrackingRequest() {
      const params = {
        ...this.pageParams,
        ...this.data,
        searchType: 2,
      };
      const res = await this.$api.personal.getManualTracking(params);
      const { data } = res.data;
      this.pageParams.total = data.total;
      this.list = data.data;
    },
  },
};
</script>

<style lang="scss" scoped></style>
