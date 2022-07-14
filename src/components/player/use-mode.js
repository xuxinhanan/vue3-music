import { useStore } from 'vuex'
import { computed } from 'vue'
import { PLAY_MODE } from '@/assets/js/constant'

export default function useMode() {
  const store = useStore()

  const playMode = computed(() => store.state.playMode)
  // 根据当前播放模式（数据）计算使用哪个 icon
  const modeIcon = computed(() => {
    const playModeVal = playMode.value
    return playModeVal === PLAY_MODE.sequence
      ? 'icon-sequence'
      : playModeVal === PLAY_MODE.random
      ? 'icon-random'
      : 'icon-loop'
  })

  // 修改图标样式
  function changeMode() {
    const playModeVal = playMode.value
    if (playModeVal === PLAY_MODE.sequence) {
      // 不能直接 commit,因为修改播放模式还要修改播放列表，比如随机播放要打乱列表
      store.dispatch('changeMode', PLAY_MODE.loop)
    } else if (playModeVal === PLAY_MODE.loop) {
      store.dispatch('changeMode', PLAY_MODE.random)
    } else {
      store.dispatch('changeMode', PLAY_MODE.sequence)
    }
  }

  return {
    modeIcon,
    changeMode
  }
}
