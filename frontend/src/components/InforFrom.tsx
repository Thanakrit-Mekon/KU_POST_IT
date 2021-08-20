import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { faFileExport } from '@fortawesome/free-solid-svg-icons';
import {
    Container,
    Typography,
    Box,
    Grid,
    Card,
    Avatar,
    Button,
    Chip,
    CardContent,
    TextField,
  } from "@material-ui/core";
import { useFormik } from 'formik';

const useStyles = makeStyles((theme) => ({
  layout: {
    minHeight: "100vh",
    display: "flex",
    alignItems :"center"
  },
  Card: {
    width: 900,
    
    padding: theme.spacing(2) ,
    alignContent: 'center',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export default function PostForm(): JSX.Element {
  const formik=useFormik({
  initialValues: {
    feedback: '',
  },
  onSubmit: (values) => {
    
    console.log(values)
  },
  });

  const classes = useStyles();
//   const getColour = () => colours[Math.floor(Math.random() * colours.length)];

  const data = [
    {
      id: "asdasdasd",
      name: "Knun",
      subject: "Sex education",
      faculty: "Engineering",
      department:"Computer",
      year:"4",
    },
    {
      id: "bbbbbbb",
      name: "Soft",
      subject: "Physic",
      faculty: "Science",
      department:"Physic",
      year:"4",
    },
  ];

  return (
    <>
      <main className={classes.layout}>
        <Paper className={classes.Card}>
        <Typography variant="h4" align="center">
          <Box
            fontWeight="bold"
            my={2}
          >
            TA รายวิชา Sex education 01204xxx
          </Box>
          
        </Typography>
        <Grid container direction="row" justifyContent="center" >
        {data.map((obj) => {
            return (
                <>
                <Chip style={{marginRight:"0.5rem"}} label={`${obj.faculty} | ${obj.department} | ชั้นปีที่ ${obj.year}`} color="primary"/>
                {/* <Chip style={{marginRight:"0.5rem"}} label={obj.department} color="primary"/>
                <Chip style={{marginRight:"0.5rem"}} label={`ชั้นปีที่ ${obj.year}`} color="primary"/> */}
                </>
                
            );
          })}
        </Grid>

        <Grid container direction="row">
        <Box ml={4} mr={4}>
        <Typography variant="h5" color="primary">
          <Box mt={3}>
             รายละเอียดเพิ่มเติม
          </Box>
        </Typography>
        
        <Typography variant="subtitle1" style={{ marginTop: 10, marginBottom: 20 }} component="p" >
        
            สำหรับอาจารย์ที่ต้องการหานิสิตมาเป็นTAช่วยในรายวิชาต่างๆนิสิตสามารถเลือกสมัครเป็นTAในแต่ล่ะวิชาได้สำหรับอาจารย์ที่ต้องการหานิสิตมาเป็นTAช่วยในรายวิชาต่างๆนิสิตสามารถเลือกสมัครเป็นTAในแต่ล่ะวิชาได้สำหรับอาจารย์ที่ต้องการหานิสิตมาเป็นTAช่วยในรายวิชาต่างๆสำหรับอาจารย์ที่ต้องการหานิสิตมาเป็นTAช่วยในรายวิชาต่างๆนิสิตสามารถเลือกสมัครเป็นTAในแต่ล่ะวิชาได้สำหรับอาจารย์ที่ต้องการหานิสิตมาเป็นTAช่วยในรายวิชาต่างๆนิสิตสามารถเลือกสมัครเป็นTAในแต่ล่ะวิชาได้สำหรับอาจารย์ที่ต้องการหานิสิตมาเป็นTAช่วยในรายวิชาต่างๆสำหรับอาจารย์ที่ต้องการหานิสิตมาเป็นTAช่วยในรายวิชาต่างๆนิสิตสามารถเลือกสมัครเป็นTAในแต่ล่ะวิชาได้สำหรับอาจารย์ที่ต้องการหานิสิตมาเป็นTAช่วยในรายวิชาต่างๆนิสิตสามารถเลือกสมัครเป็นTAในแต่ล่ะวิชาได้สำหรับอาจารย์ที่ต้องการหานิสิตมาเป็นTAช่วยในรายวิชาต่างๆ

        </Typography>
        <form onSubmit={formik.handleSubmit}>
        <TextField name="feedback" size="small" label="ตอบคำถามอาจารย์ & สิ่งที่อยากบอกอาจารย์" variant="outlined" multiline rows={10} fullWidth value={formik.values.feedback} onChange={formik.handleChange}/>
        
        <Box mt={4}>
        <Grid container
              direction="row"
              justifyContent="center"
              alignItems="center"
              style={{paddingTop:"20"}}>
        <Button variant="contained" color="primary" size="large" type="submit">
            Submit
        </Button>
        </Grid>
        </Box>
        </form>
        </Box>
        </Grid>
        
        </Paper>
      </main>
    </>
  );
}