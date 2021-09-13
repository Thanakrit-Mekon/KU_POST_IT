import {
  Paper,
  Tabs,
  Tab,
  Avatar,
  Grid,
  Theme,
  Hidden,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
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
    logo1: {
      marginTop: 10,
    },
    logo2: {
      marginTop: 8,
      marginLeft: -14,
    },
    small: {
      width: theme.spacing(4),
      height: theme.spacing(4),
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
        <Hidden smUp>
        <Grid item className={classes.logo2}>
          <img height="38" width="115" src="/img/logo.png" alt="logo" />
        </Grid>
        </Hidden>
        <Hidden xsDown>
          <Grid item className={classes.logo1}>
            <img height="63" width="196" src="/img/logo.png" alt="logo" />
          </Grid>
          <Grid item>
            <Tabs className={classes.tabs} indicatorColor="primary" centered>
              <Tab
                label="TA"
                to="/ta"
                className={classes.tab}
                component={Link}
                disabled={usertype === 3}
              />
              <Tab
                label="Project co-op"
                to="/coop"
                className={classes.tab}
                component={Link}
                disabled={usertype === 2 || usertype === 3}
              />
              <Tab
                label="Internship"
                to="/intern"
                className={classes.tab}
                component={Link}
                disabled={usertype === 2}
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
            <Hidden smUp>
              {user ? user.first_name || user.name : "anonymous"}
              <Avatar alt="Travis Howard" src="/img/mascot.png" className={classes.small}/>
            </Hidden>
            <Checkedbox user={user} setUser={setUser} />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default NavBar;
