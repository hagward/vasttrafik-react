import { DateTime } from 'luxon';

export default class Util {
  static list<T>(object: T): T[] {
    if (!object) {
      return [];
    }
    return Array.isArray(object) ? object : [object];
  }

  static first<T>(array: T[]): T {
    return array[0];
  }

  static last<T>(array: T[]): T {
    return array[array.length - 1];
  }

  static merge<T>(a: T[], b: T[], compare: (e1: T, e2: T) => number): T[] {
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

  static shortLocation(locationName: string): string {
    return locationName.split(',')[0];
  }

  static padNumber(n: number): string {
    return n < 10 ? '0' + n : '' + n;
  }

  static toDateTime(date: string, time: string): DateTime {
    return DateTime.fromISO(date + 'T' + time, {locale: 'sv-SE'});
  }

  static debounce(fn: (...args: any[]) => any, wait: number, thisObject: any) {
    let timeoutId: number;
    const debouncedFunction = (..._args: any[]) => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => fn.apply(thisObject, _args), wait);
    };
    debouncedFunction.cancel = () => window.clearTimeout(timeoutId);
    return debouncedFunction;
  }
}
