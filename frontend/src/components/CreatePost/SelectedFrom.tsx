import { Grid, MenuItem, TextField } from "@material-ui/core";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";

const validationSchema = yup.object({
    title: yup.string().required(),
    contact: yup.string().required(),
    more: yup.string()
});

interface Faculty {
id: string;
faculty_name: string;
faculty_code: string;
}

interface Department {
id: string;
faculty_name: string;
department_name: string;
department_code: string;
}  

function SelectedFrom(): JSX.Element {
    const [faculties, setFaculties] = useState<Faculty[]>([]);
    const [departments, setDepartments] = useState<Department[]>([]);
    
    const formik = useFormik({
        initialValues: {
        title: "",
        faculty: "",
        department: "",
        year: "",
        contact: "",
        number: "",
        more: ""
    },validationSchema,
    onSubmit: (values) => {
        const userData = {
        };
        console.log(userData);
    },})

    useEffect(() => {
        axios.get("http://localhost:3000/dropdowns/faculties").then((response) => {
        setFaculties(response.data);
        });
    }, []);

    useEffect(() => {
        axios
        .get(
            `http://localhost:3000/dropdowns/department/${formik.values.faculty}`
        )
        .then((response) => {
            setDepartments(response.data);
        });
    }, [formik.values.faculty]);
    
    return (
        <Grid container spacing={3}>
            <Grid item sm={6} style={{ marginBottom: '1rem' }}>
            <TextField
                size="medium"
                select
                fullWidth
                variant="outlined"
                label="Faculty">
                {faculties &&
                  faculties.map((faculty) => {
                    return (
                      <MenuItem key={faculty.id} value={faculty.faculty_code}>
                        {faculty.faculty_name}
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
                    <MenuItem key={index} value={formik.values.faculty}>
                        {formik.values.faculty}
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
                    <MenuItem key={index} value={formik.values.faculty}>
                        {formik.values.faculty}
                    </MenuItem>
                );
                })}
            </TextField>
            </Grid>
        </Grid>

    )
}

export default SelectedFrom