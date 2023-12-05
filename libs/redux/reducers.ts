import { combineReducers } from "@reduxjs/toolkit";
import { api } from "./api";
import evaluationReducer from "./slices/evaluationSlice";
import globalReducer from "./slices/globalSlice";

export const reducers = combineReducers({
  evaluation: evaluationReducer,
  global: globalReducer,
  [api.reducerPath]: api.reducer,
});
