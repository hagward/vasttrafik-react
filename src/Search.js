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
          {this.state.trips.map((trip, tripIndex) =>
            <li key={tripIndex}>
              {trip.Leg.map((leg, legIndex) =>
                <div className="leg" key={legIndex}>
                  <div className="leg-name" style={{backgroundColor: leg.fgColor, color: leg.bgColor}}>{leg.sname}</div>
                  <div>{this.shortLocation(leg.Origin.name)}</div>
                  <div>{this.shortLocation(leg.Destination.name)}</div>
                </div>
              )}
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

  shortLocation(locationName) {
    return locationName.split(',')[0];
  }
}

export default Search
