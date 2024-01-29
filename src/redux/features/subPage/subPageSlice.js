import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const subPageSlice = createSlice({
  name: "sub Page slice",
  initialState,
  reducers: {
    // setCustom_logo: (state, action) => {
    //   state.custom_logo = action.payload;
    // },
  },
});

export const {} = subPageSlice.actions;

export default subPageSlice.reducer;
