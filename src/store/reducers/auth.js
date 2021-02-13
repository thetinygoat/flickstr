import { AUTH_SUCCESS, AUTH_FAILURE, LOGOUT } from '../actions/actions';

const initalState = {
  user: null,
  token: null,
  isLoggedIn: false,
  isAuthFailed: false,
  isAuthSuccess: false,
  failureMessage: '',
};

export default (state = initalState, action) => {
  switch (action.type) {
    case AUTH_FAILURE:
      return { ...state, isAuthFailed: true, failureMessage: action.message };
    case AUTH_SUCCESS:
      return {
        ...state,
        isAuthSuccess: true,
        user: action.user,
        isLoggedIn: true,
        isAuthFailed: false,
        token: action.token,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthSuccess: false,
        isAuthFailed: false,
        user: null,
        isLoggedIn: false,
        token: false,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthSuccess: false,
        isAuthFailed: false,
        user: null,
        isLoggedIn: false,
        token: false,
      };
    default:
      return state;
  }
};
