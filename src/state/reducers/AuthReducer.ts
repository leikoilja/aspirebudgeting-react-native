import { AnyAction } from "redux";
import { UPDATE_GOOGLE_ACCESS_TOKEN_EXPIRY } from "@actions/AuthActions";
import { RESET_GOOGLE_ACCESS_TOKEN_EXPIRY_TIME } from "@actions/AuthActions";

const INITIAL_STATE = {
  // expiry time is only greater then zero when both
  // accessToken and refreshToken are fetched and secure stored
  accessTokenExpiryTimeUnix: 0,
};

const authReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case UPDATE_GOOGLE_ACCESS_TOKEN_EXPIRY:
      return { accessTokenExpiryTimeUnix: action.accessTokenExpiryTimeUnix };
    case RESET_GOOGLE_ACCESS_TOKEN_EXPIRY_TIME:
      return { accessTokenExpiryTimeUnix: 0 };
    default:
      return state;
  }
};

export default authReducer;
