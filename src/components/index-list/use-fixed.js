import { ref, watch, computed, nextTick } from "vue";

export default function useFixed(props) {
  const TITLE_HEIGHT = 30;
  const groupRef = ref(null);
  const listHeights = ref([]);
  const scrollY = ref(0);
  const currentIndex = ref(0);
  // 区间底部（即下一个区间的顶部）距离容器顶部的距离
  const distance = ref(0);

  // 根据当前滚动落入的区间计算出该区间的title
  const fixedTitle = computed(() => {
    // 小细节：如果初始往上滚动不应该显示'热'，而是显示''（空），最好在v-show一下，直接不展示这个层
    if (scrollY.value < 0) {
      return "";
    }
    const currentGroup = props.data[currentIndex.value];
    return currentGroup ? currentGroup.title : "";
  });

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

  // 如果分组数据变化了需要重新计算分组高度
  watch(
    () => props.data,
    async () => {
      // 数据变化之后dom其实是没有变化的，因此要等nextTick才能计算出新的dom
      await nextTick();
      calculate();
    }
  );

  // 监听滚动时的Y坐标
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

  function onScroll(pos) {
    // 拿到滚动的y坐标，因为better-scroll给出的是负值，因此需要取反
    scrollY.value = -pos.y;
  }

  return {
    groupRef,
    onScroll,
    fixedTitle,
    fixedStyle,
    currentIndex,
  };
}
