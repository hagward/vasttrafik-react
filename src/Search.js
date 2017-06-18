import React, { Component } from 'react';
import Auth from './Auth';
import LocationInput from './LocationInput';
import './Search.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      originId: '',
      destId: '',
      trips: []
    };
    this.search = this.search.bind(this);
  }

  render() {
    return (
      <form className="Search">
        <LocationInput placeholder="Från" onSelection={value => this.setState({originId: value})} />
        <LocationInput placeholder="Till" onSelection={value => this.setState({destId: value})} />
        <input type="submit" value="Sök" onClick={this.search} />
        <ul className="trip-list">
          {this.state.trips.map(trip =>
            <li key={trip.Leg.id}>
              {trip.Leg.Origin.name} - {trip.Leg.Destination.name}
            </li>
          )}
        </ul>
      </form>
    )
  }

  search(event) {
    event.preventDefault();

    Auth.getToken().then(token => {
      const url = 'https://api.vasttrafik.se/bin/rest.exe/v2/trip?format=json' +
                  '&originId=' + encodeURIComponent(this.state.originId) +
                  '&destId=' + encodeURIComponent(this.state.destId);
                    // + '&date=' + encodeURIComponent(options.date)
                    // + '&time=' + encodeURIComponent(options.time)

      const xhr = new XMLHttpRequest();

      xhr.addEventListener('load', () => {
        const json = JSON.parse(xhr.response);
        console.log(json);
        this.setState({
          trips: json.TripList.Trip
        });
      });

      xhr.open('GET', url);
      xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      xhr.send();
    });
  }
}

export default Search
