import React from 'react';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';
import {
  CLOSE_SEARCH_BAR,
  OPEN_SEARCH_BAR,
  UPDATE_SEARCH_RESULTS,
} from '../store/actions/actions';
import {
  PRIMARY_BG,
  PRIMARY_FOCUS,
  PRIMARY_OUTLINE,
  SECONDARY_BLACK,
  WHITE,
} from '../constants';
import axios from '../axios';

const Search = styled.form`
  display: inherit;
  align-items: center;
  flex-grow: 1;
  justify-content: space-between;
  padding: 0 10px 0 10px;
  max-width: 600px;
  @media (max-width: 599px) {
    display: none;
  }
`;
const SearchBar = styled.input`
  background-color: ${SECONDARY_BLACK};
  outline: none;
  padding: 10px;
  width: 100%;
  max-width: 600px;
  color: ${WHITE};
  border: 1px solid ${PRIMARY_OUTLINE};
  :focus {
    border: 1px solid ${PRIMARY_FOCUS};
  }
`;
const SearchBtn = styled.button`
  background-color: ${PRIMARY_OUTLINE};
  color: ${PRIMARY_BG};
  padding: 4px 6px 4px 6px;
  border-radius: 0;
  border: none;
  outline: none;
  border: 1px solid ${PRIMARY_OUTLINE};
  :focus {
    border: 1px solid ${PRIMARY_FOCUS};
  }
`;

export default () => {
  const dispatch = useDispatch();
  const debounceEvent = (...args) => {
    const debouncedEvent = debounce(...args);
    return (e) => {
      e.persist();
      return debouncedEvent(e);
    };
  };

  const handleQuery = async (e) => {
    if (e.target.value.trim() === '') {
      dispatch({
        type: UPDATE_SEARCH_RESULTS,
        movies: [],
        shows: [],
      });
      return;
    }
    dispatch({ type: OPEN_SEARCH_BAR });
    const response = await axios.get(
      `/search/autocomplete?q=${e.target.value.trim()}&&p=1`,
    );
    dispatch({
      type: UPDATE_SEARCH_RESULTS,
      movies: response.data.data.movies,
      shows: response.data.data.shows,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Search onSubmit={handleSubmit}>
      <SearchBar
        placeholder="Search"
        id="searchbar"
        onFocus={() => dispatch({ type: OPEN_SEARCH_BAR })}
        onBlur={() => {
          setTimeout(() => {
            dispatch({ type: CLOSE_SEARCH_BAR });
          }, 200);
        }}
        onChange={debounceEvent(handleQuery, 500)}
        autoComplete="off"
      />
      <SearchBtn>
        <SearchIcon />
      </SearchBtn>
    </Search>
  );
};
