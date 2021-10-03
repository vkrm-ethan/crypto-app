import { createSlice } from "@reduxjs/toolkit";

export const walletReducer = createSlice({
  name: "wallet",
  initialState: {
    connector: null,
    walletConfiguration: {
      connector: null,
      fetching: false,
      connected: false,
      chainId: 1,
      showModal: false,
      pendingRequest: false,
      uri: "",
      accounts: [],
      address: "",
      result: null,
      assets: [],
    },
    value: 0,
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    saveConfiguration: (state, action) => {
      state.walletConfiguration = {
        ...state.walletConfiguration,
        ...action.payload,
      };
    },
    saveConnector: (state, action) => {
      state.connector = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  increment,
  decrement,
  incrementByAmount,
  saveConfiguration,
  saveConnector,
} = walletReducer.actions;

export default walletReducer.reducer;
