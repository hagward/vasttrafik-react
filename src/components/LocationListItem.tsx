import React from "react";
import { CoordLocation } from "../api";
import { Location } from "./Location";
import "./LocationListItem.css";

interface Props {
  location: CoordLocation;
  onClick(location: CoordLocation): any;
}

export const LocationListItem = ({ location, onClick }: Props) => {
  function handleClick(event: React.MouseEvent<HTMLElement>) {
    event.stopPropagation();
    onClick(location);
  }

  return (
    <li className="location-list-item" onClick={handleClick}>
      <Location name={location.name} />
    </li>
  );
};
