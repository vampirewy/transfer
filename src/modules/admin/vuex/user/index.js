/**
 * @Author: csx
 * @Description
 * @Date: 2021/4/15 19:06
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 19:06
 */

const types = {
  SET_AVATAR: 'SET_AVATAR',
  SET_USER_NAME: 'SET_USER_NAME',
  SET_USER_ID: 'SET_USER_ID',
  SET_ACCESS: 'SET_ACCESS',
  SET_HAS_GET_INFO: 'SET_HAS_GET_INFO',
  SET_TOKEN: 'SET_TOKEN',
  SET_STATE: 'SET_STATE',
  SET_SUPER_ADMIN: 'SET_SUPER_ADMIN',
};

const initState = {
  userName: '',
  userId: '',
  userAvatar: '',
  access: '',
  hasGetInfo: false,
  superAdmin: false,
};

const getters = {};

const actions = {
};

const mutations = {
  [types.SET_AVATAR](state, path) {
    state.userAvatar = path;
  },
  [types.SET_USER_ID](state, id) {
    state.userId = id;
  },
  [types.SET_USER_NAME](state, name) {
    state.userName = name;
  },
  [types.SET_ACCESS](state, access) {
    state.access = access;
  },
  [types.SET_HAS_GET_INFO](state, status) {
    state.hasGetInfo = status;
  },
  [types.SET_SUPER_ADMIN](state, status) {
    state.superAdmin = status;
  },
};

export default {
  namespaced: true,
  state: initState,
  getters,
  actions,
  mutations,
};
