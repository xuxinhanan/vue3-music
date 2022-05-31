import { ref, watch, computed, nextTick } from "vue";

export default function useFixed(props) {
  const groupRef = ref(null);
  const listHeights = ref([]);
  const scrollY = ref(0);
  const currentIndex = ref(0);

  // 根据当前滚动落入的区间计算出该区间的title
  const fixedTitle = computed(() => {
    const currentGroup = props.data[currentIndex.value];
    return currentGroup ? currentGroup.title : "";
  });

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
      }
    }
  });

  function calculate() {
    const list = groupRef.value.children;
    const listHeightsVal = listHeights.value;
    let height = 0;

    // 清空列表
    listHeightsVal.length = 0;
    // 初始化第一个group
    listHeightsVal.push(height);
    //
    for (let i = 0; i < list.length; i++) {
      // 每个group可见的高度
      height += list[i].clientHeight;
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
  };
}
