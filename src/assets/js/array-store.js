import storage from "good-storage";

function insertArray(arr, val, compare) {
  const index = arr.findIndex(compare);
  if (index > -1) {
    return;
  }
  arr.unshift(val);
}

function deleteFormArray(arr, compare) {
  const index = arr.findIndex(compare);
  if (index > -1) {
    arr.splice(index, 1);
  }
}

export function save(item, key, compare) {
  const items = storage.get(key, []);
  insertArray(items, item, compare);
  storage.set(key, items);
  return items;
}

export function remove(key, compare) {
  const items = storage.get(key, []);
  deleteFormArray(items, compare);
  storage.set(key, items);
  return items;
}
