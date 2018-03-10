import * as React from 'react';
import * as FontAwesome from 'react-fontawesome';
import './TimePicker.css';

interface Props {
  value: string;
  onChange(event: React.FormEvent<HTMLInputElement>): void;
}

export default class TimePicker extends React.Component<Props, any> {
  render() {
    return (
      <div className="time-picker">
        <FontAwesome name="clock-o" />
        <input className="time-picker__input" type="time" value={this.props.value} onChange={this.props.onChange} />
      </div>
    );
  }
}
