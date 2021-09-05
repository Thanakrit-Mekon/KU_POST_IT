import NavBar from "../NavBar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import DataTable from "../Table/dataTable";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { User } from "../../App";
import axios from "../../axios";
import { useEffect, useState } from "react";
import { Link , useParams } from "react-router-dom";
import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100vh",
    },

    cooler: {
      zindex: "-1",
      color: "white",
      backgroundColor: "#F9A41A",
    },

    cooler2: {
      color: "white",
      backgroundColor: "#DB524E",
    },

    cooler3: {
      color: "white",
      background: "#83D2D4",
    },
  })
);

export interface Bodyprops {
  user: User | null;
  setUser: (user: User | null) => void;
}

interface Subject {
  contact: string;
  create: string;
  desc: string;
  is_activate: string;
  is_all: boolean;
  last_modify: string;
  post_type: string;
  qualification: {
    year: string;
  }[];
  quantity: string;
  title: string;
  user_name: string;
  __v: number;
  _id: string;
  numberAppli: string;
}

interface ParamType {
  postId: string;
}

function Body({ user, setUser }: Bodyprops): JSX.Element {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [subjects, setSubjects] = useState<Subject>({} as Subject);
  const param = useParams<ParamType>();
  useEffect(() => {
    axios
      .get(`/csv/headTable/${param.postId}`)
      .then((response) => {
        setSubjects(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }, [param.postId]);
  console.log(subjects);

  return (
    <Grid className={classes.root}>
      <NavBar user={user} setUser={setUser} />
      <Container style={{ paddingTop: 100 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          style={{ paddingBottom: 50 }}
        >
          <Typography variant="h4">
            <Grid item>
              {subjects.title} Software Engineering
              <Chip
                className={classes.cooler3}
                style={{ marginLeft: 20 }}
                label={`${subjects.numberAppli} คน`}
              />
            </Grid>
          </Typography>
          <Button className={classes.cooler} variant="contained">
            Refresh
          </Button>
        </Grid>
        <DataTable />
        <Grid container justifyContent="center" alignItems="center">
          <Button
            style={{ marginTop: 50, marginBottom: 50 }}
            className={classes.cooler2}
            variant="contained"
            color="primary"
            onClick={handleClickOpen}
          >
            Submit
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"PIPI KENG JUNG"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                submit success!!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary" autoFocus>
                Acknowledge
              </Button>
            </DialogActions>
          </Dialog>

          <Link to={`/myposts`} style={{ textDecoration: "none" }}>
            <Button
              href="/myposts"
              style={{ marginTop: 50, marginLeft: 20, marginBottom: 50 }}
              className={classes.cooler}
              variant="contained"
              color="primary"
            >
              Back
            </Button>
          </Link>
        </Grid>
      </Container>
    </Grid>
  );
}

export default Body;
