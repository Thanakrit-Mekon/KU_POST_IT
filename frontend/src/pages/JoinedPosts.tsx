import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  Chip,
  Avatar,
  Button,
  Icon,
  Dialog,
  Hidden,
  IconButton,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core";
import NavBar from "../components/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useLocation, Link } from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "../axios";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { User } from "../App";

import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";
import { shadows } from "@material-ui/system";

interface Subject {
  answer: string;
  status: string;
  candidate: number;
  contact: string;
  create: string;
  desc: string;
  id: string;
  is_activate: boolean;
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

const useStyles = makeStyles((theme) =>
  createStyles({
    change: {
      color: "white",
      backgroundColor: "#F9A41A",
      "&:hover": { backgroundColor: "#F9A41A" },
    },
    submitted: {
      [theme.breakpoints.down("xs")]: {
        padding: 10,
        fontSize: 10,
        minHeight: 180,
      },
      padding: 20,
      minHeight: 220,
      boxShadow:
        "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
      backgroundColor: "#ECECEC",
    },
    unsubmitted: {
      [theme.breakpoints.down("xs")]: {
        padding: 10,
        fontSize: 10,
        minHeight: 180,
      },
      padding: 20,
      minHeight: 220,
      boxShadow:
        "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
      backgroundColor: "#FFFFFF",
    },
    open: {
      color: "#5E9EA0",
      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
      backgroundColor: "#FFFFFF",
    },
    closed: {
      color: "#C7302B",
      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
      backgroundColor: "#FFFFFF",
    },
    notconsider: {
      color: "#FFFFFF",
      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
      backgroundColor: "#F1B663",
    },
    selected: {
      color: "#FFFFFF",
      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
      backgroundColor: "#5E9EA0",
    },
    notselected: {
      color: "#FFFFFF",
      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
      backgroundColor: "#d9534f",
    },
    card: {
      [theme.breakpoints.down("xs")]: {
        padding: 10,
        fontSize: 10,
        minHeight: 180,
      },
      padding: 20,
      minHeight: 220,
      boxShadow:
        "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
    },
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
    cardtitle: {
      [theme.breakpoints.down("xs")]: {
        fontSize: 13,
      },
      fontSize: 15,
    },
    usericon: {
      [theme.breakpoints.down("xs")]: {
        marginRight: 5,
        fontSize: 13,
      },
      marginRight: 10,
    },
  })
);

export interface queryuserprops {
  user: User | null;
  setUser: (user: User | null) => void;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
      color: theme.palette.primary.main,
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    //width: 500,
    minWidth: 500,
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function JoinedPosts({ user, setUser }: queryuserprops) {
  const classes = useStyles();
  const location = useLocation();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  var usertype = -1;
  if (user?.location) {
    usertype = 3;
    //3=company  2=teacher 1=student
  } else if (user?.student_id) {
    usertype = 1;
  } else {
    usertype = 2;
  }
  // console.log(usertype);
  useEffect(() => {
    axios
      .get(`joinedposts/findjoinedposts`)
      .then((response) => {
        console.log(response.data);
        setSubjects(response.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }, []);

  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("aaa");

  const handleClickOpen = (id: string) => {
    setOpen(true);
    setScroll(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <NavBar user={user} setUser={setUser} />
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Grid item>
            <Hidden xsDown>
              <Typography variant="h4" color="primary">
                <Box
                  fontWeight="bold"
                  mt={6}
                  mb={1}
                  style={{ marginBottom: 30 }}
                >
                  Joined Posts
                </Box>
              </Typography>
            </Hidden>
            <Hidden smUp>
              <Typography variant="h5" color="primary">
                <Box
                  fontWeight="bold"
                  mt={6}
                  mb={1}
                  style={{ marginBottom: 20 }}
                >
                  Joined Posts
                </Box>
              </Typography>
            </Hidden>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {subjects.map((obj) => {
            return (
              <Grid item xs={12} md={6}>
                <Card
                  className={
                    obj.is_activate === false
                      ? classes.submitted
                      : classes.unsubmitted
                  }
                >
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item xs={5}>
                      <Grid container direction="column" alignItems="center">
                        <Chip
                          style={{ alignSelf: "flex-start" }}
                          size="small"
                          className={
                            obj.is_activate === false
                              ? classes.closed
                              : classes.open
                          }
                          label={obj.is_activate === false ? "closed" : "open"}
                        />
                        <Avatar
                          alt="Travis Howard"
                          src="/img/mascot.png"
                          className={classes.icon}
                        />
                        {obj.name ? (
                          <Box
                            textAlign="center"
                            style={{ marginTop: 10, marginBottom: 7 }}
                          >
                            {obj.name}
                          </Box>
                        ) : (
                          <Box
                            textAlign="center"
                            style={{ marginTop: 10, marginBottom: 7 }}
                          >
                            {obj.first_name} {obj.last_name}
                          </Box>
                        )}
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

                      <Button
                        variant="contained"
                        color="primary"
                        style={{ marginTop: 20 }}
                        fullWidth
                        onClick={() => handleClickOpen(obj.id)}
                      >
                        View
                      </Button>

                      {scroll === obj.id && (
                        <Dialog
                          maxWidth="lg"
                          aria-labelledby="customized-dialog-title"
                          open={open}
                          onClose={handleClose}
                        >
                          <DialogTitle
                            id="customized-dialog-title"
                            onClose={handleClose}
                          >
                            {/* <Box>{obj.title}</Box> */}
                            {obj.title}{" "}
                            <Chip
                              style={{ alignSelf: "flex-start" }}
                              size="small"
                              className={
                                obj.status
                                  ? classes.selected
                                  : obj.is_activate === true
                                  ? classes.notconsider
                                  : classes.notselected
                              }
                              label={
                                obj.status
                                  ? "คุณได้รับเลือก"
                                  : obj.is_activate === true
                                  ? "ยังไม่ได้พิจารณา"
                                  : "คุณไม่ถูกรับเลือก"
                              }
                            />
                          </DialogTitle>
                          <DialogContent dividers>
                            <Typography variant="h6" color="primary">
                              <Box>รายละเอียดเพิ่มเติม</Box>
                            </Typography>
                            <Typography variant="subtitle1">
                              {obj.desc}
                            </Typography>

                            <Typography variant="h6" color="primary">
                              <Box mt={3}>ช่องทางการติดต่อ</Box>
                            </Typography>
                            <Typography variant="subtitle1">
                              {obj.contact}
                            </Typography>

                            <Typography variant="h6" color="primary">
                              <Box mt={3}>คำตอบของคุณ</Box>
                            </Typography>
                            <Typography variant="subtitle1">
                              {obj.answer}
                            </Typography>
                          </DialogContent>
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

export default JoinedPosts;
