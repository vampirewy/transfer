<template>
  <div class="intervention_tab_div">
    <div class="formSearchTitle" style="font-size: 14px;margin-top: 0;margin-bottom: 20px;">
      <span class="dianLv"></span>危险因素
    </div>
    <el-form :inline="false">
      <el-form-item label="问卷时间：">
    <el-popover
            ref="userPopover"
            placement="bottom-start"
            width="570"
            trigger="click"
            @show="popoverStatus = true"
            @hide="popoverStatus = false"
    >
      <questions-open v-if="popoverStatus"
                      :clientId="$route.params.id"
                      @change="handlePopoperClose"></questions-open>
      <el-input
              class="select-user-trigger disabled"
              slot="reference"
              disabled
              v-model="formData.questionTime"
              placeholder="请选择">
        <i :class="`el-icon-arrow-${popoverStatus ? 'up' : 'down'}`" slot="suffix"></i>
      </el-input>
    </el-popover>
      </el-form-item>
    </el-form>
    <div class="follow-plan">
      <el-table :data="tableData" style="width: 100%" align="center"
                :cell-style="columnStyle"
                :span-method="objectSpanMethod">
        <el-table-column prop="typeName" label="分类" width="200px" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.typeName | getResult}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="factor" label="因素" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.factor | getResult }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="advice" label="建议" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.advice | getResult }}</span>
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
let columlet = 1; // 用作行颜色切换
export default {
  name: 'DanderRisk',
  components: {
    QuestionsOpen,
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
      formData: {
        questionId: '',
        questionTime: '',
      },
    };
  },
  mounted() {
    this.queryList(); // 找出第一份问卷
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
    handlePopoperClose(data) {
      this.$refs.userPopover.doClose();
      this.popoverStatus = false;
      this.formData.questionId = data.id;
      this.formData.questionTime = data.createTime ? data.createTime.split(' ')[0] : '';
      this.getDangerRiskInfo(this.formData.questionId);
    },
    async queryList() {
      const res = await this.$api.health.fetch({
        questionType: 1,
        clientId: this.$route.params.id,
        pageNo: 1,
        pageSize: 1,
      });
      const { data } = res.data;
      if (data) {
        if (data.list.length > 0) {
          this.formData.questionId = data.list[0].id;
          this.formData.questionTime = data.list[0].createTime ? data.list[0].createTime.split(' ')[0] : '';
          this.getDangerRiskInfo(this.formData.questionId);
        }
      }
    },
    getDangerRiskInfo(id) {
      this.$api.health.getQuestionRiskFactor(id).then(({ data }) => {
        if (data.code === 200) {
          console.log(data.data);
          this.tableData = [];
          data.data.forEach((value) => {
            value.riskFactorInfoDTOList.forEach((valueChild) => {
              this.tableData.push({
                typeName: value.typeName,
                advice: valueChild.advice,
                factor: valueChild.factor,
              });
            });
          });
          this.getSpanArr(this.tableData);
        }
      });
    },
    getSpanArr(data) {
      // data就是我们从后台拿到的数据
      this.spanArr = [];
      for (let i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.push(1);
          this.pos = 0;
        } else if (data[i].typeName === data[i - 1].typeName) { // 判断当前元素与上一个元素是否相同
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
