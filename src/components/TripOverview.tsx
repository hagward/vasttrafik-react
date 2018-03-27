import * as React from 'react';
import { Trip } from '../Api';
import Util from '../Util';
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
            <div className="times__start">
              {this.originTime()}
              {this.delay()}
            </div>
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
    const origin = Util.first(this.props.trip.Leg).Origin;
    const destination = Util.last(this.props.trip.Leg).Destination;
    const originDateTime = Util.toDateTime(origin.date, origin.time);
    const destinationDateTime = Util.toDateTime(destination.date, destination.time);
    const duration = destinationDateTime.diff(originDateTime).shiftTo('hours', 'minutes');
    return Util.padNumber(duration.hours) + ':' + Util.padNumber(duration.minutes);
  }

  delay() {
    const origin = Util.first(this.props.trip.Leg).Origin;
    const dateTime = Util.toDateTime(origin.date, origin.time);
    const realDateTime = Util.toDateTime(origin.rtDate, origin.rtTime);

    if (realDateTime < dateTime) {
      return ' (-' + dateTime.diff(realDateTime).shiftTo('minutes').minutes + ')';
    } else if (realDateTime > dateTime) {
      return ' (+' + realDateTime.diff(dateTime).shiftTo('minutes').minutes + ')';
    } else {
      return '';
    }
  }
}
