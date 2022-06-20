import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessTokenExpiryTimeUnix: 0,
    loggedIn: false,
  },
  reducers: {
    login: (state) => {
      state.loggedIn = true;
    },
    updateGoogleAccessTokenExpiry: (state, action: PayloadAction<string>) => {
      const accessTokenExpiryTimeUnix =
        new Date().getTime() + action.expiresIn * 1000;
      state.accessTokenExpiryTimeUnix = action.payload;
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
