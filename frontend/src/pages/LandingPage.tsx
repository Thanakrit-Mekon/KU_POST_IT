import {
  AppBar,
  Button,
  createStyles,
  Grid,
  Typography,
  Link,
  makeStyles,
  useTheme,
  useMediaQuery,
  createTheme,
  ThemeProvider,
  Hidden,
} from "@material-ui/core";
import "@fontsource/roboto";
import "@fontsource/montserrat";
import { Link as ReactLink } from "react-router-dom";
import GitHubIcon from "@material-ui/icons/GitHub";

let theme = createTheme();
// theme = responsiveFontSizes(theme);
theme.typography.h4 = {
  [theme.breakpoints.down("xs")]: {
    fontSize: "2px",
  },
};

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
      [theme.breakpoints.down("xs")]: {
        fontSize: "45px",
        lineHeight: "auto",
        textAlign: "center",
        marginBottom: "0",
      },
    },
    btn: {
      padding: "20px 40px",
      [theme.breakpoints.down("xs")]: {
        padding: "10px 20px",
      },
    },
    des: {
      fontFamily: "Roboto",
      color: "#979797",
      fontSize: "24px",
      lineHeight: "178%",
      [theme.breakpoints.down("xs")]: {
        fontSize: "18px",
        textAlign: "center",
        padding: "0 10%",
      },
    },
    section: {
      padding: "80px 0",
      color: "#37474F",
      [theme.breakpoints.down("xs")]: {
        padding: "30px 0",
      },
    },
    nav: {
      height: "100px",
      padding: "0 86px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      [theme.breakpoints.down("xs")]: {
        padding: "0 20px",
        height: "50px",
      },
    },
    blueBg: {
      backgroundColor: "#BAD9DA",
      color: "#37474F",
    },
    subtitle: {
      fontSize: 20,
      [theme.breakpoints.down("xs")]: {
        fontSize: 15,
        textAlign: "center",
        padding: "0 10%",
        marginBottom: "50px",
      },
    },
    vector: {
      position: "absolute",
      top: "562px",
      left: "353px",
    },
    img: {
      [theme.breakpoints.down("xs")]: {
        height: "280px",
      },
    },
  })
);

function LandingPage() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"), {
    defaultMatches: true,
  });

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.bg}>
        <Hidden xsDown>
          <img src="/img/vector.png" alt="vector" className={classes.vector} />
        </Hidden>
        <AppBar
          position={isMobile ? "relative" : "sticky"}
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
          direction={isMobile ? "column-reverse" : "row"}
          justifyContent="space-evenly"
          alignItems="center"
          className={classes.section}
        >
          <Grid item style={{ zIndex: 2 }}>
            <Typography variant="h1" className={classes.header}>
              KU
              <br hidden={isMobile} />
              POST-IT
            </Typography>
            <Typography className={classes.des}>
              Platform for teacher, students, and company
              <br hidden={isMobile} />
              &nbsp; Find work. Join post.
            </Typography>
            <Grid
              container
              alignItems="center"
              justifyContent={isMobile ? "center" : "flex-start"}
            >
              <ReactLink
                to="/register"
                style={{
                  textDecoration: "none",
                  marginRight: isMobile ? 20 : 45,
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.btn}
                >
                  <Typography>Get Started</Typography>
                </Button>
              </ReactLink>
              <Typography>Now it’s free</Typography>
            </Grid>
          </Grid>
          <Grid item>
            <img
              src="/img/email.gif"
              alt="email-capture"
              className={classes.img}
            />
          </Grid>
        </Grid>

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          className={classes.section}
        >
          <Typography
            variant={isMobile ? "h6" : "h4"}
            style={{
              textAlign: isMobile ? "center" : "left",
              padding: isMobile ? "0 10%" : 0,
            }}
          >
            Easier way to get the work or find students for work
          </Typography>
          <Typography
            variant="subtitle1"
            className={classes.subtitle}
            style={{ color: "#979797", marginBottom: 20 }}
          >
            On KU Post-It, you can create account to find the work or post the
            work all within 5 minutes.
          </Typography>
        </Grid>

        <Grid
          container
          direction={isMobile ? "column" : "row"}
          justifyContent="center"
          alignItems="center"
          className={classes.blueBg}
        >
          <Grid item xs={12} sm={5}>
            <img src="/img/team.png" alt="team" width={isMobile ? 300 : 550} />
          </Grid>
          <Grid item xs={12} sm={5} style={{ textAlign: "right" }}>
            <Typography
              variant={isMobile ? "h6" : "h4"}
              style={{
                textAlign: isMobile ? "center" : "right",
                padding: isMobile ? "0 10%" : 0,
                marginTop: isMobile ? -40 : 0,
              }}
            >
              Just post the work
            </Typography>
            <Typography variant="subtitle1" className={classes.subtitle}>
              Create a post, write the work description and let us spread
              <br hidden={isMobile} /> the news about your post to every related
              students
              <br hidden={isMobile} /> registered in KU Post-It.
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          justifyContent="center"
          alignItems="center"
          direction={isMobile ? "column-reverse" : "row"}
        >
          <Grid item xs={12} sm={5}>
            <Typography
              variant={isMobile ? "h6" : "h4"}
              color="primary"
              style={{
                textAlign: isMobile ? "center" : "left",
                padding: isMobile ? "0 10%" : "0",
                marginTop: isMobile ? -20 : 0,
              }}
            >
              Find work you want
            </Typography>
            <Typography variant="subtitle1" className={classes.subtitle}>
              Student account can join posts and include answers for
              <br hidden={isMobile} />
              post owner to choose students.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={5}>
            <img
              src="/img/JobHunt.png"
              alt="JobHunt"
              width={isMobile ? 300 : 550}
            />
          </Grid>
        </Grid>

        <div style={{ position: "relative" }}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            direction={isMobile ? "column" : "row"}
            className={classes.blueBg}
          >
            <Grid item xs={12} sm={5}>
              <img
                src="/img/Message.png"
                alt="Message"
                width={isMobile ? 300 : 550}
              />
            </Grid>
            <Grid item xs={12} sm={5} style={{ textAlign: "right" }}>
              <Typography
                variant={isMobile ? "h6" : "h4"}
                color="primary"
                style={{
                  textAlign: isMobile ? "center" : "right",
                  padding: isMobile ? "0 10%" : "0",
                  marginTop: isMobile ? -40 : 0,
                }}
              >
                Still have no work to join ?
              </Typography>
              <Typography variant="subtitle1" className={classes.subtitle}>
                When there is work that related to you, we will send
                <br hidden={isMobile} />
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
            <Typography
              variant={isMobile ? "h6" : "h4"}
              color="primary"
              style={{
                textAlign: isMobile ? "center" : "left",
                padding: isMobile ? "0 10%" : "0",
              }}
            >
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
    </ThemeProvider>
  );
}

export default LandingPage;
