import React, { useState } from "react";
import { Trip } from "../api";
import { TripDetails } from "./TripDetails";
import "./TripListItem.css";
import { TripOverview } from "./TripOverview";

interface Props {
  trip: Trip;
}

export const TripListItem = ({ trip }: Props) => {
  const [expanded, setExpanded] = useState(false);

  function handleClick() {
    setExpanded(!expanded);
  }

  return (
    <div className="trip-list-item">
      <TripOverview trip={trip} onClick={handleClick} />
      {expanded && <TripDetails trip={trip} />}
    </div>
  );
};
