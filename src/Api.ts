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
