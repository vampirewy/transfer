/**
 * @Author: csx
 * @Description http配置
 * @Date: 2021/4/15 19:06
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 19:06
 */

import axios from 'axios';
import CapsuleUI from '~/plugins/@zyf2e/capsule-ui/lib';
import { getToken } from '~/src/libs/util';

class BaseModule {
  constructor() {
    this.$http = axios.create();
    this.dataMethodDefaults = {
      headers: {
        'Content-Type': 'application/json',
        token: getToken(),
      },
      // withCredentials: true, // 跨域cookie
    };

    // request拦截器
    this.$http.interceptors.request.use(
      (request) => {
        const opt = request;
        opt.url = `${process.env.api.common_url}${opt.url}`;
        return opt;
      },
      error => Promise.reject(error),
    );

    // respone拦截器
    this.$http.interceptors.response.use(
      (response) => {
        const code = response.data.rc;
        if (code !== 0) {
          if (code === 10003) {
            // Cookies.remove('token'); // token过期,清除
            // window.localStorage.removeItem('USER_INFO');
            window.location.href = '/#/login';
          } else {
            // CapsuleUI.Message.warning(response.data.message);
          }
          CapsuleUI.Message.warning(response.data.msg);
          return Promise.reject(response);
        }
        return response;
      },
      (err) => {
        const { response } = err;
        return Promise.reject(response);
      },
    );
  }

  get(url, config = {}) {
    return this.$http.get(url, { ...this.dataMethodDefaults, ...config });
  }

  post(url, data = undefined, config = {}) {
    return this.$http.post(url, data, {
      ...this.dataMethodDefaults,
      ...config,
    });
  }

  put(url, data = undefined, config = {}) {
    return this.$http.put(url, data, { ...this.dataMethodDefaults, ...config });
  }

  delete(url, config = {}) {
    return this.$http.delete(url, config);
  }
}

export default BaseModule;
