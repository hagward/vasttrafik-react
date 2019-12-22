import React from "react";
import FontAwesome from "react-fontawesome";
import styles from "./Input.module.css";

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
    <div className={styles.wrapper}>
      <FontAwesome name={props.icon} className={styles.inputIcon} />
      <input className={styles.input} {...props} />
    </div>
  );
};
