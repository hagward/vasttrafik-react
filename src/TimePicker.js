import React, { Component } from 'react';
import Icon from 'react-geomicons';
import './TimePicker.css';

class TimePicker extends Component {
  render() {
    return (
      <div className="time-picker">
        <div className="time-picker__icon">
          <Icon name="clock" />
        </div>
        <input className="time-picker__input" type="time" value={this.props.value} onChange={this.props.onChange} />
      </div>
    );
  }
}

export default TimePicker;
