module.exports = {
  env: {
    browser: true,
    es2021: true,
    'vue/setup-compiler-macros': true // 处理setup语法中不需要引入的全局编译宏
  },
  extends: [
    'plugin:vue/vue3-strongly-recommended',
    'plugin:react/jsx-runtime',
    'standard'
  ], // 采用vue3的eslint插件，默认采用standard代码规范
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'vue/multi-word-component-names': 'off', // 关闭组件名必须大写驼峰命名验证
    'no-undef': 'off',
    'react/display-name': 'off',
    'vue/comment-directive': 'off'
  }
}
