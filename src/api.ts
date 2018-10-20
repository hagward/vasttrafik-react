import { toDateAndTime } from './util';

export interface ITrip {
  Leg: ILeg[];
}

export interface ILeg {
  Origin: ILocation;
  Destination: ILocation;
  direction: string;
  name: string;
  sname: string;
  fgColor: string;
  bgColor: string;
  type: string;
}

export interface ILocation {
  date: string;
  name: string;
  rtDate?: string;
  rtTime?: string;
  time: string;
  track?: string;
}

export interface ICoordLocation {
  id?: string;
  idx?: string;
  lat?: string;
  lon?: string;
  name: string;
}

export interface IStopLocation extends ICoordLocation {
  id: string;
}

export async function searchLocation(token: string, searchString: string) {
  const url = 'https://api.vasttrafik.se/bin/rest.exe/v2/location.name' +
    '?format=json&input=' + encodeURIComponent(searchString);

  const response = await fetch(url, {
    headers: new Headers({ 'Authorization': 'Bearer ' + token }),
    method: 'GET',
  });
  return response.json();
}

export async function searchTrip(token: string, origin: ICoordLocation, dest: ICoordLocation, date: Date) {
  const { dateString, timeString } = toDateAndTime(date);
  const url = 'https://api.vasttrafik.se/bin/rest.exe/v2/trip?format=json' +
    getLocationParameter('origin', origin) +
    getLocationParameter('dest', dest) +
    '&date=' + encodeURIComponent(dateString) +
    '&time=' + encodeURIComponent(timeString);

    const response = await fetch(url, {
      headers: new Headers({'Authorization': 'Bearer ' + token}),
      method: 'GET',
    });
    return response.json();
}

function getLocationParameter(inputName: string, location: ICoordLocation): string {
  if (location.id) {
    return '&' + inputName + 'Id=' + encodeURIComponent(location.id);
  } else if (location.lat && location.lon) {
    return '&' + inputName + 'CoordName=' + encodeURIComponent(location.name) +
            '&' + inputName + 'CoordLat=' + encodeURIComponent(location.lat) +
            '&' + inputName + 'CoordLong=' + encodeURIComponent(location.lon);
  } else {
    return '';
  }
}
