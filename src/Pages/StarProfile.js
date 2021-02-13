import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Typography, Button, Avatar } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroll-component';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom';
import tomato from '../Assets/Img/rotten.png';
import imdb from '../Assets/Img/imdb.png';
import axios from '../axios';
import createSEOTitle from '../Helpers/seo';

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 3em 1em 1em 1em;
  display: flex;
  margin-top: 73.72px;
  justify-content: center;
  text-shadow: 0px 1px #212121;
  flex-direction: column;
`;
const RatingProvider = styled.img`
  height: 1.5em;
  margin-right: 0.5em;
`;
const RatingContainer = styled.span`
  display: flex;
  align-items: center;
  margin-right: 0.5em;
`;
const DescriptionConatiner = styled.div`
  height: 20;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  media: {
    height: 330,
  },
  large: {
    width: theme.spacing(30),
    height: theme.spacing(30),
  },
}));

export default ({ match }) => {
  const [data, setData] = useState([]);
  const [starProfile, setStarProfile] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreContent, setHasMoreContent] = useState(true);

  const classes = useStyles();
  const fetchContent = async () => {
    const response = await axios.get(
      `/movie/actor/${match.params.id}/${match.params.startName}/${currentPage}`,
    );
    if (response.data.data.movies.length === 0) setHasMoreContent(false);
    else {
      setStarProfile(response.data.data.profile);
      setData([...data, ...response.data.data.movies]);
    }
  };

  useEffect(() => {
    fetchContent();
  }, [currentPage]);

  return (
    <Container>
      {starProfile && (
        <Grid container spacing={3}>
          <Grid item lg={3} md={3} sm={12}>
            <Avatar
              alt={starProfile.name}
              src={starProfile.imageUrl}
              className={classes.large}
            />
          </Grid>
          <Grid item lg={9} md={9} sm={12}>
            <h1>
              {starProfile.name}
              {' '}
              Movies and TV Shows Streaming Online
            </h1>
          </Grid>
        </Grid>
      )}

      {data && data.length > 0 && (
        <InfiniteScroll
          dataLength={data.length} // This is important field to render the next data
          next={() => setCurrentPage(currentPage + 1)}
          hasMore={hasMoreContent}
          loader={<h4>Loading...</h4>}
          endMessage={(
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          )}
        >
          <div className={classes.root}>
            <Grid container spacing={3}>
              {data
                && data.map((movie) => (
                  <Grid item lg={3} md={3} sm={12}>
                    <Link to={`/entity/${movie.bingy_id}/${createSEOTitle(movie.title)}`}>
                      <Card className={classes.root}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            className={classes.media}
                            image={movie.poster}
                            title="Contemplative Reptile"
                            square
                          />

                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              {movie.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              <RatingContainer>
                                {movie.tomatoRating && (
                                <div>
                                  <RatingProvider src={tomato} />
                                  {`${movie.tomatoRating}%`}
                                </div>
                                )}
                                {movie.imdbRating && (
                                <div>
                                  <RatingProvider src={imdb} />
                                  {`${movie.imdbRating}/10`}
                                </div>
                                )}
                              </RatingContainer>
                              <DescriptionConatiner>
                                {movie.short_description
                                    && `${movie.short_description.slice(0, 90)
                                    } ... `}
                              </DescriptionConatiner>
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button size="small" color="primary">
                            Share
                          </Button>
                          <Button size="small" color="primary">
                            Learn More
                          </Button>
                        </CardActions>
                      </Card>
                    </Link>
                  </Grid>
                ))}
            </Grid>
          </div>
        </InfiniteScroll>
      )}
    </Container>
  );
};
