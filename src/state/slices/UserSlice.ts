import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfile } from "@types";

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
    updateUserProfile: (_state, action: PayloadAction<UserProfile>) =>
      action.payload,
  },
});

export const { resetUserProfile, updateUserProfile } = userSlice.actions;
export default userSlice.reducer;
