import { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useHistory } from "react-router-dom";
import { Box, Link } from "@material-ui/core";
import axios from "../../axios";

interface AlertDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  err: boolean;
  email: string;
}

export default function AlertDialog({ open, setOpen, err, email }: AlertDialogProps) {
  const history = useHistory();
  const [disable,setDisable] = useState<boolean>(false);
  const [timer,setTimer] = useState<string>("");
  const handleClose = () => {
    setOpen(false);
    history.push("/login");
  };
  const Resend = () => {
    axios
      .post("/user/resend_email",
      {
        email: email,
      })
      .then(function (response) {
        setDisable(true)
        setTimer("Please wait for 10 seconds to resend again.")
        setTimeout(() => setDisable(false), 10000);
        setTimeout(() => setTimer(""), 10000);
      })
      .catch(function (error) {
      });
  }

  const title = err ? "Whoops!" : "Verify your email";
  const content = err
    ? "Email already exists, you can try logging in with this email."
    : `We have sent an email to ${email}. Please click on the link in the email to verify your email address and activate your account.`;

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box textAlign="center">
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <img src="/img/sent_email.gif" alt="" style={{ width:200, height:200 }}/>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
            <Button size="large" variant="contained" color="primary" style={{ margin:10 }} onClick={Resend} disabled={disable}>
              Resend Email
            </Button>
          <DialogContentText id="alert-dialog-description">
            {timer}
          </DialogContentText>
        </DialogContent>
        </Box>
        <DialogActions>
        <Link href="https://lottiefiles.com/72126-email-verification" underline="none" target="_blank" style={{ color:"#bbbbbb" }}>
          Animation by Karymee Morales on LottieFiles
        </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}
