import * as React from "react";
import * as FontAwesome from "react-fontawesome";
import "./LocationSearchInput.css";

interface IProps {
  value: string;
  onChange(event: React.FormEvent<HTMLInputElement>): any;
  onCancel(event: React.MouseEvent<HTMLElement>): any;
}

export default function LocationSearchInput({
  value,
  onChange,
  onCancel
}: IProps) {
  function focusInput(input: HTMLInputElement) {
    setTimeout(() => {
      if (input) {
        input.focus();
      }
    }, 0);
  }

  return (
    <div className="location-search-input">
      <div className="location-search-input__icon">
        <FontAwesome name="map-marker-alt" />
      </div>
      <input
        className="location-search-input__input"
        placeholder="Station"
        ref={focusInput}
        type="text"
        value={value}
        onChange={onChange}
      />
      <button className="location-search-input__cancel" onClick={onCancel}>
        Avbryt
      </button>
    </div>
  );
}
