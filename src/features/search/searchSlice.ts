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
    setDate(state, action: PayloadAction<string>) {
      state.date = action.payload;
      state.now = false;
    },
    setNow(state) {
      state.date = new Date().toISOString();
      state.now = true;
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

export const { setDate, setNow, setLocation, switchLocations } = search.actions;
export default search.reducer;
