import Clamp from './src/main.js';

/* istanbul ignore next */
Clamp.install = function(Vue) {
  Vue.component(Clamp.name, Clamp);
};

export default Clamp;
