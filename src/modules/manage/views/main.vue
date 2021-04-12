<template>
  <Layout class="main">
    <div class="mainFixed">
    <div class="mainHeader">
    <Header class="header" ref="sideMenuHeader">
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
      <div class="radiusDiv"></div>
    </div>
    </div>
    </div>
    <Layout>
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
            <router-view />
          </Content>
        </Layout>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import Layout from '~/src/components/layout';
import Header from '~/src/components/layout/header.vue';
import HeaderBar from '~/src/components/header_bar/header_bar.vue';
import User from '~/src/components/user';
import TagsNav from '~/src/components/tags_nav/tags_nav.vue';
import Content from '~/src/components/layout/content.vue';
import SideMenu from '~/src/components/side_menu/side_menu.vue';
import { getNewTagList, routeEqual } from '~/src/libs/util';
import routers from '../router/routers';

export default {
  name: 'main',
  components: {
    Layout,
    Header,
    HeaderBar,
    User,
    TagsNav,
    Content,
    SideMenu,
  },
  computed: {
    ...mapState({
      tagNavList: state => state.app.tagNavList,
      userAvatar: state => state.user.userAvatar,
      userName: state => state.user.userName,
      siteTitle: state => state.app.siteTitle,
      superAdmin: state => state.user.superAdmin,
    }),
    ...mapGetters({
      menuList: 'app/menuList',
    }),
  },
  data() {
    return {
      contentMarginTop: 134,
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
    setContentMarginTop() {
      const headerHeight = this.$refs.sideMenuHeader.$el.offsetHeight;
      console.log(headerHeight);
      if (headerHeight < 85) { // 一层
        if (this.personalHealthPage === true) {
          this.contentMarginTop = 80;
        } else {
          this.contentMarginTop = 134;
        }
      } else if (headerHeight >= 85 && headerHeight < 115) { // 两层
        this.contentMarginTop = 157;
      } else if (headerHeight >= 115 && headerHeight < 145) { // 三层
        this.contentMarginTop = 187;
      } else if (headerHeight >= 145) { // 四层
        this.contentMarginTop = 217;
      }
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
.main /deep/ {
  height: 100%;
  .mainFixed{
    position: fixed;
    top: 0;
    /*min-width: 1400px;*/
    width:100%;
    // height: 136px;
    z-index: 9
  }
  .mainHeader{
    background: linear-gradient(150deg, #55AAFF 30%, #4991FD 100%);
    .header {
      min-height: 63px;
      justify-content: space-between;
      // background: #fff;
      padding: 0 0 0 10px;
      display: flex;
      .title{
        font-size: 14px;
        display: inline-block;
        width: 120px;
        margin-top: 21px;
        text-align: center;
        cursor: pointer;
        color: white;
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
      height: 34px;
      padding-top: 20px;
      padding-bottom: 17px;
      border-top: 1px solid rgba(255,255,255,0.2);
      /*position: fixed;
      top: 60px;*/
      .radiusDiv{
        width: 100%;
        height: 18px;
        border-radius: 20px 20px 0px 0px;
        background-color: white;
      }
    }
  }
  .main-content-con {
    margin-top: 134px;
    .main-layout-con {
    /*  .tag-nav-wrapper {
        padding: 0;
        height: 36px;
      }*/
    }
    .content-wrapper {
      padding: 30px;
      background-color: #fff;
      border-radius: 20px 20px 0px 0px;
      margin-top: -17px;
    }
  }
}
</style>
