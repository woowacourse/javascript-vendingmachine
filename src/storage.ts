const storage = {
  setLocalStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  getLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key));
  },
};

export default storage;
