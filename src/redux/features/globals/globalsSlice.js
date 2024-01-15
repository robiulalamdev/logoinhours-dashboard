import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  colors: { primary_color: "#F78C21", background_color: "#ffff" },
  logo: null,
};

const globalsSlice = createSlice({
  name: "Service slice",
  initialState,
  reducers: {
    setIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setColors: (state, action) => {
      state.colors = action.payload;
    },
    setLogo: (state, action) => {
      state.logo = action.payload;
    },
  },
});

export const { setIsOpen, setColors, setLogo } = globalsSlice.actions;

export default globalsSlice.reducer;
