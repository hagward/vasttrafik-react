import * as React from 'react';
import * as FontAwesome from 'react-fontawesome';
import './DatePicker.css';

interface Props {
  value: string;
  onChange(event: React.FormEvent<HTMLInputElement>): void;
}

export default class DatePicker extends React.Component<Props, any> {
  render() {
    return (
      <div className="date-picker">
        <FontAwesome name="calendar" />
        <input className="date-picker__input" type="date" value={this.props.value} onChange={this.props.onChange} />
      </div>
    );
  }
}
