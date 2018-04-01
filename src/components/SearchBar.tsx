import * as React from 'react';
import * as FontAwesome from 'react-fontawesome';
import DateInput from './DateInput';
import LocationInput from './LocationInput';
import TimeInput from './TimeInput';
import './SearchBar.css';

interface Props {
  searching: boolean;
  onSearch(originId: string, destId: string, date: string, time: string): void;
}

interface State {
  originId: string;
  originName: string;
  destId: string;
  destName: string;
  date: string;
  time: string;
}

export default class SearchBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const [date, time] = this.currentDateTime();

    this.state = {
      originId: localStorage.getItem('originId') || '',
      originName: localStorage.getItem('originName') || '',
      destId: localStorage.getItem('destId') || '',
      destName: localStorage.getItem('destName') || '',
      date: date,
      time: time,
    };
  }

  render() {
    return (
      <div className="search-bar">
        <div className="search-bar__locations">
          <div className="locations__inputs">
            <LocationInput selected={this.state.originName} onSelect={this.onOriginSelected} />
            <LocationInput selected={this.state.destName} onSelect={this.onDestinationSelected} />
          </div>
          <button className="locations__switch-locations" onClick={this.switchLocations}>
            <FontAwesome name="exchange-alt" rotate={90} size="2x" />
          </button>
        </div>
        <div className="search-bar__datetime">
          <DateInput value={this.state.date} onChange={this.onDateChanged} />
          <TimeInput value={this.state.time} onChange={this.onTimeChanged} />
        </div>
        <button className="search-bar__search" onClick={this.search} disabled={this.props.searching}>
          {this.props.searching && <span>Söker...</span>}
          {!this.props.searching && <span>Sök</span>}
        </button>
      </div>
    );
  }

  private currentDateTime() {
    // Remove seconds from 'yyyy-mm-dd hh:mm:ss' and split between date and time.
    return new Date().toLocaleString('sv-SE').substr(0, 16).split(' ');
  }

  private onOriginSelected = (id: string, name: string) => this.onLocationSelected(id, name, 'origin');
  private onDestinationSelected = (id: string, name: string) => this.onLocationSelected(id, name, 'dest');

  private onLocationSelected(id: string, name: string, location: string) {
    this.setState(prevState => {
      const newState = {};
      newState[location + 'Id'] = id;
      newState[location + 'Name'] = name;
      return newState;
    });
  }

  private switchLocations = () => {
    this.setState(prevState => ({
      originId: prevState.destId,
      originName: prevState.destName,
      destId: prevState.originId,
      destName: prevState.originName,
    }));
  }

  private onDateChanged = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    this.setState({ date: target.value });
  }

  private onTimeChanged = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    this.setState({ time: target.value });
  }

  private search = () => {
    this.storeLocations();
    this.props.onSearch(this.state.originId, this.state.destId, this.state.date, this.state.time);
  }

  private storeLocations() {
    localStorage.setItem('originId', this.state.originId);
    localStorage.setItem('originName', this.state.originName);
    localStorage.setItem('destId', this.state.destId);
    localStorage.setItem('destName', this.state.destName);
  }
}
