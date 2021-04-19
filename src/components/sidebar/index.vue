<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        class="sidebar"
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="'#3154AC'"
        :text-color="'#ffffff'"
        :unique-opened="true"
        :active-text-color="'#ffffff'"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in menuList" :key="route.name"
        :item="route" :base-path="route.name" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Logo from './Logo.vue';
import SidebarItem from './SidebarItem.vue';

export default {
  components: { SidebarItem, Logo },
  props: {
    menuList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    ...mapGetters([
      'sidebar',
    ]),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      console.log(meta, path);
      /* if (meta.activeMenu) {
        return meta.activeMenu;
      } */
      return path.split('/')[1];
    },
    showLogo() {
      return true; // this.$store.state.settings.sidebarLogo;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
};
</script>
<style scoped>
  /deep/ .el-menu{
    border-right: none!important;
  }
  /deep/ .el-scrollbar{
    margin-top: 20px;
  }
</style>
