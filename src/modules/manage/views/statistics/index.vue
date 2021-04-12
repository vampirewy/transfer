<template>
  <div class="organization-management-page common-page-style">
    <el-tabs v-model="activeTabName">
      <el-tab-pane label="工作量统计" name="audit">
        <work></work>
      </el-tab-pane>
      <el-tab-pane label="我的客户统计" name="archives">
        <archives :msg="data"></archives>
      </el-tab-pane>
      <el-tab-pane label="管理量统计" name="administer">
        <administer :msg="data"></administer>
      </el-tab-pane>
      <el-tab-pane label="随访记录统计" name="intervene">
        <intervene :msg="data"></intervene>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import work from './statics_all/work/index.vue';
import archives from './statics_all/archives/index.vue';
import administer from './statics_all/administer/index.vue';
import intervene from './statics_all/intervene/index.vue';


export default {
  name: 'index',
  components: {
    work,
    archives,
    administer,
    intervene,
  },
  data() {
    return {
      activeTabName: 'audit',
      data: [],
    };
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    async getDetail() {
      const res = await this.$api.statics.getlistPage({});
      this.data = res.data.data.list;
    },
  },
};
</script>

<style lang="scss" scoped>
.common-page-style {
  background: #fff;
  padding: 0 20px 20px;
}
/deep/ .el-tabs__item.is-active{
  color: #333333;
  font-size: 16px;
  font-weight: 600;
}
/deep/ .el-tabs__active-bar{
  width: 32px !important;
}
/deep/ .el-tabs__item:hover {
    color: #333;
    cursor: pointer;
}
</style>
