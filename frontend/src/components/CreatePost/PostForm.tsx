import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import FormCreatePost from "./FormCreatePost";
import { Grid, Hidden } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "auto",
    backgroundColor: "#5E9EA0",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 10)]: {
      width: 800,
      margin: "auto",
    },
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
      marginRight: 0,
    },
  },
  paper: {
    width: "auto",
    height: "auto",
    padding: theme.spacing(2),
    alignContent: "center",
    [theme.breakpoints.down("xs")]: {
      borderTopRightRadius: "25px",
      borderTopLeftRadius: "25px",
    },
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  image: {
    padding: "25px 0",
    "& img": {
      width: "60%",
      objectFit: "cover",
    },
  },
}));

export default function PostForm(): JSX.Element {
  const classes = useStyles();

  return (
    <>
      <main className={classes.layout}>
        <Hidden smUp>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            className={classes.image}
          >
            <img src="/img/logo.png" alt="logo" />
          </Grid>
        </Hidden>
        <Paper className={classes.paper}>
          <FormCreatePost />
        </Paper>
      </main>
    </>
  );
}
