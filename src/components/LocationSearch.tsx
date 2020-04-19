import React, { useEffect, useState } from "react";
import { searchLocation } from "../api";
import { CoordLocation, StopLocation } from "../features/search/searchSlice";
import useDebounce from "../hooks";
import MruCache from "../MruCache";
import { list, merge, removeDuplicates } from "../util";
import { LocationList } from "./LocationList";
import styles from "./LocationSearch.module.css";
import { LocationSearchInput } from "./LocationSearchInput";

interface Props {
  onCancel(): void;
  onSelect(location: CoordLocation): void;
}

export const LocationSearch = ({ onCancel, onSelect }: Props) => {
  const recentLocations: MruCache<StopLocation> = new MruCache(10);

  const [locationState, setLocationState] = useState<CoordLocation[]>(
    recentLocations.getMostRecentlyUsed()
  );
  const [searchValue, setSearchValue] = useState("");
  const [quickLocation, setQuickLocation] = useState<
    CoordLocation | undefined
  >();

  const debouncedSearchValue = useDebounce(searchValue, 250);

  useEffect(() => {
    if (!debouncedSearchValue) {
      return;
    }

    searchLocation(debouncedSearchValue).then((response) => {
      const coordLocations = list(response.LocationList.CoordLocation);
      const stopLocations = list(response.LocationList.StopLocation);
      const locations = merge(
        coordLocations,
        stopLocations,
        (a: CoordLocation, b: CoordLocation) => Number(a.idx) - Number(b.idx)
      );
      setLocationState(locations);
    });
  }, [debouncedSearchValue]);

  function renderResults() {
    if (!locationState.length && !quickLocation) {
      return null;
    }

    const allLocations: CoordLocation[] = quickLocation
      ? removeDuplicates(
          [quickLocation, ...locationState],
          (location) => location.id || location.name
        )
      : locationState;

    return (
      <div className={styles.results}>
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

  function handleSelect(location: CoordLocation) {
    onSelect(location);
    if (location.id) {
      recentLocations.add(location as StopLocation);
    }
  }

  return (
    <div className={styles.search}>
      <LocationSearchInput
        value={searchValue}
        onChange={handleChange}
        onCancel={handleCancel}
      />
      {renderResults()}
    </div>
  );
};
