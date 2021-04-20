/**
 * @Author: csx
 * @Description
 * @Date: 2021/4/15 19:06
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 19:06
 */

import Cookies from 'js-cookie';
// cookie保存的天数
import { forEach, hasOneOf, objEqual } from '~/src/libs/tools';
export const MAX_PAGESIZE = 10000; // 最大页数请求全部

const cookieExpires = 1;

export const TOKEN_KEY = 'hk_token';

export const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token, { expires: cookieExpires || 1 });
};

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY);
  if (token) return token;
  return false;
};

export const hasChild = item => item.children && item.children.length !== 0;

const showThisMenuEle = (item, access, superAdmin) => {
  if (superAdmin) return true;
  if (item.meta && item.meta.access) {
    if (access.includes(item.meta.access)) return true;
    return false;
  }
  return true;
};
/**
 * @param {Array} list 通过路由列表得到菜单列表
 * @returns {Array}
 */
export const getMenuByRouter = (list, access, superAdmin) => {
  const res = [];
  forEach(list, (item) => {
    if (!item.meta || (item.meta && !item.meta.hideInMenu)) {
      const obj = {
        icon: (item.meta && item.meta.icon) || '',
        name: item.name,
        meta: item.meta,
      };
      if (
        (hasChild(item) || (item.meta && item.meta.showAlways)) &&
        showThisMenuEle(item, access, superAdmin)
      ) {
        obj.children = getMenuByRouter(item.children, access, superAdmin);
      }
      if (item.meta && item.meta.href) obj.href = item.meta.href;
      if (showThisMenuEle(item, access, superAdmin)) res.push(obj);
    }
  });
  return res;
};

export const getRouteTitleHandled = (route) => {
  const router = { ...route };
  const meta = { ...route.meta };
  let title = '';
  if (meta.title) {
    if (typeof meta.title === 'function') {
      meta.__titleIsFunction__ = true; /* eslint-disable-line */
      title = meta.title(router);
    } else title = meta.title;
  }
  meta.title = title;
  router.meta = meta;
  return router;
};

export const showTitle = (item) => {
  let { title } = item.meta;
  if (!title) return;

  title = (item.meta && item.meta.title) || item.name;
  return title;
};

/**
 * @description 本地存储和获取标签导航列表
 */
export const setTagNavListInLocalstorage = (list) => {
  localStorage.tagNaveList = JSON.stringify(list);
};
/**
 * @returns {Array} 其中的每个元素只包含路由原信息中的name, path, meta三项
 */
export const getTagNavListFromLocalstorage = () => {
  const list = localStorage.tagNaveList;
  return list ? JSON.parse(list) : [];
};

/**
 * @description 本地存储和获取标签导航列表
 */
export const setAdminTagNavListInLocalstorage = (list) => {
  localStorage.tagAdminNaveList = JSON.stringify(list);
};
/**
 * @returns {Array} 其中的每个元素只包含路由原信息中的name, path, meta三项
 */
export const getAdminTagNavListFromLocalstorage = () => {
  const list = localStorage.tagAdminNaveList;
  return list ? JSON.parse(list) : [];
};

/**
 * @param {Array} routers 路由列表数组
 * @description 用于找到路由列表中name为home的对象
 */
export const getHomeRoute = (routers, homeName = 'home') => {
  let i = -1;
  const len = routers.length;
  let homeRoute = {};
  while (++i < len) {
    const item = routers[i];
    if (item.children && item.children.length) {
      const res = getHomeRoute(item.children, homeName);
      if (res.name) return res;
    } else if (item.name === homeName) homeRoute = item;
  }
  return homeRoute;
};

/**
 * @param {*} list 现有标签导航列表
 * @param {*} newRoute 新添加的路由原信息对象
 * @description 如果该newRoute已经存在则不再添加
 */
export const getNewTagList = (list, newRoute) => {
  const { name, path, meta } = newRoute;
  const newList = [...list];
  if (newList.findIndex(item => item.name === name) >= 0) return newList;
  newList.push({ name, path, meta });
  return newList;
};

/**
 * @param {*} access 用户权限数组，如 ['super_admin', 'admin']
 * @param {*} route 路由列表
 */
const hasAccess = (access, route) => {
  if (route.meta && route.meta.access) {
    return access.includes(route.meta.access);
  }
  return true;
};

/**
 * 权鉴
 * @param {*} name 即将跳转的路由name
 * @param {*} access 用户权限数组
 * @param {*} routes 路由列表
 * @description 用户是否可跳转到该页
 */
export const canTurnTo = (name, access, routes) => {
  const routePermissionJudge = list =>
    list.some((item) => {
      if (item.children && item.children.length) {
        return routePermissionJudge(item.children);
      } else if (item.name === name) {
        return hasAccess(access, item);
      }
      return true;
    });

  return routePermissionJudge(routes);
};

/**
 * @description 根据name/params/query判断两个路由对象是否相等
 * @param {*} route1 路由对象
 * @param {*} route2 路由对象
 */
