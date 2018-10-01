import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_RESET_MESSAGES,
  LOGOUT_USER
} from "../actions";

const initialState = {
  users: [],
  isLoading: false
};

const users = (state = initialState, action) => {
  if (action.type === REGISTER_REQUEST) {
    return Object.assign({}, state, {
      isLoading: true,
      errorMessage: "",
      successMessage: ""
    });
  }
  if (action.type === REGISTER_SUCCESS) {
    let newUser = action.payload;
    let updatedUsers = [...state.users, newUser];
    return Object.assign({}, state, {
      isLoading: false,
      errorMessage: "",
      successMessage: "Account created successfully!",
      users: updatedUsers
    });
  }
  if (action.type === REGISTER_FAILURE) {
    let errorMessage = action.payload;
    return Object.assign({}, state, {
      isLoading: false,
      errorMessage: errorMessage,
      successMessage: ""
    });
  }
  if (action.type === REGISTER_RESET_MESSAGES) {
    return Object.assign({}, state, {
      isLoading: false,
      errorMessage: "",
      successMessage: ""
    });
  }
  if (action.type === LOGOUT_USER) {
    return Object.assign({}, state, {
      isLoading: false,
      users: state.users
    });
  }
  return state;
};

export default users;
