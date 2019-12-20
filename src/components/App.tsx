import * as dayjs from "dayjs";
import * as React from "react";
import { useState } from "react";
import * as FontAwesome from "react-fontawesome";
import { ICoordLocation, searchTrip } from "../api";
import Auth from "../Auth";
import { useLocalStorage } from "../hooks";
import settings from "../settings";
import { list } from "../util";
import "./App.css";
import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";

function ErrorMessage(props: { error: string }) {
  return <div className="app__error">{props.error}</div>;
}

export default function App() {
  const auth: Auth = new Auth(settings.key, settings.secret);

  const [tripsState, setTripsState] = useLocalStorage("trips", []);
  const [originState, setOriginState] = useLocalStorage("origin", { name: "" });
  const [destState, setDestState] = useLocalStorage("dest", { name: "" });

  const [dateState, setDateState] = useState(new Date());
  const [errorState, setErrorState] = useState("");
  const [nowState, setNowState] = useState(true);
  const [searchingState, setSearchingState] = useState(false);

  function handleNavBarClick() {
    setErrorState("");
    setTripsState([]);
  }

  function renderMainContent() {
    if (errorState) {
      return <ErrorMessage error={errorState} />;
    } else if (tripsState.length) {
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
        searching={searchingState}
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
        trips={tripsState}
        onShowEarlier={findEarlierTrips}
        onShowLater={findLaterTrips}
      />
    );
  }

  function handleDatetimeChange(date: Date) {
    setDateState(date);
    setNowState(false);
  }

  function handleLocationChange(inputName: string, location: ICoordLocation) {
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
    search(nowState ? new Date() : dateState);
  }

  async function search(date?: Date) {
    date = date || dateState;

    setErrorState("");
    setSearchingState(true);
    setTripsState([]);

    try {
      const token = await auth.getToken();
      parseResponse(await searchTrip(token, originState, destState, date));
    } catch {
      parseError("Någonting gick snett.");
    }
  }

  function parseResponse(response: any): void {
    const tripList = response.TripList;
    if (tripList.error) {
      parseError("Inga resultat funna.");
    } else {
      parseTrips(tripList);
    }
  }

  function parseError(error: string): void {
    setErrorState(error);
    setSearchingState(false);
  }

  function parseTrips(tripList: any): void {
    const trips = list(tripList.Trip);

    for (const trip of trips) {
      trip.Leg = list(trip.Leg);
      for (const leg of trip.Leg) {
        if (leg.Origin.Notes) {
          leg.Origin.Notes.Note = list(leg.Origin.Notes.Note);
        }
        if (leg.Destination.Notes) {
          leg.Destination.Notes.Note = list(leg.Destination.Notes.Note);
        }
      }
    }

    setSearchingState(false);
    setTripsState(trips);
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
    <div className="app">
      <nav className="app__nav-bar">
        <a href="#" onClick={handleNavBarClick}>
          <FontAwesome name="bus" />
          Reaktiv Västtrafik
        </a>
      </nav>
      {renderMainContent()}
    </div>
  );
}
