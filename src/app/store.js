import { configureStore } from "@reduxjs/toolkit";

import filtersReducer from "../features/filters/filtersSlice";

import { redditApi } from "./redditApi";

const store = configureStore({
  reducer: {
    filters: filtersReducer,
    [redditApi.reducerPath]: redditApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(redditApi.middleware)
});

export default store;
