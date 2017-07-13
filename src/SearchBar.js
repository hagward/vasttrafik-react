import React, { Component } from 'react';
import LocationInput from './LocationInput';
import switchLocations from './switch-locations.svg';
import './SearchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.localStorage = window && window.localStorage ? window.localStorage : {};

    this.state = {
      originId: this.localStorage['originId'] || '',
      originName: this.localStorage['originName'] || '',
      destId: this.localStorage['destId'] || '',
      destName: this.localStorage['destName'] || '',
      time: this.currentTime(),
      locationsSwitched: false
    };

    this.onOriginSelected = this.onOriginSelected.bind(this);
    this.onDestinationSelected = this.onDestinationSelected.bind(this);
    this.onTimeChanged = this.onTimeChanged.bind(this);
    this.switchLocations = this.switchLocations.bind(this);
    this.search = this.search.bind(this);
  }

  render() {
    return (
      <div className="search-bar">
        <div className={"search-bar__locations" + (this.state.locationsSwitched ? ' search-bar__locations--switched' : '')}>
          <LocationInput value={this.state.originName} placeholder="Från" onSelection={this.onOriginSelected} />
          <LocationInput value={this.state.destName} placeholder="Till" onSelection={this.onDestinationSelected} />
          <button className="search-bar__switch-locations" onClick={this.switchLocations}>
            <img src={switchLocations} alt="Switch origin and destination" />
          </button>
        </div>
        <div className="search-bar__settings">
          <input className="search-bar__time" type="time" value={this.state.time} onChange={this.onTimeChanged} />
          <button className="search-bar__search" onClick={this.search}>Sök</button>
        </div>
      </div>
    );
  }

  currentTime() {
    return new Date().toTimeString().substr(0, 5);
  }

  onOriginSelected(id, name) {
    this.onLocationSelected(id, name, true);
  }

  onDestinationSelected(id, name) {
    this.onLocationSelected(id, name, false);
  }

  onLocationSelected(id, name, origin) {
    this.setState(prevState => {
      origin = (origin && !prevState.locationsSwitched) || (!origin && prevState.locationsSwitched);
      const locationType = origin ? 'origin' : 'dest';
      const newState = {};
      newState[locationType + 'Id'] = id;
      newState[locationType + 'Name'] = name;
      return newState;
    });
  }

  switchLocations() {
    this.setState(prevState => ({
      locationsSwitched: !prevState.locationsSwitched,
      originId: prevState.destId,
      originName: prevState.destName,
      destId: prevState.originId,
      destName: prevState.originName
    }));
  }

  onTimeChanged(event) {
    this.setState({time: event.target.value});
  }

  search() {
    this.storeLocations();
    this.props.onSearch(this.state.originId, this.state.destId, this.state.time);
  }

  storeLocations() {
    this.localStorage['originId'] = this.state.originId;
    this.localStorage['originName'] = this.state.originName;
    this.localStorage['destId'] = this.state.destId;
    this.localStorage['destName'] = this.state.destName;
  }
}

export default SearchBar;
