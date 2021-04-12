<template>
      <div class="user-follow">
        <div class="formSearchTitle" style="font-size: 14px;margin-top: 0">
          <span class="dianLv"></span>健康问卷列表
        </div>
      <el-table style="width: 100%" :data="dataSource" align="center">
        <el-table-column label="问卷类型" prop="questionType" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ options[scope.row.questionType] | getResult}}
          </template>
        </el-table-column>
        <el-table-column label="填写日期" prop="createTime" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.createTime | getResultDate}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="index">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="viewHealthQuestion(scope.row)"
              v-if="getAccess('health_questionnaire_view')
              "
            >查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: right">
        <el-pagination
          style="margin-top: 15px"
          @current-change="search"
          background
          layout="prev, pager, next, jumper, total, sizes"
          :total="params.total"
          :page-size="params.pageSize"
          :pageSizes="[15]"
        ></el-pagination>
      </div>
      </div>
</template>

<script>
export default {
  name: 'question',
  components: {},
  data() {
    return {
      total: 0,
      dataSource: [],
      visible: false,
      current: {},
      params: {
        pageNo: 1,
        pageSize: 15,
        total: 0,
      },
      options: {},
      types: [],
    };
  },
  methods: {
    search(current = 1) {
      this.params.pageNo = current;
      this.fetch();
    },
    fetch() {
      this.$api.health
        .fetch(Object.assign(this.params, { clientId: this.$route.params.id }))
        .then(({ data }) => {
          if (data.success) {
            this.params.total = data.data.total;
            this.dataSource = data.data.list;
          }
        });
    },
    getQuestionType() {
      this.$api.health.getQuestionType().then((options) => {
        this.types = options;
        options.forEach((val) => {
          this.options[val.paramValue] = val.name;
        });
      });
    },
    viewHealthQuestion(row) {
      localStorage.setItem('personalHealthActive', 6);
      this.$router.push({
        name: 'health_questionnaire_detail',
        params: {
          qusType: row.questionType,
          id: row.id,
        },
      });
    },
  },
  mounted() {
    this.getQuestionType();
    this.fetch();
  },
};
</script>

<style lang="scss" scoped>
 .qusDrop {
    .el-dropdown-menu__item{
      padding: 0 40px;

    }
  }
</style>
