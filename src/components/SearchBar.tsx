import * as React from 'react';
import * as FontAwesome from 'react-fontawesome';
import { ICoordLocation } from '../Api';
import DatetimeInput from './DatetimeInput';
import LocationInput from './LocationInput';
import './SearchBar.css';

interface IProps {
  origin: ICoordLocation;
  dest: ICoordLocation;
  datetime: string;
  searching: boolean;
  onDatetimeChange(datetime: string): any;
  onLocationChange(inputName: string, location: ICoordLocation): any;
  onLocationSwitch(): any;
  onSearch(): any;
}

export default class SearchBar extends React.PureComponent<IProps> {
  public render() {
    return (
      <div className="search-bar">
        <div className="search-bar__locations">
          <div className="locations__inputs">
            <LocationInput selected={this.props.origin} onSelect={this.onOriginSelected} />
            <LocationInput selected={this.props.dest} onSelect={this.onDestinationSelected} />
          </div>
          <button className="locations__switch-locations" onClick={this.props.onLocationSwitch}>
            <FontAwesome name="exchange-alt" rotate={90} />
          </button>
        </div>
        <div className="search-bar__datetime">
          <DatetimeInput value={this.props.datetime} onChange={this.onDatetimeChanged} />
        </div>
        <button className="search-bar__search" onClick={this.search} disabled={this.props.searching}>
          {this.props.searching && <span>Söker...</span>}
          {!this.props.searching && <span>Sök resa</span>}
        </button>
      </div>
    );
  }

  private onOriginSelected = (location: ICoordLocation) => this.props.onLocationChange('origin', location);
  private onDestinationSelected = (location: ICoordLocation) => this.props.onLocationChange('dest', location);

  private onDatetimeChanged = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    this.props.onDatetimeChange(target.value);
  }

  private search = () => {
    this.storeLocations();
    this.props.onSearch();
  }

  private storeLocations() {
    localStorage.setItem('origin', JSON.stringify(this.props.origin));
    localStorage.setItem('dest', JSON.stringify(this.props.dest));
  }
}
