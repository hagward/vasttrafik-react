import React, { Component } from 'react';
import Auth from './Auth';
import './LocationInput.css';

class LocationInput extends Component {
  constructor(props) {
    super(props);

    this.baseUrl = 'https://api.vasttrafik.se/bin/rest.exe/v2/location.name';

    this.state = {
      active: false,
      locations: [],
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.selectLocation = this.selectLocation.bind(this);
  }

  render() {
    return (
      <div className="LocationInput">
        <input className="location-input" type="text" placeholder={this.props.placeholder} value={this.state.value} onChange={this.handleChange} />
        {this.state.active &&
          <ul className="location-list">
            {this.state.locations.map(location =>
              <li key={location.id} id={location.id} onClick={this.selectLocation}>{location.name}</li>
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
          locations: json.LocationList.StopLocation
        });
      });

      xhr.open('GET', this.baseUrl + '?format=json&input=' + encodeURIComponent(input));
      xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      xhr.send();
    });
  }

  selectLocation(event) {
    this.setState({
      active: false,
      value: event.target.innerText
    });

    if (this.props.onSelection) {
      this.props.onSelection(event.target.id);
    }
  }
}

export default LocationInput;
