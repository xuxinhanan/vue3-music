import { createStore, createLogger, storeKey } from 'vuex'
import state from './state'
import mutations from './mutations'
import * as getters from './getters'
import * as actions from './actions'
import { loadTheme } from '@/assets/js/array-store'
import { THEME_KEY } from '@/assets/js/constant'

const debug = process.env.NODE_ENV !== 'production'

const store = createStore({
  state,
  getters,
  mutations,
  actions,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})

export function setupStore() {
  store.dispatch('setTheme', loadTheme(THEME_KEY))
}

export default store
