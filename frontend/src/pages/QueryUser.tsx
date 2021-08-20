import {
    Container,
    Typography,
    Box,
    Grid,
    Card,
    Avatar,
    Button,
  } from "@material-ui/core";
  import NavBar from "../components/NavBar";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faUser } from "@fortawesome/free-solid-svg-icons";
  import { makeStyles, createStyles } from '@material-ui/core/styles';
  import { Theme } from '@material-ui/core';
  
  const useStyles = makeStyles(() =>
    createStyles({
     change:{
          color: 'white',
          backgroundColor: '#F9A41A',
          '&:hover':{backgroundColor: '#F9A41A'}
      }
     
    })
    );
  
  
  
  function QueryUser() {
    const classes = useStyles();
    const data = [
      {
        id: "asdasdasd",
        name: "Knun",
        subject: "Sex education",
        amount: 3,
      },
      {
        id: "bbbbbbb",
        name: "Soft",
        subject: "Physic",
        amount: 5,
      },
      {
          id: "asdasdasd",
          name: "Knun",
          subject: "Sex education",
          amount: 3,
        },
        {
          id: "bbbbbbb",
          name: "Soft",
          subject: "Physic",
          amount: 5,
        },
        {
          id: "asdasdasd",
          name: "Knun",
          subject: "Sex education",
          amount: 3,
        },
    ];
  
    return (
      <div>
        <NavBar />
        <Container maxWidth="md">
          <Typography variant="h4" color="primary">
            <Box
              fontWeight="bold"
              style={{ marginTop: 50, marginBottom: 5 }}
            >
              Teacher Assistant - TA
              
              
            </Box>
          </Typography>
          <Typography variant="subtitle1" >
        <Box mb={5}>
        สำหรับอาจารย์ที่ต้องการหานิสิตมาเป็นTAช่วยในรายวิชาต่างๆนิสิตสามารถเลือกสมัครเป็นTAในแต่ล่ะวิชาได้
        </Box>
        </Typography>
          <Grid container spacing={5}>
            {data.map((obj) => {
              return (
                <Grid item sm={4}>
                  <Card style={{ padding:20}}>
                    <Grid container direction="column" alignItems="center">
                        <Avatar />
                        <Box>{obj.name}</Box>
                        <Typography  color="primary">
                        <Box fontWeight="bold" color="primary">TA {obj.subject}</Box>
                        </Typography>
                        {/* <Icon className="fa fa-user" /> */}
                      <Box alignItems="center"><FontAwesomeIcon icon={faUser} /> ต้องการ {obj.amount} คน</Box>
                      <Grid container justifyContent="center" style={{marginTop:20}}>
                        <Button variant="contained" color="primary">
                          Register
                        </Button>
                        {/* <Button variant="contained" color="secondary">
                          Close
                        </Button> */}
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
  
  export default QueryUser;
  