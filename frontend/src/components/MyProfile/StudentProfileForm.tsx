import {
  Typography,
  TextField,
  Grid,
  Button,
  Box,
  Checkbox,
  makeStyles,
  createStyles,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Hidden,
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

interface StudentProfileFormProps {
  user?: User | null;
  setUser: (user: User | null) => void;
}

function StudentProfileForm({
  user,
  setUser,
}: StudentProfileFormProps): JSX.Element {
  const classes = useStyles();

  // Dialog Open/Close
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      firstName: `${user?.first_name}`,
      lastName: `${user?.last_name}`,
      email: `${user?.email}`,
      phone: `${user?.phone}`,
      studentId: `${user?.student_id}`,
      faculty: `${user?.faculty_name}`,
      department: `${user?.department_name}`,
      getNotify: user?.get_notify,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      const userDatasent = {
        first_name: values.firstName,
        last_name: values.lastName,
        phone: values.phone,
        get_notify: values.getNotify,
      };
      console.log(userDatasent);
      axios
        .patch("/user/updateuser", userDatasent)
        .then(function (response) {
          console.log(response);
          axios.get("/user/getuser").then((response) => {
            setUser(response.data[0]);
          });
          handleOpen();
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
          <Grid item xs={12} md={6} style={{ marginBottom: "1rem" }}>
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
          <Grid item xs={12} md={6} style={{ marginBottom: "1rem" }}>
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
          <Grid item xs={12} style={{ marginBottom: "1rem" }}>
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
          <Grid item xs={12} style={{ marginBottom: "1rem" }}>
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
          <Grid item xs={12} md={6} style={{ marginBottom: "1rem" }}>
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
          <Grid item xs={12} md={6} style={{ marginBottom: "1rem" }}>
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
          <Grid item xs={12}>
            <TextField
              size="small"
              label="Student ID"
              variant="outlined"
              name="studentId"
              value={formik.values.studentId}
              onChange={formik.handleChange}
              fullWidth
              disabled
            />
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Checkbox
              color="primary"
              name="getNotify"
              checked={formik.values.getNotify}
              onChange={formik.handleChange}
            />
            <Typography variant="body1">
              <Box fontSize={15}>
                Agree to recieve notification mail from us.
              </Box>
            </Typography>
          </Grid>
        </Grid>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Hidden mdDown>
            <RouterLink to="/ta" style={{ textDecoration: "none" }}>
              <Button
                variant="outlined"
                size="large"
                color="secondary"
                style={{ marginBottom: "1rem", marginRight: "1rem" }}
              >
                Back To Home
              </Button>
            </RouterLink>
            <RouterLink to="/changepassword" style={{ textDecoration: "none" }}>
              <Button
                variant="outlined"
                size="large"
                className={classes.bgyellow}
                style={{ marginBottom: "1rem", marginRight: "1rem" }}
              >
                Change Password
              </Button>
            </RouterLink>
            <Button
              variant="contained"
              size="large"
              color="primary"
              type="submit"
              style={{ marginBottom: "1rem" }}
            >
              Save Changes
            </Button>
          </Hidden>
          <Hidden smDown lgUp>
            <RouterLink to="/ta" style={{ textDecoration: "none" }}>
              <Button
                variant="outlined"
                size="medium"
                color="secondary"
                style={{ marginBottom: "1rem", marginRight: "1rem" }}
              >
                Back To Home
              </Button>
            </RouterLink>
            <RouterLink to="/changepassword" style={{ textDecoration: "none" }}>
              <Button
                variant="outlined"
                size="medium"
                className={classes.bgyellow}
                style={{ marginBottom: "1rem", marginRight: "1rem" }}
              >
                Change Password
              </Button>
            </RouterLink>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              type="submit"
              style={{ marginBottom: "1rem" }}
            >
              Save Changes
            </Button>
          </Hidden>
          <Hidden mdUp>
            <RouterLink to="/ta" style={{ textDecoration: "none" }}>
              <Button
                variant="outlined"
                size="small"
                color="secondary"
                style={{ marginBottom: "1rem", marginRight: "1rem" }}
              >
                Back To Home
              </Button>
            </RouterLink>
            <RouterLink to="/changepassword" style={{ textDecoration: "none" }}>
              <Button
                variant="outlined"
                size="small"
                className={classes.bgyellow}
                style={{ marginBottom: "1rem", marginRight: "1rem" }}
              >
                Change Password
              </Button>
            </RouterLink>
            <Button
              variant="contained"
              size="small"
              color="primary"
              type="submit"
              style={{ marginBottom: "1rem" }}
            >
              Save Changes
            </Button>
          </Hidden>
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

export default StudentProfileForm;
