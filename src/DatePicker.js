import React, { Component } from 'react';
import './DatePicker.css';

class DatePicker extends Component {
  render() {
    return (
      <input className="date-picker" type="date" value={this.props.value} onChange={this.props.onChange} />
    );
  }
}

export default DatePicker;
