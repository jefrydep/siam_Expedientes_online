import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const ideEjeSlice = createSlice({
  name: "ide_eje",
  initialState: {
    ...initialState,
  },
  reducers: {
    setIdeEje: (state, action) => {
      state.value = action.payload;
      localStorage.setItem("ide_eje", JSON.stringify(state.value));
    },
  },
});

export const { setIdeEje } = ideEjeSlice.actions;
