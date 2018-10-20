export default class Util {
  public static list<T>(object: T): T[] {
    if (!object) {
      return [];
    }
    return Array.isArray(object) ? object : [object];
  }

  public static first<T>(array: T[]): T {
    return array[0];
  }

  public static last<T>(array: T[]): T {
    return array[array.length - 1];
  }

  public static merge<T>(a: T[], b: T[], compare: (e1: T, e2: T) => number): T[] {
    const result = [];
    let i = 0;
    let j = 0;
    while (i < a.length && j < b.length) {
      result.push((compare(a[i], b[j]) <= 0) ? a[i++] : b[j++]);
    }
    while (i < a.length) {
      result.push(a[i++]);
    }
    while (j < b.length) {
      result.push(b[j++]);
    }
    return result;
  }

  public static removeDuplicates<T>(array: T[], id: (e: T) => string): T[] {
    const result: T[] = [];
    const set = new Set<string>();
    for (const item of array) {
      const itemId = id(item);
      if (!set.has(itemId)) {
        result.push(item);
      }
      set.add(itemId);
    }
    return result;
  }

  public static shortLocation(locationName: string): string {
    return locationName.split(',')[0];
  }

  public static padNumber(n: number): string {
    return n < 10 ? '0' + n : '' + n;
  }

  public static toDate(date: string, time: string): Date {
    return new Date(date + 'T' + time);
  }

  public static toDateAndTime(date: Date): { dateString: string, timeString: string } {
    const [dateString, timeString] = this.toDatetimeLocalString(date).split('T');
    return { dateString, timeString };
  }

  public static toDatetimeLocalString(date: Date): string {
    return date.toISOString().substr(0, 16);
  }

  public static debounce(fn: (...args: any[]) => any, wait: number, thisObject: any) {
    let timeoutId: number;
    const debouncedFunction = (...innerArgs: any[]) => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => fn.apply(thisObject, innerArgs), wait);
    };
    debouncedFunction.cancel = () => window.clearTimeout(timeoutId);
    return debouncedFunction;
  }
}
