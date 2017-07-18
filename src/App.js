import React, { Component } from 'react';
import Auth from './Auth';
import SearchBar from './SearchBar';
import TripList from './TripList';
import Util from './Util';
import settings from './settings';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.auth = new Auth(settings.key, settings.secret);

    this.state = {
      trips: [],
      searching: false
    };

    this.onSearch = this.onSearch.bind(this);
  }

  render() {
    return (
      <div className="app">
        <SearchBar onSearch={this.onSearch} searching={this.state.searching} />
        <TripList trips={this.state.trips} />
      </div>
    );
  }

  onSearch(originId, destId, date, time) {
    if (originId !== destId) {
      this.search(originId, destId, date, time);
    }
  }

  search(originId, destId, date, time) {
    this.setState({
      searching: true
    });

    this.auth.getToken()
      .then(token => {
        const url = 'https://api.vasttrafik.se/bin/rest.exe/v2/trip?format=json' +
          '&originId=' + encodeURIComponent(originId) +
          '&destId=' + encodeURIComponent(destId) +
          '&date=' + encodeURIComponent(date) +
          '&time=' + encodeURIComponent(time);

        return fetch(url, {
          method: 'GET',
          headers: new Headers({'Authorization': 'Bearer ' + token})
        });
      })
      .then(response => response.json())
      .then(json => this.setState({
        searching: false,
        trips: this.parseTrips(json)
      }));
  }

  parseTrips(json) {
    console.log(json);

    if (json.TripList.error) {
      console.error(json.TripList.errorText);
      return [];
    }

    const trips = Util.list(json.TripList.Trip);

    for (let i = 0; i < trips.length; i++) {
      trips[i].Leg = Util.list(trips[i].Leg);
    }

    return trips;
  }
}

export default App;
