<template>
  <div>  <!--v-if="!item.hidden"-->
    <template v-if="hasOneShowingChild(item.children,item) &&
    (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <!--<app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.name)">-->
        <!--<el-menu-item :index="resolvePath(onlyOneChild.name)"
                      :class="{'submenu-title-noDropdown':!isNest}"
                      @click="turnToPage(item.name)">
          &lt;!&ndash;<item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)"
                :title="onlyOneChild.meta.title" />&ndash;&gt;
          <img v-if="!onlyOneChild.noShowingChildren" src="@/assets/images/body/sideBarImg.png"/>
          {{onlyOneChild.meta.title}}
        </el-menu-item>-->
      <!--</app-link>-->
    </template>

    <el-submenu v-else ref="subMenu" :index="resolvePath(item.name)" popper-append-to-body>
      <template slot="title">
        <!--<item v-if="item.meta" :icon="item.meta && item.meta.icon"
        :title="item.meta.title" />-->
        <img src="@/assets/images/body/sideBarImg.png"/>
        {{item.meta.title}}
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.name"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.name)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
// import path from 'path';
import Item from './Item.vue';
import AppLink from './Link.vue';

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  props: {
    // route object
    item: {
      type: Object,
      required: true,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
      default: '',
    },
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null;
    return {};
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter((item) => {
        let bool;
        if (item.hidden) {
          bool = false;
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item;
          bool = true;
        }
        return bool;
      });

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) { // 子集就是一集
        return true;
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }; // 后面无子集了
        return true;
      }

      return false;
    },
    resolvePath(routePath) {
      /* if (this.isExternal(routePath)) {
        return routePath;
      }
      if (this.isExternal(this.basePath)) {
        return this.basePath;
      } */
      return routePath; // path.resolve(this.basePath, routePath);
    },
    turnToPage(route) {
      let { name, params, query } = {};
      if (typeof route === 'string') name = route;
      else {
        name = route.name;
        params = route.params;
        query = route.query;
      }
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1]);
        return;
      }

      this.$router.push({
        name,
        params,
        query,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
  /deep/ .el-menu-item{
    font-weight: normal!important;
    color: white!important;
    opacity: 0.7!important;
    &:hover{
      background-color: #24499D!important;
    }
    img{
      width: 30px;
      height: 30px;
      margin-right: 15px;
      margin-left: -3px;
      margin-top: -3px;
    }
    &.is-active{
      background-color: #24499D!important;
      opacity: 1!important;
      &:before{
        background-color: rgba(255,255,255,0)!important;
      }
    }
  }
  /deep/ .is-active{
    .el-submenu__title{
      background-color: #24499D!important;
      opacity: 1!important;
    }
  }
  /deep/ .el-submenu__title{
    font-weight: normal!important;
    color: white!important;
    opacity: 0.7!important;
    &:hover{
      background-color: #24499D!important;
    }
    img{
      width: 30px;
      height: 30px;
      margin-right: 15px;
      margin-left: -3px;
      margin-top: -3px;
    }
  }
  /deep/ .el-icon-menu{
    margin-right: 16px!important;
  }
  /deep/ .el-submenu .el-menu-item{
    padding-left: 68px!important;
    font-size: 12px!important;
  }
</style>
