import React from "react";
import { Leg, Location, Trip } from "../api";
import styles from "./TripDetails.module.css";

interface Props {
  trip: Trip;
}

export const TripDetails = ({ trip }: Props) => {
  function renderLegs() {
    return trip.Leg.filter(leg => leg.type !== "WALK").map((leg, index) =>
      renderLeg(leg, index)
    );
  }

  function renderLeg(leg: Leg, index: number) {
    return (
      <li className={styles.leg} key={index}>
        {renderLocation(leg.Origin)}
        <div className={styles.direction}>
          {leg.name} mot {leg.direction}
        </div>
        {renderLocation(leg.Destination)}
      </li>
    );
  }

  function renderLocation(location: Location) {
    return (
      <div className={styles.location}>
        <div className={styles.overview}>
          <div className={styles.time}>{location.time}</div>
          <div className={styles.name}>{location.name}</div>
          <div className={styles.track}>
            {location.track && "Läge " + location.track}
          </div>
        </div>
        {location.Notes && (
          <ul className={styles.notes}>
            {location.Notes.Note.map((note, index) => (
              <li key={index}>{note.$}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return <ul className={styles.legs}>{renderLegs()}</ul>;
};
