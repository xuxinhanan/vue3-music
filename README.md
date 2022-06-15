## 1.自定义指令

https://v3.cn.vuejs.org/guide/custom-directive.html#%E7%AE%80%E4%BB%8B

在Vue的项目中，大多数情况下，你都可以操作数据来修改视图，也就是所谓的操作DOM，但是还是避免不了偶尔要操作原生DOM。通过编写自定义指令能使我们更方便、优雅的操作DOM。

实现自定义指令`v-loading`，在数据没有及时渲染到页面时将`loading`组件插入到`DOM`中：

~~~js
import { createApp } from "vue";
import loading from "./loading.vue";
import { addClass, removeClass } from "@/assets/js/dom";

const relativeCls = "g-relative";

const loadingDirective = {
  mounted(el, binding) {
    // 创建 loading 组件实例
    const app = createApp(loading);
    // 将组件实例挂载到动态创建的 div 中，此时还没挂载到 el 实例中
    const instance = app.mount(document.createElement("div"));
    // 将实例保留到 el 实例中，方便其他钩子函数调用 instance
    el.instance = instance;
    // 添加动态指令参数
    const title = binding.arg;
    if (typeof title !== "undefined") {
      instance.setTitle(title);
    }

    // 指令绑定的值，如 v-if="xxx"，这个"xxx"就是 binding.value
    if (binding.value) {
      append(el);
    }
  },
  updated(el, binding) {
    const title = binding.arg;
    if (typeof title !== "undefined") {
      el.instance.setTitle(title);
    }
    if (binding.value !== binding.oldValue) {
      binding.value ? append(el) : remove1(el);
    }
  },
};

function append(el) {
  // loading 组件的定位是 absolute，因此如果父元素没有定位的话那么给他添加定位
  const style = getComputedStyle(el);
  if (["absolute", "fixed", "relative"].indexOf(style.position) === -1) {
    addClass(el, relativeCls);
  }

  // 把 loading 组件实例中的 dom 对象挂载到 el 中 ( 即 v-loading 作用的 dom 对象 )
  el.appendChild(el.instance.$el);
}

function remove1(el) {
  removeClass(el, relativeCls);
  el.removeChild(el.instance.$el);
}

export default loadingDirective;
~~~





## 2.图片懒加载

~~~html
<!-- 浏览器对于 data-* 属性的处理不会像默认属性那样处理 -->
<img src="default.jpg" data-src="http://www.xxx.com/target.jpg" />
~~~



方案一：`getBoundingClientRect().top`

~~~js
const images = document.querySelectorAll('img');

lazyload(); // 首次加载显示图片

window.addEventListener('scroll', lazyload);

const lazyload = () => {
    for (let i = count; i < images.length; i++) {
        // 获取图片与窗口顶部的距离
        const imageTop = image.getBoundingClientRect().top;
        // 如果这个距离小于窗口(window)的高度，那么表示这个图片出现在视口范围
        if (imageTop < document.documentElement.clientHeight) {
            const src = image.getAttribute("src");
            // 如果不是懒加载的图片，那么跳过
            if (src !== "default.jpg") continue;
            // 如果是懒加载的图片，并且又出现在了视口内，那么需要替换成需要的图片
            image.src = src;
        }
    }
}
~~~



方案二：`IntersectionObserver`

浏览器内置的一个`API`，实现了`监听window的scroll事件`、`判断是否在视口中`以及`节流`三大功能。

~~~js
const images = document.querySelectorAll("img");

const observer = new IntersectionObserver((changes) => {
  //changes 是被观察的元素集合
  for (let i = 0, len = changes.length; i < len; i++) {
    let change = changes[i];
    // 通过这个属性判断是否在视口中
    if (change.isIntersecting) {
      const imgElement = change.target;
      imgElement.src = imgElement.getAttribute("data-src");
      observer.unobserve(imgElement);
    }
  }
});

images.forEach(observer.observe(image));
~~~

## 3.better-scroll刷新后才能滑动

