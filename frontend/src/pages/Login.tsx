import Create from "../components/Login/create";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Grid, Hidden } from "@material-ui/core";
import { User } from "../App";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#ffffff",
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

export interface LoginProps {
  setUser: (user: User) => void;
}

function Login({ setUser }: LoginProps): JSX.Element {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Hidden xsDown>
        <Grid container className={classes.row}>
          <Grid item xs={1} sm={2} />
          <Grid item xs={10} sm={8}>
            <Grid container className={classes.fullHeight}>
              <Grid item xs={7} />
              <Grid item xs={5} className={classes.bgTeal} />
            </Grid>
          </Grid>
          <Grid item xs={1} sm={2} className={classes.bgTeal} />
        </Grid>
      </Hidden>
      <Grid container>
        <Hidden xsDown>
          <Grid item xs={1} sm={2} />
        </Hidden>
        <Grid item xs={12} sm={8}>
          <Create setUser={setUser} />
        </Grid>
        <Hidden xsDown>
          <Grid item xs={1} sm={2} className={classes.bgTeal} />
        </Hidden>
      </Grid>
      <Hidden xsDown>
        <Grid container className={classes.row}>
          <Grid item xs={1} sm={2} />
          <Grid item xs={10} sm={8}>
            <Grid container className={classes.fullHeight}>
              <Grid item xs={7} />
              <Grid item xs={5} className={classes.bgTeal} />
            </Grid>
          </Grid>
          <Grid item xs={1} sm={2} className={classes.bgTeal} />
        </Grid>
      </Hidden>
    </div>
  );
}

export default Login;
