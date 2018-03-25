import * as React from 'react';
import { Trip } from '../Api';
import Auth from '../Auth';
import SearchBar from './SearchBar';
import TripList from './TripList';
import Util from '../Util';
import settings from '../settings';
import './App.css';

export interface State {
  searching: boolean;
  trips: Trip[];
}

export default class App extends React.Component<any, State> {
  private auth: Auth;

  constructor(props: any) {
    super(props);

    this.auth = new Auth(settings.key, settings.secret);

    this.state = {
      searching: false,
      trips: [],
    };
  }

  render() {
    return (
      <div className="app">
        <SearchBar onSearch={this.onSearch} searching={this.state.searching} />
        <TripList trips={this.state.trips} />
      </div>
    );
  }

  onSearch = (originId: string, destId: string, date: string, time: string) => {
    if (originId !== destId) {
      this.search(originId, destId, date, time);
    }
  }

  private search(originId: string, destId: string, date: string, time: string) {
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
        trips: this.parseTrips(json),
      }));
  }

  private parseTrips(json: any) {
    if (json.TripList.error) {
      throw json.TripList.errorText;
    }

    const trips = Util.list(json.TripList.Trip);

    for (let i = 0; i < trips.length; i++) {
      trips[i].Leg = Util.list(trips[i].Leg);
    }

    return trips;
  }
}
