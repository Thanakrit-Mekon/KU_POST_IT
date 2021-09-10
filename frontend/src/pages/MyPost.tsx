import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  Avatar,
  Button,
  makeStyles,
  withStyles,
  createStyles,
  Theme,
  Icon,
  Hidden,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import NavBar from "../components/NavBar";
import { User } from "../App";
import { useEffect, useState } from "react";
import axios from "../axios";
import React from "react";
import { Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      [theme.breakpoints.down("xs")]: {
        height: "50px",
        width: "50px",
      },
      height: "75px",
      width: "75px",
      borderRadius: "50px",
      background: "#e0e0e0",
      boxShadow: "20px 20px 60px #bebebe-20px -20px 60px #ffffff",
    },
    description: {
      [theme.breakpoints.down("xs")]: {
        marginBottom: 8,
      },
      marginBottom: 40,
    },
    card: {
      [theme.breakpoints.down("xs")]: {
        padding: 10,
        fontSize: 10,
        minHeight: 180,
      },
      padding: 20,
      minHeight: 220,
      display: "flex",
      alignItems: "center",
      boxShadow:
        "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
    },
    usericon: {
      [theme.breakpoints.down("xs")]: {
        marginRight: 5,
        fontSize: 13,
      },
      marginRight: 10,
    },
    cardtitle: {
      [theme.breakpoints.down("xs")]: {
        fontSize: 13,
      },
      fontSize: 15,
    },
  })
);

const ColorButton = withStyles((theme: Theme) => ({
  root: {
    backgroundColor: "#F3C87D",
    "&:hover": {
      backgroundColor: "#D4AF6D",
    },
  },
}))(Button);

export interface MyPostProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

interface Subject {
  candidate: number;
  contact: string;
  create: string;
  desc: string;
  _id: string;
  is_activate: string;
  is_all: boolean;
  last_modify: string;
  post_type: string;
  qualification: {
    department_code: string;
    faculty_code: string;
    year: string;
  }[];
  thisusersubmit: boolean;
  title: string;
  user_name: string;
  first_name: string;
  last_name: string;
  name: string;
  quantity: string;
  isDueDate: boolean;
  dueDate: string;
  startDate: string;
  endDate: string;
  hasPeriod: boolean;
}

