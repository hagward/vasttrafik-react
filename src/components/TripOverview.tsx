import dayjs from "dayjs";
import React from "react";
import FontAwesome from "react-fontawesome";
import { Leg, Location, Trip } from "../api";
import { first, last, padNumber } from "../util";
import "./TripOverview.css";

interface Props {
  trip: Trip;
  onClick(): void;
}

export const TripOverview = ({ trip, onClick }: Props) => {
  const origin = first(trip.Leg).Origin;
  const destination = last(trip.Leg).Destination;

  function renderTime(location: Location, renderInfoIcon = false) {
    if (!location.rtTime) {
      return <span className="trip-overview__time">{location.time}</span>;
    }
    return [
      <span className="trip-overview__time" key={0}>
        {location.rtTime}
        {renderInfoIcon && (
          <FontAwesome className="right-icon" name="info-circle" />
        )}
      </span>,
      location.time !== location.rtTime && (
        <s className="trip-overview__time trip-overview__time--invalid" key={1}>
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
        className="trip-overview__leg"
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
    <div className="trip-overview" onClick={onClick}>
      <div className="trip-overview__origin">
        <div className="trip-overview__times">
          {renderTime(origin, showInfoIcon(origin))}
        </div>
        <div className="trip-overview__legs">{renderLegs()}</div>
      </div>
      <div className="trip-overview__arrow">
        <FontAwesome name="arrow-right" />
      </div>
      <div className="trip-overview__destination">
        <div className="trip-overview__times">{renderTime(destination)}</div>
        <div className="trip-overview__travel-time">
          Restid: {travelTime(origin, destination)}
        </div>
      </div>
    </div>
  );
};
