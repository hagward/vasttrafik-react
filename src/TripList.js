import React, { Component } from 'react';
import Trip from './Trip';
import './TripList.css';

export default class TripList extends Component {
  render() {
    return (
      <ul className="trip-list">
        {this.props.trips.map((trip, tripIndex) =>
          <li key={tripIndex} className="trip-list__trip">
            <Trip trip={trip} />
          </li>
        )}
      </ul>
    );
  }
}
