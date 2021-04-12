import Money from './src/main';

/* istanbul ignore next */
Money.install = function(Vue) {
  Vue.component(Money.name, Money);
};

export default Money;
