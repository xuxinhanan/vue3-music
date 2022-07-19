<template>
  <scroll class="search-content" ref="scrollRef">
    <div>
      <div class="hot-keys">
        <h1 class="title">热门搜索</h1>
        <ul>
          <li
            class="item"
            v-for="item in hotKeys"
            :key="item.id"
            @click="addQuery(item.key)"
          >
            <span>{{ item.key }}</span>
          </li>
        </ul>
      </div>
      <div class="search-history" v-show="searchHistory.length">
        <h1 class="title">
          <span class="text">搜索历史</span>
          <span class="clear" @click="deleteAllSearch">
            <i class="icon-clear"></i>
          </span>
        </h1>
        <search-list
          :searches="searchHistory"
          @select="addQuery"
          @delete="deleteSearch"
        ></search-list>
      </div>
    </div>
  </scroll>
</template>

<script>
import { ref, computed, watch, nextTick } from 'vue'
import { getHotKeys } from '@/service/search'
import { useStore } from 'vuex'
import useSearchHistory from './use-search-history'
import Scroll from '@/components/base/scroll/scroll.vue'
import SearchList from '@/components/base/search-list/search-list.vue'

export default {
  name: 'search-content',
  components: {
    Scroll,
    SearchList
  },
  props: {
    query: String
  },
  emits: ['add-query'],
  setup(props, { emit }) {
    const hotKeys = ref([])
    const scrollRef = ref(null)

    const store = useStore()

    const searchHistory = computed(() => store.state.searchHistory)

    const { deleteSearch, deleteAllSearch } = useSearchHistory()

    getHotKeys().then(result => {
      hotKeys.value = result?.hotKeys
    })

    watch(
      () => props.query,
      async newQuery => {
        if (!newQuery) {
          await nextTick()
          refreshScroll()
        }
      }
    )

    function refreshScroll() {
      scrollRef.value.scroll.refresh()
    }

    function addQuery(string) {
      emit('add-query', string)
    }

    return {
      scrollRef,
      hotKeys,
      searchHistory,
      addQuery,
      deleteSearch,
      deleteAllSearch
    }
  }
}
</script>

<style lang="scss" scoped>
.search-content {
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
}
</style>
