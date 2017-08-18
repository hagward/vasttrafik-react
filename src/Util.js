export default class Util {
  static list(object) {
    return Array.isArray(object) ? object : [object];
  }

  static first(array) {
    return array[0];
  }

  static last(array) {
    return array[array.length - 1];
  }

  static shortLocation(locationName) {
    return locationName.split(',')[0];
  }

  static timeDiff(timeA, timeB) {
    let timeASec = this.timeToSec(timeA);
    let timeBSec = this.timeToSec(timeB);

    // Handle midnight wraparound. We don't support several days yet.
    if (timeASec > timeBSec) {
      timeBSec += 24 * 60 * 60;
    }

    return this.secToTime(timeBSec - timeASec);
  }

  static timeToSec(time) {
    // HH:mm
    return time.split(':').reduce((acc, v) => acc * 60 + parseInt(v, 10), 0) * 60;
  }

  static secToTime(seconds) {
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
