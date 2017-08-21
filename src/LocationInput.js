import React, { Component } from 'react';
import _ from 'underscore';
import Auth from './Auth';
import Icon from 'react-geomicons';
import Mru from './Mru';
import Util from './Util';
import settings from './settings';
import './LocationInput.css';

export default class LocationInput extends Component {
  constructor(props) {
    super(props);

    this.auth = new Auth(settings.key, settings.secret);
    this.mru = new Mru(10);

    this.state = {
      active: false,
      focus: false,
      locations: [],
      value: props.value || ''
    };

    this.autoComplete = _.debounce(this.autoComplete, 300);
    this.clear = this.clear.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.selectLocation = this.selectLocation.bind(this);
    this.showMostRecentlyUsed = this.showMostRecentlyUsed.bind(this);
  }

  render() {
    return (
      <div className="location-input">
        <Icon name="pin" />
        <input className="location-input__input" type="text" placeholder="Station" value={this.state.value}
               ref={input => this.textInput = input}
               onChange={this.handleChange}
	             onFocus={() => this.setState({focus: true})}
	             onBlur={this.handleBlur} />

        {this.state.focus &&
          <button className="location-input__clear" onClick={this.clear}>Rensa</button>
        }

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

  handleBlur() {
    // Ensure that button click happens before blur.
    setTimeout(() => this.setState({focus: false}), 0);
  }

  handleChange(event) {
    const input = event.target.value;

    this.setState({value: input});

    if (input) {
      this.autoComplete(input);
    } else {
      this.showMostRecentlyUsed();
    }
  }

  clear() {
    this.setState({value: ''});
    this.showMostRecentlyUsed();
    this.textInput.focus();
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

  showMostRecentlyUsed() {
    this.setState({
      active: true,
      locations: this.mru.getMostRecentlyUsed()
    });
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

    this.mru.add({id: id, name: name});
  }
}
