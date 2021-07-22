<template>
  <div>
    <div class="content">
      <div class="content-left">
        <div class="formSearchTitle">
          <span class="dianLves"
            ><img src="@/assets/images/common/titleLeft.png" alt="" /></span
          >健康自测
        </div>
      </div>
      <tab-bars @messageData="TabbarBtn"></tab-bars>
      <div v-if="Tabactive == 0">
        <bloodchart
          :id="currentId"
          :ids="ids"
          @close="handleTrendClose"
          @messageData="blackrount"
        >
        </bloodchart>
      </div>
      <div v-if="Tabactive == 1">
        <bloodsugar
          :id="currentId"
          :ids="ids"
          @close="handleTrendClose"
          @messageData="blackrount"
        >
        </bloodsugar>
      </div>
      <div v-if="Tabactive == 2">
        <weight
          :id="currentId"
          :ids="ids"
          @close="handleTrendClose"
          @messageData="blackrount"
        >
        </weight>
      </div>
      <div v-if="Tabactive == 3">
        <sport
          :id="currentId"
          :ids="ids"
          @close="handleTrendClose"
          @messageData="blackrount"
        >
        </sport>
      </div>

      <el-table
        :data="table.list"
        @selection-change="handleSelectionChange"
        style="margin-top: 10px"
        :class="tabIndex === 'other' ? 'openTable' : ''"
      >
        <!-- <el-table-column
          type="selection"
          width="40"
          align="center"
        ></el-table-column> -->
        <el-table-column
          v-for="(item, index) in table.columns"
          :key="index"
          :label="item.label"
          :prop="item.prop"
          show-overflow-tooltip
          align="center"
        >
          <template slot-scope="scope">
              <span class="clientName" v-if="item.prop === 'clientName'"
                    @click="commonHref.toPersonalHealth(scope.row.clientId, $router)">
                {{scope.row[item.prop]}}
              </span>
              <span v-else>
                <span v-if="item.prop === 'sbp'"
                :class="table.list[scope.$index].sbpHighOrLow === 3 ? 'OrLowClassA' :
                (table.list[scope.$index].sbpHighOrLow === 1 ? 'OrLowClassB' : 'OrLowClassC')">
                  {{scope.row[item.prop]}}
                </span>
                <span v-else-if="item.prop === 'dbp'"
                :class="table.list[scope.$index].dbpHighOrLow === 3 ? 'OrLowClassA' :
                (table.list[scope.$index].dbpHighOrLow === 1 ? 'OrLowClassB' : 'OrLowClassC')">
                  {{scope.row[item.prop]}}
                </span>
                <span v-else-if="item.prop === 'hd'"
                :class="table.list[scope.$index].hdHighOrLow === 3 ? 'OrLowClassA' :
                (table.list[scope.$index].hdHighOrLow === 1 ? 'OrLowClassB' : 'OrLowClassC')">
                  {{scope.row[item.prop]}}
                </span>
                <span v-else-if="item.prop === 'sugar'"
                :class="table.list[scope.$index].sugarTypeHighOrLow === 3 ? 'OrLowClassA' :
                (table.list[scope.$index].sugarTypeHighOrLow === 1 ? 'OrLowClassB' :
                'OrLowClassC')">
                  {{scope.row[item.prop]}}
                </span>
                <span v-else-if="item.prop === 'bmi'"
                :class="table.list[scope.$index].bmiHighOrLow === 3 ? 'OrLowClassA' :
                (table.list[scope.$index].bmiHighOrLow === 1 ? 'OrLowClassB' :
                'OrLowClassC')">
                  {{scope.row[item.prop]}}
                </span>
                <span v-else-if="item.prop === 'wc'"
                :class="table.list[scope.$index].wcHighOrLow === 3 ? 'OrLowClassA' :
                (table.list[scope.$index].wcHighOrLow === 1 ? 'OrLowClassB' :
                'OrLowClassC')">
                  {{scope.row[item.prop]}}
                </span>
                <span v-else-if="item.prop === 'bdPercent'"
                :class="table.list[scope.$index].bdPercentHighOrLow === 3 ? 'OrLowClassA' :
                (table.list[scope.$index].bdPercentHighOrLow === 1 ? 'OrLowClassB' :
                'OrLowClassC')">
                  {{scope.row[item.prop]}}
                </span>
                <span v-else>
                  {{item.formatter ? item.formatter(scope.row[item.prop]) : scope.row[item.prop]}}
                </span>
              </span>
            </template>
        </el-table-column>
        <!-- <el-table-column
          label="操作"
          align="center"
          min-width="100"
          v-if="tabIndex !== 'other'"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="handleEdit(scope.row.id)"
              v-if="getAccess('physical_examination_report_edit')"
              >编辑</el-button
            >
            <span style="color: #dde0e6">|</span>
            <el-button
              type="text"
              size="small"
              @click="handleTrendClick(scope.row.clientId, scope.row.id)
              v-if="getAccess('physical_examination_report_view')"
              >查看</el-button
            >
          </template>
        </el-table-column> -->
      </el-table>
      <div style="text-align: right">
        <el-pagination
          style="margin-top: 15px"
          background
          @current-change="handlePageChange"
          @size-change="handleSizeChange"
          :page-sizes="[15]"
          :current-page="table.pageNo"
          :page-size="table.pageSize"
          layout="prev, pager, next, jumper, total, sizes"
          :total="table.total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import TabBars from '../components/TabBars.vue';
