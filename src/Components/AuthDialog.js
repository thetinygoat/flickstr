import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import { DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AuthButton from "./AuthButton";

export default ({ open, close, type }) => {
  const [disabled, setDisabled] = useState(false);
  const title =
    type === "login"
      ? "Login to your Flickstr account"
      : "Create a new Flickstr account";

  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <AuthButton
          disabled={disabled}
          type={type}
          site="google"
          setDisabled={setDisabled}
          close={close}
        />
        {/* <AuthButton disabled={disabled} type={type} setDisabled={setDisabled} /> */}
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={close} disabled={disabled}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
