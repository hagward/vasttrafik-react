import * as React from 'react';
import Input from './Input';

interface Props {
  value: string;
  onChange(event: React.FormEvent<HTMLInputElement>): void;
}

export default class TimePicker extends React.Component<Props, any> {
  render() {
    return (
      <Input
        icon="clock-o"
        type="time"
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
}
