import {
  TextField,
  Grid,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Hidden,
  createStyles,
  makeStyles,
  FormHelperText,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import axios from "../../axios";

const validationSchema = yup.object({
  oldPassword: yup.string().min(8,"Enter your current password").required("Enter your current password"),
  newPassword: yup
    .string()
    .min(8, "At least 8 characters")
    .matches(
      /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=]).*$/
    ,"Enter a valid password")
    .required("Enter your new password"),
  confirmNewPassword: yup
    .string()
    .min(8, "Password must match!")
    .required("Password must match!")
    .oneOf([yup.ref("newPassword"), null], "Password must match!"),
});

const useStyles = makeStyles(() =>
  createStyles({
    error: {
      marginTop: -13,
      marginBottom: 10,
      color:"red",
    },
  })
);

function ChangePasswordForm(): JSX.Element {
  const classes = useStyles();
  const [oldPasswordErrorMessage, setOldPasswordErrorMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const userPassword = {
        old_password: values.oldPassword,
        new_password: values.newPassword,
      };
      axios
        .patch("/user/updatepassword", userPassword)
        .then(function (response) {
          setOldPasswordErrorMessage("");
          handleOpen();
        })
        .catch(function (error) {
          setOldPasswordErrorMessage("Current Password Invalid");
        });
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid container>
          <Grid item xs={12} style={{ marginBottom: "1rem" }}>
            <TextField
              size="small"
              type="password"
              label="Current Password"
              variant="outlined"
              name="oldPassword"
              value={formik.values.oldPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.oldPassword && Boolean(formik.errors.oldPassword)
              }
              fullWidth
            />
          </Grid>
          {oldPasswordErrorMessage && (
            <Grid item xs={12}>
              <FormHelperText className={classes.error}>
                {oldPasswordErrorMessage}
              </FormHelperText>
            </Grid>
          )}
          {(formik.touched.oldPassword && formik.errors.oldPassword) &&(
            <Grid item xs={12}>
              <FormHelperText className={classes.error}>
                {formik.errors.oldPassword}  
              </FormHelperText>
            </Grid>
          )}
          <Grid item xs={12} style={{ marginBottom: "1rem" }}>
            <TextField
              size="small"
              type="password"
              label="New Password"
              variant="outlined"
              name="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.newPassword && Boolean(formik.errors.newPassword)
              }
              fullWidth
            />
          </Grid>
          {(formik.touched.newPassword && formik.errors.newPassword) &&(
            <Grid item xs={12}>
              <FormHelperText className={classes.error}>
                {formik.errors.newPassword}  
              </FormHelperText>
            </Grid>
          )}
          <Grid item xs={12} style={{ marginBottom: "1rem" }}>
            <TextField
              size="small"
              type="password"
              label="Confirm New Password"
              variant="outlined"
              name="confirmNewPassword"
              value={formik.values.confirmNewPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.confirmNewPassword &&
                Boolean(formik.errors.confirmNewPassword)
              }
              fullWidth
            />
          </Grid>
          {(formik.touched.confirmNewPassword && formik.errors.confirmNewPassword) &&(
            <Grid item xs={12}>
              <FormHelperText className={classes.error}>
                {formik.errors.confirmNewPassword}  
              </FormHelperText>
            </Grid>
          )}
        </Grid>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
          mt={3}
        >
          <Hidden smDown>
            <RouterLink to="/myprofile" style={{ textDecoration: "none" }}>
              <Button
                variant="outlined"
                size="large"
                color="secondary"
                style={{ marginBottom: "1rem", marginRight: "1rem" }}
              >
                Cancel
              </Button>
            </RouterLink>
            <Button
              variant="contained"
              size="large"
              color="primary"
              type="submit"
              style={{ marginBottom: "1rem" }}
            >
              Save Password
            </Button>
          </Hidden>
          <Hidden mdUp>
            <RouterLink to="/myprofile" style={{ textDecoration: "none" }}>
              <Button
                variant="outlined"
                size="medium"
                color="secondary"
                style={{ marginBottom: "1rem", marginRight: "1rem" }}
              >
                Cancel
              </Button>
            </RouterLink>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              type="submit"
              style={{ marginBottom: "1rem" }}
            >
              Save Password
            </Button>
          </Hidden>
        </Box>
      </form>
      <Dialog
        open={open}
        disableBackdropClick
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Congratulations!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your password has been changed successfully.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <RouterLink to="/myprofile" style={{ textDecoration: "none" }}>
            <Button color="primary">OK</Button>
          </RouterLink>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ChangePasswordForm;
