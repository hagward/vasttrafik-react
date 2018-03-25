import * as React from 'react';
import * as FontAwesome from 'react-fontawesome';
import * as _ from 'underscore';
import Auth from '../Auth';
import MruCache from '../MruCache';
import Util from '../Util';
import settings from '../settings';
import './LocationInput.css';

// TODO: overlay height, get the icons back

interface Props {
  selected: string;
  onSelect?(id: string, name: string): void;
}

interface State {
  locations: Location[];
  overlay: boolean;
  value: string;
}

interface Location {
  id: string;
  name: string;
}

export default class LocationInput extends React.Component<Props, State> {
  private auth: Auth;
  private mruCache: MruCache<Location>;
  private textInput: HTMLInputElement | null;

  constructor(props: Props) {
    super(props);

    this.auth = new Auth(settings.key, settings.secret);
    this.mruCache = new MruCache(10);

    this.state = {
      locations: [],
      overlay: false,
      value: '',
    };

    this.autoComplete = _.debounce(this.autoComplete, 300);
  }

  render() {
    return (
      <div className="location-input">
        {this.state.overlay &&
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
            <ul className="overlay__suggestions">
              {this.state.locations.map(location =>
                <li
                  dangerouslySetInnerHTML={{__html: this.highlightSearchValue(location.name)}}
                  className="overlay__suggestion"
                  key={location.id}
                  id={location.id}
                  onClick={this.selectLocation}
                />
              )}
            </ul>
          </div>
        }

        <div className="location-input__icon">
          <FontAwesome name="map-marker" />
        </div>

        <input
          className="location-input__input"
          placeholder="Station"
          value={this.props.selected}
          onFocus={this.handleFocus}
          readOnly={true}
        />
      </div>
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
      locations: this.mruCache.getMostRecentlyUsed(),
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

  autoComplete(input: string) {
    this.auth.getToken()
      .then(token => {
        const url = 'https://api.vasttrafik.se/bin/rest.exe/v2/location.name' +
          '?format=json&input=' + encodeURIComponent(input);

        return fetch(url, {
          method: 'GET',
          headers: new Headers({'Authorization': 'Bearer ' + token})
        });
      })
      .then(response => response.json())
      .then(json => this.setState({
        locations: Util.list(json.LocationList.StopLocation),
      }));
  }

  showMostRecentlyUsed() {
    this.setState({
      locations: this.mruCache.getMostRecentlyUsed(),
    });
  }

  selectLocation = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    const id = target.id;
    const name = target.innerText;

    this.setState({
      overlay: false,
      value: '',
    }, () => {
      this.mruCache.add({id: id, name: name});

      if (this.props.onSelect) {
        this.props.onSelect(id, name);
      }
    });
  }
}
