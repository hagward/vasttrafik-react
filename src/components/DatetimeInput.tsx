import * as React from 'react';
import Input from './Input';
import './DatetimeInput.css';

interface Props {
  value: string;
  onChange(event: React.FormEvent<HTMLInputElement>): void;
}

export default class DatetimeInput extends React.PureComponent<Props, any> {
  render() {
    return (
      <Input
        className="input__input datetime-input"
        icon="calendar-alt"
        type="datetime-local"
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
}
