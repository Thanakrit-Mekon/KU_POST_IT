import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import RegistrationCard from "../components/Register/RegistrationCard";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    },
    row: {
      flexGrow: 1,
    },
    bgTeal: {
      backgroundColor: "#5E9EA0",
    },
    fullHeight: {
      height: "100%",
    },
  })
);

function Register(): JSX.Element {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container className={classes.row}>
        <Grid item sm={1} md={2} />
        <Grid item xs={10} md={8}>
          <Grid container className={classes.fullHeight}>
            <Grid item xs={7} />
            <Grid item xs={5} className={classes.bgTeal} />
          </Grid>
        </Grid>
        <Grid item sm={1} md={2} className={classes.bgTeal} />
      </Grid>
      <Grid container>
        <Grid item md={2} />
        <Grid item xs={12} md={8}>
          <RegistrationCard />
        </Grid>
        <Grid item md={2} className={classes.bgTeal} />
      </Grid>
      <Grid container className={classes.row}>
        <Grid item xs={1} md={2} />
        <Grid item xs={10} md={8}>
          <Grid container className={classes.fullHeight}>
            <Grid item xs={7} />
            <Grid item xs={5} className={classes.bgTeal} />
          </Grid>
        </Grid>
        <Grid item xs={1} md={2} className={classes.bgTeal} />
      </Grid>
    </div>
  );
}

export default Register;
