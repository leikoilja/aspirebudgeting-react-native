import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialState = {
  accessTokenExpiryTimeUnix: 0,
  loggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state) => {
      state.loggedIn = true;
    },
    updateGoogleAccessTokenExpiry: (state, action: PayloadAction<number>) => {
      const accessTokenExpiryTimeUnix =
        new Date().getTime() + action.payload * 1000;
      state.accessTokenExpiryTimeUnix = accessTokenExpiryTimeUnix;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.accessTokenExpiryTimeUnix = 0;
    },
  },
});

export const { updateGoogleAccessTokenExpiry, login, logout } =
  authSlice.actions;
export default authSlice.reducer;
