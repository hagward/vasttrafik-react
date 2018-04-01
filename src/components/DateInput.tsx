import * as React from 'react';
import Input from './Input';

interface Props {
  value: string;
  onChange(event: React.FormEvent<HTMLInputElement>): void;
}

export default class DateInput extends React.Component<Props, any> {
  render() {
    return (
      <Input
        icon="calendar-alt"
        type="date"
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
}
