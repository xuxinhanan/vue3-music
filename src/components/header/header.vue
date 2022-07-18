<template>
  <div class="header">
    <span class="icon"></span>
    <h1 class="text">Chicken Music</h1>
    <div class="theme">
      <span :class="styleIcon" @click="changeTheme"></span>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { THEME_LIGHT, THEME_DARK } from '@/assets/js/constant'

export default {
  name: 'header',
  setup() {
    const store = useStore()
    const themeType = computed(() => store.state.theme)
    const styleIcon = computed(() => {
      return themeType.value === THEME_DARK
        ? 'iconfont icon-heiyemoshi'
        : 'iconfont icon-baitian'
    })

    function changeTheme() {
      store.dispatch(
        'setTheme',
        themeType.value === THEME_DARK ? THEME_LIGHT : THEME_DARK
      )
    }

    return {
      changeTheme,
      styleIcon
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 44px;
  text-align: center;
  color: $color-theme;
  font-size: 0;
  .icon {
    display: inline-block;
    vertical-align: top; // 把元素的顶端与行中最高元素的顶端对齐
    margin-top: 6px;
    width: 30px;
    height: 32px;
    margin-right: 9;
    @include bg-image('logo');
    background-size: 30px 32px;
  }
  .text {
    display: inline-block;
    vertical-align: top;
    line-height: 44px;
    font-size: $font-size-large;
  }
  .mine {
    position: absolute;
    top: 0;
    right: 0;
    .icon-mine {
      display: block;
      padding: 12px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }
  .theme {
    position: absolute;
    top: 0; // 把元素的顶端与行中最高元素的顶端对齐
    right: 15px;
    .icon-baitian {
      display: block;
      padding: 12px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
    .icon-heiyemoshi {
      display: block;
      padding: 12px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }
}
</style>
