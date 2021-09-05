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
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import NavBar from "../components/NavBar";
import { User } from "../App";
import { useEffect, useState } from "react";
import axios from "../axios";
import React from "react";
import { Link } from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      height: "75px",
      width: "75px",
      borderRadius: "50px",
      background: "#e0e0e0",
      boxShadow: "20px 20px 60px #bebebe-20px -20px 60px #ffffff",
    },
    card: {
      boxShadow:
        "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
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
      });
  };

  const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  

  return (
    <div>
      <NavBar user={user} setUser={setUser} />
      <Container maxWidth="md">
        <Typography variant="h4">
          <Box
            fontWeight="bold"
            color="primary.main"
            style={{ marginTop: 50, marginBottom: 50 }}
          >
            My Post
          </Box>
        </Typography>
        <Grid container spacing={5}>
          {subjects.map((obj) => {
            return (
              <Grid item sm={4} key={obj._id}>
                <Card style={{ padding: 20 }} className={classes.card}>
                  <Grid container direction="column" alignItems="center">
                    <Avatar
                      alt="Travis Howard"
                      src="/img/mascot.png"
                      className={classes.icon}
                    />
                    <Box style={{ marginTop: 10, marginBottom: 7 }}>
                      {obj.user_name}
                    </Box>
                    <Box
                      fontWeight="bold"
                      fontSize="15px"
                      color="primary.main"
                      style={{ marginBottom: 7 }}
                    >
                      {obj.title}
                    </Box>
                    <Box
                      alignItems="center"
                      color="primary.main"
                      className="icon"
                    >
                      <i
                        className="fas fa-camera fa-lg"
                        style={{ marginBottom: 7, marginRight: 10 }}
                      >
                        <FontAwesomeIcon icon={faUser} />
                      </i>
                      {obj.quantity}{" "}
                    </Box>
                    <Grid
                      container
                      justifyContent="space-between"
                      style={{ marginTop: 20 }}
                    >
                      <Link to={`/myposts/${obj._id}`}
                      style={{ textDecoration: "none" }}>
                      <Button
                        variant="contained"
                        color="primary"
                      >
                        View
                      </Button>
                      </Link>
                      <Link to="/posts/edit"
                      style={{ textDecoration: "none" }}>
                      <ColorButton
                        variant="contained"
                        color="primary"
                      >
                        Edit
                      </ColorButton>
                      </Link>
                      <Button
                        onClick={handleClickOpen}
                        variant="contained"
                        color="secondary"
                      >
                        Delete
                      </Button>
                      <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                      <DialogTitle id="alert-dialog-title">{"Do you really want to delete this post?"}</DialogTitle>
                      <DialogContent>
                      </DialogContent>
                      <DialogActions>
                      <Button onClick={handleClose} color="primary">
                        Cancel
                      </Button>
                      <Button onClick={() => DeletePost(obj._id)} color="primary" autoFocus>
                       Delete
                      </Button>
                      </DialogActions>
                      </Dialog>
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
