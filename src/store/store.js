import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice.js";
import themeReducer from "../features/themeSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
  },
});

export default store;
