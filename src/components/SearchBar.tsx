import React from "react";
import FontAwesome from "react-fontawesome";
import { ICoordLocation } from "../api";
import { DatetimeInput } from "./DatetimeInput";
import { LocationInput } from "./LocationInput";
import "./SearchBar.css";

interface Props {
  origin: ICoordLocation;
  dest: ICoordLocation;
  date: Date;
  now: boolean;
  searching: boolean;
  onDatetimeChange(date: Date): any;
  onLocationChange(inputName: string, location: ICoordLocation): any;
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
  function onOriginSelected(location: ICoordLocation) {
    onLocationChange("origin", location);
  }

  function onDestinationSelected(location: ICoordLocation) {
    onLocationChange("dest", location);
  }

  function search() {
    onSearch();
  }

  return (
    <div className="search-bar">
      <div className="search-bar__locations">
        <div className="locations__inputs">
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
          className="locations__switch-locations"
          onClick={onLocationSwitch}
        >
          <FontAwesome name="exchange-alt" rotate={90} />
        </button>
      </div>
      <div className="search-bar__datetime">
        <DatetimeInput
          date={date}
          now={now}
          onChange={onDatetimeChange}
          onNowButtonClick={onNowButtonClick}
        />
      </div>
      <button
        className="search-bar__search"
        onClick={search}
        disabled={searching}
      >
        {searching ? (
          <span>
            Söker...
            <FontAwesome className="right-icon" name="spinner" spin={true} />
          </span>
        ) : (
          <span>Sök resa</span>
        )}
      </button>
    </div>
  );
};
