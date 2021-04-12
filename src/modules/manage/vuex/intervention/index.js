/**
 * @Author: csx
 * @Description
 * @Date: 2020/10/10 19:06
 * @Last Modified by: csx
 * @Last Modified time: 2020/10/10 19:06
 */

const types = {
  SET_TPL_LIST: 'SET_TPL_LIST',
  SET_USERCHECK_LIST: 'SET_USERCHECK_LIST',
};

const initState = {
  tplList: [], // 勾选的模板
  checkUserList: [], // 勾选的用户
};

const getters = {};

const actions = {
  // 获取干预模板集合
  setTplList({ commit }, list) {
    return new Promise((resolve, reject) => {
      try {
        commit(types.SET_TPL_LIST, list);
        resolve(list);
      } catch (error) {
        reject(error);
      }
    });
  },
};

const mutations = {
  [types.SET_TPL_LIST](state, list) {
    const sortList = [...list].sort((a, b) => (b.planTime < a.planTime ? 1 : -1));
    state.tplList = [...sortList];
    console.log(state.tplList);
  },
  [types.SET_USERCHECK_LIST](state, list) {
    state.checkUserList = [...list];
    console.log(state.checkUserList);
  },
};

export default {
  namespaced: true,
  state: initState,
  getters,
  actions,
  mutations,
};
