import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import './DatePicker.css';

export default class DatePicker extends Component {
  render() {
    return (
      <div className="date-picker">
        <FontAwesome name="calendar" />
        <input className="date-picker__input" type="date" value={this.props.value} onChange={this.props.onChange} />
      </div>
    );
  }
}