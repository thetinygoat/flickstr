import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ShowBanner from '../Assets/Img/show-banner.webp';
import MovieBanner from '../Assets/Img/movie-banner.webp';

const useStyles = makeStyles((theme) => ({
  root: {
    background: `linear-gradient(
    60deg,
    rgba(48, 89, 91, 1) 0%,
    rgba(21, 38, 39, 1) 70%,
    rgba(7, 12, 12, 1) 100%
)`,
    paddingBottom: '2em',
    marginTop: '73.72px',
  },
  bannerImg: {
    width: '100px',
    minWidth: 300,
  },
  tagline: {
    marginTop: '1em',
  },
  secondaryText: {
    color: 'grey',
  },
}));
export default function Banner({ type }) {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const src = type === 'show' ? ShowBanner : MovieBanner;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <Grid container>
          <Grid item s={12} md={6}>
            <img
              src={src}
              className={classes.bannerImg}
              height="300px"
              width="300px"
              alt="banner"
            />
          </Grid>
          <Grid item s={12} md={6}>
            <Typography variant="h4" className={classes.tagline} gutterBottom>
              <strong>All your streaming services in one place.</strong>
            </Typography>
            <Typography
              gutterBottom
              className={classes.secondaryText}
              variant="subtitle1"
            >
              Browse, search, and watch TV & Movies from Netflix, Prime Video,
              Free Services and more!
            </Typography>
            <Box>
              {isLoggedIn && (
              <Link to="/me">
                <Button color="secondary" variant="contained">
                  Go to your library
                </Button>

              </Link>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
