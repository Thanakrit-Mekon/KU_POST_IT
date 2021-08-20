import Create from "../components/Login/create";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { User } from "../App";

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

export interface LoginProps {
  setUser: (user: User) => void;
}

function Login({ setUser }: LoginProps): JSX.Element {
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
        <Grid item xs={1} md={2} />
        <Grid item xs={10} md={8}>
          <Create setUser={setUser}/>
        </Grid>
        <Grid item xs={1} md={2} className={classes.bgTeal} />
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

export default Login;
