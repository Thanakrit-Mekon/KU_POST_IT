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
  Hidden,
  FormHelperText,
  Avatar,
  Input,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "../../axios";
import { User } from "../../App";
import { createRef, useState } from "react";
import Compress from "react-image-file-resizer";

const validationSchema = yup.object({
  firstName: yup.string().required("firstname"),
  lastName: yup.string().required("lastname"),
  phone: yup.number().required("Enter your phone number"),
});

const useStyles = makeStyles((theme) =>
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
    error: {
      marginTop: -27,
      color:"red",
    },
    large: {
      width: theme.spacing(30),
      height: theme.spacing(30),
    },
    marginbox: {
      paddingLeft: 40,
      paddingRight: 40,
      [theme.breakpoints.down("sm")]: {
        paddingLeft: 0,
        paddingRight: 0,
      },
    }
  })
);

interface TeacherProfileFormProps {
  user?: User | null;
  setUser: (user: User | null) => void;
}

function TeacherProfileForm({
  user,
  setUser,
}: TeacherProfileFormProps): JSX.Element {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [image, _setImage] = useState(user?.profile_url);
  const inputFileRef = createRef();

  const setImage = (newImage: any) => {
    _setImage(newImage);
  };

  const handleOnChange = (event: any) => {
    const newImage = event.target?.files?.[0];
    try {
    Compress.imageFileResizer(
      newImage, // the file from input
      240, // maxwidth
      240, // maxheight
      "JPEG", // compress format WEBP, JPEG, PNG
      90, // quality
      0, // rotation
      (uri) => {
        setImage(uri);
        // You upload logic goes here
      },
      "base64", // blob or base64 default base64
      240, // minwidth
      240, // minheight
    );
    }
    catch (err) {
    }
  };

  const handleClick = () => {
    setImage(image);
  };

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
      faculty: `${user?.faculty_name}`,
      department: `${user?.department_name}`,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      const userData = {
        profile_url: image,
        first_name: values.firstName,
        last_name: values.lastName,
        phone: values.phone,
      };
      axios
        .patch("/user/updateuser", userData)
        .then(function (response) {
          axios.get("/user/getuser").then((response) => {
            setUser(response.data[0]);
          });
          handleOpen();
        })
        .catch(function (error) {
        });
    },
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid container>
          <Grid item xs={1} />
          <Grid item xs={10} md={3} lg={2}>
            <Box textAlign="center" mt={2}>
              <Box display="none">
                <Input
                  inputRef={inputFileRef}
                  id="avatar-image-upload"
                  type="file"
                  onChange={handleOnChange}
                />
              </Box>
              <label htmlFor="avatar-image-upload">
                <Button
                  variant="outlined"
                  style={{
                    borderRadius: "50%",
                    padding: "0",
                    marginBottom: 40,
                    justifySelf: "center",
                  }}
                  component="span"
                  onClick={handleClick}
                >
                  <Avatar
                    className={classes.large}
                    alt="Avatar"
                    src={image}
                  />
                </Button>
              </label>
            </Box>
          </Grid>
          <Hidden mdUp>
              <Grid item xs={1} />
              <Grid item xs={1} />
          </Hidden>
          <Grid item xs={10} md={6} lg={6}>
            <Box className={classes.marginbox}>
              <Typography align="left" variant="h5" style={{ paddingBottom: "1rem" }}>
                <Box fontWeight="fontWeightBold">Information</Box>
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
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
                {((formik.touched.lastName && formik.errors.lastName) || (formik.touched.firstName && formik.errors.firstName)) &&(
                  <Grid item xs={12}>
                  <FormHelperText className={classes.error}>
                    {(formik.touched.firstName && formik.errors.firstName && formik.touched.lastName && formik.errors.lastName) ?
                    (`Enter your ${formik.errors.firstName} and ${formik.errors.lastName}`):
                    (formik.touched.firstName && formik.errors.firstName) ?
                    (`Enter your ${formik.errors.firstName}`) :
                    (formik.touched.lastName && formik.errors.lastName) ?
                    (`Enter your ${formik.errors.lastName}`) :""
                    }
                  </FormHelperText>
                  </Grid>
                )}
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
                {(formik.touched.phone && formik.errors.phone) &&(
                  <Grid item xs={12}>
                    <FormHelperText className={classes.error}>
                    {formik.errors.phone}  
                    </FormHelperText>
                  </Grid>
                )}
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
            </Box>
          </Grid>
          <Grid item xs={1} md={2} lg={3} />
        </Grid>
      </form>
    </>
  );
}

export default TeacherProfileForm;
