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

  static timeDiff(timeA: string, timeB: string): string {
    let timeASec = this.timeToSec(timeA);
    let timeBSec = this.timeToSec(timeB);

    // Handle midnight wraparound. We don't support several days yet.
    if (timeASec > timeBSec) {
      timeBSec += 24 * 60 * 60;
    }

    return this.secToTime(timeBSec - timeASec);
  }

  private static timeToSec(time: string): number {
    // HH:mm
    return time.split(':').reduce((acc, v) => acc * 60 + parseInt(v, 10), 0) * 60;
  }

  private static secToTime(seconds: number): string {
    let s = Math.floor(seconds / 60);
    const time = [];
    while (s > 0) {
      let unit = String(s % 60);
      if (unit.length === 1) {
        unit = '0' + unit;
      }
      time.unshift(unit);
      s = Math.floor(s / 60);
    }
    if (time.length === 1) {
      time.unshift('00');
    }
    return time.join(':');
  }
}
