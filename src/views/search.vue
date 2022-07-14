<template>
  <div class="search">
    <div class="search-input-wrapper">
      <search-input v-model="query"></search-input>
    </div>
    <searchContent v-show="!query" @add-query="addQuery"></searchContent>
    <div class="search-result" v-show="query">
      <suggest
        :query="query"
        @select-song="selectSong"
        @select-singer="selectSinger"
      ></suggest>
    </div>
    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :data="selectedSinger" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import SearchInput from '@/components/search/search-input.vue'
import Suggest from '@/components/search/suggest.vue'
import SearchList from '@/components/base/search-list/search-list.vue'
import Scroll from '@/components/base/scroll/scroll.vue'
import SearchContent from '@/components/search/search-content.vue'
import { ref, computed } from 'vue'
import { getHotKeys } from '@/service/search'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import storage from 'good-storage'
import { SINGER_KEY } from '@/assets/js/constant'
import useSearchHistory from '@/components/search/use-search-history'

export default {
  name: 'search',
  components: {
    SearchInput,
    Suggest,
    SearchList,
    Scroll,
    SearchContent
  },
  setup() {
    const query = ref('')
    const hotKeys = ref([])
    const selectedSinger = ref(null)

    const store = useStore()
    const searchHistory = computed(() => store.state.searchHistory)

    const router = useRouter()

    const { saveSearch, deleteSearch } = useSearchHistory()

    getHotKeys().then((result) => {
      hotKeys.value = result?.hotKeys
    })

    function addQuery(string) {
      query.value = string
    }

    function selectSong(song) {
      saveSearch(query.value)
      store.dispatch('addSong', song)
    }

    function selectSinger(singer) {
      saveSearch(query.value)
      selectedSinger.value = singer
      cacheSinger(singer)

      router.push({
        path: `/search/${singer.mid}`
      })
    }

    function cacheSinger(singer) {
      storage.session.set(SINGER_KEY, singer)
    }

    return {
      query,
      hotKeys,
      selectedSinger,
      searchHistory,
      deleteSearch,
      addQuery,
      selectSong,
      selectSinger
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  display: flex;
  flex-direction: column;
  .search-input-wrapper {
    margin: 20px;
  }
  /* .search-content {
    flex: 1;
    overflow: hidden;
    .hot-keys {
      margin: 0 20px 20px 20px;
      .title {
        margin-bottom: 20px;
        font-size: $font-size-medium;
        color: $color-text-l;
      }
      .item {
        display: inline-block;
        padding: 5px 10px;
        margin: 0 20px 10px 0;
        border-radius: 6px;
        background: $color-highlight-background;
        font-size: $font-size-medium;
        color: $color-text-d;
      }
    }
    .search-history {
      position: relative;
      margin: 0 20px;
      .title {
        display: flex;
        align-items: center;
        height: 40px;
        font-size: $font-size-medium;
        color: $color-text-l;
        .text {
          flex: 1;
        }
        .clear {
          @include extend-click();
          .icon-clear {
            font-size: $font-size-medium;
            color: $color-text-d;
          }
        }
      }
    }
  } */
  .search-result {
    flex: 1;
    overflow: hidden;
  }
}
</style>
