import { push } from "connected-react-router";
import { store } from "../store";
import {
  ADD_EVENT_REQUEST,
  ADD_EVENT_SUCCESS,
  ADD_EVENT_FAILURE,
  ADD_EVENT_RESET
} from "./index";

export const requestAddEvent = eventData => ({
  type: ADD_EVENT_REQUEST,
  isLoading: true,
  payload: eventData
});

export const receiveAddEvent = eventData => ({
  type: ADD_EVENT_SUCCESS,
  isLoading: false,
  payload: eventData
});

export const addEventError = message => ({
  isLoading: false,
  type: ADD_EVENT_FAILURE,
  payload: message
});

export const resetMessages = () => ({
  isLoading: false,
  type: ADD_EVENT_RESET
});

export function addEvent(eventData) {
  console.log(eventData);
  return dispatch => {
    dispatch(requestAddEvent(eventData));
    setTimeout(() => {
      dispatch(receiveAddEvent(eventData));
    }, 1000);
    setTimeout(() => {
      dispatch(resetMessages());
      dispatch(push("/"));
    }, 3000);
  };
}
