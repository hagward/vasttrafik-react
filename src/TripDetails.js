import React, { Component } from 'react';
import './TripDetails.css';

class TripDetails extends Component {
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

  renderLeg(leg, index) {
    if (index === this.props.trip.Leg.length - 1) {
      return this.renderLocation(leg.Destination);
    } else {
      return this.renderLocation(leg.Origin);
    }
  }

  renderLocation(location) {
    return (
      <span>{location.time} {location.name}</span>
    )
  }
}

export default TripDetails;
