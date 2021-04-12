<template>
  <Layout class="main">
    <div class="mainHeader">
    <Header class="header">
      <span class="title" @click="$router.push('/organizational_management')">{{siteTitle}}</span>
      <side-menu
              ref="sideMenu"
              :active-name="$route.name"
              :menu-list="menuList"
              @on-select="turnToPage"
      >
      </side-menu>
      <!--<header-bar :siteTitle="siteTitle">-->
        <user
          :user-avatar="userAvatar"
          :user-name="userName"
          :super-admin="superAdmin"
        />
      <!--</header-bar>-->
    </Header>
    <div class="tag-nav-wrapper">
      <tags-nav
              :value="$route"
              @input="handleClick"
              :list="tagNavList"
              @on-close="handleCloseTag"
      />
    </div>
    </div>
    <Layout>
      <!--<side-menu
        ref="sideMenu"
        :active-name="$route.name"
        :menu-list="menuList"
        @on-select="turnToPage"
      >
      </side-menu>-->
      <Content class="main-content-con">
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
  watch: {
    $route(newRoute) {
      const { name, query, params, meta } = newRoute;
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

    setTimeout(() => {
      this.addTag({
        route: { name, params, query, meta },
      });
      // 如果当前打开页面不在标签栏中，跳到homeName页
      if (!this.tagNavList.find(item => item.name === this.$route.name)) {
        this.$router.push({
          name: 'organizational_management',
        });
      }
    }, 100);
  },
  methods: {
    ...mapMutations({
      setTagNavList: 'app/SET_TAG_NAV_LIST',
      setHomeRoute: 'app/SET_HOME_ROUTE',
      addTag: 'app/ADD_TAG',
      closeTag: 'app/CLOSE_TAG',
    }),
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
          this.turnToPage('organizational_management');
        } else if (routeEqual(this.$route, route)) {
          this.closeTag(route);
        }
      }
      console.log(res);
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
  .mainHeader{
    background: linear-gradient(150deg, #55AAFF 30%, #4991FD 100%);
    .header {
      // background: #fff;
      padding: 0 0 0 10px;
      border-bottom: 1px solid rgba(255,255,255,0.2);
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
    }
    .tag-nav-wrapper {
      height: 34px;
      padding-top: 20px;
      padding-bottom: 17px;
    }
  }
  .main-content-con {
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
