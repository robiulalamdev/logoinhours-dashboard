import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  custom_logo: null,
};

const homeSlice = createSlice({
  name: "Service slice",
  initialState,
  reducers: {
    setCustom_logo: (state, action) => {
      state.custom_logo = action.payload;
    },
  },
});

export const { setCustom_logo } = homeSlice.actions;

export default homeSlice.reducer;
