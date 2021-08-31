import {
    Container,
    Typography,
    Box,
    Grid,
    Card,
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
  } from "@material-ui/core";
import NavBar from "../components/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../axios";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { User } from "../App";
  
interface Subject {
    answer: string;
    status: string;
    candidate: number;
    contact: string;
    create: string;
    desc: string;
    id: string;
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
  
const useStyles = makeStyles(() =>
    createStyles({
      change: {
        color: "white",
        backgroundColor: "#F9A41A",
        "&:hover": { backgroundColor: "#F9A41A" },
      },
      submitted: {
        backgroundColor: "#DDDDDD"
      },
    })
);
  
export interface queryuserprops {
    user: User | null;
    setUser: (user: User | null) => void;
}
  
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
              <Typography variant="subtitle1">
                <Box mb={5}>
                  joinedposts
                </Box>
              </Typography>
            </Grid>
          </Grid>
  
          <Grid container spacing={5}>
            {subjects.map((obj) => {
              return (
                <Grid item sm={4}>
                  <Card style={{ padding: 20 }} className={classes.submitted}>
                    <Grid container direction="column" alignItems="center">
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
  
                      <Box>
                        { (obj.is_activate==="false") ? <Box>Submitted</Box> : null}
                      </Box>

                      <Grid
                        container
                        justifyContent="center"
                        style={{ marginTop: 20 }}
                      >
                        <Button variant="contained" color="primary" onClick={() => handleClickOpen(obj.title)}>
                          View
                        </Button>
                        <Dialog
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                        <DialogTitle id="alert-dialog-title">{obj.title}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <Typography variant="h6" color="primary">
                            <Box mt={3}>รายละเอียดเพิ่มเติม</Box>
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
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleClose} color="primary">
                          Back
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
  
export default JoinedPosts;
  