import React, { useState } from "react";
import { ITrip } from "../api";
import { TripDetails } from "./TripDetails";
import "./TripListItem.css";
import { TripOverview } from "./TripOverview";

interface Props {
  trip: ITrip;
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
