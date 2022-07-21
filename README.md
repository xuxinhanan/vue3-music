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

第三方库：Better-Scroll

路由工具 : Vue Router

状态管理 : Vuex 

CSS 预编译 : Sass 

HTTP 工具 : Axios

Git Hook 工具 : husky + lint-staged

代码规范 :EditorConfig + Prettier + ESLint

提交规范 : Commitizen + Commitlint



# 三、开发文档

[主题替换方案](./docx/主题替换方案.md)

[多组件联动](./docx/多组件联动.md)

[splitChunks在项目中的实践](./docx/splitChunks在项目中的实践.md)

[添加防抖时踩的坑](./docx/添加防抖时踩的坑.md)

[滚动标题+吸顶合并方案](./docx/滚动标题+吸顶合并方案.md)



# 四、项目优化

+ babel7 配置优化：

  + ✅设置useBuiltIns、targets 参数，减小引入的 polyfill 文件体积

+ webpack配置优化：

  + ✅开启webpack5新增功能——持久化缓存

  + ✅全局引入scss变量

  + ✅添加打包分析

  + ✅添加路径别名alias

    

+ 项目优化：

  + ✅keep-alive缓存路由组件
  
  + ✅路由懒加载分包
  
  + ✅防抖查询
  
  + ✅图片懒加载
  
  + ✅点击区域优化 -- 伪元素扩大点击区域
  
  + ✅ 动画优化 -- transform代替方位值如top
  
    
  



# 五、项目功能（持续更新...）

+ 其他

  + ✅ 一键换肤
  + ✅ 洗牌算法完成数组乱序
  + ✅ 路由切换过渡动效
  + ✅ mini播放器

+ 推荐页
  + ✅ 轮播图
  
  + ✅ 歌单列表
  
    :blush: 点击歌单跳转歌单详情页
  
+ 歌手列表
  + ✅ 顶部固定标题+吸顶合并效果
  
  + ✅ shortcut快速导航
  
    :blush: 点击跳转到相应歌手分组
  
    :blush: 拖拽到相应歌手分组
  
  + ✅ 歌手跳转
  
+ 排行榜
  + ✅ 榜单列表
  
+ 搜索页
  + ✅ 搜索框
    
    :blush: 请求防抖
    
    :blush: 输入文字显示搜索结果
    
  + ✅ 搜索结果
    
    :blush: 搜索结果点击跳转播放页
    
  + ✅ 搜索历史
    
    :blush: 删除某一项搜索历史
    
    :blush: 一键清空搜索历史
  
+ 播放器

  + ✅ 播放/暂停

  + ✅ 音频播放时长显示

  + ✅ 进度条 

    :blush: 播放进度显示

    :blush: 进度条拖拽

    :blush: 进度条点击跳转

  + ✅ 音频切换 - 上一条/下一条
  
  + ✅ 歌曲收藏

 .....

























