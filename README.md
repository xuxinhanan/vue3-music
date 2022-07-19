# 一、项目目录

```
vue3-music
├─ src                                            项目主目录
│  ├─ App.vue
│  ├─ assets                                      静态资源文件
│  │  ├─ fonts
│  │  ├─ images
│  │  ├─ js
│  │  │  ├─ array-store.js                        本地存储
│  │  │  ├─ constant.js                           常量
│  │  │  └─ util.js                               工具函数
│  │  └─ scss                                     样式规范
│  ├─ components																	组件主目录
│  ├─ router																			路由
│  ├─ service																			请求API
│  ├─ store                                       状态管理
│  ├─views                                        一级路由视图
│  └─main.js
├─ .browserslistrc                                目标环境配置表
├─ .cz-config.js                                  提交规范
├─ .editorconfig                                  编辑器规范
├─ .eslintrc.js																	  ESlint规范
├─ .gitignore 
├─ .prettierignore
├─ .prettierrc                                    prettier规范
├─ babel.config.js                                babel配置表
├─ commitlint.config.js
├─ jsconfig.json															 	  vscode配置路径别名
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

Git Hook 工具 : husky + lint-staged

代码规范 :EditorConfig + Prettier + ESLint

提交规范 : Commitizen + Commitlint



# 三、开发文档

[主题替换方案](./doc/主题替换.md)

[组件联动](./doc/组件联动.md)

[splitChunks在项目中的实践](./doc/splitChunks在项目中的实践.md)



# 四、项目优化

+ babel7 配置优化：

  + ✅设置useBuiltIns、targets 参数，减小引入的 polyfill 文件体积

+ webpack优化：

  + ✅开启webpack5新增功能——持久化缓存
  + ✅全局引入sass变量

+ 项目优化：

  + ✅keep-alive缓存路由组件
  + ✅路由懒加载分包
  + ✅防抖查询
  + ✅图片懒加载
  
  



# 五、项目功能（持续更新...）

+ 其他

  + ✅ 一键换肤
  + ✅ noresult, loading组件封装为自定义指令
  + ✅ 洗牌算法完成数组乱序

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
    + 请求防抖
    + 输入文字显示搜索结果
  + ✅ 搜索结果
    +  搜索结果点击跳转播放页
  + ✅ 搜索历史
    + 删除某一项搜索历史
    + 一键清空搜索历史

​	

 .....

























