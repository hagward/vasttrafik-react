import * as React from 'react';
import * as FontAwesome from 'react-fontawesome';
import { Trip, Leg, Location } from '../Api';
import Util from '../Util';
import './TripOverview.css';

interface Props {
  trip: Trip;
}

export default class TripOverview extends React.Component<Props, any> {
  render() {
    const origin = Util.first(this.props.trip.Leg).Origin;
    const destination = Util.last(this.props.trip.Leg).Destination;

    return (
      <div className="trip-overview">
        <div className="trip-overview__origin">
          <div className="trip-overview__times">{this.renderTime(origin)}</div>
          <div className="trip-overview__legs">{this.renderLegs()}</div>
        </div>
        <div className="trip-overview__arrow">
          <FontAwesome name="arrow-right" />
        </div>
        <div className="trip-overview__destination">
          <div className="trip-overview__times">{this.renderTime(destination)}</div>
          <div className="trip-overview__travel-time">Restid: {this.travelTime(origin, destination)}</div>
        </div>
      </div>
    );
  }

  private renderTime(location: Location) {
    return [
      <span className="trip-overview__time" key={0}>{location.rtTime}</span>,
        location.time !== location.rtTime &&
          <s className="trip-overview__time trip-overview__time--invalid" key={1}>{location.time}</s>,
    ];
  }

  private renderLegs() {
    return this.props.trip.Leg
      .filter(leg => leg.sname)
      .map((leg, index) => this.renderLeg(leg, index));
  }

  private renderLeg(leg: Leg, index: number) {
    return (
      <span
        className="trip-overview__leg"
        key={index}
        style={{
          backgroundColor: leg.fgColor,
          color: leg.bgColor,
          borderColor: leg.fgColor === '#ffffff' ? '#EE1844' : 'transparent'
        }}
      >
        {leg.sname}
      </span>
    );
  }

  private travelTime(start: Location, end: Location) {
    const startDateTime = Util.toDateTime(start.date, start.time);
    const endDateTime = Util.toDateTime(end.date, end.time);
    const duration = endDateTime.diff(startDateTime).shiftTo('hours', 'minutes');
    return Util.padNumber(duration.hours) + ':' + Util.padNumber(duration.minutes);
  }
}
