import React from "react";
import { CoordLocation } from "../features/trips/tripsSlice";
import styles from "./LocationList.module.css";
import { LocationListItem } from "./LocationListItem";

interface Props {
  locations: CoordLocation[];
  onSelect(location: CoordLocation): any;
}

export const LocationList = ({ locations, onSelect }: Props) => {
  return (
    <ul className={styles.list}>
      {locations.map((location) => (
        <LocationListItem
          location={location}
          key={location.id || location.name}
          onClick={onSelect}
        />
      ))}
    </ul>
  );
};
