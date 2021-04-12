<template>
  <div class="intervention_tab_div">
    <div class="formSearchTitle" style="font-size: 14px;margin-top: 0;margin-bottom: 20px;">
      <span class="dianLv"></span>健康风险评估
    </div>
    <risk-assess :assessList="assessList"></risk-assess>
    <div class="formSearchTitle" style="font-size: 14px;margin-top: 0;margin-bottom: 20px;">
      <span class="dianLv"></span>历史风险评估
    </div>
    <div class="follow-plan">
      <el-table :data="tableData" style="width: 100%" align="center"
                :cell-style="columnStyle"
                :span-method="objectSpanMethod">
        <el-table-column prop="assessDate" label="评估日期" width="200px" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.assessDate | getResult}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="assess5" label="很高风险" show-overflow-tooltip>
          <template slot-scope="scope">
            <span :style="{'color': scope.row.assess5 ? '#FF4032' : '#666666' }">
              {{scope.row.assess5 | getResult }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="assess4" label="高风险" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.assess4 | getResult }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="assess3" label="中度风险" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.assess3 | getResult }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="assess2" label="低风险" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.assess2 | getResult }}</span>
          </template>
        </el-table-column>
        <!--<el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleViewPlan(scope.row)">查看</el-button>
          </template>
        </el-table-column>-->
      </el-table>
    </div>
  </div>
</template>
<script>
import dangerRiskDetail from '../components/danger_risk_detail.vue';
import QuestionsOpen from '~/src/components/date_select/questions_open.vue';
import RiskAssess from '@/components/user_health/risk_assess.vue';
let columlet = 1; // 用作行颜色切换
export default {
  name: 'DanderRisk',
  components: {
    QuestionsOpen,
    RiskAssess,
  },
  data() {
    return {
      menuNum: 0,
      active: 0,
      spanArr: [], // 用于存放每一行记录的合并数
      checkTplPlanList: [],
      tableData: [],
      popoverStatus: false,
      form: {
        templateId: '',
        templateList: [],
      },
      assessList: {},
      formData: {
        questionId: '',
        questionTime: '',
      },
    };
  },
  mounted() {
    this.getUserAssessDetail();
  },
  methods: {
    columnStyle({ columnIndex }) {
      // let Name = '';row, column, rowIndex, columnIndex
      if (columnIndex === 0) {
        if (columlet === 1) {
          columlet = 2;
          return 'background: #FAFAFA';
        } else if (columlet !== 1) {
          columlet = 1;
          return 'background: #F4F4F6';
        }
      }
      /* if (rowIndex % 2 === 0 && columnIndex === 0) {
        return 'background: white';
      } else if (rowIndex % 2 !== 0 && columnIndex === 0) {
        return 'background: white';
      }*/
    },
    async getUserAssessDetail() {
      const reqBody = this.$route.params.id; // '1304360297670119426'
      const res = await this.$api.health.getClientAssessDetail(
        reqBody,
      );
      const { data } = res.data;
      console.log(data);
      Object.keys(data.newstAssessList).forEach((key) => {
        if (key === '2') {
          this.assessList.assess2 = data.newstAssessList[key];
        } else if (key === '3') {
          this.assessList.assess3 = data.newstAssessList[key];
        } else if (key === '4') {
          this.assessList.assess4 = data.newstAssessList[key];
        } else if (key === '5') {
          this.assessList.assess5 = data.newstAssessList[key];
        }
      });
      console.log(this.assessList);
      data.clientAssessReportList.forEach((hisValue) => {
        let assess2Join = '';
        let assess3Join = '';
        let assess4Join = '';
        let assess5Join = '';
        Object.keys(hisValue.listMap).forEach((key) => {
          if (key === '2') {
            assess2Join = hisValue.listMap[key].join('，');
          } else if (key === '3') {
            assess3Join = hisValue.listMap[key].join('，');
          } else if (key === '4') {
            assess4Join = hisValue.listMap[key].join('，');
          } else if (key === '5') {
            assess5Join = hisValue.listMap[key].join('，');
          }
        });
        this.tableData.push({
          assessDate: hisValue.assessDate,
          assess2: assess2Join,
          assess3: assess3Join,
          assess4: assess4Join,
          assess5: assess5Join,
        });
      });
      this.getSpanArr(this.tableData);
    },
    read(obj) {
      this.$emit('read', obj);
    },
    getSpanArr(data) {
      // data就是我们从后台拿到的数据
      this.spanArr = [];
      for (let i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.push(1);
          this.pos = 0;
        } else if (data[i].assessDate === data[i - 1].assessDate) { // 判断当前元素与上一个元素是否相同
          this.spanArr[this.pos] += 1;
          this.spanArr.push(0);
        } else {
          this.spanArr.push(1);
          this.pos = i;
        }
        console.log(this.spanArr);
      }
    },
    objectSpanMethod({ rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const Row = this.spanArr[rowIndex];
        const Col = Row > 0 ? 1 : 0;
        // console.log(`rowspan:${Row} colspan:${Col}`);
        return {
          // [0,0] 表示这一行不显示， [2,1]表示行的合并数
          rowspan: Row,
          colspan: Col,
        };
      }
    },
    /**
     * 查看计划
     */
    handleViewPlan(row) {
      this.$jDynamic.show({// 有planId的都是自己编辑的
        component: 'dangerRiskDetail',
        data: {
          executeState: 1, // 记录
          modalTitle: '查看',
          /* planId: this.checkPlanList[0].planId,
          id: this.checkPlanList[0].id, */
          propsData: row,
          confirmfunc: async (value) => {
            console.log(value);
          },
        },
        render: h => h(dangerRiskDetail),
      });
    },
  },
};
</script>
<style lang="scss" scoped>
  .intervention_tab_div{
    .select-user-trigger {
      width: 220px;
      /deep/ .el-input__suffix{
        right: 15px;
      }
      /deep/ input, i {
        cursor: pointer;
        &::placeholder{
          color: #666666;
        }
      }
    }
    .follow-plan {
   /*   flex: 1;
      width: 75%;*/
      .el-table{
        width: 99.99%!important;
      }
      /*/deep/ tr{
        &:nth-child(odd){
          td{
            &:first-child{
              background:red;
            }
          }
        }
      }*/
      /deep/ td{
        padding: 18.5px 0;
        border-bottom: 1px solid #f4f4f6;
      }
      /deep/ .el-table .el-table__header-wrapper th{
        background: #4991FD;
        .cell{
          color: white;
        }
      }
      .red{
        color: red;
      }
      .warn{
        width: 200px;
        height: 32px;
        line-height: 32px;
        background-color: #fee9e9;
        border-radius: 5px;
        text-align: center;
        font-size: 12px;
        color: #FE2B2A;
        margin-top: 10px;
      }
      .btnDiv{
        display: flex;
        align-items: center;
        justify-content: center;
        .doImg{
          width: 24px;
          height: 24px;
          margin-right: 5px;
        }
      }
      .el-pagination{
        float: right;
      }
      /deep/ .is-background {
        margin-top: 10px;
        float: right;
      }
    }
  }

</style>
