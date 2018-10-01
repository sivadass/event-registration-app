import { push } from "connected-react-router";
import { store } from "../store";

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_USER
} from "./index";

export const requestLogin = credentials => ({
  type: LOGIN_REQUEST,
  isLoading: true,
  isAuthenticated: false,
  payload: credentials
});

export const receiveLogin = userData => ({
  type: LOGIN_SUCCESS,
  isLoading: false,
  isAuthenticated: true,
  payload: userData
});

export const loginError = message => ({
  isLoading: false,
  isAuthenticated: false,
  type: LOGIN_FAILURE,
  payload: message
});

export const logout = () => ({
  type: LOGOUT_USER,
  isAuthenticated: false
});

export function loginUser(credentials) {
  return dispatch => {
    dispatch(requestLogin(credentials));
    let users = store.getState().users.users;
    let index = users.findIndex(user => user.email == credentials.email);
    if (index !== -1 && users[index].password == credentials.password) {
      let userData = users[index];
      setTimeout(() => {
        dispatch(receiveLogin(userData));
        dispatch(push("/"));
      }, 1000);
    } else {
      setTimeout(() => {
        let message = "Invalid username or password!";
        dispatch(loginError(message));
      }, 1000);
      setTimeout(() => {
        let message = "";
        dispatch(loginError(message));
      }, 11000);
    }
  };
}

export function logoutUser() {
  return dispatch => {
    dispatch(logout());
    dispatch(push("/login"));
  };
}
