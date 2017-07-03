import React, { Component } from 'react';
import Auth from './Auth';
import LocalStorage from './LocalStorage';
import LocationInput from './LocationInput';
import searching from './searching.svg';
import switchLocations from './switch-locations.svg';
import './Search.css';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      originId: LocalStorage.getItem('originId') || '',
      originName: LocalStorage.getItem('originName') || '',
      destId: LocalStorage.getItem('destId') || '',
      destName: LocalStorage.getItem('destName') || '',
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
              <div className="trip__origin-time">{this.first(trip.Leg).Origin.time}</div>
              {trip.Leg.map((leg, legIndex) =>
                <div className="trip__leg-name" key={legIndex} style={{backgroundColor: leg.fgColor, color: leg.bgColor}}>
                  {leg.sname ? leg.sname : 'Gå'}
                </div>
              )}
              <div className="trip__dest-time">{this.last(trip.Leg).Destination.time}</div>
            </li>
          )}
        </ul>
      </div>
    )
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

    Auth.getToken().then(token => {
      const url = 'https://api.vasttrafik.se/bin/rest.exe/v2/trip?format=json' +
                  '&originId=' + encodeURIComponent(this.state.originId) +
                  '&destId=' + encodeURIComponent(this.state.destId);
                    // + '&date=' + encodeURIComponent(options.date)
                    // + '&time=' + encodeURIComponent(options.time)

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
    LocalStorage.setItem('originId', this.state.originId);
    LocalStorage.setItem('originName', this.state.originName);
    LocalStorage.setItem('destId', this.state.destId);
    LocalStorage.setItem('destName', this.state.destName);
  }

  parseTrips(response) {
    const json = JSON.parse(response);

    console.log(json);

    if (json.TripList.error) {
      console.error(json.TripList.errorText);
      return [];
    }

    const trips = this.list(json.TripList.Trip);

    for (let i = 0; i < trips.length; i++) {
      trips[i].Leg = this.list(trips[i].Leg);
    }

    return trips;
  }

  list(object) {
    return Array.isArray(object) ? object : [object];
  }

  first(array) {
    return array[0];
  }

  last(array) {
    return array[array.length - 1];
  }

  shortLocation(locationName) {
    return locationName.split(',')[0];
  }
}

export default Search;
