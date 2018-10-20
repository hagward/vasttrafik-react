import * as React from 'react';
import { ITrip } from '../Api';
import './TripList.css';
import TripListItem from './TripListItem';

interface IProps {
  trips: ITrip[];
}

export default class TripList extends React.PureComponent<IProps> {
  public render() {
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
