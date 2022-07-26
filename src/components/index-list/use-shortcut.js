import { ref, computed } from 'vue'

export default function useShortcut(props, groupRef) {
  // li 的高度
  const ANCHOR_HEIGHT = 18
  const scrollRef = ref(null)

  // 根据歌手数据获取到 group.title 的集合作为 shortcutList
  const shortcutList = computed(() => {
    return props.data.map(group => {
      return group.title
    })
  })

  const touch = {}

  /**
   * @description:点击了哪个dom(li)哪个dom就会生成事件，因此在事件处理程序中只需获取到相应的事件对象，并通过其上预设的自定义属性拿到这个li的索引，进而歌手列表滚动到相应位置即可
   * @param {*} e
   */
  function onShortcutTouchStart(e) {
    const anchorIndex = Number(e.target.dataset.index)
    touch.y1 = e.touches[0].pageY
    touch.anchorIndex = anchorIndex
    scrollTo(anchorIndex)
  }

  /**
   * @description: 根据拖拽前和拖拽后的坐标计算出需要滚动的位置
   */
  function onShortcutTouchMove(e) {
    touch.y2 = e.touches[0].pageY
    const delta = ((touch.y2 - touch.y1) / ANCHOR_HEIGHT) | 0
    const anchorIndex = touch.anchorIndex + delta
    scrollTo(anchorIndex)
  }

  /**
   * @description: 调用 BScroll 实例里面的 scrollToElement 方法进行定向滚动
   */
  function scrollTo(index) {
    if (isNaN(index)) {
      return
    }
    index = Math.max(0, Math.min(shortcutList.value.length - 1, index))
    const targetEl = groupRef.value.children[index]
    const scroll = scrollRef.value.scroll
    scroll.scrollToElement(targetEl, 0)
  }

  return {
    shortcutList,
    scrollRef,
    onShortcutTouchStart,
    onShortcutTouchMove
  }
}
