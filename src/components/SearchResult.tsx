import React from "react";
import { ITrip } from "../api";
import "./SearchResult.css";
import TripList from "./TripList";

interface IProps {
  trips: ITrip[];
  onShowEarlier(): void;
  onShowLater(): void;
}

export default function SearchResult(props: IProps) {
  return (
    <div className="search-result">
      <div className="search-result__trips">
        <TripList trips={props.trips} />
        <div className="search-result__earlier-later">
          <button
            className="earlier-later__button"
            onClick={props.onShowEarlier}
          >
            Tidigare
          </button>
          <button className="earlier-later__button" onClick={props.onShowLater}>
            Senare
          </button>
        </div>
      </div>
    </div>
  );
}
