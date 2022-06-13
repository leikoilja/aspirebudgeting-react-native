import { AnyAction } from "redux";
import { UPDATE_GOOGLE_ACCESS_TOKEN_EXPIRY } from "@actions/AuthActions";
import { LOGIN, LOGOUT } from "@actions/AuthActions";

const INITIAL_STATE = {
  // expiry time is only greater then zero when both
  // accessToken and refreshToken are fetched and secure stored
  accessTokenExpiryTimeUnix: 0,
  loggedIn: false,
};

const authReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case UPDATE_GOOGLE_ACCESS_TOKEN_EXPIRY:
      const accessTokenExpiryTimeUnix =
        new Date().getTime() + action.expiresIn * 1000;
      return {
        ...state,
        accessTokenExpiryTimeUnix: accessTokenExpiryTimeUnix,
      };
    case LOGIN:
      return { ...state, loggedIn: true };
    case LOGOUT:
      return { accessTokenExpiryTimeUnix: 0, loggedIn: false };
    default:
      return state;
  }
};

export default authReducer;
