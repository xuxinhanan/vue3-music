<template>
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
</template>

<script>
import { ref, watch, computed, nextTick } from 'vue'
import { search } from '@/service/search'
import { processSongs } from '@/service/song'
import usePullUpLoad from './use-pull-up-load'

export default {
  name: 'suggest',
  props: {
    query: String,
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  emits: ['select-song', 'select-singer'],
  setup(props, { emit }) {
    const singer = ref(null)
    const songs = ref([])
    const hasMore = ref(true)
    const page = ref(1)
    const loadingText = ref('')
    const noResultText = ref('抱歉，暂无搜索结果')
    // 手动填充一屏数据时的标志位
    const manualLoading = ref(false)

    const loading = computed(() => {
      return !singer.value && !songs.value.length
    })

    const noResult = computed(() => {
      return !singer.value && !songs.value.length && !hasMore.value
    })

    const pullUpLoading = computed(() => {
      return isPullUpLoad.value && hasMore.value
    })

    // 在手动填充一屏数据时或者正在loading时禁止上拉加载
    const preventPullUpLoad = computed(() => {
      return loading.value || manualLoading.value
    })

    const { isPullUpLoad, rootRef, scroll } = usePullUpLoad(
      searchMore,
      preventPullUpLoad
    )

    watch(
      () => props.query,
      async newQuery => {
        if (!newQuery) {
          return
        }
        await searchFirst()
      }
    )

    // 首次加载数据
    async function searchFirst() {
      if (!props.query) {
        return
      }
      // 重置状态
      page.value = 1
      songs.value = []
      singer.value = null
      hasMore.value = true

      const result = await search(props.query, page.value, props.showSinger)
      songs.value = await processSongs(result.songs)
      singer.value = result.singer
      hasMore.value = result.hasMore

      /**
       * 首屏数据检测是否满足一屏，不满足则searchMore加载更多数据；
       * 而searchMore又会检测是否满足一屏，不满足则继续加载数据，最终填充满一屏数据。
       *
       * 并且要等一个tick才能拿到最新的maxScrollY用来检测是否满足一屏
       */
      await nextTick()
      await makeItScrollable()
    }

    // 上拉加载更多数据
    async function searchMore() {
      if (!hasMore.value || !props.query) {
        return
      }
      page.value++
      const result = await search(props.query, page.value, props.showSinger)
      // 每次返回都是一屏的数据，需要将数据拼接起来
      songs.value = songs.value.concat(await processSongs(result.songs))
      hasMore.value = result.hasMore

      await nextTick()
      await makeItScrollable()
    }

    /**
     * 用户体验优化：
     * 后端数据处理过程中会过滤掉付费歌曲，这样就可能会导致前端拿到的数据不足一屏；
     * 因此，前端可以做的事是在数据不满足一屏的时候去请求下一屏数据，直到请求到的数据满足一屏为止
     * 因为不满足一屏，用户就以为没有数据了，于是就不会再上拉加载更多的数据
     */
    async function makeItScrollable() {
      if (scroll.value.maxScrollY >= -1) {
        manualLoading.value = true
        await searchMore()
        manualLoading.value = false
      }
    }

    // suggest组件只包含搜索结果逻辑，不做更多扩展，因此将点击跳转事件派发出去
    function selectSong(song) {
      emit('select-song', song)
    }

    function selectSinger(singer) {
      emit('select-singer', singer)
    }

    return {
      singer,
      songs,
      loadingText,
      noResultText,
      loading,
      noResult,
      pullUpLoading,
      selectSong,
      selectSinger,
      // pullUpLoad
      rootRef
    }
  }
}
</script>

<style lang="scss" scoped>
.suggest {
  height: 100%;
  overflow: hidden;
  .suggest-list {
    padding: 0 30px;
    .suggest-item {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
      .icon {
        flex: 0 0 30px;
        width: 30px;
        [class^='icon-'] {
          font-size: 14px;
          color: $color-text-d;
        }
      }
      .name {
        flex: 1;
        font-size: $font-size-medium;
        color: $color-text-d;
        overflow: hidden;
        .text {
          @include no-wrap();
        }
      }
    }
  }
}
</style>