近期在写一个Vue移动端项目时 使用了better-scroll插件
但是页面初始化以后滑动事件失效，需要从新刷新页面才能启动功能，
这个问题困扰了我将近一天时间，在感觉解决无望时就真机测试了下 发现并没出现问题，遂又找了几个机型进行测试，发现并没有问题，
然后我又去better-scroll官网看了下他的demo 也会出现同样的问题！！ 合着只是新版谷歌与better-scroll自身的兼容问题，并不影响项目的正常运转，只是在谷歌进行移动端测试时才会出现罢了 …

















# 歌手页

## 收获

1. 垂直居中：

+ 设置line-height 等于height（行内元素垂直居中）
+ 利用绝对定位，先将元素的左上角通过top:50%定位到垂直方向中间位置，然后通过transform:translateY(-50%)将元素偏移到中间
+ 父容器设置为弹性盒子display:flex ，并且指定侧轴对齐方式align-items: center



2. 水平居中：

+ ⾏内元素水平居中: text-align: center

  

3. 绝对定位：相对父容器的位置



3. css里的&符号

![image-20220601105653095](C:\Users\64554\AppData\Roaming\Typora\typora-user-images\image-20220601105653095.png)



4. **所有以 “data-” 开头的特性均被保留供程序员使用。它们可在 `dataset` 属性中使用。**

   例如，如果一个 `elem` 有一个名为 `"data-about"` 的特性，那么可以通过 `elem.dataset.about` 取到它。

5. 固定定位：就是相对浏览器窗口进行定位。无论页面如何滚动，这个盒子显示的位置不变。常用来设置在导航栏下方的元素。

​	

**window.innerWidth/innerHeight与clientWidth/clientHeight**

~~~js
alert( window.innerWidth ); // 整个窗口的宽度
alert( document.documentElement.clientWidth ); // 减去滚动条宽度后的窗口宽度
~~~

