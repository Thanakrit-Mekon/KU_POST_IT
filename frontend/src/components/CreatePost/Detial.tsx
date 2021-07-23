import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { MenuItem, Typography } from "@material-ui/core";

const faculties = ["1", "2", "3"];

export default function Detail() {
  return (
    <React.Fragment>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField size="medium" fullWidth variant="outlined" label="Title" />
        </Grid>
      </Grid>

      <br />
      <Typography component="h6" variant="h5" align="left" color="primary">
        Requirement
      </Typography>

      <br />
      <Grid container spacing={2}>
        <Grid item sm={6} style={{ marginBottom: "1rem" }}>
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
        <Grid item sm={4} style={{ marginBottom: "1rem" }}>
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
        <Grid item sm={2} style={{ marginBottom: "1rem" }}>
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
        <Grid item sm={9} style={{ marginBottom: "1rem" }}>
          <TextField
            size="medium"
            fullWidth
            variant="outlined"
            label="Contact"
          />
        </Grid>
        <Grid item sm={3} style={{ marginBottom: "1rem" }}>
          <TextField
            size="medium"
            select
            fullWidth
            variant="outlined"
            label="Number"
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
      <Grid item xs={12}>
        <TextField
          id="outlined-textarea"
          fullWidth
          label="More Detail"
          multiline
          rows={7}
          variant="outlined"
        />
      </Grid>
    </React.Fragment>
  );
}
