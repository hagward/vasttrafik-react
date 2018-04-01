import * as React from 'react';
import { Leg, Location, Trip } from '../Api';
import './TripDetails.css';

interface Props {
  trip: Trip;
}

export default class TripDetails extends React.Component<Props, any> {
  render() {
    return (
      <ul className="trip-details">
        {this.renderLegs()}
      </ul>
    );
  }

  private renderLegs() {
    return this.props.trip.Leg
      .filter(leg => leg.type !== 'WALK')
      .map((leg, index) => this.renderLeg(leg, index));
  }

  private renderLeg(leg: Leg, index: number) {
    return (
      <li className="trip-details__leg" key={index}>
        {this.renderLocation(leg.Origin)}
        <div className="trip-details__direction">{leg.name} mot {leg.direction}</div>
        {this.renderLocation(leg.Destination)}
      </li>
    );
  }

  private renderLocation(location: Location) {
    return (
      <div className="trip-details__location">
        <div className="location__time">{location.time}</div>
        <div className="location__name">{location.name}</div>
        <div className="location__track">{location.track && 'Läge ' + location.track}</div>
      </div>
    );
  }
}
