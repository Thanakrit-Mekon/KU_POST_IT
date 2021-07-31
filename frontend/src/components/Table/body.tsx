import NavBar from '../NavBar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import DataTable from '../Table/dataTable';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';
import Container from '@material-ui/core/Container';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height : "100vh"
    },

    cooler:{
        zindex: '-1',
        color: 'white',
        backgroundColor: '#F9A41A'
    },

    cooler2:{
        color: 'white',
        backgroundColor: '#DB524E'
    },

    cooler3:{
        color: 'white',
        background: '#83D2D4'

    }
    
  })
);


function Body(): JSX.Element {
  const classes = useStyles();
  return (
    <Grid className={classes.root}>
        <NavBar />
        <Container style={{paddingTop:100}} maxWidth="lg">    
                <Grid container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    style={{paddingBottom:50}}
                    >
                    <Typography  variant="h4" >
                        <Grid item>TA รายวิชา Database 01204xxx
                            <Chip className={classes.cooler3} style={{marginLeft:20}} label="26 คน" />
                        </Grid>
                    </Typography>
                        <Button className={classes.cooler} variant="contained" >
                            Refresh
                        </Button>
                </Grid>
            <DataTable />
            <Grid 
                container
                justifyContent="center"
                alignItems="center"
                >
                <Button style={{marginTop:50}} className={classes.cooler2} variant="contained" color="primary">
                    Submit
                </Button>
            </Grid>
        </Container>
    </Grid>
  );
}

export default Body;
