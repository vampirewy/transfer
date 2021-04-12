<template>
  <el-submenu :name="`${parentName}`" :index="`${parentName}`">
    <template slot="title">
      <span>{{ showTitle(parentItem) }}</span>
    </template>
    <template v-for="item in children">
      <template v-if="item.children && item.children.length === 1">
        <side-menu-item
          v-if="showChildren(item)"
          :key="`menu-${item.name}`"
          :parent-item="item"
        ></side-menu-item>
        <el-menu-item
          v-else
          :index="item.children[0].name"
          :name="getNameOrHref(item, true)"
          :key="`menu-${item.children[0].name}`"
        >
          <span>{{ showTitle(item.children[0]) }}</span>
        </el-menu-item>
      </template>
      <template v-else>
        <side-menu-item
          v-if="showChildren(item)"
          :key="`menu-${item.name}`"
          :parent-item="item"
        >
        </side-menu-item>
        <el-menu-item
          v-else
          :index="item.name"
          :name="getNameOrHref(item)"
          :key="`menu-${item.name}`"
        >
          <span>{{ showTitle(item) }}</span>
        </el-menu-item>
      </template>
    </template>
  </el-submenu>
</template>
<script>
import mixin from './mixin';

export default {
  name: 'SideMenuItem',
  mixins: [mixin],
  props: {
    parentItem: {
      type: Object,
      default: () => {},
    },
    theme: String,
    iconSize: Number,
  },
  computed: {
    parentName() {
      return this.parentItem.name;
    },
    children() {
      return this.parentItem.children;
    },
    textColor() {
      return this.theme === 'dark' ? '#fff' : '#495060';
    },
  },
};
</script>
