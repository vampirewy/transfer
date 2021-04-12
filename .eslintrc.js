// /**
//  * @Author: jrucker
//  * @Description
//  * @Date: 2020/9/7 14:27
//  * @Last Modified by: jrucker
//  * @Last Modified time: 2020/9/7 14:27
//  */

module.exports = {
  root: true,
  env: {
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  globals: {
    Sailer: 'readonly',
  },
  extends: ['plugin:vue/essential', 'airbnb-base'],
  settings: {
    'import/resolver': {
      webpack: {
        config: './build/webpack.base.conf.js',
      },
    },
  },
  plugins: ['vue'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'consistent-return': 'off',
    'import/newline-after-import': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    'import/first': 'off',
    'lines-between-class-member': 'off',
    'import/order': 'off',
    'import/no-unresolved': 'off',
    'no-plusplus': 'off',
    'class-methods-use-this': 'off',
    'global-require': 'off',
    'no-nested-ternary': 'off',
    'linebreak-style': 'off',
    'no-param-reassign': 'off'
  },
};

