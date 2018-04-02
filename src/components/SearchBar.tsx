import * as React from 'react';
import * as FontAwesome from 'react-fontawesome';
import DateInput from './DateInput';
import LocationInput from './LocationInput';
import TimeInput from './TimeInput';
import './SearchBar.css';

interface Props {
  originId: string;
  originName: string;
  destId: string;
  destName: string;
  date: string;
  time: string;
  searching: boolean;
  onDateChange(date: string): any;
  onTimeChange(time: string): any;
  onLocationChange(id: string, name: string, location: string): any;
  onLocationSwitch(): any;
  onSearch(): any;
}

export default class SearchBar extends React.Component<Props, any> {
  render() {
    return (
      <div className="search-bar">
        <div className="search-bar__locations">
          <div className="locations__inputs">
            <LocationInput selected={this.props.originName} onSelect={this.onOriginSelected} />
            <LocationInput selected={this.props.destName} onSelect={this.onDestinationSelected} />
          </div>
          <button className="locations__switch-locations" onClick={this.props.onLocationSwitch}>
            <FontAwesome name="exchange-alt" rotate={90} />
          </button>
        </div>
        <div className="search-bar__datetime">
          <DateInput value={this.props.date} onChange={this.onDateChanged} />
          <TimeInput value={this.props.time} onChange={this.onTimeChanged} />
        </div>
        <button className="search-bar__search" onClick={this.search} disabled={this.props.searching}>
          {this.props.searching && <span>Söker...</span>}
          {!this.props.searching && <span>Sök</span>}
        </button>
      </div>
    );
  }

  private onOriginSelected = (id: string, name: string) => this.props.onLocationChange(id, name, 'origin');
  private onDestinationSelected = (id: string, name: string) => this.props.onLocationChange(id, name, 'dest');

  private onDateChanged = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    this.props.onDateChange(target.value);
  }

  private onTimeChanged = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    this.props.onTimeChange(target.value);
  }

  private search = () => {
    this.storeLocations();
    this.props.onSearch();
  }

  private storeLocations() {
    localStorage.setItem('originId', this.props.originId);
    localStorage.setItem('originName', this.props.originName);
    localStorage.setItem('destId', this.props.destId);
    localStorage.setItem('destName', this.props.destName);
  }
}
