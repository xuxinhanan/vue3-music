/**
 * @description: 遍历数组，每次取[i, n-1]闭区间的一个随机数nums[rand]，交换nums[i]和nums[rand]即可
 */
export function shuffle(source) {
  const arr = source.slice()
  let n = arr.length
  for (let i = 0; i < n; i++) {
    const j = getRandomInt(i, n - 1)
    swap(arr, i, j)
  }
  return arr
}

function getRandomInt(n, m) {
  return Math.floor(Math.random() * (m - n + 1)) + n
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
