export interface Trip {
  Leg: Leg[];
}

export interface Leg {
  Origin: Location;
  Destination: Location;
  sname: string;
  fgColor: string;
  bgColor: string;
  type: string;
}

export interface Location {
  date: string;
  name: string;
  rtDate?: string;
  rtTime?: string;
  time: string;
}
