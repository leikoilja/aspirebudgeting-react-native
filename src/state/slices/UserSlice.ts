import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  firstName: "",
  lastName: "",
  language: "en",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    resetUserProfile: () => initialState,
    updateUserProfile: (state, action: PayloadAction<string>) => action.payload,
  },
});

export const { resetUserProfile, updateUserProfile } = userSlice.actions;
export default userSlice.reducer;
