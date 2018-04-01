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
  onSelect(id: string, name: string): any;
}

interface State {
  locations: Location[];
  value: string;
}

export interface Location {
  id: string;
  name: string;
}

export default class LocationSearch extends React.Component<Props, State> {
  private auth: Auth;
  private recentLocations: MruCache<Location>;

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
      .then(json => this.setState({
        locations: Util.list(json.LocationList.StopLocation),
      }));
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
            <FontAwesome name="map-marker" />
          </div>
          <input
            className="location-search__input"
            placeholder="Station"
            ref={this.focusInput}
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <button className="location-search__cancel" onClick={this.props.onCancel}>Avbryt</button>
        </div>
        <LocationList
          highlight={this.state.value}
          locations={this.state.locations}
          onSelect={this.handleSelect}
        />
      </div>
    );
  }

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

  private handleSelect = (id: string, name: string) => {
    this.props.onSelect(id, name);
    this.recentLocations.add({ id, name });
  }
}
