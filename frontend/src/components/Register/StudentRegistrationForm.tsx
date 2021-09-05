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
} from "@material-ui/core";
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import axios from "../../axios";
import React from "react";
import AlertDialog from "./AlertDialog";

const validationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(8)
    // .matches(
    //   /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=]).*$/
    // )
    .required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null])
    .required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  studentId: yup
    .string()
    .matches(/^['b']\d{10}/)
    .required(),
  phone: yup.number().required(),
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
  })
);

function StudentRegistrationForm(): JSX.Element {
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
      studentId: "",
      faculty: "",
      department: "",
      phone: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const userData = {
        profile_url: "url_link",
        email: values.email,
        password: values.password,
        first_name: values.firstName,
        last_name: values.lastName,
        student_id: values.studentId,
        faculty_code: values.faculty,
        department_code: values.department,
        get_notify: true,
        phone: values.phone,
      };
      console.log(userData);
      axios
        .post("/user/student", userData)
        .then(function (response) {
          console.log(response);
          handleClickOpen();
        })
        .catch(function (error) {
          console.log(error);
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
        style={{ paddingBottom: "1.5rem" }}
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
        </Grid>
        <Grid container>
          <Grid item xs={12} className={classes.textField}>
            <TextField
              size="small"
              label="Email"
              variant="outlined"
              name="email"
              placeholder="email@example.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              fullWidth
            />
          </Grid>
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
          <Grid
            container
            spacing={isMobile ? 0 : 2}
            style={{ marginBottom: 5 }}
          >
            <Grid item xs={12} sm={7} className={classes.textField}>
              <TextField
                size="small"
                label="Student ID"
                variant="outlined"
                placeholder="bxxxxxxxxxx"
                name="studentId"
                value={formik.values.studentId}
                onChange={formik.handleChange}
                error={
                  formik.touched.studentId && Boolean(formik.errors.studentId)
                }
                fullWidth
              />
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
        <AlertDialog open={open} setOpen={setOpen} err={err} />
      </form>
    </div>
  );
}

export default StudentRegistrationForm;
