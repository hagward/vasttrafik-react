import * as React from 'react';
import * as FontAwesome from 'react-fontawesome';
import DatetimeInput from './DatetimeInput';
import LocationInput from './LocationInput';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { CoordLocation } from './LocationSearch';
import './SearchBar.css';

interface Props extends RouteComponentProps<any> {
  origin: CoordLocation;
  dest: CoordLocation;
  datetime: string;
  searching: boolean;
  onDatetimeChange(datetime: string): any;
  onLocationChange(inputName: string, location: CoordLocation): any;
  onLocationSwitch(): any;
  onSearch(): any;
}

class SearchBar extends React.PureComponent<Props, any> {
  render() {
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

  private onOriginSelected = (location: CoordLocation) => this.props.onLocationChange('origin', location);
  private onDestinationSelected = (location: CoordLocation) => this.props.onLocationChange('dest', location);

  private onDatetimeChanged = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    this.props.onDatetimeChange(target.value);
  }

  private search = () => {
    this.storeLocations();
    this.props.history.push('/search');
    this.props.onSearch();
  }

  private storeLocations() {
    localStorage.setItem('origin', JSON.stringify(this.props.origin));
    localStorage.setItem('dest', JSON.stringify(this.props.dest));
  }
}

export default withRouter<Props>(SearchBar);
