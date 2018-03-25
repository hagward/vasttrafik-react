export interface Trip {
  Leg: Leg[];
}

export interface Leg {
  Origin: Location;
  Destination: Location;
  sname: string;
  fgColor: string;
  bgColor: string;
}

export interface Location {
  name: string;
  time: string;
}
