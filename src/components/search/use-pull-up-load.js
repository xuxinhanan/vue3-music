import BScroll from '@better-scroll/core'
import PullUp from '@better-scroll/pull-up'
import ObserveDOM from '@better-scroll/observe-dom'
import { ref, onMounted, onUnmounted, onActivated, onDeactivated } from 'vue'

BScroll.use(PullUp)
BScroll.use(ObserveDOM)

/**
 * @description: 上拉加载数据的hooks
 * @param {function} requestData 异步请求函数，在这个hooks中是不知道请求的细节的，因此需要外面传进来
 * @param {*} preventPullUpLoad 阻止上拉加载操作
 */
export default function usePullUpLoad(requestData, preventPullUpLoad) {
  // BScroll 实例对象
  const scroll = ref(null)
  // 初始化 BScroll 的容器对象
  const rootRef = ref(null)
  // 是否正在拉取数据
  const isPullUpLoad = ref(false)

  onMounted(() => {
    const scrollVal = (scroll.value = new BScroll(rootRef.value, {
      pullUpLoad: true,
      observeDOM: true,
      click: true
    }))

    // 监听 pullingUp 事件
    scrollVal.on('pullingUp', pullingUpHandler)

    // 监听回调
    async function pullingUpHandler() {
      if (preventPullUpLoad.value) {
        // 不允许上拉加载时直接结束流程
        scrollVal.finishPullUp()
        return
      }
      isPullUpLoad.value = true
      await requestData()
      scrollVal.finishPullUp()
      scrollVal.refresh()
      isPullUpLoad.value = false
    }
  })

  onUnmounted(() => {
    scroll.value.destroy()
  })

  onActivated(() => {
    scroll.value.enable()
    scroll.value.refresh()
  })

  onDeactivated(() => {
    scroll.value.disable()
  })

  return {
    scroll,
    rootRef,
    isPullUpLoad
  }
}
