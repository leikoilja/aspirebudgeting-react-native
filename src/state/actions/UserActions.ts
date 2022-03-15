import { UserProfile } from "@types";

export const UPDATE_USER_PROFILE = "UPDATE_USER_PROFILE";
export const RESET_USER_PROFILE = "RESET_USER_PROFILE";

export const updateUserProfile = (userProfile: UserProfile) => ({
  type: UPDATE_USER_PROFILE,
  userProfile,
});

export const resetUserProfile = () => ({
  type: RESET_USER_PROFILE,
});
