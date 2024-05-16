import { configureStore } from "@reduxjs/toolkit";
import requestSlice from "./slice/requestSlice.js";

const store = configureStore({
  reducer: {
    requestApi: requestSlice,
  },
});

export default store;
