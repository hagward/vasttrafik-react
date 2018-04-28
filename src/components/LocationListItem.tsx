import * as React from 'react';
import Location from './Location';
import { CoordLocation } from './LocationSearch';
import './LocationListItem.css';

interface Props {
  location: CoordLocation;
  onClick(location: CoordLocation): any;
}

export default class LocationListItem extends React.PureComponent<Props, any> {
  render() {
    return (
      <li className="location-list-item" onClick={this.handleClick}>
        <Location name={this.props.location.name} />
      </li>
    );
  }

  private handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    this.props.onClick(this.props.location);
  }
}
