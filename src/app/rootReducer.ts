import { combineReducers } from "@reduxjs/toolkit";
import tripsReducer from "../features/trips/tripsSlice";

const rootReducer = combineReducers({
  trips: tripsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
