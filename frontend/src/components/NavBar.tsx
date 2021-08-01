import { Paper, Tabs, Tab, Avatar, Grid, Theme } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Checkedbox from './Table/checkbox';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    pad: {
      paddingLeft: 50,
      //paddingRight: 50,
    },
    tabs: {
      color: theme.palette.primary.contrastText,
    },
    tab: {
      fontSize : '17px',
    },
  })
);

function NavBar(): JSX.Element {
  const classes = useStyles();
  return (
    <Paper className={classes.root} square>
      <Grid
        container
        className={classes.pad}
        direction="row"
        justifyContent="space-between"
        alignItems="center">
        <Grid item>
          <img height = "60" width = "100" src="/img/logo.png" alt="logo" />
        </Grid>
        <Grid item>
          <Tabs
            className={classes.tabs}
            indicatorColor="primary"
            centered
          >
            <Tab label="TA" to="/register" className={classes.tab} component={Link} />
            <Tab label="Project co-op" to="/project-coop" className={classes.tab} component={Link} />
            <Tab label="Internship" to="/internship" className={classes.tab} component={Link} />
          </Tabs>
        </Grid>
  
        <Grid item>
          <Grid container direction="row" alignItems="center">
              BungBung
              <Avatar alt="Travis Howard" src="/img/mascot.png" />
            <Checkedbox />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
    
  );
}

export default NavBar;
