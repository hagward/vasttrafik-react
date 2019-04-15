import * as React from "react";
import { ITrip } from "../api";
import "./TripList.css";
import TripListItem from "./TripListItem";

interface IProps {
  trips: ITrip[];
}

export default function TripList({ trips }: IProps) {
  return (
    <ul className="trip-list">
      {trips.map((trip, tripIndex) => (
        <li key={tripIndex} className="trip-list__trip">
          <TripListItem trip={trip} />
        </li>
      ))}
    </ul>
  );
}
