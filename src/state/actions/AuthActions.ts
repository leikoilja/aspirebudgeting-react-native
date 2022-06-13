export const UPDATE_GOOGLE_ACCESS_TOKEN_EXPIRY =
  "UPDATE_GOOGLE_ACCESS_TOKEN_EXPIRY";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const updateGoogleAccessTokenExpiry = (expiresIn: number) => ({
  type: UPDATE_GOOGLE_ACCESS_TOKEN_EXPIRY,
  expiresIn,
});

export const login = () => ({
  type: LOGIN,
});

export const logout = () => ({
  type: LOGOUT,
});
