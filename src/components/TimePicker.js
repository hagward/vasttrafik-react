import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import './TimePicker.css';

export default class TimePicker extends Component {
  render() {
    return (
      <div className="time-picker">
        <FontAwesome name="clock-o" />
        <input className="time-picker__input" type="time" value={this.props.value} onChange={this.props.onChange} />
      </div>
    );
  }
}
