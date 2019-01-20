import * as React from "react";
import * as FontAwesome from "react-fontawesome";
import "./Input.css";

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

export default function Input(props: IProps) {
  return (
    <div className="input">
      <FontAwesome name={props.icon} />
      <input className="input__input" {...props} />
    </div>
  );
}
