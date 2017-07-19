import React, { Component } from 'react';
import './TripDetails.css';

class TripDetails extends Component {
  render() {
    return (
      <ul className="trip-details">
        {this.props.trip.Leg.map((leg, legIndex) =>
          <li className="trip-details__leg" key={legIndex}>
            {legIndex !== this.props.trip.Leg.length-1 &&
              this.renderLocation(leg.Origin)
            }
            {legIndex === this.props.trip.Leg.length-1 &&
              this.renderLocation(leg.Destination)
            }
          </li>
        )}
      </ul>
    );
  }

  renderLocation(location) {
    return (
      <span>{location.time} {location.name}</span>
    )
  }
}

export default TripDetails;
