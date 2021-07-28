<template>
  <div>
  <div class="user-follow">
    <div v-for="(value, index) in sunList" :key="index" style="margin-bottom:20px">
      <div class="divRightTitleDiv">
          <div class="divRightTitle" style="margin:0 0 10px 0">{{index}}</div>
        </div>
      <el-table :data="value" style="width: 100%" align="center">
        <el-table-column label="异常结果" min-width="80px" prop="abnormalName" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.abnormalName | getResult }}</span>
          </template>
        </el-table-column>
        <el-table-column label="阳性分级" min-width="80px" prop="levelName" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.levelName | getResult }}</span>
          </template>
        </el-table-column>
        <el-table-column label="就诊建议" min-width="200px" prop="advice" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.advice | getResult }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
      sunList: [],
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
      const res = await this.$api.sunFollow.getPastYearsAbnormalInfo(this.form);
      const { data } = res.data;
      if (data) {
        this.sunList = data || [];
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
