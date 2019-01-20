import * as React from "react";
import { useState } from "react";
import { ITrip } from "../api";
import TripDetails from "./TripDetails";
import "./TripListItem.css";
import TripOverview from "./TripOverview";

interface IProps {
  trip: ITrip;
}

export default function TripListItem({ trip }: IProps) {
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
}
