module.exports = {
  root: true, // 表示当前目录即为根目录，ESLint 规则将被限制到该目录下
  env: {
    node: true // 在 node 环境下启动 ESLint 检测
  },
  extends: ['plugin:vue/vue3-essential', '@vue/standard'], // ESLint 中基础配置需要继承的配置
  // 解析器
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    indent: 0,
    'space-before-function-paren': 0
  }
}
