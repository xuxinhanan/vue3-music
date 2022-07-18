# 一、项目目录

```
vue3-music
├─ src                                            项目主目录
│  ├─ App.vue
│  ├─ assets                                      静态资源文件
│  │  ├─ fonts
│  │  ├─ icon
│  │  ├─ images
│  │  ├─ js
│  │  │  ├─ array-store.js                        本地存储
│  │  │  ├─ constant.js                           常量
│  │  │  └─ util.js                               工具函数
│  │  └─ scss
│  │     ├─ base.scss                             													
│  │     ├─ index.scss
│  │     ├─ mixin.scss
│  │     └─ variable.scss                         样式规范
│  ├─ components																	组件主目录
│  │  ├─ base																	
│  │  │  ├─ loading
│  │  │  ├─ no-result
│  │  │  ├─ scroll
│  │  │  ├─ search-list
│  │  │  ├─ slider
│  │  │  └─ song-list
│  │  ├─ header
│  │  ├─ index-list
│  │  ├─ music-list
│  │  ├─ player
│  │  ├─ search
│  │  └─ tab
│  ├─ main.js
│  ├─ router																			 路由
│  │  └─ index.js
│  ├─ service																			 请求API
│  │  ├─ base.js
│  │  ├─ recommend.js
│  │  ├─ search.js
│  │  ├─ singer.js
│  │  ├─ song.js
│  │  └─ top-list.js
│  ├─ store                                        状态管理
│  │  ├─ actions.js
│  │  ├─ getters.js
│  │  ├─ index.js
│  │  ├─ mutations.js
│  │  └─ state.js
│  └─ views                                        一级路由视图
├─ .browserslistrc                                 目标环境配置表
├─ .cz-config.js                                   提交规范
├─ .editorconfig                                   编辑器规范
├─ .eslintrc.js																		 ESlint规范
├─ .gitignore 
├─ .prettierignore
├─ .prettierrc                                     prettier规范
├─ babel.config.js                                 babel配置表
├─ commitlint.config.js
├─ jsconfig.json																	 vscode配置路径别名
├─ package-lock.json
├─ package.json
├─ vue.config.js
└─ README.md
```



# 二、技术栈

开发工具 : Visual Studio Code

构建工具 :  Webpack5

前端框架 :Vue 3

路由工具 : Vue Router

状态管理 : Vuex 

CSS 预编译 : Sass 

HTTP 工具 : Axios

Git Hook 工具 : husky

代码规范 :EditorConfig + Prettier + ESLint

提交规范 : Commitizen + Commitlint





# 三、项目优化

+ babel7 配置优化：

  + ✅设置useBuiltIns、targets 参数，减小引入的 polyfill 文件体积

+ webpack优化：

  + ✅开启webpack5新增功能——持久化缓存

+ 项目优化：

  + ✅使用keep-alive组件对页面组件进行缓存
  + ✅路由懒加载分包
  + ✅防抖查询

  



# 四、项目功能

+ 其他
  + ✅ 一键换肤
  + ✅ 路由切换过渡动效
  + ✅ mini播放器



+ 推荐页
  + ✅ 轮播图
  + ✅ 歌单列表
+ 歌手列表
  + ✅ 顶部固定标题栏
  + ✅ shortcut
  + ✅ 歌手跳转
+ 排行榜
  + ✅ 榜单列表
+ 搜索页
  + ✅ 搜索框
  + ✅ 搜索结果
  + ✅ 搜索结果对应播放跳转
  + ✅ 搜索历史

​	

 .....

























