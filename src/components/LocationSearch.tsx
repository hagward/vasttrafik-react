import * as React from 'react';
import Auth from '../Auth';
import LocationList from './LocationList';
import MruCache from '../MruCache';
import Util from '../Util';
import settings from '../settings';
import './LocationSearch.css';
import LocationSearchInput from './LocationSearchInput';

interface Props {
  onCancel(): any;
  onSelect(location: CoordLocation): any;
}

interface State {
  locations: CoordLocation[];
  value: string;
  quickLocation?: CoordLocation;
}

export interface CoordLocation {
  id?: string;
  idx?: string;
  lat?: string;
  lon?: string;
  name: string;
}

interface StopLocation extends CoordLocation {
  id: string;
}

export default class LocationSearch extends React.PureComponent<Props, State> {
  private auth: Auth;
  private recentLocations: MruCache<StopLocation>;

  private autoComplete = Util.debounce(async (input: string) => {
    const url = 'https://api.vasttrafik.se/bin/rest.exe/v2/location.name' +
      '?format=json&input=' + encodeURIComponent(input);

    const token = await this.auth.getToken();
    const response = await fetch(url, {
      method: 'GET',
      headers: new Headers({ 'Authorization': 'Bearer ' + token })
    });
    const json = await response.json();

    const coordLocations = Util.list(json.LocationList.CoordLocation);
    const stopLocations = Util.list(json.LocationList.StopLocation);
    const locations = Util.merge(coordLocations, stopLocations,
      (a: CoordLocation, b: CoordLocation) => Number(a.idx) - Number(b.idx));

    this.setState({ locations });
  }, 250, this);

  constructor(props: Props) {
    super(props);

    this.auth = new Auth(settings.key, settings.secret);
    this.recentLocations = new MruCache(10);

    this.state = {
      locations: this.recentLocations.getMostRecentlyUsed(),
      value: '',
    };
  }

  render() {
    return (
      <div className="location-search">
        <LocationSearchInput value={this.state.value} onChange={this.handleChange} onCancel={this.handleCancel} />
        {this.renderResults()}
      </div>
    );
  }

  private renderResults = () => {
    const { locations, quickLocation } = this.state;
    if (!locations.length && !quickLocation) {
      return null;
    }

    const allLocations = quickLocation ?
      Util.removeDuplicates([quickLocation, ...locations], location => location.id || location.name) :
      locations;

    return (
      <div className="location-search__results">
        <LocationList
          locations={allLocations}
          onSelect={this.handleSelect}
        />
      </div>
    );
  }

  private handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    this.setState({ value }, () => {
      this.autoComplete.cancel();

      this.setState({
        quickLocation: this.recentLocations.getFirstMatch(value),
      });

      if (value) {
        this.autoComplete(value);
      } else {
        this.showMostRecentlyUsed();
      }
    });
  }

  private showMostRecentlyUsed() {
    this.setState({
      locations: this.recentLocations.getMostRecentlyUsed(),
    });
  }

  private handleCancel = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    this.props.onCancel();
  }

  private handleSelect = (location: CoordLocation) => {
    this.props.onSelect(location);
    if (location.id) {
      this.recentLocations.add(location as StopLocation);
    }
  }
}
