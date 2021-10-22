export const getStorageItem = (storage, itemName) => {
  const item = storage[itemName];
  if (typeof item !== 'undefined') {
    return item.indexOf('{') === -1 ? item : JSON.parse(item);
  }
};

export const setStorageItem = (storage, key: string, value) => {
  if (typeof value === 'object') {
    storage.setItem(key, JSON.stringify(value));
  } else {
    storage.setItem(key, value);
  }
};
