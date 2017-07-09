class LocalStorage {
  constructor(window) {
    this.storage = window && window.localStorage ? window.localStorage : {};
  }

  getItem(key) {
    return this.storage[key];
  }

  setItem(key, value) {
    this.storage[key] = value;
  }
}

export default LocalStorage;
