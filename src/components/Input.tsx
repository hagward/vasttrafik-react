import * as React from 'react';
import * as FontAwesome from 'react-fontawesome';
import './Input.css';

interface IProps {
  className?: string;
  icon: string;
  placeholder?: string;
  readOnly?: boolean;
  type: string;
  value: string;
  onChange?(event: React.FormEvent<HTMLInputElement>): any;
  onFocus?(event: React.FocusEvent<HTMLInputElement>): any;
}

export default class Input extends React.PureComponent<IProps> {
  public render() {
    return (
      <div className="input">
        <FontAwesome name={this.props.icon} />
        <input className="input__input" {...this.props} />
      </div>
    );
  }
}
