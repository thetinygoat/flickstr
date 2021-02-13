import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { indigo, red } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import cookie from "js-cookie";
import { googleOAuth, fbOAuth } from "../firebase";
import { Auth } from "../Helpers";
import {
  AUTH_SUCCESS,
  AUTH_FAILURE,
  OPEN_NOTIFICATION,
} from "../store/actions/actions";

const fbTheme = createMuiTheme({
  palette: {
    primary: indigo,
  },
});
const googleTheme = createMuiTheme({
  palette: {
    primary: red,
  },
});

const AuthButton = ({ disabled, type, site, setDisabled, close }) => {
  const dispatch = useDispatch();
  const setupUser = async ({ displayName, photoURL, email }, token) => {
    const message = "Successfully logged in";
    cookie.set("displayName", displayName);
    cookie.set("photoURL", photoURL);
    cookie.set("email", email);
    cookie.set("accessToken", token);
    dispatch({
      type: AUTH_SUCCESS,
      token,
      user: { displayName, photoURL, email },
    });
    dispatch({
      type: OPEN_NOTIFICATION,
      message,
      notifType: "success",
    });
  };
  const checkIfUserExists = (data) => {
    console.log(data);
    if (data && data.data && data.data.statusCode === 409) {
      const message = `User with email ${data &&
        data.user.email} already exists`;
      dispatch({
        type: AUTH_FAILURE,
        message,
      });
      dispatch({
        type: OPEN_NOTIFICATION,
        message,
        notifType: "error",
      });
      return;
    }
    if (data && data.data && data.data.statusCode === 401) {
      const message = `User with email ${data &&
        data.user.email} does not exist`;
      dispatch({
        type: AUTH_FAILURE,
        message,
      });
      dispatch({
        type: OPEN_NOTIFICATION,
        message,
        notifType: "error",
      });
      return;
    }
    setupUser(data.user, data.data.data.accessToken);
  };
  const handleSignin = async (provider) => {
    setDisabled(true);
    const data = await Auth(provider, type);
    checkIfUserExists(data, type);
    close();
  };

  const FbButton = () => (
    <ThemeProvider theme={fbTheme}>
      <Button
        color="primary"
        variant="contained"
        size="large"
        fullWidth
        startIcon={<i className="lab la-facebook-f" />}
        onClick={() => handleSignin(fbOAuth())}
        disabled={disabled}
        style={{ marginBottom: "10px" }}
      >
        {type} with facebook
      </Button>
    </ThemeProvider>
  );
  const GoogleButton = () => (
    <ThemeProvider theme={googleTheme}>
      <Button
        color="primary"
        variant="contained"
        size="large"
        fullWidth
        startIcon={<i className="lab la-google-plus-g la-2x" />}
        onClick={() => handleSignin(googleOAuth())}
        disabled={disabled}
        style={{ marginBottom: "10px" }}
      >
        {type} with google
      </Button>
    </ThemeProvider>
  );
  return site === "google" ? GoogleButton() : FbButton();
};

export default AuthButton;