function MyPost({ user, setUser }: MyPostProps): JSX.Element {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  useEffect(() => {
    axios.get(`/posts/myposts`).then((response) => {
      setSubjects(response.data);
    });
  }, []);
  console.log(subjects);

  const classes = useStyles();

  const DeletePost = (postId: string) => {
    axios
      .post("posts/deletePost", {
        postId: postId,
      })
      .then((response) => {
        console.log(response);
        handleClose();
      });
  };

  const [open, setOpen] = React.useState(false);
  const [postId, setPostId] = useState("");

  const handleClickOpen = (t: string) => {
    setOpen(true);
    setPostId(t);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <NavBar user={user} setUser={setUser} />
      <Container maxWidth="lg">
        <Hidden xsDown>
          <Typography variant="h4">
            <Box
              fontWeight="bold"
              color="primary.main"
              style={{ marginTop: 50, marginBottom: 50 }}
            >
              My Post
            </Box>
          </Typography>
        </Hidden>
        <Hidden smUp>
          <Typography variant="h5">
            <Box
              fontWeight="bold"
              color="primary.main"
              style={{ marginTop: 50, marginBottom: 50 }}
            >
              My Post
            </Box>
          </Typography>
        </Hidden>
        <Grid container spacing={5}>
          {subjects.map((obj) => {
            return (
              <Grid item xs={12} md={6}>
                <Card className={classes.card}>
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item xs={5}>
                      <Grid container direction="column" alignItems="center">
                        <Avatar
                          alt="Travis Howard"
                          src="/img/mascot.png"
                          className={classes.icon}
                        />
                        <Box
                          textAlign="center"
                          style={{ marginTop: 10, marginBottom: 7 }}
                        >
                          {obj.user_name}
                        </Box>

                        <Typography color="primary">
                          <Box
                            className={classes.cardtitle}
                            fontWeight="bold"
                            textAlign="center"
                            color="primary"
                          >
                            {obj.title}
                          </Box>
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={7}>
                      <Box mt={1}>
                        {obj.isDueDate
                          ? "Duedate : " +
                            obj.dueDate.slice(8, 10) +
                            "/" +
                            obj.dueDate.slice(5, 7) +
                            "/" +
                            obj.dueDate.slice(0, 4)
                          : "No Duedate"}
                      </Box>
                      <Box mt={1}>
                        {obj.hasPeriod
                          ? "Work peroid : " +
                            obj.startDate.slice(8, 10) +
                            "/" +
                            obj.startDate.slice(5, 7) +
                            "/" +
                            obj.startDate.slice(0, 4) +
                            " - " +
                            obj.endDate.slice(8, 10) +
                            "/" +
                            obj.endDate.slice(5, 7) +
                            "/" +
                            obj.endDate.slice(0, 4)
                          : "No Work period"}
                      </Box>

                      <Grid
                        container
                        justifyContent="space-around"
                        style={{ marginTop: 10 }}
                      >
                        <Box>
                          <Icon
                            fontSize="small"
                            color="primary"
                            className={classes.usericon}
                          >
                            <FontAwesomeIcon icon={faUser} />
                          </Icon>
                          Need {obj.quantity} people
                        </Box>
                        <Box>
                          <Icon
                            fontSize="small"
                            color="primary"
                            className={classes.usericon}
                          >
                            <FontAwesomeIcon icon={faUser} />
                          </Icon>
                          Joined {obj.candidate} people
                        </Box>
                      </Grid>
                      <Link
                        to={`/myposts/${obj._id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Hidden xsDown>
                          <Button
                            variant="contained"
                            style={{
                              marginTop: 20,
                              marginLeft: 20,
                              marginRight: 20,
                            }}
                            color="primary"
                          >
                            View
                          </Button>
                        </Hidden>
                        
                      </Link>
                      {obj.is_activate ? (
                        <Link
                          to = {`/posts/edit/${obj._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <Hidden xsDown>
                            <ColorButton
                              variant="contained"
                              color="primary"
                              style={{ marginTop: 20, marginRight: 20 }}
                            >
                              Edit
                            </ColorButton>
                          </Hidden>
                        </Link>
                      ) : (
                        <>
                          <Hidden xsDown>
                            <ColorButton
                              variant="contained"
                              color="primary"
                              style={{ marginTop: 20, marginRight: 20 }}
                              disabled
                            >
                              Edit
                            </ColorButton>
                          </Hidden>
                        </>
                      )}

                      {obj.is_activate ? (
                        <>
                          <Hidden xsDown>
                            <Button
                              onClick={() => handleClickOpen(obj._id)}
                              variant="contained"
                              color="secondary"
                              style={{ marginTop: 20 }}
                            >
                              Cancel
                            </Button>
                          </Hidden>
                        </>
                      ) : (
                        <>
                          <Hidden xsDown>
                            <Button
                              onClick={() => handleClickOpen(obj._id)}
                              variant="contained"
                              color="secondary"
                              style={{ marginTop: 20 }}
                              disabled
                            >
                              Cancel
                            </Button>
                          </Hidden>
                        </>
                      )}
                      {postId === obj._id && (
                        <Dialog
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">
                            {"Do you want to cancel this post?"}
                          </DialogTitle>
                          <DialogContent></DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose} color="primary">
                              Decline
                            </Button>
                            <Button
                              onClick={() => DeletePost(obj._id)}
                              color="primary"
                              autoFocus
                            >
                              Accept
                            </Button>
                          </DialogActions>
                        </Dialog>
                      )}
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                    >
                    <Link
                        to={`/myposts/${obj._id}`}
                        style={{ textDecoration: "none" }}
                      >
                    <Hidden smUp>
                          <Button
                            variant="contained"
                            style={{ marginBottom: 10 ,marginLeft: 15,marginRight: 7.5 }}
                            color="primary"
                          >
                            View
                          </Button>
                        </Hidden>
                    </Link>
                    {obj.is_activate ? (
                        <Link
                          to = {`/posts/edit/${obj._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <Hidden smUp>
                            <ColorButton
                              variant="contained"
                              color="primary"
                              style={{ marginBottom: 10,marginRight: 7.5, marginLeft: 7.5 }}
                            >
                              Edit
                            </ColorButton>
                          </Hidden>
                        </Link>
                      ) : (
                        <>
                          <Hidden smUp>
                            <ColorButton
                              variant="contained"
                              color="primary"
                              style={{ marginBottom: 10,marginRight: 7.5, marginLeft: 7.5 }}
                              disabled
                            >
                              Edit
                            </ColorButton>
                          </Hidden>
                        </>
                      )}
                      {obj.is_activate ? (
                        <>
                          <Hidden smUp>
                            <Button
                              onClick={() => handleClickOpen(obj._id)}
                              variant="contained"
                              color="secondary"
                              style={{ marginBottom: 10,marginRight: 15, marginLeft: 7.5}}
                            >
                              Cancel
                            </Button>
                          </Hidden>
                        </>
                      ) : (
                        <>
                          <Hidden smUp>
                            <Button
                              onClick={() => handleClickOpen(obj._id)}
                              variant="contained"
                              color="secondary"
                              style={{ marginBottom: 10, marginRight: 15, marginLeft: 7.5 }}
                              disabled
                            >
                              Cancel
                            </Button>
                          </Hidden>
                        </>
                      )}
                      {postId === obj._id && (
                        <Dialog
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">
                            {"Do you want to cancel this post?"}
                          </DialogTitle>
                          <DialogContent></DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose} color="primary">
                              Decline
                            </Button>
                            <Button
                              onClick={() => DeletePost(obj._id)}
                              color="primary"
                              autoFocus
                            >
                              Accept
                            </Button>
                          </DialogActions>
                        </Dialog>
                      )}
                      </Grid>
                  </Grid>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default MyPost;
