import * as React from 'react';
import { toDatetimeLocalString } from '../util';
import './DatetimeInput.css';
import Input from './Input';

interface IProps {
  date: Date;
  onChange(date: Date): void;
}

export default class DatetimeInput extends React.PureComponent<IProps> {
  public render() {
    const value = toDatetimeLocalString(this.props.date);
    return (
      <Input
        className="input__input datetime-input"
        icon="calendar-alt"
        type="datetime-local"
        value={value}
        onChange={this.handleChange}
      />
    );
  }

  private handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    this.props.onChange(new Date(target.value));
  }
}
