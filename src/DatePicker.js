import React, { Component } from 'react';
import Icon from 'react-geomicons';
import './DatePicker.css';

class DatePicker extends Component {
  render() {
    return (
      <div className="date-picker">
        <div className="date-picker__icon">
          <Icon name="calendar" />
        </div>
        <input className="date-picker__input" type="date" value={this.props.value} onChange={this.props.onChange} />
      </div>
    );
  }
}

export default DatePicker;
