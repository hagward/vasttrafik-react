import React from "react";
import { ITrip } from "../api";
import "./TripList.css";
import { TripListItem } from "./TripListItem";

interface Props {
  trips: ITrip[];
}

export const TripList = ({ trips }: Props) => {
  return (
    <ul className="trip-list">
      {trips.map((trip, tripIndex) => (
        <li key={tripIndex} className="trip-list__trip">
          <TripListItem trip={trip} />
        </li>
      ))}
    </ul>
  );
};
