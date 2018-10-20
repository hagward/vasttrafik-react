import * as React from 'react';
import { ICoordLocation } from '../Api';
import Location from './Location';
import './LocationListItem.css';

interface IProps {
  location: ICoordLocation;
  onClick(location: ICoordLocation): any;
}

export default class LocationListItem extends React.PureComponent<IProps> {
  public render() {
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
