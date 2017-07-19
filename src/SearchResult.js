import React, { Component } from 'react';
import Util from './Util';
import './SearchResult.css';

class SearchResult extends Component {
  render() {
    return (
      <div className="search-result">
        <div className="search-result__times">
          <div className="search-result__time-origin">{this.originTime()}</div>
          <div className="search-result__time-arrow">→</div>
          <div className="search-result__time-destination">{this.destinationTime()}</div>
          <div className="search-result__time-total">Restid: {this.totalTravelTime()}</div>
        </div>
        <div className="search-result__legs">
          {this.props.trip.Leg.map((leg, legIndex) =>
            <div className="search-result__leg" key={legIndex} style={{backgroundColor: leg.fgColor, color: leg.bgColor}}>
              {leg.sname ? leg.sname : 'Gå'}
            </div>
          )}
        </div>
      </div>
    );
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

export default SearchResult;
