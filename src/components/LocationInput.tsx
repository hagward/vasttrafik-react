import * as React from 'react';
import * as FontAwesome from 'react-fontawesome';
import Auth from '../Auth';
import Input from './Input';
import LocationList from './LocationList';
import Modal from './Modal';
import MruCache from '../MruCache';
import Util from '../Util';
import settings from '../settings';
import './LocationInput.css';

interface Props {
  selected: string;
  onSelect(id: string, name: string): any;
}

interface State {
  locations: Location[];
  overlay: boolean;
  value: string;
}

export interface Location {
  id: string;
  name: string;
}

export default class LocationInput extends React.Component<Props, State> {
  private auth: Auth;
  private recentLocations: MruCache<Location>;
  private textInput: HTMLInputElement | null;

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
      locations: [],
      overlay: false,
      value: '',
    };
  }

  render() {
    return (
      <div className="location-input">
        {this.state.overlay && this.renderOverlay()}

        <Input
          icon="map-marker"
          placeholder="Station"
          readOnly={true}
          type="search"
          value={this.props.selected}
          onFocus={this.handleFocus}
        />
      </div>
    );
  }

  renderOverlay() {
    return (
      <Modal>
        <div className="location-input__overlay">
          <div className="overlay__top-bar">
            <div className="overlay__icon">
              <FontAwesome name="map-marker" />
            </div>
            <input
              className="overlay__input"
              type="text"
              placeholder="Station"
              ref={input => this.textInput = input}
              value={this.state.value}
              onChange={this.handleChange}
            />
            <button className="overlay__cancel" onClick={this.handleCancel}>Avbryt</button>
          </div>
          <LocationList
            highlight={this.state.value}
            locations={this.state.locations}
            onSelect={this.selectLocation}
          />
        </div>
      </Modal>
    );
  }

  highlightSearchValue(name: string): string {
    const value = this.state.value;
    const i = name.toLowerCase().indexOf(value.toLowerCase());
    if (i >= 0 && value) {
      return name.substr(0, i) + '<b>' + name.substr(i, value.length) + '</b>' + name.substr(i + value.length);
    } else {
      return name;
    }
  }

  handleFocus = () => {
    this.setState({
      locations: this.recentLocations.getMostRecentlyUsed(),
      overlay: true,
      value: '',
    }, () => {
      if (this.textInput) {
        this.textInput.focus();
      }
    });
  }

  handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const input = target.value;

    this.setState({ value: input }, () => {
      if (input) {
        this.autoComplete(input);
      } else {
        this.showMostRecentlyUsed();
      }
    });
  }

  handleCancel = () => {
    this.setState(prevState => ({
      overlay: false,
    }));
  }

  showMostRecentlyUsed() {
    this.setState({
      locations: this.recentLocations.getMostRecentlyUsed(),
    });
  }

  selectLocation = (id: string, label: string) => {
    this.setState({
      overlay: false,
      value: '',
    }, () => {
      this.recentLocations.add({id: id, name: label});
      this.props.onSelect(id, label);
    });
  }
}
