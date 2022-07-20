import { ref, watch, computed, nextTick } from 'vue'

export default function useFixed(props) {
  const TITLE_HEIGHT = 30
  const groupRef = ref(null)
  const listHeights = ref([])
  const scrollY = ref(0)
  const currentIndex = ref(0)
  const distance = ref(0)

  /**
   * @description: 计算固定标题栏的文字内容
   * @return {*} 文字内容
   */
  const fixedTitle = computed(() => {
    if (scrollY.value < 0) {
      return ''
    }
    const currentGroup = props.data[currentIndex.value]
    return currentGroup ? currentGroup.title : ''
  })

  /**
   * @description: 计算固定标题栏的偏移量
   * @return {*} 偏移量
   */
  const fixedStyle = computed(() => {
    const distanceVal = distance.value
    const diff =
      distanceVal > 0 && distanceVal < TITLE_HEIGHT
        ? distanceVal - TITLE_HEIGHT
        : 0
    return {
      transform: `translate3d(0, ${diff}px, 0)`
    }
  })

  /**
   * @description: 监听渲染数据，当有数据之后就可以计算出每个li的高度了。
   * 另外，数据变化后，DOM更改发生在nextTick后，因此需要等一个tick才能正确计算。
   */
  watch(
    () => props.data,
    async () => {
      await nextTick()
      calculate()
    }
  )

  /**
   * @description: 监听滚动坐标，计算出当前落入的区间，并且计算出当前位置与下一个区间的距离，用于吸顶合并交互
   */
  watch(scrollY, newY => {
    const listHeightsVal = listHeights.value
    for (let i = 0; i < listHeightsVal.length - 1; i++) {
      const heightTop = listHeightsVal[i]
      const heightBottom = listHeightsVal[i + 1]
      if (newY >= heightTop && newY <= heightBottom) {
        currentIndex.value = i
        distance.value = heightBottom - newY
        break
      }
    }
  })

  /**
   * @description: 计算列表中每个li的高度，将结果保存在数组中，方便与渲染数据进行对比拿到索引值
   */
  function calculate() {
    const list = groupRef.value.children
    const listHeightsVal = listHeights.value

    let height = 0
    listHeightsVal.length = 0
    listHeightsVal.push(height)

    for (let i = 0; i < list.length; i++) {
      height += list[i].clientHeight
      listHeightsVal.push(height)
    }
  }

  /**
   * @description: 拿到滚动事件传递的y坐标，因为BScroll给出的是负值，因此需要取反
   */
  function onScroll(pos) {
    scrollY.value = -pos.y
  }

  return {
    groupRef,
    onScroll,
    fixedTitle,
    fixedStyle,
    currentIndex
  }
}
