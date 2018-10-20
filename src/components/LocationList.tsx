import * as React from 'react';
import './LocationList.css';
import LocationListItem from './LocationListItem';
import { ICoordLocation } from './LocationSearch';

interface IProps {
  locations: ICoordLocation[];
  onSelect(location: ICoordLocation): any;
}

export default class LocationList extends React.PureComponent<IProps> {
  public render() {
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
