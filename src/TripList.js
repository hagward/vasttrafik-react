import React, { Component } from 'react';
import SearchResult from './SearchResult';
import './TripList.css';

class TripList extends Component {
  render() {
    return (
      <ul className="trip-list">
        {this.props.trips.map((trip, tripIndex) =>
          <li key={tripIndex} className="trip-list__trip">
            <SearchResult trip={trip} />
          </li>
        )}
      </ul>
    );
  }
}

export default TripList;
