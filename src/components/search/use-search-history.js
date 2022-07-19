import { save, remove, clear } from '@/assets/js/array-store'
import { SEARCH_KEY } from '@/assets/js/constant'
import { useStore } from 'vuex'

/**
 * @description: 封装save、delete搜索内容操作的Hooks
 * @return {*} 对应操作的API
 */
export default function useSearchHistory() {
  const store = useStore()

  /**
   * @description: 存储当前query字段，即搜索历史，本地以及vuex都要存储
   * @param {*} query 搜索框query字段
   */
  function saveSearch(query) {
    const searches = save(query, SEARCH_KEY, item => item === query)
    store.commit('setSearchHistory', searches)
  }

  /**
   * @description: 删除当前query字段，即搜索历史，本地以及vuex都要删除
   * @param {*} query 搜索框query字段
   */
  function deleteSearch(query) {
    const searches = remove(SEARCH_KEY, item => item === query)
    store.commit('setSearchHistory', searches)
  }

  function deleteAllSearch() {
    const searches = clear(SEARCH_KEY)
    store.commit('setSearchHistory', searches)
  }

  return {
    saveSearch,
    deleteSearch,
    deleteAllSearch
  }
}
