import { addMinutes } from 'date-fns';
import * as React from 'react';
import * as FontAwesome from 'react-fontawesome';
import { ICoordLocation, ITrip } from '../Api';
import Auth from '../Auth';
import settings from '../settings';
import Util from '../Util';
import './App.css';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';

interface IState {
  error: string;
  searching: boolean;
  trips: ITrip[];
  origin: ICoordLocation;
  dest: ICoordLocation;
  datetime: Date;
  [key: string]: any;
}

const Error = (props: { error: string }) => <div className="app__error">{props.error}</div>;

const Spinner = () => (
  <div className="app__spinner">
    <FontAwesome name="spinner" size="3x" spin={true} />
  </div>
);

export default class App extends React.PureComponent<any, IState> {
  private auth: Auth;

  constructor(props: any) {
    super(props);

    this.auth = new Auth(settings.key, settings.secret);

    const trips = localStorage.getItem('trips');
    const origin = localStorage.getItem('origin');
    const dest = localStorage.getItem('dest');

    this.state = {
      datetime: new Date(),
      dest: dest ? JSON.parse(dest) : { name: '' },
      error: '',
      origin: origin ? JSON.parse(origin) : { name: '' },
      searching: false,
      trips: trips ? JSON.parse(trips) : [],
    };
  }

  public render() {
    return (
      <div className="app">
        <nav className="app__nav-bar">
          <a href="#" onClick={this.handleNavBarClick}>
            <FontAwesome name="bus" />
            Reaktiv Västtrafik
          </a>
        </nav>
        {this.renderMainContent()}
      </div>
    );
  }

  private handleNavBarClick = () => {
    this.setState({
      trips: [],
    });

    localStorage.setItem('trips', JSON.stringify([]));
  }

  private renderMainContent = () => {
    if (this.state.searching) {
      return <Spinner />;
    } else if (this.state.error) {
      return <Error error={this.state.error} />;
    } else if (this.state.trips.length) {
      return this.renderSearchResult();
    } else {
      return this.renderSearchBar();
    }
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
      trips={this.state.trips}
      onShowEarlier={this.findEarlierTrips}
      onShowLater={this.findLaterTrips}
    />
  )

  private handleDatetimeChange = (datetime: Date) => this.setState({ datetime });

  private handleLocationChange = (inputName: string, location: ICoordLocation) => this.setState({
    [inputName]: location,
  })

  private switchLocations = () => {
    this.setState(prevState => ({
      dest: prevState.origin,
      origin: prevState.dest,
    }));
  }

  private search = async () => {
    this.setState({
      error: '',
      searching: true,
      trips: [],
    });

    localStorage.setItem('trips', JSON.stringify([]));

    const { dateString, timeString } = Util.toDateAndTime(this.state.datetime);

    const token = await this.auth.getToken();
    const url = 'https://api.vasttrafik.se/bin/rest.exe/v2/trip?format=json' +
      this.getLocationParameter('origin', this.state.origin) +
      this.getLocationParameter('dest', this.state.dest) +
      '&date=' + encodeURIComponent(dateString) +
      '&time=' + encodeURIComponent(timeString);

    try {
      const response = await fetch(url, {
        headers: new Headers({'Authorization': 'Bearer ' + token}),
        method: 'GET',
      });
      this.parseResponse(await response.json());
    } catch {
      this.parseError('Någonting gick snett.');
    }
  }

  private getLocationParameter(inputName: string, location: ICoordLocation): string {
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

    for (const trip of trips) {
      trip.Leg = Util.list(trip.Leg);
    }

    this.setState({
      searching: false,
      trips,
    });

    localStorage.setItem('trips', JSON.stringify(trips));
  }

  private findEarlierTrips = () => {
    const datetime = addMinutes(this.state.datetime, -30);
    this.setState({ datetime }, this.search);
  }

  private findLaterTrips = () => {
    const datetime = addMinutes(this.state.datetime, 30);
    this.setState({ datetime }, this.search);
  }
}
