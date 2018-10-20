import * as React from 'react';
import { ITrip } from '../api';
import './SearchResult.css';
import TripList from './TripList';

const TripListWithButtons = (props: IProps) => (
  <div className="search-result__trips">
    <TripList trips={props.trips} />
    <div className="search-result__earlier-later">
      <button className="earlier-later__button" onClick={props.onShowEarlier}>Tidigare</button>
      <button className="earlier-later__button" onClick={props.onShowLater}>Senare</button>
    </div>
  </div>
);

interface IProps {
  trips: ITrip[];
  onShowEarlier(): any;
  onShowLater(): any;
}

export default class SearchResult extends React.PureComponent<IProps> {
  public render() {
    return (
      <div className="search-result">
        <TripListWithButtons {...this.props} />
      </div>
    );
  }
}
