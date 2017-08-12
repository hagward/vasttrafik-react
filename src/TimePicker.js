import React, { Component } from 'react';
import './TimePicker.css';

class TimePicker extends Component {
  render() {
    return (
      <input className="time-picker" type="time" value={this.props.value} onChange={this.props.onChange} />
    );
  }
}

export default TimePicker;