**提示:** 使用 [offsetHeight](https://www.runoob.com/jsref/prop-element-offsetheight.html) 和 [offsettWidth](https://www.runoob.com/jsref/prop-element-offsetwidth.html) 属性返回元素的可见高度和宽度。



![img](https://www.runoob.com/wp-content/uploads/2021/10/L0hUTUw15byA5Y-R5paH5qGjL2ltYWdlcy9Dc3NCb3hNb2RlbC5wbmc.png)



## 固定标题栏实现

![动画](C:\Users\64554\Desktop\vue3-music\动画\动画.gif)

1. 求得分组的区间高度

2. 滚动过程可以知道实时的y值
3. 根据滚动的y值落在哪个区间对应渲染区间标题



1. 计算分组的高度

~~~js
function calculate() {
    // 拿到各个分组的dom
    const list = groupRef.value.children;
    // 缓存listHeights响应式变量，方便使用
    const listHeightsVal = listHeights.value;
    // 总高度
    let height = 0;

    // 清空列表
    listHeightsVal.length = 0;
    // 初始化第一个group
    listHeightsVal.push(height);
    //
    for (let i = 0; i < list.length; i++) {
      // 每个分组dom的高度叠加
      height += list[i].clientHeight;
      // 每个分组的高度
      listHeightsVal.push(height);
    }
  }
~~~

2. better-scroll 设置 `:probeType="3"` 让它不断广播出滚动事件
3. 监听滚动事件拿到返回的y坐标

~~~js
function onScroll(pos) {
    // 拿到滚动的y坐标，因为better-scroll给出的是负值，因此需要取反
    scrollY.value = -pos.y;
}
~~~

4. 监听滚动时的Y坐标，并与分组的高度比较得到当前显示的分组

~~~js
watch(scrollY, (newY) => {
    const listHeightsVal = listHeights.value;
    // 1. 遍历group数组，
    for (let i = 0; i < listHeightsVal.length - 1; i++) {
        // 2. 获取每个区间的TOP、BOTTOM，
        const heightTop = listHeightsVal[i];
        const heightBottom = listHeightsVal[i + 1];
        // 3. 从而判断是否落入该区间
        if (newY >= heightTop && newY <= heightBottom) {
            // 4. 如果落入某区间，那么记录该区间
            currentIndex.value = i;
            distance.value = heightBottom - newY;
            break;
        }
    }
});
~~~

5. 得到当前分组信息后就可以动态计算需要显示的分组标题了

~~~js
const fixedTitle = computed(() => {
    // 小细节：如果初始往上滚动不应该显示'热'，而是显示''（空），最好在v-show一下，直接不展示这个层
    if (scrollY.value < 0) {
        return "";
    }
    const currentGroup = props.data[currentIndex.value];
    return currentGroup ? currentGroup.title : "";
});
~~~





优化：向上顶的效果



区间底![动画2](C:\Users\64554\Desktop\vue3-music\动画\动画2.gif)部（即下一个区间的顶部)距离容器顶部的距离，如果这个距离小于固定标题层的高度，那么就让固定标题栏向上偏移

~~~js
const fixedStyle = computed(() => {
    const distanceVal = distance.value;
    const diff =
          distanceVal > 0 && distanceVal < TITLE_HEIGHT
    ? distanceVal - TITLE_HEIGHT
    : 0;
    return {
        transform: `translate3d(0, ${diff}px, 0)`,
    };
});
~~~





## 固定导航栏实现

为每个元素监听targetStart事件，拿到该元素在列表中的索引，这个索引对应歌手列表的dom，通过索引求得应该滚动到的dom位置，然后调用滚动即可。







# 歌手详情页

## 收获

1. **CSS 技巧**，通过设置 height: 0; padding-top:xxx 让宽高按一定比例展示（示例：歌手背景图片）

2. **vue重要优化技巧**：在计算属性中使用响应式变量次数大于 1 时，最好使用临时变量缓存它。原因不止是为了方便，还因为避免执行多次依赖收集





## 开发

### 1.歌手页点击歌手跳转到歌手详情页同时保证歌手详情页正确渲染相应歌手

![歌手跳转](C:\Users\64554\Desktop\vue3-music\动画\歌手跳转.gif)

思路：给每个歌手注册点击事件，点击后通过编程式导航跳转到二级路由。因为歌手页的 dom 封装在一个子组件中，因此需要通过 emit 进行组件通信并传递当前被点击的歌手信息。

~~~js
function onItemClick(item) {
    emit("select", item);
}
~~~



~~~js
selectSinger(singer) {
    this.selectedSinger = singer;
    this.$router.push({
        path: `/singer/${singer.mid}`,
    });
},
~~~







### 2.歌曲列表根据歌手背景图片的大小动态计算top值，做到刚好不遮盖图片

![image-20220607101439429](C:\Users\64554\Desktop\vue3-music\动画\image-20220607101439429.png)

思路：通过 mounted 钩子拿到挂载后的图片可见高度，然后动态计算歌曲列表的 top 值。

~~~js
data() {
    return {
        imageHeight: 0,
    };
}

mounted() {
    this.imageHeight = this.$refs.bgImage.clientHeight;
}

computed: {
    scrollStyle() {
        return {
            top: `${this.imageHeight}px`,
        };
	},
}
~~~



### 3.歌手图片的交互效果

![图片交互](C:\Users\64554\Desktop\vue3-music\动画\图片交互.gif)

思路：

1. 顶部固定：正常情况下，歌手列表的 dom 在图片后面，因此在没有设置 z-index 时歌手列表会覆盖图片。为此，可以设置一个可偏移的高度，超过这个高度就把图片的尺寸改成固定顶部的大小，然后设置 z-index，让图片位居上层。
2. 下拉放大：通过 scale 这个 css 样式即可实现。
3. 上移图片模糊：

~~~js
const RESERVED_HEIGHT = 40;

data() {
    return {
        imageHeight: 0,
        scrollY: 0,
        // 最大偏移高度
        maxTranslateY: 0,
    };
},

computed: {
    bgImageStyle() {
      let paddingTop = "70%";
      let height = 0;
      let zIndex = 0;
      let translateZ = 0;
      let scale = 1;
		
      // 如果超过可偏移高度，就把图片的尺寸改成固定顶部的大小，然后设置 z-index，让图片位居上层
      if (this.scrollY > this.maxTranslateY) {
        zIndex = 10;
        paddingTop = 0;
        height = `${RESERVED_HEIGHT}px`;
        translateZ = 1;
      }
        
	  // 下拉时放大图片
      if (this.scrollY < 0) {
        scale = 1 + Math.abs(this.scrollY / this.imageHeight);
      }

      return {
        zIndex,
        paddingTop,
        height,
        backgroundImage: `url(${this.pic})`,
        transform: `scale(${scale})translateZ(${translateZ}px)`,
      };
    },
}
~~~

























**bug**：点击歌手后页面没有变化，以为是路由出了bug，没有跳转到对应的组件。

其实是跳转了，只不过singer-detail页面没有设置定位，而singer页面设置了定位，根据css的规则，定位了的元素永远会压住未定位的元素。因此，singer-detail页面视觉上没有显示出来。

解决办法：给singer-detail设置定位，为了安全起见，最好设置z-index强制它处于最上层。





### 4.项目问题：歌手详情页刷新报错

分析：通过歌手页（一级路由）跳转到歌手详情页（二级路由）时传入的 props：singer 对象的数据来渲染歌手详情页，一旦页面进行刷新后，内存中的数据都会丢失，并且没有经过路由跳转，不知道点击的是哪个歌手，就不能去请求对应的歌曲数据。

因此我们希望刷新页面的时候仍然能获取到 singer 对象数据，为此，可以保存到浏览器存储中。考虑到用localStorage太重，用sessionStorage即可。（在本次会话中一直有效，刷新后仍有效）通过路由参数 id 与 歌手 mid 进行匹配，以正确显示。





回答：

1. 问题：通过歌手页（一级路由）跳转到歌手详情页（二级路由）时，在歌手详情页刷新之后报错，报错显示是某个参数 undifined，于是我重新检查了一遍数据传递，确认这个参数是由路由跳转时传递过去singer对象里的，然后又通过vue工具看到此时在组件内丢失了传递的参数。这个问题





### 5.进入退出歌曲详情页时的过渡效果

![过渡效果](C:\Users\64554\Desktop\vue3-music\动画\过渡效果.gif)

通过 vue 内置的 <transition> 组件来实现。 

~~~vue
  <router-view v-slot="{ Component }">
    <transition appear name="slide">
      <component :is="Component" :data="selectedSinger" />
    </transition>
  </router-view>
~~~



~~~css
// 过渡动画的样式
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s
}

