<template>
  <div>
  <div class="user-follow">
    <el-table :data="table.list" style="width: 100%" align="center" ref="table"
              class="openTable"
             >
      <el-table-column label="项目名称" prop="itemName" min-width="80px" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.itemName | getResult}}</span>
        </template>
      </el-table-column>
      <el-table-column label="结果" prop="itemValue" show-overflow-tooltip>
        <template slot-scope="scope">
          <span :class="scope.row.reportLv === 1 ? 'warnRed' : 'warnYellow'">
                  {{scope.row.itemValue}}
                </span>
        </template>
      </el-table-column>
      <el-table-column label="上报时间" prop="reportDate" min-width="90px" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.reportDate | getResult}}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" prop="updatedTime" min-width="90px" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.updatedTime | getResult}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="trackingState" label="跟踪结果" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.trackingState | getResult}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
    <!--</template>
  </query-page>-->
  </div>
</template>

<script>
export default {
  name: 'sun_record',
  data() {
    return {
      form: {
        clientId: this.$route.params.clientId,
      },
      table: {
        list: [],
      },
    };
  },
  mounted() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      this.getList();
    },
    /**
     * 获取历史阳性列表
     * @return {Promise<void>}
     */
    async getList() {
      const res = await this.$api.sunFollow.getHistorySunList(this.form);
      const { data } = res.data;
      console.log(data);
      if (data) {
        this.table.list = data || [];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .warnRed{
    border: 1px solid #F33D21;
    border-radius: 50px;color: #F33D21;
    font-size: 12px;
    padding: 2px 9px;
  }
  .warnYellow{
    border: 1px solid #FA912B;
    border-radius: 50px;color: #FA912B;
    font-size: 12px;
    padding: 2px 9px;
  }
</style>
