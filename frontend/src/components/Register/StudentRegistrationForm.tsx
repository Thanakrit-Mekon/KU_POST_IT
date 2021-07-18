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

const years = [1, 2, 3, 4];
const faculties = ["k", "u", "p"];
const departments = ["p", "a", "b"];

const validationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  confirmPassword: yup
    .string()
    .min(8)
    .oneOf([yup.ref("password"), null])
    .required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  studentId: yup
    .string()
    .matches(/^['b']\d{10}/)
    .required(),
});

function StudentRegistrationForm(): JSX.Element {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      studentId: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

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
              >
                {faculties.map((faculty, index) => {
                  return (
                    <MenuItem key={index} value={faculty}>
                      {faculty}
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
              >
                {departments.map((department, index) => {
                  return (
                    <MenuItem key={index} value={department}>
                      {department}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item sm={3} style={{ marginBottom: "1rem" }}>
              <TextField
                size="small"
                select
                fullWidth
                variant="outlined"
                label="Year"
              >
                {years.map((year, index) => {
                  return (
                    <MenuItem key={index} value={year}>
                      {year}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Grid>
            <Grid item sm={9}>
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
              <Checkbox color="primary"/>
              <Typography variant="body1">
                <Box fontSize={15}>
                  I accept the terms of the offer of &nbsp;
                  <Link href="#" color="primary">
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
            <Link href="#" style={{ textDecoration: "none" }} color="primary">
              I already have an account
            </Link>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export default StudentRegistrationForm;
