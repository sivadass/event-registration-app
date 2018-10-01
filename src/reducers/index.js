import { combineReducers } from "redux";
import auth from "./auth";
import users from "./users";
import events from "./events";

const appReducer = combineReducers({
  auth,
  users,
  events
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
