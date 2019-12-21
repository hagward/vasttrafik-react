import dayjs from "dayjs";

export interface Trip {
  Leg: Leg[];
}

export interface Leg {
  Origin: Location;
  Destination: Location;
  direction: string;
  name: string;
  sname: string;
  fgColor: string;
  bgColor: string;
  type: string;
}

export interface Location {
  date: string;
  name: string;
  Notes?: { Note: Note[] };
  rtDate?: string;
  rtTime?: string;
  time: string;
  track?: string;
}

interface Note {
  $: string;
  key: string;
  priority: string;
  severity: string;
}

export interface CoordLocation {
  id?: string;
  idx?: string;
  lat?: string;
  lon?: string;
  name: string;
}

export interface StopLocation extends CoordLocation {
  id: string;
}

export async function searchLocation(token: string, searchString: string) {
  const url =
    "https://api.vasttrafik.se/bin/rest.exe/v2/location.name" +
    "?format=json&input=" +
    encodeURIComponent(searchString);

  const response = await fetch(url, {
    headers: new Headers({ Authorization: "Bearer " + token }),
    method: "GET"
  });
  return response.json();
}

export async function searchTrip(
  token: string,
  origin: CoordLocation,
  dest: CoordLocation,
  date: Date
) {
  const dateString = dayjs(date).format("YYYY-MM-DD");
  const timeString = dayjs(date).format("HH:mm");
  const url =
    "https://api.vasttrafik.se/bin/rest.exe/v2/trip?format=json" +
    getLocationParameter("origin", origin) +
    getLocationParameter("dest", dest) +
    "&date=" +
    encodeURIComponent(dateString) +
    "&time=" +
    encodeURIComponent(timeString);

  const response = await fetch(url, {
    headers: new Headers({ Authorization: "Bearer " + token }),
    method: "GET"
  });
  return response.json();
}

function getLocationParameter(
  inputName: string,
  location: CoordLocation
): string {
  if (location.id) {
    return "&" + inputName + "Id=" + encodeURIComponent(location.id);
  } else if (location.lat && location.lon) {
    return (
      "&" +
      inputName +
      "CoordName=" +
      encodeURIComponent(location.name) +
      "&" +
      inputName +
      "CoordLat=" +
      encodeURIComponent(location.lat) +
      "&" +
      inputName +
      "CoordLong=" +
      encodeURIComponent(location.lon)
    );
  } else {
    return "";
  }
}
