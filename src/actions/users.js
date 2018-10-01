import { push } from "connected-react-router";
import { store } from "../store";
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_RESET_MESSAGES
} from "./index";

export const requestRegister = userData => ({
  type: REGISTER_REQUEST,
  isLoading: true,
  payload: userData
});

export const receiveRegister = userData => ({
  type: REGISTER_SUCCESS,
  isLoading: false,
  payload: userData
});

export const registerError = message => ({
  isLoading: false,
  type: REGISTER_FAILURE,
  payload: message
});

export const resetMessages = () => ({
  isLoading: false,
  type: REGISTER_RESET_MESSAGES
});

export function addUser(userData) {
  return dispatch => {
    dispatch(requestRegister(userData));

    let users = store.getState().users.users;
    let index = users.findIndex(user => user.email == userData.email);
    if (index === -1) {
      setTimeout(() => {
        dispatch(receiveRegister(userData));
      }, 1000);
      setTimeout(() => {
        dispatch(resetMessages());
        dispatch(push("/login"));
      }, 11000);
    } else {
      setTimeout(() => {
        dispatch(registerError("Sorry, email already exists!"));
      }, 1000);
      setTimeout(() => {
        dispatch(resetMessages());
      }, 11000);
    }
  };
}
