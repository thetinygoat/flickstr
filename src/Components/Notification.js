import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  CLOSE_NOTIFICATION,
} from '../store/actions/actions';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Notification({ type, message }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const notif = useSelector((state) => state.notif);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch({ type: CLOSE_NOTIFICATION });
  };

  return (
    <div className={classes.root}>
      <Snackbar
        autoHideDuration={10000}
        onClose={handleClose}
        open={notif.notifOpen}
      >
        <Alert onClose={handleClose} severity={notif.notifType}>
          {notif.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
