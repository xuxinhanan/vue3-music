<template>
  <div class="header">
    <span class="icon"></span>
    <h1 class="text">Chicken Music</h1>
    <button @click="switchTheme">点击切换颜色</button>
  </div>
</template>

<script>
export default {
  name: 'header',

  methods: {
    switchTheme() {
      if (document.body.classList.contains('pink-theme')) {
        document.body.classList.remove('pink-theme')
      } else {
        document.body.classList.add('pink-theme')
      }
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
    @include bg-image("logo");
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
}
</style>
