import React from "react";
import { Trip } from "../api";
import styles from "./SearchResult.module.css";
import { TripList } from "./TripList";

interface Props {
  trips: Trip[];
  onShowEarlier(): void;
  onShowLater(): void;
}

export const SearchResult = (props: Props) => {
  return (
    <div>
      <TripList trips={props.trips} />
      <div className={styles.earlierLaterButtons}>
        <button
          className={styles.earlierLaterButton}
          onClick={props.onShowEarlier}
        >
          Tidigare
        </button>
        <button
          className={styles.earlierLaterButton}
          onClick={props.onShowLater}
        >
          Senare
        </button>
      </div>
    </div>
  );
};
