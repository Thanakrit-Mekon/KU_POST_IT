import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Grid, Box, useTheme, useMediaQuery, Hidden } from "@material-ui/core";
import Form from "./Form";
import { LoginProps } from "../../pages/Login";
import { useState } from "react";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      [theme.breakpoints.down("xs")]: {
        display: "flex",
        flexDirection: "column-reverse",
      },
    },
    bgTeal: {
      backgroundColor: "#5E9EA0",
    },
    bgWhite: {
      backgroundColor: "white",
      [theme.breakpoints.down("xs")]: {
        backgroundColor: "#5E9EA0",
      },
    },
    leftCol: {
      borderRadius: "4px 0 0 4px",
    },
    rightCol: {
      borderRadius: "0 4px 4px 0",
    },
    content: {
      position: "relative",
      zIndex: 10,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      overflow: "hidden",
      "& img": {
        width: "80%",
        [theme.breakpoints.down("xs")]: {
          width: "50%",
          marginTop: "70px",
          marginBottom: "70px",
        },
        objectFit: "cover",
      },
      [theme.breakpoints.down("xs")]: {
        borderTopRightRadius: "25px",
        borderTopLeftRadius: "25px",
      },
    },
  })
);

function Create({ setUser }: LoginProps): JSX.Element {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"), {
    defaultMatches: true,
  });
  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleTabChange = (e: React.ChangeEvent<{}>, index: number) => {
    setTabIndex(index);
  };


  return (
    <Grid container className={classes.container}>
      <Grid item sm={7} className={classes.bgWhite}>
        <Hidden xsDown>
        <Box
          borderRadius="4px 0 0 4px"
          boxShadow={4}
          className={classes.content}
          style={{ padding: "20px" }}
        >
          <Form setUser={setUser} />
        </Box>
        </Hidden>
        <Hidden smUp>
        <Box
          borderRadius="4px 0 0 4px"
          className={classes.content}
          style={{ padding: "20px" ,
          backgroundColor: "#ffffff",}}
        >
          <Form setUser={setUser} />
        </Box>
        </Hidden>
      </Grid>
      <Grid item sm={5} className={classes.bgTeal}>
      <Hidden xsDown>
        <Box
          borderRadius="0 4px 4px 0"
          boxShadow={6}
          className={classes.content}
        >
            <img src="/img/mascot.png" alt="mascot" />
            <img src="/img/logo.png" alt="logo" />
        </Box>
      </Hidden>
      <Hidden smUp>
        <Box
          borderRadius="0 4px 4px 0"
          className={classes.content}
        >
            <img src="/img/logo.png" alt="logo" />
        </Box>
      </Hidden>
      </Grid>
    </Grid>
  );
}

export default Create;
