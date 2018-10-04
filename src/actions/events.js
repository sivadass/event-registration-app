import { push } from "connected-react-router";
import { toast } from "react-toastify";
import { store } from "../store";
import {
  ADD_EVENT_REQUEST,
  ADD_EVENT_SUCCESS,
  ADD_EVENT_FAILURE,
  ADD_EVENT_RESET,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_SUCCESS,
  EDIT_EVENT_REQUEST,
  EDIT_EVENT_SUCCESS,
  RSVP_EVENT_REQUEST,
  RSVP_EVENT_SUCCESS
} from "./index";

export const requestAddEvent = () => ({
  type: ADD_EVENT_REQUEST,
  isLoading: true
});

export const receiveAddEvent = newEvent => ({
  type: ADD_EVENT_SUCCESS,
  isLoading: false,
  payload: newEvent
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

export const requestDeleteEvent = eventID => ({
  type: DELETE_EVENT_REQUEST,
  payload: eventID
});

export const receiveDeleteEvent = eventID => ({
  type: DELETE_EVENT_SUCCESS,
  payload: eventID
});

export const requestEditEvent = () => ({
  type: EDIT_EVENT_REQUEST
});

export const receiveEditEvent = eventData => ({
  type: EDIT_EVENT_SUCCESS,
  payload: eventData
});

export const requestRsvpEvent = () => ({
  type: RSVP_EVENT_REQUEST
});

export const receiveRsvpEvent = attendee => ({
  type: RSVP_EVENT_SUCCESS,
  payload: attendee
});

export function addEvent(newEvent) {
  console.log("after submit eventData :", newEvent.eventID);
  return dispatch => {
    dispatch(requestAddEvent());
    setTimeout(() => {
      dispatch(receiveAddEvent(newEvent));
      toast.success("Event added successfully!", {
        className: "custom-toast"
      });
      let newEventURL = `/events/${newEvent.eventID}/`;
      dispatch(push(newEventURL));
    }, 1000);
  };
}

export function deleteEvent(eventID) {
  console.log(eventID);
  return dispatch => {
    dispatch(requestDeleteEvent(eventID));
    setTimeout(() => {
      dispatch(receiveDeleteEvent(eventID));
      toast.success("Event deleted successfully!", {
        className: "custom-toast"
      });
      dispatch(push("/"));
    }, 1000);
  };
}

export function editEvent(eventData) {
  return dispatch => {
    dispatch(requestEditEvent());
    setTimeout(() => {
      dispatch(receiveEditEvent(eventData));
      toast.success("Event updated successfully!", {
        className: "custom-toast"
      });
    }, 1000);
  };
}

export function rsvpEvent(attendee) {
  return dispatch => {
    dispatch(requestRsvpEvent());
    setTimeout(() => {
      dispatch(receiveRsvpEvent(attendee));
      toast.success("RSVP completed successfully!", {
        className: "custom-toast"
      });
    }, 1000);
  };
}
