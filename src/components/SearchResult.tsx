import * as React from 'react';
import TripList from './TripList';
import { Trip } from '../Api';
import './SearchResult.css';

const TripListWithButtons = (props: Props) => (
  <div className="search-result__trips">
    <TripList trips={props.trips} />
    <div className="search-result__earlier-later">
      <button className="earlier-later__button" onClick={props.onShowEarlier}>Tidigare</button>
      <button className="earlier-later__button" onClick={props.onShowLater}>Senare</button>
    </div>
  </div>
);

interface Props {
  trips: Trip[];
  onShowEarlier(): any;
  onShowLater(): any;
}

export default class SearchResult extends React.PureComponent<Props> {
  render() {
    return (
      <div className="search-result">
        <TripListWithButtons {...this.props} />
      </div>
    );
  }
}
