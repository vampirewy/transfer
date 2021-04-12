/**
 * @Author: csx
 * @Description
 * @Date: 2021/4/15 19:06
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 19:06
 */

import Vue from 'vue';

const Async = {};

Async.newInstance = (properties) => {
  const props = properties || {};

  const Instance = new Vue({
    data: Object.assign({}, props, {}),
    render(h) {
      let vnode = null;
      if (this.render) {
        vnode = this.render(h);
      }

      return vnode;
    },
  });

  const component = Instance.$mount();

  const $el = props.$el;
  if ($el && $el !== '') {
    const type = Object.prototype.toString.call($el);

    if (type === '[object HTMLDivElement]') $el.appendChild(component.$el);
    else if (type === '[object String]') { document.querySelector($el).appendChild(component.$el); }
  } else {
    document.body.appendChild(component.$el);
  }

  const async = Instance.$children[0];

  return {
    show(opt) {
      if (opt.data) Object.assign(async, opt.data);
    },
    remove(cb) {
      const delay = props.delay;
      setTimeout(() => {
        component.$destroy();
        component.$el.remove();
        cb();
      }, delay || 200);
    },
    component: async,
  };
};

export default Async;
