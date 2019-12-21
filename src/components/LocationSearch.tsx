import React, { useEffect, useState } from "react";
import { ICoordLocation, IStopLocation, searchLocation } from "../api";
import Auth from "../Auth";
import useDebounce from "../hooks";
import MruCache from "../MruCache";
import settings from "../settings";
import { list, merge, removeDuplicates } from "../util";
import { LocationList } from "./LocationList";
import "./LocationSearch.css";
import { LocationSearchInput } from "./LocationSearchInput";

interface Props {
  onCancel(): void;
  onSelect(location: ICoordLocation): void;
}

export const LocationSearch = ({ onCancel, onSelect }: Props) => {
  const auth: Auth = new Auth(settings.key, settings.secret);
  const recentLocations: MruCache<IStopLocation> = new MruCache(10);

  const [locationState, setLocationState] = useState<ICoordLocation[]>(
    recentLocations.getMostRecentlyUsed()
  );
  const [searchValue, setSearchValue] = useState("");
  const [quickLocation, setQuickLocation] = useState<
    ICoordLocation | undefined
  >();

  const debouncedSearchValue = useDebounce(searchValue, 250);

  useEffect(() => {
    if (!debouncedSearchValue) {
      return;
    }

    auth.getToken().then(token => {
      searchLocation(token, debouncedSearchValue).then(response => {
        const coordLocations = list(response.LocationList.CoordLocation);
        const stopLocations = list(response.LocationList.StopLocation);
        const locations = merge(
          coordLocations,
          stopLocations,
          (a: ICoordLocation, b: ICoordLocation) =>
            Number(a.idx) - Number(b.idx)
        );
        setLocationState(locations);
      });
    });
  }, [auth, debouncedSearchValue]);

  function renderResults() {
    if (!locationState.length && !quickLocation) {
      return null;
    }

    const allLocations: ICoordLocation[] = quickLocation
      ? removeDuplicates(
          [quickLocation, ...locationState],
          location => location.id || location.name
        )
      : locationState;

    return (
      <div className="location-search__results">
        <LocationList locations={allLocations} onSelect={handleSelect} />
      </div>
    );
  }

  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    setSearchValue(value);
    setQuickLocation(recentLocations.getFirstMatch(value));

    if (!value) {
      showMostRecentlyUsed();
    }
  }

  function showMostRecentlyUsed() {
    setLocationState(recentLocations.getMostRecentlyUsed());
  }

  function handleCancel(event: React.MouseEvent<HTMLElement>) {
    event.stopPropagation();
    onCancel();
  }

  function handleSelect(location: ICoordLocation) {
    onSelect(location);
    if (location.id) {
      recentLocations.add(location as IStopLocation);
    }
  }

  return (
    <div className="location-search">
      <LocationSearchInput
        value={searchValue}
        onChange={handleChange}
        onCancel={handleCancel}
      />
      {renderResults()}
    </div>
  );
};