.slide-enter-from, .slide-leave-to {
  transform: translate3d(100%, 0, 0)
}

.list-enter-active, .list-leave-active {
  transition: all 0.3s;
}
~~~



















**需求：获取异步数据的时候，可能会出现没有数据的情况，需要给用户一些提示**（用户体验优化）









# 播放器

分析：播放器在任何路由视图中都可以访问，所以它是一个全局组件，因此把它放在 App.vue 中。并且播放器里的数据也需要放在全局管理，因此使用vuex。



**优化**：播放器组件通过v-show而不是v-if来控制



## 开发

### 1.点击歌手播放歌曲逻辑

![播放歌曲](C:\Users\64554\Desktop\vue3-music\动画\播放歌曲.gif)

+ 歌手详情页点击歌手后触发点击事件，执行vuex的actions，即切换全局状态如 setFullScreen、currentIndex 等，而相应的播放歌曲页面的渲染由 v-show="fullScreen" 来控制。

~~~js
// music-list.vue
selectItem({ song, index }) {
    this.selectPlay({ list: this.songs, index });
},
~~~



+ 同时监听 currentSong，利用<audio>进行歌曲播放。

~~~js
    const currentSong = computed(() => store.getters.currentSong);

    watch(currentSong, (newSong) => {
      if (!newSong.id || !newSong.url) {
        return;
      }
      const audioEl = audioRef.value;
      audioEl.src = newSong.url;
      audioEl.play();
    });
~~~





### 2.歌曲播放页

#### 播放与暂停

暂停与继续分别是两个不同的 icon，对其注册点击事件，当点击后修改对应播放状态，然后由数据驱动即可。



![暂停播放](C:\Users\64554\Desktop\vue3-music\动画\暂停播放.gif)

