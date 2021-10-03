import { configureStore } from "@reduxjs/toolkit";
import walletReducer from "./walletReducer";

export default configureStore({
  reducer: {
    wallet: walletReducer,
  },
});
