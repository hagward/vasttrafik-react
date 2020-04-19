import { faBus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchBar } from "../components/SearchBar";
import { SearchResult } from "../components/SearchResult";
import {
  CoordLocation,
  LocationName,
  setDate,
  setLocation,
  setNow,
  switchLocations,
} from "../features/search/searchSlice";
import { clearTrips, fetchTrips } from "../features/trips/tripsSlice";
import styles from "./App.module.css";
import { RootState } from "./rootReducer";

const ErrorMessage = (props: { error: string }) => (
  <div className={styles.error}>{props.error}</div>
);

const App: React.FC = () => {
  const dispatch = useDispatch();

  const { tripsLoading, tripsError, trips } = useSelector(
    (state: RootState) => ({
      tripsLoading: state.trips.loading,
      tripsError: state.trips.error,
      trips: state.trips.trips,
    })
  );

  const {
    searchOrigin,
    searchDestination,
    searchDate,
    searchNow,
  } = useSelector((state: RootState) => ({
    searchOrigin: state.search.origin,
    searchDestination: state.search.destination,
    searchDate: new Date(state.search.date),
    searchNow: state.search.now,
  }));

  function handleNavBarClick() {
    dispatch(clearTrips());
  }

  function renderMainContent() {
    if (tripsError) {
      return <ErrorMessage error={tripsError} />;
    } else if (trips.length) {
      return renderSearchResult();
    } else {
      return renderSearchBar();
    }
  }

  function renderSearchBar() {
    return (
      <SearchBar
        origin={searchOrigin}
        dest={searchDestination}
        date={searchDate}
        now={searchNow}
        searching={tripsLoading}
        onDatetimeChange={handleDatetimeChange}
        onLocationChange={handleLocationChange}
        onLocationSwitch={handleSwitchLocations}
        onNowButtonClick={handleNowButtonClick}
        onSearch={handleSearch}
      />
    );
  }

  function renderSearchResult() {
    return (
      <SearchResult
        trips={trips}
        onShowEarlier={findEarlierTrips}
        onShowLater={findLaterTrips}
      />
    );
  }

  function handleDatetimeChange(date: Date) {
    dispatch(setDate(date.toISOString()));
  }

  function handleLocationChange(name: LocationName, location: CoordLocation) {
    dispatch(setLocation({ name, location }));
  }

  function handleNowButtonClick() {
    dispatch(setNow());
  }

  function handleSwitchLocations() {
    dispatch(switchLocations());
  }

  function handleSearch() {
    let date = searchDate;
    if (searchNow) {
      date = new Date();
      dispatch(setDate(date.toISOString()));
    }
    search(date);
  }

  function search(date: Date) {
    dispatch(fetchTrips(searchOrigin, searchDestination, date));
  }

  function findEarlierTrips() {
    searchAddMinutes(-20);
  }

  function findLaterTrips() {
    searchAddMinutes(20);
  }

  function searchAddMinutes(minutes: number) {
    const newDate = dayjs(searchDate).add(minutes, "minute").toDate();
    dispatch(setDate(newDate.toISOString()));
    search(newDate);
  }

  return (
    <React.StrictMode>
      <div className={styles.app}>
        <nav className={styles.navbar}>
          <button onClick={handleNavBarClick}>
            <FontAwesomeIcon className={styles.logo} icon={faBus} />
            Reaktiv Västtrafik
          </button>
        </nav>
        {renderMainContent()}
      </div>
    </React.StrictMode>
  );
};

export default App;
