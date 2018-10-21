import * as React from 'react';
import { toDatetimeLocalString } from '../util';
import './DatetimeInput.css';
import Input from './Input';

interface IProps {
  date: Date;
  now: boolean;
  onChange(date: Date): void;
  onNowButtonClick(): void;
}

export default class DatetimeInput extends React.PureComponent<IProps> {
  public render() {
    const value = toDatetimeLocalString(this.props.date);
    return (
      <div className="datetime-input">
        <Input
          className="input__input"
          icon="calendar-alt"
          type="datetime-local"
          value={value}
          onChange={this.handleChange}
        />
        {this.props.now ? this.renderNowOverlay() : this.renderNowButton()}
      </div>
    );
  }

  private renderNowOverlay() {
    return (
      <div className="datetime-input__now-overlay">Avgår nu</div>
    );
  }

  private renderNowButton() {
    return (
      <button className="datetime-input__now-button" onClick={this.props.onNowButtonClick}>Nu</button>
    );
  }

  private handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    this.props.onChange(new Date(target.value));
  }
}
