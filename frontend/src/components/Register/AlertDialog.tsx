import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useHistory } from "react-router-dom";

interface AlertDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  err: boolean;
}

export default function AlertDialog({ open, setOpen, err }: AlertDialogProps) {
  const history = useHistory();

  const handleClose = () => {
    setOpen(false);
    history.push("/login");
  };

  const title = err ? "Whoops!" : "Success!";
  const content = err
    ? "Email already exists, you can try logging in with this email."
    : "Your Registration successfully completed!❤️";
  const btn = "Continue";

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            {btn}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
