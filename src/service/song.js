import { get } from './base'

export function processSongs(songs) {
  if (!songs.length) {
    return Promise.resolve(songs)
  }

  return get('/api/getSongsUrl', {
    mid: songs.map(song => {
      return song.mid
    })
  }).then(result => {
    const map = result.map
    return songs
      .map(song => {
        song.url = map[song.mid]
        return song
      })
      .filter(song => {
        return song.url && song.url.indexOf('vkey') > -1
      })
  })
}

const lyricMap = {}

export function getLyric(song) {
  if (song.lyric) {
    return Promise.resolve(song.lyric)
  }
  // 对歌词数据进行缓存，下次使用时就不必再发送 http 请求，优化性能
  const mid = song.mid
  const lyric = lyricMap[mid]
  if (lyric) {
    return Promise.resolve(lyric)
  }

  return get('/api/getLyric', {
    mid
  }).then(result => {
    const lyric = result ? result.lyric : '[00:00:00]该歌曲暂时无法获取歌曲'
    lyricMap[mid] = lyric
    return lyric
  })
}
