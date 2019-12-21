import classnames from "classnames";
import dayjs from "dayjs";
import React from "react";
import FontAwesome from "react-fontawesome";
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
    if (!location.rtTime) {
      return <span>{location.time}</span>;
    }

    return [
      <span key={0}>
        {location.rtTime}
        {renderInfoIcon && (
          <FontAwesome
            className={classnames(styles.timeIcon, "right-icon")}
            name="info-circle"
          />
        )}
      </span>,
      location.time !== location.rtTime && (
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

  function showInfoIcon(location: Location) {
    return location.Notes != null;
  }

  return (
    <div className={styles.overview} onClick={onClick}>
      <div className={styles.origin}>
        <div className={styles.times}>
          {renderTime(origin, showInfoIcon(origin))}
        </div>
        <div className={styles.legs}>{renderLegs()}</div>
      </div>
      <FontAwesome name="arrow-right" />
      <div className={styles.destination}>
        <div className={styles.times}>{renderTime(destination)}</div>
        <div className={styles.travelTime}>
          Restid: {travelTime(origin, destination)}
        </div>
      </div>
    </div>
  );
};
