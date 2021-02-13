import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from '@material-ui/core';
import { debounce } from 'lodash';
import { Link } from 'react-router-dom';
import createSEOTitle from '../Helpers/seo';
import {
  CLOSE_SEARCH_BAR,
  OPEN_SEARCH_BAR,
  UPDATE_SEARCH_RESULTS,
} from '../store/actions/actions';
import {
  PRIMARY_FOCUS,
  PRIMARY_OUTLINE,
  SECONDARY_BLACK,
  WHITE,
} from '../constants';
import axios from '../axios';

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

const Poster = styled.img`
  width:100px;
`;

export default () => {
  const search = useSelector((state) => state.search);
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

  return (
    <div style={{ width: '90%', margin: '80px auto 0 auto' }}>
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
      <div style={{ width: '90%', margin: '0 auto' }}>
        {search.movies.length > 0 && <h1>Movies</h1>}
        {search.movies.map((movie) => (
          <Link to={`/entity/${movie.bingy_id}/${createSEOTitle(movie.title)}`}>
            <Card style={{ marginBottom: '1em' }}>
              <div style={{ display: 'flex' }}>
                <Poster src={movie.poster} />
                <p style={{ paddingLeft: '1em' }}>
                  <h2>{movie.title}</h2>
                  <p style={{ color: 'white' }}>{movie.original_release_year}</p>
                </p>
              </div>
            </Card>

          </Link>
        ))}
        {search.shows.length > 0 && <h1>Shows</h1>}
        {search.shows.map((show) => (
          <Link to={`/entity/${show.bingy_id}/${createSEOTitle(show.title)}`}>
            <Card style={{ marginBottom: '1em' }}>
              <div style={{ display: 'flex' }}>
                <Poster src={show.poster} />
                <p style={{ paddingLeft: '1em' }}>
                  <h2>{show.title}</h2>
                  <p style={{ color: 'white' }}>{show.original_release_year}</p>
                </p>
              </div>
            </Card>

          </Link>
        ))}
      </div>
    </div>
  );
};
