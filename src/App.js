import React, { Component } from 'react';
import Auth from './Auth';
import LocalStorage from './LocalStorage';
import SearchBar from './SearchBar';
import TripList from './TripList';
import Util from './Util';
import settings from './settings';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.auth = new Auth(settings.key, settings.secret, new LocalStorage(window));

    this.state = {
      trips: [],
      searching: false
    };

    this.onSearch = this.onSearch.bind(this);
  }

  render() {
    return (
      <div className="app">
        <SearchBar onSearch={this.onSearch} />
        <TripList trips={this.state.trips} />
      </div>
    );
  }

  onSearch(originId, destId, time) {
    if (originId === destId) {
      return;
    }

    this.setState({
      searching: true
    });

    this.auth.getToken().then(token => {
      const url = 'https://api.vasttrafik.se/bin/rest.exe/v2/trip?format=json' +
        '&originId=' + encodeURIComponent(originId) +
        '&destId=' + encodeURIComponent(destId) +
        '&time=' + encodeURIComponent(time);

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

    const trips = Util.list(json.TripList.Trip);

    for (let i = 0; i < trips.length; i++) {
      trips[i].Leg = Util.list(trips[i].Leg);
    }

    return trips;
  }
}

export default App;
