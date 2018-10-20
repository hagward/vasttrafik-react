import * as React from 'react';
import './DatetimeInput.css';
import Input from './Input';

interface IProps {
  value: string;
  onChange(event: React.FormEvent<HTMLInputElement>): void;
}

export default class DatetimeInput extends React.PureComponent<IProps> {
  public render() {
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
