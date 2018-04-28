import * as React from 'react';
import { CoordLocation } from './LocationSearch';
import LocationListItem from './LocationListItem';
import './LocationList.css';

interface Props {
  locations: CoordLocation[];
  onSelect(location: CoordLocation): any;
}

export default class LocationList extends React.PureComponent<Props, any> {
  render() {
    return (
      <ul className="location-list">
        {this.props.locations.map(location =>
          <LocationListItem
            location={location}
            key={location.id || location.name}
            onClick={this.props.onSelect}
          />
        )}
      </ul>
    );
  }
}
