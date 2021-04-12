/**
 * @Author: csx
 * @Description api接口
 * @Date: 2021/4/15 19:06
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 19:06
 */

import BaseModule from '../BaseModule';

class ServiceItemsInterface extends BaseModule {
  // 服务项目列表
  getServiceItemList(data = {}) {
    return this.get('/service/item/list', {
      params: data,
    });
  }

  // 启用服务项目
  enableServiceItem(data = {}) {
    return this.post(`/service/item/enable/${data.id}`);
  }

  // 禁用服务项目
  disableServiceItem(data = {}) {
    return this.post(`/service/item/disable/${data.id}`);
  }

  // 保存服务项目
  saveServiceItem(data = {}) {
    return this.post('/service/item/save', data);
  }

  // 删除服务项目
  deleteServiceItem(data = {}) {
    return this.post('/service/item/delete', data);
  }

  // 查看服务项目
  detailServiceItem(data = {}) {
    return this.get(`/service/item/${data.id}`, {
      params: data,
    });
  }
}

export default new ServiceItemsInterface();
