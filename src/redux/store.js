import { configureStore } from "@reduxjs/toolkit";
// import { api } from "./api/apiSlice";
import globalsReducer from "./features/globals/globalsSlice";

const store = configureStore({
  reducer: {
    global: globalsReducer,
    // [api.reducerPath]: api.reducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(api.middleware),
});

export default store;
