import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/apiSlice";
import globalsReducer from "./features/globals/globalsSlice";
import homeReducer from "./features/home/homeSlice";

const store = configureStore({
  reducer: {
    global: globalsReducer,
    home: homeReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
