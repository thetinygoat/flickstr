import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import { Helmet } from "react-helmet";
import { Banner, Slider } from "../Components";
import { Api, Cache } from "../Helpers";
import { HOME_MOVIE_CACHE_KEY } from "../constants";

export default () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const cache = Cache.get(HOME_MOVIE_CACHE_KEY);
    if (cache && Cache.isValid(cache.exp)) {
      setMovies(cache.value);
    } else {
      Api.getHomeMovies().then(({ data }) => {
        const apiData = data.data.categories;
        setMovies(apiData);
        Cache.set(HOME_MOVIE_CACHE_KEY, apiData, 5);
      });
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>
          Flickstr | Discover and Track Your Favourite Movies and Shows
        </title>
        <meta
          name="description"
          content="Flickstr is a movie discovery platform that enables users to discover movie titles on various OTTs. movie discovery via recommendation, find similar movies, find a streaming platform"
        />
        <meta charSet="utf-8" />
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Banner type="movie" />
      <Container>
        {movies.length > 0 &&
          movies.map((movie) => (
            <Slider
              category={movie.name}
              items={movie.items}
              key={movie.name}
            />
          ))}
      </Container>
    </>
  );
};
