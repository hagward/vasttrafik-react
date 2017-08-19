import React, { Component } from 'react';
import Icon from 'react-geomicons';
import './TimePicker.css';

export default class TimePicker extends Component {
  render() {
    return (
      <div className="time-picker">
        <Icon name="clock" />
        <input className="time-picker__input" type="time" value={this.props.value} onChange={this.props.onChange} />
      </div>
    );
  }
}
