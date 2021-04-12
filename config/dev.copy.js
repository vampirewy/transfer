/**
 * @Author: csx
 * @Description 拷贝开发资源
 * @Date: 2021/4/15 19:06
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 19:06
 */

const path = require('path');

module.exports = class InsertCopyWebpackPlugin {
    constructor(options) {

        let src = path.resolve(__dirname, '../src');
        let dll = path.resolve(__dirname, '../dll');

        this.copyPath = {};

        this.copyPath[`${src}/assets/images`] = 'static/images';
        this.copyPath[`${src}/assets/fonts`] = 'static/css/fonts';
        this.copyPath[`${src}/mock`] = 'static/mock';

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
