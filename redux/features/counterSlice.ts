import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 50,
};
export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    ...initialState,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      if (state.value <= 0) return;
      state.value -= 1;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

export const { increment, decrement, reset } = counterSlice.actions;

// export default counterSlice.reducer;
