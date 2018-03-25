import * as React from 'react';
import { Trip } from '../Api';
import TripItem from './TripItem';
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
