import { faExchangeAlt, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";
import React from "react";
import { CoordLocation, LocationName } from "../features/search/searchSlice";
import { DatetimeInput } from "./DatetimeInput";
import { LocationInput } from "./LocationInput";
import styles from "./SearchBar.module.css";

interface Props {
  origin: CoordLocation;
  destination: CoordLocation;
  date: Date;
  now: boolean;
  searching: boolean;
  onDatetimeChange(date: Date): any;
  onLocationChange(inputName: LocationName, location: CoordLocation): any;
  onLocationSwitch(): any;
  onNowButtonClick(): void;
  onSearch(): any;
}

export const SearchBar = ({
  origin,
  destination,
  date,
  now,
  searching,
  onDatetimeChange,
  onLocationChange,
  onLocationSwitch,
  onNowButtonClick,
  onSearch,
}: Props) => {
  function onOriginSelected(location: CoordLocation) {
    onLocationChange("origin", location);
  }

  function onDestinationSelected(location: CoordLocation) {
    onLocationChange("destination", location);
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
            selected={destination}
            onSelect={onDestinationSelected}
          />
        </div>
        <button
          className={styles.switchLocationsButton}
          onClick={onLocationSwitch}
        >
          <FontAwesomeIcon
            className={styles.switchLocationsIcon}
            icon={faExchangeAlt}
            rotation={90}
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
        disabled={searching || !origin.name || !destination.name}
      >
        {searching ? (
          <span>
            Söker...
            <FontAwesomeIcon
              className={classnames(styles.spinnerIcon, "right-icon")}
              icon={faSpinner}
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
