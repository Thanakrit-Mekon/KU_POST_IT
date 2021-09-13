import {
  AppBar,
  Button,
  createStyles,
  Grid,
  Typography,
  Link,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import "@fontsource/roboto";
import "@fontsource/montserrat";
import { Link as ReactLink } from "react-router-dom";
import GitHubIcon from "@material-ui/icons/GitHub";

const useStyles = makeStyles((theme) =>
  createStyles({
    bg: {
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
      color: "#37474F",
    },
    nav: {
      height: "100px",
      padding: "0 86px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    blueBg: {
      backgroundColor: "#BAD9DA",
      color: "#37474F",
    },
    subtitle: {
      color: "#979797",
    },
    vector: {
      position: "absolute",
      top: "562px",
      left: "353px",
    },
  })
);

function LandingPage() {
  const classes = useStyles();

  return (
    <div className={classes.bg}>
      <img src="/img/vector.png" alt="vector" className={classes.vector} />
      <AppBar
        position="sticky"
        color="transparent"
        elevation={0}
        className={classes.nav}
      >
        <Grid
          container
          alignItems="center"
          justifyContent="flex-end"
          style={{ color: "#37474F" }}
        >
          <ReactLink to="/login" style={{ textDecoration: "none" }}>
            <Button color="primary" style={{ marginRight: "10px" }}>
              Log-in
            </Button>
          </ReactLink>
          <ReactLink to="/register" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: "10px" }}
            >
              Sign-up
            </Button>
          </ReactLink>
        </Grid>
      </AppBar>
      <Grid
        container
        justifyContent="space-evenly"
        alignItems="center"
        className={classes.section}
      >
        <Grid item style={{ zIndex: 2 }}>
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
            <ReactLink to="/register" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: "45px" }}
                className={classes.btn}
              >
                <Typography>Get Started</Typography>
              </Button>
            </ReactLink>
            <Typography>Now it’s free</Typography>
          </Grid>
        </Grid>
        <Grid item>
          <img src="/img/email.gif" alt="email-capture" />
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
          <img src="/img/team.png" alt="team" width="550" />
        </Grid>
        <Grid item xs={5} style={{ textAlign: "right" }}>
          <Typography variant="h4">Just post the work</Typography>
          <Typography variant="subtitle1">
            Create a post, write the work description and let us spread
            <br /> the news about your post to every related students
            <br /> registered in KU Post-It.
          </Typography>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={5}>
          <Typography variant="h4">Find work you want</Typography>
          <Typography variant="subtitle1">
            Student account can join posts and include answers for
            <br />
            post owner to choose students.
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <img src="/img/JobHunt.png" alt="JobHunt" width="550" />
        </Grid>
      </Grid>

      <div style={{ position: "relative" }}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          className={classes.blueBg}
        >
          <Grid item xs={5}>
            <img src="/img/Message.png" alt="Message" width="550" />
          </Grid>
          <Grid item xs={5} style={{ textAlign: "right" }}>
            <Typography variant="h4">Still have no work to join ?</Typography>
            <Typography variant="subtitle1">
              When there is work that related to you, we will send
              <br />
              notification to you email address to let you know.
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          className={classes.section}
        >
          <Typography variant="h4" color="primary">
            Create account and find work now
          </Typography>
          <ReactLink to="/register" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="primary"
              style={{ padding: "18px 10px", marginTop: "20px" }}
            >
              Get started for free
            </Button>
          </ReactLink>
        </Grid>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          style={{
            backgroundColor: "#37474F",
            padding: "10px 40px",
            zIndex: 1,
          }}
        >
          <Link href="https://storyset.com/job" style={{ color: "white" }}>
            Job illustrations by Storyset
          </Link>
          <Link href="https://github.com/Thanakrit-Mekon/KU_POST_IT">
            <GitHubIcon style={{ color: "white" }} />
          </Link>
        </Grid>
      </div>
    </div>
  );
}

export default LandingPage;
