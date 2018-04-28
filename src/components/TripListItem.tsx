import * as React from 'react';
import { Trip } from '../Api';
import TripDetails from './TripDetails';
import TripOverview from './TripOverview';
import './TripListItem.css';

interface Props {
  trip: Trip;
}

interface State {
  expanded: boolean;
}

export default class TripListItem extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      expanded: false
    };
  }

  render() {
    return (
      <div className="trip-list-item">
        <TripOverview trip={this.props.trip} onClick={this.handleClick} />
        {this.state.expanded &&
          <TripDetails trip={this.props.trip} />
        }
      </div>
    );
  }

  private handleClick = () => {
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }));
  }
}
