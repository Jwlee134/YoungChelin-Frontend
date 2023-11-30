import { combineReducers } from "@reduxjs/toolkit";
import { api } from "./api";
import evaluationReducer from "./slices/evaluationSlice";

export const reducers = combineReducers({
  evaluation: evaluationReducer,
  [api.reducerPath]: api.reducer,
});
