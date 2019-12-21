import React, { useState } from "react";
import { ICoordLocation } from "../api";
import { Location } from "./Location";
import "./LocationInput.css";
import { LocationSearch } from "./LocationSearch";
import { Modal } from "./Modal";

interface Props {
  disabled: boolean;
  selected: ICoordLocation;
  onSelect(location: ICoordLocation): any;
}

export const LocationInput = ({ disabled, selected, onSelect }: Props) => {
  const [overlay, setOverlay] = useState(false);
  const name = selected.name;

  function renderOverlay() {
    return (
      <Modal>
        <LocationSearch onCancel={handleCancel} onSelect={handleSelect} />
      </Modal>
    );
  }

  function handleFocus() {
    setOverlay(true && !disabled);
  }

  function handleCancel() {
    setOverlay(false);
  }

  function handleSelect(location: ICoordLocation) {
    setOverlay(false);
    onSelect(location);
  }

  return (
    <div className="location-input">
      {overlay && renderOverlay()}
      {name && <Location name={name} />}
      <input
        type="text"
        className={
          "location-input__fake-input" +
          (!name ? " location-input__fake-input--static" : "")
        }
        onFocus={handleFocus}
        placeholder={!name ? "Hållplats" : ""}
      />
    </div>
  );
};
