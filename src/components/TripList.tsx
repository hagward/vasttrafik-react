import React from "react";
import { Trip } from "../api";
import "./TripList.css";
import { TripListItem } from "./TripListItem";

interface Props {
  trips: Trip[];
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
