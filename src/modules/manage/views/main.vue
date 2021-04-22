<template>
  <div class="app-wrapper" :class="classObj">
    <Sidebar class="sidebar-container" :menu-list="menuList"></Sidebar>
    <Layout class="main">
      <Layout>
        <div class="mainFixed">
          <div class="mainHeader">
            <Header class="header" ref="sideMenuHeader">
              <img class="toggle" @click="toggleSidebar" src="@/assets/images/body/toggle.png"/>
              <span class="title" @click="$router.push('/home')">{{siteTitle}}</span>
              <span class="healthPageSide" v-show="personalHealthPage">个人管理中心</span>
              <side-menu v-show="!personalHealthPage"
                         ref="sideMenu"
                         :active-name="$route.name"
                         :menu-list="menuList"
                         @on-select="turnToPage"
              > <!--style="height: 63px;overflow-y: auto"-->
              </side-menu>
              <!--<header-bar :siteTitle="siteTitle">-->
              <user
                      :user-avatar="userAvatar"
                      :user-name="userName"
                      :super-admin="superAdmin"
              />
              <!--</header-bar>-->
            </Header>
            <div class="tag-nav-wrapper" v-show="!personalHealthPage">
              <tags-nav
                      :value="$route"
                      @input="handleClick"
                      :list="tagNavList"
                      @on-close="handleCloseTag"
              />
            </div>
          </div>
        </div>
        <!--<side-menu
          ref="sideMenu"
          :active-name="$route.name"
          :menu-list="menuList"
          @on-select="turnToPage"
        > 132 192  252
        </side-menu>-->
        <Content class="main-content-con" :style="{'margin-top': contentMarginTop + 'px'}">
          <Layout class="main-layout-con">
            <!--<div class="tag-nav-wrapper">
              <tags-nav
                :value="$route"
                @input="handleClick"
                :list="tagNavList"
                @on-close="handleCloseTag"
              />
            </div>-->
            <Content class="content-wrapper">
              <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
              </keep-alive>
              <router-view v-if="!$route.meta.keepAlive"></router-view>
            </Content>
          </Layout>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import Sidebar from '~/src/components/sidebar/index.vue';
import Layout from '~/src/components/layout';
import Header from '~/src/components/layout/header.vue';
import HeaderBar from '~/src/components/header_bar/header_bar.vue';
import User from '~/src/components/user';
import TagsNav from '~/src/components/tags_nav/tags_nav.vue';
import Content from '~/src/components/layout/content.vue';
import SideMenu from '~/src/components/side_menu/side_menu.vue';
import { getNewTagList, routeEqual, localSave } from '~/src/libs/util';
import routers from '../router/routers';
import ResizeMixin from '../../../libs/util/ResizeHandler';
export default {
  name: 'main',
  components: {
    Layout,
    Sidebar,
    Header,
    HeaderBar,
    User,
    TagsNav,
    Content,
    SideMenu,
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      tagNavList: state => state.app.tagNavList,
      userAvatar: state => state.user.userAvatar,
      userName: state => state.user.userName,
      siteTitle: state => state.app.siteTitle,
      superAdmin: state => state.user.superAdmin,
    }),
    ...mapGetters({
      // menuList: 'app/menuList',
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
      };
    },
  },
  data() {
    return {
      menuList: [],
      contentMarginTop: 0,
      personalHealthPage: this.$route.meta.title === '个人管理中心', // 判断是否是个人健康管理页
    };
  },
  watch: {
    $route(newRoute) {
      const { name, query, params, meta } = newRoute;
      this.personalHealthPageCheck(meta); // 判断是否是个人管理页
      this.addTag({
        route: { name, query, params, meta },
        type: 'push',
      });
      this.setTagNavList(getNewTagList(this.tagNavList, newRoute));
      this.$refs.sideMenu.updateOpenName(newRoute.name);
    },
  },
  mounted() {
    /**
     * 初始化设置标签导航
     * @description
     */
    this.getCheckMenuList();
    console.log(this.menuList);
    this.setTagNavList();
    this.setHomeRoute(routers);
    const { name, params, query, meta } = this.$route;
    this.personalHealthPageCheck(meta); // 判断是否是个人管理页
    setTimeout(() => {
      this.addTag({
        route: { name, params, query, meta },
      });
      // 如果当前打开页面不在标签栏中，跳到homeName页
      if (!this.tagNavList.find(item => item.name === this.$route.name)) {
        this.$router.push({
          name: 'home',
        });
      }
      this.setContentMarginTop();
    }, 100);
    window.onresize = () => { // 60 120  180  240 头部导航栏固定高度
      this.setContentMarginTop();
    };
  },
  methods: {
    ...mapMutations({
      setTagNavList: 'app/SET_TAG_NAV_LIST',
      setHomeRoute: 'app/SET_HOME_ROUTE',
      addTag: 'app/ADD_TAG',
      closeTag: 'app/CLOSE_TAG',
    }),
    personalHealthPageCheck(meta) {
      if (meta.title === '个人管理中心') {
        this.personalHealthPage = true;
      } else {
        this.personalHealthPage = false;
      }
    },
    async getCheckMenuList() { // 获取当前登录人权限
      const res = await this.$api.loginInterface.getCheckedMenu({});
      const { data } = res.data;
      console.log(data);
      this.menuList = data.synthesisMenuList;
      console.log(this.menuList);
      localSave('HK_ACCESS', JSON.stringify(data.checkList));
      this.$store.commit('user/SET_ACCESS', data.checkList);
    },
    setContentMarginTop() {
      /* const headerHeight = this.$refs.sideMenuHeader.$el.offsetHeight;
      console.log(headerHeight);
      if (headerHeight < 85) { // 一层
        if (this.personalHealthPage === true) {
          this.contentMarginTop = 80;
        } else {
          this.contentMarginTop = 134;
        }
      } else if (headerHeight >= 85 && headerHeight < 115) { // 两层
        this.contentMarginTop = 143;
      } else if (headerHeight >= 115 && headerHeight < 145) { // 三层
        this.contentMarginTop = 187;
      } else if (headerHeight >= 145) { // 四层
        this.contentMarginTop = 217;
      }*/
    },
    toggleSidebar() {
      this.$store.dispatch('app/toggleSideBar');
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
    handleCloseTag(res, type, route) {
      if (type !== 'others') {
        if (type === 'all') {
          this.turnToPage('home');
        } else if (routeEqual(this.$route, route)) {
          this.closeTag(route);
        }
      }
      this.setTagNavList(res);
    },
    handleClick(item) {
      this.turnToPage(item);
    },
  },
};
</script>

