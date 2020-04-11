import classnames from "classnames";
import React, { useState } from "react";
import { CoordLocation } from "../features/trips/tripsSlice";
import { Location } from "./Location";
import styles from "./LocationInput.module.css";
import { LocationSearch } from "./LocationSearch";
import { Modal } from "./Modal";

interface Props {
  disabled: boolean;
  selected: CoordLocation;
  onSelect(location: CoordLocation): any;
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

  function handleSelect(location: CoordLocation) {
    setOverlay(false);
    onSelect(location);
  }

  return (
    <div className={styles.wrapper}>
      {overlay && renderOverlay()}
      {name && <Location name={name} />}
      <input
        type="text"
        className={classnames(styles.fakeInput, { [styles.static]: !name })}
        onFocus={handleFocus}
        placeholder={!name ? "Hållplats" : ""}
      />
    </div>
  );
};
