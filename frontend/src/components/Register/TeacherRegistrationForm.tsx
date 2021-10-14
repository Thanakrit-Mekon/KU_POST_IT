import {
  Typography,
  TextField,
  Grid,
  Button,
  Box,
  Link,
  MenuItem,
  makeStyles,
  createStyles,
  useMediaQuery,
  useTheme,
  FormHelperText,
} from "@material-ui/core";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import axios from "../../axios";
import AlertDialog from "./AlertDialog";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid Email")
    .required("Enter your Email")
    .matches(
      /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+.)?[a-zA-Z]+.)?(ku).th$/,
      "Please enter email address with domain @ku.th"
    ),
  password: yup
    .string()
    .min(8, "At least 8 characters")
    .required("Enter your password"),
  confirmPassword: yup
    .string()
    .min(8)
    .oneOf([yup.ref("password"), "Password must match"])
    .required("Password must match"),
  firstName: yup.string().required("Firstname"),
  lastName: yup.string().required("Lastname"),
  phone: yup.number().required("Enter your phone number"),
});

interface Faculty {
  id: string;
  faculty_name: string;
  faculty_code: string;
}

interface Department {
  id: string;
  faculty_name: string;
  department_name: string;
  department_code: string;
}

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
  })
);

function TeacherRegistrationForm(): JSX.Element {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"), {
    defaultMatches: true,
  });

  const classes = useStyles();
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);

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
      firstName: "",
      lastName: "",
      faculty: "",
      department: "",
      phone: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const userData = {
        profile_url: "/img/mascot.png",
        email: values.email,
        password: values.password,
        first_name: values.firstName,
        last_name: values.lastName,
        faculty_code: values.faculty,
        department_code: values.department,
        phone: values.phone,
      };
      axios
        .post("/user/teacher", userData)
        .then(function (response) {
          handleClickOpen();
        })
        .catch(function (error) {
          handleClickOpenWithError();
        });
    },
  });

  useEffect(() => {
    axios.get("/dropdowns/faculties").then((response) => {
      setFaculties(response.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get(`/dropdowns/department/${formik.values.faculty}`)
      .then((response) => {
        setDepartments(response.data);
      });
  }, [formik.values.faculty]);

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
        <Grid container spacing={isMobile ? 0 : 2}>
          <Grid item xs={12} sm={6} className={classes.textField}>
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
          <Grid item xs={12} sm={6} className={classes.end}>
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
          {((formik.touched.lastName && formik.errors.lastName) ||
            (formik.touched.firstName && formik.errors.firstName)) && (
            <Grid item xs={12}>
              <FormHelperText className={classes.error2}>
                {formik.touched.firstName &&
                formik.errors.firstName &&
                formik.touched.lastName &&
                formik.errors.lastName
                  ? `Enter your ${formik.errors.firstName} and ${formik.errors.lastName}`
                  : formik.touched.firstName && formik.errors.firstName
                  ? `Enter your ${formik.errors.firstName}`
                  : formik.touched.lastName && formik.errors.lastName
                  ? `Enter your ${formik.errors.lastName}`
                  : ""}
              </FormHelperText>
            </Grid>
          )}
        </Grid>
        <Grid container>
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
              label="Tel"
              variant="outlined"
              placeholder="08xxxxxxxx"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              fullWidth
            />
          </Grid>
          {formik.touched.phone && formik.errors.phone && (
            <Grid item xs={12}>
              <FormHelperText className={classes.error1}>
                {formik.errors.phone}
              </FormHelperText>
            </Grid>
          )}
          <Grid container spacing={isMobile ? 0 : 2}>
            <Grid item xs={12} sm={7} className={classes.textField}>
              <TextField
                size="small"
                select
                fullWidth
                variant="outlined"
                label="Faculty"
                value={formik.values.faculty}
                onChange={formik.handleChange}
                name="faculty"
              >
                {faculties &&
                  faculties.map((faculty) => {
                    return (
                      <MenuItem key={faculty.id} value={faculty.faculty_code}>
                        {faculty.faculty_name}
                      </MenuItem>
                    );
                  })}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={5} className={classes.end}>
              <TextField
                size="small"
                select
                fullWidth
                variant="outlined"
                label="Department"
                value={formik.values.department}
                onChange={formik.handleChange}
                name="department"
              >
                {departments &&
                  departments.map((department) => {
                    return (
                      <MenuItem
                        key={department.id}
                        value={department.department_code}
                      >
                        {department.department_name}
                      </MenuItem>
                    );
                  })}
              </TextField>
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
        <AlertDialog open={open} setOpen={setOpen} err={err} email={formik.values.email} />
      </form>
    </div>
  );
}

export default TeacherRegistrationForm;
