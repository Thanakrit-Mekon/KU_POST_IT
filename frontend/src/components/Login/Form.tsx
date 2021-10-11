import { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "../../axios";
import { useHistory } from "react-router-dom";
import { LoginProps } from "../../pages/Login";
import { Link as Router, useLocation } from "react-router-dom";
import { FormHelperText } from "@material-ui/core";

const validationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8, "At least 8 characters").required(),
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface LocationProps {
  from: { pathname: string };
}

function Form({ setUser }: LoginProps) {
  const [oldPasswordErrorMessage, setOldPasswordErrorMessage] = useState("");
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation<LocationProps>();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      axios
        .post("/auth/login", {
          username: values.email,
          password: values.password,
        })
        .then((response) => {
          localStorage.setItem("accessToken", response.data.accessToken);
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.accessToken}`;
          return axios.get("/user/getuser");
        })
        .then((response) => {
          setUser(response.data[0]);
          if (location.state !== undefined)
            history.push(location.state.from.pathname);
          else {
            if (response.data[0].location) {
              history.push("/intern");
            } else {
              history.push("/ta");
            }
          }
        })
        .catch(function (error) {
          console.log(error.response);
          setOldPasswordErrorMessage("E-mail or password is Invalid");
        });
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography variant="h3" color="primary">
          Log in
        </Typography>
        <form
          className={classes.form}
          onSubmit={formik.handleSubmit}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="E-mail Address"
                name="email"
                autoComplete="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
              />
              {oldPasswordErrorMessage && (
                <Grid item xs={12}>
                  <FormHelperText style={{ color: "red" }}>
                    {oldPasswordErrorMessage}
                  </FormHelperText>
                </Grid>
              )}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              Don't have an account ?
              <Link
                component={Router}
                to="/register"
                variant="body2"
                style={{ marginLeft: 5 }}
              >
                Sign-up here.
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}></Box>
    </Container>
  );
}

export default Form;
