export default class Mru {
  constructor(limit) {
    this.limit = limit;
    this.localStorage = window && window.localStorage ? window.localStorage : {};
  }

  add(item) {
    let mru = this.getMostRecentlyUsed();
    this.removeExistingItem(item, mru);
    mru.unshift(item);
    this.ensureLengthWithinLimit(mru);
    this.setMostRecentlyUsed(mru);
  }

  getMostRecentlyUsed() {
    return this.localStorage['mru'] ? JSON.parse(this.localStorage['mru']) : [];
  }

  setMostRecentlyUsed(mru) {
    this.localStorage['mru'] = JSON.stringify(mru);
  }

  removeExistingItem(item, mru) {
    const existingIndex = mru.findIndex(existingItem => existingItem.id === item.id);
    if (existingIndex > -1) {
      mru.splice(existingIndex, 1);
    }
  }

  ensureLengthWithinLimit(mru) {
    if (mru.length > this.limit) {
      mru.splice(this.limit, mru.length - this.limit);
    }
  }
}
