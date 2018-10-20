interface Item {
  id: string;
  name: string;
}

export default class MruCache<T extends Item> {
  private items: T[];
  private limit: number;

  constructor(limit: number) {
    this.limit = limit;

    const mru = localStorage.getItem('mru');
    this.items = mru ? JSON.parse(mru) : [];
  }

  public add(item: T): void {
    this.removeExistingItem(item);
    this.items.unshift(item);
    this.ensureLengthWithinLimit();
    this.setMostRecentlyUsed();
  }

  public getMostRecentlyUsed(): T[] {
    return this.items;
  }

  public setMostRecentlyUsed(): void {
    localStorage.setItem('mru', JSON.stringify(this.items));
  }

  public getFirstMatch(searchString: string): T | undefined {
    return this.items.find(item => item.name.toLowerCase().startsWith(searchString.toLowerCase()));
  }

  private removeExistingItem(item: T): void {
    const existingIndex = this.items.findIndex(existingItem => existingItem.id === item.id);
    if (existingIndex > -1) {
      this.items.splice(existingIndex, 1);
    }
  }

  private ensureLengthWithinLimit(): void {
    if (this.items.length > this.limit) {
      this.items.splice(this.limit, this.items.length - this.limit);
    }
  }
}
