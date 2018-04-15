import * as React from 'react';
import * as FontAwesome from 'react-fontawesome';
import { Trip } from '../Api';
import Auth from '../Auth';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';
import Util from '../Util';
import settings from '../settings';
import { DateTime } from 'luxon';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { CoordLocation } from './LocationSearch';
import './App.css';

interface State {
  error: string;
  searching: boolean;
  trips: Trip[];
  origin: CoordLocation;
  dest: CoordLocation;
  datetime: string;
  [key: string]: any;
}

export default class App extends React.Component<any, State> {
  private auth: Auth;

  constructor(props: any) {
    super(props);

    this.auth = new Auth(settings.key, settings.secret);

    const origin = localStorage.getItem('origin');
    const dest = localStorage.getItem('dest');

    this.state = {
      error: '',
      searching: false,
      trips: [],
      origin: origin ? JSON.parse(origin) : { name: '' },
      dest: dest ? JSON.parse(dest) : { name: '' },
      datetime: this.currentDatetime(),
    };
  }

  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
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
      origin={this.state.origin}
      dest={this.state.dest}
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

  private handleLocationChange = (inputName: string, location: CoordLocation) => this.setState({
    [inputName]: location,
  })

  private switchLocations = () => {
    this.setState(prevState => ({
      origin: prevState.dest,
      dest: prevState.origin,
    }));
  }

  private search = () => {
    this.setState({
      error: '',
      searching: true,
      trips: [],
    });

    const [date, time] = this.state.datetime.split('T');

    this.auth.getToken()
      .then(token => {
        const url = 'https://api.vasttrafik.se/bin/rest.exe/v2/trip?format=json' +
          this.getLocationParameter('origin', this.state.origin) +
          this.getLocationParameter('dest', this.state.dest) +
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

  private getLocationParameter(inputName: string, location: CoordLocation): string {
    if (location.id) {
      return '&' + inputName + 'Id=' + encodeURIComponent(location.id);
    } else if (location.lat && location.lon) {
      return '&' + inputName + 'CoordName=' + encodeURIComponent(location.name) +
             '&' + inputName + 'CoordLat=' + encodeURIComponent(location.lat) +
             '&' + inputName + 'CoordLong=' + encodeURIComponent(location.lon);
    } else {
      return '';
    }
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
