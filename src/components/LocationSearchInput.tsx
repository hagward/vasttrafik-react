import React from "react";
import FontAwesome from "react-fontawesome";
import styles from "./LocationSearchInput.module.css";

interface Props {
  value: string;
  onChange(event: React.FormEvent<HTMLInputElement>): void;
  onCancel(event: React.MouseEvent<HTMLElement>): void;
}

export const LocationSearchInput = ({ value, onChange, onCancel }: Props) => {
  function focusInput(input: HTMLInputElement) {
    setTimeout(() => {
      if (input) {
        input.focus();
      }
    }, 0);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.icon}>
        <FontAwesome name="map-marker-alt" />
      </div>
      <input
        className={styles.input}
        placeholder="Station"
        ref={focusInput}
        type="text"
        value={value}
        onChange={onChange}
      />
      <button className={styles.cancelButton} onClick={onCancel}>
        Avbryt
      </button>
    </div>
  );
};
