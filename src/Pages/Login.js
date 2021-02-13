import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AuthButton from '../Components/AuthButton';

const Login = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <div style={{
      width: '90%', margin: 'auto', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', height: '100vh',
    }}
    >
      <AuthButton
        disabled={false}
        type="login"
        site="google"
        setDisabled={() => {}}
        close={() => {}}
      />
      <h3>OR</h3>
      <AuthButton
        disabled={false}
        type="signup"
        site="google"
        setDisabled={() => {}}
        close={() => {}}
      />
      {auth.isLoggedIn && <Redirect to="/me" />}
    </div>
  );
};

export default Login;
