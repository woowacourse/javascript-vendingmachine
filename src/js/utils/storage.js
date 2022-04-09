const storeFactory = (storage) => ({
  get(key) {
    return JSON.parse(storage.getItem(key));
  },
  set(key, value) {
    storage.setItem(key, JSON.stringify(value));
  },
  remove(key) {
    storage.removeItem(key);
  },
});

export const localStore = storeFactory(localStorage);
export const sessionStore = storeFactory(sessionStorage);
