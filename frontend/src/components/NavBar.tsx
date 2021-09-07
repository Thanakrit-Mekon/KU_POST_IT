import { Paper, Tabs, Tab, Avatar, Grid, Theme, Hidden, useMediaQuery, useTheme } from "@material-ui/core";
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
    container: {
      [theme.breakpoints.down("xs")]: {
        display: "flex",
        flexDirection: "column-reverse",
      },
    },
  })
);

interface NavBarProps {
  user?: User | null;
  setUser?: (user: User | null) => void;
}

function NavBar({ user, setUser }: NavBarProps): JSX.Element {
  const classes = useStyles();

  var usertype = -1;
    if (user?.location) {
      usertype = 3;
      //3=company  2=teacher 1=student
    } else if (user?.student_id) {
      usertype = 1;
    } else {
      usertype = 2;
    }

  return (
    <Paper className={classes.root} square>
      <Grid
        container
        className={classes.pad}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item >
          <img height="63" width="196" src="/img/logo.png" alt="logo" />
        </Grid>
        <Hidden xsDown>
        <Grid item>
          <Tabs className={classes.tabs} indicatorColor="primary" centered>
            <Tab label="TA" to="/ta" className={classes.tab} component={Link} disabled={usertype===3}/>
            <Tab
              label="Project co-op"
              to="/coop"
              className={classes.tab}
              component={Link}
              disabled={usertype===2||usertype===3}
            />
            <Tab
              label="Internship"
              to="/intern"
              className={classes.tab}
              component={Link}
              disabled={usertype===2}
            />
          </Tabs>
        </Grid>
        </Hidden>

        <Grid item>
          <Grid container direction="row" alignItems="center">
            <Hidden xsDown>
            {user ? user.first_name || user.name : "anonymous"}
            <Avatar alt="Travis Howard" src="/img/mascot.png" />
            </Hidden>
            <Checkedbox user={user} setUser={setUser} />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default NavBar;
