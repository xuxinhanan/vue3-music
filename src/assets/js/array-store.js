import storage from 'good-storage'

/**
 * @description: 新增内容
 * @param {*} value key对应的存储内容value
 * @param {*} item 需要新增的内容
 * @param {*} compare findIndex的回调，把匹配逻辑抽离出来方便复用
 */
function insertArray(value, item, compare) {
  const index = value.findIndex(compare)
  if (index > -1) {
    value.splice(index, 1)
  }
  value.unshift(item)
}

/**
 * @description: 移除内容
 * @param {*} value key对应的存储内容value
 * @param {*} compare findIndex的回调，把匹配逻辑抽离出来方便复用
 */
function deleteFormArray(value, compare) {
  const index = value.findIndex(compare)
  if (index > -1) {
    value.splice(index, 1)
  }
}

/**
 * @description: 本地存储 API，存储形式为 key-value
 * @param {*} item 存储内容
 * @param {*} key 存储关键key
 * @param {*} compare findIndex的回调，用于匹配存储内容
 * @return {*} 返回值为存储内容
 */
export function save(item, key, compare) {
  const value = storage.get(key, [])
  insertArray(value, item, compare)
  storage.set(key, value)
  return value
}

/**
 * @description: 移除本地存储某个item的API
 * @param {*} key 存储关键key
 * @param {*} compare findIndex的回调，用于匹配存储内容
 * @return {*} 返回值为存储内容
 */
export function remove(key, compare) {
  const value = storage.get(key, [])
  deleteFormArray(value, compare)
  storage.set(key, value)
  return value
}

/**
 * @description: 清空存储API
 * @param {*} key 需要清空的关键key
 * @return {*} 空数组
 */
export function clear(key) {
  storage.remove(key)
  return []
}

/**
 * @description: 加载本地存储内容的API
 * @param {*} key 存储的key
 * @return {*} 本地存储内容
 */
export function load(key) {
  return storage.get(key, [])
}

export function loadTheme(key) {
  return storage.get(key, [])[0]
}
