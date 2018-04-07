import * as React from 'react';
import Location from './Location';
import './LocationListItem.css';

interface Props {
  highlight: string;
  id: string;
  label: string;
  onClick(id: string, name: string): any;
}

export default class LocationListItem extends React.Component<Props, any> {
  render() {
    return (
      <li className="location-list-item" key={this.props.id} onClick={this.handleClick}>
        <Location name={this.props.label} />
      </li>
    );
  }

  private handleClick = () => {
    this.props.onClick(this.props.id, this.props.label);
  }
}
