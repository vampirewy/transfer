/**
 * @Author: jrucker
 * @Description
 * @Date: 2020/8/19 19:06
 * @Last Modified by: jrucker
 * @Last Modified time: 2020/8/19 19:06
 */

import Async from './async';

function instance(options) {
  const render = 'render' in options ? options.render : undefined;
  if (Async[options.component]) return false;
  Async[options.component] = Async.newInstance({
    render,
    ...options,
  });

  Async[options.component].show(options);
}

Async.show = (props = {}) => instance(props);

Async.hide = (props = {}) => {
  if (!Async[props.component]) return false;

  Async[props.component].remove(() => {
    Async[props.component] = null;
  });
};

export default Async;
