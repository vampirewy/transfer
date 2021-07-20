<template>
  <div>
    <el-pagination
      v-if="isShowPagination"
      style="margin-top: 15px"
      @current-change="onChangePage"
      :current-page="pagination.pageNo"
      background
      layout="prev, pager, next, jumper, total, sizes"
      :total="pagination.total"
      :pageSizes="[15]"
      :page-size="15"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'basePagination',
  props: {
    isShowPagination: {
      type: Boolean,
      default: true,
    },
    pagination: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  methods: {
    onChangePage(curPageNo) {
      this.$emit('change', curPageNo);
    },
  },
};
</script>

<style lang="scss" scoped></style>
