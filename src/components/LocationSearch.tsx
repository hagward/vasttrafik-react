import * as React from 'react';
import * as FontAwesome from 'react-fontawesome';
import Auth from '../Auth';
import LocationList from './LocationList';
import MruCache from '../MruCache';
import Util from '../Util';
import settings from '../settings';
import './LocationSearch.css';

interface Props {
  onCancel(): any;
  onSelect(location: CoordLocation): any;
}

interface State {
  locations: CoordLocation[];
  value: string;
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

  private autoComplete = Util.debounce((input: string) => {
    this.auth.getToken()
      .then(token => {
        const url = 'https://api.vasttrafik.se/bin/rest.exe/v2/location.name' +
          '?format=json&input=' + encodeURIComponent(input);

        return fetch(url, {
          method: 'GET',
          headers: new Headers({ 'Authorization': 'Bearer ' + token })
        });
      })
      .then(response => response.json())
      .then(json => {
        if (this.state.value !== input) {
          return;
        }
        const coordLocations = Util.list(json.LocationList.CoordLocation);
        const stopLocations = Util.list(json.LocationList.StopLocation);
        const locations = Util.merge(coordLocations, stopLocations,
          (a: CoordLocation, b: CoordLocation) => Number(a.idx) - Number(b.idx));
        this.setState({ locations });
      });
  }, 500, this);

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
        <div className="location-search__top-bar">
          <div className="location-search__icon">
            <FontAwesome name="map-marker-alt" />
          </div>
          <input
            className="location-search__input"
            placeholder="Station"
            ref={this.focusInput}
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <button className="location-search__cancel" onClick={this.handleCancel}>Avbryt</button>
        </div>
        <div className="location-search__results">
          {this.state.locations.length > 0 && this.renderResults()}
        </div>
      </div>
    );
  }

  private renderResults = () => (
    <LocationList
      locations={this.state.locations}
      onSelect={this.handleSelect}
    />
  )

  private focusInput(input: HTMLInputElement) {
    setTimeout(() => {
      if (input) {
        input.focus();
      }
    }, 0);
  }

  private handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    this.setState({ value }, () => {
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
