import * as React from "react";
import { useState } from "react";
import { ICoordLocation, IStopLocation, searchLocation } from "../api";
import Auth from "../Auth";
import MruCache from "../MruCache";
import settings from "../settings";
import { debounce, list, merge, removeDuplicates } from "../util";
import LocationList from "./LocationList";
import "./LocationSearch.css";
import LocationSearchInput from "./LocationSearchInput";

interface IProps {
  onCancel(): any;
  onSelect(location: ICoordLocation): any;
}

export default function LocationSearch({ onCancel, onSelect }: IProps) {
  const auth: Auth = new Auth(settings.key, settings.secret);
  const recentLocations: MruCache<IStopLocation> = new MruCache(10);

  const [locationState, setLocationState] = useState(
    recentLocations.getMostRecentlyUsed()
  );
  const [searchValue, setSearchValue] = useState("");
  const [quickLocation, setQuickLocation] = useState(null);

  const autoComplete = debounce(async (input: string) => {
    const token = await auth.getToken();
    const response = await searchLocation(token, input);

    const coordLocations = list(response.LocationList.CoordLocation);
    const stopLocations = list(response.LocationList.StopLocation);
    const locations = merge(
      coordLocations,
      stopLocations,
      (a: ICoordLocation, b: ICoordLocation) => Number(a.idx) - Number(b.idx)
    );

    setLocationState(locations);
  }, 250);

  function renderResults() {
    if (!locationState.length && !quickLocation) {
      return null;
    }

    const allLocations = quickLocation
      ? removeDuplicates(
          [quickLocation, ...locationState],
          (location: any) => location.id || location.name
        )
      : locationState;

    return (
      <div className="location-search__results fade-in">
        <LocationList locations={allLocations} onSelect={handleSelect} />
      </div>
    );
  }

  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    setSearchValue(value);
    autoComplete.cancel();
    setQuickLocation(recentLocations.getFirstMatch(value) as any);

    if (value) {
      autoComplete(value);
    } else {
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
}
