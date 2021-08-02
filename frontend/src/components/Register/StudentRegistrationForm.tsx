import {
  Typography,
  TextField,
  Grid,
  Button,
  Box,
  Checkbox,
  Link,
  MenuItem,
} from "@material-ui/core";
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import axios from "../../axios";
import { useHistory } from "react-router";

const validationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  confirmPassword: yup
    .string()
    // .min(8)
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

function StudentRegistrationForm(): JSX.Element {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);

  const history = useHistory();

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
          history.push("/login");
        })
        .catch(function (error) {
          console.log(error);
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
    <>
      <Typography
        align="center"
        variant="h4"
        color="primary"
        style={{ paddingBottom: "1rem" }}
      >
        <Box fontWeight="fontWeightBold">Create Account</Box>
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
        </Grid>
        <Grid container>
          <Grid item sm={12} style={{ marginBottom: "1rem" }}>
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
          <Grid item sm={12} style={{ marginBottom: "1rem" }}>
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
          <Grid item sm={12} style={{ marginBottom: "1rem" }}>
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
          <Grid container spacing={2}>
            <Grid item sm={7} style={{ marginBottom: "1rem" }}>
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
            <Grid item sm={5} style={{ marginBottom: "1rem" }}>
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
          <Grid container spacing={2} style={{ marginBottom: 5 }}>
            <Grid item sm={7}>
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
            <Grid item sm={5}>
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
          <Grid container>
            <Grid
              item
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Checkbox color="primary" />
              <Typography variant="body1">
                <Box fontSize={15}>
                  I accept the terms of the offer of &nbsp;
                  <Link href="/" color="primary">
                    the privacy policy
                  </Link>
                </Box>
              </Typography>
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
      </form>
    </>
  );
}

export default StudentRegistrationForm;
