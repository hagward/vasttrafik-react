import * as React from 'react';
import Util from '../Util';
import { Trip } from './App';
import './TripOverview.css';

interface Props {
  trip: Trip;
}

export default class TripOverview extends React.Component<Props, any> {
  render() {
    return (
      <div className="trip-overview">
        <div className="trip-overview__legs">
          {this.props.trip.Leg
            .filter(leg => leg.sname)
            .map((leg, legIndex) =>
              <div
                className="legs__leg"
                key={legIndex}
                style={{
                  backgroundColor: leg.fgColor,
                  color: leg.bgColor,
                  borderColor: leg.fgColor === '#ffffff' ? '#EE1844' : 'transparent'
                }}
              >
                {leg.sname}
              </div>
            )}
        </div>
        <div className="trip-overview__times">
          <div className="times__start-end">
            <div className="times__start">{this.originTime()}</div>
            <div className="times__arrow">→</div>
            <div className="times__end">{this.destinationTime()}</div>
          </div>
          <div className="times__travel-time">{this.totalTravelTime()}</div>
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
