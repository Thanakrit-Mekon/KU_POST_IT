import { Grid, MenuItem, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import * as yup from "yup";

const faculties = ['1', '2', '3'];

export default function SelectedFrom(): JSX.Element {
    return (
        <Grid container spacing={3}>
            <Grid item sm={6} style={{ marginBottom: '1rem' }}>
            <TextField
                size="medium"
                select
                fullWidth
                variant="outlined"
                label="Faculty">
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
                label="Branch">
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
                label="Year">
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

    )
}