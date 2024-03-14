import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
interface CounterState {
  isDark: boolean;
}

// Define the initial state using that type
const initialState: CounterState = {
  isDark: true,
};

export const toggleSlice = createSlice({
  name: "darkMode ",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggle: (state) => {
      state.isDark = !state.isDark;
    },
    // increment: (state) => {
    //   state.value += 1
    // },
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions

export const { toggle } = toggleSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default toggleSlice.reducer;
