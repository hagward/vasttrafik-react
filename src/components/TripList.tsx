import * as React from 'react';
import TripItem from './TripItem';
import { Trip } from './App';
import './TripList.css';

interface Props {
  trips: Trip[];
}

export default class TripList extends React.Component<Props, any> {
  render() {
    return (
      <ul className="trip-list">
        {this.props.trips.map((trip, tripIndex) =>
          <li key={tripIndex} className="trip-list__trip">
            <TripItem trip={trip} />
          </li>
        )}
      </ul>
    );
  }
}
