import React, { Component } from 'react';
import Icon from 'react-geomicons';
import './DatePicker.css';

export default class DatePicker extends Component {
  render() {
    return (
      <div className="date-picker">
        <Icon name="calendar" />
        <input className="date-picker__input" type="date" value={this.props.value} onChange={this.props.onChange} />
      </div>
    );
  }
}
