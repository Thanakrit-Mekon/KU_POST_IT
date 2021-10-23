import {
  Typography,
  TextField,
  Grid,
  Button,
  Box,
  Link,
  makeStyles,
  createStyles,
  useMediaQuery,
  useTheme,
  FormHelperText,
} from "@material-ui/core";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "../../axios";
import React from "react";
import AlertDialog from "./AlertDialog";

const validationSchema = yup.object({
  email: yup.string().email("Enter a valid Email").required("Enter your Email"),
  password: yup
    .string()
    .min(8, "At least 8 characters")
    .matches(
      /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=]).*$/,
      "Password must contains Upper and Lowercase letter, Number, and special symbol (@#$%^&+!=)"
    )
    .required("Enter your password"),
  confirmPassword: yup
    .string()
    .min(8)
    .oneOf([yup.ref("password"), "Password must match"])
    .required("Password must match"),
  companyName: yup.string().required("Enter your Company Name"),
  contact: yup.string().required("Enter your contact"),
  phone: yup.number().required("Enter your phone number"),
  location: yup.string().required("Enter your Company location"),
  aboutMe: yup.string(),
});

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      [theme.breakpoints.down("xs")]: {
        padding: "10%",
      },
    },
    textField: {
      marginBottom: "1rem",
      [theme.breakpoints.down("xs")]: {
        marginBottom: "10px",
      },
    },
    end: {
      marginBottom: "1rem",
      [theme.breakpoints.down("xs")]: {
        marginBottom: "20px",
      },
    },
    error3: {
      marginTop: -12,
      marginBottom: 15,
      color: "red",
      [theme.breakpoints.down("xs")]: {
        marginTop: -15,
      },
    },

    error2: {
      marginTop: -27,
      marginBottom: 15,
      color: "red",
      [theme.breakpoints.down("xs")]: {
        marginTop: -15,
      },
    },

    error1: {
      marginTop: -12,
      marginBottom: 15,
      color: "red",
      [theme.breakpoints.down("xs")]: {
        marginTop: -5,
      },
    },
    error4: {
      marginTop: 3,
      color: "red",
      [theme.breakpoints.down("xs")]: {
        marginTop: 5,
        marginBottom: -5,
      },
    },
  })
);

function CompanyRegistrationForm(): JSX.Element {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"), {
    defaultMatches: true,
  });
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [err, setErr] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenWithError = () => {
    setErr(true);
    setOpen(true);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      companyName: "",
      contact: "",
      phone: "",
      location: "",
      aboutMe: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const userData = {
        profile_url: "/img/mascot.png",
        email: values.email,
        password: values.password,
        phone: values.phone,
        location: values.location,
        about_me: values.aboutMe,
        contact: values.contact,
        name: values.companyName,
      };
      axios
        .post("/user/company", userData)
        .then(function (response) {
          handleClickOpen();
        })
        .catch(function (error) {
          handleClickOpenWithError();
        });
    },
  });
  return (
    <div className={classes.container}>
      <Typography
        align="center"
        variant="h4"
        color="primary"
        style={{ paddingBottom: "1rem" }}
      >
        <Box fontWeight="fontWeightBold">Create Account</Box>
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container>
          <Grid item xs={12} className={classes.end}>
            <TextField
              size="small"
              label="Company Name"
              variant="outlined"
              name="companyName"
              value={formik.values.companyName}
              onChange={formik.handleChange}
              error={
                formik.touched.companyName && Boolean(formik.errors.companyName)
              }
              fullWidth
            />
            {formik.touched.companyName && formik.errors.companyName && (
              <Grid item xs={12}>
                <FormHelperText className={classes.error4}>
                  {formik.errors.companyName}
                </FormHelperText>
              </Grid>
            )}
          </Grid>
          <Grid item xs={12} className={classes.textField}>
            <TextField
              size="small"
              label="Email"
              variant="outlined"
              placeholder="email@example.com"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              fullWidth
            />
          </Grid>
          {formik.touched.email && formik.errors.email && (
            <Grid item xs={12}>
              <FormHelperText className={classes.error1}>
                {formik.errors.email}
              </FormHelperText>
            </Grid>
          )}
          <Grid item xs={12} className={classes.textField}>
            <TextField
              size="small"
              type="password"
              label="Password"
              variant="outlined"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              fullWidth
            />
          </Grid>
          {formik.touched.password && formik.errors.password && (
            <Grid item xs={12}>
              <FormHelperText className={classes.error1}>
                {formik.errors.password}
              </FormHelperText>
            </Grid>
          )}
          <Grid item xs={12} className={classes.end}>
            <TextField
              size="small"
              type="password"
              label="Confirm Password"
              variant="outlined"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              fullWidth
            />
          </Grid>
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <Grid item xs={12}>
              <FormHelperText className={classes.error3}>
                {formik.errors.confirmPassword}
              </FormHelperText>
            </Grid>
          )}
          <Grid item xs={12} className={classes.textField}>
            <TextField
              size="small"
              label="Location"
              variant="outlined"
              name="location"
              value={formik.values.location}
              onChange={formik.handleChange}
              error={formik.touched.location && Boolean(formik.errors.location)}
              fullWidth
            />
          </Grid>
          {formik.touched.location && formik.errors.location && (
            <Grid item xs={12}>
              <FormHelperText className={classes.error1}>
                {formik.errors.location}
              </FormHelperText>
            </Grid>
          )}
          <Grid item xs={12} className={classes.end}>
            <TextField
              size="small"
              label="About me"
              variant="outlined"
              name="aboutMe"
              value={formik.values.aboutMe}
              onChange={formik.handleChange}
              error={formik.touched.aboutMe && Boolean(formik.errors.aboutMe)}
              fullWidth
            />
          </Grid>
          <Grid container spacing={isMobile ? 0 : 2}>
            <Grid item xs={12} sm={7} className={classes.textField}>
              <TextField
                size="small"
                label="Contact"
                variant="outlined"
                name="contact"
                value={formik.values.contact}
                onChange={formik.handleChange}
                error={formik.touched.contact && Boolean(formik.errors.contact)}
                fullWidth
              />
              {formik.touched.contact && formik.errors.contact && (
                <Grid item xs={12}>
                  <FormHelperText className={classes.error4}>
                    {formik.errors.contact}
                  </FormHelperText>
                </Grid>
              )}
            </Grid>
            <Grid item xs={12} sm={5} className={classes.end}>
              <TextField
                size="small"
                label="Tel"
                variant="outlined"
                placeholder="08xxxxxxxx"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                fullWidth
              />
              {formik.touched.phone && formik.errors.phone && (
                <Grid item xs={12}>
                  <FormHelperText className={classes.error4}>
                    {formik.errors.phone}
                  </FormHelperText>
                </Grid>
              )}
            </Grid>
          </Grid>
          <Button
            variant="contained"
            size="large"
            fullWidth
            color="primary"
            type="submit"
            style={{ marginBottom: "1rem" }}
          >
            Register
          </Button>
          <Grid container justifyContent="center">
            <Link
              href="/login"
              style={{ textDecoration: "none" }}
              color="primary"
            >
              I already have an account
            </Link>
          </Grid>
        </Grid>
        <AlertDialog
          open={open}
          setOpen={setOpen}
          err={err}
          email={formik.values.email}
        />
      </form>
    </div>
  );
}

export default CompanyRegistrationForm;
