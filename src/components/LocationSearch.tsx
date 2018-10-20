import * as React from 'react';
import Auth from '../Auth';
import MruCache from '../MruCache';
import settings from '../settings';
import Util from '../Util';
import LocationList from './LocationList';
import './LocationSearch.css';
import LocationSearchInput from './LocationSearchInput';

interface IProps {
  onCancel(): any;
  onSelect(location: ICoordLocation): any;
}

interface IState {
  locations: ICoordLocation[];
  value: string;
  quickLocation?: ICoordLocation;
}

export interface ICoordLocation {
  id?: string;
  idx?: string;
  lat?: string;
  lon?: string;
  name: string;
}

interface IStopLocation extends ICoordLocation {
  id: string;
}

export default class LocationSearch extends React.PureComponent<IProps, IState> {
  private auth: Auth;
  private recentLocations: MruCache<IStopLocation>;

  private autoComplete = Util.debounce(async (input: string) => {
    const url = 'https://api.vasttrafik.se/bin/rest.exe/v2/location.name' +
      '?format=json&input=' + encodeURIComponent(input);

    const token = await this.auth.getToken();
    const response = await fetch(url, {
      headers: new Headers({ 'Authorization': 'Bearer ' + token }),
      method: 'GET',
    });
    const json = await response.json();

    const coordLocations = Util.list(json.LocationList.CoordLocation);
    const stopLocations = Util.list(json.LocationList.StopLocation);
    const locations = Util.merge(coordLocations, stopLocations,
      (a: ICoordLocation, b: ICoordLocation) => Number(a.idx) - Number(b.idx));

    this.setState({ locations });
  }, 250, this);

  constructor(props: IProps) {
    super(props);

    this.auth = new Auth(settings.key, settings.secret);
    this.recentLocations = new MruCache(10);

    this.state = {
      locations: this.recentLocations.getMostRecentlyUsed(),
      value: '',
    };
  }

  public render() {
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

  private handleSelect = (location: ICoordLocation) => {
    this.props.onSelect(location);
    if (location.id) {
      this.recentLocations.add(location as IStopLocation);
    }
  }
}
