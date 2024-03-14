import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import toggleSlice from "./features/toggleSlice";
// ...

export const store = configureStore({
  reducer: {
    toggle: toggleSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
