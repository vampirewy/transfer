<template>
  <div class="permission">
    <el-checkbox v-if="permission.length > 0 && !disabled" v-model="selectAll"
      >全选</el-checkbox
    >
    <el-tree
      class="permission-container"
      :data="permission"
      :show-checkbox="!disabled"
      node-key="menuCode"
      ref="tree"
      highlight-current
      check-strictly
      :props="{
        children: 'roleMenuList',
        label: 'name',
      }"
      @check="handleCheckChange"
    ></el-tree>
  </div>
</template>

<script>
import ACCESS from '~/src/constant/access';

export default {
  name: 'Permission',
  props: {
    data: {
      required: true,
      type: Array,
      default: () => [],
    },
    roleData: {
      type: Array,
      default: () => [],
    },
    disabled: {
      required: false,
      type: Boolean,
      default: false,
    },
    isFilter: {
      required: false,
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      permission: [], // JSON.parse(JSON.stringify(ACCESS)),
      selectAll: false,
    };
  },
  watch: {
    data(newValue) {
      this.$refs.tree.setCheckedKeys(newValue);
      if (this.disabled) {
        this.filterTree(newValue);
      }
      this.setSelectAll();
    },
    roleData(newValue) {
      if (this.isFilter && !this.disabled) {
        this.filterTree(newValue);
      }
      this.setSelectAll();
    },
    selectAll(newValue) {
      const nodes = this.$refs.tree.store.nodesMap;
      const checkedData = this.$refs.tree.getCheckedNodes(false, true);
      if (
        newValue ||
        (!newValue &&
          checkedData.length > 0 &&
          Object.keys(nodes).length === checkedData.length)
      ) {
        this.permission.forEach((item) => {
          this.$refs.tree.setChecked(item, newValue);
          if (item.roleMenuList && item.roleMenuList.length > 0) {
            this.setChildTreeNode(newValue, item.roleMenuList);
          }
        });
      }
      const newChecked = this.$refs.tree.getCheckedNodes(false, true);
      const res = newChecked.map(node => node.menuCode);
      this.$emit('change', res);
    },
  },
  mounted() {
    this.menuList();
  },
  methods: {
    menuList() {
      // 角色列表
      this.$api.systemManageInterface
        .getMenu({})
        .then((res) => {
          const { data } = res;
          const result = data.data || {};
          console.log(result);
          console.log(JSON.parse(JSON.stringify(ACCESS)));
          this.permission = result.synthesisMenuList;
        });
    },
    filterTree(data) {
      this.permission = this.filterArray(
        this.permission,
        data,
      );
      const nodes = this.$refs.tree.store.nodesMap;
      Object.keys(nodes).forEach((i) => {
        nodes[i].expanded = false;
      });
    },
    filterArray(arr, data) {
      const res = [];
      arr.forEach((item) => {
        if (data.includes(item.menuCode)) {
          res.push(item);
          if (item.roleMenuList && item.roleMenuList.length > 0) {
            this.$set(item, 'roleMenuList', this.filterArray(item.roleMenuList, data));
          }
        }
      });
      return res;
    },
    handleCheckChange(data, checkedRes) {
      const { checkedKeys } = checkedRes;
      const checked = checkedKeys.includes(data.menuCode);
      // 选中节点，父节点选中
      if (checked) {
        let node = this.$refs.tree.getNode(data);
        while (
          node.parent &&
          Object.prototype.toString(node.parent.data) === '[object Object]' &&
          !Array.isArray(node.parent.data)
        ) {
          this.$refs.tree.setChecked(node.parent.data, true, false);
          node = node.parent;
        }
      }
      // 同步子节点
      if (data.roleMenuList && data.roleMenuList.length > 0) {
        this.setChildTreeNode(checked, data.roleMenuList);
      }
      const checkedData = this.$refs.tree.getCheckedNodes(false, true);
      const res = checkedData.map(node => node.menuCode);
      this.$emit('change', res);
      this.setSelectAll();
    },
    setChildTreeNode(checked, nodes) {
      nodes.forEach((node) => {
        this.$refs.tree.setChecked(node.menuCode, checked, false);
        if (node.roleMenuList && node.roleMenuList.length > 0) {
          this.setChildTreeNode(checked, node.roleMenuList);
        }
      });
    },
    setSelectAll() {
      setTimeout(() => {
        const nodes = this.$refs.tree.store.nodesMap;
        const checkedData = this.$refs.tree.getCheckedNodes(false, true);
        this.selectAll =
          checkedData.length > 0 &&
          Object.keys(nodes).length === checkedData.length;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.permission {
  border-radius: 8px;
  border: 1px dashed #97A6BD;
  padding: 30px 60px;
}
ul {
  list-style: none;
}
.permission-container {
  font-size: 14px;
  /deep/ .el-tree-node__content {
    height: 34px;
    line-height: 34px;
  }
}
</style>
