import * as React from 'react';
import { Trip } from '../Api';
import TripListItem from './TripListItem';
import './TripList.css';

interface Props {
  trips: Trip[];
}

export default class TripList extends React.PureComponent<Props, any> {
  render() {
    return (
      <ul className="trip-list">
        {this.props.trips.map((trip, tripIndex) =>
          <li key={tripIndex} className="trip-list__trip">
            <TripListItem trip={trip} />
          </li>
        )}
      </ul>
    );
  }
}
