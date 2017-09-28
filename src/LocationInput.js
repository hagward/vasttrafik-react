import React, { Component } from 'react';
import _ from 'underscore';
import Auth from './Auth';
import Mru from './Mru';
import Util from './Util';
import settings from './settings';
import './LocationInput.css';

// TODO: overlay height, get the icons back

export default class LocationInput extends Component {
  constructor(props) {
    super(props);

    this.auth = new Auth(settings.key, settings.secret);
    this.mru = new Mru(10);

    this.state = {
      locations: [],
      overlay: false,
      selected: props.value || '',
      value: props.value || ''
    };

    this.autoComplete = _.debounce(this.autoComplete, 300);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.selectLocation = this.selectLocation.bind(this);
    this.showMostRecentlyUsed = this.showMostRecentlyUsed.bind(this);
  }

  render() {
    return (
      <div className="location-input">

        {this.state.overlay &&
          <div className="location-input__overlay">
            <div className="overlay__top-bar">
              <input className="overlay__input" type="text" placeholder="Station"
                ref={input => this.textInput = input} value={this.state.value}
                onChange={this.handleChange} />
              <button className="overlay__cancel" onClick={this.handleCancel}>Avbryt</button>
            </div>
            <ul className="overlay__suggestions">
              {this.state.locations.map(location =>
                <li className="overlay__suggestion" key={location.id}
                  id={location.id} onClick={this.selectLocation}>{location.name}</li>
              )}
            </ul>
          </div>
        }

        <input className="location-input__input" placeholder="Station"
          value={this.state.selected} onFocus={this.handleFocus} readOnly />

      </div>
    );
  }

  handleFocus() {
    this.setState({overlay: true}, () => {
      this.textInput.focus();
      this.textInput.setSelectionRange(0, this.textInput.value.length);
    });
  }

  handleChange(event) {
    const input = event.target.value;

    this.setState({
      value: input
    }, () => {
      if (input) {
        this.autoComplete(input);
      } else {
        this.showMostRecentlyUsed();
      }
    });
  }

  handleCancel() {
    this.setState(prevState => ({
      overlay: false,
      value: prevState.selected
    }));
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
      overlay: false,
      selected: name,
      value: name
    }, () => {
      this.mru.add({id: id, name: name});

      if (this.props.onSelection) {
        this.props.onSelection(id, name);
      }
    });
  }
}
