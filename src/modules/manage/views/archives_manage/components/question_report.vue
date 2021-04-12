<template>
  <el-dialog title="问卷报告" :visible.sync="visible" @close="cancel">
    <div class="title">基础信息</div>
    <ul>
      <li>客户姓名: {{ dataSource.clientName }}</li>
      <li>问卷类型: {{ dataSource.questionType }}</li>
    </ul>
    <div class="title">问卷题目</div>
    <ul>
      <li v-for="(item, index) in questions" :key="item.id">
        <p style="margin-bottom: 4px">{{ index + 1 }}, {{ item.name }}</p>

        <el-radio-group v-model="radio1">
          <el-radio-button
            :label="item.name"
            :key="item.subjectCode"
            v-for="item in item.optionList"
          ></el-radio-button>
        </el-radio-group>
      </li>
    </ul>
  </el-dialog>
</template>
<script>
export default {
  name: 'abnormal',
  props: {
    visible: Boolean,
    id: String,
  },
  data() {
    return {
      formData: {},
      params: {
        pageNo: 1,
        pageSize: 15,
        total: 0,
      },
      dataSource: {},
      questions: [],
    };
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    submit() {
      this.$emit('change', this.multipleSelection);
    },
    fetch(id) {
      if (id) {
        this.$api.health.getReport(id).then(({ data }) => {
          console.log(data);
          if (data.code === 200) {
            this.dataSource = data.data;
            this.getQuestions();
          }
        });
      }
    },
    getQuestions() {
      this.$api.health
        .getQuestions(this.dataSource.questionType)
        .then(({ data }) => {
          if (data.code === 200) {
            this.questions = data.data;
          }
        });
    },
  },
  watch: {
    id(newId, oldId) {
      console.log(newId, oldId);
      if (newId !== oldId) {
        this.fetch(newId);
      }
    },
  },
  mounted() {},
};
</script>

<style scoped>
.title {
  padding-right: 8px;
  margin-bottom: 8px;
  font-size: 13px;
  color: #409eff;
  margin-top: 8px;
}
</style>
