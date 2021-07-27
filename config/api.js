/**
 * @Author: csx
 * @Description 域名信息配置
 * @Date: 2021/4/15 19:06
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 19:06
 */

const build = {
    static_url: '/', // 静态资源路径
    common_url: 'http://health.pre.touchealth.com/api',
    upload_url: 'http://health.pre.touchealth.com/',
    pdf_url: 'http://health.pre.touchealth.com/download',
};
const build_dev = {
    static_url: '/', // 静态资源路径
    common_url: 'http://health.pre.touchealth.com/api', // /apil
    upload_url: 'http://health.pre.touchealth.com/', //'/uploadFiles/'
    pdf_url: 'http://health.pre.touchealth.com/download',
};
const dev = {
    static_url: '/', // 静态资源路径
    common_url: '/api',
    upload_url: 'http://health.pre.touchealth.com/',
    pdf_url: 'http://health.pre.touchealth.com/download',
};

module.exports = { build, build_dev, dev };

