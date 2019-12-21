import React from "react";
import FontAwesome from "react-fontawesome";
import "./Input.css";

interface Props {
  className?: string;
  icon: string;
  placeholder?: string;
  readOnly?: boolean;
  type: string;
  value: string;
  onChange?(event: React.FormEvent<HTMLInputElement>): any;
  onFocus?(event: React.FocusEvent<HTMLInputElement>): any;
}

export const Input = (props: Props) => {
  return (
    <div className="input">
      <FontAwesome name={props.icon} />
      <input className="input__input" {...props} />
    </div>
  );
};
