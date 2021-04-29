<template>
  <div class="create-edit">
    <div class="form-title">
      <h3 class="name">
        团报配置
        <div class="titleBiao"></div>
      </h3>
      <div class="titleRight">恢复默认</div>
    </div>
    <div class="bottom">
      <el-table class="openTable" :data="tableData" align="center">
        <el-table-column
          min-width="500"
          prop="modelName"
          label="模型名称"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          min-width="500"
          prop="paramName"
          label="参数名称"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="id" label="操作">
          <template slot-scope="scope">
            <input type="text"
            style="width:35%;border-radius:3px;border-width:1px;" v-model="scope.row.sortIndex" />
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'create_edit',
  components: {},
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    this.getMainList();
  },
  methods: {
    getMainList() {
      this.$api.systemManageInterface
        .getMainList(this.$route.query.id)
        .then(({ data }) => {
          this.tableData = data.data;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.create-edit {
  .form-title {
    display: flex;
    justify-content: space-between;
    .titleRight {
      width: 90px;
      height: 40px;
      background: #dde0e6;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      color: #333;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .bottom {
    margin-top: 30px;
  }
}
</style>
