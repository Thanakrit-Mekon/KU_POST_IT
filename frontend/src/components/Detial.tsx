import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { createStyles, makeStyles, MenuItem, Paper, Theme, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: '25ch',
        },
    }),
);

const faculties = ['1', '2', '3'];

export default function Detail() {

    const classes = useStyles();
    const [value, setValue] = React.useState('Controlled');
    const [currency, setfaculties] = React.useState('EUR');

    const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    
    const handleChangeFaculty = (event: React.ChangeEvent<HTMLInputElement>) => {
        setfaculties(event.target.value);
    };

    return (
        <React.Fragment>
        <br />
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <TextField
                    size="medium"
                    fullWidth
                    variant="outlined"
                    label="Title"
                />
            </Grid>
        </Grid>

        <br />
        <Typography component="h6" variant="h5" align="left" color="primary">
            Requirement
        </Typography>

        <br />
        <Grid container spacing={2}>
            <Grid item sm={6} style={{ marginBottom: '1rem' }}>
              <TextField
                    size="medium"
                    select
                    fullWidth
                    variant="outlined"
                    label="Faculty"
                >
                    {faculties.map((faculty, index) => {
                        return (
                            <MenuItem key={index} value={faculty}>
                            {faculty}
                            </MenuItem>
                        );
                    })}
                </TextField>
            </Grid>
            <Grid item sm={4} style={{ marginBottom: '1rem' }}>
              <TextField
                    size="medium"
                    select
                    fullWidth
                    variant="outlined"
                    label="Branch"
                >
                    {faculties.map((faculty, index) => {
                        return (
                            <MenuItem key={index} value={faculty}>
                            {faculty}
                            </MenuItem>
                        );
                    })}
                </TextField>
            </Grid>
            <Grid item sm={2} style={{ marginBottom: '1rem' }}>
              <TextField
                    size="medium"
                    select
                    fullWidth
                    variant="outlined"
                    label="Year"
                >
                    {faculties.map((faculty, index) => {
                        return (
                            <MenuItem key={index} value={faculty}>
                            {faculty}
                            </MenuItem>
                        );
                    })}
                </TextField>
            </Grid>
        </Grid>
    
        <Grid container spacing={3}>
            <Grid item sm={9} style={{ marginBottom: '1rem' }}>
                <TextField
                    size="medium"
                    fullWidth
                    variant="outlined"
                    label="Contact" 
                />
                </Grid>
                <Grid item sm={3} style={{ marginBottom: '1rem' }}>
                <TextField
                    size="medium"
                    select
                    fullWidth
                    variant="outlined"
                    label="Number">
                    {faculties.map((faculty, index) => {
                        return (
                            <MenuItem key={index} value={faculty}>
                            {faculty}
                            </MenuItem>
                        );
                    })}
                </TextField>
            </Grid>
        </Grid>
        
        <Grid container >
            <Grid item xs={12}>
                <TextField
                    id="outlined-textarea"
                    fullWidth
                    label="more detail"
                    multiline
                    variant="outlined"
                />
            </Grid>
        </Grid>

        </React.Fragment>
    );
}