import { Paper, Tabs, Tab, Avatar, Grid, Theme } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Checkedbox from "./checkbox";
import { User } from "../App";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    pad: {
      paddingLeft: 30,
      //paddingRight: 50,
    },
    tabs: {
      color: theme.palette.primary.contrastText,
    },
    tab: {
      fontSize: "17px",
    },
  })
);

interface NavBarProps {
  user?: User | null;
  setUser?: (user: User | null) => void;
}

function NavBar({ user, setUser }: NavBarProps): JSX.Element {
  const classes = useStyles();
  return (
    <Paper className={classes.root} square>
      <Grid
        container
        className={classes.pad}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <img height="63" width="196" src="/img/logo.png" alt="logo" />
        </Grid>
        <Grid item>
          <Tabs className={classes.tabs} indicatorColor="primary" centered>
            <Tab label="TA" to="/ta" className={classes.tab} component={Link} />
            <Tab
              label="Project co-op"
              to="/coop"
              className={classes.tab}
              component={Link}
            />
            <Tab
              label="Internship"
              to="/intern"
              className={classes.tab}
              component={Link}
            />
          </Tabs>
        </Grid>

        <Grid item>
          <Grid container direction="row" alignItems="center">
            {user ? user.first_name || user.name : "anonymous"}
            <Avatar alt="Travis Howard" src="/img/mascot.png" />
            <Checkedbox setUser={setUser} />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default NavBar;
