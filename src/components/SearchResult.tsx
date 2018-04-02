import * as React from 'react';
import TripList from './TripList';
import { Trip } from '../Api';
import './SearchResult.css';

interface Props {
  trips: Trip[];
  onShowEarlier(): any;
  onShowLater(): any;
}

export default class SearchResult extends React.Component<Props, any> {
  render() {
    return (
      <div className="search-result">
        <TripList trips={this.props.trips} />
        <div className="search-result__earlier-later">
            <button className="earlier-later__button" onClick={this.props.onShowEarlier}>Tidigare</button>
            <button className="earlier-later__button" onClick={this.props.onShowLater}>Senare</button>
        </div>
      </div>
    );
  }
}
