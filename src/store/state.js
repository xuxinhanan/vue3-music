import {
  PLAY_MODE,
  FAVORITE_KEY,
  SEARCH_KEY,
  THEME_KEY
} from '@/assets/js/constant'
import { load } from '@/assets/js/array-store'

const state = {
  sequenceList: [], // 顺序列表
  playlist: [], // 播放列表，可能乱序，所以和上一个区分
  playing: false, // 正在播放
  playMode: PLAY_MODE.sequence, // 播放模式
  currentIndex: 0, // 当前播放
  fullScreen: false, // 全屏
  favoriteList: load(FAVORITE_KEY),
  searchHistory: load(SEARCH_KEY),
  theme: load(THEME_KEY)
}

export default state
