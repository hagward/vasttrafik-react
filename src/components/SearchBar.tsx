import * as React from 'react';
import * as FontAwesome from 'react-fontawesome';
import DatetimeInput from './DatetimeInput';
import LocationInput from './LocationInput';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import './SearchBar.css';

interface Props extends RouteComponentProps<any> {
  originId: string;
  originName: string;
  destId: string;
  destName: string;
  datetime: string;
  searching: boolean;
  onDatetimeChange(datetime: string): any;
  onLocationChange(id: string, name: string, location: string): any;
  onLocationSwitch(): any;
  onSearch(): any;
}

class SearchBar extends React.Component<Props, any> {
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
          <DatetimeInput value={this.props.datetime} onChange={this.onDatetimeChanged} />
        </div>
        <button className="search-bar__search" onClick={this.search} disabled={this.props.searching}>
          {this.props.searching && <span>Söker...</span>}
          {!this.props.searching && <span>Sök resa</span>}
        </button>
      </div>
    );
  }

  private onOriginSelected = (id: string, name: string) => this.props.onLocationChange(id, name, 'origin');
  private onDestinationSelected = (id: string, name: string) => this.props.onLocationChange(id, name, 'dest');

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
    localStorage.setItem('originId', this.props.originId);
    localStorage.setItem('originName', this.props.originName);
    localStorage.setItem('destId', this.props.destId);
    localStorage.setItem('destName', this.props.destName);
  }
}

export default withRouter<Props>(SearchBar);
