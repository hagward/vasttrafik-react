import { DateTime } from 'luxon';

export default class Util {
  static list<T>(object: T): T[] {
    return Array.isArray(object) ? object : [object];
  }

  static first<T>(array: T[]): T {
    return array[0];
  }

  static last<T>(array: T[]): T {
    return array[array.length - 1];
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
}
