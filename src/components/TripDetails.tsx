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
        {this.props.trip.Leg.map((leg, legIndex) => this.renderLeg(leg, legIndex))}
      </ul>
    );
  }

  renderLeg(leg: Leg, index: number) {
    return (
      <li className="trip-details__leg" key={index}>
        {this.renderLocation(leg.Origin)}
        {this.renderLocation(leg.Destination)}
      </li>
    );
  }

  renderLocation(location: Location) {
    return <div className="leg__part">{location.time} {location.name}</div>;
  }
}
