import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { MenuItem, Typography } from '@material-ui/core';
import Checkedbox from './Checkedbox';
import { useFormik } from "formik";
import * as yup from "yup";
import axios from 'axios';

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

function Requirement(): JSX.Element {
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
    <>
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

      <Checkedbox />

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
                <MenuItem key={index} value={formik.values.faculty}>
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
          label="More Requirement"
          multiline
          rows={7}
          variant="outlined"
        />
      </Grid>
    </>
  );
}

export default Requirement