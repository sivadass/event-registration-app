import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_USER
} from "../actions";

const initialState = {
  isLoading: false,
  isAuthenticated: false
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        isAuthenticated: action.isAuthenticated,
        errorMessage: "",
        user: {}
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        isAuthenticated: action.isAuthenticated,
        user: action.payload,
        errorMessage: ""
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        isAuthenticated: action.isAuthenticated,
        errorMessage: action.payload
      });
    case LOGOUT_USER:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        isAuthenticated: action.isAuthenticated,
        user: {}
      });
    default:
      return state;
  }
};

export default auth;
