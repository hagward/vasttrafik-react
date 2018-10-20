import * as React from 'react';
import { ILeg, ILocation, ITrip } from '../api';
import './TripDetails.css';

interface IProps {
  trip: ITrip;
}

export default class TripDetails extends React.PureComponent<IProps> {
  public render() {
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

  private renderLeg(leg: ILeg, index: number) {
    return (
      <li className="trip-details__leg" key={index}>
        {this.renderLocation(leg.Origin)}
        <div className="trip-details__direction">{leg.name} mot {leg.direction}</div>
        {this.renderLocation(leg.Destination)}
      </li>
    );
  }

  private renderLocation(location: ILocation) {
    return (
      <div className="trip-details__location">
        <div className="location__time">{location.time}</div>
        <div className="location__name">{location.name}</div>
        <div className="location__track">{location.track && 'Läge ' + location.track}</div>
      </div>
    );
  }
}
