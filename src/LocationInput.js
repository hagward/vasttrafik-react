import React, { Component } from 'react';
import _ from 'underscore';
import Auth from './Auth';
import './LocationInput.css';

class LocationInput extends Component {
  constructor(props) {
    super(props);

    this.baseUrl = 'https://api.vasttrafik.se/bin/rest.exe/v2/location.name';

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
    )
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
    Auth.getToken().then(token => {
      const xhr = new XMLHttpRequest();

      xhr.addEventListener('load', () => {
        const json = JSON.parse(xhr.response);
        this.setState({
          active: true,
          locations: this.list(json.LocationList.StopLocation)
        });
      });

      xhr.open('GET', this.baseUrl + '?format=json&input=' + encodeURIComponent(input));
      xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      xhr.send();
    });
  }

  list(object) {
    return Array.isArray(object) ? object : [object];
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
