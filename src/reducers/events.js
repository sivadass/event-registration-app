import {
  ADD_EVENT_REQUEST,
  ADD_EVENT_SUCCESS,
  ADD_EVENT_FAILURE,
  ADD_EVENT_RESET,
  LOGOUT_USER
} from "../actions";

const initialState = {
  events: [],
  isLoading: false
};

const events = (state = initialState, action) => {
  if (action.type === ADD_EVENT_REQUEST) {
    return Object.assign({}, state, {
      isLoading: true,
      errorMessage: ""
    });
  }
  if (action.type === ADD_EVENT_SUCCESS) {
    let newEvent = action.payload;
    let updatedEvents = [...state.events, newEvent];
    return Object.assign({}, state, {
      isLoading: false,
      errorMessage: "",
      events: updatedEvents
    });
  }
  if (action.type === ADD_EVENT_FAILURE) {
    let errorMessage = action.payload;
    return Object.assign({}, state, {
      isLoading: false,
      errorMessage: errorMessage
    });
  }
  if (action.type === ADD_EVENT_RESET) {
    return Object.assign({}, state, {
      isLoading: false,
      errorMessage: ""
    });
  }
  if (action.type === LOGOUT_USER) {
    return Object.assign({}, state, {
      isLoading: false,
      events: state.events
    });
  }
  return state;
};

export default events;
