import { AnyAction } from "redux";
import { UPDATE_USER_PROFILE } from "@actions/UserActions";
import { UserProfile } from "@types";

const INITIAL_STATE: UserProfile = {
  email: "",
  firstName: "",
  lastName: "",
  language: "en",
};

const userReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case UPDATE_USER_PROFILE:
      return { ...action.userProfile };
    default:
      return state;
  }
};

export default userReducer;