<style lang="scss" scoped>
  .app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
    .main {
      min-height: 100%;
      transition: margin-left .28s;
      margin-left: 210px;
      position: relative;
      background-color: #F6F8FC;
      overflow: hidden;
      border-radius: 24px 0px 0px 24px;
      z-index: 1002;
    }

    .sidebar-container {
      transition: width 0.28s;
      width: 232px !important;
      background-color: #3154AC;
      height: 100%;
      position: fixed;
      font-size: 0px;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 1001;
      overflow: hidden;
      overflow-y: auto;
      &::-webkit-scrollbar{
        width: 0!important;
      }
    }
  }
  .hideSidebar {
    .sidebar-container {
      width: 64px !important;
    }
    .main {
      margin-left: 64px;
    }
  }
.main /deep/ {
  height: 100%;
  .mainFixed{
    position: absolute;
    top: 0;
    /*min-width: 1400px;*/
    width:100%;
    // height: 136px;
    z-index: 9
  }
  .mainHeader{
    background: white;
    .header {
      height: 56px;
      justify-content: space-between;
      // background: #fff;
      padding: 0 0 0 10px;
      display: flex;
      .toggle{
        width: 56px;
        height: 56px;
        cursor: pointer;
      }
      .title{
        font-size: 14px;
        display: inline-block;
        width: 120px;
        margin-top: 17px;
        text-align: left;
        margin-left: 17px;
        cursor: pointer;
        color: black;
      }
      .healthPageSide{
        flex: 1;
        font-size: 14px;
        display: inline-block;
        width: 120px;
        margin-top: 21px;
        text-align: left;
        cursor: pointer;
        color: white;
        opacity: 0.7;
        padding: 0 30px;
      }
    }
    .tag-nav-wrapper {
      height: 40px;
      border-top: 1px solid #F6F6F9;
      background-color: white;
      /*position: fixed;
      top: 60px;*/
    }
  }
  .main-content-con {
    width: 100%;
    height: calc(100vh - 97px);
    overflow: hidden;
    position: absolute;
    top: 116px;
    .main-layout-con {
      height: 100%;
    /*  .tag-nav-wrapper {
        padding: 0;
        height: 36px;
      }*/
    }
    .content-wrapper {
      margin: 0 20px 20px 20px;
      padding: 20px;
      background-color: #fff;
      border-radius: 8px;
      height: calc(100% - 80px);
      overflow-y: auto;
    }
  }
}
</style>
