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
      <div className="Search">
        <form>
          <LocationInput placeholder="Från" onSelection={value => this.setState({originId: value})} />
          <LocationInput placeholder="Till" onSelection={value => this.setState({destId: value})} />
          <input type="submit" value="Sök" onClick={this.search} />
        </form>
        <ul className="trip-list">
          {this.state.trips.map((trip, tripIndex) =>
            <li key={tripIndex}>
              <div className="leg">
                <div>{this.first(trip.Leg).Origin.time}</div>
                {trip.Leg.map((leg, legIndex) =>
                  <div key={legIndex} className="leg-name" style={{backgroundColor: leg.fgColor, color: leg.bgColor}}>{leg.sname}</div>
                )}
                <div>{this.first(trip.Leg).Destination.time}</div>
              </div>
            </li>
          )}
        </ul>
      </div>
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
        this.setState({
          trips: this.parseTrips(xhr.response)
        });
      });

      xhr.open('GET', url);
      xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      xhr.send();
    });
  }

  parseTrips(response) {
    const json = JSON.parse(response);
    const trips = this.list(json.TripList.Trip);

    console.log(json);

    for (let i = 0; i < trips.length; i++) {
      trips[i].Leg = this.list(trips[i].Leg);
    }

    return trips;
  }

  list(object) {
    return Array.isArray(object) ? object : [object];
  }

  first(array) {
    return array[0];
  }

  last(array) {
    return array[array.length - 1];
  }

  shortLocation(locationName) {
    return locationName.split(',')[0];
  }
}

export default Search
