import React from "react";
import { ICoordLocation } from "../api";
import { Location } from "./Location";
import "./LocationListItem.css";

interface Props {
  location: ICoordLocation;
  onClick(location: ICoordLocation): any;
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
