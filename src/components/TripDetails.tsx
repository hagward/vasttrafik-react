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
        {this.props.trip.Leg.map((leg, legIndex) =>
          <li className="trip-details__leg" key={legIndex}>
            {this.renderLeg(leg, legIndex)}
          </li>
        )}
      </ul>
    );
  }

  renderLeg(leg: Leg, index: number) {
    if (index === this.props.trip.Leg.length - 1) {
      return this.renderLocation(leg.Destination);
    } else {
      return this.renderLocation(leg.Origin);
    }
  }

  renderLocation(location: Location) {
    return <span>{location.time} {location.name}</span>;
  }
}
