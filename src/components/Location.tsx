import * as React from 'react';
import './Location.css';

interface Props {
  name: string;
}

export default class Location extends React.PureComponent<Props, any> {
  render() {
    const [name, address] = this.props.name.split(', ');
    return (
      <div className="location">
        <div className="location__name">{name}</div>
        {address && <div className="location__address">{address}</div>}
      </div>
    );
  }
}
