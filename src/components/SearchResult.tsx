import * as React from 'react';
import * as FontAwesome from 'react-fontawesome';
import TripList from './TripList';
import { Trip } from '../Api';
import './SearchResult.css';

const Error = (props: { error: string }) => <div className="search-result__error">{props.error}</div>;

const Spinner = () => (
  <div className="search-result__spinner">
    <FontAwesome name="spinner" size="3x" spin={true} />
  </div>
);

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
  error: string;
  trips: Trip[];
  onShowEarlier(): any;
  onShowLater(): any;
}

export default class SearchResult extends React.PureComponent<Props, any> {
  render() {
    const props = this.props;
    return (
      <div className="search-result">
        {props.error && <Error error={props.error} />}
        {!props.error && props.trips.length === 0 && <Spinner />}
        {!props.error && props.trips.length > 0 && <TripListWithButtons {...props} />}
      </div>
    );
  }
}
