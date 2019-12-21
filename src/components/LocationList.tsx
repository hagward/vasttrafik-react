import React from "react";
import { CoordLocation } from "../api";
import "./LocationList.css";
import { LocationListItem } from "./LocationListItem";

interface Props {
  locations: CoordLocation[];
  onSelect(location: CoordLocation): any;
}

export const LocationList = ({ locations, onSelect }: Props) => {
  return (
    <ul className="location-list">
      {locations.map(location => (
        <LocationListItem
          location={location}
          key={location.id || location.name}
          onClick={onSelect}
        />
      ))}
    </ul>
  );
};
