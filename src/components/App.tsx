import * as React from 'react';
import * as FontAwesome from 'react-fontawesome';
import { Trip } from '../Api';
import Auth from '../Auth';
import SearchBar from './SearchBar';
import TripList from './TripList';
import Util from '../Util';
import settings from '../settings';
import './App.css';

export interface State {
  error: string;
  searching: boolean;
  trips: Trip[];
}

export default class App extends React.Component<any, State> {
  private auth: Auth;

  constructor(props: any) {
    super(props);

    this.auth = new Auth(settings.key, settings.secret);

    this.state = {
      error: '',
      searching: false,
      trips: [],
    };
  }

  render() {
    return (
      <div className="app">
        <SearchBar onSearch={this.onSearch} searching={this.state.searching} />
        {this.renderError()}
        {this.renderSpinner()}
        {this.renderTrips()}
      </div>
    );
  }

  private renderError() {
    if (!this.state.error) {
      return null;
    }
    return <div className="app__error">{this.state.error}</div>;
  }

  private renderSpinner() {
    if (!this.state.searching) {
      return null;
    }
    return (
      <div className="app__spinner">
        <FontAwesome name="spinner" size="3x" spin={true} />
      </div>
    );
  }

  private renderTrips() {
    if (!this.state.trips.length) {
      return null;
    }
    return <TripList trips={this.state.trips} />;
  }

  private onSearch = (originId: string, destId: string, date: string, time: string) => {
    if (originId !== destId) {
      this.search(originId, destId, date, time);
    }
  }

  private search(originId: string, destId: string, date: string, time: string) {
    this.setState({
      error: '',
      searching: true,
      trips: [],
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
      .then(json => this.parseResponse(json))
      .catch(error => this.parseError('Någonting gick fel.'));
  }

  private parseResponse(response: any): void {
    const tripList = response.TripList;
    if (tripList.error) {
      this.parseError('Inga resultat funna.');
    } else {
      this.parseTrips(tripList);
    }
  }

  private parseError(error: string): void {
    this.setState({
      error,
      searching: false,
    });
  }

  private parseTrips(tripList: any): void {
    const trips = Util.list(tripList.Trip);

    for (let i = 0; i < trips.length; i++) {
      trips[i].Leg = Util.list(trips[i].Leg);
    }

    this.setState({
      trips,
      searching: false,
    });
  }
}
