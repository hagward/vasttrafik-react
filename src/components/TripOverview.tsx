import { faArrowRight, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";
import dayjs from "dayjs";
import React from "react";
import { Leg, Location, Trip } from "../api";
import { first, last, padNumber } from "../util";
import styles from "./TripOverview.module.css";

interface Props {
  trip: Trip;
  onClick(): void;
}

export const TripOverview = ({ trip, onClick }: Props) => {
  const origin = first(trip.Leg).Origin;
  const destination = last(trip.Leg).Destination;

  function renderTime(location: Location, renderInfoIcon = false) {
    return [
      <span key={0}>
        {location.rtTime ?? location.time}
        {renderInfoIcon && (
          <FontAwesomeIcon
            className={classnames(styles.notesIcon, "right-icon")}
            icon={faInfoCircle}
          />
        )}
      </span>,
      location.rtTime && location.time !== location.rtTime && (
        <s className={classnames(styles.time, styles.invalid)} key={1}>
          {location.time}
        </s>
      )
    ];
  }

  function renderLegs() {
    return trip.Leg.filter(leg => leg.sname).map((leg, index) =>
      renderLeg(leg, index)
    );
  }

  function renderLeg(leg: Leg, index: number) {
    return (
      <span
        className={styles.leg}
        key={index}
        style={{
          backgroundColor: leg.fgColor,
          borderColor: leg.fgColor === "#ffffff" ? "#EE1844" : "transparent",
          color: leg.bgColor
        }}
      >
        {leg.sname}
      </span>
    );
  }

  function travelTime(start: Location, end: Location) {
    const startDate = dayjs(
      `${start.rtDate || start.date} ${start.rtTime || start.time}`
    );
    const endDate = dayjs(
      `${end.rtDate || end.date} ${end.rtTime || end.time}`
    );
    const hourDiff = endDate.diff(startDate, "hour");
    const minuteDiff = endDate.diff(startDate, "minute") % 60;
    return padNumber(hourDiff) + ":" + padNumber(minuteDiff);
  }

  function showInfoIcon() {
    return trip.Leg.some(leg => leg.Origin.Notes || leg.Destination.Notes);
  }

  return (
    <div className={styles.overview} onClick={onClick}>
      <div className={styles.origin}>
        <div className={styles.times}>{renderTime(origin, showInfoIcon())}</div>
        <div className={styles.legs}>{renderLegs()}</div>
      </div>
      <FontAwesomeIcon icon={faArrowRight} />
      <div className={styles.destination}>
        <div className={styles.times}>{renderTime(destination)}</div>
        <div className={styles.travelTime}>
          Restid: {travelTime(origin, destination)}
        </div>
      </div>
    </div>
  );
};
