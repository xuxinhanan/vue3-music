<template>
  <div class="search-result">
    <div
      ref="rootRef"
      class="suggest"
      v-loading:[loadingText]="loading"
      v-no-result:[noResultText]="noResult"
    >
      <ul class="suggest-list">
        <li class="suggest-item" v-if="singer" @click="selectSinger(singer)">
          <div class="icon">
            <i class="icon-mine"></i>
          </div>
          <div class="name">
            <p class="text">{{ singer.name }}</p>
          </div>
        </li>
        <li
          class="suggest-item"
          v-for="song in songs"
          :key="song.id"
          @click="selectSong(song)"
        >
          <div class="icon">
            <i class="icon-music"></i>
          </div>
          <div class="name">
            <p class="text">{{ song.singer }}-{{ song.name }}</p>
          </div>
        </li>
        <div class="suggest-item" v-loading:[loadingText]="pullUpLoading"></div>
      </ul>
    </div>
  </div>
</template>

<script>
import Suggest from '@/components/search/suggest.vue'
import { ref } from 'vue'

export default {
  name: 'search-result',
  components: {
    Suggest
  },
  emits: ['select-song', 'select-singer'],
  setup(props, { emit }) {
    const singer = ref(null)
    const songs = ref(null)

    return {}
  }
}
</script>

<style lang="scss" scoped></style>