export const routeEqual = (route1, route2) => {
  const params1 = route1.params || {};
  const params2 = route2.params || {};
  const query1 = route1.query || {};
  const query2 = route2.query || {};
  return (
    route1.name === route2.name &&
    objEqual(params1, params2) &&
    objEqual(query1, query2)
  );
};

/**
 * @param {Array} list 标签列表
 * @param {String} name 当前关闭的标签的name
 */
export const getNextRoute = (list, route) => {
  let res = {};
  if (list.length === 2) {
    res = getHomeRoute(list);
  } else {
    const index = list.findIndex(item => routeEqual(item, route));
    if (index === list.length - 1) res = list[list.length - 2];
    else res = list[index + 1];
  }
  return res;
};

/**
 * @param {Number} times 回调函数需要执行的次数
 * @param {Function} callback 回调函数
 */
export const doCustomTimes = (times, callback) => {
  let i = -1;
  while (++i < times) {
    callback(i);
  }
};

export const findNodeUpper = (ele, tag) => {
  if (ele.parentNode) {
    if (ele.parentNode.tagName === tag.toUpperCase()) {
      return ele.parentNode;
    }
    return findNodeUpper(ele.parentNode, tag);
  }
};

export const findNodeUpperByClasses = (ele, classes) => {
  const parentNode = ele.parentNode;
  if (parentNode) {
    const classList = parentNode.classList;
    if (
      classList &&
      classes.every(className => classList.contains(className))
    ) {
      return parentNode;
    }
    return findNodeUpperByClasses(parentNode, classes);
  }
};

export const findNodeDownward = (ele, tag) => {
  const tagName = tag.toUpperCase();
  if (ele.childNodes.length) {
    let i = -1;
    const len = ele.childNodes.length;
    while (++i < len) {
      const child = ele.childNodes[i];
      if (child.tagName === tagName) return child;
      return findNodeDownward(child, tag);
    }
  }
};

export const showByAccess = (access, canViewAccess) =>
  hasOneOf(canViewAccess, access);

/**
 * 判断打开的标签列表里是否已存在这个新添加的路由对象
 */
export const routeHasExist = (tagNavList, routeItem) => {
  const len = tagNavList.length;
  let res = false;
  doCustomTimes(len, (index) => {
    if (routeEqual(tagNavList[index], routeItem)) res = true;
  });
  return res;
};

export const localSave = (key, value) => {
  localStorage.setItem(key, value);
};

export const localRead = key => localStorage.getItem(key) || '';

// scrollTop animation
export const scrollTop = (el, from = 0, to, duration = 500, endCallback) => {
  /* eslint-disable */
    if (!window.requestAnimationFrame) {
    window.requestAnimationFrame =
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000 / 60);
      };
  }
  const difference = Math.abs(from - to);
  const step = Math.ceil((difference / duration) * 50);

  const scroll = (start, end, step) => {
    if (start === end) {
      endCallback && endCallback();
      return;
    }

    let d = start + step > end ? end : start + step;
    if (start > end) {
      d = start - step < end ? end : start - step;
    }

    if (el === window) {
      window.scrollTo(d, d);
    } else {
      el.scrollTop = d;
    }
    window.requestAnimationFrame(() => scroll(d, end, step));
  };
  scroll(from, to, step);
};

/**
 * @description 根据当前跳转的路由设置显示在浏览器标签的title
 * @param {Object} routeItem 路由对象
 * @param {Object} vm Vue实例
 */
export const setTitle = (routeItem, vm) => {
  const handledRoute = getRouteTitleHandled(routeItem);
  const pageTitle = showTitle(handledRoute, vm);
  const resTitle = typeof pageTitle !== 'undefined' ? pageTitle : '';
  window.document.title = resTitle;
};

/**
 * 获取日期
 * @param date
 * @param format
 * @returns {string}
 */
export const formatDate = (date, format = 'YY-MM-DD hh:mm:ss') => {
    let year = date.getFullYear(),
        month = date.getMonth() + 1,//月份是从0开始的
        day = date.getDate(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();

    let prefix = Array.apply(null, Array(10)).map(function (elem, index) {
        return '0' + index;
    });//开个长度为10的数组 格式为 00 01 02 03

    let fullTime = format.replace(/YY/g, year)
        .replace(/MM/g, prefix[month] || month)
        .replace(/DD/g, prefix[day] || day)
        .replace(/hh/g, prefix[hour] || hour)
        .replace(/mm/g, prefix[min] || min)
        .replace(/ss/g, prefix[sec] || sec);

    return fullTime;
};

/**
 * 判断空值
 * @param varValue
 * @returns {boolean}
 */
export const isBlank = (varValue) => {
    if (varValue !== null && varValue !== undefined && varValue !== '' && varValue !== 'null') {
        return false;
    }
    return true;
};

/**
 * 读取文件类型
 * @param filename
 * @returns {string|boolean}
 */
export const getFileType = (filename) => {
  if (!filename || typeof filename !== 'string') {
    return false
  }
  let a = filename.split('').reverse().join('');
  let b = a.substring(0, a.search(/\./)).split('').reverse().join('');
  return b
}
