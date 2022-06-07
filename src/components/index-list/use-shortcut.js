import { ref, computed } from "vue";

export default function useShortcut(props, groupRef) {
  const scrollRef = ref(null);

  const shortcutList = computed(() => {
    return props.data.map((group) => {
      return group.title;
    });
  });

  function onShortcutTouchStart(e) {
    // 通过 e.target.dataset.index 拿到当前 touch 的 dom 索引
    const anchorIndex = parseInt(e.target.dataset.index);
    // 怎么根据索引拿到对应的dom
    const targetEl = groupRef.value.children[anchorIndex];
    const scroll = scrollRef.value.scroll;
    scroll.scrollToElement(targetEl, 0);
  }

  return {
    shortcutList,
    scrollRef,
    onShortcutTouchStart,
  };
}
