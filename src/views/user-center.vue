<template>
  <div class="user-center">
    <div class="back">
      <i class="icon-back"></i>
    </div>
    <div class="switches-wrapper">
      <switches
        :items="['我喜欢的', '最近播放']"
        v-model="currentIndex"
      ></switches>
    </div>
    <div class="play-btn">
      <i class="icon-play"></i>
      <span class="text">随机播放全部</span>
    </div>
    <div class="list-wrapper"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
