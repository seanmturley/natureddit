import { configureStore } from "@reduxjs/toolkit";

import { redditApi } from "./services/redditApi";

const store = configureStore({
  reducer: {
    [redditApi.reducerPath]: redditApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(redditApi.middleware)
});

export default store;
