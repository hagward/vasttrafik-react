import React from "react";
import { Trip } from "../api";
import styles from "./TripList.module.css";
import { TripListItem } from "./TripListItem";

interface Props {
  trips: Trip[];
}

export const TripList = ({ trips }: Props) => {
  return (
    <ul className={styles.list}>
      {trips.map((trip, tripIndex) => (
        <li key={tripIndex}>
          <TripListItem trip={trip} />
        </li>
      ))}
    </ul>
  );
};
