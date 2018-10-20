import * as React from 'react';
import { ITrip } from '../Api';
import TripDetails from './TripDetails';
import './TripListItem.css';
import TripOverview from './TripOverview';

interface IProps {
  trip: ITrip;
}

interface IState {
  expanded: boolean;
}

export default class TripListItem extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      expanded: false
    };
  }

  public render() {
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
