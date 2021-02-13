import { OPEN_NOTIFICATION, CLOSE_NOTIFICATION } from "../actions/actions";
const initialState = {
  notifOpen: false,
  message: "",
  notifType: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_NOTIFICATION:
      return {
        ...state,
        notifOpen: true,
        message: action.message,
        notifType: action.notifType
      };
    case CLOSE_NOTIFICATION:
      return { ...state, notifOpen: false };
    default:
      return state;
  }
};
