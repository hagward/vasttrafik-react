import { faBus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchBar } from "../components/SearchBar";
import { SearchResult } from "../components/SearchResult";
import {
  clearTrips,
  CoordLocation,
  fetchTrips,
} from "../features/trips/tripsSlice";
import { useLocalStorage } from "../hooks";
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

  const [originState, setOriginState] = useLocalStorage<CoordLocation>(
    "origin",
    { name: "" }
  );
  const [destState, setDestState] = useLocalStorage<CoordLocation>("dest", {
    name: "",
  });
  const [dateState, setDateState] = useState(new Date());
  const [nowState, setNowState] = useState(true);

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
        origin={originState}
        dest={destState}
        date={dateState}
        now={nowState}
        searching={tripsLoading}
        onDatetimeChange={handleDatetimeChange}
        onLocationChange={handleLocationChange}
        onLocationSwitch={switchLocations}
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
    setDateState(date);
    setNowState(false);
  }

  function handleLocationChange(inputName: string, location: CoordLocation) {
    switch (inputName) {
      case "dest":
        setDestState(location);
        break;
      case "origin":
        setOriginState(location);
        break;
      default:
        throw new Error("Unknown input name: " + inputName);
    }
  }

  function handleNowButtonClick() {
    setNowState(true);
  }

  function switchLocations() {
    const currentDest = destState;

    setDestState(originState);
    setOriginState(currentDest);
  }

  function handleSearch() {
    let date = dateState;

    if (nowState) {
      date = new Date();
      setDateState(date);
    }

    search(date);
  }

  function search(date?: Date) {
    dispatch(fetchTrips(originState, destState, date ?? dateState));
  }

  function findEarlierTrips() {
    const newDate = dayjs(dateState).subtract(20, "minute").toDate();
    setDateState(newDate);
    search(newDate);
  }

  function findLaterTrips() {
    const newDate = dayjs(dateState).add(20, "minute").toDate();
    setDateState(newDate);
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
