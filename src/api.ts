import dayjs from "dayjs";
import Auth from "./Auth";
import { CoordLocation } from "./features/search/searchSlice";
import settings from "./settings";

const auth = new Auth(settings.key, settings.secret);

export async function searchLocation(searchString: string) {
  const token = await auth.getToken();
  const url =
    "https://api.vasttrafik.se/bin/rest.exe/v2/location.name" +
    "?format=json&input=" +
    encodeURIComponent(searchString);

  const response = await fetch(url, {
    headers: new Headers({ Authorization: "Bearer " + token }),
    method: "GET",
  });
  return response.json();
}

export async function getTrips(
  origin: CoordLocation,
  dest: CoordLocation,
  date: Date
) {
  const token = await auth.getToken();
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
    method: "GET",
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
