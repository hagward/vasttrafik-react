import * as React from 'react';
import { Location } from './LocationInput';
import LocationItem from './LocationItem';
import './LocationList.css';

interface Props {
  highlight: string;
  locations: Location[];
  onSelect(id: string, label: string): any;
}

export default class LocationList extends React.Component<Props, any> {
  render() {
    return (
      <ul className="location-list">
        {this.props.locations.map(location =>
          <LocationItem
            highlight={this.props.highlight}
            id={location.id}
            key={location.id}
            label={location.name}
            onClick={this.props.onSelect}
          />
        )}
      </ul>
    );
  }
}
