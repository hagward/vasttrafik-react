class LocalStorage {
  constructor() {
    this.storage = {};
  }

  getItem(key) {
    return window && window.localStorage ? window.localStorage.getItem(key) : this.storage[key];
  }

  setItem(key, value) {
    if (window && window.localStorage) {
      window.localStorage.setItem(key, value);
    } else {
      this.storage[key] = value;
    }
  }
}

export default LocalStorage;
