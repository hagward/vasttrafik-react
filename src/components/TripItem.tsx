import * as React from 'react';
import { Trip } from '../Api';
import TripDetails from './TripDetails';
import TripOverview from './TripOverview';
import './Trip.css';

interface Props {
  trip: Trip;
}

interface State {
  expanded: boolean;
}

export default class TripItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      expanded: false
    };
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

  handleClick = () => {
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }));
  }
}
