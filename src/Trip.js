import React, { Component } from 'react';
import TripDetails from './TripDetails';
import Util from './Util';
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
        <div className="trip__times">
          <div className="trip__time-origin">{this.originTime()}</div>
          <div className="trip__time-arrow">→</div>
          <div className="trip__time-destination">{this.destinationTime()}</div>
          <div className="trip__time-total">Restid: {this.totalTravelTime()}</div>
        </div>
        <div className="trip__legs">
          {this.props.trip.Leg.map((leg, legIndex) =>
            <div className="trip__leg" key={legIndex} style={{backgroundColor: leg.fgColor, color: leg.bgColor}}>
              {leg.sname ? leg.sname : 'Gå'}
            </div>
          )}
        </div>
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

  originTime() {
    return Util.first(this.props.trip.Leg).Origin.time;
  }

  destinationTime() {
    return Util.last(this.props.trip.Leg).Destination.time;
  }

  totalTravelTime() {
    return Util.timeDiff(this.originTime(), this.destinationTime());
  }
}
