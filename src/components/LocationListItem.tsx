import React from "react";
import { CoordLocation } from "../api";
import { Location } from "./Location";
import styles from "./LocationListItem.module.css";

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
    <li className={styles.item} onClick={handleClick}>
      <Location name={location.name} />
    </li>
  );
};
