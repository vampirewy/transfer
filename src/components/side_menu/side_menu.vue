<template>
  <div class="side-menu-wrapper">
    <slot></slot>

    <el-menu
      ref="menu"
      :mode="horizontal"
      :default-active="activeName"
      :default-openeds="openedNames"
      width="auto"
      menu-trigger="hover"
      @select="handleSelect"
    >
      <template v-for="item in menuListSlideMune">
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
            <span>{{ showTitle(item.children[0]) }}</span></el-menu-item
          >
        </template>
        <template v-else>
          <side-menu-item
            v-if="showChildren(item)"
            :key="`menu-${item.name}`"
            :parent-item="item"
          ></side-menu-item>
          <el-menu-item
            v-else
            :index="item.name"
            :name="getNameOrHref(item)"
            :key="`menu-${item.name}`"
          >
            <span>{{ showTitle(item) }}</span></el-menu-item
          >
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script>
import SideMenuItem from './side_menu_item.vue';
import mixin from './mixin';

const getUnion = (arr1, arr2) => Array.from(new Set([...arr1, ...arr2]));

export default {
  name: 'SideMenu',
  mixins: [mixin],
  components: {
    SideMenuItem,
  },
  props: {
    menuList: {
      type: Array,
      default() {
        return [];
      },
    },
    theme: {
      type: String,
      default: 'dark',
    },
    rootIconSize: {
      type: Number,
      default: 20,
    },
    iconSize: {
      type: Number,
      default: 16,
    },
    activeName: {
      type: String,
      default: '',
    },
    openNames: {
      type: Array,
      default: () => [],
    },
    horizontal: {
      type: String,
      default: 'horizontal',
    },
  },
  data() {
    return {
      openedNames: [],
      menuListSlideMune: [],
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$emit('on-select', key, keyPath);
    },
    getOpenedNamesByActiveName(name) {
      return this.$route.matched
        .map(item => item.name)
        .filter(item => item !== name);
    },
    updateOpenName(name) {
      if (this.horizontal !== 'horizontal') {
        if (name === 'home') this.openedNames = [];
        else this.openedNames = this.getOpenedNamesByActiveName(name);
      }
    },
  },
  computed: {
    textColor() {
      return this.theme === 'dark' ? '#fff' : '#495060';
    },
  },
  watch: {
    activeName(name) {
      if (this.horizontal !== 'horizontal') {
        this.openedNames = getUnion(
          this.openedNames,
          this.getOpenedNamesByActiveName(name),
        );
      }
    },
    openNames(newNames) {
      if (this.horizontal !== 'horizontal') {
        this.openedNames = newNames;
      }
    },
    openedNames() {},
  },
  mounted() {
    if (this.horizontal !== 'horizontal') {
      this.openedNames = getUnion(
        this.openedNames,
        this.getOpenedNamesByActiveName(name),
      );
    }
    this.menuListSlideMune = this.menuList;
    const menuListNew = [];
    this.menuListSlideMune.forEach((value) => {
      if (value.name !== 'home') {
        menuListNew.push(value);
      }
    });
    this.menuListSlideMune = menuListNew;
  },
};
</script>
<style lang="scss" scoped>
.side-menu-wrapper {
  user-select: none;
  flex: 1;
  margin-top: 15px;
  margin-bottom: 10px;
  /deep/ .el-menu{
    background-color: transparent;
  }
  .menu-collapsed {
    padding-top: 10px;

    .ivu-dropdown {
      width: 100%;
      .ivu-dropdown-rel a {
        width: 100%;
      }
    }
    .ivu-tooltip {
      width: 100%;
      .ivu-tooltip-rel {
        width: 100%;
      }
      .ivu-tooltip-popper .ivu-tooltip-content {
        .ivu-tooltip-arrow {
          border-right-color: #fff;
        }
        .ivu-tooltip-inner {
          background: #fff;
          color: #495060;
        }
      }
    }
  }
  a.drop-menu-a {
    display: inline-block;
    padding: 6px 15px;
    width: 100%;
    text-align: center;
    color: #495060;
  }
  /*slidemenu*/
  /deep/ .el-submenu .el-submenu__title,/deep/ .el-menu--horizontal .el-menu-item {
     color: white !important;
     opacity: 0.7;
     font-weight: 400;
     padding: 0 15px;
     height: 30px;
     line-height: 30px; // 上下间距
   }
   /deep/ .el-submenu .el-submenu__title:hover,/deep/ .el-menu--horizontal .el-menu-item:hover {
     opacity: 1;
     background-color: transparent;
   }
   /deep/ .el-menu-item:not(.is-disabled):hover,/deep/ .el-menu-item:not(.is-disabled):focus{
     opacity: 1;
     background-color: transparent;
   }
   /deep/ .el-submenu.is-active .el-submenu__title, /deep/ .el-menu-item.is-active {
     opacity: 1;
     background-color: transparent;
   }
   /deep/ .el-submenu__title i{
     color: white;
     background: url("../../assets/images/body/sliderBottom.png") no-repeat;
     background-size: 100% 100%;
     width: 16px;
     height: 16px;
     margin-left: 4px;
     margin-top: -1px;
     //transform: rotate(180deg);
   }
   /deep/ .el-icon-arrow-down:before{
     content: '';
   }
}
/*下拉展开*/
/*/deep/ .el-menu--popup{
  box-shadow: 0px 0px 30px 0px rgba(151, 166, 189, 0.3);
  border-radius: 10px;
  min-width: 140px;
}
/deep/ .el-menu--horizontal .el-menu .el-menu-item{
  width: 98%;
  margin-left: 1%;
  text-align: center;
}*/
.menu-title {
  padding-left: 6px;
}
</style>
