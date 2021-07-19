import {
  Typography,
  TextField,
  Grid,
  Button,
  Box,
  Checkbox,
  Link,
} from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  confirmPassword: yup
    .string()
    .min(8)
    .oneOf([yup.ref('password'), null])
    .required(),
  companyName: yup.string().required(),
  contact: yup.string().required(),
});

function CompanyRegistrationForm(): JSX.Element {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      companyName: '',
      contact: '',
    },
    validationSchema,
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
        style={{ paddingBottom: '1rem' }}>
        <Box fontWeight="fontWeightBold">Create Account</Box>
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container>
          <Grid item sm={12} style={{ marginBottom: '1rem' }}>
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
          </Grid>
          <Grid item sm={12} style={{ marginBottom: '1rem' }}>
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
          <Grid item sm={12} style={{ marginBottom: '1rem' }}>
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
          <Grid item sm={12} style={{ marginBottom: '1rem' }}>
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
          <Grid item sm={12} style={{ marginBottom: '1rem' }}>
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
          </Grid>
          <Grid container>
            <Grid
              item
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
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
            style={{ marginBottom: '1rem' }}>
            Register
          </Button>
          <Grid container justifyContent="center">
            <Link href="/" style={{ textDecoration: 'none' }} color="primary">
              I already have an account
            </Link>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export default CompanyRegistrationForm;
