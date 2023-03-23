# Vue3 + Typescript + Vite  + sass + vant

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

创建于：2022-12-09

## Recommended IDE Setup

* [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.

## 项目创建

 `npm init vite@latest`

 `npm install`
 
 `npm run dev`

## Eslint 配置

1. `npm  i eslint --save-dev` 安装eslint
2. `npx eslint --init` 初始化eslint ，推荐使用 Standard 代码规范，具体配置参考 eslintrc.js 里面的配置

## 编辑器集成 Eslint  

1. 安装 eslint 插件
2. 关闭vue2的插件，安装vue3插件 volar
3. 首选项配置中，启用eslint
4. 将格式化文档方式改为 eslint

## 配置Git commit 钩子函数，不符合代码规范的代码不允许提交

1. 安装 `npx mrm@2 lint-staged`
2. 具体配置参考 package.json 里面的配置

## Git提交代码规范，提交类别只允许使用下面7个标识

* feat: 新功能（feature）
* fix: 修补bug
* docs: 文档（documentation）
* style:  格式（不影响代码运行的变动）
* refactor: 重构（即不是新增功能，也不是修改bug的代码变动）
* test: 增加测试
* chore: 构建过程或辅助工具的变动

##  内容 -页面地址

