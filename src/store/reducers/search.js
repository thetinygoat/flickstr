import {
  OPEN_SEARCH_BAR,
  CLOSE_SEARCH_BAR,
  UPDATE_SEARCH_RESULTS,
} from '../actions/actions';

const initialState = {
  resultOpen: false,
  movies: [],
  shows: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_SEARCH_BAR:
      return { ...state, resultOpen: true };
    case CLOSE_SEARCH_BAR:
      return { ...state, resultOpen: false };
    case UPDATE_SEARCH_RESULTS:
      return { ...state, movies: action.movies, shows: action.shows };
    default:
      return state;
  }
};