~~~js
// player.vue

// 监听点击事件
function togglePlay() {
    store.commit("setPlayingState", !playing.value);
}

// 监听播放状态数据，并由数据驱动播放状态
watch(playing, (newPlaying) => {
    const audioEl = audioRef.value;
    newPlaying ? audioEl.play() : audioEl.pause();
});
~~~



#### 前进与后退

仍然是监听点击事件的思路。比如点击了后退按钮，那么currentIndex--，currentIndex变化了那么相应的 currentSong 也会响应式发生变化。由于歌曲的播放由watch currentSong 实现，当currentSong 变化时，会触发相应的回调切换歌曲。

~~~js
function prev() {
    const list = playlist.value;
    if (!list.length) return;
    if (list.length === 1) {
        loop();
    } else {
        let index = currentIndex.value - 1;
        if (index === -1) {
            index = list.length - 1;
        }
        store.commit("setCurrentIndex", index);
        if (!playing.value) {
            store.commit("setPlayingState", true);
        }
    }
}

function loop() {
    const audioEl = audioRef.value;
    audioEl.currentTime = 0;
    audioEl.play();
}
~~~



bug: DOMException: The play() request was interrupted by a new load request

这个play（播放）操作是一个promise，它要等媒体加载到一定程度后才会播放（resolve）。所以快速切换这个promise就抛错了。



![image-20220608202156250](C:\Users\64554\AppData\Roaming\Typora\typora-user-images\image-20220608202156250.png)



#### 随机播放



![随机播放](C:\Users\64554\Desktop\vue3-music\动画\随机播放.gif)

思路：核心数据驱动，注册点击事件，触发则修改播放器数据，同时触发视图更新。

~~~js
// actions.js
export function randomPlay({ commit }, list) {
  commit("setPlayMode", PLAY_MODE.random);
  commit("setSequenceList", list);
  commit("setPlayingState", true);
  commit("setFullScreen", true);
  commit("setPlaylist", shuffle(list));
  commit("setCurrentIndex", 0);
}
~~~



~~~js
// music-list.vue
random() {
    this.randomPlay(this.songs);
},
...mapActions(["selectPlay", "randomPlay"]),
~~~



#### 切换播放模式

播放模式可以看成是增强功能，因此可以封装到hooks里（上面的功能属于基本功能）。

![播放模式](C:\Users\64554\Desktop\vue3-music\动画\播放模式.gif)

**播放模式的icon**

给icon设置动态样式，其值由当前播放模式的状态计算取得。

~~~js
export default function useMode() {
  const store = useStore();
  const playMode = computed(() => store.state.playMode);

  // 根据当前播放模式（数据）计算使用哪个 icon
  const modeIcon = computed(() => {
    const playModeVal = playMode.value;
    return playModeVal === PLAY_MODE.sequence
      ? "icon-sequence"
      : playModeVal === PLAY_MODE.random
      ? "icon-random"
      : "icon-loop";
  });

  return {
    modeIcon,
  };
}
~~~

并给icon注册点击事件，点击后修改播放模式的状态。

~~~js
  function changeMode() {
    const playModeVal = playMode.value;
    if (playModeVal === PLAY_MODE.sequence) {
      //不能直接 commit,因为修改播放模式还要修改播放列表，比如随机播放要打乱列表
      store.dispatch("changeMode", PLAY_MODE.loop);
    } else if (playModeVal === PLAY_MODE.loop) {
      store.dispatch("changeMode", PLAY_MODE.random);
    } else {
      store.dispatch("changeMode", PLAY_MODE.sequence);
    }
  }
~~~



~~~js
export function changeMode({ commit, state, getters }, mode) {
  const currentId = getters.currentSong.id;
  if (mode === PLAY_MODE.random) {
    commit("setPlaylist", shuffle(state.sequenceList));
  } else {
    commit("setPlaylist", state.sequenceList);
  }
  // 打乱播放列表后还需定位正在播放的歌曲
  const index = state.playlist.findIndex((song) => {
    return song.id === currentId;
  });
  commit("setCurrentIndex", index);
  commit("setPlayMode", mode);
}
~~~















