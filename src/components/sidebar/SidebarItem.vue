<template>
  <div>  <!--v-if="!item.hidden"-->
    <template v-if="hasOneShowingChild(item.roleMenuList,item) &&
    (!onlyOneChild.roleMenuList || onlyOneChild.noShowingChildren)">
      <!--<app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.name)">-->
        <el-menu-item :index="resolvePath(onlyOneChild.route)"
                      :class="{'submenu-title-noDropdown':!isNest}"
                      @click="turnToPage(item.route)">
          <!--<item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)"
                :title="onlyOneChild.meta.title" />-->
          <img v-if="!onlyOneChild.noShowingChildren || item.menuType ===1"
               src="@/assets/images/body/sideBarImg.png"/>
          <!--{{onlyOneChild.meta.title}}-->{{onlyOneChild.name}}
        </el-menu-item>
      <!--</app-link>-->
    </template>

    <el-submenu v-else ref="subMenu"
                :index="resolvePath(onlyOneChild.route)" popper-append-to-body>
      <template slot="title">
        <!--<item v-if="item.meta" :icon="item.meta && item.meta.icon"
        :title="item.meta.title" />-->
        <img src="@/assets/images/body/sideBarImg.png"/>
        <!--{{item.meta.title}}-->{{item.name}}
      </template>
      <sidebar-item
        v-for="child in item.roleMenuList"
        :key="child.menuCode"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.route)"
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
        if (item.menuType === 3) { //  如果是按钮级别就不展示
          bool = false;
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item;
          bool = true;
        }
        return bool;
      });
      console.log(showingChildren);
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
      if (typeof route === 'string') name = route.split('/')[1];
      else {
        name = route.name;
        params = route.params;
        query = route.query;
      }
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1]);
        return;
      }
      console.log(name);
      console.log({
        name,
        params,
        query,
      });
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
        width: 8px!important;
        // background: url("../../assets/images/body/chooseSidebarIcon.png") !important;
        // background-repeat: no-repeat;
        // background-size: 100% 100%;
        content: url("../../assets/images/body/chooseSidebarIcon.png")!important;
        right: 22px;
        left: auto!important;
        background-color: rgba(255,255,255,0)!important;
        top: 13%;
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
  /deep/ .el-menu{
    .el-menu-item{
      padding-left: 68px!important;
      font-size: 12px!important;
    }
  }
  /deep/ .el-submenu{
    &.is-opened{
      .el-menu{
        .el-menu-item{
          background-color: #274EA7!important;
          &.is-active{
            background-color: #24499D!important;
          }
          &:hover{
            background-color: #24499D!important;
          }
        }
      }
    }
  }
</style>
