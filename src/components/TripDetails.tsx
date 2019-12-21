import React from "react";
import { ILeg, ILocation, ITrip } from "../api";
import "./TripDetails.css";

interface Props {
  trip: ITrip;
}

export const TripDetails = ({ trip }: Props) => {
  function renderLegs() {
    return trip.Leg.filter(leg => leg.type !== "WALK").map((leg, index) =>
      renderLeg(leg, index)
    );
  }

  function renderLeg(leg: ILeg, index: number) {
    return (
      <li className="trip-details__leg" key={index}>
        {renderLocation(leg.Origin)}
        <div className="trip-details__direction">
          {leg.name} mot {leg.direction}
        </div>
        {renderLocation(leg.Destination)}
      </li>
    );
  }

  function renderLocation(location: ILocation) {
    return (
      <div className="trip-details__location">
        <div className="location__overview">
          <div className="location__time">{location.time}</div>
          <div className="location__name">{location.name}</div>
          <div className="location__track">
            {location.track && "Läge " + location.track}
          </div>
        </div>
        {location.Notes && (
          <ul className="location__notes">
            {location.Notes.Note.map((note, index) => (
              <li key={index}>{note.$}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return <ul className="trip-details">{renderLegs()}</ul>;
};
