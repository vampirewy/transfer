// /**
//  * @Author: csx
//  * @Description
//  * @Date: 2021/4/15 14:27
//  * @Last Modified by: csx
//  * @Last Modified time: 2021/4/15 14:27
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
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',//禁止使用console
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',//禁止使用debugger
    'consistent-return': 'off',//return 后面不允许省略
    'import/newline-after-import': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    'import/first': 'off',
    'lines-between-class-member': 'off',
    'import/order': 'off',
    'import/no-unresolved': 'off',
    'no-plusplus': 'off',//禁止使用++，--
    'class-methods-use-this': 'off',
    'global-require': 'off',
    'no-nested-ternary': 'off',//禁止使用嵌套的三目运算
    'linebreak-style': 'off',
    'no-param-reassign': 'off'//禁止给参数重新赋值
  },
};

