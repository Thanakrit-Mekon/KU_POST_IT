import { Paper, Tabs, Tab, Avatar, Grid, Theme } from "@material-ui/core";
import { Link } from "react-router-dom";
import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    pad: {
      paddingLeft: 50,
      paddingRight: 50,
    },
    tab: {
      color: theme.palette.primary.contrastText,
    },
  })
);

function NavBar() {
  const classes = useStyles();
//   const [value, setValue] = React.useState(0);
//   const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
//     setValue(newValue);
//   };
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
          <img alt="logo" />
        </Grid>
        <Grid item>
          <Tabs
            className={classes.tab}
            // value={value}
            // onChange={handleChange}
            indicatorColor="primary"
            centered
          >
            <Tab label="TA" to="/register" component={Link} />
            <Tab label="Project co-op" to="/" component={Link} />
            <Tab label="Internship" to="/" component={Link} />
          </Tabs>
        </Grid>
        <Grid item>
          <Grid container direction="row" alignItems="center">
            BungBung
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default NavBar;
