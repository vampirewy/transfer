<template>
  <div class="follow-plan">
    <el-table :data="tableData" :span-method="objectSpanMethod"
    border style="width: 100%" align="center">
      <el-table-column prop="riskType" label="分类" show-overflow-tooltip>
        <template slot-scope="scope">
            <span>{{ scope.row.typeName || '-'}}</span>
          </template>
      </el-table-column>
      <el-table-column prop="gridName" label="因素" show-overflow-tooltip>
        <template slot-scope="scope">
          <span >{{ scope.row.factor || '-'}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="executeTime" label="发生日期" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.itemUnit | getResult }}</span>
        </template>
      </el-table-column> -->
      <el-table-column prop="advice" label="建议" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.advice || '-'}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="executePlanWayName" label="操作" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button
              type="text"
              size="small"
              @click="
                $router.push({
                  name: 'risk_factors_look',
                  params: {
                    id: scope.row.id,
                  },
                })
              "
              v-if="getAccess('life_style_questionnaire_view')
              "
            >查看</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <!-- <el-pagination
      style="margin-top: 15px"
      layout="prev, pager, next, jumper, total, sizes"
      :total="total"
      :page-size="formData.pageSize"
          :current-page="formData.pageNo"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
    ></el-pagination> -->
  </div>
</template>
<script>
export default {
  name: 'InportantIndex',
  props: ['clientId'],
  data() {
    return {
      statusMap: {
        1: '饮食',
        2: '运动',
        3: '吸烟情况',
        4: '饮酒情况',
        5: '心理及睡眠',
        6: '既往接触史',
        7: '家族史',
      },
      tableData: [],
      currentPage: 1,
      total: 0,
      formData: {
        keywords: '', // 危险因素
        // riskType: '', // 危险分类
        // clientGrid: '', // 题目类型
        pageNo: 1,
        pageSize: 10,
      },
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    getcliid(id) {
      this.clientId = id;
      this.fetch();
    },
    fetch() {
      this.$api.reportInterface.getriskList(this.clientId)
        .then(({ data }) => {
          if (data) {
            data.data.forEach((item) => {
              item.riskFactorInfoDTOList.forEach((it) => {
                const json = {
                  typeName: item.typeName,
                  advice: it.advice,
                  factor: it.factor,
                };
                this.tableData.push(json);
              });
            });
            console.log(this.tableData, '数据');
          }
        });
    },
    objectSpanMethod({ row, rowIndex, columnIndex }) {
      let num = 0;
      if (columnIndex === 0) {
        for (let i = 0; i < this.tableData.length; i++) {
          if (row.typeName === this.tableData[i].typeName) {
            num++;
          }
        }
        if (num === 1) {
          return {
            rowspan: num,
            colspan: 1,
          };
        } else if (num > 1) {
          if (this.tableData[rowIndex - 1]
          && this.tableData[rowIndex].typeName === this.tableData[rowIndex - 1].typeName) {
            return {
              rowspan: 0,
              colspan: 0,
            };
          }
          return {
            rowspan: num,
            colspan: 1,
          };
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.follow-plan {
  .el-table{
    width: 99.99%!important;
  }
  .el-pagination{
    text-align: right;
    margin-top: 10px;
  }

  /deep/ .is-background {
    margin-top: 10px;
    float: right;
  }
}
</style>
