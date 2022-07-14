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

  function onShortcutTouchStart(e) {
    // 通过 e.target.dataset.index 拿到当前 touch 位置对应的 li 元素的在整个列表 DOM 中的下标索引
    const anchorIndex = Number(e.target.dataset.index)
    // 屏幕中的第一个触点在页面上的位置
    touch.y1 = e.touches[0].pageY
    //
    touch.anchorIndex = anchorIndex
    // 歌手列表滚动到触点所对应的区域
    scrollTo(anchorIndex)
  }

  function onShortcutTouchMove(e) {
    // 屏幕中的第一个触点在页面上的位置
    touch.y2 = e.touches[0].pageY
    // 估算出拖拽了多少个 li 的身位
    const delta = ((touch.y2 - touch.y1) / ANCHOR_HEIGHT) | 0
    // 然后歌手列表就可以相应定位到对应的位置
    const anchorIndex = touch.anchorIndex + delta
    scrollTo(anchorIndex)
  }

  function scrollTo(index) {
    if (isNaN(index)) {
      return
    }
    index = Math.max(0, Math.min(shortcutList.value.length - 1, index))
    const targetEl = groupRef.value.children[index]
    // 通过 scroll 组件拿到 better-scroll 实例
    const scroll = scrollRef.value.scroll
    // 接着就可以调用实例里面的 scrollToElement 方法滚动到目标位置
    scroll.scrollToElement(targetEl, 0)
  }

  return {
    shortcutList,
    scrollRef,
    onShortcutTouchStart,
    onShortcutTouchMove
  }
}
