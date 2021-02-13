import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import StarRatings from 'react-star-ratings';
import { Chip, Button } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import cookie from 'js-cookie';
import { LOGOUT, UPDATE_USER } from '../store/actions/actions';
import Slider from '../Components/RecommendationSlider';
import axios from '../axios';

const logOutTheme = createMuiTheme({
  palette: {
    primary: red,
  },
});

const Container = styled.div`
    width: 90%;
    margin: 73.72px auto auto auto;
    display:flex;
    flex-direction:column;
`;
const Img = styled.img`
    border-radius:50%;
    width:150px;
`;
const TopSection = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center
    padding: 1em;
    background:linear-gradient(
        60deg,
        rgba(48, 89, 91, 1) 0%,
        rgba(21, 38, 39, 1) 70%,
        rgba(7, 12, 12, 1) 100%
    );
    margin-top:73.72px
`;
const StatsSection = styled.div`
    display: flex;
    justify-content: space-between;
    text-align:center;
    width:50%;
    margin:auto
    @media (max-width:600px){
        width:90%
    }
`;
const Stat = styled.div`
    display:flex;
    flex-direction:column;
`;
const Account = () => {
  const { user } = useSelector((state) => state.auth);
  const userMeta = useSelector((state) => state.userData);
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();
  const handleLogout = () => {
    cookie.remove('displayName');
    cookie.remove('accessToken');
    cookie.remove('photoURL');
    cookie.remove('email');
    dispatch({ type: LOGOUT });
  };
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get('/user', {
        headers: {
          Authorization: cookie.get('accessToken'),
        },
      });
      setUserData(response.data.data.user);
      dispatch({
        type: UPDATE_USER, wishList: response.data.data.user.wishList, watchList: response.data.data.user.watchList,
      });
    };
    fetchUser();
  }, []);

  return (
    <>
      <TopSection>
        <Img src={user.photoURL} />
        <h1>
          {user.displayName}
          <Chip label={userMeta.title} style={{ marginLeft: '1em' }} />
        </h1>
        <StarRatings
          rating={userMeta.stars}
          starRatedColor="#FBBC05"
          numberOfStars={5}
          starDimension="25px"
          name="rating"
        />

      </TopSection>
      <Container>
        <StatsSection>
          <Stat>
            <h3>WATCHED MOVIES & SHOWS</h3>
            <h1>{userMeta && userMeta.watchList.length}</h1>
          </Stat>
          <Stat>
            <h3>WANT TO WATCH</h3>
            <h1>{userMeta && userMeta.wishList.length}</h1>
          </Stat>
        </StatsSection>
        <div>
          <Slider category="Want To Watch" items={userMeta == null ? [] : userMeta.wishList.slice(1)} />
        </div>
        <div>
          <Slider category="Already Watched" items={userMeta == null ? [] : userMeta.watchList} />
        </div>
        <ThemeProvider theme={logOutTheme}>
          <Button
            onClick={handleLogout}
            color="primary"
            variant="contained"
            size="large"
          >
            Log out
          </Button>
        </ThemeProvider>
      </Container>
    </>
  );
};

export default Account;
