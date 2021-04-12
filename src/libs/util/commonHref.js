// 客户跳转公共方法
export default {
  toPersonalHealth(clientId, router) {
    const routeData = router.resolve({
      path: `/personal_health/${clientId}`,
    });
    window.open(routeData.href, '_blank');
  },
};
