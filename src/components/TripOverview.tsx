import * as dayjs from "dayjs";
import * as React from "react";
import * as FontAwesome from "react-fontawesome";
import { ILeg, ILocation, ITrip } from "../api";
import { first, last, padNumber } from "../util";
import "./TripOverview.css";

interface IProps {
  trip: ITrip;
  onClick(): any;
}

export default function TripOverview({ trip, onClick }: IProps) {
  const origin = first(trip.Leg).Origin;
  const destination = last(trip.Leg).Destination;

  function renderTime(location: ILocation, renderInfoIcon = false) {
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

  function renderLeg(leg: ILeg, index: number) {
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

  function travelTime(start: ILocation, end: ILocation) {
    const startDate = dayjs(`${start.rtDate || start.date} ${start.rtTime || start.time}`);
    const endDate = dayjs(`${end.rtDate || end.date} ${end.rtTime || end.time}`);
    const hourDiff = endDate.diff(startDate, 'hour');
    const minuteDiff = endDate.diff(startDate, 'minute') % 60;
    return padNumber(hourDiff) + ":" + padNumber(minuteDiff);
  }

  function showInfoIcon(location: ILocation) {
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
}
