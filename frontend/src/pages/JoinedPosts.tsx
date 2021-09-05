import {
    Container,
    Typography,
    Box,
    Grid,
    Card,
    Chip,
    Avatar,
    Button,
    Dialog,
    IconButton,
    Theme, 
    withStyles, 
    WithStyles
  } from "@material-ui/core";
import NavBar from "../components/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useLocation, Link } from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "../axios";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { User } from "../App";

import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import { shadows } from '@material-ui/system';
  
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
  
const useStyles = makeStyles(() =>
    createStyles({
      change: {
        color: "white",
        backgroundColor: "#F9A41A",
        "&:hover": { backgroundColor: "#F9A41A" },
      },
      submitted: {
        backgroundColor: "#ECECEC"
      },
      unsubmitted: {
        backgroundColor: "#FFFFFF"
      },
      open: {
        color: "#5E9EA0",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
        backgroundColor: "#FFFFFF"
      },
      closed: {
        color: "#C7302B",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
        backgroundColor: "#FFFFFF"
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
      color: theme.palette.primary.main
    },
    closeButton: {
      position: 'absolute',
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
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    width: 500
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

    const handleClickOpen = (title: string) => {
        setOpen(true);
        setScroll(title);
    };

    const handleClose = () => {
        setOpen(false);
    };
  
    return (
      <div>
        <NavBar user={user} setUser={setUser} />
        <Container maxWidth="md">
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h4" color="primary">
                <Box fontWeight="bold" style={{ marginTop: 50, marginBottom: 5 }}>
                  Joined Posts
                </Box>
              </Typography>
              {/* <Typography variant="subtitle1">
                <Box mb={5}>
                  สำหรับนิสิตที่ต้องการดูโพสที่ตนได้ทำการสมัครแล้ว นิสิตสามารถเลือกดูโพสที่นิสิตสมัครได้ในทุกหมวดหมู่
                </Box>
              </Typography> */}
            </Grid>
          </Grid>
  
          <Grid container spacing={5}>
            {subjects.map((obj) => {
              return (
                <Grid item sm={4}>
                  <Card style={{ padding: 20 }} className={(obj.is_activate===false) ? classes.submitted : classes.unsubmitted}>
                    <Grid container direction="column" alignItems="center">
                      <Chip style={{alignSelf:"flex-start"}} size="small" className={(obj.is_activate===false) ? classes.closed : classes.open} label={(obj.is_activate===false) ? "closed" : "open"}/>
                      <Avatar />
                      {obj.name ? <Box>{obj.name}</Box> : <Box>{obj.first_name}  {obj.last_name}</Box>}
                      
                      <Typography color="primary">
                        <Box fontWeight="bold" color="primary">
                          {obj.title}
                        </Box>
                      </Typography>
                      <Box>
                        {obj.isDueDate && "สิ้นสุดการรับสมัคร : "+obj.dueDate.slice(8,10)+"/"+obj.dueDate.slice(5,7)+"/"+obj.dueDate.slice(0,4)  }
                      </Box>
                      <Box>
                        {obj.hasPeriod && "เริ่มทำงาน : "+obj.startDate.slice(8,10)+"/"+obj.startDate.slice(5,7)+"/"+obj.startDate.slice(0,4)}
                      </Box>
                      <Box>
                        {obj.hasPeriod && "ถึงวันที่ "+obj.endDate.slice(8,10)+"/"+obj.endDate.slice(5,7)+"/"+obj.endDate.slice(0,4) }
                      </Box>
                      {/* <Icon className="fa fa-user" /> */}
                      <Box alignItems="space-between">
                        <FontAwesomeIcon icon={faUser} /> ต้องการ {obj.quantity}{" "}
                        คน{"     "}
                        <FontAwesomeIcon icon={faUser} /> สมัครแล้ว {obj.candidate}{" "}
                        คน
                      </Box>
  
                      <Grid
                        container
                        justifyContent="center"
                        style={{ marginTop: 20 }}
                      >
                        <Button variant="contained" color="primary" onClick={() => handleClickOpen(obj.title)}>
                          View
                        </Button>

                        {scroll===obj.title && <Dialog
                          //maxWidth="md"
                          aria-labelledby="customized-dialog-title"
                          open={open}
                          onClose={handleClose}
                        >
                        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                            {obj.title}
                        </DialogTitle>
                        <DialogContent dividers>
                            <Typography variant="h6" color="primary">
                              <Box >รายละเอียดเพิ่มเติม</Box>
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

                            <Typography variant="subtitle1" color="secondary">
                              <Box>{obj.status ? "คุณได้รับเลือก" : (obj.is_activate===true) ? "ยังไม่ได้พิจารณา" : "คุณไม่ถูกรับเลือก"}</Box>
                            </Typography>
                        </DialogContent>
                        {/* <DialogActions>
                        <Button onClick={handleClose} color="primary">
                          Back
                        </Button>
                        </DialogActions> */}
                        </Dialog>}
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