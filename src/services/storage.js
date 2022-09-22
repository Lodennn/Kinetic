export const getLocalStoragae = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const setLocalStorage = (key, val) => {
  return localStorage.setItem(key, JSON.stringify(val));
};

export const clearLocalStorage = (key) => {
  return localStorage.clear(key);
};

export const removeLocalStorageItem = (key) => {
  return localStorage.removeItem(key);
};
