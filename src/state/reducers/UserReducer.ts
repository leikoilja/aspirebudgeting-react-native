import { AnyAction } from "redux";
import { UPDATE_USERNAME } from "@actions/UserActions";

const INITIAL_STATE = {
  username: "",
  language: "",
};

const userReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case UPDATE_USERNAME:
      return { username: action.username };
    default:
      return state;
  }
};

export default userReducer;
