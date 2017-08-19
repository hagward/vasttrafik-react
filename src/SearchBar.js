import React, { Component } from 'react';
import DatePicker from './DatePicker';
import LocationInput from './LocationInput';
import Icon from 'react-geomicons';
import TimePicker from './TimePicker';
import './SearchBar.css';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.localStorage = window && window.localStorage ? window.localStorage : {};

    const [date, time] = this.currentDateTime();

    this.state = {
      originId: this.localStorage['originId'] || '',
      originName: this.localStorage['originName'] || '',
      destId: this.localStorage['destId'] || '',
      destName: this.localStorage['destName'] || '',
      date: date,
      time: time,
      locationsSwitched: false
    };

    this.onOriginSelected = this.onOriginSelected.bind(this);
    this.onDestinationSelected = this.onDestinationSelected.bind(this);
    this.onDateChanged = this.onDateChanged.bind(this);
    this.onTimeChanged = this.onTimeChanged.bind(this);
    this.switchLocations = this.switchLocations.bind(this);
    this.search = this.search.bind(this);
  }

  render() {
    return (
      <div className="search-bar">
	<div className="search-bar__locations">
	  <div className={"locations__inputs" + (this.state.locationsSwitched ? ' locations__inputs--switched' : '')}>
	    <LocationInput value={this.state.originName} onSelection={this.onOriginSelected} />
	    <LocationInput value={this.state.destName} onSelection={this.onDestinationSelected} />
	  </div>
	  <button className="locations__switch-locations" onClick={this.switchLocations}>
	    <Icon name="repost" />
	  </button>
	</div>
        <div className="search-bar__datetime">
          <DatePicker value={this.state.date} onChange={this.onDateChanged} />
          <TimePicker value={this.state.time} onChange={this.onTimeChanged} />
        </div>
        <button className="search-bar__search" onClick={this.search} disabled={this.props.searching}>
          {this.props.searching && <span>Söker...</span>}
          {!this.props.searching && <span>Sök</span>}
        </button>
      </div>
    );
  }

  currentDateTime() {
    // Remove seconds from 'yyyy-mm-dd hh:mm:ss' and split between date and time.
    return new Date().toLocaleString('sv-SE').substr(0, 16).split(' ');
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

  onDateChanged(event) {
    this.setState({date: event.target.value});
  }

  onTimeChanged(event) {
    this.setState({time: event.target.value});
  }

  search() {
    this.storeLocations();
    this.props.onSearch(this.state.originId, this.state.destId, this.state.date, this.state.time);
  }

  storeLocations() {
    this.localStorage['originId'] = this.state.originId;
    this.localStorage['originName'] = this.state.originName;
    this.localStorage['destId'] = this.state.destId;
    this.localStorage['destName'] = this.state.destName;
  }
}
