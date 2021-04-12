/**
 * @Author: csx
 * @Description
 * @Date: 2021/4/15 19:06
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 19:06
 */

import {
  setAdminTagNavListInLocalstorage,
  getMenuByRouter,
  getAdminTagNavListFromLocalstorage,
  getHomeRoute,
  getNextRoute,
  routeHasExist,
  routeEqual,
  getRouteTitleHandled,
} from '~/src/libs/util';

import router from '../../router';
import routers from '../../router/routers';

const homeName = 'organizational_management';

const types = {
  SET_STATE: 'SET_STATE',
  SET_TAG_NAV_LIST: 'SET_TAG_NAV_LIST',
  SET_HOME_ROUTE: 'SET_HOME_ROUTE',
  ADD_TAG: 'ADD_TAG',
  CLOSE_TAG: 'CLOSE_TAG',
};

const initState = {
  theme: 'light',
  tagNavList: [],
  homeRoute: {},
  siteTitle: '后台管理',
};

const gettersToProps = {
  menuList: (state, getters, rootState) =>
    getMenuByRouter(routers, rootState.user.access, rootState.user.superAdmin),
};

const actions = {};

const mutations = {
  [types.SET_HOME_ROUTE](state, routes) {
    state.homeRoute = getHomeRoute(routes, homeName);
  },
  async [types.SET_TAG_NAV_LIST](state, list) {
    let tagList = [];
    if (list) {
      tagList = list.filter(
        item => item.meta === undefined || !item.meta.hideInTag,
      );
    } else {
      const storage = await getAdminTagNavListFromLocalstorage();
      if (!storage.length) {
        storage.push({
          name: homeName,
          query: {},
          params: {},
          meta: state.homeRoute.meta,
        });
      }

      tagList = storage.filter(
        item => item.meta === undefined || !item.meta.hideInTag,
      ) || [];
    }
    /* if (tagList[0] && tagList[0].name !== homeName) tagList.shift();
    const homeTagIndex = tagList.findIndex(item => item.name === homeName);
    if (homeTagIndex > 0) {
      const homeTag = tagList.splice(homeTagIndex, 1)[0];
      tagList.unshift(homeTag);
    }*/
    state.tagNavList = tagList;
    setAdminTagNavListInLocalstorage([...tagList]);
  },
  [types.CLOSE_TAG](state, route) {
    let setRoute = route;
    const tag = state.tagNavList.filter(item => routeEqual(item, setRoute));
    setRoute = tag[0] ? tag[0] : null;
    if (!setRoute) return;
    const nextRoute = getNextRoute(state.tagNavList, setRoute);
    state.tagNavList = state.tagNavList.filter(
      item => !routeEqual(item, setRoute),
    );
    router.push(nextRoute);
  },
  [types.ADD_TAG](state, { route, type = 'unshift' }) {
    const getRoute = getRouteTitleHandled(route);
    if (!routeHasExist(state.tagNavList, getRoute)) {
      if (type === 'push') state.tagNavList.push(getRoute);
      else if (getRoute.name === homeName) state.tagNavList.unshift(getRoute);
      else state.tagNavList.splice(1, 0, getRoute);
      setAdminTagNavListInLocalstorage([...state.tagNavList]);
    }
  },
  [types.SET_STATE](state, payload) {
    Object.keys(payload).forEach((key) => {
      state[key] = payload[key];
    });
  },
};

export default {
  namespaced: true,
  state: initState,
  getters: gettersToProps,
  actions,
  mutations,
};
