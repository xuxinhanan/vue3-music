export function shuffle(source) {
  const arr = source.slice()
  for (let i = 0; i < arr.length; i++) {
    const j = getRandomInt(i)
    swap(arr, i, j)
  }
  return arr
}

function getRandomInt(max) {
  return Math.floor(Math.random() * (max + 1))
}

function swap(arr, i, j) {
  const t = arr[i]
  arr[i] = arr[j]
  arr[j] = t
}

export function formatTime(interval) {
  interval = interval | 0
  const minute = (((interval / 60) | 0) + '').padStart(2, '0')
  const second = ((interval % 60) + '').padStart(2, '0')
  return `${minute}:${second}`
}

export function changeTheme(theme) {
  Object.entries(theme).forEach(ele => {
    document.body.style.setProperty(ele[0], ele[1])
  })
}

export function debounce(func, wait, immediate) {
  let timer
  let localImmediate = immediate

  return function () {
    const context = this
    const args = arguments

    if (localImmediate) {
      // 标记为，用于标记第一次是否立即执行
      localImmediate = false
      func.apply(context, args)
    }
    clearTimeout(timer)
    timer = setTimeout(function () {
      func.apply(context, args)
    }, wait)
  }
}
