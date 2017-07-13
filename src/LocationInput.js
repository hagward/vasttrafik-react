import React, { Component } from 'react';
import _ from 'underscore';
import Auth from './Auth';
import LocalStorage from './LocalStorage';
import Util from './Util';
import settings from './settings';
import './LocationInput.css';

class LocationInput extends Component {
  constructor(props) {
    super(props);

    this.auth = new Auth(settings.key, settings.secret, new LocalStorage(window));

    this.state = {
      active: false,
      locations: [],
      value: props.value || ''
    };

    this.autoComplete = _.debounce(this.autoComplete, 300);
    this.handleChange = this.handleChange.bind(this);
    this.selectLocation = this.selectLocation.bind(this);
  }

  render() {
    return (
      <div className="location-input">
        <input className="location-input__input" type="search" placeholder={this.props.placeholder} value={this.state.value} onChange={this.handleChange} />
        {this.state.active &&
          <ul className="location-input__suggestions">
            {this.state.locations.map(location =>
              <li className="location-input__suggestion" key={location.id} id={location.id} onClick={this.selectLocation}>{location.name}</li>
            )}
          </ul>
        }
      </div>
    );
  }

  handleChange(event) {
    const input = event.target.value;

    this.setState({
      value: input
    });

    if (input) {
      this.autoComplete(input);
    }
  }

  autoComplete(input) {
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
        active: true,
        locations: Util.list(json.LocationList.StopLocation)
      }));
  }

  selectLocation(event) {
    const id = event.target.id;
    const name = event.target.innerText;

    this.setState({
      active: false,
      value: name
    });

    if (this.props.onSelection) {
      this.props.onSelection(id, name);
    }
  }
}

export default LocationInput;
