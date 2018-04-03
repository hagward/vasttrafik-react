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

interface State {
  error: string;
  searching: boolean;
  trips: Trip[];
  originId: string;
  originName: string;
  destId: string;
  destName: string;
  date: string;
  time: string;
}

export default class App extends React.Component<any, State> {
  private auth: Auth;

  constructor(props: any) {
    super(props);

    this.auth = new Auth(settings.key, settings.secret);

    const [date, time] = this.currentDateTime();

    this.state = {
      error: '',
      searching: false,
      trips: [],
      originId: localStorage.getItem('originId') || '',
      originName: localStorage.getItem('originName') || '',
      destId: localStorage.getItem('destId') || '',
      destName: localStorage.getItem('destName') || '',
      date,
      time,
    };
  }

  render() {
    return (
      <div className="app">
        <SearchBar
          originId={this.state.originId}
          originName={this.state.originName}
          destId={this.state.destId}
          destName={this.state.destName}
          date={this.state.date}
          time={this.state.time}
          searching={this.state.searching}
          onDateChange={this.handleDateChange}
          onTimeChange={this.handleTimeChange}
          onLocationChange={this.handleLocationChange}
          onLocationSwitch={this.switchLocations}
          onSearch={this.search}
        />
        {this.renderError()}
        {this.renderSpinner()}
        {this.renderTrips()}
      </div>
    );
  }

  private currentDateTime() {
    // Remove seconds from 'yyyy-mm-dd hh:mm:ss' and split between date and time.
    return DateTime.local().toISO().substr(0, 16).split('T');
  }

  private handleDateChange = (date: string) => this.setState({ date });
  private handleTimeChange = (time: string) => this.setState({ time });

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
    return (
      <SearchResult
        trips={this.state.trips}
        onShowEarlier={this.findEarlierTrips}
        onShowLater={this.findLaterTrips}
      />
    );
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

    this.auth.getToken()
      .then(token => {
        const url = 'https://api.vasttrafik.se/bin/rest.exe/v2/trip?format=json' +
          '&originId=' + encodeURIComponent(this.state.originId) +
          '&destId=' + encodeURIComponent(this.state.destId) +
          '&date=' + encodeURIComponent(this.state.date) +
          '&time=' + encodeURIComponent(this.state.time);

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
    const dateTime = DateTime.fromISO(this.state.date + 'T' + this.state.time).minus({ hours: 3 }).toISO();
    const [date, time] = dateTime.substr(0, 16).split('T');
    this.setState({ date, time }, this.search);
  }

  private findLaterTrips = () => {
    const dateTime = DateTime.fromISO(this.state.date + 'T' + this.state.time).plus({ hours: 3 }).toISO();
    const [date, time] = dateTime.substr(0, 16).split('T');
    this.setState({ date, time }, this.search);
  }
}
