import BaseModule from '../BaseModule';

class ServiceManagerInterface extends BaseModule {
  // 服务订单列表
  getServiceOrderList(data = {}) {
    return this.get('/service_order/list_page', {
      params: data,
    });
  }
  // 服务订单批量删除
  serviceOrderDelete(data = {}) {
    return this.post('/service_order/batch/delete', data);
  }
  // 获取服务订单详情
  serviceOrderDetail(id) {
    return this.get(`/service_order/${id}`);
  }
  // 新增服务订单
  serviceOrderSave(data = {}) {
    return this.post('/service_order/save', data);
  }
  // 操作服务订单
  serviceOrderOperation(id, data = {}) {
    return this.put(`/service_order/operation/${id}`, data);
  }
  // 服务项目列表
  getServiceItemList(data = {}) {
    return this.get('/service/item/list', {
      params: data,
    });
  }
  // 服务项目详情
  getServiceItemDetail(id) {
    return this.get(`/service/item/${id}`);
  }
  // 获取我的服务
  getMyServiceList(data = {}) {
    return this.get('/user/service/list', {
      params: data,
    });
  }
  // 保存我的服务
  userServiceSave(data = {}) {
    return this.post('/user/service/save', data);
  }
  // 获取我的服务详情
  userServiceDetail(id) {
    return this.get(`/user/service/${id}`);
  }
  // 删除我的服务
  userServiceDelete(data = {}) {
    return this.post('/user/service/delete', data);
  }
  // 启用我的服务
  userServiceEnable(id) {
    return this.post(`/user/service/enable/${id}`);
  }
  // 禁用我的服务
  userServiceDisable(id) {
    return this.post(`/user/service/disable/${id}`);
  }
}

export default new ServiceManagerInterface();
