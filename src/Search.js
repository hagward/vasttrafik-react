import React, { Component } from 'react';
import Auth from './Auth';
import LocationInput from './LocationInput';
import searching from './searching.svg';
import './Search.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      originId: '',
      destId: '',
      trips: [],
      searching: false
    };
    this.search = this.search.bind(this);
  }

  render() {
    return (
      <div className="search">
        <form>
          <LocationInput placeholder="Från" onSelection={value => this.onOriginSelected(value)} />
          <LocationInput placeholder="Till" onSelection={value => this.onDestinationSelected(value)} />
        </form>
        {this.state.searching &&
          <div className="search__searching">
            <img src={searching} alt="Searching" />
          </div>
        }
        <ul className="search__trips">
          {this.state.trips.map((trip, tripIndex) =>
            <li key={tripIndex} className="search__trip">
              <div className="trip__origin-time">{this.first(trip.Leg).Origin.time}</div>
              {trip.Leg.map((leg, legIndex) =>
                <div className="trip__leg-name" key={legIndex} style={{backgroundColor: leg.fgColor, color: leg.bgColor}}>
                  {leg.sname ? leg.sname : 'Gå'}
                </div>
              )}
              <div className="trip__dest-time">{this.first(trip.Leg).Destination.time}</div>
            </li>
          )}
        </ul>
      </div>
    )
  }

  onOriginSelected(originId) {
    this.setState({originId: originId}, this.search);
  }

  onDestinationSelected(destId) {
    this.setState({destId: destId}, this.search);
  }

  search() {
    if (!this.state.originId || !this.state.destId) {
      return;
    }

    this.setState({
      searching: true
    });

    Auth.getToken().then(token => {
      const url = 'https://api.vasttrafik.se/bin/rest.exe/v2/trip?format=json' +
                  '&originId=' + encodeURIComponent(this.state.originId) +
                  '&destId=' + encodeURIComponent(this.state.destId);
                    // + '&date=' + encodeURIComponent(options.date)
                    // + '&time=' + encodeURIComponent(options.time)

      const xhr = new XMLHttpRequest();

      xhr.addEventListener('load', () => {
        this.setState({
          trips: this.parseTrips(xhr.response),
          searching: false
        });
      });

      xhr.open('GET', url);
      xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      xhr.send();
    });
  }

  parseTrips(response) {
    const json = JSON.parse(response);

    console.log(json);

    if (json.TripList.error) {
      console.error(json.TripList.errorText);
      return [];
    }

    const trips = this.list(json.TripList.Trip);

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