import bloodchart from '../components/bloodchart.vue';
import Bloodsugar from '../components/bloodsugar.vue';
import weight from '../components/weight.vue';
import sport from '../components/sport.vue';
const COLUMNS = {
  BP: [
    { label: '检测时间', prop: 'testDate' },
    { label: '收缩压（mmHg）', prop: 'sbp' },
    { label: '舒张压（mmHg）', prop: 'dbp' },
    { label: '脉搏（次/分钟）', prop: 'hd' },
    { label: '备注', prop: 'result' },
  ],
  BG: [
    { label: '检测时间', prop: 'testDate' },
    { label: '血糖类型', prop: 'sugarTypeName' },
    { label: '血糖值（mmol/L）', prop: 'sugar' },
    { label: '备注', prop: 'result' },
  ],
  weight: [
    { label: '检测时间', prop: 'testDate' },
    { label: '身高(cm)', prop: 'height' },
    { label: '体重(kg)', prop: 'weight' },
    { label: '腰围(cm)', prop: 'wc' },
    { label: 'BMI', prop: 'bmi' },
    { label: '体脂率(%)', prop: 'bdPercent' },
    { label: '备注', prop: 'result' },
  ],
  sport: [
    { label: '检测时间', prop: 'testDate' },
    { label: '运动时长(min)', prop: 'sportTime' },
    { label: '运动路程(km)', prop: 'sportDistance' },
    { label: '运动消耗(Kcal)', prop: 'kcal' },
    { label: '运动步数(步)', prop: 'steps' },
    { label: '备注', prop: 'result' },
  ],
  other: [
    { label: '检测时间', prop: 'testDate' },
    { label: '检测项目', prop: 'projectName' },
    { label: '检测结果', prop: 'result' },
    { label: '计量单位', prop: 'unit' },
    { label: '备注', prop: 'result' },
  ],
};
export default {
  name: 'personalexport',
  props: ['id', 'ids'],
  components: {
    TabBars,
    bloodchart,
    Bloodsugar,
    weight,
    sport,
  },
  data() {
    return {
      Tabactive: 0,
      currentId: this.$route.params.id,
      tabIndex: 'BP',
      table: {
        columns: COLUMNS.BP,
        list: [],
        total: 0,
        pageNo: 1,
        pageSize: 15,
      },
      forms: {
        keywords: '',
        gender: '',
        workUnitName: '',
        physicalstartTime: '', // 开始时间
        physicalendTime: '', // 结束时间
        clientId: this.$route.params.id,
      },
    };
  },
  mounted() {
    this.queryPageList();
  },
  methods: {
    TabbarBtn(index, type) {
      this.Tabactive = index;
      this.tabIndex = type;
      this.resetTable();
      this.queryPageList();
    },
    resetTable() {
      this.table.list = [];
      this.table.total = 0;
      this.table.pageNo = 1;
      this.table.pageSize = 15;
      this.table.columns = COLUMNS[this.tabIndex];
    },
    queryPageList() {
      const apiNameMap = {
        BP: 'getBPList',
        BG: 'getBGList',
        weight: 'getWeightList',
        sport: 'getSportList',
        other: 'getClientHealthDataOtherListPage',
      };
      const apiName = apiNameMap[this.tabIndex];
      this.$api.healthMonitorInterface[apiName]({
        ...this.forms,
        pageNo: this.table.pageNo,
        pageSize: this.table.pageSize,
      }).then(({ data }) => {
        this.table.total = data.data.total;
        this.table.list = data.data.data;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.OrLowClassA{
    color: #333333;
  }
  .OrLowClassB{
    color: red;
  }
  .OrLowClassC{
    color: blue;
  }
</style>
