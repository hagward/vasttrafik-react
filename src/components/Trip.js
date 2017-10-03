import React, { Component } from 'react';
import TripDetails from './TripDetails';
import TripOverview from './TripOverview';
import './Trip.css';

export default class Trip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
      <div className="trip" onClick={this.handleClick}>
        <TripOverview trip={this.props.trip} />
        {this.state.expanded &&
          <TripDetails trip={this.props.trip} />
        }
      </div>
    );
  }

  handleClick() {
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }));
  }
}
