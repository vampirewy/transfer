<template>
  <div>
    <section style="margin-top:15px;">
      <BaseTable
        :data="sysList"
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
        <template slot-scope="scope" slot="operation">
          <span
            class="cursor c-3154ac"
            @click="
              $router.push(
                `/first_follow_do/${scope.row.clientId}/1?reportId=${scope.row.id}`,
              )"
            >跟踪</span
          >
        </template>
        <template slot-scope="scope" slot="levelName">
          <span :class="scope.row.levelName === '阳性一级' ? 'c-fe2b2a' : ''">{{
            scope.row.levelName
          }}</span>
        </template>
      </BaseTable>
    </section>
  </div>
</template>

<script>
import BaseTable from '~/src/components/base_table/index.vue';
import { GENDER } from '../../constant/base_data';

const SORT_TYPE = {
  gender: 'bySex',
  age: 'byAge',
  reportDate: 'byReportDate',
  zjDate: 'byZjDate',
  createdTime: 'byCreateDate',
  levelName: 'ByLevel',
};
export default {
  name: 'systemTracking',
  components: { BaseTable },
  data() {
    return {
      pageParams: {
        total: 0,
        pageSize: 15,
        pageNo: 1,
      },
      data: {
        sortRule: null,
        sortType: null,
        searchType: 2,
      },
      sysList: [],
      columns: [
        { prop: 'clientCode', label: '客户编号' },
        { prop: 'reportNo', label: '体检编号' },
        { prop: 'clientName', label: '姓名 ' },
        { prop: 'gender', label: '性别', sortable: 'custom' },
        { prop: 'age', label: '年龄', sortable: 'custom' },
        { prop: 'workUnitName', label: '所属企业' },
        { prop: 'reportDate', label: '体检时间', sortable: 'custom' },
        { prop: 'zjDoctor', label: '主检医生' },
        { prop: 'zjDate', label: '主检时间', sortable: 'custom' },
        { prop: 'createdTime', label: '上报时间', sortable: 'custom' },
        { prop: 'abnormalResult', label: '异常结果' },
        { prop: 'levelName', label: '阳性分级', sortable: 'custom' },
        { prop: 'doctorName', label: '管理医生' },
        { prop: 'visitResut', label: '跟踪结果' },
        { prop: 'operation', label: '操作' },
      ],
    };
  },
  methods: {
    pageNoChange(pageNo) {
      this.pageParams.pageNo = pageNo;
      this.getSysTrankingRequest();
    },
    sortChange({ prop, order }) {
      if (order === 'ascending') {
        this.data.sortRule = 1;
        this.data.sortType = SORT_TYPE[prop];
      } else {
        this.data.sortRule = 2;
        this.data.sortType = SORT_TYPE[prop];
      }
      this.resetParmas();
    },
    async getSysTrankingRequest() {
      const params = {
        ...this.data,
        ...this.pageParams,
      };
      const res = await this.$api.personal.getSysTranking(params);
      const { data } = res.data;
      this.pageParams.total = data.total;
      (data.data || []).map(item => (item.gender = GENDER[item.gender]));
      this.sysList = data.data;
    },
    resetParmas() {
      this.pageParams.pageNo = 1;
      this.getSysTrankingRequest();
    },
  },
  mounted() {
    this.getSysTrankingRequest();
  },
};
</script>

<style lang="scss" scoped></style>
