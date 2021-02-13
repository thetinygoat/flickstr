import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import cookie from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationBar, BottomNavigation } from './Components';
import StarProfile from './Pages/StarProfile';
import Movies from './Pages/Movies';
import Notification from './Components/Notification';
import { AUTH_SUCCESS, AUTH_FAILURE } from './store/actions/actions';
import Entity from './Pages/Entity';
import Fof from './Pages/404';
import Account from './Pages/Account';
import Login from './Pages/Login';
import Shows from './Pages/Shows';
import Search from './Pages/Search';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = cookie.get('accessToken');
    if (token !== undefined) {
      const displayName = cookie.get('displayName');
      const email = cookie.get('email');
      const photoURL = cookie.get('photoURL');
      const user = { displayName, email, photoURL };
      dispatch({ type: AUTH_SUCCESS, user, token });
    } else {
      dispatch({ type: AUTH_FAILURE, message: 'no token found' });
    }
  },[]);

  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <div style={{ marginBottom: '5em' }}>
      <NavigationBar />
      <Notification />
      <Switch>
        <Route path="/" exact component={Movies} />
        <Route path="/shows" exact component={Shows} />
        <Route path="/person/:id/:startName" component={StarProfile} />
        <Route path="/entity/:id" component={Entity} />
        <Route path="/login" component={Login} />
        <Route path="/search" component={Search} />
        {isLoggedIn ? <Route path="/me" component={Account} /> : <Redirect to="/login" />}
        <Route component={Fof} />
      </Switch>
      <BottomNavigation />
    </div>
  );
}

export default App;
