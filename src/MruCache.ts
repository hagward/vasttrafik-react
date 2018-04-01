interface Item {
  id: string;
}

export default class MruCache<T extends Item> {
  private limit: number;

  constructor(limit: number) {
    this.limit = limit;
  }

  add(item: T): void {
    let mru = this.getMostRecentlyUsed();
    this.removeExistingItem(item, mru);
    mru.unshift(item);
    this.ensureLengthWithinLimit(mru);
    this.setMostRecentlyUsed(mru);
  }

  getMostRecentlyUsed(): T[] {
    const mru = localStorage.getItem('mru');
    return mru ? JSON.parse(mru) : [];
  }

  setMostRecentlyUsed(mru: T[]): void {
    localStorage.setItem('mru', JSON.stringify(mru));
  }

  private removeExistingItem(item: T, mru: T[]): void {
    const existingIndex = mru.findIndex(existingItem => existingItem.id === item.id);
    if (existingIndex > -1) {
      mru.splice(existingIndex, 1);
    }
  }

  private ensureLengthWithinLimit(mru: T[]): void {
    if (mru.length > this.limit) {
      mru.splice(this.limit, mru.length - this.limit);
    }
  }
}
