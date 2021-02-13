import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import TheatersIcon from '@material-ui/icons/Theaters';
import TvIcon from '@material-ui/icons/Tv';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { withRouter } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'reset',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));

function SimpleBottomNavigation(props) {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);
  const map = {
    0: '/',
    1: '/search',
    2: '/me',
  };
  const reverseMap = {
    '/': 0,
    '/search': 1,
    '/me': 2,
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
    const route = map[newValue];
    props.history.push(route);
  };
  useEffect(() => {
  }, [props.match]);
  const getCurrentActiveFromRoute = (route) => reverseMap[route];
  useEffect(() => {
    setValue(getCurrentActiveFromRoute(props.location.pathname));
    props.history.push(props.location.pathname);
  }, []);
  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        handleChange(event, newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Home" icon={<TheatersIcon />} />
      {/* <BottomNavigationAction label="Shows" icon={<TvIcon />} /> */}
      <BottomNavigationAction label="Search" icon={<SearchIcon />} />
      <BottomNavigationAction label="Account" icon={<AccountCircleIcon />} />
    </BottomNavigation>
  );
}

export default withRouter(SimpleBottomNavigation);
