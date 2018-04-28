import * as React from 'react';
import './Location.css';

interface Props {
  name: string;
}

export default class Location extends React.PureComponent<Props, any> {
  render() {
    const [name, city] = this.props.name.split(', ');
    return (
      <div className="location">
        <div className="location__name">{name}</div>
        {city && <div className="location__city">{city}</div>}
      </div>
    );
  }
}
