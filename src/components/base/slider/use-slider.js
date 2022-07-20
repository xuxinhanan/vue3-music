import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'

import { onMounted, onUnmounted, onActivated, onDeactivated, ref } from 'vue'

BScroll.use(Slide)

export default function useSlider(wrapperRef) {
  const slider = ref(null)
  const currentPageIndex = ref(0)

  /* 在setup()里面是拿不到Dom的，要在onMounted生命周期去获取dom，完成BScroll的初始化 */
  onMounted(() => {
    const sliderVal = (slider.value = new BScroll(wrapperRef?.value, {
      click: true,
      scrollX: true,
      scrollY: false,
      momentum: false,
      bounce: false,
      probeType: 2,
      slide: true // 开启轮播图默认配置
    }))

    sliderVal.on('slideWillChange', page => {
      currentPageIndex.value = page.pageX
    })
  })

  /* 组件卸载之后也要销毁第三方库的实例 */
  onUnmounted(() => {
    slider.value.destroy()
  })

  onActivated(() => {
    slider.value.enable()
    slider.value.refresh()
  })

  onDeactivated(() => {
    slider.value.disable()
  })

  return {
    slider,
    currentPageIndex
  }
}
