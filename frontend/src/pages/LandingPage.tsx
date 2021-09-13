import {
  AppBar,
  Box,
  Button,
  createStyles,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import "@fontsource/roboto";
import "@fontsource/montserrat";

const useStyles = makeStyles(() =>
  createStyles({
    bg: {
      // minHeight: "100vh",
      backgroundColor: "#FAFAFA",
    },
    header: {
      fontSize: "96px",
      fontFamily: "Montserrat",
      fontStyle: "normal",
      fontWeight: "bold",
      lineHeight: "90px",
      marginBottom: "32px",
    },
    btn: {
      padding: "20px 40px",
    },
    des: {
      fontFamily: "Roboto",
      color: "#979797",
      fontSize: "24px",
      lineHeight: "178%",
    },
    section: {
      padding: "80px 0",
    },
    nav: {
      // backgroundColor: "#979797",
      height: "100px",
      padding: "0 86px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      // borderBottom: "solid 1px #979797",
    },
    blueBg: {
      backgroundColor: "#BAD9DA",
      // padding: "20px 0",
    },
    subtitle: {
      color: "#979797",
    },
  })
);

function LandingPage() {
  const classes = useStyles();
  return (
    <div className={classes.bg}>
      <AppBar
        position="sticky"
        color="transparent"
        elevation={0}
        className={classes.nav}
      >
        <Grid container alignItems="center" justifyContent="flex-end">
          <Button color="primary" style={{ marginRight: "10px" }}>
            <Typography>Log-in</Typography>
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: "10px" }}
          >
            <Typography>Sign-up</Typography>
          </Button>
        </Grid>
      </AppBar>
      <Grid
        container
        justifyContent="space-evenly"
        alignItems="center"
        className={classes.section}
      >
        <Grid item>
          <Typography variant="h1" className={classes.header}>
            KU
            <br />
            POST-IT
          </Typography>
          <Typography className={classes.des}>
            Platform for teacher, students, and company
            <br /> Find work. Join post.
          </Typography>
          <Grid container alignItems="center" style={{ marginTop: "14px" }}>
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: "45px" }}
              className={classes.btn}
            >
              <Typography>Get Started</Typography>
            </Button>
            <Typography>Now it’s free</Typography>
          </Grid>
        </Grid>
        <Grid item>
          <img src="/img/email.gif" alt="email-capture-picture" />
        </Grid>
      </Grid>

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        className={classes.section}
      >
        <Typography variant="h4">
          Easier way to get the work or find students for work
        </Typography>
        <Typography variant="subtitle1" className={classes.subtitle}>
          On KU Post-It, you can create account to find the work or post the
          work all within 5 minutes.
        </Typography>
      </Grid>

      <Grid
        container
        justifyContent="center"
        alignItems="center"
        className={classes.blueBg}
      >
        <Grid item xs={5}>
          <img src="/img/team.png" alt="email-capture-picture" width="550" />
        </Grid>
        <Grid item xs={5} style={{ textAlign: "right" }}>
          <Typography variant="h4">Just post the work</Typography>
          <Typography variant="subtitle1">
            Create a post, write the work description and let us spread the news
            about your post to every related students registered in KU Post-It.
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default LandingPage;
