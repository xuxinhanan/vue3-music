import storage from 'good-storage'

function insertArray(arr, val, compare) {
  // 把compare逻辑分离成单独的纯函数
  const index = arr.findIndex(compare)
  // 已经存在则返回
  if (index > -1) {
    return
  }
  arr.unshift(val)
}

// 移除
function deleteFormArray(arr, compare) {
  const index = arr.findIndex(compare)
  // 存在才能移除
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function save(item, key, compare) {
  const items = storage.get(key, [])
  insertArray(items, item, compare)
  storage.set(key, items)
  return items
}

export function remove(key, compare) {
  const items = storage.get(key, [])
  deleteFormArray(items, compare)
  storage.set(key, items)
  return items
}

export function load(key) {
  return storage.get(key, [])
}
