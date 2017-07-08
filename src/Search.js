import React, { Component } from 'react';
import Auth from './Auth';
import LocalStorage from './LocalStorage';
import LocationInput from './LocationInput';
import SearchResult from './SearchResult';
import Util from './Util';
import settings from './settings';
import searching from './searching.svg';
import switchLocations from './switch-locations.svg';
import './Search.css';

class Search extends Component {
  constructor(props) {
    super(props);

    this.localStorage = new LocalStorage();
    this.auth = new Auth(settings.key, settings.secret, this.localStorage);

    this.state = {
      originId: this.localStorage.getItem('originId') || '',
      originName: this.localStorage.getItem('originName') || '',
      destId: this.localStorage.getItem('destId') || '',
      destName: this.localStorage.getItem('destName') || '',
      originClassName: '',
      locationInputsSwitched: false,
      trips: [],
      searching: false
    };

    this.onOriginSelected = this.onOriginSelected.bind(this);
    this.onDestinationSelected = this.onDestinationSelected.bind(this);
    this.search = this.search.bind(this);
    this.switchLocations = this.switchLocations.bind(this);
  }

  render() {
    return (
      <div className="search">
        <div className="search__inputs">
          <div className={'search__input' + this.state.originClassName}>
            <LocationInput className="search__input-first" value={this.state.originName} placeholder="Från" onSelection={this.onOriginSelected} />
          </div>
          <div className="search__input">
            <LocationInput className="search__input-second" value={this.state.destName} placeholder="Till" onSelection={this.onDestinationSelected} />
          </div>
          <button className="search__switch-locations-button" onClick={this.switchLocations}>
            <img src={switchLocations} alt="Switch origin and destination" />
          </button>
        </div>
        <button className="search__search-button" onClick={this.search}>Sök</button>
        {this.state.searching &&
          <div className="search__searching">
            <img src={searching} alt="Searching" />
          </div>
        }
        <ul className="search__trips">
          {this.state.trips.map((trip, tripIndex) =>
            <li key={tripIndex} className="search__trip">
              <SearchResult trip={trip} />
            </li>
          )}
        </ul>
      </div>
    );
  }

  onOriginSelected(id, name) {
    const locationType = this.state.locationInputsSwitched ? 'dest' : 'origin';
    this.onLocationSelected(id, name, locationType);
  }

  onDestinationSelected(id, name) {
    const locationType = this.state.locationInputsSwitched ? 'origin' : 'dest';
    this.onLocationSelected(id, name, locationType);
  }

  onLocationSelected(id, name, locationType) {
    const newState = {};
    newState[locationType + 'Id'] = id;
    newState[locationType + 'Name'] = name;
    this.setState(newState);
  }

  switchLocations() {
    this.setState({
      originClassName: this.state.originClassName ? '' : ' search__input--switched',
      locationInputsSwitched: !this.state.locationInputsSwitched,
      originId: this.state.destId,
      originName: this.state.destName,
      destId: this.state.originId,
      destName: this.state.originName
    });
  }

  search() {
    if (this.state.originId === this.state.destId) {
      return;
    }

    this.setState({
      searching: true
    });

    this.storeLocations();

    this.auth.getToken().then(token => {
      const url = 'https://api.vasttrafik.se/bin/rest.exe/v2/trip?format=json' +
        '&originId=' + encodeURIComponent(this.state.originId) +
        '&destId=' + encodeURIComponent(this.state.destId);

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

  storeLocations() {
    this.localStorage.setItem('originId', this.state.originId);
    this.localStorage.setItem('originName', this.state.originName);
    this.localStorage.setItem('destId', this.state.destId);
    this.localStorage.setItem('destName', this.state.destName);
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

export default Search;
