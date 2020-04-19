import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  origin: CoordLocation;
  destination: CoordLocation;
  date: string;
  now: boolean;
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

export type LocationName = "origin" | "destination";

const initialState: SearchState = {
  origin: { name: "" },
  destination: { name: "" },
  date: new Date().toISOString(),
  now: true,
};

const search = createSlice({
  name: "search",
  initialState,
  reducers: {
    setDate(state, action: PayloadAction<{ date: string; now: boolean }>) {
      const { date, now } = action.payload;
      state.date = date;
      state.now = now;
    },
    setLocation(
      state,
      action: PayloadAction<{
        name: LocationName;
        location: CoordLocation;
      }>
    ) {
      const { name, location } = action.payload;
      state[name] = location;
    },
    switchLocations(state) {
      const origin = state.origin;
      state.origin = state.destination;
      state.destination = origin;
    },
  },
});

export const { setDate, setLocation, switchLocations } = search.actions;
export default search.reducer;
