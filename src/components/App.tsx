import { addMinutes } from 'date-fns';
import * as React from 'react';
import * as FontAwesome from 'react-fontawesome';
import { ICoordLocation, ITrip, searchTrip } from '../api';
import Auth from '../Auth';
import settings from '../settings';
import { list } from '../util';
import './App.css';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';

interface IState {
  error: string;
  searching: boolean;
  trips: ITrip[];
  origin: ICoordLocation;
  dest: ICoordLocation;
  date: Date;
  now: boolean;
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
      date: new Date(),
      dest: dest ? JSON.parse(dest) : { name: '' },
      error: '',
      now: true,
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
      error: '',
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
      date={this.state.date}
      now={this.state.now}
      searching={this.state.searching}
      onDatetimeChange={this.handleDatetimeChange}
      onLocationChange={this.handleLocationChange}
      onLocationSwitch={this.switchLocations}
      onNowButtonClick={this.handleNowButtonClick}
      onSearch={this.handleSearch}
    />
  )

  private renderSearchResult = () => (
    <SearchResult
      trips={this.state.trips}
      onShowEarlier={this.findEarlierTrips}
      onShowLater={this.findLaterTrips}
    />
  )

  private handleDatetimeChange = (date: Date) => this.setState({
    date,
    now: false,
  });

  private handleLocationChange = (inputName: string, location: ICoordLocation) => this.setState({
    [inputName]: location,
  });

  private handleNowButtonClick = () => this.setState({ now: true });

  private switchLocations = () => {
    this.setState(prevState => ({
      dest: prevState.origin,
      origin: prevState.dest,
    }));
  }

  private handleSearch = () => this.search(this.state.now ? new Date() : this.state.date)

  private async search(date?: Date) {
    date = date || this.state.date;

    this.setState({
      error: '',
      searching: true,
      trips: [],
    });

    localStorage.setItem('trips', JSON.stringify([]));

    try {
      const token = await this.auth.getToken();
      this.parseResponse(await searchTrip(token, this.state.origin, this.state.dest, date));
    } catch {
      this.parseError('Någonting gick snett.');
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
    const trips = list(tripList.Trip);

    for (const trip of trips) {
      trip.Leg = list(trip.Leg);
      for (const leg of trip.Leg) {
        if (leg.Origin.Notes) {
          leg.Origin.Notes.Note = list(leg.Origin.Notes.Note);
        }
        if (leg.Destination.Notes) {
          leg.Destination.Notes.Note = list(leg.Destination.Notes.Note);
        }
      }
    }

    this.setState({
      searching: false,
      trips,
    });

    localStorage.setItem('trips', JSON.stringify(trips));
  }

  private findEarlierTrips = () => this.setState({ date: addMinutes(this.state.date, -30) }, this.search);
  private findLaterTrips = () => this.setState({ date: addMinutes(this.state.date, 30) }, this.search);
}
