<template>
  <div>
    <el-table :data="list" style="width: 100%;padding-top: 15px;">
      <el-table-column label="客户编号" align="center">
        <template slot-scope="scope">
          {{ scope.row.order_no | orderNoFilter }}
        </template>
      </el-table-column>
      <el-table-column label="客户姓名" align="center">
        <template slot-scope="scope">
          ¥{{ scope.row.price | toThousandFilter }}
        </template>
      </el-table-column>
      <el-table-column label="手机号" align="center">
        <template slot-scope="{ row }">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="人员类别" align="center">
        <template slot-scope="{ row }">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="体检编号" align="center">
        <template slot-scope="{ row }">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="体检日期" align="center">
        <template slot-scope="{ row }">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="生活问卷" align="center">
        <template slot-scope="{ row }">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="报告生成时间" align="center">
        <template slot-scope="{ row }">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="报告" align="center">
        <template slot-scope="{ row }">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="10"
      :page-size="10"
      :current-page="1"
      @current-change="handleClick"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger',
      };
      return statusMap[status];
    },
    orderNoFilter() {
      // return str.substring(0, 30)
    },
  },
  data() {
    return {
      list: [{ status: 1 }], // null
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      /* transactionList().then(response => {
        this.list = [{order_no:5,price:999}]
      })*/
    },
  },
};
</script>
