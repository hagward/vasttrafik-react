import * as React from 'react';
import * as FontAwesome from 'react-fontawesome';
import { Trip } from '../Api';
import Auth from '../Auth';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';
import Util from '../Util';
import settings from '../settings';
import './App.css';
import { DateTime } from 'luxon';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

interface State {
  error: string;
  searching: boolean;
  trips: Trip[];
  originId: string;
  originName: string;
  destId: string;
  destName: string;
  datetime: string;
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
      originId: localStorage.getItem('originId') || '',
      originName: localStorage.getItem('originName') || '',
      destId: localStorage.getItem('destId') || '',
      destName: localStorage.getItem('destName') || '',
      datetime: this.currentDatetime(),
    };
  }

  render() {
    return (
      <Router>
        <div className="app">
          <nav className="app__nav-bar">
            <Link to="/">
              <FontAwesome name="bus" />
              Reaktiv Västtrafik
            </Link>
          </nav>
          <Route exact={true} path="/" render={this.renderSearchBar} />
          <Route path="/search" render={this.renderSearchResult} />
        </div>
      </Router>
    );
  }

  private renderSearchBar = () => (
    <SearchBar
      originId={this.state.originId}
      originName={this.state.originName}
      destId={this.state.destId}
      destName={this.state.destName}
      datetime={this.state.datetime}
      searching={this.state.searching}
      onDatetimeChange={this.handleDatetimeChange}
      onLocationChange={this.handleLocationChange}
      onLocationSwitch={this.switchLocations}
      onSearch={this.search}
    />
  )

  private renderSearchResult = () => (
    <SearchResult
      error={this.state.error}
      trips={this.state.trips}
      onShowEarlier={this.findEarlierTrips}
      onShowLater={this.findLaterTrips}
    />
  )

  private currentDatetime() {
    return DateTime.local().toISO().substr(0, 16);
  }

  private handleDatetimeChange = (datetime: string) => this.setState({ datetime });

  private handleLocationChange = (id: string, name: string, location: string) => {
    this.setState(prevState => {
      const newState = {};
      newState[location + 'Id'] = id;
      newState[location + 'Name'] = name;
      return newState;
    });
  }

  private switchLocations = () => {
    this.setState(prevState => ({
      originId: prevState.destId,
      originName: prevState.destName,
      destId: prevState.originId,
      destName: prevState.originName,
    }));
  }

  private search = () => {
    if (this.state.originId === this.state.destId) {
      return;
    }

    this.setState({
      error: '',
      searching: true,
      trips: [],
    });

    const [date, time] = this.state.datetime.split('T');

    this.auth.getToken()
      .then(token => {
        const url = 'https://api.vasttrafik.se/bin/rest.exe/v2/trip?format=json' +
          '&originId=' + encodeURIComponent(this.state.originId) +
          '&destId=' + encodeURIComponent(this.state.destId) +
          '&date=' + encodeURIComponent(date) +
          '&time=' + encodeURIComponent(time);

        return fetch(url, {
          method: 'GET',
          headers: new Headers({'Authorization': 'Bearer ' + token})
        });
      })
      .then(response => response.json())
      .then(json => this.parseResponse(json))
      .catch(error => this.parseError('Någonting gick snett.'));
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

  private findEarlierTrips = () => {
    const datetime = DateTime.fromISO(this.state.datetime).minus({ minutes: 30 }).toISO().substr(0, 16);
    this.setState({ datetime }, this.search);
  }

  private findLaterTrips = () => {
    const datetime = DateTime.fromISO(this.state.datetime).plus({ minutes: 30 }).toISO().substr(0, 16);
    this.setState({ datetime }, this.search);
  }
}
