import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./Input.module.css";

interface Props {
  className?: string;
  icon: IconProp;
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
      <FontAwesomeIcon className={styles.inputIcon} icon={props.icon} />
      <input className={styles.input} {...props} />
    </div>
  );
};
