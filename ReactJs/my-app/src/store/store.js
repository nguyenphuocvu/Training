import { configureStore } from "@reduxjs/toolkit";
import cityReducer from "./citySlice";

export const store = configureStore({
 reducer: {
    cities: cityReducer,
 }
});

export default store;
