export const UPDATE_GOOGLE_ACCESS_TOKEN_EXPIRY =
  "UPDATE_GOOGLE_ACCESS_TOKEN_EXPIRY";
export const RESET_GOOGLE_ACCESS_TOKEN_EXPIRY_TIME =
  "RESET_GOOGLE_ACCESS_TOKEN_EXPIRY_TIME";

export const updateGoogleAccessTokenExpiry = (expiresIn: number) => ({
  type: UPDATE_GOOGLE_ACCESS_TOKEN_EXPIRY,
  expiresIn,
});

export const resetAccessTokenExpiryTime = () => ({
  type: RESET_GOOGLE_ACCESS_TOKEN_EXPIRY_TIME,
});
