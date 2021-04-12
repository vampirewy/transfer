/**
 * @Author: jrucker
 * @Description 拷贝生产资源
 * @Date: 2020/8/19 19:06
 * @Last Modified by: jrucker
 * @Last Modified time: 2020/8/19 19:06
 */

const path = require('path');
const config = require('../config');

module.exports = class InsertCopyWebpackPlugin {
    constructor(options) {

        let src = path.resolve(__dirname, '../src');
        let dll = path.resolve(__dirname, '../dll');

        this.copyPath = {};

        this.copyPath[`${src}/assets/images`] = 'static/images';
        this.copyPath[`${src}/assets/fonts`] = 'static/css/fonts';

        this.copyPath[`${dll}/css/common.min.css`] = 'static/css';
        this.copyPath[`${dll}/js/common.min.js`] = 'static/js';
        this.copyPath[`${dll}/js/extend.min.js`] = 'static/js';

    }

    insert() {
        let array = [];

        Object.keys(this.copyPath).forEach(key => {
            const fromTo = (() => (array, from, to) => {
                let obj = {
                    from: from,
                    to: to
                };

                array.push(obj);
            })();
            Object.prototype.toString.call(this.copyPath[key]) === '[object Array]' ?
                [...this.copyPath[key]].forEach(value => {
                    fromTo(array, path.resolve(__dirname, key), value)
                }) :
                fromTo(array, path.resolve(__dirname, key), this.copyPath[key])
        });

        return array
    }
};
