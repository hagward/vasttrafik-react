import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTrips } from "../../api";
import { AppThunk } from "../../app/store";
import { list } from "../../util";

interface TripsState {
  trips: Trip[];
  loading: boolean;
  error: string | null;
}

export interface Trip {
  Leg: Leg[];
}

export interface Leg {
  Origin: Location;
  Destination: Location;
  direction: string;
  name: string;
  sname: string;
  fgColor: string;
  bgColor: string;
  type: string;
}

export interface Location {
  date: string;
  name: string;
  Notes?: { Note: Note[] };
  rtDate?: string;
  rtTime?: string;
  time: string;
  track?: string;
}

interface Note {
  $: string;
  key: string;
  priority: string;
  severity: string;
}

export interface CoordLocation {
  id?: string;
  idx?: string;
  lat?: string;
  lon?: string;
  name: string;
}

export interface StopLocation extends CoordLocation {
  id: string;
}

const initialState: TripsState = {
  trips: [],
  loading: false,
  error: null,
};

const trips = createSlice({
  name: "trips",
  initialState,
  reducers: {
    clearTrips(state) {
      state.trips = [];
      state.loading = false;
      state.error = null;
    },
    getTripsStart(state) {
      state.loading = true;
      state.error = null;
    },
    getTripsSuccess(state, action: PayloadAction<Trip[]>) {
      state.trips = action.payload;
      state.loading = false;
      state.error = null;
    },
    getTripsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  clearTrips,
  getTripsStart,
  getTripsSuccess,
  getTripsFailure,
} = trips.actions;
export default trips.reducer;

export const fetchTrips = (
  origin: CoordLocation,
  dest: CoordLocation,
  date: Date
): AppThunk => async (dispatch) => {
  try {
    dispatch(getTripsStart());

    const tripsResponse = await getTrips(origin, dest, date);

    if (tripsResponse.TripList.error) {
      throw new Error(tripsResponse.TripList.error);
    }

    const trips = parseResponse(tripsResponse);
    dispatch(getTripsSuccess(trips));
  } catch (err) {
    dispatch(getTripsFailure(err));
  }
};

function parseResponse(response: any): Trip[] {
  const trips: any[] = list(response.TripList.Trip);

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

  return trips;
}
