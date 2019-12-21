import classnames from "classnames";
import React from "react";
import FontAwesome from "react-fontawesome";
import { CoordLocation } from "../api";
import { DatetimeInput } from "./DatetimeInput";
import { LocationInput } from "./LocationInput";
import styles from "./SearchBar.module.css";

interface Props {
  origin: CoordLocation;
  dest: CoordLocation;
  date: Date;
  now: boolean;
  searching: boolean;
  onDatetimeChange(date: Date): any;
  onLocationChange(inputName: string, location: CoordLocation): any;
  onLocationSwitch(): any;
  onNowButtonClick(): void;
  onSearch(): any;
}

export const SearchBar = ({
  origin,
  dest,
  date,
  now,
  searching,
  onDatetimeChange,
  onLocationChange,
  onLocationSwitch,
  onNowButtonClick,
  onSearch
}: Props) => {
  function onOriginSelected(location: CoordLocation) {
    onLocationChange("origin", location);
  }

  function onDestinationSelected(location: CoordLocation) {
    onLocationChange("dest", location);
  }

  function search() {
    onSearch();
  }

  return (
    <div>
      <div className={styles.locations}>
        <div className={styles.inputs}>
          <LocationInput
            disabled={searching}
            selected={origin}
            onSelect={onOriginSelected}
          />
          <LocationInput
            disabled={searching}
            selected={dest}
            onSelect={onDestinationSelected}
          />
        </div>
        <button
          className={styles.switchLocationsButton}
          onClick={onLocationSwitch}
        >
          <FontAwesome
            name="exchange-alt"
            rotate={90}
            className={styles.switchLocationsIcon}
          />
        </button>
      </div>
      <div className={styles.datetime}>
        <DatetimeInput
          date={date}
          now={now}
          onChange={onDatetimeChange}
          onNowButtonClick={onNowButtonClick}
        />
      </div>
      <button
        className={styles.searchButton}
        onClick={search}
        disabled={searching}
      >
        {searching ? (
          <span>
            Söker...
            <FontAwesome
              className={classnames(styles.spinnerIcon, "right-icon")}
              name="spinner"
              spin={true}
            />
          </span>
        ) : (
          <span>Sök resa</span>
        )}
      </button>
    </div>
  );
};
