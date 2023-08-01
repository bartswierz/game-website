// USED TO CREATE THE STORE THAT HOLDS ALL STATES AND VARIABLES
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import authReducer from "./features/auth-slice";
import sidebarSlice from "./features/sidebar-slice";

export const store = configureStore({
  reducer: {
    authReducer,
    sidebarSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;