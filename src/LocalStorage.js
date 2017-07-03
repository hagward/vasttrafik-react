class LocalStorage {
  static getItem(key) {
    return window && window.localStorage ? window.localStorage.getItem(key) : undefined;
  }

  static setItem(key, value) {
    if (window && window.localStorage) {
      window.localStorage.setItem(key, value);
    }
  }
}

export default LocalStorage;
