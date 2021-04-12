<template>
  <div class="medication-history">
        <div class="formSearchTitle" style="margin-top: 0;;font-size: 14px">
          <span class="dianLv"></span>用药记录列表
        </div>
        <div>
          <el-table
            style="width: 100%"
            :data="table.list"
            ref="table"
            align="center"
          >
            <el-table-column label="药品名称" prop="drugsName" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.drugsName | getResult}}</span>
              </template>
            </el-table-column>
            <el-table-column label="用药开始时间" prop="startDate" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.startDate | getResultDate }}</span>
              </template>
            </el-table-column>
            <el-table-column label="用药结束时间" prop="endDate" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.endDate | getResultDate }}</span>
              </template>
            </el-table-column>
            <el-table-column label="规格" prop="specification" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.specification | getResult }}</span>
              </template>
            </el-table-column>
            <el-table-column label="每日剂量" prop="doseOne" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.doseOne | getResult }}</span>
              </template>
            </el-table-column>
            <el-table-column label="每日次数" prop="countDay" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.countDay | getResult }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="handleDetail(scope.row)"
                >查看</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <div style="text-align: right">
            <el-pagination
              style="margin-top: 15px"
              :current-page="table.currentPage"
              :page-size="table.pageSize"
              :total="table.totalCount"
              :page-sizes="[15]"
              background
              layout="prev, pager, next, jumper, total, sizes"
              @current-change="handlePageChange"
              @size-change="handleSizeChange"
            ></el-pagination>
          </div>
        </div>
    <detail
      :visible="detailModalVisible"
      :value="currentValue"
      @cancel="detailModalVisible = false"
    ></detail>
  </div>
</template>

<script>
import detail from '../../../archives_manage/components/detail.vue';

export default {
  name: 'medication_history',
  components: {
    detail,
  },
  data() {
    return {
      table: {
        list: [],
        totalCount: 0,
        pageNo: 1,
        pageSize: 15,
      },
      detailParams: {
        id: '',
        total: 0,
        pageNo: 1,
        pageSize: 15,
      },
      currentValue: {},
      detailModalVisible: false,
    };
  },
  mounted() {
    this.queryList();
  },
  methods: {
    async queryList() {
      console.log(this.$route.params.id);
      const res = await this.$api.medication.getClientOtherList({
        clientId: this.$route.params.id,
      }, {
        id: this.$route.params.id, // '1310043083584311297',
        pageNo: this.table.pageNo,
        pageSize: this.table.pageSize,
      });
      const { data } = res;
      const result = data.data || {};
      this.table.list = result.list || [];
      this.table.totalCount = result.total || 0;
    },
    handleDetail(scope) {
      this.currentValue = scope;
      this.detailModalVisible = true;
    },
    handlePageChange(target) {
      this.table.currentPage = target;
      this.queryList();
    },
    handleSizeChange(size) {
      this.table.pageSize = size;
      this.queryList();
    },
  },
};
</script>

<style lang="scss" scoped>
.medication-history /deep/ {
  background: #fff;
  .el-button + .el-button {
    margin-left: 3px;
  }
  .el-pagination {
    text-align: right;
    padding: 0;
  }
}
</style>
