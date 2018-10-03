import {
  ADD_EVENT_REQUEST,
  ADD_EVENT_SUCCESS,
  ADD_EVENT_FAILURE,
  ADD_EVENT_RESET,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_SUCCESS,
  EDIT_EVENT_REQUEST,
  EDIT_EVENT_SUCCESS,
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
    let oldEvents = state.events;
    let updatedEvents = oldEvents.concat(newEvent);
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
  if (action.type === DELETE_EVENT_REQUEST) {
    return Object.assign({}, state, {
      isLoading: true,
      errorMessage: ""
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
  if (action.type === DELETE_EVENT_REQUEST) {
    return Object.assign({}, state, {
      isLoading: true,
      errorMessage: ""
    });
  }
  if (action.type === DELETE_EVENT_SUCCESS) {
    let eventID = action.payload;
    let allEvents = state.events;
    let index = allEvents.findIndex(event => event.eventID == eventID);
    if (index !== -1) {
      allEvents.splice(index, 1);
    }
    return Object.assign({}, state, {
      isLoading: false,
      errorMessage: "",
      events: allEvents
    });
  }
  if (action.type === EDIT_EVENT_REQUEST) {
    return Object.assign({}, state, {
      isLoading: true,
      errorMessage: ""
    });
  }
  if (action.type === EDIT_EVENT_SUCCESS) {
    let eventData = action.payload;
    let oldEvents = state.events;

    let index = oldEvents.findIndex(
      event => event.eventID === eventData.eventID
    );

    oldEvents[index].eventName = eventData.eventName;
    oldEvents[index].eventDate = eventData.eventDate;
    oldEvents[index].eventDuration = eventData.eventDuration;
    oldEvents[index].evenLocation = eventData.evenLocation;
    oldEvents[index].eventDescription = eventData.eventDescription;
    oldEvents[index].eventFees = eventData.eventFees;
    oldEvents[index].eventMaxAllowedParticipants =
      eventData.eventMaxAllowedParticipants;
    oldEvents[index].eventTags = eventData.eventTags;

    return Object.assign({}, state, {
      isLoading: false,
      errorMessage: "",
      events: oldEvents
    });
  }
  return state;
};

export default events;
