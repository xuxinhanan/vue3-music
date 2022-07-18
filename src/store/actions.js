import { PLAY_MODE } from '@/assets/js/constant'
import { THEME_LIGHT, THEME_DARK, LIGHT, DARK } from '@/assets/js/constant'
import { shuffle, changeTheme } from '@/assets/js/util'

export function selectPlay({ commit, state }, { list, index }) {
  commit('setPlayMode', PLAY_MODE.sequence)
  commit('setSequenceList', list)
  commit('setPlayingState', true)
  commit('setFullScreen', true)
  commit('setPlaylist', list)
  commit('setCurrentIndex', index)
}

export function randomPlay({ commit }, list) {
  commit('setPlayMode', PLAY_MODE.random)
  commit('setSequenceList', list)
  commit('setPlayingState', true)
  commit('setFullScreen', true)
  commit('setPlaylist', shuffle(list))
  commit('setCurrentIndex', 0)
}

export function changeMode({ commit, state, getters }, mode) {
  const currentId = getters.currentSong.id
  if (mode === PLAY_MODE.random) {
    commit('setPlaylist', shuffle(state.sequenceList))
  } else {
    commit('setPlaylist', state.sequenceList)
  }
  const index = state.playlist.findIndex(song => {
    return song.id === currentId
  })
  commit('setCurrentIndex', index)
  commit('setPlayMode', mode)
}

export function addSong({ commit, state }, song) {
  const playlist = state.playlist.slice()
  const sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex

  const playIndex = findIndex(playlist, song)
  // 如果已经存在播放列表中，只需修改到当前播放即可
  if (playIndex > -1) {
    currentIndex = playIndex
  } else {
    // 否则添加歌曲
    playlist.push(song)
    currentIndex = playlist.length - 1
  }

  const sequenceIndex = findIndex(sequenceList, song)
  if (sequenceIndex === -1) {
    sequenceList.push(song)
  }

  commit('setSequenceList', sequenceList)
  commit('setPlaylist', playlist)
  commit('setCurrentIndex', currentIndex)
  commit('setPlayingState', true)
  commit('setFullScreen', true)
}

export function setTheme({ commit }, themeType) {
  switch (themeType) {
    case THEME_LIGHT:
      changeTheme(LIGHT)
      break
    case THEME_DARK:
      changeTheme(DARK)
      break
  }
  commit('setTheme', themeType)
}

function findIndex(list, song) {
  return list.findIndex(item => {
    return item.id === song.id
  })
}
