import { combineReducers } from "@reduxjs/toolkit";
import searchReducer from "../features/search/searchSlice";
import tripsReducer from "../features/trips/tripsSlice";

const rootReducer = combineReducers({
  search: searchReducer,
  trips: tripsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
