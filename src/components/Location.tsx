import * as React from 'react';
import './Location.css';

interface IProps {
  name: string;
}

export default class Location extends React.PureComponent<IProps> {
  public render() {
    const [name, address] = this.props.name.split(', ');
    return (
      <div className="location">
        <div className="location__name">{name}</div>
        {address && <div className="location__address">{address}</div>}
      </div>
    );
  }
}
