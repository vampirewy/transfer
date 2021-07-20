<template>
  <div>
    <el-table
      :data="data"
      v-bind="$attrs"
      v-on="$listeners"
      @sort-change="sortChange"
    >
      <template v-for="column in finalColumns">
        <el-table-column
          v-if="$scopedSlots[column.prop]"
          v-bind="column"
          :key="column.prop"
          align="center"
          show-overflow-tooltip
        >
          <template #default="scope">
            <slot :name="column.prop" v-bind="scope"></slot>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          show-overflow-tooltip
          v-else
          :key="column.prop"
          v-bind="column"
        ></el-table-column>
      </template>
    </el-table>
    <BasePagination
      :isShowPagination="isShowPagination"
      :pagination="pagination"
      @change="pageChange"
    ></BasePagination>
  </div>
</template>

<script>
import BasePagination from './pagination.vue';

export default {
  name: 'baseTable',
  components: {
    BasePagination,
  },
  props: {
    data: Array,
    columns: Array,
    isShowPagination: {
      type: Boolean,
      default: true,
    },
    pagination: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  computed: {
    finalColumns() {
      const { columns } = this;
      return columns.map(column => ({
        ...column,
      }));
    },
  },
  methods: {
    pageChange(pageNo) {
      this.$emit('change', pageNo);
    },
    sortChange({ column, prop, order }) {
      console.log(column, prop, order);
      this.$emit('sortChange', { prop, order });
    },
  },
};
</script>

<style lang="scss" scoped></style>
