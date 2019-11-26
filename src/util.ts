export function list<T>(object: T): T[] {
  if (!object) {
    return [];
  }
  return Array.isArray(object) ? object : [object];
}

export function first<T>(array: T[]): T {
  return array[0];
}

export function last<T>(array: T[]): T {
  return array[array.length - 1];
}

export function merge<T>(
  a: T[],
  b: T[],
  compare: (e1: T, e2: T) => number
): T[] {
  const result = [];
  let i = 0;
  let j = 0;
  while (i < a.length && j < b.length) {
    result.push(compare(a[i], b[j]) <= 0 ? a[i++] : b[j++]);
  }
  while (i < a.length) {
    result.push(a[i++]);
  }
  while (j < b.length) {
    result.push(b[j++]);
  }
  return result;
}

export function removeDuplicates<T>(array: T[], id: (e: T) => string): T[] {
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

export function shortLocation(locationName: string): string {
  return locationName.split(",")[0];
}

export function padNumber(n: number): string {
  return n < 10 ? "0" + n : "" + n;
}
