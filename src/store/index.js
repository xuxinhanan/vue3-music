import { createStore, createLogger, storeKey } from 'vuex'
import state from './state'
import mutations from './mutations'
import * as getters from './getters'
import * as actions from './actions'
import { THEME_DARK } from '@/assets/js/constant'

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
  store.dispatch('setTheme', THEME_DARK)
}

export default store
