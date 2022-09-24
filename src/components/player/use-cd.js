import { useStore } from 'vuex'
import { computed, ref, watch } from 'vue'

export default function useCd() {
  const cdRef = ref(null)
  const cdImageRef = ref(null)

  const store = useStore()
  const playing = computed(() => store.state.playing)

  const cdCls = computed(() => {
    return playing.value ? 'playing' : ''
  })

  watch(playing, newPlaying => {
    if (!newPlaying) {
      syncTransform(cdRef.value, cdImageRef.value)
    }
  })

  function syncTransform(wrapper, inner) {
    const wrapperTransform = getComputedStyle(wrapper).transform
    const innerTransform = getComputedStyle(inner).transform
    // 因为内层旋转角度是相对于外层而言的，在非首次旋转的情况，需要考虑外层的旋转角度
    wrapper.style.transform =
      wrapperTransform === 'none'
        ? innerTransform
        : innerTransform + wrapperTransform
  }

  return {
    cdCls,
    cdRef,
    cdImageRef
  }
}
