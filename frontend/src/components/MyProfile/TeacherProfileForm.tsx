import {
  Typography,
  TextField,
  Grid,
  Button,
  Box,
  makeStyles,
  createStyles,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "../../axios";
import { User } from "../../App";
import { useState } from "react";

const validationSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  phone: yup.number().required(),
});

const useStyles = makeStyles(() =>
  createStyles({
    bgyellow: {
      color: "white",
      backgroundColor: "#F9A41A",
      borderColor: "#F9A41A",
      "&:hover": {
        backgroundColor: "#D98804",
        borderColor: "#D98804",
      },
    },
  })
);

interface TeacherProfileFormProps {
  user?: User | null;
}

function TeacherProfileForm({ user }: TeacherProfileFormProps): JSX.Element {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    // setOpen(false);
    window.location.reload();
  };
  const formik = useFormik({
    initialValues: {
      firstName: `${user?.first_name}`,
      lastName: `${user?.last_name}`,
      email: `${user?.email}`,
      phone: `${user?.phone}`,
      faculty: `${user?.faculty_name}`,
      department: `${user?.department_name}`,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      const userData = {
        first_name: values.firstName,
        last_name: values.lastName,
        phone: values.phone,
      };
      console.log(userData);
      axios
        .patch("/user/updateuser", userData)
        .then(function (response) {
          console.log(response);
          if (response.status === 200) {
            handleOpen();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  });

  return (
    <>
      <Typography align="left" variant="h5" style={{ paddingBottom: "1rem" }}>
        <Box fontWeight="fontWeightBold">Information</Box>
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item sm={6} style={{ marginBottom: "1rem" }}>
            <TextField
              size="small"
              label="First Name"
              variant="outlined"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              fullWidth
            />
          </Grid>
          <Grid item sm={6} style={{ marginBottom: "1rem" }}>
            <TextField
              size="small"
              label="Last Name"
              variant="outlined"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              fullWidth
            />
          </Grid>
          <Grid item sm={12} style={{ marginBottom: "1rem" }}>
            <TextField
              size="small"
              label="Email"
              variant="outlined"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              fullWidth
              disabled
            />
          </Grid>
          <Grid item sm={12} style={{ marginBottom: "1rem" }}>
            <TextField
              size="small"
              label="Tel"
              variant="outlined"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              fullWidth
            />
          </Grid>
          <Grid item sm={6} style={{ marginBottom: "1rem" }}>
            <TextField
              size="small"
              label="Faculty"
              variant="outlined"
              name="faculty"
              value={formik.values.faculty}
              onChange={formik.handleChange}
              fullWidth
              disabled
            />
          </Grid>
          <Grid item sm={6} style={{ marginBottom: "1rem" }}>
            <TextField
              size="small"
              label="Department"
              variant="outlined"
              name="department"
              value={formik.values.department}
              onChange={formik.handleChange}
              fullWidth
              disabled
            />
          </Grid>
        </Grid>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="outlined"
            size="large"
            className={classes.outlinedred}
            style={{ marginBottom: "1rem", marginRight: "1rem" }}
            href="/ta"
          >
            Back To Home
          </Button>
          <Button
            variant="outlined"
            size="large"
            className={classes.bgyellow}
            style={{ marginBottom: "1rem", marginRight: "1rem" }}
            href="/changepassword"
          >
            Change Password
          </Button>
          <Button
            variant="contained"
            size="large"
            color="primary"
            type="submit"
            style={{ marginBottom: "1rem" }}
          >
            Save Changes
          </Button>
        </Box>
      </form>
      <Dialog
        open={open}
        onClose={handleClose}
        disableBackdropClick
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Congratulations!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your profile information has been saved.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TeacherProfileForm;
